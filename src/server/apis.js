import Axios from "./axios";

class Api extends Axios {
  async getUserInfo(params = {}) {
    return await this.axios("GET", "user", params);
  }
  async login(params = {}) {
    return await this.axios("POST", "login", params);
  }
  async upload(params = {}) {
    return await this.axios("POST", "upload/image", params);
  }
  async logout(params = {}) {
    return await this.axios("GET", "logout", params);
  }
  async userEdit(params = {}) {
    return await this.axios("POST", "user/edit", params);
  }
  async dryingList(params = {}) {
    return await this.axios("GET", "drying/list", params);
  }
  async dryingAdd(params = {}) {
    return await this.axios("POST", "drying/dryingadd", params);
  }
  async index(params = {}) {
    return await this.axios("GET", "index", params);
  }
  async productDetail(params = {}) {
    return await this.axios("GET", "product/detail/"+params);
  }
  async addCart(params = {}) {
    return await this.axios("POST", "cart/add", params);
  }
  async addressList(params = {}) {
    return await this.axios("GET", "address/list", params);
  }
  async orderConfirm(params = {}) {
    return await this.axios("POST", "order/confirm", params);
  }
  async cartCount(params = {}) {
    return await this.axios("GET", "cart/count", params);
  }
  async cartList(params = {}) {
    return await this.axios("GET", "cart/list", params);
  }
  
  
}

export default new Api();