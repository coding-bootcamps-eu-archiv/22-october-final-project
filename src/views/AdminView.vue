<template>
  <!-- <SearchbarComponent v-model="searchText" @click="searchTitle(searchText)" /> -->
  <router-link to="/Create"
    ><ButtonComponent class="create" buttonText="Create"
  /></router-link>
  <form @submit.prevent>
    <input type="text" placeholder="Suchwort" v-model="searchText" />
    <ButtonComponent buttonText="Search" @click="searchTitle(searchText)" />
    <ButtonComponent buttonText="Show All " @click="showAllEntries" />
  </form>

  <div v-if="searchResults.length === 0">
    <ListComponent v-if="searchResults.length === 0" />
  </div>
  <div v-else class="list">
    <h2>Search results:</h2>
    <ul>
      <li v-for="searchResult in searchResults" :key="searchResult.id">
        <div>
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
}

.list {
  margin-inline: 64px;
}

ul {
  list-style-type: none;
}

li {
  border-block-end: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entry-box {
  /* border: 5px solid red; */
  margin-block: 16px;
}

.left {
  margin-inline-start: 20px;
}

.right {
  margin-inline-end: 20px;
}

h3,
p {
  /* border: 5px solid blue; */
  margin: 0px;
}

h3 {
  margin-block-end: 8px;
  font-size: 16px;
}

p {
  margin-block-start: 8px;
}

p {
  font-size: 12px;
}

.date {
  font-style: italic;
}

.btn {
  max-height: 50px;
}
</style>
