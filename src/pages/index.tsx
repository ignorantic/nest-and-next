import React from 'react';
import { NextPage, NextPageContext } from 'next';
import NextLink from 'next/link';

interface HomePageProps {
  userAgent?: string;
}

const HomePage: NextPage<HomePageProps> = ({ userAgent }) => (
  <div>
    <NextLink href="/posts" passHref shallow><a>Posts</a></NextLink>
    {userAgent}
  </div>
);

HomePage.getInitialProps = (
  { req }: NextPageContext,
): HomePageProps => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default HomePage;
