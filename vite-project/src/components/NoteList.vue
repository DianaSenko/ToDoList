<template>
  <v-container>
    <v-card max-width="600" class="mx-auto">
      <v-card-title class="d-flex align-center">
        <span>Мои заметки</span>
        <v-spacer />
        <v-btn 
          color="primary" 
          icon="mdi-plus"
          @click="showDialog = true" 
        />
      </v-card-title>

      <v-card-text>
        
        <v-text-field
          v-model="search"
          label="Поиск заметок"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        />

        <v-list>
          <v-list-item
            v-for="(note, index) in filteredNotes"
            :key="note.id"
            :title="note.title"
            :subtitle="note.content"
          >
            <template v-slot:append>
              <v-btn
                icon="mdi-delete"
                @click="deleteNote(index)"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
{{ showDialog }}
    <AddNoteDialog
      v-model="showDialog"
      @add-note="addNote"
    />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'


import AddNoteDialog from './AddNoteDialog.vue'


const props = defineProps({
  notes: {
    type: Array,
    required: true
  }
  });

const search = ref('') //
const showDialog = ref(false)

const filteredNotes = computed(() => {
  
  
  const query = search.value.toLowerCase()
  return props.notes.filter(note => 
    note.title.toLowerCase().includes(query) || 
    note.content.toLowerCase().includes(query)
  )
})

const addNote = function(newNote) 
{
 return props.notes.unshift(newNote)
}

const deleteNote = (index) => {
  props.notes.splice(index, 1)
}
</script>