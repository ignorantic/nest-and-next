import React, { ComponentType } from 'react';
import NextApp, { AppContext, AppInitialProps } from 'next/app';
import { is } from 'ramda';

import FrontendRoot from '../frontend/frontend-root';

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
    const {
      router,
      Component,
    } = this.props;

    const pageProps = getValidPageProps(this.props.pageProps);

    if (isAdmin(router.route)) {
      return <Component {...pageProps} />;
    }

    return (
      <FrontendRoot initialState={{}} initialProps={{}}>
        <Component {...pageProps} />
      </FrontendRoot>
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

function isAdmin(route: string): boolean {
  return route === '/admin';
}

function getValidPageProps(pageProps: unknown): Record<string, unknown> {
  return is(Object, pageProps) ? pageProps as Record<string, unknown> : {};
}
