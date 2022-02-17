<template>
  <h1>Todo Page</h1>
  <div v-if="loading">Loading...</div>
  <form 
    v-else
    @submit.prevent="onSave"
  >
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label class="m-2">Todo Subject</label>
          <input v-model="todo.subject" type="text" class="form-control">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label class="m-2">Status</label>
          <div>
          <button 
            class="btn" 
            type="button" 
            :class="todo.completed ? 'btn-success' : 'btn-danger'" 
            @click="toggleTodoStatus"
          >
            {{todo.completed ? 'Completed' : 'Incomplete'}}
          </button>
          </div>
        </div>
      </div>
    </div>
    <button 
      type="submit" 
      class="btn btn-primary me-2 mt-2"
      :disabled="!todoUpdated"
    >
    save
    </button>
    <button 
      class="btn btn-outline-dark mt-2"
      @click="moveToTodoListPage"
    >
    Cancel
    </button>
  </form>
  <Toast 
    v-if="showToast" 
    :message="toastMessage"
    :type="toastType"
  />
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import axios from 'axios';
import {ref, computed} from 'vue';
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import {useToast} from '@/composables/Toast';

export default {
    components: {
      Toast
    },
    setup () {
      const route = useRoute();
      const router = useRouter();
      const todo = ref (null);
      const originTodo = ref (null);
      const loading = ref (true);
      const todoId = route.params.id;
      const {
        showToast,
        toastMessage,
        toastType,
        triggerToast,
      } = useToast();

      // onUnmounted (() => {
      //   clearTimeout(toastTimeout.value)
      // })

      // const showToast = ref (false);
      // const toastMessage = ref ('');
      // const toastType = ref('success');
      // const toastTimeout = ref (null);
      // const triggerToast = (message, type = 'success') => {
      //   toastMessage.value = message;
      //   toastType.value = type;
      //   showToast.value =true;
        
      //   toastTimeout.value = setTimeout ( () => {
      //     toastMessage.value = '';
      //     toastType.value = 'success';
      //     showToast.value = false;
      //   }, 3000)
      // }

      const getTodo = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/Todos/${todoId}`)
          todo.value = {...res.data};
          originTodo.value = {...res.data};
          loading.value = false;
        } catch (error) {
          console.log(error);
          triggerToast('SomeThing Went Wrong','danger')
        }
      }

      const onSave = async () => {
        try {
          const res = await axios.put(`http://localhost:3000/Todos/${todoId}`, {
          subject: todo.value.subject,
          completed: todo.value.completed
        })
        console.log(res);
        originTodo.value = {...res.data};
        triggerToast('Successfully Saved');
        } catch (error) {
          console.log(error);
          triggerToast('SomeThing Went Wrong','danger')
        }       
      }

      const toggleTodoStatus = () => {
        todo.value.completed = !todo.value.completed
      }

      const moveToTodoListPage = () => {
        router.push ({
          name: 'Todos'
        })
      }

      const todoUpdated = computed(() => {
        return !_.isEqual(todo.value, originTodo.value)
      })

      getTodo();

      return {
        todo,
        loading,
        showToast,
        toastMessage,
        toastType,
        toggleTodoStatus,
        moveToTodoListPage,
        onSave,
        todoUpdated,
      }
    }
}
</script>

<style>

</style>