import React from 'react';
import PropTypes from 'prop-types';
import { NextPage } from 'next';

interface ErrorPageProps {
  statusCode: number;
}

const propTypes = {
  statusCode: PropTypes.number.isRequired,
};

const ErrorPage: NextPage<ErrorPageProps> = (props) => {
  const { statusCode } = props;

  return (
    <span>
      Error:
      {statusCode}
    </span>
  );
};

ErrorPage.getInitialProps = ({ res, query }) => {
  // make your validations
  const statusCode = !query.eventId ? 404 : 200;

  // change the server response code if needed
  if (res && statusCode !== 200) {
    res.statusCode = statusCode;
  }

  return { statusCode };
};

ErrorPage.propTypes = propTypes;

export default ErrorPage;
