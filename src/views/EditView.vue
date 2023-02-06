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
        <label class="checkbox-active" for="entryStatus">
          <input
            class="checkbox-input"
            v-model="entry.active"
            @change="setStatus"
            type="checkbox"
            name="entryStatus"
            id="entryStatus"
          />
          Active</label
        >
        <router-link :disabled="isDisabled" to="/Admin"
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
      if (
        this.entry.title.length === 0 ||
        this.entry.description.length === 0
      ) {
        alert("Titel & Description müssen ausgefüllt werden!");
      } else {
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
      }
    },
  },
  computed: {
    isDisabled() {
      return (
        this.entry.title.length === 0 || this.entry.description.length === 0
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

h2 {
  font-size: 36px;
  margin-top: 80px;
}

h3 {
  font-size: 26px;
}

.heading-title {
  color: #6a1cc3;
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
  display: flex;
  position: absolute;
  right: 64px;
}
.title-input {
  width: 100%;
  padding-left: 1rem;
}
input {
  font-family: Source Sans Pro;
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
.checkbox-input {
  color: #6a1cc3;
}
input[type="text"]:focus {
  outline: 1px solid #6a1cc3;
}
</style>
