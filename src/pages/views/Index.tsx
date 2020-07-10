import React, { useEffect, useState } from 'react';
import { NextPage, NextPageContext } from 'next';

function useUsers() {
  const [ users, setUsers ] = useState<string>();

  useEffect(
    () => {
      fetch("/api/users")
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

const Index: NextPage<Props> = ({ query }) => {
  const greetName = query.name ? query.name : 'World';
  const users = useUsers();
  return (
    <div>
      <h1>Hello, {greetName}!</h1>
      <p>Users: {users}</p>
    </div>
  );
};

Index.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = ctx;
  return { query };
};

export default Index;
