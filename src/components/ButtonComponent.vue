<template>
  <button>{{ buttonText }}</button>
</template>
<script>
export default {
  name: "ButtonComponent",
  props: ["buttonText"],
};
</script>
<style scoped>
button {
  display: inline-block;
  width: 120px;
  font-family: Source Sans Pro;
  font-weight: 600;
  font-size: 1.5rem;
  border: 3px solid #6a1cc3;
  color: #6a1cc3;
  background: #fbfbfb;
  box-shadow: 2px 2px 0px 0px #6a1cc3;
  padding: 5px 10px 5px 10px;
  cursor: pointer;
  transition: all 0.5s;
  margin: 0px 5px 0px 5px;
}
@media screen and (max-width: 768px) {
  button {
    font-size: 20px;
    padding-inline: 20px;
    padding-block: 8px;
  }
}
button:hover {
  background-color: #6a1cc3;
  color: #fbfbfb;
}
</style>
