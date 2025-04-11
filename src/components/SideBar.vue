<script setup lang="ts">
import { useNotes } from '../stores/useNotes';

const noteStore = useNotes()
</script>


<template>
  <aside class="w-[256px] min-h-screes bg-gray-800">

    <div class="p-4">
      <button class="button w-full" @click="noteStore.createNote()">New Note</button>
    </div>

    <ul>
      <li v-for="note in noteStore.notes"
        class="p-4 border-b border-gray-700 hover:border-gray-600 cursor-pointer flex justify-between items-center gap-4 "
        @click="noteStore.setActiveNote(note)">
        <span>{{ note.title }}</span>
        <button class="text-red-400 cursor-pointer" @click="noteStore.deleteNote(note.id)">

          <i class="fa-solid fa-trash"></i>

        </button>
      </li>
    </ul>

  </aside>
</template>