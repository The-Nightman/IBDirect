<script lang="ts" setup>
import { ref } from 'vue';
const test = ref(false)

function handleClick() {
    test.value = !test.value
}


console.log(test)
</script>

<template>
    <button @click="handleClick" type="button" :class="{'bg-red-500' : test}">button</button>
    <p>{{ test ? "test" : "testaaa"  }} </p>
    
</template>
