import React from 'react';
import PropTypes from '../utils/propTypes';
import { useHistory } from 'react-router-dom';

import { Table, Progress } from 'reactstrap';

import Avatar from './Avatar';

import withBadge from '../hocs/withBadge';

const AvatarWithBadge = withBadge({
  position: 'bottom-right',
  color: 'success',
})(Avatar);

const UserProgressTable = ({ headers, usersData, ...restProps }) => {

  const history = useHistory();

  return (
    <Table responsive hover {...restProps}>
      <thead>
        <tr className="text-capitalize align-middle text-center">
          {headers.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {usersData.map(
          (
            { avatar, name, engagementRate, audienceCity, audienceInterest },
            index,
          ) => (
            <tr key={index} onClick={() => history.push('/profile')}>
              <td className="align-middle text-center">
                <AvatarWithBadge src={avatar} />
              </td>
              <td className="align-middle text-center">{name}</td>
              <td className="align-middle text-center">
                <Progress value={engagementRate} style={{ height: 5 }} />
              </td>
              <td className="align-middle text-center">{engagementRate}%</td>
              <td className="align-middle text-center">{audienceCity}</td>
              <td className="align-middle text-center">{audienceInterest}</td>
            </tr>
          ),
        )}
      </tbody>
    </Table>
  );
};

UserProgressTable.propTypes = {
  headers: PropTypes.node,
  usersData: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      date: PropTypes.date,
    })
  ),
};

UserProgressTable.defaultProps = {
  headers: [],
  usersData: [],
};

export default UserProgressTable;
