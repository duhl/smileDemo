import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Main from '@/components/pages/Main'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/shoppingMall',
            children: [{
                path: '/shoppingMall',
                name: 'ShoppingMall',
                component: ShoppingMall
            }, {
                path: '/categoryList',
                name: 'CategoryList',
                component: () =>
                    import ('@/components/pages/CategoryList')
            }, {
                path: '/cart',
                name: 'Cart',
                component: () =>
                    import ('@/components/pages/Cart')
            }]
        },

        {
            path: '/register',
            name: 'Register',
            component: () =>
                import ('@/components/pages/Register')
        },
        {
            path: '/login',
            name: 'Login',
            component: () =>
                import ('@/components/pages/Login')
        },
        {
            path: '/goodsDetail',
            name: 'GoodsDetail',
            component: () =>
                import ('@/components/pages/GoodsDetail')
        },
        {
            path: '/upload',
            name: 'upload',
            component: () =>
                import ('@/components/pages/Upload')
        }
    ]
})