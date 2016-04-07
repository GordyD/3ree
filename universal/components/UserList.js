import React, {PropTypes, Component} from 'react';
// TODO(stedman) create this:
import UserListRow from './UserListRow';

export default class EventList extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired
  };

  render() {
    const { users } = this.props;
    let list;

    if (users.length > 0) {
      list = users.map((user, key) =>
        <UserListRow key={key} row={key} user={user} />
      );
    } else {
      list = <tr>
        <td className='Pulse-eventItem empty'>
          <p>No users recorded!</p>
        </td>
      </tr>;
    }

    return (
      <section className='users-list'>
        <table>
          <thead>
            <tr>
              <th>firstName</th>
              <th>lastName</th>
              <th>address1</th>
              <th>address2</th>
              <th>city</th>
              <th>state</th>
              <th>zipcode</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      </section>
    );
  }
}
