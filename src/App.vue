<template>
  <HeaderComponent />
  <nav>
    <router-link to="/">Admin</router-link> |
    <router-link to="/Attendee">Attendee</router-link> |
    <router-link to="/Create">Create</router-link>
  </nav>
  <router-view />
</template>
