<template>
    <div class="col-6">
        <div class="form-group">
            <label class="m-2">
                {{label}}
            </label>
            <input 
                :value="subject"
                @input="onInput"
                type="text"
                class="form-control"
            >
        </div>
        <div
            v-if="error"
            class="text-red"
        >
            {{error}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        error: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
    },
    setup(props, {emit}){
        const onInput = (e) => {
            emit('update:subject', e.target.value)
        }
        
        return{
            onInput,
        }
    }
}
</script>

<style scoped>
    .text-red {
        color: red
    }
</style>