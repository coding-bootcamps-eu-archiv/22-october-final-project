<template>
  <form @submit.prevent>
    <h2>Title</h2>
    <input class="title-input" type="text" v-model="title" />
    <h2>Description</h2>
    <div class="tiptap-input">
      <TiptapComponent v-model="description" />
    </div>
    <div class="button-border">
      <input
        v-model="active"
        @change="setStatus"
        type="checkbox"
        name="entryStatus"
        id="entryStatus"
      />
      <label for="entryStatus">Active</label>
      <ButtonComponent
        buttonText="Submit/ New entry"
        @click="postDictionaryEntry"
        :disabled="isDisabled"
      />
      <router-link to="/Admin"
        ><ButtonComponent
          buttonText="Submit/ Overview"
          @click="postDictionaryEntry"
          :disabled="isDisabled"
      /></router-link>
      <router-link to="/Admin"
        ><ButtonComponent buttonText="Cancel"
      /></router-link>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      description: "",
      entries: [],
      active: false,
    };
  },
  methods: {
    async postDictionaryEntry() {
      console.log(this.description.length);
      const newEntry = {
        title: this.title,
        description: this.description,
        active: this.active,
      };
      await fetch(`${process.env.VUE_APP_API_URL}/entries`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newEntry),
      });
      const res = await fetch(`${process.env.VUE_APP_API_URL}/entries`);
      const jsonData = await res.json();
      this.entries = jsonData;
      this.title = "";
      this.description = "";
    },
    setStatus() {
      return !this.active;
    },
  },
  computed: {
    isDisabled() {
      return this.title.length === 0 || this.description.length === 0;
    },
  },
};
</script>
<style scoped>
*,
*:before,
p:after {
  box-sizing: border-box;
  font-size: 18px;
}
h2 {
  font-family: "Montserrat", sans-serif;
}
input,
.tiptap-input {
  border: 2px solid #6a1cc3;
  position: relative;
  margin-bottom: 24px;
}
.title-input {
  width: 100%;
}
.button-border {
  position: absolute;
  right: 64px;
}
input {
  font-family: Source Sans Pro;
}
</style>
