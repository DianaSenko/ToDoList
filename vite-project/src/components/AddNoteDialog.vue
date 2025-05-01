<template>
    <v-form ref="form">
    <v-dialog v-model="model" >
      <v-card>
        <v-card-title>Добавить заметку</v-card-title>
        <v-card-text>
          <v-text-field
           
            v-model="note.lastname"
            label="Фамилия"
            variant="outlined"
             :rules="fullNameRules"
            
          />
          <v-text-field
           
            v-model="note.name"
            label="Имя"
            variant="outlined"
            :rules="fullNameRules"
            required
          />
          <v-text-field
            
            v-model="note.surname"
            label="Отчество"
            variant="outlined"
            :rules="fullNameRules"
            required
          />
          
          <v-date-input
            v-model="note.daterange"
            label="Срок выполнения задачи"
            multiple="range"
            variant="outlined"
            :rules="noteInfoRules"
            required
          />  
         
          <v-text-field
            v-model="note.title"
            label="Заголовок"
            variant="outlined"
             :rules="noteInfoRules"
            required
          />
          <v-textarea
            v-model="note.content"
            label="Текст заметки"
            variant="outlined"
             :rules="noteInfoRules"
            rows="3"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" @click="model=false">Отмена</v-btn>
          <v-btn 
            color="primary" 
            @click="validateSave"
            
          >
            Добавить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
  </template>
  


  <!-- :disabled="!note.lastname.trim() || !note.name.trim() || !note.surname.trim() || !note.daterange || !note.title.trim() || !note.content.trim()" -->




  <script setup>
  import { VDateInput } from 'vuetify/labs/VDateInput'
  import { ref, reactive  } from 'vue'
  import { shallowRef } from 'vue'
  import { computed } from 'vue'
 

  const model = defineModel();
  
  
  const emit = defineEmits(['add-note'])

  const note = ref({
    lastname:'',
    name:'',
    surname:'',
    daterange:'',
    title: '',
    content: ''
  })
  const form = ref(null);
  const fullNameRules = [
  // Обязательное поле
  v => !!v || 'Поле обязательно для заполнения',
  
  // Минимальная длина
  v => (v && v.length >= 2) || 'Поле должно содержать минимум 2 символа',
  
  // Максимальная длина
  v => (v && v.length <= 50) || 'Поле слишком длинное',
  
  // Проверка на допустимые символы (только буквы, дефисы и пробелы)
  v => /^[A-Za-zА-Яа-яЁё\s-]+$/.test(v) || 'Поле содержит недопустимые символы',
  
  // Проверка на корректное написание (первая буква заглавная)
  v => (v && v[0] === v[0]?.toUpperCase()) || 'Поле должно начинаться с заглавной буквы'
];
const noteInfoRules = [
  // Обязательное поле
  v => !!v || 'Срок выполнения задачи обязательно для заполнения',
  
];


const validateSave = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    console.log('Форма валидна!');
    
    emit('add-note', note.value )
    console.log(note.value);
    
    note.value = { lastname: '', name: '', surname: '', daterange: '', title: '', content: '' } 
    model.value = false;
    
  }
};

  </script>