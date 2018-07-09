// Core
import React, { Component, Fragment } from "react";
// Plugins / Library / Package
import { Dimmer, Grid, Header, Loader, Modal, Table } from "semantic-ui-react";
// Components / Others
import Constants from "../../../constants/Common";
import ProductRecommendationConstants from "../../../constants/ProductRecommendation";
import { retrieveProductPitch } from "../../../service/ProductRecommendation";

class ProductSalesPitchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      modalOpen: false,
      loading: false
    };
  }

  getBankingFormattedText = data => {
    return data
      ? ProductRecommendationConstants.RIGHT_DATA
      : data === null
        ? ProductRecommendationConstants.NO_BANKING_DATA
        : ProductRecommendationConstants.WRONG_DATA;
  };

  getCreditCardFormattedText = data => {
    return data
      ? ProductRecommendationConstants.RIGHT_DATA
      : data === null
        ? ProductRecommendationConstants.NO_CREDIT_CARD_DATA
        : ProductRecommendationConstants.WRONG_DATA;
  };

  isDataWrong = data => (data === false ? "#EF2C2C" : null);

  handleOpen = async () => {
    this.setState({ loading: true, data: null, modalOpen: true });

    await retrieveProductPitch(this.props.pitchClassify)
      .then(response => {
        console.log("Retrieve Product Pitch RESPONSE:", response);
        response.status === Constants.SUCCESS_STATUS &&
          response.data.code === Constants.SUCCESS_CODE &&
          this.setState({
            data: response.data.result
          });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { data, loading } = this.state;
    const { trigger, modalHeader, pitchClassify, memo } = this.props;
    let content = null;

    if (!!data) {
      content = (
        <Fragment>
          <div className="modalHeader">{modalHeader}</div>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "600"
            }}
            dangerouslySetInnerHTML={{ __html: data.productPitch }}
          />

          {pitchClassify === ProductRecommendationConstants.PAYINS && !!memo ? (
            <p>{memo}</p>
          ) : null}

          {pitchClassify === ProductRecommendationConstants.CDU ? (
            <Grid columns={2} divided relaxed>
              <Grid.Column>
                <div
                  style={{
                    color: "#EE7D32",
                    fontSize: "18px",
                    fontWeight: "bold",
                    paddingBottom: "15px"
                  }}
                >
                  銀行 CIF 通聯狀態
                </div>
                <Table basic="very" padded columns={2}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>項目</Table.HeaderCell>
                      <Table.HeaderCell>狀態</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>EMAIL</Table.Cell>
                      <Table.Cell>
                        <span
                          style={{ color: this.isDataWrong(data.bkcEmail) }}
                        >
                          {this.getBankingFormattedText(data.bkcEmail)}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>公司電話</Table.Cell>
                      <Table.Cell>
                        <span
                          style={{ color: this.isDataWrong(data.bkcComTel) }}
                        >
                          {this.getBankingFormattedText(data.bkcComTel)}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>家用電話</Table.Cell>
                      <Table.Cell>
                        <span
                          style={{ color: this.isDataWrong(data.bkcHomeTel) }}
                        >
                          {this.getBankingFormattedText(data.bkcHomeTel)}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>手機電話</Table.Cell>
                      <Table.Cell>
                        <span
                          style={{ color: this.isDataWrong(data.bkcPhone) }}
                        >
                          {this.getBankingFormattedText(data.bkcPhone)}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>戶籍地址</Table.Cell>
                      <Table.Cell>
                        <span
                          style={{
                            color: this.isDataWrong(data.bkcResidentialAddress)
                          }}
                        >
                          {this.getBankingFormattedText(
                            data.bkcResidentialAddress
                          )}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>通訊地址</Table.Cell>
                      <Table.Cell>
                        <span
                          style={{
                            color: this.isDataWrong(data.bkcPermanentAddress)
                          }}
                        >
                          {this.getBankingFormattedText(
                            data.bkcPermanentAddress
                          )}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>

              <Grid.Column>
                <div
                  style={{
                    color: "#11B4F0",
                    fontSize: "18px",
                    fontWeight: "bold",
                    paddingBottom: "15px"
                  }}
                >
                  信用卡 通聯狀態
                </div>
                <Table basic="very" padded columns={2}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>項目</Table.HeaderCell>
                      <Table.HeaderCell>狀態</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>EMAIL</Table.Cell>
                      <Table.Cell>
                        <span style={{ color: this.isDataWrong(data.ccEmail) }}>
                          {this.getCreditCardFormattedText(data.ccEmail)}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>公司電話</Table.Cell>
                      <Table.Cell>
                        <span
                          style={{ color: this.isDataWrong(data.ccComTel) }}
                        >
                          {this.getCreditCardFormattedText(data.ccComTel)}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>家用電話</Table.Cell>
                      <Table.Cell>
                        <span
                          style={{ color: this.isDataWrong(data.ccHomeTel) }}
                        >
                          {this.getCreditCardFormattedText(data.ccHomeTel)}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>手機電話</Table.Cell>
                      <Table.Cell>
                        <span style={{ color: this.isDataWrong(data.ccPhone) }}>
                          {this.getCreditCardFormattedText(data.ccPhone)}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>戶籍地址</Table.Cell>
                      <Table.Cell>
                        <span
                          style={{
                            color: this.isDataWrong(data.ccResidentialAddress)
                          }}
                        >
                          {this.getCreditCardFormattedText(
                            data.ccResidentialAddress
                          )}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>通訊地址</Table.Cell>
                      <Table.Cell>
                        <span
                          style={{
                            color: this.isDataWrong(data.ccPermanentAddress)
                          }}
                        >
                          {this.getCreditCardFormattedText(
                            data.ccPermanentAddress
                          )}
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Grid.Column>
            </Grid>
          ) : null}
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
          <span
            onClick={this.handleOpen}
            open={this.state.modalOpen}
            onClose={this.handleClose}
          >
            {trigger}
          </span>
        }
        closeIcon
      >
        <Modal.Content>
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

export default ProductSalesPitchModal;
