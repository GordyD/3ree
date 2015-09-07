import React, { Component, PropTypes } from 'react';

export default class EventInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    textLabel: PropTypes.string,
    valueLabel: PropTypes.string,
    editing: PropTypes.bool
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: [],
      text: this.props.text || '',
      value: (this.props.value === -1 || this.props.value === 1) ? this.props.value : 0
    };
  }

  handleSubmit(e) {
    let errors;
    e.preventDefault();

    if (this.state.text.length === 0) {
      errors = ['You have not said what the event was!'];
    }

    if (this.state.value < -1 || this.state.value > 1) {
      errors = [...errors, 'You have somewhere set an invalid value!'];
    }

    if (errors && errors.length > 0) {
      this.setState({errors: errors});
    } else {
      this.props.onSubmit({text: this.state.text, value: this.state.value});
      this.setState({text: '', value: 0});
    }
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleValueChange(e) {
    this.setState({ value: parseInt(e.target.value, 10) });
  }

  render() {
    let saveText = (this.props.editing) ? 'Save' : 'Add';
    return (
      <form className='event-input pure-form'>
        <fieldset>
          <input type='text' placeholder={this.props.textLabel} autoFocus='true' value={this.state.text} onChange={::this.handleTextChange} />
          <label htmlFor='value'>{this.props.valueLabel}</label>
          <input type='range' id='value' min='-1' max='1' value={this.state.value} onChange={::this.handleValueChange} /> 
          <button type='submit' className='pure-button' onClick={::this.handleSubmit}>{saveText}</button>
        </fieldset>
      </form>
    );
  }
}