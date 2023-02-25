import Page from '../components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
} from 'reactstrap';
import axios from 'axios';

class CampaignCreatorPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myContracts: [],
    };
  }

    getMyContracts = async () => {
      let userInfoFromStorage = localStorage.getItem('userInfo')
              ? JSON.parse(localStorage.getItem('userInfo'))
              : null;
      let accessToken = userInfoFromStorage && userInfoFromStorage.accessToken;
      if (accessToken) {
        try {
          const response = await axios.get(
            process.env.REACT_APP_API_URL + `/api/creator-contract/myContracts`,
            {
              headers: {
                'x-access-token': accessToken,
              },
            },
          );
          if (response.status === 200) {
            console.log(response.data);
            this.setState({ myContracts: response.data });
          } else {
            console.log(response);
          }
        } catch (error) {
          console.error(error);
        }
      }
  };

  componentDidMount() {
    this.getMyContracts();
  }
  
render() {
  return (
    <Page
      title="Campaign Contracts"
      breadcrumbs={[{ name: 'campaign contracts', active: true }]}
      className="CampaignCreatorPage"
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>
              {' '}
              <span>List of Campaign Contracts </span>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Campaign Name</th>
                    <th>Advertiser</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.myContracts.map((contract, index) => (
                    <tr
                      key={index}
                      onClick={() =>
                        this.props.history.push(
                          '/campaigns/1/contracts/' + contract._id,
                        )
                      }
                    >
                      <th scope="row">{index + 1}</th>
                      <td>Chasing Sunset</td>
                      <td>{contract.advertiser}</td>
                      <td>{contract.contractStartDate}</td>
                      <td>{contract.contractEndDate}</td>
                      <td>{contract.paymentDetails.flatFee}</td>
                      <td>{contract.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );};
};

export default CampaignCreatorPage;
