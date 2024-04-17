<script setup>
import { ref } from 'vue'
import { useCurrentUserStore } from '@/stores/currentUser.js'

const userStore = useCurrentUserStore()

// Initialiser les variables réactives avec les données de l'utilisateur actuel du store
const username = ref(userStore.user?.username || '')
const email = ref(userStore.user?.email || '')
const bio = ref(userStore.user?.bio || '')

// Fonction pour gérer la mise à jour des informations de l'utilisateur
const updateUserInfo = async () => {
  try {
    await userStore.updateInfo({
      username: username.value,
      email: email.value,
      bio: bio.value
    })
    alert('Profil mis à jour avec succès !')
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error)
    alert('Erreur lors de la mise à jour du profil.')
  }
}
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <div class="flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Mettre à jour le profil</h1>
        <div class="flex flex-col w-full lg:flex-row">
          <div class="grid flex-grow h-32 card rounded-box place-items-center">
            <div class="card w-96 bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">Informations</h2>
                <form @submit.prevent="updateUserInfo">
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
                      <span class="label-text">Bio</span>
                    </label>
                    <textarea
                      v-model="bio"
                      class="textarea textarea-bordered"
                      placeholder="Bio"
                    ></textarea>
                  </div>
                  <div class="form-control mt-6">
                    <button class="btn btn-primary" type="submit">Mettre à jour</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
