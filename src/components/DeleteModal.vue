<template>
    <Modal>
        <template #title>
            Delete Todo
        </template>
        <template #body>            
            Are you sure you want to delete the todo?
        </template>
        <template #footer>
            <button 
                type="button" 
                class="btn btn-secondary" 
                @click="onClose"
            >
                Close
            </button>
            <button 
                type="button" 
                class="btn btn-danger"
                @click="onDelete"
            >
            Delete
            </button>
        </template>
    </Modal>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
    components: {
        Modal
    },
    setup(props, {emit}) {
        const onClose = () => {
            emit('closeModal')
        }

        const onDelete = () => {
            emit('deleteTodo')
        }
        return {
            onClose,
            onDelete,
        }
    }

}
</script>

<style>

</style>