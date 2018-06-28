import React, { Component, Fragment } from "react";
import {
  Icon,
  Modal,
  Table,
  Button,
  Header,
  Dimmer,
  Loader
} from "semantic-ui-react";
import classes from "../../../assets/css/FinancialInformation.css";
import { getUtilityBillsPayment } from "../../../service/FinancialInformation";
import Constants from "../../../constants/Common";
import moment from "moment";

class UtilityBillsPaymentModal extends Component {
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

    await getUtilityBillsPayment()
      .then(response => {
        if (
          response.status === Constants.SUCCESS_STATUS &&
          response.data.code === Constants.SUCCESS_CODE
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
    let ccPubAutoDeductInd = this.props.ccPubAutoDeductInd;
    let paymentData = this.state.data;
    let records = null;
    if (!!data) {
      records = this.state.data.records;
    }
    let ccPubAutoDeductStyle;
    let ccPubAutoDeductButton;
    let content;

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
          <div className="modalHeader">信用卡代扣公用事業費用代扣</div>
          <Table basic="very" textAlign="left">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>身份證字號</Table.HeaderCell>
                <Table.HeaderCell>卡號</Table.HeaderCell>
                <Table.HeaderCell>消費日期</Table.HeaderCell>
                <Table.HeaderCell>消費摘要</Table.HeaderCell>
                <Table.HeaderCell>金額</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {records.map((d, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{paymentData.customerId}</Table.Cell>
                  <Table.Cell>{d.cardNbr}</Table.Cell>
                  <Table.Cell>
                    {moment(d.txnDate).format("YYYY/MM/DD")}
                  </Table.Cell>
                  <Table.Cell>{d.merchantName}</Table.Cell>
                  <Table.Cell>{d.txnAmt}</Table.Cell>
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

    if (ccPubAutoDeductInd === "y" || ccPubAutoDeductInd === "Y") {
      ccPubAutoDeductStyle = "green";
      ccPubAutoDeductButton = {
        fontWeight: "bold"
      };
    } else {
      ccPubAutoDeductStyle = "grey";
      ccPubAutoDeductButton = {
        fontWeight: "normal"
      };
    }

    return (
      <span className={classes.creditCardSpan}>
        <Modal
          size="large"
          trigger={
            <Button
              className={classes.paymentListButton}
              onClick={this.handleOpen}
              open={this.state.modalOpen}
              onClose={this.handleClose}
              basic
              color={ccPubAutoDeductStyle}
              style={ccPubAutoDeductButton}
            >
              近半年公用事業/停車費交易
              <Icon
                className={classes.chevronRight}
                name="chevron right"
                basic="true"
                //style={{ position: "relative", left: "20px" }}
                color={ccPubAutoDeductStyle}
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
            {content}
          </Modal.Content>
        </Modal>
      </span>
    );
  }
}

export default UtilityBillsPaymentModal;
