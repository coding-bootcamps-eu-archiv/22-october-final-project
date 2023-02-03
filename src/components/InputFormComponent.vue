<template>
  <form @submit.prevent>
    <h2>Title</h2>
    <input type="text" v-model="title" />
    <h2>Description</h2>
    <TiptapComponent v-model="description" />
    <ButtonComponent
      buttonText="Submit & create new entry"
      @click="postDictionaryEntry"
      :disabled="isDisabled"
    />
    <router-link to="/"
      ><ButtonComponent
        buttonText="Submit & back to overview"
        @click="postDictionaryEntry"
        :disabled="isDisabled"
    /></router-link>
    <router-link to="/"><ButtonComponent buttonText="Cancel" /></router-link>
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
      console.log(this.description.length);
      const newEntry = {
        title: this.title,
        description: this.description,
        active: false,
      };
      await fetch(`${process.env.VUE_APP_API_URL}/entries`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      const res = await fetch(`${process.env.VUE_APP_API_URL}/entries`);
      const jsonData = await res.json();
      this.entries = jsonData;
      this.title = "";
      this.description = "";
    },
  },
  computed: {
    isDisabled() {
      return this.title.length === 0 || this.description.length === 0;
    },
  },
};
</script>
