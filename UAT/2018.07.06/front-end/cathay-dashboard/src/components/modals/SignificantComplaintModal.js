import React, { Component, Fragment } from "react";
import { Dimmer, Loader, Modal, Header, Table } from "semantic-ui-react";
import moment from "moment";
import { getCustomerProfileComplaintsMongo } from "../../service/CustomerProfile";
import Constants from "../../constants/Common";
import Helper from "../../utility/Helper";
class SignificantComplaintModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintsdata: null,
      modalOpen: false,
      loading: false
    };
  }

  handleOpen = () => {
    this.setState({ loading: true, data: null, modalOpen: true });
    getCustomerProfileComplaintsMongo(Helper.getQueryParameters())
      .then(response => {
        console.log("Significant Complaints RESPONSE:", response);
        if (
          response.status === Constants.SUCCESS_STATUS &&
          response.data.code === Constants.SUCCESS_CODE
        ) {
          this.setState({ complaintsdata: response.data.result });
        }
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };
  handleClose = () => this.setState({ modalOpen: false });

  getByteLength(str) {
    // returns the byte length of an utf8 string
    var s = str.length;
    for (var i = str.length - 1; i >= 0; i--) {
      var code = str.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) s++;
      else if (code > 0x7ff && code <= 0xffff) s += 2;
      if (code >= 0xdc00 && code <= 0xdfff) i--; //trail surrogate
    }
    return s;
  }

  formatDateEpoch(date) {
    let formatted = moment.unix(date).format("YYYY-MM-DD hh:MM");
    return formatted;
  }
  checkIfGreaterThan100Bytes(description) {
    let length = this.getByteLength(description);
    if (length > 100) {
      return description;
    } else {
      return "";
    }
  }
  render() {
    const { complaintsdata, loading } = this.state;
    let content = null;
    if (!!complaintsdata && !loading) {
      content = (
        <Fragment>
          <div className="modalHeader">重大抱怨</div>
          <Table basic="very" padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>客訴日期</Table.HeaderCell>
                <Table.HeaderCell>客訴內容</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {complaintsdata.map((complaints, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      {this.formatDateEpoch(complaints.dateTime)}
                    </Table.Cell>
                    <Table.Cell>{complaints.complaint}</Table.Cell>
                  </Table.Row>
                );
              })}
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
      <Modal
        trigger={
          <div
            onClick={this.handleOpen}
            open={this.state.modalOpen}
            onClose={this.handleClose}
            className="textRed hover padding-left-20"
          >
            {this.props.complaintCount} 項重大抱怨
            <img
              alt="warning"
              className="angryIcon"
              width={36}
              height={36}
              src="/assets/images/angryFace.png"
            />
          </div>
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
    );
  }
}
export default SignificantComplaintModal;
