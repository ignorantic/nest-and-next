import {
  cond, identity, is, T,
} from 'ramda';
import sendifyCollection from './internal/sendify-collection';
import sendifyRecord from './internal/sendify-record';
import { ArrayOrRecord } from './internal/types';

/** Function used to transform a send data */
const sendify: (data: ArrayOrRecord) => ArrayOrRecord = cond([
  [is(Array), sendifyCollection],
  [is(Object), sendifyRecord],
  [T, identity],
]);

export default sendify;
