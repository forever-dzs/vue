<!--
 * @Author: DongZS
 * @Date: 2022-04-13 18:44:33
 * @Description: 页面
 * @FilePath: \scf-front-corp-staticd:\练习\vue3.0\src\App.vue
-->
<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App'
})
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  height: 100%;
}
</style>
