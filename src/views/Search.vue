<template>
  <el-container class="layout-container-demo" >
    <div class="left">
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
        <el-scrollbar>
           <div v-for="(data,idx) in tableData" :key=idx class="c1"
            :style="{
              boxShadow: `var(${getCssVarName('light')})`,
            }">
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
        </el-scrollbar>
    </div>

    <div class="right"> 
      <router-view></router-view>
    </div>
    </el-container>
  
</template>



<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import * as echarts from 'echarts'
import {onMounted} from "vue";
const getCssVarName = (type: string) => {
  return `--el-box-shadow${type ? '-' : ''}${type}`
}
const options = [
  {value: 'cs.HC', label: 'cs.HC'},
  {value: 'cs.GR', label: 'cs.GR'},
  {value: 'cs.ET', label: 'cs.ET'},
  {value: 'cs.DS', label: 'cs.DS'},
  {value: 'cs.IT', label: 'cs.IT'},
  {value: 'cs.PF', label: 'cs.PF'},
  {value: 'cs.CL', label: 'cs.CL'},
  {value: 'cs.AR', label: 'cs.AR'},
  {value: 'cs.CR', label: 'cs.CR'},
  {value: 'cs.CY', label: 'cs.CY'},
  {value: 'cs.PL', label: 'cs.PL'},
  {value: 'cs.MM', label: 'cs.MM'},
  {value: 'cs.MA', label: 'cs.MA'},
  {value: 'cs.SY', label: 'cs.SY'},
  {value: 'cs.DB', label: 'cs.DB'},
  {value: 'cs.CG', label: 'cs.CG'},
  {value: 'cs.CC', label: 'cs.CC'},
  {value: 'cs.IR', label: 'cs.IR'},
  {value: 'cs.SC', label: 'cs.SC'},
  {value: 'cs.SD', label: 'cs.SD'},
  {value: 'cs.SE', label: 'cs.SE'},
  {value: 'cs.CE', label: 'cs.CE'},
  {value: 'cs.RO', label: 'cs.RO'},
  {value: 'cs.MS', label: 'cs.MS'},
  {value: 'cs.GT', label: 'cs.GT'},
  {value: 'cs.NE', label: 'cs.NE'},
  {value: 'cs.OS', label: 'cs.OS'},
  {value: 'cs.FL', label: 'cs.FL'},
  {value: 'cs.LO', label: 'cs.LO'},
  {value: 'cs.SI', label: 'cs.SI'},
  {value: 'cs.DM', label: 'cs.DM'},
  {value: 'cs.NA', label: 'cs.NA'},
  {value: 'cs.NI', label: 'cs.NI'},
  {value: 'cs.GL', label: 'cs.GL'},
  {value: 'cs.OH', label: 'cs.OH'},
  {value: 'cs.AI', label: 'cs.AI'},
  {value: 'cs.DC', label: 'cs.DC'},
  {value: 'cs.CV', label: 'cs.CV'},
  {value: 'cs.DL', label: 'cs.DL'},
  {value: 'cs.LG', label: 'cs.LG'}
]
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
    if(formInline.selected_areas.length==0){
      areastr=''
    }
    else{
      for(var i=0;i<formInline.selected_areas.length-1;i++){
        areastr = areastr.concat( formInline.selected_areas[i] );
        areastr = areastr.concat( ',' );
      }
      areastr = areastr.concat( formInline.selected_areas[formInline.selected_areas.length-1] );
    }
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
.left {
  color: var(--el-text-color-primary);
  height: 100vh;
  width: 50%;
}
.right {
  color: var(--el-text-color-primary);
  background: rgb(255, 255, 255);
  height: 100vh;
  width: 50%;
  margin-left: 10px;
}
.layout-container-demo .el-button {
  color: rgb(0, 0, 0);
  background-color: rgb(255, 255, 255);
  border-color: rgb(0, 0, 0);
}
.layout-container-demo .el-button:hover,
.layout-container-demo .el-button:focus {
  color: rgb(0, 0, 0);
  background-color: rgb(223, 223, 223);
  border-color: rgb(0, 0, 0);
}
.layout-container-demo .el-form{
  border-color: rgb(7, 7, 7);
}
.c1{
  text-align: justify;
  margin-top: 20px;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
  color:rgb(3, 3, 3);
  font-size:15px;
}
.b{
  color:rgb(22, 14, 94);
  margin-top: 8px;  
}
</style>