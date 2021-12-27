<template>
  <!-- ======= Header ======= -->
  <header id="header" class="d-flex flex-column justify-content-center">
    <nav class="nav-menu">
      <ul>
        <li>
          <a href="#home">
            <i class="fas fa-arrow-alt-circle-up" style="color:dimgray;"></i>
            <span>Home</span>
          </a>
        </li>
        <li>
          <a href="#chart">
            <i class="bx bx-pie-chart-alt-2"></i>
            <span>Chart</span>
          </a>
        </li>
        <li>
          <a href="#house">
            <i class="bx bx-home"></i>
            <span>House</span>
          </a>
        </li>
        <li>
          <a href="#news">
            <i class="bx bx-news"></i>
            <span>News</span>
          </a>
        </li>
        <li>
          <a href="#board">
            <i class="bx bx-file"></i>
            <span>Board</span>
          </a>
        </li>
        <!-- <li>
          <a href="#resume">
            <i class="bx bx-file-blank"></i>
            <span>News</span>
          </a>
        </li> -->
      </ul>
    </nav>
    <!-- .nav-menu -->
  </header>
  <!-- End Header -->
</template>

<script>
export default {
  name: "HeaderNavbar",
};
</script>

<style scoped>
.bx {
  color: black;
}

.nav-menu .active > a {
  background: #f2f3f5;
}

.nav-menu a:hover {
  background: #0563bb;
}
</style>
