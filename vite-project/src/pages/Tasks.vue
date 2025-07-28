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
          <NoteList :notes="filteredNotes" @delete="deleteNote" @update="updateNote" @info="infoNote" />
        </v-list>
      </v-card-text>
    </v-card>
    <CreateNote
      v-model="showDialog"
      :editNote="note"
      @add-note="getTasksList"
      @update-note="getTasksList"
      @clear-edit="clearNote"
    />
     <Info 
      v-if="false"
      :editNote="note"
      @info-note="getTasksList"
    />
  </v-container>
</template>
  
  <script setup>
import { ref, reactive, computed, onMounted } from "vue";
import CreateNote from "@/components/CreateNote.vue";
import NoteList from "@/components/NoteList.vue";
import { getTasks, deleteTask } from "../services/taskApi";

import Info from '@/pages/Info.vue';
import { useRouter } from "vue-router";
const router = useRouter();

const search = ref("");
const showDialog = ref(false);
const notes = ref([]);
const note = ref({});

const getTasksList = async () => {
  notes.value = await getTasks();
  console.log(notes.value);
};

const filteredNotes = computed(() => {
  const query = search.value.toLowerCase();
  return notes.value.filter(
    (note) =>
      note.lastname?.toLowerCase().includes(query) ||
      note.name?.toLowerCase().includes(query) ||
      note.surname?.toLowerCase().includes(query) ||
      note.datefirst?.includes(query) ||
      note.datelast?.includes(query) ||
      note.title?.toLowerCase().includes(query) ||
      note.content?.toLowerCase().includes(query)
  );
});

const deleteNote = async (id) => {
  await deleteTask(id);
  // notes.value.splice(id, 1);
  getTasksList();
};

const updateNote = async (task) => {
  showDialog.value=true;
  note.value = task;
  console.log(note);
};
const clearNote = () => {
  note.value = {}; // явно очищаем объект
};
 
  const infoNote = async (task) => {
   router.push({
    path: '/info',
    query: { 
      note: JSON.stringify(task)
    }
  });
  console.log(note);
};


onMounted(getTasksList);
</script>