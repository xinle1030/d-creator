import Page from '../components/Page';
import React, {useState, useEffect} from 'react';
import {
  Col,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import ContractForm from '../components/ContractForm';
import ContractSigning from '../components/ContractSigning';
import WorkSubmission from '../components/WorkSubmission';
import PaymentRelease from '../components/PaymentRelease';

const ContractDetailPage = () => {
  const history = useHistory();
  let pathName = history.location.pathname;
  const [data, setData] = useState({});
  const contractId = pathName.substring(pathName.lastIndexOf('/') + 1);
  console.log(contractId);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        process.env.REACT_APP_API_URL + '/api/creator-contract/' + contractId,
      );
      const data = await response.json();
      if (!response.ok) {
        console.error(data);
      } else {
        console.log(data);
        setData(data);
      }
    }
    fetchData();
  }, [contractId]);

  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState('1');

  // Toggle active state for Tab
  const toggle = tab => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  return (
    <Page
      title="Contract Details"
      breadcrumbs={[{ name: 'contracts', active: true }]}
      className="ContractDetailsPage"
    >
      <Row>
        <Col>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === '1',
                })}
                onClick={() => {
                  toggle('1');
                }}
              >
                <span style={{ color: 'black' }}>1. Contract Details</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === '2',
                })}
                onClick={() => {
                  toggle('2');
                }}
              >
                <span style={{ color: 'black' }}>2. Contract Signing</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === '3',
                })}
                onClick={() => {
                  toggle('3');
                }}
              >
                <span style={{ color: 'black' }}>3. Work Submission</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: currentActiveTab === '4',
                })}
                onClick={() => {
                  toggle('4');
                }}
              >
                <span style={{ color: 'black' }}>4. Release Payment</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={currentActiveTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <br></br>
                  <ContractForm contractData={data} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <br></br>
                  <ContractSigning contractData={data} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <br></br>
                  <WorkSubmission contractData={data} />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="12">
                  <br></br>
                  <PaymentRelease contractData={data} />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Page>
  );
};

export default ContractDetailPage;
