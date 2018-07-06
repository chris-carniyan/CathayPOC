import React, { Component, Fragment } from "react";
import { Icon, Modal, Table, Header, Dimmer, Loader } from "semantic-ui-react";
import classes from "../../../assets/css/FinancialInformation.css";
import { getSavings } from "../../../service/FinancialInformation";
import Constants from "../../../constants/Common";

class SavingsModal extends Component {
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

    await getSavings()
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
    let allDpActiveInd = this.props.allDpActiveInd;
    let allDpActiveChevron;
    let content;

    if (allDpActiveInd === "y" || allDpActiveInd === "Y") {
      allDpActiveChevron = (
        <Icon
          className={classes.chevronRight}
          name="chevron right"
          basic="true"
          color="green"
        />
      );
    } else {
      allDpActiveChevron = null;
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
          <div className="modalHeader">存款</div>
          <Table basic="very" textAlign="left">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>產品名稱</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {records.map((d, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{d.productDesc}</Table.Cell>
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
      <span className={classes.creditCardSpan}>
        <Modal
          size="mini"
          trigger={
            <span
              className={classes.savings}
              onClick={this.handleOpen}
              open={this.state.modalOpen}
              onClose={this.handleClose}
            >
              存款
              {allDpActiveChevron}
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

export default SavingsModal;
