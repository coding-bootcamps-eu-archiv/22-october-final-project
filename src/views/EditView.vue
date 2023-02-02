<template>
  <h2>Edit your dictionary entry</h2>
  <article>
    <form @submit.prevent>
      <h2>Title</h2>
      <input type="text" v-model="entry.title" />
      <h2>Description</h2>
      <TiptapComponent v-model="entry.description" />
      <router-link to="/"
        ><ButtonComponent buttonText="Submit" @click="putDictionaryEntry"
      /></router-link>
      <router-link to="/"><ButtonComponent buttonText="Cancel" /></router-link>
    </form>
  </article>
</template>

<script>
export default {
  data() {
    return {
      entry: {},
    };
  },
  async created() {
    const res = await fetch(
      `${process.env.VUE_APP_API_URL}/entries/` + this.$route.params.id
    );
    const jsonData = await res.json();
    return (this.entry = jsonData);
  },
  methods: {
    async putDictionaryEntry() {
      const updatedEntry = {
        title: this.entry.title,
        description: this.entry.description,
        active: false,
      };
      await fetch(
        `${process.env.VUE_APP_API_URL}/entries/` + this.$route.params.id,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(updatedEntry),
        }
      );
    },
  },
};
</script>

<style lang="css" scoped></style>
