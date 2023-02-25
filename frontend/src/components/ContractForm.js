import React, { useState, createContext, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Row,
} from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const DataContext = createContext({});
const ContractForm = (props) => {
  console.log(props.contractData);
  const [data, setData] = useState({});
  let userInfoFromStorage = localStorage.getItem('userInfo')
              ? JSON.parse(localStorage.getItem('userInfo'))
              : null;
  const [role, setRole] = useState("");
  const history = useHistory();

    useEffect(() => {
      if (userInfoFromStorage) {
        setRole(userInfoFromStorage.role);
      }
      setData(props.contractData);
    }, [props.contractData, userInfoFromStorage]);

    const sendContract = async (status) => {

      const updateData = {
        update: {
          status: status,
        },
      };

    try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL +
          `/api/creator-contract/` +
          props.contractData._id,
        updateData,
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }finally{
      if (role === 'advertiser'){
        history.push('/campaigns/1');
      }
      else if (role === 'creator') {
        history.push('/creatorCampaigns');
      }
    }
  }

  const customizedBtn = () => {
    console.log(role);
    console.log(data?.status);
    if (role === 'advertiser' && data?.status === 'draft') {
      return (
        <div>
          <Button onClick={() => sendContract('in progress')}>Send</Button>
          <FormText color="muted">
          By pressing this button, you will be sending the contract to the creator mentioned in the contract.
          </FormText>
        </div>
      );
    } else if (role === 'creator' && data?.status === 'in progress') {
      return (
        <div>
          <Button onClick={() => sendContract('agreed')}>
            Agree with Contract T&C
          </Button>
          <FormText color="muted">
            By pressing this button, you agree to the terms and conditions mentioned in the contract.
          </FormText>
        </div>
      );
    }
  }

  return (
    <DataContext.Provider value={{ data, setData }}>
      <Form>
        <Row>
          <Col>
            <FormGroup>
              <Label for="dateOfAgreement">Date of Agreement</Label>
              <Input
                type="date"
                name="dateOfAgreement"
                id="dateOfAgreement"
                placeholder="Date when the agreement is made"
                value={data?.dateOfAgreement || ''}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xl={6} lg={6} md={6} sm={6} xs={12}>
            <Card>
              <CardHeader>Creator</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="creatorUsername">Creator Username</Label>
                  <FormText color="muted">
                    A creator is a person who is paid to publish paid content on
                    their social media.
                  </FormText>
                  <Input
                    type="text"
                    name="creatorUsername"
                    id="creatorUsername"
                    placeholder="Creator Username"
                    value={data?.creator?.username || ''}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="creatorName">Creator Name</Label>
                  <Input
                    type="text"
                    name="creatorName"
                    id="creatorName"
                    placeholder="Creator Name"
                    value={data?.creator?.name || ''}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={6} md={6} sm={6} xs={12}>
            <Card>
              <CardHeader>Advertiser</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="advertiserUsername">Advertiser Username</Label>
                  <FormText color="muted">
                    An advertiser is a person who is paying for the Creator's
                    services.
                  </FormText>
                  <Input
                    type="text"
                    name="advertiserUsername"
                    id="advertiserUsername"
                    placeholder="Advertiser Username"
                    value={data?.advertiser?.username || ''}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="advertiserName">Advertiser Name</Label>
                  <Input
                    type="text"
                    name="advertiserName"
                    id="advertiserName"
                    placeholder="Advertiser Name"
                    value={data?.advertiser?.name || ''}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>Term of Contract</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="date"
                    name="contractStartDate"
                    id="startDate"
                    placeholder="Contract Start Date"
                    value={data?.contractStartDate || ''}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="endDate">End Date</Label>
                  <FormText color="muted"></FormText>
                  <Input
                    type="date"
                    name="contractEndDate"
                    id="endDate"
                    placeholder="Contract End Date"
                    value={data?.contractEndDate || ''}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl={6} lg={6} md={6} sm={6} xs={12}>
            <Card>
              <CardHeader>Content Requirements</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="content">
                    Provide a general summary of what the creators will be
                    posting
                  </Label>
                  <Input
                    type="textarea"
                    name="content"
                    value={data?.publishedContent?.content || ''}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={6} md={6} sm={6} xs={12}>
            <Card>
              <CardHeader>Social Media Platforms</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="platforms">
                    Creator is to publish the content on:
                  </Label>
                  <Input
                    type="textarea"
                    name="platforms"
                    value={data?.publishedContent?.platforms || ''}
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl={6} lg={6} md={6} sm={6} xs={12}>
            <Card>
              <CardHeader>Payment</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="flatFee">Flat Fee ($)</Label>
                  <Input
                    type="number"
                    name="flatFee"
                    id="flatFee"
                    placeholder="Flat Fee ($)"
                    value={data?.paymentDetails?.flatFee || ''}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="paymentTerm">Payment Term ($)</Label>
                  <FormText color="muted">
                    Allowable days following Advertiser's receipt of
                    Influencer's invoice to pay the invoice
                  </FormText>
                  <Input
                    type="number"
                    name="paymentTerm"
                    id="paymentTerm"
                    placeholder="Number of Days to be Paid Within"
                    value={data?.paymentDetails?.paymentTerm || ''}
                  />
                </FormGroup>
              </CardBody>
            </Card>

            <br />

            <Card>
              <CardHeader>Copyright</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="copyright">
                    Who will be the owner of the content being published?
                  </Label>
                  <FormText color="muted">
                    If the content in the posts contains any intellectual
                    property of the Advertiser, otherwise the content is
                    normally under the ownership of the Creator.
                  </FormText>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="copyright"
                        id="copyright1"
                        value="creator"
                        checked={data?.creator?._id === data?.copyright}
                      />{' '}
                      Creator
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="copyright"
                        id="copyright2"
                        value="advertiser"
                        checked={data?.advertiser?._id === data?.copyright}
                      />{' '}
                      Advertiser
                    </Label>
                  </FormGroup>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={6} md={6} sm={6} xs={12}>
            <Card>
              <CardHeader>Exclusivity</CardHeader>
              <CardBody>
                <FormGroup>
                  <Label for="competitors" id="competitors">
                    List competitors or industries the creator CANNOT work for:
                  </Label>
                  <FormText color="muted">
                    Any products, services or specific competitors that the
                    creator will be prohibited from promoting on their social
                    media
                  </FormText>
                  <Input
                    type="textarea"
                    id="competitor"
                    name="competitor"
                    value={data?.exclusivity?.competitor || ''}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="isExclusive">
                    How long will the creator be exclusive to the Advertiser?
                  </Label>
                  <FormText color="muted">
                    Allowable days following Advertiser's receipt of
                    Influencer's invoice to pay the invoice
                  </FormText>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="isExclusive"
                        id="isExclusive1"
                        value="tillAgreement"
                        checked={
                          data?.exclusivity?.isExclusive === 'tillAgreement'
                        }
                      />{' '}
                      Until the end of this Agreement
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="isExclusive"
                        id="isExclusive2"
                        value="tillAfterAgreement"
                        checked={
                          data?.exclusivity?.isExclusive ===
                          'tillAfterAgreement'
                        }
                      />{' '}
                      Until the end of this Agreement AND for a specific period
                      afterwards
                    </Label>
                  </FormGroup>
                  <br />
                  <Label for="exclusivePeriod">
                    Enter the period that the creator must remain exclusive to
                    the Advertiser (after the agreement ends)
                  </Label>
                  <Input
                    type="number"
                    name="exclusivePeriod"
                    id="exclusivePeriod"
                    placeholder="Exclusive Period in Day(s)"
                    value={data?.exclusivity?.exclusivePeriod}
                    disabled={
                      data?.exclusivity?.isExclusive !== 'tillAfterAgreement'
                    }
                  />
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup check row>
              <Col>
                {customizedBtn()}
              </Col>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </DataContext.Provider>
  );
};

export default ContractForm;
