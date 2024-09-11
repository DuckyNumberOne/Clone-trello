<template>
  <section class="container-post">
    <div style="padding: 10px; display: flex; margin-top: 120px; gap: 10px;">
      <div style="width: 65%;">
        <CKEditors v-model="formData.markdown" :item="formData.markdown" @update-mark="handleUpdateDataForCKEditor" />
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
          <!-- Hiển thị hình ảnh từ thư mục static -->
          <input v-model="formData.image"  type="text" @change="handleTextChange('image', $event)" class="input-field" />
          <img v-if="formData.image" :src="`/images/${formData.image}`" alt="Image preview" style="width: 100px; height: auto; margin-top: 10px;" />
          
          <label>Thumbnail</label>
          <input v-model="formData.thumbnail"  type="text" @change="handleTextChange('thumbnail', $event)" class="input-field" />
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
import { ref } from 'vue'
import { createBlog } from '~/api/posts.api';
import CKEditors from '~/lib/components/ckeditor/CKEditors.vue'

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
const router = useRouter()
const formData = ref<FormData>({
  id: "1",
  title: "Dream destinations to visit this year in Paris",
  date: "2021-09-08",
  image: "image1.png",
  summary: "Progressively incentivize cooperative systems through technically sound functionalities. Credibly productivate seamless data with flexible schemas.",
  category: "Adventure",
  thumbnail: "thumbnail1.png",
  section: "Featured",
  markdown: "**Markdown content for post 1**\n\n* Bullet point 1\n* Bullet point 2"
});

const handleUpdateDataForCKEditor =(val: any) => {
  formData.value.markdown = val
}

const handleTextChange = (field: 'image' | 'thumbnail', event: Event) => {
  const {value} = event.target as HTMLInputElement;
  if (field === 'image') {
    formData.value.image = value
  } else if (field === 'thumbnail') {
    formData.value.thumbnail = value
  }
  
};

const handleSubmit =async () => {
  const response = await createBlog(formData.value)
    if(response){
      alert('Create post success !');
      router.push({ path: `/blog` });
    }else{
      alert('Create post fail !');
    }
}
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
