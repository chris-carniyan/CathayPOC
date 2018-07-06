import React, { Component, Fragment } from "react";
import { Button, Icon, Modal, Dimmer, Loader, Table } from "semantic-ui-react";
import Constants from "../../../constants/Common";

class AutoAccountDebitingFailureModal extends Component {
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

  handleClose = () => this.setState({ loading: false, modalOpen: false });

  render() {
    let content = null;
    let { loading } = this.state;

    const equals = "=";

    content = (
      <Fragment>
        <div className="modalHeader">自扣失敗</div>
        <p style={{ fontSize: "18px" }}>連續自扣失敗已達X次</p>
        <Table basic="very" textAlign="left">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                (1){" "}
                <span style={{ fontWeight: "bold" }}>1&lt;{equals}X&lt;3</span>
              </Table.Cell>
              <Table.Cell>提醒客戶在due day前準備足夠餘額</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                (2) <span style={{ fontWeight: "bold" }}>X&gt;{equals}3</span>
              </Table.Cell>
              <Table.Cell>
                提醒客戶自扣已失效，提供其它繳款方式或重新申請自扣。
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Fragment>
    );

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
              自扣失敗
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

export default AutoAccountDebitingFailureModal;
