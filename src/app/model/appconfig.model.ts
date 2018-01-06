export class AppConfig {
  public static ROOT_URL = 'http://localhost:';
  public static API_PORT = '9080/';
  public static AUTH_API_PORT = '9082/'
  public static USER_URL = AppConfig.ROOT_URL + AppConfig.API_PORT + 'users/';
  public static ROLE_URL = AppConfig.ROOT_URL + AppConfig.API_PORT + 'roles';
  public static DEPARTMENT_URL = AppConfig.ROOT_URL + AppConfig.API_PORT + 'departments';
  public static USER_SEARCH_URL = AppConfig.USER_URL + 'search';
  public static AUTHENTICATION_API_ENDPOINT = AppConfig.ROOT_URL + AppConfig.AUTH_API_PORT+ "authenticate";
}
