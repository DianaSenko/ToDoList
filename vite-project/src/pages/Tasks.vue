<template>
  <v-container>
    <v-card max-width="1000" class="mx-auto">
      <v-card-title class="d-flex align-center">
        <span>Мои заметки</span>
        <v-spacer />
        <v-btn color="primary" icon="mdi-plus" @click="showDialog = true" />
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="search"
          label="Поиск заметок"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
        />

        <v-list>
          <NoteList
          :notes="filteredNotes"
          @delete="deleteNote"
          v-model="showDialog"
          />
       
        </v-list>
      </v-card-text>
    </v-card>
    <!-- {{ showDialog }} -->
    <CreateNote v-model="showDialog" @add-note="getTasksList" />
  </v-container>
</template>
  
  <script setup>
import { ref, computed, onMounted } from "vue";
import CreateNote from "@/components/CreateNote.vue";
import NoteList from "@/components/NoteList.vue";
import { getTasks, deleteTask } from "../services/taskApi";

const search = ref(""); 
const showDialog = ref(false);
let notes = ref([]);

const getTasksList = async () => {
   notes.value = await getTasks();
   
  
};

const filteredNotes = computed(() => {
  const query = search.value.toLowerCase();
  return notes.value.filter(note => 
    note.lastname?.toLowerCase().includes(query) || 
    note.name?.toLowerCase().includes(query) ||
    note.surname?.toLowerCase().includes(query) ||
    // note.daterange?.includes(query) ||
    note.title?.toLowerCase().includes(query) ||
    note.content?.toLowerCase().includes(query)
    
  );
});

const deleteNote = async (id) => {
  await deleteTask(id);
  // notes.value.splice(id, 1);
  getTasksList();
};

onMounted(getTasksList);
</script>