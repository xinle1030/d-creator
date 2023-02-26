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
} from 'reactstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import backgroundImage from '../assets/img/bg/background_1920-4.jpg';

const PaymentRelease = (props) => {
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

        const releasePayment = async () => {
          console.log("Release payment")
       try {
      const response = await axios.put(
        process.env.REACT_APP_API_URL +
          `/api/creator-contract/` +
          props.contractData._id + `/payment`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    }

  const customizedField = () => {
    console.log(role);
    console.log(data?.status);
    if (role === 'advertiser') {
      if (data?.status === 'inactive'){
        return (
          <div>
            <Button color="success" onClick={releasePayment}>
              Release Payment
            </Button>
            <FormText color="muted">
            Release payment to creator for his / her work
            </FormText>
          </div>
        );
      }
      else if (data?.status === 'completed') {
        return (
          <div>
            <FormText color="muted">
            Payment has been released            </FormText>
          </div>
        );
      }
    } 
    else if (role === 'creator') {
      if (data?.status === 'inactive') {
              return (
                <div>
                  <FormText color="muted">
                  Wait for Advertiser to Release Payment
                  </FormText>
                </div>
              );
            } else if (data?.status === 'completed') {
               return (<div>
                <FormText color="muted">
                Payment Released
                </FormText>
              </div>);
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
                Advertiser: {data?.advertiser?.username || ''}
              </ListGroupItem>
              <ListGroupItem>
                Creator: {data?.creator?.username || ''}
              </ListGroupItem>
              <ListGroupItem>
                Contract Payment Details: ${data?.paymentDetails?.flatFee || ''}
              </ListGroupItem>
              <ListGroupItem>
                Contract Payment Term: {data?.paymentDetails?.paymentTerm || ''}{' '}
                Days
              </ListGroupItem>
            </ListGroup>
            <br></br>
            <CardTitle>Contract Status : {data?.status || ''}</CardTitle>
            {customizedField()}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default PaymentRelease;
