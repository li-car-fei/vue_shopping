<template>
    <div v-show="list.length">
        <div class="list-control">
            <div class="list-control-filter">
                <span>品牌:</span>
                <span class="list-control-filter-item"
                      :class="{on: filterBrand.findIndex(brand=>brand==item)>-1}"
                      v-for="item in brands"
                      @click="handleFilterBrand(item)">{{item}}</span>
            </div>
            <div class="list-control-filter">
                <span>颜色:</span>
                <span class="list-control-filter-item"
                      :class="{on: filterColor.findIndex(color=>color==item)>-1}"
                      v-for="item in colors"
                      @click="handleFilterColor(item)">{{item}}</span>
            </div>

            <div class="list-control-order">
                <span>排序:</span>
                <span class="list-control-order-item"
                      :class="{on: order === ''}"
                      @click="handleOrderDefault">默认</span>
                <span class="list-control-order-item"
                      :class="{on: order === 'sales'}"
                      @click="handleOrderSales">
                    销量
                    <template v-if="order === 'sales'">↓</template>
                </span>
                <span class="list-control-order-item"
                      :class="{on: order.indexOf('cost') > -1}"
                      @click="handleOrderCost">
                    价格
                    <template v-if="order === 'cost-desc'">↓</template>
                    <template v-if="order === 'cost-asc'">↑</template>
                </span>
            </div>
        </div>
        <Product v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>
        <div class="product-not-found"
             v-show="!filteredAndOrderedList.length">暂无相关商品</div>
    </div>
</template>

<script>
    //导入商品简介组件
    import Product from '../components/product.vue';
    export default {
        //使用组件product
        components: {Product},
        computed: {
            list(){
                //从Vuex获取商品列表信息
                return this.$store.state.productList;
            },
            brands(){
                //从getters中获取所有商品的品牌
                return this.$store.getters.brands;
            },
            colors(){
                return this.$store.getters.colors;
            },
            filteredAndOrderedList(){
                //拷贝原数组
                let list = [...this.list];
                //品牌过滤，分别forEach遍历productlist与品牌筛选队列，匹配的product暂存push
                if(this.filterBrand.length){
                    let list1=[];
                    list.forEach(item=>{
                        this.filterBrand.forEach(brand=>{
                            if(item.brand==brand){
                                list1.push(item)
                            }
                        })
                    });
                    list=list1;
                }
                //颜色过滤，分别forEach遍历productlist与颜色筛选队列，匹配的product暂存push
                if(this.filterColor.length){
                    let list1=[]
                    list.forEach(item=>{
                        this.filterColor.forEach(color=>{
                            if(item.color==color){
                                list1.push(item)
                            }
                        })
                    })
                    list=list1;
                }
                //排序
                if(this.order !== ''){
                    if(this.order === 'sales'){
                        list = list.sort((a, b) => b.sales - a.sales);
                    }else if(this.order === 'cost-desc'){
                        list = list.sort((a, b) => b.cost - a.cost);
                    }else if(this.order === 'cost-asc'){
                        list = list.sort((a, b) => a.cost - b.cost);
                    }
                }
                return list;
            }
        },
        data(){
            return {
                //品牌过滤选中的品牌
                filterBrand: [],
                //颜色过滤选中的颜色
                filterColor: [],
                //排序过滤选中的方式：
                //cost-desc价格降序
                //cost-asc价格升序
                //sales销量
                order: ''
            }
        },
        methods: {
            //品牌筛选
            handleFilterBrand(brand){
                //点击品牌过滤，再次点击取消
                let index=this.filterBrand.findIndex(item=>item==brand);
                if (index>-1) {
                    //若已经筛选的品牌包含此品牌，则删除
                    this.filterBrand.splice(index,1);
                }else{
                    //将此品牌加入到品牌筛选队列中
                    this.filterBrand.push(brand)
                }
            },
            //颜色筛选
            handleFilterColor(color){
                //点击颜色过滤，再次点击取消
                let index=this.filterColor.findIndex(item=>item==color)
                if (index>-1) {
                    //若已经筛选的颜色包含此颜色，则删除
                    this.filterColor.splice(index,1)
                }else{
                    //将此颜色加入到颜色筛选队列中
                    this.filterColor.push(color)
                }
            },
            handleOrderDefault(){
                this.order = '';
            },
            handleOrderSales(){
                this.order = 'sales';
            },
            handleOrderCost(){
                //当点击升序时将箭头更新↓,降序设置为↑
                if(this.order === 'cost-desc'){
                    this.order = 'cost-asc';
                }else{
                    this.order = 'cost-desc';
                }
            },

        },
        mounted(){
            //初始化时通过Vuex actions获取商品列表信息
            this.$store.dispatch('getProductList');
        }
    }
</script>

<style scoped>
    .list-control{
        background: rgb(158, 186, 211);
        border-radius: 6px;
        margin: 16px;
        padding: 16px;
        box-shadow: 0px 1.3px 1.3px rgb(10, 10, 10);
    }
    .list-control-filter{
        margin-bottom: 16px;
    }
    .list-control-filter-item,
    .list-control-order-item {
        cursor: pointer;
        display: inline-block;
        border: 1px solid #e9eaec;
        border-radius: 4px;
        margin-right: 6px;
        padding: 2px 6px;
    }
    .list-control-filter-item.on,
    .list-control-order-item.on{
        background: #f2352e;
        border: 1px solid #f2352e;
        color: #fff;
    }
    .product-not-found{
        text-align: center;
        padding: 32px;
    }
</style>