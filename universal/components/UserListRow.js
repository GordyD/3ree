import React, {PropTypes, Component} from 'react';
import moment from 'moment';

export default class UserListRow extends Component {
  static propTypes = {
    row: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    editable: PropTypes.bool
  };

  static defaultProps = {
    editable: false
  };

  render() {
    const { row, user } = this.props;
    const className = (row % 2 === 0) ? 'even' : 'odd';

   return (
      <tr className={className}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.address1}</td>
        <td>{user.address2}</td>
        <td>{user.city}</td>
        <td>{user.state}</td>
        <td>{user.zipcode}</td>
        {/* TODO(stedman): Add button here to edit or delete the user. */}
        <td>EDIT</td>
      </tr>
    );
  }
}
