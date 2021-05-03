import {
  cond, identity, is, T,
} from 'ramda';
import fetchifyCollection from './internal/fetchify-collection';
import fetchifyRecord from './internal/fetchify-record';
import { ArrayOrRecord } from './internal/types';

/** Function used to transform a fetched data */
const fetchify: (data: ArrayOrRecord) => ArrayOrRecord = cond([
  [is(Array), fetchifyCollection],
  [is(Object), fetchifyRecord],
  [T, identity],
]);

export default fetchify;
