import instance from "../utils/axios";
import LsService from "./localstorage";

class ApiServices {
  getAccessToken = () => {
    let user = LsService.getCurrentUser();
    var accesstoken = user.user_pk;
    return accesstoken;
  };
  postRequest = (route, data) => {
    return instance.post(route, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
  };
}

export default new ApiServices();
