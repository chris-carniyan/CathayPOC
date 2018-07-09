import React, { Component, Fragment } from "react";
import { Icon, Modal, Table, Header, Dimmer, Loader } from "semantic-ui-react";
import classes from "../../../assets/css/FinancialInformation.css";
import { getCards } from "../../../service/FinancialInformation";
import Constants from "../../../constants/Common";
import moment from "moment";

class CardsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      modalOpen: false,
      loading: false
    };
  }

  handleOpen = async () => {
    this.setState({ data: null, loading: true, modalOpen: true });

    const queryCardInd = this.props.queryInd;

    await getCards(queryCardInd)
      .then(
        response =>
          response.status === Constants.SUCCESS_STATUS &&
          response.data.code === Constants.SUCCESS_CODE &&
          this.setState({
            data: response.data.result
          })
      )
      .catch(error => console.log(error))
      .then(() => this.setState({ loading: false }));
  };

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    let { data, loading } = this.state;
    let records = null;
    let cardNumber = this.props.cardNumber;
    if (!!data) {
      records = this.state.data.records;
    }

    let content;
    let cardColor;
    let chevronRight;

    if (cardNumber !== 0) {
      cardColor = {
        color: "#11A847"
      };
      chevronRight = (
        <Icon className={classes.chevronRight} name="chevron right" />
      );
    } else {
      cardColor = {
        color: "#9A9A9A",
        marginRight: "35px"
      };
      chevronRight = null;
    }

    if (
      data !== undefined &&
      data !== null &&
      data.length !== 0 &&
      records !== undefined &&
      records !== null &&
      records.length !== 0
    ) {
      content = (
        <Fragment>
          <div className="modalHeader">信用卡 </div>
          <Table basic="very" textAlign="left">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>卡別</Table.HeaderCell>
                <Table.HeaderCell>卡面名稱</Table.HeaderCell>
                <Table.HeaderCell>卡號</Table.HeaderCell>
                <Table.HeaderCell>連結帳號</Table.HeaderCell>
                <Table.HeaderCell>主附卡</Table.HeaderCell>
                <Table.HeaderCell>持卡人</Table.HeaderCell>
                <Table.HeaderCell>發卡日</Table.HeaderCell>
                <Table.HeaderCell>有效期限</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {records.map((d, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{d.cardType}</Table.Cell>
                  <Table.Cell>{d.cardName}</Table.Cell>
                  <Table.Cell>{d.cardNo}</Table.Cell>
                  <Table.Cell>{d.relatedAcctNo}</Table.Cell>
                  <Table.Cell>{d.primaryCardInd}</Table.Cell>
                  <Table.Cell>{d.cardholderName}</Table.Cell>
                  <Table.Cell>
                    {moment(d.acctOpenDate).format("YYYY/MM/DD")}
                  </Table.Cell>
                  <Table.Cell>{d.cardExpiredDate}</Table.Cell>
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

    return (
      <span className={classes.cardSpan}>
        <Modal
          size="fullscreen"
          trigger={
            <span
              onClick={this.handleOpen}
              open={this.state.modalOpen}
              onClose={this.handleClose}
            >
              <span className={classes.cardNumber} style={cardColor}>
                {cardNumber}&nbsp;張&nbsp;{chevronRight}
              </span>
            </span>
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
            {content}
          </Modal.Content>
        </Modal>
      </span>
    );
  }
}

export default CardsModal;
