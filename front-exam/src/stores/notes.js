import { defineStore } from 'pinia'
import { useCurrentUserStore } from '@/stores/currentUser.js'
import { storeToRefs } from 'pinia'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: []
  }),

  getters: {},

  actions: {
    getAllNotes() {
      const store = useCurrentUserStore()
      const { token, user } = storeToRefs(store)

      // ici on fait une requête GET pour récupérer toutes les notes de l'utilisateur
    },
    async createNote(title, content) {
      const currentUserStore = useCurrentUserStore()
      const response = await fetch('http://localhost:3000/users/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUserStore.token}`
        },
        body: JSON.stringify({
          userId: currentUserStore.user.id,
          title: title,
          content: content
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create note')
      }

      const data = await response.json()
      this.notes.push(data) // Assuming the API returns the created note
    },
    updateNote(note) {
      const store = useCurrentUserStore()
      const { token } = storeToRefs(store)

      // ici on fait une requête PATCH pour mettre à jour une note
    },
    deleteNote(note) {
      const store = useCurrentUserStore()
      const { token } = storeToRefs(store)

      // ici on fait une requête DELETE pour supprimer une note
    }
  },

  persist: true
})
