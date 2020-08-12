import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../actions/auth';
import PropTypes from 'prop-types'




const Nav = ({ user, logOut }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <div>
          <a  href="!#" style={{ fontSize: '1rem' }} className="mx-1 ui image label">
            <i className="far fa-user"></i>
            {" "}{user.firstName}
          </a>
          <Link className="mx-1" onClick={logOut} to="/login">Log Out</Link>
        </div>
      ) :
        <div>
          <Link className="mx-1" to="/login">Log In</Link>
          <Link to="/">Register</Link>
        </div>
      }
    </nav>
  )
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

Nav.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired,

}

export default connect(mapStateToProps, { logOut })(Nav)
