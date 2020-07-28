import React, { ComponentType } from 'react';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { is } from 'ramda';

import { wrapper } from '../frontend/store';
import theme from '../frontend/theme';
import Layout from '../frontend/layout';

interface AppProps extends AppInitialProps {
  Component: ComponentType;
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
    removeJssStyles();
  }

  render(): JSX.Element {
    const { Component } = this.props;

    const pageProps = getValidPageProps(this.props.pageProps);

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

function removeJssStyles(): void {
  const jssStyles = document.querySelector('#jss-server-side');
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
}

function getValidPageProps(pageProps: unknown): Record<string, unknown> {
  return is(Object, pageProps) ? pageProps as Record<string, unknown> : {};
}
