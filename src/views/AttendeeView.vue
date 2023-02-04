<template>
  <form @submit.prevent>
    <div class="container">
      <input
        type="text"
        name="search-input"
        id="search-input"
        placeholder="Suchwort"
        v-model="searchText"
      />
      <label for="search-input">
        <div id="lupe">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#6A1CC3"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </div>
      </label>
    </div>
    <div class="button-position">
      <ButtonComponent buttonText="Search" @click="searchTitle(searchText)" />
      <ButtonComponent buttonText="Show All " @click="showAllEntries" />
    </div>
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
<style scoped>
.container {
  display: inline-block;
  position: relative;
  width: 100%;
}
#search-input {
  padding: 10px;
  height: 10px;
  border-radius: 0px;
  border: 3px solid #6a1cc3;
}
#lupe {
  position: absolute;
  top: 10px;
  right: 0px;
  bottom: 0px;
  margin-right: 10px;
  fill: #6a1cc3;
}
input {
  width: 100%;
}
form {
  margin: 100px 64px 124px 64px;
}
.button-position {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}
</style>
