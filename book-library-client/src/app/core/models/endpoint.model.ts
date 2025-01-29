/**
 * List of all API endpoints
 */


export const Endpoints = {
  // User endpoints
  INIT_USER_SESSION: `api/auth/init`,
  KEEP_ALIVE_USER_SESSION: `keep-alive`,
  REGISTER_USER_SESSION: `api/auth/register`,

  GET_TOKEN: (code: string, state: string) => {
    return `login/oauth2/code/keycloak?code=${code}&state=${state}`;
  },
  USER_AUTHORIZATION: 'oauth2/authorization/bms-internal-keycloak',
  LOGOUT: 'logout',
  USER_ENDPOINT: 'user/user',
  BOOK_ENDPOINT: 'book/',
  OPEN_LIBRARY_ENDPOINT:'openLibrary/'
};
