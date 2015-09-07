import React, {PropTypes, Component} from 'react';
import EventInput from './EventInput';

const OUTCOMES = {
  '-1': 'Negative',
  '0':  'Neutral',
  '1':  'Positive'
};

export default class EventItem extends Component {
  static propTypes = {
    id: PropTypes.any.isRequired,
    event: PropTypes.object.isRequired,
    editEvent: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired
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

  handleSave(event) {
    if (event.text.length === 0) {
      this.props.deleteEvent(event);
    } else {
      this.props.editEvent(event);
    }
    this.setState({ editing: false });
  }

  render() {
    const { id, event, editEvent, deleteEvent } = this.props;

    let element, className = (id % 2 === 0) ? 'even' : 'odd';
    if (this.state.editing) {
      element = (
        <EventInput text={event.text} 
                    value={event.value} 
                    editing={this.state.editing}
                    valueLabel='Rating'
                    onSubmit={ (event) => this.handleSave(Object.assign({}, event, { id: id })) } />
      );
    } else {
      let outcome = OUTCOMES[event.value];
      element = (
        <div className='event-item'>
          <label onClick={::this.handleClick}>
            {event.text}
            <span className='outcome'>{outcome}</span>
          </label>
          <button className='destroy pure-button' onClick={ () => deleteEvent(event) } />
        </div>
      );
    }

    return (
      <li className={className}>{element}</li>
    );
  }
}