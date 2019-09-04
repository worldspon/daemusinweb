<template>
  <div id="wrap">
    <Header></Header>
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
  html {
    font-size: 10px;
  }

  body {
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  #wrap {
    margin:0 auto;
    max-width: 2560px;
    width: 100%;
    background-color: #fcf5eb;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
  }

  h2 {
    font-size: 2rem;
    font-weight: bold;
  }

  h3 {
    font-size: 1.5rem;
  }

  a {
    color: black;
  }

  @media (max-width: 1366px) {
  /* Device = Tablets */
    html {
      font-size: 8px;
    }
  }
</style>