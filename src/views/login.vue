<template>
    <div class="login-info">
        <template v-if="login">
            <form class="login-info-form">
                <span class="head" :class="{choose:login}" @click="changeLogin(true, false)">登陆</span><span class="head">/</span><span class="head" :class="{choose:register}" @click="changeLogin(false, true)" value="前往注册">注册</span><br>
                <div><span>用户账号: </span><input type="text" v-model="username" placeholder=""/></div>
                <div><span>用户密码: </span><input type="password" v-model="password"/></div>
                <input class="submit" type="button" @click="goHome" value="登录">
                <input class="submit" type="button" @click="changeLogin(false, true)" value="前往注册">
            </form>
        </template>
        <template v-if="register">
            <form class="login-info-form">
                <span class="head" :class="{choose:login}" @click="changeLogin(true, false)">登陆</span><span class="head">/</span><span class="head" :class="{choose:register}" @click="changeLogin(false, true)" value="前往注册">注册</span><br>
                <div><span>用户账号: </span><input type="text" v-model="username" placeholder=""/></div>
                <div><span>用户密码: </span><input type="password" v-model="password"/></div>
                <div><span>确认密码: </span><input type="password" v-model="confirmPassword"/></div>
                <input class="submit" type="button" @click="goLogin" value="注册">
                <input class="submit" type="button" @click="changeLogin(true, false)" value="已有账号">
            </form>
        </template>
    </div>
</template>

<script>
    import util from '../util';
    export default {
        name: "login",
        data(){
            return {
                login: false,
                register: true,
                username: '',
                password: '',
                confirmPassword: '',
            }
        },
        methods: {
            //注册并且登录
            goLogin(){
                console.log('username',util.trim(this.username))
                if(!util.trim(this.username) || !util.trim(this.username) ){
                    window.alert('账号或密码不能为空');
                    return;
                }
                if(this.password !== this.confirmPassword){
                    window.alert('密码不一致，请重新输入');
                    this.password = '';
                    this.confirmPassword = '';
                }else{
                    //缓存存入参数
                    window.localStorage.setItem('username', this.username);
                    window.localStorage.setItem('password', this.password);
                    //改变页面参数
                    this.register = false;
                    //缓存修改登录状态
                    window.localStorage.setItem('loginStatus', 'login');
                    //直接commit触发mutations
                    this.$store.commit('getUser', this.username);
                    window.alert('注册成功，确定进入网站首页');
                    window.location.href = '/list';
                }
            },
            //改变登录，注册的状态
            changeLogin(b1, b2){
                this.login = b1;
                this.register = b2;
            },
            //登录
            goHome(){
                //获取缓存中的账号与密码
                let username = window.localStorage.getItem('username');
                let password = window.localStorage.getItem('password');
                if(!util.trim(this.username) || !util.trim(this.username) ){
                    window.alert('账号或密码不能为空');
                    return;
                }
                //判断与缓存中的账号密码是否一致
                if(username === this.username && password === this.password){
                    //改变页面元素
                    this.login = false;
                    //缓存修改登录状态
                    window.localStorage.setItem('loginStatus', 'login');
                    //直接commit触发mutations
                    this.$store.commit('getUser', this.username);
                    window.alert('登陆成功，确定进入网站首页');
                    //路由跳转
                    window.location.href = '/list';
                }else{
                    window.alert('账号或密码错误');
                }
            },
        },
        //时间周期函数，实例创建后执行
        created(){
            //获取路由中的传来的参数loginStatus
            if(this.$route.params.loginStatus === 'logout'){
                //如果是退出登录跳转过来，清空缓存
                window.localStorage.clear();
                //直接commit触发mutations，设置state的loginstatus为false
                this.$store.commit('getLoginStatus', false);
                return;
            }
            //获取state中登录状态
            const loginStatus = this.$store.state.loginStatus;
            if(loginStatus){
                //如果是已经登录的用户，url跳到list
                this.login = false;
                this.register = false;
                window.alert('您已经是登录状态')
                window.location.href = '/list'
            }
        }
    }
</script>

<style scoped>
    .login-info{
        height:100%;
        width:100%;
        text-align: center;
    }
    .login-info-form{
        position: relative;
        left: 400px;
        top: 100px;
        width: 600px;
        height: 400px;
        border: 1.5px solid #1285e4;
        border-radius: 40px;
    }
    .login-info-form .head{
        cursor: pointer;
         font-size: 32px;
         color: #3b709b;
     }
     .login-info-form .choose{
         text-decoration: underline;
         text-decoration-color: #1285e4
     }
    .submit{
        width: 80px;
        height: 30px;
        line-height: 30px;
        display: inline-block;
        color: #1285e4;
        border-radius: 40px;
        font-size: 20px;
        transition: 0.3s;
        background: rgb(158, 186, 211);
        border: 1px solid rgb(158, 186, 211);
        cursor: pointer;
    }
    .submit:hover{
        background: #2c2e30
    }
    .login-info-form div{
        margin-top: 35px;
        margin-bottom: 26px;
        color: #1285e4;
        font-size: 20px
    }
    .login-info-form div input{
        background-color: rgb(158, 186, 211);
        border: none;
        border-bottom: 1.5px solid #1285e4;
        color: #1285e4;
        font-size: 20px
    }
</style>