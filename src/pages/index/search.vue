<template>
  <Page>
    <CustomBg>
      <!-- 导航栏 -->
      <Navbar></Navbar>
      <SearchForm @search="onSearch"/>
    </CustomBg>
  </Page>
</template>

<script lang="ts" setup>
const onSearch = val => console.log(val)

</script>

<style>

</style>