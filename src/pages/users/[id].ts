import { createElement } from 'react';
import { NextPage, NextPageContext } from 'next';
import UserShow from '../../frontend/containers/user-show';
import { isCommonUser, isID } from '../../common/guards';
import { wrapper } from '../../frontend/store';
import { CommonUser } from '../../common/interfaces';

interface PostShowPageProps {
  id: number;
  user?: CommonUser;
}

const UserShowPage: NextPage<PostShowPageProps> = ({ id, user }) => createElement(
  UserShow,
  { id, user },
);

UserShowPage.getInitialProps = ({ query }: NextPageContext) => {
  const id = isID(query.id) ? Number(query.id) : null;
  const user = isCommonUser(query.data) ? query.data : null;
  return ({ id, user });
};

export default wrapper.withRedux(UserShowPage);
