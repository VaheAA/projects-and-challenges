<template>
  <div class="container">
    <button @click="clearQuillContent">Clear</button>
    <div class="note-container">
      <div class="ql-editor-wrap">
        <QuillEditor theme="snow" v-model:content="quillContent" content-type="html" ref="quill"
          @text-change="saveQuillContent" />
      </div>
      <div class="preview-wrap">
        <h2>Preview</h2>
        <div class="preview" v-html="quillContent">
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ref, onMounted } from 'vue';

const quillContent = ref('');
const editorTimeout = ref(null);
const quill = ref();

function clearQuillContent () {
  quill.value.setHTML('');
}

function saveQuillContent () {
  clearTimeout(editorTimeout.value);
  editorTimeout.value = setTimeout(() => {
    localStorage.setItem('note', JSON.stringify(quill.value.getHTML()));
  }, 1000);
}

function populateQuillContent () {
  const sessionData = localStorage.getItem('note');
  if (sessionData) quill.value.setHTML(JSON.parse(sessionData));
}

onMounted(() => {
  populateQuillContent();
});

</script>

<style scoped>
.container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 100px 60px;
}

.note-container {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.ql-editor-wrap,
.preview-wrap {
  flex: 1;
}
</style>
