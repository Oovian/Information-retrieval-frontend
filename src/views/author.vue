<template>
    <el-scrollbar>
    <div style="height=100vh">
        <h1 style="color:rgb(22, 14, 94);">Author Page</h1>
        <h2 style="color:rgb(22, 14, 94);">Name: {{$route.params.name}}</h2>
        <h3 style="color:rgb(22, 14, 94);">Cooperater Graph: </h3>
        <div id="mynetwork" ></div>

        <h3 style="color:rgb(22, 14, 94);">Cooperated Authors: </h3>
        <div v-for="(data,idx) in coopData" :key=idx >
            <router-link :to="{
            name: 'author',
            params: { name: data[0] }}">{{data[0]}}</router-link>
        </div>
        <div v-for="(data,idx) in authordata" :key=idx class="c1"
        :style="{
            boxShadow: `var(${getCssVarName('light')})`,
        }">
            <br/>
            <b style="color:rgb(22, 14, 94);">Title: </b>
            <router-link :to="{
            name: 'pdfview',
            query:{pdfurl:data.pdf_url}}">{{ data.title}}</router-link>
            <br/>
            <b style="color:rgb(22, 14, 94);">Summary: </b>
            <br/>
            <span>{{data.summary}}</span>
            <br/>
            <b style="color:rgb(22, 14, 94);">Authors: </b> {{data.authors}}
            <br/>
            <b style="color:rgb(22, 14, 94);">Publish time: </b>{{data.published}}
            <br/>
            <b style="color:rgb(22, 14, 94);">Categories: </b>{{data.categories}}
            <br/>
        </div>
    </div>
    </el-scrollbar>
</template>

<script lang="ts" setup >
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import { useRouter } from "vue-router";
import * as vis from "vis";


const getCssVarName = (type: string) => {
  return `--el-box-shadow${type ? '-' : ''}${type}`
}
let authordata = ref(reactive([
]))
let coopData = ref(reactive([
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
        console.log('urlstr')
        urlstr=urlstr.concat('/cooperation')
        console.log(urlstr)
        axios({ method: 'GET', url: urlstr  })
        .then(resp => {
                if (resp.data) {
                    coopData.value = resp.data['content']
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
        console.log(coopData.value.length)
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
        console.log('urlstr')
        urlstr=urlstr.concat('/cooperation')
        console.log(urlstr)
        axios({ method: 'GET', url: urlstr  })
        .then(resp => {
                if (resp.data) {
                    coopData.value = resp.data['content']
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
  color:rgb(0, 0, 0);
  font-size:15px;
}
#mynetwork {
  width: 300px;
  height: 200px;
  border: 1px solid lightgray;
}
</style>