import React, { FC, ReactNodeArray } from 'react';
import PropTypes, { ReactElementLike } from 'prop-types';

import PublicLayout from './Public';

interface LayoutProps {
  readonly children: string | number | boolean | {} | ReactElementLike | ReactNodeArray;
}

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;
  return (
    <PublicLayout>
      {children}
    </PublicLayout>
  );
};

Layout.propTypes = propTypes;

export default Layout;
