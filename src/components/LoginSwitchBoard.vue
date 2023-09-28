<script lang="ts" setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <section class="w-72 mt-8 shadow-xl">
      <div
        class="flex justify-center h-20 rounded-t bg-gradient-to-br from-sky-700 to-blue-400"
      >
        <h2 class="text-4xl self-center text-white">Sign In</h2>
      </div>
      <div class="h-80 px-8 py-14 rounded-b bg-white">
        <div class="flex flex-col justify-between h-full">
          <RouterLink
            to="/Account/Patient/Login"
            class="flex items-center justify-center w-full h-16 rounded text-2xl bg-zinc-300"
            tag="button"
            aria-label="Staff Login"
          >
            Patient Login
          </RouterLink>
          <RouterLink
            to="/Account/Staff/Login"
            class="flex items-center justify-center w-full h-16 rounded text-2xl bg-zinc-300"
            tag="button"
            aria-label="Staff Login"
          >
            Staff Login
          </RouterLink>
        </div>
      </div>
    </section>
</template>
