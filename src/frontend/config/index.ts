const isServer = typeof window === 'undefined';

const API_URL = isServer ? process.env.API_URL : window.env.API_URL;

const index: Env = { API_URL };

export default index;
