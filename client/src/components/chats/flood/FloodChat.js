import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import FloodMsg from './FloodMsg';
import MessageForm from '../MessageForm';
import { getFloodMsgs } from '../../../actions/flood';

const FloodChat = ({ getFloodMsgs, messages }) => {
  useEffect(() => {
    getFloodMsgs();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }} className="ui cards">
        {messages.length > 0 ? messages.map(msg => (<FloodMsg key={msg._id} msg={msg} />)):
        <h2>The Chat is empty...</h2>}
      </div>
      <MessageForm />
    </Fragment>
  )
};
FloodChat.propTypes = {
  getFloodMsgs: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  messages: state.flood.messages
});

export default connect(mapStateToProps, { getFloodMsgs })(FloodChat)
