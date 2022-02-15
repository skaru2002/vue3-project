<template>
  <router-view/>
  <div class="container">
    <h2>To-Do List</h2>
    <input 
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    >
    <hr />
    <TodoSimpleForm 
      @add-todo="addTodo"
    />
    <div style="color: red"> {{error}}</div>
    <div v-if="!todos.length">
      There is nothing to display.
    </div>
    <TodoList 
      :todos="todos" 
      @toggle-todo="toggleTodo" 
      @delete-todo="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li 
          v-if="currentPage !== 1"
          class="page-item"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodo(currentPage -1)">Previous</a>
        </li>
        <li 
          v-for="page in numberOfPage"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodo(page)">{{page}}</a>
        </li>
        <li 
          v-if="numberOfPage !== currentPage"
          class="page-item"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodo(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue'
import TodoList from './components/TodoList.vue'
import axios from 'axios'

export default {
  components: {
    TodoSimpleForm,
    TodoList,
  },
  setup () {
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');

    const numberOfPage = computed(() => {
      return Math.ceil(numberOfTodos.value/limit);
    });

    const getTodo = async ( page = currentPage.value) => {
      currentPage.value = page
      error.value = '';
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
        )
        numberOfTodos.value = res.headers['x-total-count']
        todos.value = res.data
      }catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    }
    getTodo();

    const addTodo = async (todo) => {
      // 데이터베이스에 todo를 저장
      error.value = '';
      try {
        await axios.post('http://localhost:3000/todos/', {
          subject: todo.subject,
          completed: todo.completed
        })
        getTodo(1)
      } catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }      
    }

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id
      try {
        await axios.delete('http://localhost:3000/todos/' + id)
        getTodo(currentPage.value);
      } catch (err){
        console.log(err);
        error.value = 'Something went wrong';
      }

    };

    const toggleTodo = async (index) => {
      const id = todos.value[index].id
      try {
        await axios.patch('http://localhost:3000/todos/' + id, {
          completed: !todos.value[index].completed
        })
        todos.value[index].completed = !todos.value[index].completed;
      }catch (err) {
        console.log(err);
        error.value = 'Something went wrong';
      }
    };

    let timeout = null;
    watch(searchText, () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        getTodo(1)
      }, 2000)
    })

    const searchTodo = () => {
      clearTimeout(timeout)
      getTodo(1)
    }
    // const filteredTodos = computed(() => {
    //   if (searchText.value) {
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value);
    //     })
    //   }
    //   return todos.value;
    // })
    
    return {  
      todos,
      getTodo,
      addTodo,
      deleteTodo,
      toggleTodo,
      searchText,
      // filteredTodos,
      error,
      numberOfPage,
      currentPage,
      searchTodo,
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
