import React, {PropTypes, Component} from 'react';
import moment from 'moment';

export default class UserListRow extends Component {
  static propTypes = {
    row: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    editUser: PropTypes.func,
    deleteUser: PropTypes.func,
    editable: PropTypes.bool
  };

  static defaultProps = {
    editable: false
  };

  constructor(props, context){
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleClick() {
    this.setState({ editing: true });
  }

  handleEditUser(user) {
    this.props.editUser(user);
    this.setState({ editing: false });
  }

  render() {
    const { row, user } = this.props;
    const className = (row % 2 === 0) ? 'even' : 'odd';
    let element;

    if (this.state.editing) {
      element = (
        <UserInput onSubmit={this.handleEditUser} editing={true} />
      );
    } else {
      element = (
        <tr className={className}>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.address1}</td>
          <td>{user.address2}</td>
          <td>{user.city}</td>
          <td>{user.state}</td>
          <td>{user.zipcode}</td>
          <td>
            <button type='submit' className='save pure-button' onClick={::this.handleClick}>Edit</button>
          </td>
        </tr>
      );
    }

    return element;
  }
}
