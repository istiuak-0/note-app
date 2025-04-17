<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import SideBar from './components/SideBar.vue';
import { useNotes } from './stores/useNotes';
import type { Note } from './utility/types';

const noteStore = useNotes()

onBeforeMount(() => {
  noteStore.loadNotesFromLocalStorage()
})

const activeNote = computed(() => {
  return noteStore.notes.find((note: Note) => note.id === noteStore.activeNoteId)
});

</script>

<template>
  <div class="bg-gray-700 text-white min-h-screen flex items-stretch justify-start">
    <!-- SideBar -->
    <SideBar />
    <!-- ManiContent -->
    <main class="flex-1">
      <div class="px-4 py-8 flex flex-col h-full" v-if="activeNote">
        <input type="text" :value="activeNote.title"
          @input="noteStore.updateNoteTitle(($event.target as HTMLInputElement).value)"
          class="block w-full text-3xl pb-2 font-bold border-b-2 border-gray-500 focus:border-white outline-none transition-colors duration-200">

        <textarea class="block w-full h-full mt-4 text-lg outline-none flex-1 resize-none" :value="activeNote.content"
          @input="noteStore.updateNoteContent(($event.target as HTMLTextAreaElement).value)">
        </textarea>
      </div>
    </main>
  </div>
</template>