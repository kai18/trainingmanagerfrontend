export class AppConfig {
  public static ROOT_URL = 'http://localhost:';
  public static API_PORT = '9080/';
  public static USER_URL = AppConfig.ROOT_URL + AppConfig.API_PORT + 'users/';
  public static ROLE_URL = AppConfig.ROOT_URL + AppConfig.API_PORT + 'roles';
  public static USER_SEARCH_URL = AppConfig.USER_URL + 'search';
}
