<template>
  <!-- <SearchbarComponent v-model="searchText" @click="searchTitle(searchText)" /> -->
  <form @submit.prevent>
    <input type="text" placeholder="Suchwort" v-model="searchText" />
    <ButtonComponent buttonText="Search" @click="searchTitle(searchText)" />
    <ButtonComponent buttonText="Show All " @click="showAllEntries" />
  </form>
  <ListComponent v-if="searchResults.length === 0" />
  <h2 v-else>Search results:</h2>
  <ul>
    <li v-for="searchResult in searchResults" :key="searchResult.id">
      <div v-html="searchResult.title"></div>
      <div v-html="searchResult.active"></div>
      <ButtonComponent buttonText="Edit" @click="editEntry(searchResult.id)" />
      <ButtonComponent
        @click="deleteListElement(searchResult.id)"
        buttonText="Delete"
      />
    </li>
  </ul>
  <!-- //v-if="searchResult.length === 0" -->
  <router-link to="/Create"
    ><ButtonComponent buttonText="Create"
  /></router-link>
</template>
<script>
export default {
  data() {
    return {
      searchResults: [],
      searchText: "",
      currentId: undefined,
    };
  },
  methods: {
    editEntry(id) {
      this.$router.push({ name: "Edit", params: { id: id } });
    },
    async deleteListElement(id) {
      this.currentId = id;
      for (let item of this.searchResults) {
        if (item.id === id) {
          await fetch(`${process.env.VUE_APP_API_URL}/entries/` + id, {
            method: "DELETE",
          });
          const res = await fetch(`${process.env.VUE_APP_API_URL}/entries`);
          const jsonData = await res.json();
          return (this.searchResults = jsonData);
        }
      }
    },
    async searchTitle(searchPhrase) {
      if (this.searchText.length === 0) {
        alert("Suchfeld ist leer!");
        this.searchResults = [];
      } else {
        return await fetch(
          `${process.env.VUE_APP_API_URL}/entries?q=${searchPhrase}`
        )
          .then((response) => response.json())
          .then((searchDataFromApi) => {
            this.searchResults = searchDataFromApi;
            if (this.searchResults.length === 0) {
              alert("Kein Treffer gefunden!");
            } else {
              this.searchResults.sort((a, b) => a.title.localeCompare(b.title));
            }
            this.searchText = "";
          });
      }
    },
    showAllEntries() {
      return (this.searchResults = []);
    },
  },
  computed: {
    currentUserId() {
      return this.searchResults.find(
        (element) => element.id === this.currentId
      );
    },
  },
};
</script>
