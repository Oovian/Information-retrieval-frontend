<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';
import { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'; // Prop type definitions can also be imported
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import { watch } from 'vue'
import axios from 'axios'


export default defineComponent({
  name: 'Home',
  components: { VuePdf },
  setup() {
    const pdfSrc = ref<VuePdfPropsType['src']>('https://cors-anywhere.herokuapp.com/http://arxiv.org/pdf/1311.2376v3')
    const numOfPages = ref(0)
    onMounted(() => {
      const loadingTask = createLoadingTask(pdfSrc.value)
      loadingTask.promise.then((pdf: PDFDocumentProxy) => {
        numOfPages.value = pdf.numPages
      })
    })
    

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