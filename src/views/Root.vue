<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="flex justify-center">
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
            class="flex items-center justify-center w-full h-16 rounded bg-zinc-300"
            tag="button"
          >
            <p>Patient Login</p>
          </RouterLink>
          <RouterLink
            to="/Account/Staff/Login"
            class="flex items-center justify-center w-full h-16 rounded bg-zinc-300"
            tag="button"
          >
            <p>Staff Login</p>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
  <p class="mt-3 mx-4 text-base text-center text-neutral-600">
    WARNING:<br>THIS PRODUCT IS NOT A GENUINE SERVICE AND IS NOT GUARANTEED
    GDPR/HIPAA COMPLIANT, DO NOT ENTER GENUINE PERSONAL INFORMATION.<br>YOU HAVE
    BEEN WARNED
  </p>
</template>
