import crudProvider from '@fusionworks/ra-data-nest-crud';
import { DataProvider } from '../lib/redux-resourcify';
import httpClient from './http-client';
import convertLegacyDataProvider from './convert-legacy-data-provider';
import config from '../config';

const dataProvider: DataProvider = convertLegacyDataProvider(
  crudProvider(config.API_URL, httpClient),
);

export default dataProvider;
