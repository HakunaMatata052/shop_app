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
    return await this.axios("GET", "index", params,{LOADING:true});
  }
  async productDetail(params = {}) {
    return await this.axios("GET", "product/detail/"+params,{},{LOADING:true});
  }
  async addCart(params = {}) {
    return await this.axios("POST", "cart/add", params,{isLogin:true});
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
  async cartNum(params = {}) {
    return await this.axios("POST", "cart/num", params);
  }
  async orderComputed(params = {}) {
    return await this.axios("POST", "order/computed/"+ params);
  }
  async cartDel(params = {}) {
    return await this.axios("POST", "cart/del", params);
  }
  async orderList(params = {}) {
    return await this.axios("GET", "order/list", params);
  }
  async productHot(params = {}) {
    return await this.axios("GET", "product/hot", params);
  }
  async search(params = {}) {
    return await this.axios("GET", "products", params,{LOADING:true});
  }
  async category(params = {}) {
    return await this.axios("GET", "category", params);
  }
  async messageList(params = {}) {
    return await this.axios("GET", "message/list", params);
  }
  async messageEdit(params = {}) {
    return await this.axios("GET", "message/edit", params,{LOADING:true});
  }
  async messageDel(params = {}) {
    return await this.axios("GET", "message/del", params);
  }
  async userBank(params = {}) {
    return await this.axios("GET", "user/userbank", params,{LOADING:true});
  }  
  async BankDel(params = {}) {
    return await this.axios("POST", "user/bank_del", params,{LOADING:true});
  }
  async bankList(params = {}) {
    return await this.axios("GET", "user/banklist", params);
  }
  async bankEdit(params = {}) {
    return await this.axios("POST", "user/bank_edit", params);
  }
  async addressDefaultSet(params = {}) {
    return await this.axios("POST", "address/default/set", params);
  }
  async addressDetail(params = {}) {
    return await this.axios("GET", "address/detail/"+params,{},{LOADING:true});
  }
  async addressEdit(params = {}) {
    return await this.axios("POST", "address/edit" ,params);
  }
  async addressDel(params = {}) {
    return await this.axios("POST", "address/del" ,params);
  }
  async tradepwdup(params = {}) {
    return await this.axios("POST", "user/tradepwdup" ,params,{LOADING:true});
  }
  async levelGrade(params = {}) {
    return await this.axios("GET", "user/level/grade" ,params,{LOADING:true});
  }
  async vip_first(params = {}) {
    return await this.axios("POST", "user/level/vip_first" ,params,{LOADING:true});
  }
  async vip_buy(params = {}) {
    return await this.axios("POST", "user/level/vip_buy" ,params,{LOADING:true});
  }
  async smscode(params = {}) {
    return await this.axios("POST", "register/verify" ,params,{LOADING:true});
  }
  async register(params = {}) {
    return await this.axios("POST", "register" ,params,{LOADING:true});
  }
  async orderCreate(params = {}) {
    return await this.axios("POST", "order/create/"+params.orderid ,params,{LOADING:true});
  }
  async orderDetail(params = {}) {
    return await this.axios("GET", "order/detail/"+params ,{},{LOADING:true});
  }
  async pwdup(params = {}) {
    return await this.axios("POST", "register/reset",params,{LOADING:true});
  }
 
  async editphone(params = {}) {
    return await this.axios("POST", "editphone",params,{LOADING:true});
  }
  async bill(params = {}) {
    return await this.axios("GET", "spread/commission/"+params.type,params,{LOADING:true});
  }  
  async about(params = {}) {
    return await this.axios("GET", "about",params,{LOADING:true});
  }
  async invite(params = {}) {
    return await this.axios("GET", "invite",params,{LOADING:true});
  }
  async spreadPeople(params = {}) {
    return await this.axios("POST", "spread/people",params,{LOADING:true});
  }
  async orderchase(params = {}) {
    return await this.axios("POST", "orderchase", params);
  }
  async orderPay(params = {}) {
    return await this.axios("POST", "order/pay", params);
  }
  
}

export default new Api();