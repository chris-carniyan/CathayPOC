import React, { Component, Fragment } from "react";
import { Icon, Modal, Table, Header, Dimmer, Loader } from "semantic-ui-react";
import classes from "../../../assets/css/FinancialInformation.css";
import { getPaymentHabits } from "../../../service/FinancialInformation";
import Constants from "../../../constants/Common";
import moment from "moment";

class PaymentsHabitsModal extends Component {
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

    await getPaymentHabits()
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
    let records = null;
    if (!!data) {
      records = this.state.data.records;
    }
    let content;

    if (!!data) {
      content = (
        <Fragment>
          <div className="modalHeader">繳款明細</div>
          <Table basic="very" textAlign="left">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>帳單月份</Table.HeaderCell>
                <Table.HeaderCell>繳款日期</Table.HeaderCell>
                <Table.HeaderCell>繳款方式</Table.HeaderCell>
                <Table.HeaderCell>繳款金額</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {records.map((d, i) => (
                <Table.Row key={i}>
                  <Table.Cell>
                    {d.stmtYearMonth.match(/\d+/g)
                      ? moment(d.stmtYearMonth, "YYYYDD").format("YYYY/DD")
                      : d.stmtYearMonth}
                  </Table.Cell>
                  <Table.Cell>
                    {moment(d.txnDate).format("YYYY/MM/DD")}
                  </Table.Cell>
                  <Table.Cell>{d.payChannelTypeDesc}</Table.Cell>
                  <Table.Cell>
                    {d.payAmt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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

    return (
      <span>
        <Modal
          size="small"
          trigger={
            <span
              className={classes.paymentHabits}
              onClick={this.handleOpen}
              open={this.state.modalOpen}
              onClose={this.handleClose}
            >
              <span className={classes.paymentTitle}>繳款 習慣</span>
              <Icon
                className={classes.chevronRight}
                style={{ marginBottom: "10px" }}
                name="chevron right"
                basic="true"
              />
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

export default PaymentsHabitsModal;
