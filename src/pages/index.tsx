import React from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

interface Props {
  userAgent?: string;
}

const Home: NextPage<Props> = () => (
  <div>
    <Link href="/posts"><a>Posts</a></Link>
  </div>
);

Home.getInitialProps = (
  { req }: NextPageContext,
): Props => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default Home;
