<template>
  <div id="wrap">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script>

import Header from './header.vue';
import Footer from './footer.vue';


export default {
  components: {
    Header, Footer
  }
};
</script>

<style>
#wrap {
  margin:0 auto;
  max-width: 2560px;
  width: 100%;
  background-color: gray;
}
</style>