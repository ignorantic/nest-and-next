import {
  compose, fromPairs, map, toPairs,
} from 'ramda';
import sendify from '../sendify';
import toSnake from '../to-snake';

/** Function used to transform a object to be send */
const sendifyRecord: (data: Record<string, unknown>) => Record<string, unknown> = compose(
  fromPairs,
  /* @ts-ignore */ // eslint-disable-line
  map(([key, value]) => [toSnake(key), sendify(value)]),
  toPairs,
);

export default sendifyRecord;
