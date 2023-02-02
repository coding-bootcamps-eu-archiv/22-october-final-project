<template>
  <form @submit.prevent>
    <h2>Title</h2>
    <input type="text" v-model="title" />
    <h2>Description</h2>
    <TiptapComponent v-editor.content="description" />
    <router-link to="/"
      ><ButtonComponent
        buttonText="Submit"
        @click="putDictionaryEntry()"
        :disabled="isDisabled"
    /></router-link>
    <router-link to="/"><ButtonComponent buttonText="Cancel" /></router-link>
  </form>
</template>
