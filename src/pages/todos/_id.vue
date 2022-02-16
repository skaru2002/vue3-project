<template>
  <div>Todo Page</div>
  <form>
    <div class="form-group">
      <label>Todo Subject</label>
      <input type="text" class="form-control">
    </div>
    <button class="btn btn-primary">save</button>
  </form>
</template>

<script>
import {useRoute} from 'vue-router';
import axios from 'axios';

export default {
    setup () {
      const route = useRoute();

      const getTodo = async() => {
        const res = await axios.get('http://localhost:3000/Todos/' + route.params.id)
        console.log(res);
      }
      getTodo();
      console.log(route.params.id);
    }
}
</script>

<style>

</style>