<template>
  <h2 class="heading-title">EDIT YOUR DICTIONARY ENTRY</h2>
  <article>
    <form @submit.prevent>
      <h3>Title</h3>
      <input class="title-input" type="text" v-model="entry.title" />
      <h3>Description</h3>
      <div class="tiptap-input">
        <TiptapComponent v-model="entry.description" />
      </div>
      <div class="button-border">
        <input
          class="checkbox-input"
          v-model="entry.active"
          @change="setStatus"
          type="checkbox"
          name="entryStatus"
          id="entryStatus"
        />
        <label for="entryStatus">Active</label>
        <router-link to="/Admin"
          ><ButtonComponent buttonText="Submit" @click="putDictionaryEntry"
        /></router-link>
        <router-link to="/Admin"
          ><ButtonComponent buttonText="Cancel"
        /></router-link>
      </div>
    </form>
  </article>
</template>

<script>
export default {
  data() {
    return {
      entry: {},
    };
  },
  async created() {
    const res = await fetch(
      `${process.env.VUE_APP_API_URL}/entries/` + this.$route.params.id
    );
    const jsonData = await res.json();
    return (this.entry = jsonData);
  },
  methods: {
    async putDictionaryEntry() {
      const updatedEntry = {
        title: this.entry.title,
        description: this.entry.description,
        active: this.entry.active,
      };
      await fetch(
        `${process.env.VUE_APP_API_URL}/entries/` + this.$route.params.id,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(updatedEntry),
        }
      );
    },
  },
};
</script>

<style lang="css" scoped>
*,
*:before,
p:after {
  box-sizing: border-box;
  font-size: 18px;
}
html {
  margin: 0px;
}
h2,
h3 {
  font-family: "Montserrat", sans-serif;
}

.heading-title {
  color: #6a1cc3;
  font-size: 1.5rem;
}
input,
.tiptap-input {
  border: 2px solid #6a1cc3;
  position: relative;
  margin-bottom: 24px;
}
article {
  margin: 40px 64px 24px 64px;
}
h2 {
  padding-left: 64px;
  margin-top: 72px;
}
.button-border {
  position: absolute;
  right: 64px;
}
.title-input {
  width: 100%;
}
input {
  font-family: Source Sans Pro;
}
</style>
