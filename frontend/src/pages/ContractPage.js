import Page from '../components/Page';
import React, { useState, createContext } from 'react';
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
const ContractPage = () => {
  const [ data, setData ] = useState({});
  const history = useHistory();

    const inputChangeHandler = e => {
        const {name, value} = e.target
        setData({...data, [name]: value})
        if (name === "isExclusive" && value === "tillAgreement" && data?.exclusivePeriod){
          setData(current => {
            // remove cost key from object
            const {exclusivePeriod, ...rest} = current;
            return rest;
          });
        }
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        console.log(data)
        //Form submission happens here

        try{
              const response = await axios.post(
        process.env.REACT_APP_API_URL + `/api/creator-contract`,
        data)

        console.log(response.data);
    }
catch (error) {
      console.error(error);
    }
    finally{
      history.push('/campaigns/1');
    }
    }

  return (
    <Page
      title="Social Media Creator Contract"
      breadcrumbs={[{ name: 'Forms', active: true }]}
    >
      <DataContext.Provider value={{ data, setData }}>
        <Form onSubmit={onSubmitHandler}>
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
                  onChange={inputChangeHandler}
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
                      A creator is a person who is paid to publish paid content
                      on their social media.
                    </FormText>
                    <Input
                      type="text"
                      name="creatorUsername"
                      id="creatorUsername"
                      placeholder="Creator Username"
                      value={data?.creatorUsername || ''}
                      onChange={inputChangeHandler}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="creatorName">Creator Name</Label>
                    <Input
                      type="text"
                      name="creatorName"
                      id="creatorName"
                      placeholder="Creator Name"
                      value={data?.creatorName || ''}
                      onChange={inputChangeHandler}
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
                      value={data?.advertiserUsername || ''}
                      onChange={inputChangeHandler}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="advertiserName">Advertiser Name</Label>
                    <Input
                      type="text"
                      name="advertiserName"
                      id="advertiserName"
                      placeholder="Advertiser Name"
                      value={data?.advertiserName || ''}
                      onChange={inputChangeHandler}
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
                      name="startDate"
                      id="startDate"
                      placeholder="Contract Start Date"
                      value={data?.startDate || ''}
                      onChange={inputChangeHandler}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="endDate">End Date</Label>
                    <FormText color="muted"></FormText>
                    <Input
                      type="date"
                      name="endDate"
                      id="endDate"
                      placeholder="Contract End Date"
                      value={data?.endDate || ''}
                      onChange={inputChangeHandler}
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
                      value={data?.content || ''}
                      onChange={inputChangeHandler}
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
                      value={data?.platforms || ''}
                      onChange={inputChangeHandler}
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
                      value={data?.flatFee || ''}
                      onChange={inputChangeHandler}
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
                      value={data?.paymentTerm || ''}
                      onChange={inputChangeHandler}
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
                          onChange={inputChangeHandler}
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
                          onChange={inputChangeHandler}
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
                      List competitors or industries the creator CANNOT work
                      for:
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
                      value={data?.competitor || ''}
                      onChange={inputChangeHandler}
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
                          onChange={inputChangeHandler}
                          value="tillAgreement"
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
                          onChange={inputChangeHandler}
                          value="tillAfterAgreement"
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
                      value={
                        data?.isExclusive === 'tillAfterAgreement'
                          ? data?.exclusivePeriod
                          : ''
                      }
                      onChange={inputChangeHandler}
                      disabled={data?.isExclusive !== 'tillAfterAgreement'}
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
                  <Button type="submit">Submit</Button>
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </DataContext.Provider>
    </Page>
  );
};

export default ContractPage;
