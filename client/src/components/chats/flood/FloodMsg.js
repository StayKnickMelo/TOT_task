import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteMessage, setMsgToEdit } from '../../../actions/flood';


const FloodMsg = ({ msg, auth, deleteMessage, setMsgToEdit }) => {
  return (
    <div className="card">
      <div className="content">
        <i alt="userAvatar" className="far fa-user rigth floated mini ui image" />
        <div className="header">{msg.userName}</div>
        <div className="description">{msg.message}</div>
      </div>
      {auth.user._id === msg.userId && (
        <Fragment>
          <div className="extra content">
            <div className="ui two buttons">
              <div onClick={()=> setMsgToEdit(msg)} className="ui basic green button">Edit</div>
              <div onClick={() => deleteMessage(msg._id)} className="ui basic red button">Delete</div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
};

FloodMsg.propTypes = {
  msg: PropTypes.object.isRequired,
  deleteMessage: PropTypes.func.isRequired,
  setMsgToEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteMessage, setMsgToEdit })(FloodMsg)
