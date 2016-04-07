import React, { PropTypes, Component } from 'react';
import { IndexLink, Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <div>
        <header className='Pulse-header'>
          <h1>Pulse</h1>
          <div className='Pulse-links'>
            <IndexLink to='/' activeClassName='active'>Home</IndexLink>
            <Link to='/users' activeClassName='active'>Users</Link>
            <Link to='/all-events' activeClassName='active'>All Events</Link>
            <Link to='/my-events' activeClassName='active'>My Events</Link>
            <Link to='/other-events' activeClassName='active'>Other Events</Link>
          </div>
        </header>
      </div>
    );
  }
}
