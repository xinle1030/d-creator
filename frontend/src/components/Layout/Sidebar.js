import logo200Image from '../../assets/img/logo/logo_200.png';
import sidebarBgImage from '../../assets/img/sidebar/sidebar-4.jpg';
import SourceLink from '../SourceLink';
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import {
  MdDashboard,
  MdWeb,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from '../../utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

let navItems = []

  let userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

    if (userInfoFromStorage && userInfoFromStorage.role === 'creator') {
      navItems = [
        { to: '/', name: 'home', exact: true, Icon: MdDashboard },
        {
          to: '/creatorCampaigns',
          name: 'campaign contracts',
          exact: false,
          Icon: MdWeb,
        },
      ];
    } else {
      navItems = [
        { to: '/', name: 'home', exact: true, Icon: MdDashboard },
        { to: '/campaigns', name: 'campaigns', exact: false, Icon: MdWeb },
      ];
    }



const bem = bn.create('sidebar');

class Sidebar extends React.Component {

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">
                D-Creator <FaGithub />
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
