import React, { FC } from 'react';
import { makeStyles } from '@material-ui/styles';

import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
}));

interface FooterProps {
  readonly someProp?: string | undefined;
}

const Footer: FC<FooterProps> = () => {
  const classes = useStyles();
  const year = (new Date()).getFullYear();

  return (
    <Container component="footer" classes={classes}>
      <Typography variant="body1">
        {'Nest&Next © '}
        {year}
      </Typography>
    </Container>
  );
};

export default Footer;
