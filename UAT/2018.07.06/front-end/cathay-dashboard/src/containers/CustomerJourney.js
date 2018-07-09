// Core
import React, { Component, Fragment } from "react";
// Library / Plugin
import {
  Button,
  Dimmer,
  Header,
  Loader,
  Segment,
  Table,
  Image
} from "semantic-ui-react";
import moment from "moment";
import "core-js/es6/number";
import "core-js/es6/array";
// Components
import getCustomerJourneyCalendar from "../service/CustomerJourney";
import CustomerJourneyChannels from "../constants/CustomerJourneyChannels";
import CustomerJourneyModal from "../components/modals/CustomerJourneyModal";
import Constants from "../constants/Common";

class CustomerJourney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      filters: [],
      filteredData: [],
      result: [],
      loading: true
    };
  }

  handleFocus = event => {
    event.target.blur();
  };

  handleRetry = async (retry = false) => {
    retry && this.setState({ loading: true });

    await getCustomerJourneyCalendar().then(response => {
      console.log("CJDB response", response);

      setTimeout(() => {
        response.status === Constants.SUCCESS_STATUS &&
        (response.data.code === Constants.SUCCESS_CODE ||
          response.data.code === Constants.NO_DATA_CODE)
          ? this.setState({ data: response.data, loading: false }, () => {
              const newData = this.displayLastTwoWeeks(response.data);
              this.setState({
                ...response.data,
                result: newData
              });
            })
          : this.setState({ loading: false });
      }, retry ? Constants.RETRY_INTERVAL : 0);
    });
  };

  /* Display Last Two Weeks Prior to Current Date */
  displayLastTwoWeeks = data => {
    let currDate =
      data && data.result
        ? data.result.currentDate
        : new Date().getTime() / 1000;
    let dateArray = [];

    /* Fetch 2 weeks prior to current date */
    for (let i = 13; i >= 0; i--) {
      let object = null;

      if (data && data.result) {
        object = data.result.timeSlots.find(
          object =>
            moment.unix(object.timestamp).format("YYYY-MM-DD") ===
            moment
              .unix(currDate)
              .subtract(i, "days")
              .format("YYYY-MM-DD")
        );
      }

      if (!!object) {
        object = { ...object, unixTimestamp: object.timestamp };
        object.timestamp = moment.unix(object.timestamp).format("YYYY-MM-DD");
      }

      dateArray.push(
        object
          ? object
          : {
              timestamp: moment
                .unix(currDate)
                .subtract(i, "days")
                .format("YYYY-MM-DD")
            }
      );
    }

    return dateArray;
  };

  getIcons = data => data.map(d => `${d}.png`);

  /* Render Table Cells / Populate calendar */
  defaultRenderBodyRow = data => {
    /* Initialize data object */
    let dataToShow = {};
    const { filters } = this.state;
    /* Extract timestamp from data */
    const dates = data.map(d => ({
      timestamp: d.timestamp,
      unixTimestamp: d.unixTimestamp,
      icons: d.events ? d.events : []
    }));
    /* Determine offset for starting day */
    // const toAddToFirstDay = +moment(dates[0].timestamp).format("D") !== 1 ? 1 : 0;
    const toAddToFirstDay = 0;
    // const toAddToFirstDay =
    // +moment(dates[0].timestamp).format("D") !== 1 ? 1 : 0;
    /* Get first day of the 2 weeks range */
    const firstDay = moment(
      moment(dates[0].timestamp)
        .startOf("isoWeek")
        // .add(toAddToFirstDay, "d")
        .format("YYYY-MM-DD")
    );

    /* Get last day of the 2 weeks range. Also the current date */
    const lastDay = moment(dates[dates.length - 1].timestamp)
      .endOf("isoWeek")
      .add(toAddToFirstDay, "d");
    /* Get number of days within the range */
    const numDays = lastDay.diff(firstDay, "days") + 1;
    /* Build calendar */
    let calendar = Array(numDays)
      .fill()
      .map((_, i) => {
        let firstDayClone = moment(firstDay);
        return firstDayClone.add(i, "d").format("YYYY-MM-DD");
      });
    /* Remove days that are not included in the 2 weeks range */

    /* Group dates by week number */
    calendar.forEach((d, i) => {
      const index = moment(d).isoWeek();

      if (!dataToShow[index]) {
        dataToShow[index] = [];
      }

      const res = dates.find(date => date.timestamp === d);

      dataToShow[index].push(
        res
          ? {
              timestamp: d,
              unixTimestamp: res.unixTimestamp,
              icons: this.getIcons(res.icons.map(icon => icon.channel)).filter(
                icon =>
                  !filters.length ||
                  filters.indexOf(icon.replace(".png", "")) !== -1
              )
            }
          : null
      );
    });

    const currentDate =
      this.state.data && this.state.data.result
        ? moment.unix(this.state.data.result.currentDate).format("YYYY-MM-DD")
        : moment.unix(new Date().getTime() / 1000).format("YYYY-MM-DD");

    const lastUpdated =
      this.state.data &&
      this.state.data.result &&
      moment.unix(this.state.data.result.updateDate).format("YYYY-MM-DD");

    return Object.keys(dataToShow).map((k, i) => {
      return (
        <Table.Row key={i}>
          {dataToShow[k].map((t, index) => {
            return (
              <CustomerJourneyModal
                key={index}
                t={t}
                index={index}
                currentDate={currentDate}
                lastUpdated={lastUpdated}
              />
            );
          })}
        </Table.Row>
      );
    });
  };

  updateFilteredData = () => {
    const { filters, result } = this.state;
    const filteredData = result.filter(t =>
      filters.some(f => t.events && t.events.some(tt => tt.channel === f))
    );

    this.setState({
      filteredData
    });
  };

  handleFilterSelection = (name, multiple = false) => {
    const { filters } = this.state;

    if (name !== "allTransactions") {
      const validFilters = CustomerJourneyChannels.customerJourneyChannels.map(
        c => c.name
      );

      const filterClone = multiple ? filters : [];
      const filterIsValid = validFilters.indexOf(name) !== -1;

      if (filterIsValid) {
        if (filters.indexOf(name) === -1) {
          this.setState({
            filters: [...filterClone, name]
          });
        } else {
          this.setState({
            filters: filterClone.filter(c => c !== name)
          });
        }
      }
    }
  };

  selectAllFilters = () => {
    const { result } = this.state;
    this.setState({
      filters: [],
      filteredData: result
    });
  };

  allFiltersAreSelected = () => {
    const { filters } = this.state;
    const allAreSelected = CustomerJourneyChannels.customerJourneyChannels
      .filter(d => d.name !== "allTransactions")
      .every(d => filters.indexOf(d.value) !== -1);
    return allAreSelected || !filters.length;
  };

  displayCustomerJourneyChannelsButton = data => {
    /* Extract name from data */
    const { filters } = this.state;
    const allAreSelected = this.allFiltersAreSelected();

    return (
      <div style={{ display: "flex" }}>
        {data.map((n, i) => {
          return (
            <div key={i} style={{ flex: 1, display: "flex" }}>
              {n.name === "allTransactions" ? (
                <Button
                  onClick={this.selectAllFilters}
                  inverted
                  toggle
                  active={allAreSelected}
                  color="green"
                  style={{
                    padding: "3px 7px",
                    flex: 1,
                    fontSize: 14,
                    fontWeight: "regular"
                  }}
                >
                  {n.value}
                </Button>
              ) : (
                <Button
                  onClick={() => this.handleFilterSelection(n.name, true)}
                  onFocus={this.handleFocus}
                  inverted
                  toggle
                  active={filters.indexOf(n.name) !== -1}
                  color="green"
                  style={{
                    padding: "3px 7px",
                    flex: 1,
                    fontSize: 14,
                    fontWeight: "regular"
                  }}
                >
                  {n.value}
                  <Image
                    src={`/assets/images/${n.src}`}
                    width={30}
                    height={28}
                    style={{
                      margin: "0 14px"
                    }}
                  />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  componentDidMount() {
    this.handleRetry();
  }

  render() {
    let { data, result, loading } = this.state;
    let content = null;

    if (data !== null) {
      content = (
        <Fragment>
          <div className="customerJourneyChannelsButtonContainer">
            {this.displayCustomerJourneyChannelsButton(
              CustomerJourneyChannels.customerJourneyChannels
            )}
          </div>

          <Table basic="very" celled>
            <Table.Header>
              <Table.Row textAlign="center">
                <Table.HeaderCell>週一</Table.HeaderCell>
                <Table.HeaderCell>週二</Table.HeaderCell>
                <Table.HeaderCell>週三</Table.HeaderCell>
                <Table.HeaderCell>週四</Table.HeaderCell>
                <Table.HeaderCell>週五</Table.HeaderCell>
                <Table.HeaderCell style={{ color: "red" }}>
                  週六
                </Table.HeaderCell>
                <Table.HeaderCell style={{ color: "red" }}>
                  週日
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className="customerJourneyCalendarTableBody">
              {result.length ? this.defaultRenderBodyRow(result) : null}
            </Table.Body>
          </Table>
        </Fragment>
      );
    } else {
      content = !loading ? (
        <div className="btnRetryContainer">
          <Header
            as="h3"
            content={Constants.SERVICE_UNAVAILABLE}
            className="serviceUnavailable"
          />
          <Button
            onClick={() => this.handleRetry(true)}
            disabled={loading}
            content={Constants.RETRY}
            size="large"
          />
        </div>
      ) : null;
    }

    return (
      <Segment>
        {loading ? (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        ) : null}

        <div className="segmentHeader">
          <span>客戶歷程</span>
        </div>

        <div className="customerJourneyCalendarTable">{content}</div>
      </Segment>
    );
  }
}
export default CustomerJourney;
