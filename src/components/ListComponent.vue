<template>
  <ul class="list">
    <li class="list-item" v-for="entries in apiState" :key="entries.id">
      <div class="text">
        <div class="title" v-html="entries.title"></div>
        <div class="description" v-html="entries.description"></div>
      </div>
      <ButtonComponent
        class="button"
        buttonText="Edit"
        @click="editEntry(entries.id)"
      />
      <ButtonComponent
        class="button"
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
<style scoped>
.list {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem 1.5rem;
  padding: 0px;
  margin: 2rem 10rem 2rem 10rem;
}
.list-item {
  display: contents;
}
.text {
  border-bottom: 2px solid black;
  padding-bottom: 1rem;
}
.button {
  align-self: center;
  justify-self: end;
}
.title {
  font-size: 1.5rem;
  color: var(--color-primary);
  font-weight: bold;
}
</style>
