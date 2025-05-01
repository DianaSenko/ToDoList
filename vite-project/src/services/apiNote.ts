interface Note {
    id: number;
    lastName: string;
    name: string;
    surName: string;
    dateRange: string;
    title: string;
    content: string;
    
  }
  
  let notes: Note[] = [];
  let fileHandle: FileSystemFileHandle | null = null;
  
   export default {
    // Получить все заметки
    getNotes(): Note[] {
      return notes;
    },
  
    //Добавить новую заметку
    addNote(id: number, lastName: string, name: string, surName: string, dateRange: string, title: string, content: string): Note {
      const newNote: Note = {
        id,lastName,name,surName,dateRange,title,content
        
      };
      
      return newNote;
    },
  
    // Сохранить все заметки в файл
    async saveToFile() {
      try {
        if (!fileHandle) {
          // Первое сохранение - создаем новый файл
          fileHandle = await window.showSaveFilePicker({
            suggestedName: 'notes.json',
            types: [{
              description: 'JSON Files',
              accept: { 'application/json': ['.json'] },
            }],
          });
        }
  
        // Записываем данные в файл
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(notes, null, 2));
        await writable.close();
        
        return true;
      } catch (err) {
        console.error('Ошибка сохранения:', err);
        return false;
      }
    },
  
    // Загрузить заметки из файла
    async loadFromFile() {
      try {
        // Открываем файл
        [fileHandle] = await window.showOpenFilePicker({
          types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          }],
          multiple: false
        });
        
        // Читаем содержимое
        const file = await fileHandle.getFile();
        const content = await file.text();
        notes = JSON.parse(content);
        
        return notes;
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        return [];
      }
    }
  };