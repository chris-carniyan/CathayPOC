import React, { Component, Fragment } from "react";
import {
  Button,
  Icon,
  Modal,
  Dimmer,
  Loader,
  Table,
  Header
} from "semantic-ui-react";
import { getReminderGiftCampaign } from "../../../service/Reminder";
import Constants from "../../../constants/Common";

class NewCreditCardCustomerWelcomeGiftModal extends Component {
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

    await getReminderGiftCampaign(Constants.GIFT_DETAILS)
      .then(response => {
        if (
          response.status === Constants.SUCCESS_STATUS &&
          response.data.code === Constants.SUCCESS_CODE
        ) {
          this.setState({
            data: response.data.result
          });
        }
        console.log(response);
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
    let cardNo = null;
    let usedCardCnt = null;
    let campaignEndDate = null;
    let campaignCode = null;
    let diffCardCnt = null;
    let content;

    if (!!data) {
      cardNo = this.state.data.cardNo;
      usedCardCnt = this.state.data.usedCardCnt;
      campaignEndDate = this.state.data.campaignEndDate;
      campaignCode = this.state.data.campaignCode;
      diffCardCnt = this.state.data.diffCardCnt;
    }

    if (data !== undefined && data !== null && data.length !== 0) {
      content = (
        <Fragment>
          <div className="modalHeader">新戶首刷禮</div>
          <Table basic="very" textAlign="left">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>卡號末8碼</Table.HeaderCell>
                <Table.HeaderCell>已刷幾筆</Table.HeaderCell>
                <Table.HeaderCell>活動訖日</Table.HeaderCell>
                <Table.HeaderCell>活動代碼</Table.HeaderCell>
                <Table.HeaderCell>還差幾筆</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{cardNo.substr(-8)}</Table.Cell>
                <Table.Cell>{campaignCode}</Table.Cell>
                <Table.Cell>{campaignEndDate}</Table.Cell>
                <Table.Cell>{usedCardCnt}</Table.Cell>
                <Table.Cell>{diffCardCnt}</Table.Cell>
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
          size="large"
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
                padding: 0
              }}
            >
              新戶 首刷禮
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
            {content}
          </Modal.Content>
        </Modal>
      </span>
    );
  }
}

export default NewCreditCardCustomerWelcomeGiftModal;
