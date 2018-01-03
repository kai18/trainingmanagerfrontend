export class AppConfig {
  public static ROOT_URL = 'http://localhost:';
  public static API_PORT = '9654/';
  public static USER_URL = AppConfig.ROOT_URL + AppConfig.API_PORT + 'users/';
  public static ROLE_URL = AppConfig.ROOT_URL + AppConfig.API_PORT + 'role';
  public static DEPARTMENT_URL = AppConfig.ROOT_URL + AppConfig.API_PORT + 'department';
  public static USER_SEARCH_URL = AppConfig.USER_URL + 'search';
}
