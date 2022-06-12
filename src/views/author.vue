<template>
    <div >
        <h1>这是authors: {{$route.params.name}}</h1>
    </div>
    <div style="height=800px">
    <div v-for="(data,idx) in authordata" :key=idx class="c1" >
        <br/>
        <span style="color:#00F">title: </span>
        <router-link :to="{
        name: 'pdfview',
        query:{pdfurl:data.pdf_url}}">{{ data.title}}</router-link>
        <br/>
        <span style="color:#00F">Summary: </span>
        <br/>
        <span>{{data.summary}}</span>
        <br/>
        <span style="color:#00F">authors: </span> {{data.authors}}
        <br/>
        <span style="color:#00F">Publish time: </span>{{data.published}}
        <br/>
        <span style="color:#00F">Categories: </span>{{data.categories}}
        <br/>
    </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import { useRouter } from "vue-router";
let authordata = ref(reactive([
]))
const router = useRouter();
const name = ref(router.currentRoute.value.params.name);
watch(
      // 监听非响应式数据
      () => router.currentRoute.value,
      (val) => {
        // 修改name
        name.value = val.params.name;
        let urlstr='/author/'.concat(name.value) 
        console.log(urlstr)
        axios({ method: 'GET', url: urlstr  })
        .then(resp => {
                if (resp.data) {
                    authordata.value = resp.data['content']
                }
                else {
                    ElMessage({
                        message: "拉取失败: " + resp.data.msg,
                        type: 'warning',
                    })
                }
                ElMessage({
                    showClose: true,
                    message: '拉取到 ' + resp.data['data'].length + ' 条数据',
                    type: 'success',
                })
        });
      }
    );

const loadOptionData = () => { 
    let urlstr='/author/'.concat(name.value) 
        console.log(urlstr)
        axios({ method: 'GET', url: urlstr  })
        .then(resp => {
                if (resp.data) {
                    authordata.value = resp.data['content']
                }
                else {
                    ElMessage({
                        message: "拉取失败: " + resp.data.msg,
                        type: 'warning',
                    })
                }
                ElMessage({
                    showClose: true,
                    message: '拉取到 ' + resp.data['data'].length + ' 条数据',
                    type: 'success',
                })
        });
}

loadOptionData()


</script>
<style scoped>

.c1{
  text-align: justify;
  margin-top: 20px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
  color:rgb(3, 3, 3);
  font-size:15px;
   box-shadow:
       inset 0 -3em 3em rgb(231, 222, 252),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgb(63, 27, 143);
}
</style>