<!-- Shopping Cart Widget -->
<template>
<div>
    <vue-perfect-scrollbar style="max-height:calc(100vh - 320px)" :settings="settings">
        <template>
            <v-card v-for="(item, index) in items" :key="item.id" class="eais__list mb-1">
                <v-container fluid py-3 class="files">
                    <v-layout row wrap>

											<v-flex md6 class="row">
				                <span class="body-1">{{item.data.fileTitle}}</span>
				              </v-flex>

                      <v-flex md2 class="row">
				                <span class="body-1" style="text-transform:uppercase;">{{item.data.fileExt}}</span>
				              </v-flex>

                      <v-flex md2 class="row">
				                <span class="body-1">{{Math.ceil(item.data.fileSize / 1024)}}  Кб</span>
				              </v-flex>

                      <v-flex md2 class="row" text-md-right py-1>
                        <div>
                        <!-- :download="`${ (String(item.data.fileSize).includes(String(item.data.fileExt))) ? item.data.fileTitle : item.data.fileTitle + '.' + item.data.fileExt }`" -->
                          <v-btn
                          :disabled="item.data.fileSize === 0"
                          :href="`${toScan + '/efile/v1/' + item.data.fileCode + '/' + $store.state.auth.tokenParams.access_token}`"
                          target="_blank"
                          download
                          class="ma-0" icon>
                              <v-icon color="primary">cloud_download</v-icon>
                          </v-btn>
                        </div>
				              </v-flex>

                    </v-layout>
                </v-container>
            </v-card>

            <!-- <v-card class="eais__list mb-1">
                <v-container fluid py-3>
                    <v-layout row wrap>

											<v-flex md6 class="row">
				                <span class="body-1">Имя файла</span>
				              </v-flex>

                      <v-flex md2 class="row">
				                <span class="body-1">PDF</span>
				              </v-flex>

                      <v-flex md2 class="row">
				                <span class="body-1">Размер</span>
				              </v-flex>

                      <v-flex md2 class="row" text-md-right py-1>
                        <div>
                          <v-btn :href="toScan" target="_blank" class="ma-0" icon>
                              <v-icon color="primary">cloud_download</v-icon>
                          </v-btn>
                        </div>

				              </v-flex>


                    </v-layout>
                </v-container>
            </v-card> -->

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
.eais__list .files {
  cursor: auto;
}
</style>

<script>
import Vue from 'vue'
import modification from "@/mixins/modification";
import {epetitionsFile} from "Api";

export default {
	props: ['oneItem'],
  mixins: [modification],
  mounted() {
    console.log('this.$store.state.eais.oneItem.data');
    console.log(this.oneItem.data.request_num);
    // var path = {};
    // path.path = 'api/v1/gu_requests/1/metafiles_ref/2490835';
    // path.rel = 'docsScans'
    // console.log(path);
    // this.$store.dispatch('getFileLink', path);
  },
  data: () => ({
    className: 'docsScans',
  }),
  computed: {
    toScan() {
      return epetitionsFile // + '/file/v1/c7a0bb15-7b92-4df1-83a0-fc7b6821e9e6/' + this.$store.state.auth.tokenParams.access_token;
    },
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
