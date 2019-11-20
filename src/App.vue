<template>
  <div id="app">
    <SumaHeader></SumaHeader>
    <div class="app-md">
      <router-view />
    </div>
    <SumaFooter></SumaFooter>
  </div>
</template>

<script>
import SumaFooter from "@/components/SumaFooter";
import SumaHeader from "@/components/SumaHeader";
export default {
  name: "App",
  components: { SumaFooter, SumaHeader }
};
</script>

<style scoped lang="stylus">
#app
  .app-md
    margin auto
    width 1120px
    @media (max-width: 980px)
      max-width 100vw
</style>
