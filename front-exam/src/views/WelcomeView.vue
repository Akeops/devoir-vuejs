<script setup>
import { RouterLink } from 'vue-router'
import { useCurrentUserStore } from '@/stores/currentUser.js'
import { storeToRefs } from 'pinia'

const store = useCurrentUserStore()
const { token } = storeToRefs(store)
</script>

<template>
  <div
    class="hero min-h-screen"
    style="
      background-image: url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg);
    "
  >
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      <div class="max-w-md">
        <h1 class="mb-5 text-5xl font-bold">Hello there</h1>
        <p class="mb-5">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
          exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button v-if="token === null" class="btn btn-primary">
          <RouterLink to="/login">Get Started</RouterLink>
        </button>
      </div>
    </div>
  </div>
</template>
