<template>
  <div @click="sendAjax">
    测试发送
  </div>
</template>

<script>

  import axios from 'axios'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      sendAjax() {
        axios({
          method: 'GET',
          url: '/assessment/json/getMenuTree',
          headers: {'X-Requested-With': 'XMLHttpRequest'},
          baseURL: 'http://localhost:8088'
        }).then(response => {
          debugger;
        });
      }
    }
  }
</script>

<style scoped>

</style>
