<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo" />
    <div v-if="!todos.length">
      todo list가 비어있습니다.
    </div>
    <TodoList :todos="todos" @toggle-todo="toggleTodo" />
  </div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue'
import TodoList from './components/TodoList.vue'

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup () {
    const todos = ref([
      { id: 1, value: "g" },
      { id: 2, value: "h" },
      ]);

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const addTodo = (todo) => {
      console.log(todo);
      todos.value.push(todo);
    }
      
    return {  
      todos,
      addTodo,
      deleteTodo,
      toggleTodo,
    };
  }
}
</script>

<style>
.todo {
  color: gray;
  text-decoration: line-through;
}
</style>
