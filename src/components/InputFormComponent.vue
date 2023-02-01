<template>
  <form @submit.prevent>
    <h2>Title</h2>
    <input type="text" v-model="title" />
    <h2>Description</h2>
    <TiptapComponent v-model="description" />
    <router-link to="/"
      ><ButtonComponent buttonText="Submit" @click="postDictionaryEntry"
    /></router-link>
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      entries: [],
    };
  },
  methods: {
    async postDictionaryEntry() {
      const newEntry = {
        title: this.title,
        description: this.description,
        active: false,
      };
      await fetch("http://localhost:3000/entries", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      const res = await fetch("http://localhost:3000/entries");
      const jsonData = await res.json();
      return (this.entries = jsonData);
    },
  },
};
</script>
