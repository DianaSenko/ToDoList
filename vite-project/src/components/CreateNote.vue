<template>
  <v-form ref="form">
    <v-dialog v-model="model" @click:outside="closeDialog" @keydown.esc="closeDialog">
      <v-card>
          <v-card-title>
    {{ isEditMode ? "Редактирование заметки" : "Добавить заметку" }}{{ editNote }}
  </v-card-title>
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
            <fieldset v-if = "false" class="group" >
            <legend>Статус</legend>
            <v-text-field
              class="my-2"
              v-model="note.status"
              variant="outlined"
              :readonly="false"
            />
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
          <v-btn color="grey" @click="closeDialog">Отмена</v-btn>
          <v-btn color="primary" @click="addNoteJson" v-if="!isEditMode"
            >Добавить</v-btn
          >
          <v-btn color="primary" @click="updateNoteJson" v-if="isEditMode"
            >Сохранить</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script setup>
import { VDateInput } from "vuetify/labs/VDateInput";
import { ref, watch, computed} from "vue";
import { lodash } from "lodash";
import { addTask, updateTask } from "../services/taskApi";

const form = ref(null);
const note = ref({
  id: lodash,
  status: "Новая",
  lastname: "",
  name: "",
  surname: "",
  datefirst: "",
  datelast: "",
  title: "",
  content: "",
});

const model = defineModel();
const props = defineProps({
  editNote: Object,
  default:()=>({})
});
const emit = defineEmits(["add-note", "update-note","clear-edit"]);

// Заполняем форму данными заметки при открытии диалога
watch(
  () => props.editNote,
  (newVal) => {
    if (newVal) {
      note.value = { status: "Новая", ...newVal }; // очень важно, по умолчанию мы заполняем поле статус значение новая здесь!!!!!!
      console.log(newVal, "успех");
      
    } else {
         
      console.log(newVal, "провал");
      resetForm();
    }
  },
  { immediate: true }
);

const closeDialog = () => {
  emit('clear-edit');
  model.value = false;
  resetForm();
};

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

const isEditMode = computed(() => {
  return props.editNote && Object.keys(props.editNote).length > 0;
});

const addNoteJson = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    const add = await addTask(note.value);
    console.log(`Добавленная запись ${add}`);
    emit("add-note", note.value);
    resetForm();
    model.value = false;
  }
};

const updateNoteJson = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    const update = await updateTask(note.value.id, note.value);
    console.log(`Измененная запись ${update}`);
    emit("update-note", note.value);
    resetForm();
    emit('clear-edit');
    model.value = false;
  }
};

const resetForm = () => {
  note.value = {
    id: lodash, 
    status: "Новая",
    lastname: "",
    name: "",
    surname: "",
    datefirst: "",
    datelast: "",
    title: "",
    content: "",
  };
};
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