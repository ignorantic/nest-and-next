import React, { ComponentType } from 'react';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { is } from 'ramda';
import { v4 as uuidv4 } from 'uuid';

import theme from '../frontend/theme';
import Layout from '../frontend/layout';
import Loading from '../frontend/components/loading/loading';

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

  public state = {
    isRouteChanging: false,
    loadingKey: null,
  }

  componentDidMount(): void {
    removeJssStyles();
    const { router } = this.props;

    const routeChangeStartHandler = () => {
      this.setState(() => ({
        isRouteChanging: true,
        loadingKey: uuidv4().substr(0, 8),
      }));
    };

    const routeChangeEndHandler = () => {
      this.setState(() => ({
        isRouteChanging: false,
      }));
    };

    router.events.on('routeChangeStart', routeChangeStartHandler);
    router.events.on('routeChangeComplete', routeChangeEndHandler);
    router.events.on('routeChangeError', routeChangeEndHandler);
  }

  render(): JSX.Element {
    const { Component, router } = this.props;

    const pageProps = getValidPageProps(this.props.pageProps);

    const { route } = router;

    if (route === '/admin') {
      return <Component {...pageProps} />;
    }

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Loading {...this.state} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MuiThemeProvider>
    );
  }
}

export default App;

function removeJssStyles(): void {
  const jssStyles = document.querySelector('#jss-server-side');
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
}

function getValidPageProps(pageProps: unknown): Record<string, unknown> {
  return is(Object, pageProps) ? pageProps as Record<string, unknown> : {};
}
