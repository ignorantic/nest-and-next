import React, { ComponentType, FC } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { wrapper } from './store';
import Layout from './layout';
import theme from './theme';

interface Props {
  children: ComponentType;
}

const FrontendRoot: FC<Props> = (props) => {
  const { children } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        {children}
      </Layout>
    </MuiThemeProvider>
  );
};

export default wrapper.withRedux(FrontendRoot);
