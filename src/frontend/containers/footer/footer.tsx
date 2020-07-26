import React, { FC } from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
  },
  inner: {
    textAlign: 'center',
    padding: theme.spacing(2),
    color: theme.palette.common.white,
  },
}));

interface FooterProps {
  readonly someProp?: string | undefined;
}

const Footer: FC<FooterProps> = () => {
  const classes = useStyles();
  const year = (new Date()).getFullYear();

  return (
    <footer className={classes.root}>
      <Container component="section">
        <div className={classes.inner}>
          <Typography variant="h6">
            {'Nest&Next © '}
            {year}
          </Typography>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
