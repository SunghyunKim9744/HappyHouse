<template>
  <div id="material-kit">
    <header-navbar></header-navbar>
    <div :class="{ 'nav-open': NavbarStore.showNavbar }">
      <router-view name="header" />
      <div>
        <router-view />
      </div>

      <router-view name="footer" />
    </div>
  </div>
</template>

<script>
import HeaderNavbar from "@/layout/HeaderNavbar.vue";

export default {
  name: "App",
  components: {
    HeaderNavbar,
  },
};
</script>
