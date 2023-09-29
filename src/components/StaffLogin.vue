<script lang="ts" setup></script>

<template>
  <section class="w-72 mt-8 shadow-xl">
    <div
      class="flex justify-center h-20 rounded-t bg-gradient-to-br from-sky-700 to-blue-400"
    >
      <h2 class="text-4xl self-center text-white">Sign In</h2>
    </div>
    <div class="h-80 px-8 py-7 rounded-b bg-white">
      <form class="flex flex-col h-full">
        <label class="text-sm" for="username"
          >Username
          <input
            type="text"
            id="username"
            name="Name"
            value=""
            class="h-9 w-full px-1 rounded-t border-b-2 border-zinc-400 bg-zinc-300"
        /></label>
        <br />
        <label class="text-sm mt-8" for="pass"
          >Password
          <input
            type="password"
            id="pass"
            name="Password"
            value=""
            class="h-9 w-full px-1 rounded-t border-b-2 border-zinc-400 bg-zinc-300"
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
