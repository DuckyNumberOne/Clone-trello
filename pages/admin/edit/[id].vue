<template>
  <section class="container-post">
    <div style="padding: 10px; display: flex; margin-top: 120px; gap: 10px;">
      <div style="width: 65%;">
        <div v-if="formData.markdown.trim()">
          <CKEditors v-model="formData.markdown" :item="formData.markdown" @update-mark="handleUpdateDataForCKEditor" />
        </div>
        <div v-else>
          <p>Loading.....</p>
        </div>
      </div>
      <div style="width: 35%; border: 1px hsl(220, 6%, 81%) solid;">
        <div style="padding: 10px; border-bottom: 1px hsl(220, 6%, 81%) solid;">
          <p style="text-align: center; font-size: 18px;">Information</p>
        </div>
        <div style="padding: 10px;">
          <label>ID</label>
          <input v-model="formData.id" type="text" disabled class="input-field" />
          
          <label>Title</label>
          <input v-model="formData.title" type="text" class="input-field" />
          
          <label>Date</label>
          <input v-model="formData.date" type="date" class="input-field" />
          
          <label>Image</label>
          <input v-model="formData.image" type="text" class="input-field" />
          <img v-if="formData.image" :src="`/images/${formData.image}`" alt="Image preview" style="width: 100px; height: auto; margin-top: 10px;" />
          
          <label>Thumbnail</label>
          <input v-model="formData.thumbnail" type="text" class="input-field" />
          <img v-if="formData.thumbnail" :src="`/images/${formData.thumbnail}`" alt="Thumbnail preview" style="width: 100px; height: auto; margin-top: 10px;" />
          
          <label>Summary</label>
          <textarea v-model="formData.summary" class="input-field"></textarea>
          
          <label>Category</label>
          <input v-model="formData.category" type="text" class="input-field" />
          
          <label>Section</label>
          <select v-model="formData.section" class="input-field">
            <option value="Featured">Featured</option>
            <option value="Popular">Popular</option>
            <option value="Editor's Pick">Editor's Pick</option>
          </select>
          
          <!-- Submit Button -->
          <button @click="handleSubmit" class="submit-button">Submit</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted,watch } from 'vue'
import CKEditors from '~/lib/components/ckeditor/CKEditors.vue'
import { useRouter, useRoute } from 'vue-router'

interface FormData {
  id: string;
  title: string;
  date: string;
  image: string;
  summary: string;
  category: string;
  thumbnail: string;
  section: string;
  markdown: string;
}

const { params } = useRoute();
const router = useRouter();
const formData = ref<FormData>({
  id: '',
  title: '',
  date: '',
  image: '',
  summary: '',
  category: '',
  thumbnail: '',
  section: 'Featured',
  markdown: ''
});

const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

const fetchData = async () => {
  try {
    isLoading.value = true;
    const response = await fetch(`https://66de629ede4426916ee0fc32.mockapi.io/post/${params.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    formData.value = {
      id: data.id,
      title: data.title,
      date: data.date,
      image: data.image,
      summary: data.summary,
      category: data.category,
      thumbnail: data.thumbnail,
      section: data.section || 'Featured', 
      markdown: data.markdown
    };
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unknown error occurred';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchData);

const handleUpdateDataForCKEditor = (val: string) => {
  formData.value.markdown = val;
};

const handleSubmit = async () => {
  const response = await fetch(`https://66de629ede4426916ee0fc32.mockapi.io/post/${params.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData.value),
  });
  if (response.ok) {
    alert('Update post success!');
    router.push({ path: `/blog/${params.id}` });
  } else {
    alert('Update post failed!');
  }
};

</script>

<style scoped>
.input-field {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid hsl(220, 6%, 81%);
  border-radius: 4px;
}

.submit-button {
  background-color: #3490dc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #2779bd;
}
</style>
