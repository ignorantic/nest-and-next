import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import consola from 'consola';
import { path } from 'ramda';

import { crudGetList, registerResource } from '../actions';
import { isPage } from '../../../../common/guards';
import { AppState } from '../../../store/make-store';

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

  const selectIsRegistered = (state: AppState): boolean => path(resourcePath, state);
  const selectList = (state: AppState): EntityList => path([...resourcePath, 'data'], state);
  const selectIds = (state: AppState): number[] => path([...resourcePath, 'list', 'ids'], state);
  const selectTotal = (state: AppState): number => path([...resourcePath, 'list', 'total'], state);

  const router = useRouter();
  const initialPage = isPage(router.query.page) ? Number(router.query.page) : 1;
  const [page, setPage] = useState<number>(initialPage);

  const dispatch = useDispatch();

  const isRegistered = useSelector(selectIsRegistered);

  useEffect(() => {
    if (!isRegistered) {
      dispatch(registerResource({ name: resource, options: {} }));
    }
  }, []);

  useEffect(() => {
    const asPath = page === 1 ? basePath : `${basePath}?page=${page}`;
    router.push(basePath, asPath, { shallow: true })
      .then(() => {
        dispatch(crudGetList(resource, { page, perPage }, { field: 'id', order: 'ASC' }));
      })
      .catch(() => {
        consola.error(`Redirect was failed. Path: ${asPath}`);
      });
  }, [page]);

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
