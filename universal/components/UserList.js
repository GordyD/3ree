import React, {PropTypes, Component} from 'react';
// TODO(stedman) create this:
import UserListRow from './UserListRow';
import UserInput from './UserInput';

export default class EventList extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
  };

  renderFooter() {
    const addUser = this.props.actions;

    return <UserInput onSubmit={addUser} />;
  }

  render() {
    const { users, actions } = this.props;
    let list;

    if (users.length > 0) {
      list = users.map((user, key) =>
        <UserListRow key={key} row={key} user={user} {...actions} />
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
              <th>Admin Actions</th>
            </tr>
          </thead>
          <tfoot>
            {this.renderFooter()}
          </tfoot>
          <tbody>
            {list}
          </tbody>
        </table>
      </section>
    );
  }
}
