<!-- 点击具体商品时显示-->
<template>
    <div v-if="product">
        <div class="product">
            <!-- 商品图片、名称、价格 -->
            <div class="product-image">
                <img :src="product.image">
            </div>
            <div class="product-info">
                <h3>{{product.name}}</h3>
                <div class="product-cost">￥  {{product.cost}}</div>
                <div class="product-add-cart" @click="handleAddCart">加入购物车</div>
            </div>
        </div>
        <div class="product-desc">
            <h2>产品介绍</h2>
            <img :src="product.imageDetail">
        </div>
        <div class="product-comments">
            <div v-for="(comment,index) in comments" :key="index" class="comments">
                <div class="comments-username">{{comment.username}}评论：</div>
                <div class="comments-content">{{comment.content}}</div>
            </div>
            <div class="user-comment">
                <textarea class="user-comment-content" v-model="user_comment"></textarea>
                <button class="user-comment-submit" type='button' @click="comment">评论</button>
            </div>
        </div>
    </div>
</template>

<script>
    //导入productlist数据
    //import product_data from '../product.js'

    export default {
        data(){
            return {
                //获取路由中的参数id
                id: parseInt(this.$route.params.id),
                product: null,
                comments:[],
                user_comment:''
            }
        },
        methods: {
            getProduct(){
                setTimeout( () => {
                    //模拟ajax获取具体商品数据
                    this.product = this.$store.state.productList.find(item => item.id === this.id);
                    this.comments=this.product.comments;
                }, 300);
            },
            handleAddCart(){
                //增加1件此商品至购物车，返回一个Promise
                this.$store.dispatch('add', this.id).then(text=>{
                    //console.log(text)
                },error=>{
                    window.alert(error)
                })
            },
            comment(){
                const content=this.user_comment;
                const id=this.id;
                this.$store.commit('addComment',{
                    product_id:id,
                    content:content
                });
                this.user_comment='';
            }
        },
        mounted(){
            //初始化数据
            this.getProduct()
        }
    }
</script>
<!-- scoped属性表示只对当前组件有效，不影响其他组件 -->
<style scoped>
    .product{
        margin: 82px 82px 62px ;
        padding: 32px;
        background: rgb(230, 221, 221);
        border: 1px solid #dddee1;
        border-radius: 10px;
        overflow: hidden;
    }
    .product-image{
        width: 40%;
        height: 250px;
        float: left;
        text-align: center;
    }
    .product-image img{
        height: 100%;
    }
    .product-info{
        width: 40%;
        padding: 50px 0 30px;
        height: 50px;
        float: left;
        text-align: center;
    }
    .product-cost{
        color: #f2352e;
        margin: 8px 0;
    }
    .product-add-cart{
        display: inline-block;
        padding: 8px 64px;
        margin: 8px 0;
        background: #2d8cf0;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
    }
    .product-desc{
        background: rgb(230, 221, 221);
        margin: 82px 82px 62px;
        padding: 32px;
        border: 1px solid #dddee1;
        border-radius: 10px;
        text-align: center;
    }
    .product-desc img{
        display: block;
        width: 50%;
        height: 50%;
        margin: 32px auto;
        padding: 32px;
        border-bottom: 1px solid #dddee1;
    }
    .product-comments{
        background: rgb(230, 221, 221);
        margin: 82px 82px 62px;
        padding: 32px;
        border: 1px solid #dddee1;
        border-radius: 10px;
    }
    .comments{
        padding: 12px 12px 10px 10px;
        margin-bottom: 15px;
        border: 1.5px solid rgb(175, 62, 77);
        border-radius: 12px;
    }
    .comments-username{
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 6px;
    }
    .comments-content{
        font-size: 16px;
        font-weight: 500;
        margin-left: 40px;
    }
    .user-comment{
        text-align: center;
        width: 60%;
        padding:28px;
    }
    .user-comment-content{
        width: 600px;
        height: 60px;
        font-size: 18px;
        border: 1px solid rgb(175, 62, 77);
        border-radius: 10px;
    }
    .user-comment-submit{
        margin-left: 20px;
        display: inline-block;
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 18px;
        color: #fff;
        font-size: 18px;
        background: rgb(100, 69, 100);
        transition: 0.5s;
    }
    .user-comment-submit:hover{
        background: rgb(192, 22, 192)
    }

</style>