<script setup>
import { ref } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser' // Assurez-vous que le chemin vers votre store est correct
import router from '@/router/index.js'

// Récupérer le store utilisateur
const userStore = useCurrentUserStore()

// Déclarer les variables réactives pour le formulaire
const username = ref('')
const email = ref('')
const password = ref('')

// Fonction pour soumettre le formulaire
const submitForm = () => {
  try {
    userStore.inscription(username.value, email.value, password.value)
  } catch (error) {
    alert("Erreur lors de l'inscription : " + error.message)
  }
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Inscrivez-vous maintenant!</h1>
        <p class="py-6">Inscrivez-vous pour accéder à notre plateforme.</p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="submitForm">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Nom d'utilisateur</span>
            </label>
            <input
              v-model="username"
              type="text"
              placeholder="Nom d'utilisateur"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Mot de passe</span>
            </label>
            <input
              v-model="password"
              type="password"
              placeholder="Mot de passe"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" type="submit">S'inscrire</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
