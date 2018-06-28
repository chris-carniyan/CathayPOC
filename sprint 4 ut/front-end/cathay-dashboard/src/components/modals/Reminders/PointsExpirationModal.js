import React, { Component, Fragment } from "react";
import {
  Button,
  Icon,
  Modal,
  Dimmer,
  Loader,
  Header,
  Table
} from "semantic-ui-react";
import Constants from "../../../constants/Common";
//import classes from "../../../assets/css/Reminder.css";

class PointsExpirationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      loading: false
    };
  }

  handleOpen = async () => {
    this.setState({ data: null, loading: true, modalOpen: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, Constants.MODAL_LOADING);
  };

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const y1AsianExpireMiles = this.props.y1AsianExpireMiles;
    const clearedCostcoBonusBal = this.props.clearedCostcoBonusBal;
    const platinumNextMonExpirePs = this.props.platinumNextMonExpirePs;
    const generalNextMonExpirePs = this.props.generalNextMonExpirePs;
    //const y1EvaExpireMiles = this.props.y1EvaExpireMiles;

    let content = null;
    let clearedCostcoBonusBalHeaderCell = null;
    let clearedCostcoBonusBalTableCell = null;
    let { loading } = this.state;
    let currentMonth = new Date();
    let month = currentMonth.getMonth() + 1;

    if (
      clearedCostcoBonusBal > 0 &&
      (month === 8 || month === 9 || month === 10)
    ) {
      clearedCostcoBonusBalHeaderCell = (
        <Table.HeaderCell>多利金</Table.HeaderCell>
      );
      clearedCostcoBonusBalTableCell = (
        <Table.Cell verticalAlign="top">
          {clearedCostcoBonusBal > 0 ? (
            <span>
              {clearedCostcoBonusBal
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              <span>點</span>
            </span>
          ) : null}
        </Table.Cell>
      );
    }

    if (
      y1AsianExpireMiles > 0 ||
      clearedCostcoBonusBal > 0 ||
      platinumNextMonExpirePs > 0 ||
      generalNextMonExpirePs > 0
    ) {
      content = (
        <Fragment>
          <div className="modalHeader">點數到期</div>
          <Table basic="very" textAlign="left">
            <Table.Header>
              <Table.Row>
                {generalNextMonExpirePs > 0 || platinumNextMonExpirePs > 0 ? (
                  <Table.HeaderCell>紅利</Table.HeaderCell>
                ) : null}
                {clearedCostcoBonusBalHeaderCell}
                {y1AsianExpireMiles > 0 ? (
                  <Table.HeaderCell>亞萬里程數</Table.HeaderCell>
                ) : null}
                {/*y1EvaExpireMiles > 0 ? (<Table.HeaderCell>長榮哩程數</Table.HeaderCell>) : null*/}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                {generalNextMonExpirePs > 0 || platinumNextMonExpirePs > 0 ? (
                  <Table.Cell verticalAlign="top">
                    (最近一個月到期)
                    {generalNextMonExpirePs > 0 ? (
                      <span>
                        <br />
                        <span>一般：</span>{" "}
                        {generalNextMonExpirePs
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        <span>點</span>
                      </span>
                    ) : null}
                    <br />
                    {platinumNextMonExpirePs > 0 ? (
                      <span>
                        <span>尊白：</span>{" "}
                        {platinumNextMonExpirePs
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        <span>點</span>
                      </span>
                    ) : null}
                  </Table.Cell>
                ) : null}
                {clearedCostcoBonusBalTableCell}
                {y1AsianExpireMiles > 0 ? (
                  <Table.Cell verticalAlign="top">
                    {y1AsianExpireMiles > 0 ? (
                      <span>
                        <span>(最近一個月到期)</span>
                        <br />{" "}
                        {y1AsianExpireMiles
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        <span>點</span>
                      </span>
                    ) : null}
                  </Table.Cell>
                ) : null}
                {/*y1EvaExpireMiles > 0 ? (
                  <Table.Cell verticalAlign="top">
                    {y1EvaExpireMiles > 0 ? (
                      <span>
                        <span>((最近一個月到期)</span>
                        <br />{" "}
                        {y1EvaExpireMiles
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        <span>點</span>
                      </span>
                    ) : null}}
                  </Table.Cell>
                ) : null*/}
              </Table.Row>
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

    return (
      <span>
        <Modal
          size="small"
          trigger={
            <Button
              onClick={this.handleOpen}
              open={this.state.modalOpen}
              onClose={this.handleClose}
              basic
              color="green"
              style={{
                fontSize: 18,
                width: 140,
                height: 40,
                padding: 0,
                marginBottom: 5
              }}
            >
              點數 到期
              <Icon
                name="chevron right"
                style={{ float: "right", margin: "auto" }}
              />
            </Button>
          }
          closeIcon
        >
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
      </span>
    );
  }
}

export default PointsExpirationModal;
