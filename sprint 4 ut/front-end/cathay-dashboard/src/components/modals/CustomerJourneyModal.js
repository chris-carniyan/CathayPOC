// Core
import React, { Component, Fragment } from "react";
// Plugin / Library
import { Dimmer, Header, Loader, Modal, Table, Icon } from "semantic-ui-react";
import moment from "moment";
import "core-js";
// Components
import getCustomerJourneyDetail from "../../service/CustomerJourneyDetail";
import Helper from "../../utility/Helper";
import Constants from "../../constants/Common";
// CSS
import classes from "../../assets/css/CustomerJourney.css";

class CustomerJourneyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      modalOpen: false,
      loading: false
    };
  }

  handleOpen = () => {
    this.setState({ loading: true, modalOpen: true });

    getCustomerJourneyDetail(
      "Channel",
      this.props.t.unixTimestamp,
      Helper.getQueryParameters()
    )
      .then(response => {
        if (
          response.status === Constants.SUCCESS_STATUS &&
          response.data.result !== undefined
        ) {
          this.setState({
            data: response.data.result
          });
        }
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
        const { data } = this.state;

        if (data !== null) {
          this.setState({ data: null });
        }

        this.setState({ loading: false });
      });
  };

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    let { data, loading } = this.state;
    let content = null;
    let modalTrigger = null;
    const clickable = !!(this.props.t && this.props.t.icons.length);

    const renderCell = () => (
      <Table.Cell
        verticalAlign="top"
        onClick={this.handleOpen}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        className={classes.journeyCell}
        key={this.props.index}
        style={{
          padding: "5px 0",
          minWidth: 131,
          cursor: clickable ? "pointer" : "default",
          backgroundColor:
            this.props.currentDate === this.props.t.timestamp
              ? "#F5F5F5"
              : "inherit"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "45px"
          }}
        >
          {this.props.t ? (
            <span>
              {[...new Set(this.props.t.icons)].length < 4 ? (
                <span>
                  <span
                    style={{
                      position: "relative",
                      top: -6
                    }}
                    className={
                      this.props.currentDate === this.props.t.timestamp
                        ? "textBlack"
                        : this.props.lastUpdated === this.props.t.timestamp
                          ? "textBlue"
                          : "textBlack"
                    }
                  >
                    {moment(this.props.t.timestamp).format("DD")}
                  </span>
                  {[...new Set(this.props.t.icons)].map((icon, idx) => (
                    <span key={idx}>
                      <img
                        alt="event"
                        width={24}
                        height={22}
                        src={`/assets/images/${icon}`}
                        style={{
                          margin: "0 1px"
                        }}
                      />
                    </span>
                  ))}
                  {this.props.lastUpdated === this.props.t.timestamp ? (
                    <span className="textBlue" style={{ fontWeight: "bold" }}>
                      <br />資料更新日
                    </span>
                  ) : null}
                </span>
              ) : (
                <span>
                  <span
                    style={{
                      position: "relative"
                    }}
                    className={
                      this.props.currentDate === this.props.t.timestamp
                        ? "textBlack"
                        : this.props.lastUpdated === this.props.t.timestamp
                          ? "textBlue"
                          : "textBlack"
                    }
                  >
                    {moment(this.props.t.timestamp).format("DD")}
                  </span>
                  <span
                    style={{
                      margin: "0 1px",
                      color: "#11A847",
                      fontWeight: 600
                    }}
                  >
                    More
                  </span>
                  {this.props.lastUpdated === this.props.t.timestamp ? (
                    <span className="textBlue" style={{ fontWeight: "bold" }}>
                      <br />資料更新日
                    </span>
                  ) : null}
                </span>
              )}
            </span>
          ) : null}
          {this.props.t && this.props.t.icons.length ? (
            <Icon className={classes.chevron} name="chevron right" />
          ) : null}
        </div>
      </Table.Cell>
    );

    if (data !== null) {
      content = (
        <Fragment>
          <div className="modalHeader">
            {moment.unix(this.props.t.unixTimestamp).format("YYYY/MM/DD")}
          </div>
          <Table basic="very" textAlign="left">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>交易管道</Table.HeaderCell>
                <Table.HeaderCell>交易時間</Table.HeaderCell>
                <Table.HeaderCell>交易類別</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((d, i) => (
                <Table.Row key={i}>
                  <Table.Cell>
                    <img
                      alt="event"
                      src={`/assets/images/${d.channel
                        .replace(/ /g, "")
                        .toLowerCase()}.png`}
                      className={classes.icon}
                    />
                    <span className={classes.channel}>{d.channel}</span>
                  </Table.Cell>
                  <Table.Cell>{moment.unix(d.time).format("HH:mm")}</Table.Cell>
                  <Table.Cell className={classes.action}>{d.detail}</Table.Cell>
                </Table.Row>
              ))}
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
        </div>
      ) : null;
    }

    if (this.props.t !== null) {
      modalTrigger = clickable ? (
        <Modal trigger={renderCell()} closeIcon>
          <Modal.Content scrolling>
            {loading ? (
              <div className="modalLoaderDimmer">
                <Dimmer active>
                  <Loader content="Loading" />
                </Dimmer>
              </div>
            ) : null}
            {!loading ? content : null}
          </Modal.Content>
        </Modal>
      ) : (
        renderCell()
      );
    } else {
      modalTrigger = (
        <Table.Cell
          key={this.props.index}
          style={{
            padding: "5px 0",
            minWidth: 131
          }}
        />
      );
    }

    return modalTrigger;
  }
}

export default CustomerJourneyModal;
