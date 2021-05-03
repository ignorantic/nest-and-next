import {
  compose, fromPairs, map, toPairs,
} from 'ramda';
import fetchify from '../fetchify';
import toCamel from '../to-camel';

/** Function used to transform a fetched object */
const fetchifyRecord: (data: Record<string, unknown>) => Record<string, unknown> = compose(
  fromPairs,
  /* @ts-ignore */ // eslint-disable-line
  map(([key, value]) => [toCamel(key), fetchify(value)]),
  toPairs,
);

export default fetchifyRecord;
