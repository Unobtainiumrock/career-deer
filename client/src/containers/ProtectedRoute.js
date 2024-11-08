import React from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component {
  render() {
    const { children, isAuthenticated } = this.props;

    if (!isAuthenticated) {
      // Redirect to login if user is not authenticated
      return <Navigate to="/login" replace />;
    }
    // Render the protected route content if authenticated
    return children;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProtectedRoute);
