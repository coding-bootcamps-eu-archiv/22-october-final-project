<template>
  <!-- <SearchbarComponent v-model="searchText" @click="searchTitle(searchText)" /> -->
  <form @submit.prevent>
    <input type="text" placeholder="Suchwort" v-model="searchText" />
    <ButtonComponent buttonText="Search" @click="searchTitle(searchText)" />
  </form>
  <ButtonComponent buttonText="Show All " @click="showAllEntries" />
  <div><ListComponent v-if="searchResults.length === 0" /></div>
  <ul>
    <li v-for="searchResult in searchResults" :key="searchResult.id">
      <div v-html="searchResult.title"></div>
      <div v-html="searchResult.active"></div>
      <div v-html="searchResult.modifiedAt"></div>
      <ButtonComponent buttonText="Edit" @click="editEntry(entries.id)" />
      <ButtonComponent
        @click="deleteListElement(entries.id)"
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
    };
  },
  methods: {
    async searchTitle(searchPhrase) {
      if (this.searchText.length === 0) {
        alert("Suchfeld ist leer!");
        this.searchResults = [];
      } else {
        console.log("Test", searchPhrase.length);
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
};
</script>
