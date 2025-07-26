<template>
    <v-form ref="form">
  <v-container>
        <v-card-title>{{
          "Информация по заметке"
        }}</v-card-title>
        <v-card-text class="d-flex flex-column my-2">
          <fieldset class="group">
            <legend>ФИО</legend>
            <v-text-field
              class="my-2"
              v-model="note.lastname"
              label="Фамилия"
              variant="outlined"
              :rules="fullNameRules"
              :readonly="false"
            />
            <v-text-field
              class="my-2"
              v-model="note.name"
              label="Имя"
              variant="outlined"
              :rules="fullNameRules"
              required
              :readonly="false"
            />
            <v-text-field
              class="my-2"
              v-model="note.surname"
              label="Отчество"
              variant="outlined"
              :rules="fullNameRules"
              required
              :readonly="false"
            />
          </fieldset>
            <fieldset v-if = "true" class="group" >
            <legend>Статус</legend>
            <v-select 
              class="my-2"
              v-model="note.status"
              :items="items"
              label="Статус"
              variant="outlined"
              required
              :readonly="false">
            </v-select>
          </fieldset>
          
          <fieldset class="group">
            <legend>Срок выполнения заметки</legend>
            <v-date-input
              class="my-2"
              v-model="note.datefirst"
              label="Дата начала"
              variant="outlined"
              :rules="noteInfoRules"
              required
              :readonly="false"
            />
            <v-date-input
              class="my-2"
              v-model="note.datelast"
              label="Дата конца"
              variant="outlined"
              :rules="noteInfoRules"
              required
              :readonly="false"
            />
          </fieldset>
          <fieldset class="group">
            <legend>Информация о заметке</legend>
            <v-text-field
              class="my-2"
              v-model="note.title"
              label="Заголовок"
              variant="outlined"
              :rules="noteInfoRules"
              required
              :readonly="false"
            />
            <v-textarea
              class="my-2"
              v-model="note.content"
              label="Текст заметки"
              variant="outlined"
              :rules="noteInfoRules"
              rows="3"
              :readonly="false"
            />
          </fieldset>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" @click="backToTasksPage">Отмена</v-btn>
          <v-btn color="primary" @click="updateNoteJson">Сохранить</v-btn>
        </v-card-actions>
      </v-container>
      </v-form>
</template>

<script setup>
import { VDateInput } from "vuetify/labs/VDateInput";
import { ref, watch, onMounted } from "vue";
import { lodash } from "lodash";
import { updateTask } from "../services/taskApi";

import { useRoute, useRouter} from 'vue-router';
const route = useRoute(); //отвечает за принятие данных
const router = useRouter(); // отвечает за переход по страницам

const form = ref(null);
const note = ref({
  id: lodash,
  lastname: "",
  name: "",
  surname: "",
  datefirst: "",
  datelast: "",
  title: "",
  content: "",
});
const items = ref([
  'В работе',
  'На утверждение',
  'Готово',
]);

const model = defineModel();
const props = defineProps({
  editNote: Object,
});
const emit = defineEmits(["info-note"]);

// Заполняем форму данными заметки при открытии диалога

const fullNameRules = [
  (v) => !!v || "Поле обязательно для заполнения",
  (v) => (v && v.length >= 2) || "Поле должно содержать минимум 2 символа",
  (v) => (v && v.length <= 50) || "Поле слишком длинное",
  (v) =>
    /^[A-Za-zА-Яа-яЁё\s-]+$/.test(v) || "Поле содержит недопустимые символы",
  (v) =>
    (v && v[0] === v[0]?.toUpperCase()) ||
    "Поле должно начинаться с заглавной буквы",
];

const noteInfoRules = [
  (v) => !!v || "Срок выполнения задачи обязательно для заполнения",
];

const updateNoteJson = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    const update = await updateTask(note.value.id, note.value);
    console.log(`Измененная запись ${update}`);
    emit("info-note", note.value);
    backToTasksPage();
    model.value = false;
  }
};

  const backToTasksPage = async () => {
  router.push('/');
};

onMounted(() => {
  if (route.query.note) {
    note.value = JSON.parse(route.query.note);
  }
});

</script>

<style>
.group {
  border: 2px solid #3b71ca;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}
.group legend {
  color: #3b71ca;
  font-weight: bold;
  padding: 0 10px;
}
</style>