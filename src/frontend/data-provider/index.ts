import crudProvider from '@fusionworks/ra-data-nest-crud';
import { DataProvider } from '../lib/redux-resourcify';
import httpClient from './httpClient';
import convertLegacyDataProvider from './convertLegacyDataProvider';

const dataProvider: DataProvider = convertLegacyDataProvider(
  crudProvider('http://localhost/api', httpClient),
);

export default dataProvider;
