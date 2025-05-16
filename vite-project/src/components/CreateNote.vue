<template>
  <v-form ref="form">
    <v-dialog v-model="model">
      <v-card>
        <v-card-title>Добавить заметку</v-card-title>

        <v-card-text class="d-flex flex-column my-2">
          <fieldset class="fio-group">
            <legend>ФИО</legend>
            <!-- <div class="border-md"> -->
            <v-text-field
              class="my-2"
              v-model="note.lastname"
              label="Фамилия"
              variant="outlined"
              :rules="fullNameRules"
            />
            <v-text-field
              class="my-2"
              v-model="note.name"
              label="Имя"
              variant="outlined"
              :rules="fullNameRules"
              required
            />
            <v-text-field
              class="my-2"
              v-model="note.surname"
              label="Отчество"
              variant="outlined"
              :rules="fullNameRules"
              required
            />
          </fieldset>
          <fieldset class="fio-group">
            <legend>Срок выполнения заметки</legend>
            <v-date-input
              class="my-2"
              v-model="note.daterange"
              label="Срок выполнения задачи"
              multiple="range"
              variant="outlined"
              :rules="noteInfoRules"
              required
            />
          </fieldset>
          <fieldset class="fio-group">
            <legend>Информация о заметке</legend>
            <v-text-field
              class="my-2"
              v-model="note.title"
              label="Заголовок"
              variant="outlined"
              :rules="noteInfoRules"
              required
            />
            <v-textarea
              class="my-2"
              v-model="note.content"
              label="Текст заметки"
              variant="outlined"
              :rules="noteInfoRules"
              rows="3"
            />
          </fieldset>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" @click="model = false">Отмена</v-btn>
          <v-btn color="primary" @click="addNoteJson"> Добавить </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>
  
  <script setup>
import { VDateInput } from "vuetify/labs/VDateInput";
import { ref, reactive } from "vue";
import { computed } from "vue";

import { lodash } from "lodash";

import { addTask } from "../services/taskApi";

// import { refreshTask } from "../pages/Tasks.vue";

const props = defineProps({
  parentFunction: {
    type: Function,
    required: true,
  },
});

const model = defineModel();

const emit = defineEmits(["add-note"]);

const note = ref({
  id: lodash,
  lastname: "",
  name: "",
  surname: "",
  daterange: "",
  title: "",
  content: "",
});
const form = ref(null);
const fullNameRules = [
  // Обязательное поле
  (v) => !!v || "Поле обязательно для заполнения",

  // Минимальная длина
  (v) => (v && v.length >= 2) || "Поле должно содержать минимум 2 символа",

  // Максимальная длина
  (v) => (v && v.length <= 50) || "Поле слишком длинное",

  // Проверка на допустимые символы (только буквы, дефисы и пробелы)
  (v) =>
    /^[A-Za-zА-Яа-яЁё\s-]+$/.test(v) || "Поле содержит недопустимые символы",

  // Проверка на корректное написание (первая буква заглавная)
  (v) =>
    (v && v[0] === v[0]?.toUpperCase()) ||
    "Поле должно начинаться с заглавной буквы",
];
const noteInfoRules = [
  // Обязательное поле
  (v) => !!v || "Срок выполнения задачи обязательно для заполнения",
];

// const validateSave = async () => {

// };

const addNoteJson = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    console.log("Форма валидна!");

    const add = await addTask(note.value);
    console.log(`Добавленная запись ${add}`);

    emit("add-note", note.value);

    note.value = {
      lastname: "",
      name: "",
      surname: "",
      daterange: "",
      title: "",
      content: "",
    };
    model.value = false;
  }
};
</script>
<style>
.fio-group {
  border: 2px solid #3B71CA;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}
.fio-group legend {
  color: #3B71CA;
  font-weight: bold;
  padding: 0 10px;
}
</style>
