<template>
    <div>
        <h1>这是authors: {{$route.params.name}}</h1>
    </div>
    <div v-for="(data,idx) in authordata" :key=idx>
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