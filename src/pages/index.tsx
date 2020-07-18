import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => (
  <div>
    <Link href="/posts"><a>Posts</a></Link>
  </div>
);

export default Home;
