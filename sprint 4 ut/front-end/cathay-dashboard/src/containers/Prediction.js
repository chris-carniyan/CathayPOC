// Core
import React, { Component } from "react";
// Plugin / Package
import {
  Button,
  Dimmer,
  Header,
  Loader,
  Table,
  Segment
} from "semantic-ui-react";
// Components / Utilities
import { getProblemPredictions } from "../service/Predictions";
import Constants from "../constants/Common";

class CustomerQuestionsPrediction extends Component {
  state = {
    data: null,
    loading: true
  };

  handleRetry = async (retry = false) => {
    retry && this.setState({ loading: true });

    await getProblemPredictions().then(response => {
      console.log("PRDB response", response);

      setTimeout(() => {
        response.status === Constants.SUCCESS_STATUS &&
        response.data.code === Constants.SUCCESS_CODE
          ? this.setState({ data: response.data.result, loading: false })
          : this.setState({ loading: false });
      }, retry ? Constants.RETRY_INTERVAL : 0);
    });
  };

  componentDidMount() {
    this.handleRetry();
  }

  render() {
    const { data, loading } = this.state;
    let content = null;

    if (!!data) {
      content =
        data.length > 0 ? (
          <Table basic="very" fixed singleLine>
            <Table.Body>
              {data.map((val, idx) => {
                if (idx > 2) return false;

                return (
                  <Table.Row key={idx}>
                    <Table.Cell>{val}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        ) : (
          <Header
            as="h2"
            textAlign="center"
            content="無資料"
            className="noData"
          />
        );
    } else {
      content = !loading && (
        <div className="btnRetryContainer">
          <Header
            as="h3"
            content={Constants.SERVICE_UNAVAILABLE}
            className="serviceUnavailable"
          />
          <Button
            onClick={() => this.handleRetry(true)}
            content={Constants.RETRY}
            size="large"
          />
        </div>
      );
    }

    return (
      <Segment>
        {loading && (
          <Dimmer active>
            <Loader content="Loading" />
          </Dimmer>
        )}
        <div className="segmentHeader">預測問題</div>
        <div className="segmentContent">{content}</div>
      </Segment>
    );
  }
}

export default CustomerQuestionsPrediction;
