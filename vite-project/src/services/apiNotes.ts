//Интерфейс Note на TypeScript определяет структуру объекта, который представляет собой заметку
interface Note {
  id: number;
  lastName: string;
  name: string;
  surName: string;
  dateRange: string;
  title: string;
  content: string;

}
//Объявляет переменную notes как массив объектов типа Note и инициализирует его пустым массивом []
//Note[] — это типизированный массив на основе интерфейса Note, который вы определили ранее

let notes: Note[] = [];

//Объявляет переменную fileHandle, которая может хранить ссылку на файл в файловой системе 
//(через File System Access API) или быть null, если файл не выбран

let fileHandle: FileSystemFileHandle | null = null;

//Этот код экспортирует объект с методом getNotes(), который возвращает массив заметок (notes)

export default {
  // Получить все заметки
  getNotes(): Note[] {
    return notes;
  },

  //Добавить новую заметку
  addNote(id: number, lastName: string, name: string, surName: string, dateRange: string, title: string, content: string): Note {
    const newNote: Note = {
      id, lastName, name, surName, dateRange, title, content

    };

    return newNote;
  },

  // Сохранить все заметки в файл
  async saveToFile() {
    try {
      // 1. Проверка существования fileHandle
      if (!fileHandle) {
        // Первое сохранение - создаем новый файл
        fileHandle = await window.showSaveFilePicker({
          suggestedName: 'notes.json', // Предлагаемое имя файла
          types: [{
            description: 'JSON Files', // Описание типа файла
            accept: { 'application/json': ['.json'] }, // Разрешение только .json
          }],
        });
      }

      // 2. Запись данных в файл
      const writable = await fileHandle.createWritable(); // Создаем поток для записи
      await writable.write(JSON.stringify(notes, null, 2)); // Форматированный JSON
      await writable.close(); // Закрываем поток

      return true; // Успешное сохранение
    } catch (err) {
      console.error('Ошибка сохранения:', err);
      return false; // Ошибка сохранения
    }
  },

  // Загрузить заметки из файла
  async loadFromFile() {
    try {
      // 1. Открываем файловый диалог
      [fileHandle] = await window.showOpenFilePicker({
        types: [{
          description: 'JSON Files',
          accept: { 'application/json': ['.json'] },
        }],
        multiple: false // Запрещаем выбор нескольких файлов
      });

      // 2. Читаем содержимое файла
      const file = await fileHandle.getFile();
      const content = await file.text();

      // 3. Парсим JSON и сохраняем в переменную notes
      notes = JSON.parse(content);

      return notes; // Возвращаем загруженные заметки
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      alert('Ошибка при загрузке заметок');
      return []; // Возвращаем пустой массив при ошибке
    }
  }
};