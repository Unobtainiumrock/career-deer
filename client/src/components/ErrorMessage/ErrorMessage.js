import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  const [visible, setVisible] = useState(true);

  return visible ? (
    <div className="error-message">
      <p>{message}</p>
      <button className="close-button" onClick={() => setVisible(false)}>
        &times;
      </button>
    </div>
  ) : null;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
