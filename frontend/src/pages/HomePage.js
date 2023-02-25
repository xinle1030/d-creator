import HorizontalAvatarList from '../components/HorizontalAvatarList';
import Page from '../components/Page';
import UserProgressTable from '../components/UserProgressTable';
import { NumberWidget } from '../components/Widget';
import { avatarsData, userProgressTableData } from '../demos/dashboardPage';
import React from 'react';
import {
  MdPersonPin,
} from 'react-icons/md';
import {
  Card,
  CardBody,
  CardDeck,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { getColor } from '../utils/colors';

const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);

class HomePage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="DashboardPage"
        title="Creator Dashboard"
        breadcrumbs={[{ name: 'creator dashboard', active: true }]}
      >

        <CardDeck style={{ marginBottom: '1rem' }}>
          <Card
            body
            style={{
              overflowX: 'auto',
              paddingBottom: '15px',
              height: 'fit-content',
              paddingTop: 'inherit',
            }}
          >
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
            />
          </Card>

          <Card
            body
            style={{
              overflowX: 'auto',
              paddingBottom: '15px',
              height: 'fit-content',
              paddingTop: 'inherit',
            }}
          >
            <HorizontalAvatarList
              avatars={avatarsData}
              avatarProps={{ size: 50 }}
              reversed
            />
          </Card>
        </CardDeck>

        <Row>
          <Col>
            <Card>
              <CardHeader>Creators</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    <MdPersonPin size={25} />,
                    'name',
                    'Engagement Rate',
                    '%',
                    'Audience City',
                    'Audience Interest',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default HomePage;
