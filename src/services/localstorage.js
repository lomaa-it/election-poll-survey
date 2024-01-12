const minutes = 60;

class LsService {
  ls = window.sessionStorage;

  setItem(key, value) {
    value = JSON.stringify(value);
    this.ls.setItem(key, value);
    return true;
  }

  getItem(key) {
    let value = this.ls.getItem(key);
    try {
      return JSON.parse(value);
    } catch (e) {
      return null;
    }
  }

  removeItem(key) {
    this.ls.removeItem(key);
    return true;
  }

  setCurrentUser(values) {
    const now = new Date();
    now.setMinutes(now.getMinutes() + minutes);
    let data = { ...values, expiry: now.getTime() };
    this.setItem("polling_survey", data);
    return data;
  }

  getCurrentUser() {
    const now = new Date();
    let data = this.getItem("polling_survey");
    if (!data) {
      return null;
    }

    if (now.getTime() > data.expiry) {
      this.removeCurrentUser();
      return null;
    }

    return data;
  }

  removeCurrentUser() {
    this.removeItem("polling_survey");
    return true;
  }
}

export default new LsService();
