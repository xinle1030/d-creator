import Page from '../components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardHeader,
  CardTitle,
  Col,
Table,
  Row,
  Button
} from 'reactstrap';
import backgroundImage from '../assets/img/bg/background_1920-4.jpg';
import axios from 'axios';

class CampaignDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allContracts: [],
    };
  }

  getAllContracts = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `/api/creator-contract`,
      );
      if (response.status === 200) {
        console.log(response.data);
        this.setState({ allContracts: response.data });
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
    this.getAllContracts();
  }

  render() {
    return (
      <Page
        className="CampaignDetailPage"
        title="Campaign 1"
        breadcrumbs={[{ name: 'Campaign Detail', active: true }]}
      >
        <Row>
          <Col className="mb-3">
            <Card className="flex-row">
              <CardImg
                className="card-img-left"
                src={backgroundImage}
                style={{ width: 'auto', height: 150 }}
              />
              <CardBody>
                <CardTitle>Campaign 1</CardTitle>
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis non
                  proident, sunt in culpa qui officia deserunt mollit anim id
                  est laborum.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>
                <span>List of Contracts </span>
                <Button
                  onClick={() => this.props.history.push('/contract')}
                  color="primary"
                  style={{ float: 'right' }}
                >
                  Create New Contract
                </Button>
              </CardHeader>

              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Agreement Date</th>
                      <th>Creator Name</th>
                      <th>Contract Start Date</th>
                      <th>Contract End Date</th>
                      <th>Platforms</th>
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.allContracts.map((contract, index) => (
                      <tr
                        key={index}
                        onClick={() => this.props.history.push("/campaigns/1/contracts/" + (contract._id))}
                      >
                        <th scope="row">{index + 1}</th>
                        <td>{contract.dateOfAgreement}</td>
                        <td>{contract.creator}</td>
                        <td>{contract.contractStartDate}</td>
                        <td>{contract.contractEndDate}</td>
                        <td>{contract.publishedContent.platforms}</td>
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
    );
  }
}
export default CampaignDetailPage;
