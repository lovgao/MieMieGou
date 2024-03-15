<template>
  <div class="page app-notfount">
    <CommonHeader class="app-common-header" title="Not Found" :back="true"></CommonHeader>
    <img src="../assets/img/error.png"></img>
    <p>一不小心走丢咯😯...</p>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.app-notfount {
  img {
    margin: 3rem 0 0 1.8rem;
  }

  p {
    font-size: 16px;
    margin-left: 120px;
    color: gray;
  }

  .bottom-button {
    width: 160px;
    height: 40px;
  }
}
</style>