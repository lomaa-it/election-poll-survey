import instance from "../utils/axios";
import LsService from "./localstorage";

class ApiServices {
  getAccessToken = () => {
    let user = LsService.getCurrentUser();
    var accesstoken = user.accesstoken;
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
  putRequest = (route, data) => {
    return instance.put(route, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
  };
  getRequest = (route) => {
    return instance.get(route, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
  };
  deleteRequest = (route) => {
    return instance.delete(route, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
  };
}

export default new ApiServices();
