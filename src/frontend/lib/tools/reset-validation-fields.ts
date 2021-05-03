import { head, forEachObjIndexed } from 'ramda';
import toCamel from './to-camel';

/**
 * Function used to transform a form errors
 *
 * @param errors The fetched data
 * @returns {{}}
 */
function resetValidationFields({ errors }) {
  const data = {};
  forEachObjIndexed((value, key) => {
    const index = toCamel(String(key));

    data[index] = head(value);
  }, errors);
  return data;
}

export default resetValidationFields;
