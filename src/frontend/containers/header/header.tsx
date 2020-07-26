import React, { FC } from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
  },
  inner: {
    textAlign: 'center',
    color: theme.palette.common.white,
    padding: theme.spacing(2),
  },
}));

interface HeaderProps {
  someProp?: string | undefined;
}

const Header: FC<HeaderProps> = () => {
  const classes = useStyles();
  return (
    <header className={classes.root}>
      <Container component="section" fixed>
        <div className={classes.inner}>
          <Typography variant="h4">Header</Typography>
        </div>
      </Container>
    </header>
  );
};

export default Header;
