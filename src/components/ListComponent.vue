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
      <article>
        <form @submit.prevent>
          <h2>Title</h2>
          <input type="text" v-model="title" />
          <h2>Description</h2>
          <TiptapComponent v-editor.content="description" />
          <router-link to="/"
            ><ButtonComponent
              buttonText="Submit"
              @click="putDictionaryEntry(entries.id)"
              :disabled="isDisabled"
          /></router-link>
          <router-link to="/"
            ><ButtonComponent buttonText="Cancel"
          /></router-link>
        </form>
      </article>
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
    editEntry(id) {
      // Edit Input muss erscheinen (display none wird inaktiv)
      // title = title einfügen + description einfügen

      this.currentId = id;
      for (let item of this.apiState) {
        if (item.id === id) {
          console.log(item.title, this.title);
          this.title = item.title;
          this.description = item.description;
        }
      }
    },
    async putDictionaryEntry(id) {
      console.log(id, this.title);
      const updatedEntry = {
        title: this.title,
        description: this.description,
        active: false,
      };
      await fetch(`http://localhost:3000/entries/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updatedEntry),
      });
      const res = await fetch("http://localhost:3000/entries");
      const jsonData = await res.json();
      return (this.entries = jsonData);
      // this.title = "";
      // this.description = "";
    },
  },
  computed: {
    currentUserId() {
      return this.apiState.find((element) => element.id === this.currentId);
    },
    isDisabled() {
      return this.title.length === 0; //|| this.description.length === 0;
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
