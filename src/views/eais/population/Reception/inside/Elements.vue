<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.id" class="eais__list mb-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

											<v-flex md1 class="row">
				                <span class="body-1">{{item.data.eln_code}}</span>
				              </v-flex>

                      <v-flex md2 class="row">
				                <span class="body-1">{{item.data.eln_name}}</span>
				              </v-flex>

                      <v-flex md1 class="row">
				                <span class="body-1">{{item.data.value}}</span>
				              </v-flex>

                      <v-flex md8 class="row">
                        <!-- <v-tooltip bottom>  slot="activator"  -->
                          <span class="details">{{item.data.elv_name}}</span>
                          <!-- <span>{{item.data.elv_name}}</span> -->
                        </v-tooltip>

				              </v-flex>


                    </v-layout>
                </v-container>
            </v-card>

        </template>
    </vue-perfect-scrollbar>

</div>
</template>

<style>
.eais__list:nth-child(even) {
  background-color: #fafafa;
}
.eais__list span.body-1 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.eais__list span.details {
  font-size: 14px !important;
  font-weight: 400;
}
.app-card .app-card-title {
  background: #fafafa;
}
.multiflex:hover {
  background: #f5f5f5;
}
</style>

<script>
import Vue from 'vue'
import modification from "@/mixins/modification";

export default {
	props: ['oneItem'],
  mixins: [modification],
  data: () => ({
    className: 'gu_request_elem_ref',
  }),
  computed: {
    // banks() {
		// 	return this.$store.state.eais.stateHandbooks.banks;
		// },
    // sprACCTYPEs() {
		// 	return this.$store.state.eais.stateHandbooks.sprACCTYPEs;
		// }
  },
  methods: {
    extraFunk() {
    }
  }
};
</script>
