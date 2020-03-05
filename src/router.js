//商品列表路由配置

//meta中存有title，用作跳转路由时改变title标题
const routers = [
    {
        path: '/list',
        meta: {
            title: '商品列表'
        },
        component: (resolve) => require(['./views/list.vue'], resolve)
    },
    {
        path: '/product/:id',
        meta: {
            title: '商品详情'
        },
        component: (resolve) => require(['./views/product.vue'], resolve)
    },
    {
        path: '/cart',
        meta: {
            title: '购物车'
        },
        component: (resolve) => require(['./views/cart.vue'], resolve)
    },
    {
        path: '/login/:loginStatus',
        meta: {
            title: '登录注册'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/login/login'                         //重定向路由至登录页面，且传入的loginStatus参数是 login
    }
];
export default routers;
