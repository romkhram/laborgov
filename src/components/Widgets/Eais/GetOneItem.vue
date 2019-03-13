<template>
  <div>
  </div>
</template>

<style>

</style>

<script>
// import router from '../../../router';
export default {
  props: ['parPath'],
  mounted() {
    this.getOneItem();
  },
  // data: () => ({
  //
  //   }),
  computed: {
    path() {
  		console.log('this.$route');
      const curPath = this.$route.path.split('/');
      const trueRoute = this.parPath + curPath[curPath.length - 2];
      const path = { links: [ {path: trueRoute} ] };
      return path;
    }
  },
  methods: {
    getOneItem() {
			this.$store.dispatch('editElement', this.path);
		}
  }
};
</script>
