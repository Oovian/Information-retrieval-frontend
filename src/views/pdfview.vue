<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';
import { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'; // Prop type definitions can also be imported
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import { watch } from 'vue'
import { useRouter } from "vue-router";
export default defineComponent({
  name: 'Home',
  components: { VuePdf },
  setup() {
    let numOfPages = ref(0)
    const router = useRouter();
    const pdfurl = ref(router.currentRoute.value.query.pdfurl);
    let srcstr = 'https://cors-anywhere.herokuapp.com/'.concat(pdfurl.value as string)
    let pdfSrc = ref<VuePdfPropsType['src']>(srcstr)
    
      let loadingTask = createLoadingTask(pdfSrc.value)
      console.log(loadingTask)
      loadingTask.promise.then((pdf: PDFDocumentProxy) => {
        numOfPages.value = pdf.numPages
      })
    watch(
      // 监听非响应式数据
      () => router.currentRoute.value,
      (val) => {
        // 修改name
        pdfurl.value = val.query.pdfurl;
        srcstr='https://cors-anywhere.herokuapp.com/'.concat(pdfurl.value as string)
        console.log(srcstr)
        pdfSrc = ref<VuePdfPropsType['src']>(srcstr)
        loadingTask.destroy()
        loadingTask = createLoadingTask(pdfSrc.value)
        console.log(loadingTask)
        loadingTask.promise.then((pdf: PDFDocumentProxy) => {
            numOfPages.value = pdf.numPages
        })
        });
    return {
      pdfSrc,
      numOfPages
    }
  }
  
});
</script>

<template>
  <VuePdf v-for="page in numOfPages" :key="page" :src="pdfSrc" :page="page" />
</template>