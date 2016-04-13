import React, {PropTypes, Component} from 'react';
import moment from 'moment';

import UserInput from './UserInput';

export default class UserListRow extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
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

  handleClickEdit() {
    this.setState({ editing: true });
  }

  handleDelete(user) {
    console.log(user);
    const del = confirm('Are you sure you want to delete ' + user.firstName + ' ' + user.lastName + '?');

    if (del) {
      this.props.deleteUser(user);
    }
  }

  handleEditUser(user) {
    this.props.editUser(user);
    this.setState({ editing: false });
  }

  render() {
    const { row, id, user: {firstName, lastName, address1, address2, city, state, zipcode} } = this.props;
    const className = (row % 2 === 0) ? 'even' : 'odd';
    let element;

    if (this.state.editing) {
      element = (
        <UserInput
          editing={true}
          onSubmit={ (user) => this.handleEditUser(Object.assign({}, user, {id: id})) }
          firstName={firstName}
          lastName={lastName}
          address1={address1}
          address2={address2}
          city={city}
          state={state}
          zipcode={zipcode}
        />
      );
    } else {
      element = (
        <tr className={className}>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{address1}</td>
          <td>{address2}</td>
          <td>{city}</td>
          <td>{state}</td>
          <td>{zipcode}</td>
          <td>
            <button type='submit' className='save pure-button' onClick={(user) => this.handleDelete(Object.assign({}, user, {id: id, firstName, lastName} ))}>Delete</button>
            <button type='submit' className='save pure-button' onClick={::this.handleClickEdit}>Edit</button>
          </td>
        </tr>
      );
    }

    return element;
  }
}
