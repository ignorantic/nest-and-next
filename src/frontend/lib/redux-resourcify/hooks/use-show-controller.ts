import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { path } from 'ramda';

import { crudGetOne, registerResource } from '../actions';
import { AppState } from '../../../store/make-store';

interface ListProps {
  basePath: string;
  resource: string;
  id: number;
}

interface ListControllerProps<Entity> {
  record: Entity
}

export const useShowController = <Entity>(props: ListProps): ListControllerProps<Entity> => {
  const {
    basePath,
    resource,
    id,
  } = props;

  const resourcePath = ['resources', resource];

  const selectIsRegistered = (state: AppState): boolean => path(resourcePath, state);
  const selectOne = (state: AppState): Entity => path([...resourcePath, 'data', id], state);

  const dispatch = useDispatch();

  const isRegistered = useSelector(selectIsRegistered);

  useEffect(() => {
    if (!isRegistered) {
      dispatch(registerResource({ name: resource, options: {} }));
    }
  }, []);

  useEffect(() => {
    dispatch(crudGetOne(resource, id, basePath));
  }, []);

  const record: Entity = useSelector(selectOne);

  return {
    record,
  };
};
