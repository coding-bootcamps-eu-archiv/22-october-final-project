<template>
  <form @submit.prevent>
    <h2>Title</h2>
    <input class="title-input" type="text" v-model="title" />
    <h2>Description</h2>
    <div class="tiptap-input">
      <TiptapComponent class="tiptap-focus" v-model="description" />
    </div>
    <div class="button-border">
      <label class="checkbox-active" for="entryStatus">
        <input
          v-model="active"
          @change="setStatus"
          type="checkbox"
          name="entryStatus"
          id="entryStatus"
        />
        Active</label
      >
      <ButtonComponent
        class="new-entry"
        buttonText="New entry"
        @click="postDictionaryEntry"
        :disabled="isDisabled"
      />
      <router-link to="/Admin"
        ><ButtonComponent
          buttonText="Submit"
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
  font-size: 26px;
}
input,
.tiptap-input {
  border: 2px solid #6a1cc3;
  position: relative;
  margin-bottom: 24px;
}
.title-input {
  width: 100%;
  padding-left: 1rem;
}
.button-border {
  display: flex;
  position: absolute;
  right: 64px;
}
input {
  font-family: Source Sans Pro;
}
input[type="text"]:focus {
  outline: 1px solid #6a1cc3;
}
.checkbox-active {
  color: #6a1cc3;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}
input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid currentColor;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
}
input[type="checkbox"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em #6a1cc3;
  transform-origin: bottom left;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
}
input[type="checkbox"]:checked::before {
  transform: scale(1);
}

.new-entry {
  font-size: 18px;
}
</style>
