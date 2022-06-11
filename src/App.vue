<template>

  <el-container class="layout-container-demo" style="height: 500px" data = str>
    <router-view></router-view>      
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

</script>

<style scoped>

</style>
