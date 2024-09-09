<template>
  <div class="container">
    <!-- Popup  -->
    <div v-if="popup"  class="background-popup">
      <div class="popup">
        <nav>
          <h3>Create news task</h3>
          <p @click="handleOffPopup">x</p>
        </nav>
        <form @submit.prevent="handleSubmit">
          <label for="title">Title task</label>
          <input type="text" id="title" name="title" v-model="newTaskTitle" />
          <input type="text" id="idListTask" name="idListTask" v-model="idListTask" class="display-none"  />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
    <div class="content">
      <!-- List task -->
      <div v-for="(task, index) in tasks" :key="index">
        <div class="box-content">
          <!-- Title  -->
          <h3>{{task.title }}</h3>
          <!-- List task  -->
          <Sortable
            :list="task.elements"
            item-key="id"
            tag="div"
            :options="options"
            class="root-box"
          >
            <template #item="{element, index}">
              <div class="draggable cardItem" :key="element.id">
                {{ element.name }}
              </div>
            </template>
          </Sortable>
          <!-- Add new task  -->
           <button  @click="handleOnPopup(index)" class="add-new-card">
            <p>+</p>
            <p>Add to card</p>
           </button>
        </div>
      </div>
      <div v-if="popupAddListTask" class="box-content-add-new-list-task">
        <form @submit.prevent="handleSubmitListTask">
          <label for="title">Title list task</label>
          <input type="text" id="title" name="title" v-model="newListTaskTitle" />
          <input type="text" id="idListTask" name="idListTask" v-model="idListTask" class="display-none"  />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <button v-else class="box-content-add-new-list-task" @click="handleOnAddListTasks">
          +
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sortable } from 'sortablejs-vue3' 

const tasks = ref([
{
  id: 1,
  title:"check1",
  elements :[
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
  { id: 3, name: 'Task 3' },
]},
{
  id: 2,
  title:"check2",
  elements :[
  { id: 1, name: 'Task 1' },
  { id: 2, name: 'Task 2' },
  { id: 3, name: 'Task 3' },
]},
])
const idListTask = ref(0)
const popup = ref(false)
const popupAddListTask = ref(false)

const newTaskTitle = ref('') 
const newListTaskTitle = ref('') 


const options = {
   group: 'shared',
  animation: 150,
  ghostClass: 'ghost', 
}

const handleOnAddListTasks = ()=>{
  popupAddListTask.value = true;
}

const handleOnPopup = (index:number) => {
  idListTask.value = index
  popup.value = true
}

const handleOffPopup = () => {
  idListTask.value = 0
  popup.value = false
}

const handleSubmit = () => {
  if (newTaskTitle.value.trim() !== '') {
    tasks.value[idListTask.value].elements.push({ id: tasks.value[idListTask.value].elements.length + 1, name: newTaskTitle.value })
    newTaskTitle.value = '' 
    handleOffPopup()  
  } else {
    alert('Title cannot be empty!')
  }
}

const handleSubmitListTask = () =>{
  if (newListTaskTitle.value.trim() !== '') {
    tasks.value.push({ id: tasks.value.length + 1, title: newListTaskTitle.value,elements:[] })
    newListTaskTitle.value = '' 
    popupAddListTask.value = false
  } else {
    alert('Title cannot be empty!')
  }
}

</script>


<style>
.container{
  background-color: #3279ba;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  position: relative;
}

.content{
  padding: 10px;
  display: flex;
  gap:10px
}

.box-content{
  padding: 15px 10px;
  background-color: #f1f3f4;
  border-radius: 10px;
  width: 272px;
  height: 800px;
}

.box-content:hover{
 border:blue;
}

.box-content-add-new-list-task{
  padding: 15px 10px;
  background-color: #f1f3f4;
  border-radius: 10px;
  width: 272px;
  height: 70px;
  cursor: pointer;
  font-size: 30px;
}

.box-content-add-new-list-task:hover{
  background-color: white;
}

.root-box{
  height: 700px;
  overflow-y: auto;

}

.cardItem{
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  height: 80px;
  margin-top: 0.5rem;
  padding: 10px;
}

.add-new-card{
  display: flex;
  gap: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
  height: 40px;
  align-items: center;
  margin: 10px 0;
  border: none;
}

.background-popup{
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100vh;
  background-color:rgba(0, 0, 0, 0.8) ;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup{
  position: absolute;
  z-index: 1;
  width: 40%;
  height: 600px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.popup>nav{
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 600;
}

.display-none{
  display: none;
}

</style>