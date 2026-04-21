<template>
<div>
 <router-view></router-view>
    <van-tabbar route active-color="#ee0a24" inactive-color="#000">
  <van-tabbar-item to="/home" icon="shop-o">首页</van-tabbar-item>
  <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
   <van-tabbar-item
        icon="cart-circle-o"
        :to="isLogin ? '/cart' : '/login'"
        replace
      >购物车</van-tabbar-item>
  <van-tabbar-item to="/user" icon="user-circle-o">我的</van-tabbar-item>
</van-tabbar>
</div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  }
}
</script>

<style>

</style>
