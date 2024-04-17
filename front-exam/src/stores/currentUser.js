import { defineStore } from 'pinia'
import router from '@/router'

export const useCurrentUserStore = defineStore('currentUser', {
  state: () => ({
    user: {},
    token: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user
  },

  actions: {
    inscription(username, email, password) {
      // Remplacez 'URL_DE_VOTRE_API' par l'URL de votre endpoint d'inscription
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      })
        .then(() => {
          router.push('login')
        })
        .catch((error) => {
          console.log("Erreur lors de l'inscription: " + error.message)
        })
    },
    setCurrentUser(data) {
      this.user = data.user
      this.token = data.token
    },
    async login(email, password) {
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || 'Login failed')
        }

        if (data.token && data.user) {
          this.user = data.user
          this.token = data.token
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(this.user))
          // Add any additional actions such as redirection here
        } else {
          throw new Error('Login failed')
        }
      } catch (error) {
        throw new Error('Login failed: ' + error.message)
      }
    },

    updateInfo(data) {
      fetch(`http://localhost:3000/users/${this.user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`
        },
        body: JSON.stringify(data) // Directement passer `data` sans l'enrober dans un autre objet
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to update user info')
          }
          return response.json()
        })
        .then((updatedData) => {
          this.user = updatedData.user // Mettre à jour l'utilisateur dans le store
        })
        .catch((error) => {
          console.error('Error updating user info:', error)
        })
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      // router.push('/login');
    }
  },

  persist: true
})
