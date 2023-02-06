<template>
  <!-- <SearchbarComponent v-model="searchText" @click="searchTitle(searchText)" /> -->
  <router-link to="/Create"
    ><ButtonComponent class="create" buttonText="+"
  /></router-link>
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
  <div v-if="searchResults.length === 0">
    <ListComponent class="list" v-if="searchResults.length === 0" />
  </div>
  <div v-else class="list">
    <h2 class="search-results">Search results:</h2>
    <ul>
      <li v-for="searchResult in searchResults" :key="searchResult.id">
        <div class="entry-box left">
          <h3 v-html="searchResult.title"></h3>
          <p v-html="searchResult.active"></p>
        </div>
        <div>
          <ButtonComponent
            class="entry-box btn"
            buttonText="Edit"
            @click="editEntry(searchResult.id)"
          />
          <ButtonComponent
            class="entry-box right btn"
            @click="deleteListElement(searchResult.id)"
            buttonText="Delete"
          />
        </div>
      </li>
    </ul>
  </div>
  <!-- //v-if="searchResult.length === 0" -->
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
<style scoped>
.create {
  position: absolute;
  right: 20px;
  width: 60px;
}

@media screen and (min-width: 769px) {
  .create {
    top: 425px;
  }
}
@media screen and (min-width: 1052px) {
  .create {
    top: 355px;
  }
}
.list {
  margin-top: 124px;
}
@media screen and (max-width: 768px) {
  .list {
    margin-top: 36px;
  }
}

.search-results {
  font-size: 26px;
}
@media screen and (max-width: 768px) {
  .search-results {
    font-size: 14px;
  }
}

ul {
  list-style-type: none;
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
@media screen and (max-width: 768px) {
  ul {
    width: 80%;
  }
}
h2 {
  margin-bottom: 56px;

  left: 50%;
  transform: translateX(-50%);
  position: relative;
  width: 40%;
}
@media screen and (max-width: 768px) {
  h2 {
    margin-bottom: 8px;
    width: 80%;
  }
}
li {
  border-block-end: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 20px;
  margin-bottom: 16px;
}
@media screen and (max-width: 768px) {
  .list {
    margin-top: 36px;
  }
}

.entry-box {
  /* border: 5px solid red; */
  margin-block: 16px;
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
@media screen and (max-width: 768px) {
  h3 {
    margin-block-end: 8px;
    font-size: 16px;
  }
}

p {
  margin-block-start: 12px;
  font-size: 20px;
}
@media screen and (max-width: 768px) {
  p {
    margin-block-start: 12px;
    font-size: 12px;
  }
}

.date {
  font-style: italic;
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
@media screen and (max-width: 768px) {
  .container {
    width: 80%;
  }
}

#search-input {
  width: 95%;
  position: relative;
  padding: 20px;
  height: 50px;
  border: 2px solid #6a1cc3;
  border-radius: 0px;
  margin: 0 auto;
  display: block;
}
@media screen and (max-width: 768px) {
  #search-input {
    padding-block: 8px;
    font-size: 16px;
    height: 50px;
  }
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
  right: 5px;
  top: 55%;
  transform: translateY(-50%);
  bottom: 0;
  margin-right: 20px;
  fill: #6a1cc3;
}
@media screen and (max-width: 768px) {
  #lupe {
    right: 10px;

    margin-right: 20px;
  }
}
@media screen and (max-width: 320px) {
  #lupe {
    right: 10px;

    margin-right: 10px;
  }
}

.button-position {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
@media screen and (max-width: 768px) {
  .button-position {
    margin-top: 12px;
  }
}
</style>
