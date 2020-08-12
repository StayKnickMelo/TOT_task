import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { sendFloodMsg, editMessage, clearToEdit } from '../../actions/flood';


const MessageForm = ({ sendFloodMsg, msgToEdit, editMessage, clearToEdit }) => {

  useEffect(() => {
    if (msgToEdit !== null) {
      setMessage({ message: msgToEdit.message });
    } else {
      setMessage({ message: '' })
    }
  }, [msgToEdit])

  const [message, setMessage] = useState({
    message: ''
  });

  const onChange = (e) => {
    setMessage({ message: e.target.value });
  };

  const onClick = () => {
    if (msgToEdit) {
      editMessage(msgToEdit._id, message)

    } else {
      sendFloodMsg(message);
    }
    setMessage({ message: '' })
  }
  return (
    <div style={style} className="ui input">
      <input onChange={onChange} type="text" placeholder="Type a message" name="message" value={message.message} />
      <button style={{ marginLeft: '.5rem' }} onClick={onClick} className="ui button primary">Send</button>
      {msgToEdit && (<button onClick={() => {
        clearToEdit();
        setMessage({ message: '' })
      }} className="ui button red">Cancel</button>)}
    </div>
  )
};

MessageForm.propTypes = {
  sendFloodMsg: PropTypes.func.isRequired,
  msgToEdit: PropTypes.object,
};

const mapStateToProps = (state) => ({
  msgToEdit: state.flood.message,
  clearToEdit: PropTypes.func.isRequired,
})
const style = {
  display: 'flex',
  maxWidth: '50%',
  margin: 'auto',
  marginTop: '1rem'
}

export default connect(mapStateToProps, { sendFloodMsg, editMessage, clearToEdit })(MessageForm)
