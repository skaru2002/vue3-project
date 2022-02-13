<template>
    <form @submit.prevent="addTodo">
      <div class="d-flex">
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
      </div>
      <div 
        v-show="hasError"
        style="color: red"
      >
        This Field Cannot Be Empty
      </div>
    </form>
</template>

<script>
import {ref} from 'vue';
export default {
  emits: ['add-todo'],
  setup(props, {emit}) {
    const todo = ref('');
    const hasError = ref(false);

    const addTodo = () => {
        if(todo.value === ''){
            hasError.value = true;
        }else{
            emit('add-todo', {
                id: Date.now(),
                value: todo.value,
                completed: false,
            })
            hasError.value = false;
            todo.value ='';
        }
        
        
    }
    return {
        todo,
        hasError,
        addTodo,
    }
  }
}
</script>

<style></style>