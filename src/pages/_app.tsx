import React, { ComponentType } from 'react';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { wrapper } from '../frontend/store';
import Layout from '../frontend/layout';
import theme from '../frontend/theme';

interface AppProps {
  Component: ComponentType;
  // eslint-disable-next-line @typescript-eslint/ban-types
  pageProps: object;
  store: Store;
}

class App extends NextApp<AppProps> {
  static async getInitialProps(appContext: AppContext): Promise<AppInitialProps> {
    const { Component, ctx } = appContext;
    const componentGetInitialProps = Component.getInitialProps
      || ((): Promise<void> => Promise.resolve());
    const pageProps = await componentGetInitialProps(ctx);
    return { pageProps };
  }

  componentDidMount(): void {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export default wrapper.withRedux(App);
