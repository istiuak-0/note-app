import { defineStore } from "pinia";
import type { Note } from "../utility/types";
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';


export const useNotes = defineStore("note", () => {

  //states
  const notes = ref<Note[]>([])
  const activeNote = ref<Note | null>(null)


  //note crud
  const createNote = () => {
    const id = uuidv4();

    const noteItem: Note = {
      id,
      title: "New Note",
      content: ""
    }

    notes.value.push(noteItem)
    saveNotesToLocalStorage(noteItem)
    setActiveNote(noteItem)
  }

  const deleteNote = (id: string) => {

    if (activeNote.value?.id === id) {
      setActiveNote(null)
    }
    let itemToRemove = notes.value.findIndex((note: Note) => note.id === id)

    notes.value.splice(itemToRemove, 1)
    removeNotesFromLocalStorage(itemToRemove)

  }


  const updateNote = () => {
    const noteToUpdate = notes.value.findIndex((note) => note.id === activeNote.value?.id)
    if (activeNote.value) {
      notes.value[noteToUpdate] = activeNote.value
      updateNotesInlocalStorage(notes.value)
    }

  }



  //local storage crud
  const saveNotesToLocalStorage = (value: Note, key: string = "notes") => {
    const prevItem = localStorage.getItem(key);
    if (!prevItem) {
      localStorage.setItem(key, JSON.stringify([value]))
    } else {
      const parsedItem: Note[] = JSON.parse(prevItem);
      parsedItem.push(value)
      localStorage.setItem(key, JSON.stringify(parsedItem))
    }
  }


  const getNotesFromLocalStorage = () => {
    const storedNotes = localStorage.getItem("notes")
    if (storedNotes) {
      notes.value = JSON.parse(storedNotes) as Note[]
    }
  }


  const removeNotesFromLocalStorage = (index: number, key: string = "notes") => {
    const noteItems = localStorage.getItem(key)
    if (noteItems) {
      const storedNote = JSON.parse(noteItems) as Note[]
      storedNote.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(storedNote))
    }
  }


  const updateNotesInlocalStorage = (notes: Note[]) => {
    localStorage.setItem("notes", JSON.stringify(notes))

  }
  //note utility

  const setActiveNote = (note: Note | null) => {
    activeNote.value = note
  }

  return {
    notes, getNotesFromLocalStorage, saveNotesToLocalStorage, deleteNote, createNote, updateNote, setActiveNote, activeNote
  }

})