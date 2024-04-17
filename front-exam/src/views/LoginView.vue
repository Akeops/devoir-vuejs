<script setup>
import { ref } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser.js'
import router from '@/router'

// Récupération du store utilisateur
const userStore = useCurrentUserStore()

// Déclaration des variables réactives pour email et password
const email = ref('')
const password = ref('')

// Fonction pour soumettre le formulaire
const submitForm = async () => {
  try {
    await userStore.login(email.value, password.value)
    // Nettoyer le formulaire après la connexion réussie
    email.value = ''
    password.value = ''
    // Exemple de redirection
    router.push('/home')
    console.log('Connexion réussie')
  } catch (error) {
    alert('Erreur lors de la connexion : ' + error.message)
  }
}
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Connectez-vous maintenant !</h1>
        <p class="py-6">
          Connectez-vous pour accéder à toutes nos fonctionnalités exclusives et personnalisées.
        </p>
      </div>
      <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="submitForm">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="email"
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
              placeholder="mot de passe"
              class="input input-bordered"
              required
            />
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary">Se connecter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
