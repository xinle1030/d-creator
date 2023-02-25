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

const ContractSigning = (props) => {
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

  const customizedBtn = () => {
    console.log(role);
    console.log(data?.status);
    if (role === 'advertiser') {
      if (data?.status === 'agreed'){
        return (
          <div>
            <Button color="success" onClick={() => {}}>
              Instantiate Contract
            </Button>
            <FormText color="muted">
              Creator has agreed to the terms and
              conditions. Please proceed with the contract.
            </FormText>
          </div>
        );
      }
      else if (data?.status === 'signed') {
        return (
          <div>
            <FormText color="muted">
              Creator has signed the contract. Kindly wait for their work submission.
            </FormText>
          </div>
        );
      } else if (data?.status === 'in progress') {
        return (
          <div>
            <Button color="secondary" disabled>
              Instantiate Contract
            </Button>
            <FormText color="muted">
              Kindly wait until the creator has agreed to the terms and
              conditions before you can proceed with the contract.
            </FormText>
          </div>
        );
      }
      
    } 
    else if (role === 'creator') {
      if (data?.status === 'agreed') {
              return (
                <div>
                  <FormText color="muted">
                    You as the creator has agreed to the terms and conditions.
                    Please wait for the advertiser to proceed with the contract.
                  </FormText>
                </div>
              );
            } else if (data?.status === 'initiated') {
              return(<div>
                <Button color="success" onClick={() => {}}>
                  Sign Contract
                </Button>
                <FormText color="muted">
                  Advertiser has initiated the contract with you. Kindly sign
                  the contract in the acceptance of the terms and conditions
                  mentioned in the contract.
                </FormText>
              </div>);
            } else if (data?.status === 'signed') {
              return (
                <div>
                  <FormText color="muted">
                    You as the creator has signed the contract. Kindly submit the work for advertiser review.
                  </FormText>
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
                Advertiser: {data?.advertiser?.username || ''}
              </ListGroupItem>
              <ListGroupItem>
                Creator: {data?.creator?.username || ''}
              </ListGroupItem>
              <ListGroupItem>
                {`Contract Date: ${data?.contractStartDate || ''}  to ${
                  data?.contractEndDate || ''
                }`}
              </ListGroupItem>
            </ListGroup>
            <br></br>
            <CardTitle>Contract Status : {data?.status || ''}</CardTitle>
            {customizedBtn()}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ContractSigning;
