import MapWithBubbles from '../components/MapWithBubbles';
import Page from '../components/Page';
import { NumberWidget } from '../components/Widget';
import {
  chartjs,
} from '../demos/dashboardPage';
import React from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdShowChart,
} from 'react-icons/md';
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from '../utils/colors';
import { randomNum } from '../utils/demos';
import user1Image from '../assets/img/users/100_1.jpg';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

const genPieData = () => {
  return {
    datasets: [
      {
        data: [randomNum(), randomNum(), randomNum(), randomNum(), randomNum()],
        backgroundColor: [
          getColor('primary'),
          getColor('secondary'),
          getColor('success'),
          getColor('info'),
          getColor('danger'),
        ],
        label: 'Dataset 1',
      },
    ],
    labels: ['Data 1', 'Data 2', 'Data 3', 'Data 4', 'Data 5'],
  };
};

class ProfilePage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="ProfilePage"
        title="Profile"
        breadcrumbs={[{ name: 'Profile', active: true }]}
      >
        <Row>
          <Col className="mb-3">
            <Card className="flex-row">
              <CardImg
                className="card-img-left"
                src={user1Image}
                style={{ width: 'auto', height: 150 }}
              />
              <CardBody>
                <CardTitle>Tom</CardTitle>
                <CardText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Followers"
              subtitle="This month"
              number="9.8k"
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Engagement"
              subtitle="This month"
              number="5,400"
              color="secondary"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Earned Media"
              subtitle="This month"
              number="3,400"
              color="secondary"
              progress={{
                value: 90,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Avg. Interactions"
              subtitle="This month"
              number="38%"
              color="secondary"
              progress={{
                value: 60,
                label: 'Last month',
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col xl={6} lg={6} md={6} sm={6} xs={12}>
            <Card>
              <CardHeader>Followers Activity</CardHeader>
              <CardBody>
                <Pie data={genPieData()} />
              </CardBody>
            </Card>
          </Col>

          <Col xl={6} lg={6} md={6} sm={6} xs={12}>
            <Card>
              <CardHeader>Average Interactions Data</CardHeader>
              <CardBody>
                <Doughnut data={genPieData()} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card inverse className="bg-gradient-primary">
              <CardHeader className="bg-gradient-primary">
                Map with bubbles
              </CardHeader>
              <CardBody>
                <MapWithBubbles />
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Audience Data</CardHeader>
              <CardBody>
                <Bar data={chartjs.bar.data} options={chartjs.bar.options} />
              </CardBody>
              <ListGroup flush>
                <ListGroupItem>
                  <MdInsertChart size={25} color={primaryColor} /> Audience Ages{' '}
                  <Badge color="secondary">25 - 40</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdBubbleChart size={25} color={primaryColor} /> Audience
                  Interest <Badge color="secondary">Fashion</Badge>
                </ListGroupItem>
                <ListGroupItem>
                  <MdShowChart size={25} color={primaryColor} /> Audience Top
                  Cities <Badge color="secondary">Kuala Lumpur</Badge>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default ProfilePage;
