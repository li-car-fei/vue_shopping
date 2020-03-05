(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{10:function(t,s,r){},11:function(t,s,r){},15:function(t,s,r){"use strict";var e=r(10);r.n(e).a},16:function(t,s,r){"use strict";var e=r(11);r.n(e).a},20:function(t,s,r){"use strict";r.r(s);var e=function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{directives:[{name:"show",rawName:"v-show",value:t.list.length,expression:"list.length"}]},[r("div",{staticClass:"list-control"},[r("div",{staticClass:"list-control-filter"},[r("span",[t._v("品牌:")]),t._v(" "),t._l(t.brands,function(s){return r("span",{staticClass:"list-control-filter-item",class:{on:t.filterBrand.findIndex(function(t){return t==s})>-1},on:{click:function(r){return t.handleFilterBrand(s)}}},[t._v(t._s(s))])})],2),t._v(" "),r("div",{staticClass:"list-control-filter"},[r("span",[t._v("颜色:")]),t._v(" "),t._l(t.colors,function(s){return r("span",{staticClass:"list-control-filter-item",class:{on:t.filterColor.findIndex(function(t){return t==s})>-1},on:{click:function(r){return t.handleFilterColor(s)}}},[t._v(t._s(s))])})],2),t._v(" "),r("div",{staticClass:"list-control-order"},[r("span",[t._v("排序:")]),t._v(" "),r("span",{staticClass:"list-control-order-item",class:{on:""===t.order},on:{click:t.handleOrderDefault}},[t._v("默认")]),t._v(" "),r("span",{staticClass:"list-control-order-item",class:{on:"sales"===t.order},on:{click:t.handleOrderSales}},[t._v("\n                销量\n                "),"sales"===t.order?[t._v("↓")]:t._e()],2),t._v(" "),r("span",{staticClass:"list-control-order-item",class:{on:t.order.indexOf("cost")>-1},on:{click:t.handleOrderCost}},[t._v("\n                价格\n                "),"cost-desc"===t.order?[t._v("↓")]:t._e(),t._v(" "),"cost-asc"===t.order?[t._v("↑")]:t._e()],2)])]),t._v(" "),t._l(t.filteredAndOrderedList,function(t){return r("Product",{key:t.id,attrs:{info:t}})}),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.filteredAndOrderedList.length,expression:"!filteredAndOrderedList.length"}],staticClass:"product-not-found"},[t._v("暂无相关商品")])],2)};e._withStripped=!0;var o=function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("div",{staticClass:"product"},[r("router-link",{staticClass:"product-main",attrs:{to:"/product/"+t.info.id}},[r("img",{attrs:{src:t.info.image}}),t._v(" "),r("h4",[t._v(t._s(t.info.name))]),t._v(" "),r("h4",[t._v("销量"+t._s(t.info.sales))]),t._v(" "),r("div",{staticClass:"product-color",style:{background:t.colors[t.info.color]}}),t._v(" "),r("div",{staticClass:"product-cost"},[t._v("￥ "+t._s(t.info.cost))]),t._v(" "),r("div",{staticClass:"product-add-cart",on:{click:function(s){return s.preventDefault(),t.handleAddCart(s)}}},[t._v("加入购物车")])])],1)};o._withStripped=!0;var i={props:{info:Object},data:()=>({colors:{"白色":"#ffffff","金色":"#dac272","蓝色":"#233472","红色":"#f2352e"}}),methods:{handleAddCart(){this.$store.dispatch("add",this.info.id).then(t=>{},t=>{window.alert(t)})}}},n=(r(15),r(3)),l=Object(n.a)(i,o,[],!1,null,"4ce970e2",null);l.options.__file="src/components/product.vue";var a={components:{Product:l.exports},computed:{list(){return this.$store.state.productList},brands(){return this.$store.getters.brands},colors(){return this.$store.getters.colors},filteredAndOrderedList(){let t=[...this.list];if(this.filterBrand.length){let s=[];t.forEach(t=>{this.filterBrand.forEach(r=>{t.brand==r&&s.push(t)})}),t=s}if(this.filterColor.length){let s=[];t.forEach(t=>{this.filterColor.forEach(r=>{t.color==r&&s.push(t)})}),t=s}return""!==this.order&&("sales"===this.order?t=t.sort((t,s)=>s.sales-t.sales):"cost-desc"===this.order?t=t.sort((t,s)=>s.cost-t.cost):"cost-asc"===this.order&&(t=t.sort((t,s)=>t.cost-s.cost))),t}},data:()=>({filterBrand:[],filterColor:[],order:""}),methods:{handleFilterBrand(t){let s=this.filterBrand.findIndex(s=>s==t);s>-1?this.filterBrand.splice(s,1):this.filterBrand.push(t)},handleFilterColor(t){let s=this.filterColor.findIndex(s=>s==t);s>-1?this.filterColor.splice(s,1):this.filterColor.push(t)},handleOrderDefault(){this.order=""},handleOrderSales(){this.order="sales"},handleOrderCost(){"cost-desc"===this.order?this.order="cost-asc":this.order="cost-desc"}},mounted(){this.$store.dispatch("getProductList")}},d=(r(16),Object(n.a)(a,e,[],!1,null,"283afe90",null));d.options.__file="src/views/list.vue";s.default=d.exports}}]);