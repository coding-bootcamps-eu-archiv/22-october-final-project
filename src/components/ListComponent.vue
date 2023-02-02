<template>
  <ul>
    <li v-for="entries in apiState" :key="entries.id">
      <div v-html="entries.title"></div>
      <div v-html="entries.description"></div>
      <ButtonComponent buttonText="Edit" @click="editEntry(entries.id)" />
      <ButtonComponent
        @click="deleteListElement(entries.id)"
        buttonText="Delete"
      />
      <!-- <EditFormComponent /> -->
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
      arrayForEditView: [],
      title: "",
      description: "",
      entries: [],
    };
  },
  async mounted() {
    return await fetch(`${process.env.VUE_APP_API_URL}/entries`)
      .then((response) => response.json())
      .then((stateFromApi) => {
        this.apiState = stateFromApi;
        this.apiState.sort((a, b) => a.title.localeCompare(b.title));
      });
  },
  methods: {
    editEntry(id) {
      this.$router.push({ name: "Edit", params: { id: id } });
    },
    async deleteListElement(id) {
      this.currentId = id;
      for (let item of this.apiState) {
        if (item.id === id) {
          await fetch(`${process.env.VUE_APP_API_URL}/entries` + id, {
            method: "DELETE",
          });
          const res = await fetch(`${process.env.VUE_APP_API_URL}/entries`);
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
