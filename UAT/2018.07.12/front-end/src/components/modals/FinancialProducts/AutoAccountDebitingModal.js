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
import { getAutoAccountDebiting } from "../../../service/FinancialInformation";
import Constants from "../../../constants/Common";
import moment from "moment";

class AutoAccountDebitingModal extends Component {
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

    await getAutoAccountDebiting()
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
    let ccStmtAutoDeductInd = this.props.ccStmtAutoDeductInd;
    let records = null;
    if (!!data) {
      records = this.state.data.records;
    }
    let ccStmtAutoDeductStyle;
    let ccStmtAutoDeductButton;
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
          <div className="modalHeader">有/無自扣</div>
          <Table basic="very" textAlign="left">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>行庫名稱</Table.HeaderCell>
                <Table.HeaderCell>自動扣款帳號</Table.HeaderCell>
                <Table.HeaderCell>扣款比例</Table.HeaderCell>
                <Table.HeaderCell>生效日</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {records.map((d, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{d.bankDesc}</Table.Cell>
                  <Table.Cell>{d.acctNbr}</Table.Cell>
                  <Table.Cell>{d.autopayPercent}</Table.Cell>
                  <Table.Cell>
                    {moment(d.validDate).format("YYYY/MM/DD")}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Fragment>
      );
    } else {
      content = !loading ? (
        data !== null ? (
          <div className="btnRetryContainer">
            <Header
              as="h3"
              content={Constants.SERVICE_UNAVAILABLE}
              className="serviceUnavailable"
            />
          </div>
        ) : (
          <Header textAlign="center" content="無資料" className="noData" />
        )
      ) : null;
    }

    if (ccStmtAutoDeductInd === "y" || ccStmtAutoDeductInd === "Y") {
      ccStmtAutoDeductStyle = "green";
      ccStmtAutoDeductButton = {
        fontWeight: "bold"
      };
    } else {
      ccStmtAutoDeductStyle = "grey";
      ccStmtAutoDeductButton = {
        fontWeight: "normal"
      };
    }

    return (
      <span className={classes.creditCardSpan}>
        <Modal
          size="large"
          trigger={
            <Button
              onClick={this.handleOpen}
              open={this.state.modalOpen}
              onClose={this.handleClose}
              className={classes.paymentListButton}
              basic
              color={ccStmtAutoDeductStyle}
              style={ccStmtAutoDeductButton}
            >
              自動扣款
              <Icon
                className={classes.chevronRight}
                name="chevron right"
                //style={{ position: "relative", left: "20px" }}
                color={ccStmtAutoDeductStyle}
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

export default AutoAccountDebitingModal;
