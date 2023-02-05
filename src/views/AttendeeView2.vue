<template>
  <h2>CREATE NEW DICTIONARY ENTRIES</h2>
  <article>
    <InputFormComponent />
  </article>
</template>
<style scoped>
*,
*:before,
p:after {
  box-sizing: border-box;
  font-size: 18px;
}
h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 36px;
  color: #6a1cc3;
  padding-left: 64px;
  margin-top: 80px;
}
@media screen and (max-width: 768px) {
  h2 {
    font-size: 16px;
  }
}
article {
  margin: 40px 64px 24px 64px;
}
</style>
