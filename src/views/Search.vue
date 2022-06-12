<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside style="width: 50% ">
      <el-container>
        <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="ruleFormRef" style="position: relative;top: 20px;" >
            <el-row>
              <el-form-item label=" " style="width: 500px">
                <el-input v-model="formInline.query" placeholder="输入查询语句" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleSubmit(ruleFormRef)" plain>Query</el-button>
              </el-form-item>
            </el-row>
            <el-form-item label=" score_strategy">
            <el-select v-model="formInline.score_strategy" filterable placeholder="选择或输入算法" >
                <el-option label="tf_idf" value="tf_idf" />
                <el-option label="BM25" value="BM25" />
                <el-option label="BM25_plus" value="BM25_plus" />
                <el-option label="vsm" value="vsm" />                
            </el-select>
            </el-form-item>
            <!--rk_startegy-->
            <el-form-item label="rk_startegy">
            <el-select v-model="formInline.rk_startegy" filterable placeholder="选择或输入排序方式" >
                <el-option label="publish_time" value="publish_time" />
                <el-option label="score" value="score" />
            </el-select>
            </el-form-item>
            <el-form-item label=" desc_order">
            <el-select v-model="formInline.desc_order" filterable placeholder="选择是否降序排列" >
                <el-option label="True" value="True" />
                <el-option label="False" value="False" />
            </el-select>
            </el-form-item>
            <el-form-item label="selected_areas">
            <el-select
              v-model="formInline.selected_areas"
              multiple
              placeholder="select areas"
              style="width: 240px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            </el-form-item>
            
        </el-form>
      </el-container>          
        <div v-for="(data,idx) in tableData" :key=idx class="c1">
          <div class="b"><b>Title: </b>
          <router-link :to="{
          name: 'pdfview',
          query:{pdfurl:data.pdf_url}}">{{ data.title}}</router-link>
          </div>
          <div class="b"><b> Summary:</b> 
          <br/>
          <span style="color: rgb(3, 3, 3)">{{data.summary}}</span>
          </div>
          <div class="b"><b>Authors:</b></div>
          <div v-for="(item,id) in authorData[idx]" :key=id >
            <router-link :to="{
              name: 'author',
              params: { name: item }}">{{ item}}</router-link>
          </div>
          <div class="b"><b>Publish time: </b></div>{{data.published}}
          <br/>
          <div class="b"><b>Categories: </b></div>{{data.categories}}
          <br/>
          <div class="b"><b>Score: </b></div>{{data.score}}
        </div>
      </el-aside>

      <el-main> 
        <router-view></router-view>
      </el-main>
    </el-container>
  
</template>



<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import * as echarts from 'echarts'
import {onMounted} from "vue";
const options = [
  {
    value: 'cs.AI',
    label: 'cs.AI',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
const value = ref('')
let userList = [{
  name:'q',
  age: 2
},
{
  name:'q',
  age: 23
},
{
  name:'q',
  age: 233
}]
const formInline = reactive({
  query: '',
  score_strategy:'',
  rk_startegy:'',
  desc_order:'',
  selected_areas:[]
})

const ruleFormRef = ref<FormInstance>()
const form = reactive({
    threshold: '',
})
let tableData = ref(reactive([
]))
let authorData = ref(reactive([
]))
// 获取干扰分析数据，并更新表格
const handleSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    
    let urlstr = '/search';
    console.log(formInline.selected_areas.length)
    let areastr=''
    for(var i=0;i<formInline.selected_areas.length-1;i++){
      areastr = areastr.concat( formInline.selected_areas[i] );
      areastr = areastr.concat( ',' );
    }
    areastr = areastr.concat( formInline.selected_areas[formInline.selected_areas.length-1] );
    axios({ method: 'GET', url: urlstr ,params: {selected_areas:areastr, 
              desc_order:formInline.desc_order, 
              query:formInline.query, 
              score_strategy:formInline.score_strategy,
              rk_startegy:formInline.rk_startegy
              }
              })
        .then(resp => {
                if (resp.data) {
                    tableData.value = resp.data['content']
                }
                else {
                    ElMessage({
                        message: "查询失败: " + resp.data.msg,
                        type: 'warning',
                    })
                }
                ElMessage({
                    showClose: true,
                    message: '查询到 ' + resp.data['content'].length + ' 条数据',
                    type: 'success',
                })
                authorData.value=[]
                for(var i=0;i<resp.data['content'].length;i++){
                  authorData.value.push(resp.data['content'][i]['authors'].split(','))
                  console.log(authorData.value[i])
                }
                
        });    
}
</script>

<style scoped>

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: rgb(247, 240, 253);
  height: 700px;
}
.layout-container-demo .el-button {
  color: rgb(63, 27, 143);
  background-color: rgb(244, 238, 255);
  border-color: rgb(63, 27, 143);
}
.layout-container-demo .el-button:hover,
.layout-container-demo .el-button:focus {
  color: rgb(253, 253, 253);
  background-color: rgb(70, 30, 156);
  border-color: rgb(63, 27, 143);
}
.layout-container-demo .el-form{
  border-color: rgb(63, 27, 143);
}
.c1{
  text-align: justify;
  margin-top: 20px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
  color:rgb(3, 3, 3);
  font-size:15px;
   box-shadow:
       inset 0 -3em 3em rgb(220, 207, 250),
             0 0  0 2px rgb(255,255,255),
             0.3em 0.3em 1em rgb(63, 27, 143);
}
.b{
  color:rgb(233, 43, 148);
  margin-top: 8px;
  
}
</style>