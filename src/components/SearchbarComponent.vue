<template>
  <form @submit.prevent>
    <input type="text" placeholder="Suchwort" id="search-input" />
    <ButtonComponent buttonText="Search" />
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
  </form>
</template>
<style scoped>
#search-input {
  padding: 20px;
  width: 328px;
  height: 10px;
  border: 2px solid #6a1cc3;
  border-radius: 0px;
}
#lupe {
  margin-left: 350px;
  margin-right: 0rem;
  fill: #6a1cc3;
}
</style>
