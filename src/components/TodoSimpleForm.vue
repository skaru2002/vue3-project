<template>
    <form @submit.prevent="onSubmit">
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
export default {
    setup(props, context) {
        const todo = ref('');
        return {
            
        }
    }
}
</script>

<style></style>