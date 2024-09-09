<template>
  <div class="container">
    <div class="card"> 
      <h3>To do list</h3>
      <div class="content">
        <input class="text-box" v-model="newTask" placeholder="Enter task" />
        <button @click="handleAddTask">Add Task</button>
      </div>
      <ul>
        <li v-for="(task, index) in tasks" :key="index">
         <div  v-if="task.statusEditButton" class="items">
            <input type="checkbox" v-model="task.complete" class="checkbox" />
            <input class="text-box" v-model="task.text" placeholder="Edit task" @blur="handleBlurTask" />
            <button @click="handleSaveTask(index)">Save</button>
          </div>
          <div v-else class="items">
            <input type="checkbox" v-model="task.complete" class="checkbox" />
            <p v-if="task.complete" class="text-complete" @click="handleEditTaskOn(index)">
              {{ task.text }}
            </p>
            <p v-else @click="handleEditTaskOn(index)">
              {{ task.text }}
            </p>
            <button class="remove" @click="handleRemoveTask(index)">Remove</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template> 

<script setup lang="ts">
import { ref } from 'vue'

const newTask = ref('')   
const tasks = ref<{ text: string, statusEditButton: boolean, complete: boolean }[]>([]) 

const handleAddTask = () => {
  if (newTask.value.trim() !== '') {
    if (newTask.value.length >= 5) {
      const taskExists = tasks.value.some(task => task.text === newTask.value)
      if (!taskExists) {
        tasks.value.push({ text: newTask.value, statusEditButton: false, complete: false }) 
        newTask.value = ''
      } else {
        alert("Title tasks exist !")
        newTask.value = ''
      }
    } else {
      alert("Min length content 5 character !")
    }
  }
}

const handleRemoveTask = (index: number) => {
  tasks.value.splice(index, 1)
}

const handleBlurTask = () => {
  tasks.value.forEach((item) => {
    item.statusEditButton = false
  })
}

const handleEditTaskOn = (index: number) => {
  tasks.value[index].statusEditButton = true 
}

const handleSaveTask = (index: number) => {
  tasks.value[index].statusEditButton = false 
}
</script>

<style scoped>
.container {
  position: relative;
  background-color: bisque;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.content {
  display: flex;
  height: 100%;
}

.text-complete{
  text-decoration: solid;
  color: red;
}

.card {
  z-index: 10;
  width: 300px;
  background-color: white;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  border-radius: 10px;
  padding: 20px;
}

.text-box {
  width: 100%;
}

button {
  margin-left: 5px;
  padding: 5px 10px;
}

.items {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.remove {
  padding: 3px;
  width: 60px;
  height: 100%;
  font-size: 13px;
  color: white;
  background-color: red;
  cursor: pointer;
  border: 0;
  border-radius: 3px;
}

.checkbox {
  width: 15px;
  height: 15px;
}

ul {
  padding: 0;
}

li {
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

h3 {
  margin-top: 20px;
  font-size: 20px;
  text-align: center;
}
</style>
