<template>
  <ul>
    <li v-for="entries in apiState" :key="entries.id">
      <div v-html="entries.title"></div>
      <div v-html="entries.description"></div>
      <ButtonComponent buttonText="Edit" />
      <ButtonComponent
        @click="deleteListElement(entries.id)"
        buttonText="Delete"
      />
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    // properties
    return {
      apiState: [],
      currentId: undefined,
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
  methods: {
    async deleteListElement(id) {
      this.currentId = id;
      for (let item of this.apiState) {
        if (item.id === id) {
          await fetch("http://localhost:3000/entries/" + id, {
            method: "DELETE",
          });
          const res = await fetch("http://localhost:3000/entries");
          const jsonData = await res.json();
          return (this.apiState = jsonData);
          // const currentIndex = this.apiState.findIndex(
          //   (element) => element.id === item.id
          // );
          // this.apiState.splice(currentIndex);
        }
      }
    },
  },
  computed: {
    currentUserId() {
      return this.apiState.find((element) => element.id === this.currentId);
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
