import crudProvider from '@fusionworks/ra-data-nest-crud';
import { DataProvider } from '../lib/redux-resourcify';
import httpClient from './httpClient';
import convertLegacyDataProvider from './convertLegacyDataProvider';
import config from '../config';

const dataProvider: DataProvider = convertLegacyDataProvider(
  crudProvider(config.API_URL, httpClient),
);

export default dataProvider;
