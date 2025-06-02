<template>
  <v-list>
    <v-list-item
      v-for="note in notes"
      :key="note.id"
      :title="note.title"
      lines="two"
    >
      <v-list-item-title>{{ note.content }}</v-list-item-title>
      
      <v-list-item-subtitle>
        <div>Создатель заметки: {{ fullName(note) }}</div>
      </v-list-item-subtitle>
      
      <v-list-item-subtitle>
        <div>Время выполнения: {{ dateRange(note) }}</div>
        <!-- dateRange(note) -->
      </v-list-item-subtitle>
      
      <template v-slot:append>
        <v-btn icon="mdi-delete" @click="$emit('delete', note.id)" />
       <v-btn icon="mdi-pencil" @click="openEditDialog(note)" /> 
              <!--  -->
              {{ showDialog }}
      </template>
     
    </v-list-item>
    <CreateNote  v-model="showDialog"
       :edit-note="currentNote"/> 
  </v-list>  
</template>

<script setup>
import CreateNote from "@/components/CreateNote.vue";
import { ref, reactive } from "vue";
const showDialog=ref(false);
const currentNote = ref(null);

const props = defineProps({
  notes: {
    type: Array,
    required: true
  }
});



const emit = defineEmits(['delete']);


const openEditDialog = (note) => {
  currentNote.value = note;
  showDialog.value = true;
};

const fullName = (note) => {
  return [note.lastname, note.name, note.surname]
    .filter((part) => part?.trim())
    .join(" ");
};

const dateRange = (note) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleDateString("ru-RU", options);
  };
  const firstDate = formatDate(note.datefirst);

  const lastDate = formatDate(note.datelast);

  return `${firstDate} - ${lastDate}`;
};
</script>