import React, { useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';

function useUsers() {
  const [ users, setUsers ] = useState<string>();

  useEffect(
    () => {
      fetch("/api/posts")
        .then(response => response.json())
        .then(json => setUsers(JSON.stringify(json)));
    },
    []
  );

  return users;
}

interface Props {
  query: { name?: string };
}

const Home: NextPage<Props> = ({ query }) => {
  const greetName = query.name ? query.name : 'World';
  const users = useUsers();
  return (
    <div>
      <h1>Hello, {greetName}!</h1>
      <p>Users: {users}</p>
    </div>
  );
};

Home.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  return { query };
};

export default Home;
