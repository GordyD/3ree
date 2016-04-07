import React, { Component, PropTypes } from 'react';

export default class EventInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    editing: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: [],

      firstName: this.props.firstName || 'add firstName',
      lastName: this.props.lastName || 'add lastName',
      address1: this.props.address1 || 'add address1',
      address2: this.props.address2 || 'add address2',
      city: this.props.city || 'add city',
      state: this.props.state || 'add state',
      zipcode: this.props.zipcode || 'add zipcode'
    };
  }

  resetState() {
    this.setState({
      errors: [],

      firstName: this.props.firstName || 'add firstName',
      lastName: this.props.lastName || 'add lastName',
      address1: this.props.address1 || 'add address1',
      address2: this.props.address2 || 'add address2',
      city: this.props.city || 'add city',
      state: this.props.state || 'add state',
      zipcode: this.props.zipcode || 'add zipcode'
    });
  }

  handleSubmit(e) {
    let errors;
    e.preventDefault();

    // TODO(stedman): Update validations. See EventInput for example.
    if (errors && errors.length > 0) {
      this.setState({errors: errors});
    } else {
      this.props.onSubmit({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address1: this.state.address1,
        address2: this.state.address2,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode
      });
      this.resetState();
    }
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }
  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }
  handleAddress1Change(e) {
    this.setState({ address1: e.target.value });
  }
  handleAddress2Change(e) {
    this.setState({ address2: e.target.value });
  }
  handleCityChange(e) {
    this.setState({ city: e.target.value });
  }
  handleStateChange(e) {
    this.setState({ state: e.target.value });
  }
  handleZipcodeChange(e) {
    this.setState({ zipcode: e.target.value });
  }

  render() {
    let saveText = (this.props.editing) ? 'Save' : 'Add';

    // This needs to be wrapped in <tr>'s and <td>'s because it's being inserted into the user-list table
    return (
      <tr>
        <td>
          <input type='text' placeholder={this.props.textLabel} autoFocus='true' value={this.state.firstName} onChange={::this.handleFirstNameChange} />
        </td>
        <td>
          <input type='text' placeholder={this.props.textLabel} value={this.state.lastName} onChange={::this.handleLastNameChange} />
        </td>
        <td>
          <input type='text' placeholder={this.props.textLabel} value={this.state.address1} onChange={::this.handleAddress1Change} />
        </td>
        <td>
          <input type='text' placeholder={this.props.textLabel} value={this.state.address2} onChange={::this.handleAddress2Change} />
        </td>
        <td>
          <input type='text' placeholder={this.props.textLabel} value={this.state.city} onChange={::this.handleCityChange} />
        </td>
        <td>
          <input type='text' placeholder={this.props.textLabel} value={this.state.state} onChange={::this.handleStateChange} />
        </td>
        <td>
          <input type='text' placeholder={this.props.textLabel} value={this.state.zipcode} onChange={::this.handleZipcodeChange} />
        </td>
        <td>
          <button type='submit' className='save pure-button' onClick={::this.handleSubmit}>{saveText}</button>
        </td>
      </tr>
    );
  }
}
