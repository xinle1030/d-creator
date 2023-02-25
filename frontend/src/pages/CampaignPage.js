import Page from '../components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';

const CampaignPage = () => {

  const history = useHistory();

  return (
    <Page
      title="Campaigns"
      breadcrumbs={[{ name: 'campaigns', active: true }]}
      className="CampaignPage"
    >
      <Row>
        <Col>
          <Card className="mb-3">
            <CardHeader>
              {' '}
              <span>List of Campaigns </span>
              <Button
                color="primary"
                style={{ float: 'right' }}
              >
                Create New Campaign
              </Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Campaign Name</th>
                    <th>Networks</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Budget</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr onClick={() => history.push(`/campaigns/1`)}>
                    <th scope="row">1</th>
                    <td>Chasing Sunset</td>
                    <td>Insta, Tiktok, FB</td>
                    <td>4/4/2023</td>
                    <td>4/5/2023</td>
                    <td>100000</td>
                    <td>Active</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Page>
  );
};

export default CampaignPage;
