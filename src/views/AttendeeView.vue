<template>
  <form @submit.prevent>
    <input type="text" placeholder="Suchwort" v-model="searchText" />
    <ButtonComponent buttonText="Search" @click="searchTitle(searchText)" />
    <ButtonComponent buttonText="Show All " @click="showAllEntries" />
  </form>
  <!-- <ListComponent /> -->
  <AttendeeViewList v-if="searchResults.length === 0" />
  <h2 v-else>Search results:</h2>
  <ul>
    <li v-for="searchResult in searchResults" :key="searchResult.id">
      <div v-html="searchResult.title"></div>
      <div v-html="searchResult.description"></div>
      <div>{{ new Date(searchResult.modifiedAt) }}</div>
      <ButtonComponent buttonText="Share" @click="shareItem" />
    </li>
  </ul>
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
            }
            this.searchResults = [];
            for (let item of searchDataFromApi) {
              console.log(searchDataFromApi);
              if (item.active) {
                this.searchResults.push(item);
                this.searchResults.sort((a, b) =>
                  a.title.localeCompare(b.title)
                );
              } else {
                alert("Kein Treffer gefunden!");
              }
            }
            // if (this.searchResults.length === 0) {
            //   alert("Kein Treffer gefunden!");
            // } else {
            //   for (let item of this.searchResults) {
            //     if (item.active) {
            //       this.filteredResults.push(item);
            //       this.filteredResults.sort((a, b) =>
            //         a.title.localeCompare(b.title)
            //       );
            //     }
            //   }
            // }
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
