import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'shoppingMall',
            component: ShoppingMall
        }, {
            path: '/register',
            name: 'register',
            component: () =>
                import ('@/components/pages/Register')
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('@/components/pages/Login')
        },
        {
            path: '/goodsDetail',
            name: 'login',
            component: () =>
                import ('@/components/pages/GoodsDetail')
        }
    ]
})