<script lang="ts" setup>
import Dialog from "primevue/dialog";
import { ref } from "vue";
const username = ref<string>("");
const password = ref<string>("");
const validName = ref<boolean>(true);
let validPass = ref<boolean>(true);
  const visible = ref<boolean>(false);

function validateUsername() {
  validName.value = false
  // validName.value = /^223[A-Z]{2}[a-z]{0,5}\d{3}$/.test(username.value);
  // visible.value = !validName.value
  // console.log(visible.value)
}

function validatePass() {
  if (password.value == "a") {
    validPass.value = false
  } else {
    validPass.value = true
  }
}

function handleLogin() {
  const loginValues: { Name: string; Password: string } = {
    Name: username.value,
    Password: password.value,
  };
  console.log(loginValues);
}
</script>

<template>
  <section class="w-72 mt-8 shadow-xl">
    <div
      class="flex justify-center h-20 rounded-t bg-gradient-to-br from-sky-700 to-blue-400"
    >
      <h2 class="text-4xl self-center text-white">Sign In</h2>
    </div>
    <div class="px-8 py-7 rounded-b bg-white">
      <form class="flex flex-col h-full" @submit.prevent="handleLogin">
        <label class="text-sm" for="username"
          >Username
          <input
            type="text"
            id="username"
            name="Name"
            v-model="username"
            required
            @blur="validateUsername"
            placeholder="223JDoe123"
            
            class="h-9 w-full px-1 rounded-t border-b-2 border-zinc-400 bg-zinc-300"
            :class="{ 'bg-red-300 border-red-500 ': !validName }"
          />
          <Dialog v-model:visible="visible" modal >
            <p v-if="!validName" class="text-xs w-56 text-red-500">Invalid format: Use 223 followed by first initial up to 6 letters of surname and unique 3 num ID</p>
        </Dialog>
        </label>
        <br />
        <label class="text-sm mt-8" for="pass"
          >Password
          <input
            type="password"
            id="pass"
            name="Password"
            v-model="password"
            required
            @blur="validatePass"
            placeholder="Password"
            class="h-9 w-full px-1 rounded-t border-b-2 border-zinc-400 bg-zinc-300"
            :class="{ 'bg-red-500': !validPass }"
        /></label>
        <input
          type="submit"
          value="SIGN IN"
          class="text-base underline decoration-2 mt-8 text-blue-600"
        />
        <p class="text-[0.5rem] mt-5">
          By proceeding, you confirm that you are the intended member of staff
          or administrator. Please be advised that it is an offence to access
          information not intended for you without the explicit consent of the
          recipient.
        </p>
      </form>
    </div>
  </section>
</template>
