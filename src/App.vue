<template>
  <div class="container">
    <h2>To-Do List</h2>
    <form
      @submit.prevent="onSubmit" 
      class="d-flex"
    >
      <div class="flex-glow-1 mr-2">
        <input 
          class="form-control"
          type="text" 
          v-model="todo"
          placeholder="Type New Todo"
        >
      </div>
      <div>
        <button 
          class="btn btn-primary" 
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
    {{ todos }}
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup () {
    const todo = ref('');
    const todos = ref([]);

    const onSubmit = () => {
      todos.value.push({
        id: Date.now(),
        value: todo.value,
      })
    }
    return {
      todo,
      todos,
      onSubmit,
    };
  }
}
</script>

<style>
.hi {
  color: red;
}
</style>
