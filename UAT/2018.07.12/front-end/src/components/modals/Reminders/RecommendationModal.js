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

class RecommendationModal extends Component {
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

    await getReminderGiftCampaign(Constants.ACTIVITIES)
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
    let content = null;

    if (!!data || (data !== undefined && data !== null && data.length !== 0)) {
      content = (
        <Fragment>
          <div className="modalHeader">登錄活動推薦</div>
          <Table basic="very" textAlign="left">
            <Table.Body>
              {data.map((d, i) => (
                <Table.Row key={i}>
                  <Fragment>
                    <Table.Cell>
                      <span>
                        <a
                          target="_blank"
                          style={{ textDecoration: "underline" }}
                          href={d.link}
                        >
                          {d.activity}
                        </a>
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      {d.activeCode === null || d.activeCode === "" ? (
                        <span>須登錄</span>
                      ) : (
                        <span>不須登錄</span>
                      )}
                    </Table.Cell>
                  </Fragment>
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
                padding: 0
              }}
            >
              登錄活動 推薦
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

export default RecommendationModal;
