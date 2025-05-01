<template>
    <v-container>
      <v-card max-width="1000" class="mx-auto">
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

            > 
           
            <v-list-item-title>{{ note.content }} </v-list-item-title>
            
            <v-list-item-subtitle>
            <div>Создатель заметки: {{ fullName(note) }}</div>
            </v-list-item-subtitle>

            <!-- <v-list-item-subtitle>
            <div>Время  выполения: {{ note.daterange }}</div>
            </v-list-item-subtitle> -->
    
            <v-list-item-subtitle>
            <div>Время  выполения: {{  dateRange(note) }}</div>
            </v-list-item-subtitle>
          
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
      
        <v-btn @click="saveNotes"
            color="primary" 
          >Сохранить в файл</v-btn>
          
      
          <v-btn @click="loadNotes"
            color="primary" 
          >Загрузить из файла</v-btn>

  {{ showDialog }}
      <AddNoteDialog
        v-model="showDialog"
        @add-note="createNote"
      />
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  const search = ref('') //
  const showDialog = ref(false)
  
  import AddNoteDialog from '@/components/AddNoteDialog.vue';
  import notesApi from '@/services/apiNote.ts';

 

  const notes = ref([

]) 


  const fullName = (note) => {
  return [note.lastname, note.name, note.surname].filter(part => part?.trim()).join(' ');
  };

 
  const dateRange = (note) => {

    const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      timeZone: 'UTC' 
    };
    return date.toLocaleDateString('ru-RU', options);
  };
  const firstDate = formatDate(note.daterange[0]);

const lastDate = formatDate(note.daterange[note.daterange.length - 1]);

return `${firstDate} - ${lastDate}`;
    
 };

const filteredNotes = computed(() => {
    const query = search.value.toLowerCase()
    return notes.value.filter(note => 
      note.lastname.toLowerCase().includes(query) || 
      note.name.toLowerCase().includes(query)|| 
      note.surname.toLowerCase().includes(query)|| 
      dateRange(note).includes(query)|| 
      note.title.toLowerCase().includes(query)|| 
      note.content.toLowerCase().includes(query)
    )
  })





  const createNote = (newNote) =>
  {
    notesApi.addNote(newNote.lastname, newNote.name, newNote.surname, newNote.daterange, newNote.title, newNote.content);
    notes.value = notesApi.getNotes();
   notes.value.unshift(newNote)

  }
  
  const deleteNote = (index) => {
    notes.value.splice(index, 1)
  }


  const saveNotes = async () => {
  const success = await notesApi.saveToFile();
  if (success) {
    alert('Заметки успешно сохранены!');
  } else {
    alert('Ошибка при сохранении заметок');
  }
};

const loadNotes = async () => {
  const loadedNotes = await notesApi.loadFromFile();
  if (loadedNotes.length > 0) {
    notes.value = loadedNotes;
    alert(`Загружено ${loadedNotes.length} заметок`);
  }
};
  </script>


  <style>
 
  </style>