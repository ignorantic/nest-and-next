import {
  always, ifElse, isEmpty, map,
} from 'ramda';
import fetchify from '../fetchify';

/** Function used to transform a fetched collection */
const fetchifyCollection: (data: Array<unknown>) => Array<unknown> | undefined = ifElse(
  isEmpty,
  always(undefined),
  map((data: Array<unknown>) => fetchify(data)),
);

export default fetchifyCollection;
