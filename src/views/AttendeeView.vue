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
  <div class="grid-container" v-if="searchResults.length === 0">
    <AttendeeViewList class="list" />
  </div>
  <div v-else class="list">
    <h2>Search results:</h2>
    <ul>
      <li v-for="searchResult in searchResults" :key="searchResult.id">
        <div class="entry-box left">
          <h3 v-html="searchResult.title"></h3>
          <p v-html="searchResult.description"></p>
          <p>{{ new Date(searchResult.modifiedAt) }}</p>
        </div>
      </li>
    </ul>
  </div>
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
              if (item.active) {
                this.searchResults.push(item);
                this.searchResults.sort((a, b) =>
                  a.title.localeCompare(b.title)
                );
                // } else {
                //   alert("Kein Treffer gefunden!");
              }
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
<style scoped>
.grid-container {
  margin: 0px;
  padding: 0px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;

  /* max-width: 800px; */
}

ul {
  /* list-style-type: none; */
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  padding: 0px;
  margin: 0px;

  left: 50%;
  transform: translateX(-50%);
  position: relative;
  width: 40%;
}

.list {
  margin-top: 124px;
}

ul {
  list-style-type: none;
}

h2 {
  margin-bottom: 56px;

  left: 50%;
  transform: translateX(-50%);
  position: relative;
  width: 40%;
}

li {
  border-block-end: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 20px;
  margin-bottom: 16px;
}

.entry-box {
  /* border: 5px solid red; */
  margin-block: 24px;
}

h3,
p {
  /* border: 5px solid blue; */
  margin: 0px;
}

h3 {
  margin-block-end: 8px;
  font-size: 32px;
}

p {
  margin-block-start: 12px;
  font-size: 20px;
}

.date {
  font-style: italic;
}

.btn {
  max-height: 50px;
}

form {
  margin-top: 80px;
}

.container {
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  width: 40%;
}

#search-input {
  width: 95%;
  position: relative;
  padding: 20px;
  height: 10px;
  border: 2px solid #6a1cc3;
  border-radius: 0px;
  margin: 0 auto;
  display: block;
}

#search-input:focus {
  outline: 0.5px solid #6a1cc3;
}

::placeholder {
  color: #6a1cc3;
  opacity: 0.5;
}
#lupe {
  position: absolute;
  right: 0;
  top: 55%;
  transform: translateY(-50%);
  bottom: 0;
  margin-right: 10px;
  fill: #6a1cc3;
}
.button-position {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
</style>
