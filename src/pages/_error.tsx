import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  statusCode: PropTypes.number.isRequired,
};

const _Error = props => {
  const { statusCode } = props;

  return <span>Error: {statusCode}</span>;
};

_Error.getInitialProps = ({ res, query }) => {
  // make your validations
  const statusCode = !query.eventId ? 404 : 200;

  // change the server response code if needed
  if (res && statusCode !== 200) {
    res.statusCode = statusCode;
  }

  return { statusCode };
};

_Error.propTypes = propTypes;

export default _Error;
