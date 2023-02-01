<template>
  <SearchbarComponent @click="searchTitle(dest)" />
  <ListComponent />
  <router-link to="/Create"
    ><ButtonComponent buttonText="Create"
  /></router-link>
</template>
<script>
export default {
  data() {
    return {
      searchResult: [],
    };
  },
  methods: {
    async searchTitle(searchPhrase) {
      return await fetch(`http://localhost:3000/entries?q=${searchPhrase}`)
        .then((response) => response.json())
        .then((searchDataFromApi) => {
          this.apiState = searchDataFromApi;
          this.apiState.sort((a, b) => a.title.localeCompare(b.title));
        });
    },
  },
};
</script>
