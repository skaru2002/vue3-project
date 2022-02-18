<template>
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
            <div v-if="subjectError" style="color: red"> {{subjectError}}</div>
        </div>
            <div v-if="editing" class="col-6">
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
        <div class="col-12">
            <div class="form-group">
                <label class="m-2">Body</label>
                <textarea v-model="todo.body" class="form-control" cols="30" rows="10"></textarea>
            </div>
        </div>
        <button 
        type="submit" 
        class="btn btn-primary me-2 mt-2"
        :disabled="!todoUpdated"
        >
        {{editing ? "Update" : "Create"}}
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
    props: {
        editing: {
            type: Boolean,
            default: false
        }
    },
    setup (props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref ({
            subject: '',
            completed: false,
            body: '', 
        });
        const subjectError = ref ('');
        const originTodo = ref (null);
        const loading = ref (false);
        const todoId = route.params.id;
        const {
        showToast,
        toastMessage,
        toastType,
        triggerToast,
        } = useToast();

        const getTodo = async () => {
            loading.value= true
        try {
            const res = await axios.get(`http://localhost:3000/Todos/${todoId}`)
            todo.value = {...res.data};
            originTodo.value = {...res.data};
            loading.value = false;
        } catch (error) {
            loading.value = false;
            console.log(error);
            triggerToast('SomeThing Went Wrong','danger')
            }
        }

        const onSave = async () => {
            subjectError.value ='';
            if(!todo.value.subject) {
                subjectError.value = 'Subject is required';
                return;
            }

            let res;
            const data = {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                    body: todo.value.body
                }
            let message = 'Successfully '  + (props.editing ? 'Saved': 'Created')

            try {
                if (props.editing) {
                    res = await axios.put(`http://localhost:3000/Todos/${todoId}`, data)
                    originTodo.value = {...res.data};
                } else {
                    res = await axios.post(`http://localhost:3000/Todos`, data)
                    todo.value.subject = '';
                    todo.value.body = '';
                }
                console.log(res);
                triggerToast(message);
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

        if(props.editing){
            getTodo();
        }

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
            subjectError,
        }
    }
}
</script>

<style>

</style>