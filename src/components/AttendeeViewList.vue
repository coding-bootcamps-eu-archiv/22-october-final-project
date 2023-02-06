<template>
  <div class="grid-container">
    <ul>
      <li v-for="entries in apiState" :key="entries.id">
        <div class="entry-box left">
          <h3 v-html="entries.title"></h3>
          <p v-html="entries.description"></p>
          <p class="date">{{ new Date(entries.modifiedAt) }}</p>
        </div>
        <!-- <EditFormComponent /> -->
      </li>
    </ul>
  </div>
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
        for (let item of stateFromApi) {
          if (item.active) {
            this.apiState.push(item);
          }
        }
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
  date() {
    return new Date(this.entries.modifiedAt);
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}

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
@media screen and (max-width: 768px) {
  ul {
    width: 80%;
  }
}

li {
  /* margin-block: 8px; */
  border-block-end: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 20px;
  margin-bottom: 16px;
}
@media screen and (max-width: 768px) {
  li {
    margin-bottom: 12px;
  }
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
</style>
