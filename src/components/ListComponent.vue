<template>
  <ul>
    <li v-for="entries in apiState" :key="entries.id">
      <div v-html="entries.title"></div>
      <div v-html="entries.description"></div>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    // properties
    return {
      apiState: [],
    };
  },
  async mounted() {
    return await fetch("http://localhost:3000/entries")
      .then((response) => response.json())
      .then((stateFromApi) => {
        this.apiState = stateFromApi;
        this.apiState.sort((a, b) => a.title.localeCompare(b.title));
      });
  },
  computed: {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
