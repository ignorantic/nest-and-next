import { useSelector } from 'react-redux';
import { path } from 'ramda';

import useListParams from './use-list-params';

interface ListProps {
  basePath: string;
  perPage?: number;
  resource: string;
}

interface ListControllerProps<Entity> {
  page: number;
  setPage(page: number): void;
  perPage: number;
  data: Entity[]
  total: number;
}

export const useListController = <Entity>(props: ListProps): ListControllerProps<Entity> => {
  const {
    basePath,
    perPage = 10,
    resource,
  } = props;

  const {
    setPage,
    page,
  } = useListParams({
    basePath,
    resource,
    perPage,
  });

  const list: Record<number, Entity> = useSelector(path(['resources', resource, 'data']));
  const ids: number[] = useSelector(path(['resources', resource, 'list', 'ids']));
  const total: number = useSelector(path(['resources', resource, 'list', 'total']));

  const data: Entity[] = ids?.map((id) => list[id]) || [];

  return {
    page,
    setPage,
    perPage,
    data,
    total,
  };
};
