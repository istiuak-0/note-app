import { defineStore } from "pinia";
import type { Note } from "../utility/types";
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';


export const useNotes = defineStore("note", () => {

  //states
  const notes = ref<Note[]>([])
  const notesLocalStorageKey = "notes";
  const activeNoteId = ref<string | undefined>()

  // utility
  const setActiveNoteId = (noteId?: string) => {
    activeNoteId.value = noteId
  }

  const loadNotesFromLocalStorage = () => {
    const storedNotes = localStorage.getItem(notesLocalStorageKey);
    if (storedNotes) {
      notes.value = JSON.parse(storedNotes) as Note[]
    }
  }
  //notes crud
  const createNote = () => {
    const id = uuidv4();
    const newNote: Note = {
      id,
      title: "New Note",
      content: "Write your notes here..."
    }
    notes.value.push(newNote)
    localStorage.setItem(notesLocalStorageKey, JSON.stringify(notes.value));
    setActiveNoteId(id)
  }

  const deleteNote = (noteId: string) => {
    activeNoteId.value === noteId ? setActiveNoteId() : null;
    let noteIndexToRemove = notes.value.findIndex((note: Note) => note.id === noteId)
    notes.value.splice(noteIndexToRemove, 1)
    localStorage.setItem(notesLocalStorageKey, JSON.stringify(notes.value));

  }

  const updateNoteTitle = (title: string) => {
    const activeNoteIndex = notes.value.findIndex((note) => note.id === activeNoteId.value);
    if (activeNoteIndex !== -1) {
      notes.value[activeNoteIndex].title = title
      localStorage.setItem(notesLocalStorageKey, JSON.stringify(notes.value))
    }
  }

  const updateNoteContent = (content: string) => {
    const activeNoteIndex = notes.value.findIndex((note) => note.id === activeNoteId.value);
    if (activeNoteIndex !== -1) {
      notes.value[activeNoteIndex].content = content
      localStorage.setItem(notesLocalStorageKey, JSON.stringify(notes.value))
    }
  }


  return {
    notes, loadNotesFromLocalStorage, deleteNote, createNote, activeNoteId, setActiveNoteId, updateNoteTitle, updateNoteContent
  }

})