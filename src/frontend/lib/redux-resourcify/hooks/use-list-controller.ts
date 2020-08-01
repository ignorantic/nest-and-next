import { useSelector } from 'react-redux';
import { path } from 'ramda';

import { AppState } from '../../../store/make-store';
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

  type EntityList = Record<number, Entity>
  const resourcePath = ['resources', resource];

  const selectList = (state: AppState): EntityList => path([...resourcePath, 'data'], state);
  const selectIds = (state: AppState): number[] => path([...resourcePath, 'list', 'ids'], state);
  const selectTotal = (state: AppState): number => path([...resourcePath, 'list', 'total'], state);

  const {
    setPage,
    page,
  } = useListParams({
    basePath,
    resource,
    perPage,
  });

  const list: Record<number, Entity> = useSelector(selectList);
  const ids = useSelector(selectIds);
  const total = useSelector(selectTotal);

  const data: Entity[] = ids?.map((id) => list[id]) || [];

  return {
    page,
    setPage,
    perPage,
    data,
    total,
  };
};
