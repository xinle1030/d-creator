import Avatar from '../Avatar';
import { UserCard } from '../Card';
import Notifications from '../Notifications';
import SearchInput from '../SearchInput';
import { notificationsData } from '../../demos/header';
import withBadge from '../../hocs/withBadge';
import React from 'react';
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  Modal,
  ModalBody,
} from 'reactstrap';
import bn from '../../utils/bemnames';
import AuthForm, { STATE_LOGIN } from '../../components/AuthForm';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth/actions';

const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    show: false,
    authState: STATE_LOGIN,
  };

  handleLogout = () => {
    this.props.logout();
    window.location.href= '/'
  }

  handleAuthState = authState => {
    this.setState({
      authState,
    });
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  toggleOnly = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  toggle = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
      show: !this.state.show,
    });
  };

  render() {
    const { isNotificationConfirmed } = this.state;

    const externalCloseBtn = (
      <button
        className="close"
        style={{
          position: 'absolute',
          top: '15px',
          right: '20px',
          fontSize: '3rem',
        }}
        onClick={this.toggleOnly}
      >
        &times;
      </button>
    );

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
        </Nav>

        <Modal
          isOpen={this.state.show}
          toggle={this.toggle}
          size="sm"
          backdrop="static"
          backdropClassName="modal-backdrop-light"
          external={externalCloseBtn}
          centered
        >
          <ModalBody>
            <AuthForm
              handleModalClose={this.toggle}
              authState={this.state.authState}
              onChangeAuthState={this.handleAuthState}
            />
          </ModalBody>
        </Modal>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover0" className="position-relative">
              <small>
                {' '}
                Acc Num: {this.props.account ? this.props.account : '-'}
              </small>
            </NavLink>
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  size={25}
                  className="text-secondary can-click animated swing infinite"
                  onClick={this.toggleNotificationPopover}
                />
              )}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem>

          <NavItem>
            <NavLink id="Popover2">
              <Avatar />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title=""
                  subtitle=""
                  text=""
                  className="border-light can-click"
                  onClick={this.toggleUserCardPopover}
                >
                  <ListGroup flush>
                    {this.props.userInfo ? (
                      <div>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <MdPersonPin /> Name: {this.props.userInfo.name}
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <MdInsertChart /> Email: {this.props.userInfo.email}
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <MdMessage /> Username: {this.props.userInfo.username}
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <MdSettingsApplications /> Role:{' '}
                          {this.props.userInfo.role}
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <MdHelp /> Wallet Balance: {this.props.balance}
                        </ListGroupItem>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {this.props.userInfo ? (
                      <ListGroupItem
                        tag="button"
                        action
                        onClick={this.handleLogout}
                        className="border-light"
                      >
                        <MdExitToApp /> Logout
                      </ListGroupItem>
                    ) : (
                      <ListGroupItem
                        tag="button"
                        action
                        onClick={this.toggle}
                        className="border-light"
                      >
                        <MdExitToApp /> Login / Sign Up
                      </ListGroupItem>
                    )}
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userLogin.userInfo,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);