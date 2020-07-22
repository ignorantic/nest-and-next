import {
  always, ifElse, isEmpty, map,
} from 'ramda';
import sendify from '../sendify';

/** Function used to transform a collection to be sendify */
const sendifyCollection: (data: Array<unknown>) => Array<unknown> = ifElse(
  isEmpty,
  always(undefined),
  map((data: Array<unknown>) => sendify(data)),
);

export default sendifyCollection;
