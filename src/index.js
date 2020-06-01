import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import App from './app.vue';
import './style.css';
import product_data from './product';
import util from './util';
Vue.use(VueRouter);
Vue.use(Vuex);

//路由配置
const RouterConfig = {
    //使用H5 history模式
    mode: 'history',
    routes: Routers
};

const router = new VueRouter(RouterConfig);

//跳转前设置title
router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});
//跳转后设置scroll为原点
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

//配置Vuex状态管理
const store = new Vuex.Store({
    state: {
        //商品列表信息
        productList: [],
        //购物车数据，数组形式，数据元素为对象（商品id，购买数量count）
        cartList: [],
        //当前用户账号
        username: window.localStorage.getItem('username'),
        //登录状态    !!转换为bool值
        loginStatus: !!window.localStorage.getItem('loginStatus'),
    },
    getters: {
        //返回品牌队列
        brands: state => {
            //获取所有product的brand并形成数组
            const brands = state.productList.map(item => item.brand);
            //数组去重并返回
            return util.getFilterArray(brands);
        },
        //返回颜色队列
        colors: state => {
            //获取所有product的color并形成数组
            const colors = state.productList.map(item => item.color);
            //数组去重并返回
            return util.getFilterArray(colors);
        }
    },
    //mutations更新state，更新视图
    mutations: {
        //初始化时，添加商品列表
        setProductList(state, data) {
            state.productList = data;
        },
        //添加商品到购物车
        addCart(state, obj) {
            const id = obj.id;
            //获取具体的product，以便修改其stocks库存
            let product = state.productList.find(item => item.id === id);
            if (obj.inCart) {
                //此商品在购物车中，数量+1，对应库存-1
                let Added = state.cartList.find(item => item.id === id);
                Added.count++;
                product.stocks--;
            } else {
                //此商品不在购物车中，加入到购物车中
                state.cartList.push({
                    id: id,
                    count: 1
                });
                //对应库存-1
                product.stocks--;
            }
        },
        //修改购物车商品数量
        editCartCount(state, payload) {
            //浅拷贝，所以修改product中count可以直接修改carList,productList
            //先获取购物车与商品列表对应商品对象
            const product_L = state.productList.find(item => item.id === payload.id);
            const product_C = state.cartList.find(item => item.id === payload.id);
            //修改数量与对应库存
            product_L.stocks -= payload.count;
            product_C.count += payload.count;
        },
        //删除某个购物车商品
        deleteCart(state, id) {
            //获取购物车中此商品的数量，用于归还库存
            const count = state.cartList.find(item => item.id === id).count;
            //findIndex，用于切割购物车列表
            const index = state.cartList.findIndex(item => item.id === id);
            //获取对应的商品在productList中的对象
            const product = state.productList.find(item => item.id === id);
            //修改库存
            product.stocks += count;
            //修改购物车列表
            state.cartList.splice(index, 1);
        },
        //添加评论
        addComment(state, comment_obj) {
            const product = state.productList.find(item => item.id === comment_obj.product_id);
            console.log(product);
            const content = comment_obj.content;
            const username = state.username;
            product.comments.push({
                username: username,
                content: content
            })
        },
        //清空购物车即购买，无需恢复库存
        emptyCart(state) {
            state.cartList = [];
        },
        //username是commit来的用户名，修改state中用户名
        getUser(state, username) {
            state.username = username;
        },
        //flag是commit过来的登录状态，修改state中的状态
        getLoginStatus(state, flag) {
            state.loginStatus = flag;
        }
    },
    actions: {
        //ajax请求商品列表，暂且使用setTimeout模仿加载数据
        getProductList(context) {
            setTimeout(() => {
                //设置state.productList 为引入的product_data
                context.commit('setProductList', product_data)
            }, 500);
        },
        //购买
        buy(context) {
            //模拟ajax请求服务端响应后再清空购物车
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('emptyCart');
                    resolve('购买成功');
                }, 500);
            });
        },
        //添加商品到购物车
        add(context, id) {
            //首先查看登录状态，若未登录则跳转到登陆界面
            if (!context.state.loginStatus) {
                window.alert('请先登录，为您跳转到登录界面');
                //路由跳转
                window.location.href = '/login/login';
                return undefined
            }
            //先查看购物车中是否有该商品
            const isAdded = context.state.cartList.find(item => item.id === id);
            //查看对应商品的库存
            const stocks = context.state.productList.find(item => item.id === id).stocks;
            return new Promise((resolve, reject) => {
                if (stocks) {//有库存，修改数据
                    //如果购物车中不存在商品,设置count为1，存在count++
                    if (isAdded) {
                        context.commit('addCart', {
                            inCart: true,
                            id: id
                        })
                        resolve('加一')
                    } else {
                        context.commit('addCart', {
                            inCart: false,
                            id: id
                        })
                        resolve('加入购物车')
                    }
                } else {
                    //无库存，返回信息
                    reject('库存不足')
                }
            })
        },
        //修改购物车数量
        editCart(context, payload) {
            //先查看对应商品的库存
            const stocks = context.state.productList.find(item => item.id === payload.id).stocks;
            return new Promise((resolve, reject) => {
                //如果是+1，根据库存返回结果与修改
                if (payload.count > 0) {
                    if (stocks) {
                        //有库存
                        context.commit('editCartCount', payload);
                        resolve('修改成功(+1)')
                    } else {
                        //无库存
                        reject('库存不足')
                    }
                } else {
                    //如果是-1，直接修改即可
                    resolve('修改成功(-1)')
                    context.commit('editCartCount', payload);
                }
            })
        }
    }
})

const app = new Vue({
    el: '#app',
    router,
    store,
    //render代替app声明
    render: h => {
        return h(App)
    }
})


