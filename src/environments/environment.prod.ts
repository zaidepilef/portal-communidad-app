import packageInfo from '../../package.json';

export const environment = {
  apiUrl: 'https://api.tudominio.com/api',
  appVersion: packageInfo.version,
  production: true
};
