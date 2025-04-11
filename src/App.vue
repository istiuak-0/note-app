<script setup lang="ts">
import { onBeforeMount } from 'vue';
import SideBar from './components/SideBar.vue';
import { useNotes } from './stores/useNotes';

const noteStore=useNotes()

onBeforeMount(()=>{
  noteStore.getNotesFromLocalStorage()
})

const updateActiveNote=()=>{
  if(noteStore.activeNote){

noteStore.updateNote()

  }
}



</script>

<template>
  <div class="bg-gray-700 text-white min-h-screen flex items-stretch justify-start">
    <!-- SideBar -->
    <SideBar />
    <!-- ManiContent -->
    <main class="flex-1">
      <div class="px-4 py-8 flex flex-col h-full" v-if="noteStore.activeNote">
        <input type="text" v-model="noteStore.activeNote.title" @input="updateActiveNote"
          class="block w-full text-3xl pb-2 font-bold border-b-2 border-gray-500 focus:border-white outline-none transition-colors duration-200">

        <textarea class="block w-full h-full mt-4 text-lg outline-none flex-1 resize-none" v-model="noteStore.activeNote.content" @input="updateActiveNote"></textarea>
        
      </div>
    </main>
  </div>
</template>