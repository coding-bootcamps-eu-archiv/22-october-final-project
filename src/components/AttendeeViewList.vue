<template>
  <ul>
    <li v-for="entries in apiState" :key="entries.id">
      <div v-html="entries.title"></div>
      <div v-html="entries.description"></div>
      <div>{{ new Date(entries.modifiedAt) }}</div>
      <!-- <EditFormComponent /> -->
      <ButtonComponent buttonText="Share" />
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
        for (let item of stateFromApi) {
          if (item.active) {
            this.apiState.push(item);
          }
        }
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
  date() {
    return new Date(this.entries.modifiedAt);
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
