<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay>
    <v-card>
      <v-layout style="height:100vh" align-center justify-center>
        <v-progress-circular
         :size="70"
         :width="7"
         color="primary"
         indeterminate
        ></v-progress-circular>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<style>
.eais__preloader {
  height: 100vh;
  display:inline-flex;
}
</style>

<script>
export default {
  data: () => ({
    dialog: true
  })
}
</script>
