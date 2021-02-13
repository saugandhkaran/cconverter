<template>
  <nav>
    <div class="menu-items">
      <h3 class="brand">
        Converter
      </h3>
    </div>
  </nav>
</template>
<script>
export default {
  name: "TheHeader"
}
</script>
<style lang="scss" scoped>
nav {
  background-color: #2c3e50;
  color: white;
  min-height: 20px;
  padding: 5px 20px;

  .menu-items {
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>