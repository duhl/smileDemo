const HOSTNAME = "https://www.easy-mock.com/mock/5b688452bb39fb125c791fc6/smile/";
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo: HOSTNAME + "index", //商城首页所有信息
    register: LOCALURL + "user/register", //用户注册接口
    login: LOCALURL + "user/login", //用户登录接口
    getDetailGoodsInfo: LOCALURL + "goods/getDetailGoodsInfo" //商品详情接口
}
module.exports = URL