<template lang="html">
  <div>
    <h4 class="error--text my-0">
      Режим
      <span v-if="this.$store.state.eais.globalCreate">создания</span>
      <span v-else>редактирования</span>
      вакансии</h4>
  </div>
</template>

<style>

</style>

<script>
export default {
  data() {
    return {
      extraSearch: false
    };
  }
}
</script>
