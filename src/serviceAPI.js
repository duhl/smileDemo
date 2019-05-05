const HOSTNAME = "https://www.easy-mock.com/mock/5b688452bb39fb125c791fc6/smile/";
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo: HOSTNAME + "index", //商城首页所有信息
    register: LOCALURL + "user/register", //用户注册接口
    login: LOCALURL + "user/login", //用户登录接口
    getDetailGoodsInfo: LOCALURL + "goods/getDetailGoodsInfo", //商品详情接口
    getCategoryList: LOCALURL + "goods/getCategoryList", //商品大类接口
    getCategorySubList: LOCALURL + "goods/getCategorySubList", //商品小类接口
    getGoodsListByCategorySubId: LOCALURL + "goods/getGoodsListByCategorySubId" //根据小分类id查询列表
}
module.exports = URL