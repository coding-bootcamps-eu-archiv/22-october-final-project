<template>
  <div class="content">
    <header class="sta-pad">
      <h1>Bootcamp Dictionary App</h1>
    </header>
    <div id="header-after"></div>
    <div id="header-after2"></div>
  </div>
</template>
<style>
* {
  box-sizing: border-box;
}
.content {
  --bg-color: #e5e5e5;
  --main-bg2-color: #6a1cc3;
  --main-bg1-color: #fbfbfb;
  --main-bg2-shadow: #8849cf;
  --text-color-grey: #00000099;
  font-family: "Montserrat", sans-serif;
  padding-bottom: 2em;
}

h1 {
  text-transform: uppercase;
  font-size: 4em;
  color: var(--main-bg1-color);
  text-align: center;
}
@media screen and (max-width: 768px) {
  h1 {
    font-size: 16px;
    margin: 0px;
  }
}

.sta-pad {
  padding: 2.5em;
  margin: 0px;
  background-color: var(--main-bg2-color);
  filter: drop-shadow(0rem 0.65rem 0rem var(--main-bg2-shadow));
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 768px) {
  .sta-pad {
    padding: 0px;
    padding-block-start: 40px;
  }
}

#header-after2 {
  position: absolute;
  z-index: 0;
  margin-top: 7px;
  width: 100%;
  height: 20px;
  background: var(--main-bg2-shadow);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: rotate(180deg);
}

#header-after {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 20px;
  background: var(--main-bg2-color);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: rotate(180deg);
}
#header-after2 {
  margin-top: 10px;
}
</style>
