<template>
  <div class="my-input">
    <label class="item-title">*Sponsor</label>
    <input
      type="text"
      placeholder="*Fill in you Upline Distributor Id or Mobile Phone or E-mail that you know"
      v-model="vModel"
    />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    vModel: {
      type: String
    }
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped lang="stylus">
.my-input
  background #E6F0F3
  padding-left 20px
</style>
