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
}
button:hover {
  background-color: #6a1cc3;
  color: #fbfbfb;
}
</style>
