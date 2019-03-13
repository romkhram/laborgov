<template>
  <div>
    <v-dialog v-model="shureDialog" persistent max-width="584">
      <v-card class="pa-3">
        <v-card-title class="headline">
            <h3 class="ironthm-sec-title" style="color:#464d69;line-height:1.5;">Все несохраненные изменения будут потеряны.<br>Вы уверены?</h3>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeShureDialog">
              Нет
          </v-btn>
          <v-btn color="primary" class="ml-3" @click="goToPar">
              Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<style>

</style>

<script>
import router from '../../../router';
export default {
  props: ['eaisRoutes'],
  data: () => ({
      // items: []
    }),
  computed: {
    shureDialog () {
      return this.$store.state.eais.shureDialog
    }
  },
  methods: {
    closeShureDialog() {
      this.$store.commit('toggleShureDialog');
    },
    goToPar() {
      this.$store.commit('assignInsideSearch');
      this.$store.commit('toggleShureDialog');
      router.push(this.eaisRoutes)
    }
  }
};
</script>
