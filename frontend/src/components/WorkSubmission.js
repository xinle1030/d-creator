import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  FormText,
  Row,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import backgroundImage from '../assets/img/bg/background_1920-4.jpg';

const WorkSubmission = (props) => {
  console.log(props.contractData);
  const [data, setData] = useState({});
  let userInfoFromStorage = localStorage.getItem('userInfo')
              ? JSON.parse(localStorage.getItem('userInfo'))
              : null;
  const [role, setRole] = useState("");
  const history = useHistory();
  const [fileLink, setFileLink] = useState("");

    useEffect(() => {
      if (userInfoFromStorage) {
        setRole(userInfoFromStorage.role);
      }
      setData(props.contractData);
    }, [props.contractData, userInfoFromStorage]);

    const approveWork = async () => {
      
    }

      const submitWork = async () => {
        console.log("submitting work");
        console.log(fileLink)

              const updateData = {
                update: {
                  publishedContent: {
                    workDone: fileLink,
                  },
                },
              };

      try{
      const response = await axios.put(
        process.env.REACT_APP_API_URL +
          `/api/creator-contract/` +
          props.contractData._id,
        updateData,
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

      };

  const customizedField = () => {
    console.log(role);
    console.log(data?.status);
    if (role === 'advertiser') {
      if (props?.contractData?.publishedContent?.workDone) {
                        return (<div>
                          <Form>
                            <FormGroup>
                              <Label for="fileLink">Submitted File Link: </Label>{' '}
                              <a
                                id="fileLink"
                                href={
                                  props.contractData.publishedContent.workDone}
                                target="_blank"
                                rel="noreferrer"
                              >
                                File Link
                              </a>
                            </FormGroup>
                            <Button
                              color="secondary"
                              disabled={
                                !(
                                  props.contractData.publishedContent
                                    .workDone &&
                                  props.contractData.publishedContent.workDone
                                    .length > 0
                                )
                              }
                              onClick={approveWork}
                            >
                              Approve Work
                            </Button>
                            <FormText color="muted">
                              Kindly check and approve the submitted work.
                            </FormText>
                          </Form>
                        </div>);
      }
    } 
    else if (role === 'creator') {
      if (data?.status === 'signed') {
              return (
                <div>
                  <Form>
                    <FormGroup>
                      <Label for="fileLink">
                        Put down uploaded zipped file link for work submission
                      </Label>
                      <Input
                        type="text"
                        name="fileLink"
                        id="fileLink"
                        placeholder="Zipped File Link"
                        onChange={e => {
                          setFileLink(e.target.value);
                        }}
                      />
                    </FormGroup>
                    <Button color="secondary" onClick={submitWork}>
                      Submit Work
                    </Button>
                    <FormText color="muted">
                      Kindly upload and submit your work to the advertiser for
                      review.
                    </FormText>
                  </Form>
                </div>
              );
            }
            else if (props?.contractData?.publishedContent?.workDone) {
                                      return (
                                        <div>
                                          <Form>
                                            <FormGroup>
                                              <Label for="fileLink">
                                                Submitted File Link:{' '}
                                              </Label>{' '}
                                              <a
                                                id="fileLink"
                                                href={
                                                  props.contractData
                                                    .publishedContent.workDone
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                              >
                                                File Link
                                              </a>
                                            </FormGroup>
                                          </Form>
                                        </div>
                                      );
            }
    }
  }

  return (
    <Row>
      <Col className="mb-3">
        <Card className="flex-row">
          <CardImg
            className="card-img-left"
            src={backgroundImage}
            style={{ width: 'auto', height: 200 }}
          />
          <CardBody>
            <CardTitle>Campaign 1</CardTitle>
            <ListGroup flush>
              <ListGroupItem>
                Contract Status : {data?.status || ''}
              </ListGroupItem>
              <ListGroupItem>{customizedField()}</ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default WorkSubmission;
