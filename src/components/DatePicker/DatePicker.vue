<template>
    <v-menu
    :close-on-content-click="false"
    v-model="menu"
    :nudge-right="40"
    lazy transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
    >

      <v-text-field
       slot="activator"
       v-model="localeDate"
       :label="label"
       :rules="rules"
       mask="##.##.####"
       append-icon="clear"
       @click:append="clearAll"
       prepend-icon="event"
       :hint="dataHint" class="dateField" :persistent-hint="persistentHint"
      ></v-text-field>

      <v-date-picker
       v-model="date"
       @input="menu = false"
       no-title
  		 :min="fromDate"
  		 locale="ru-ru"
       first-day-of-week="1"
      ></v-date-picker>

    </v-menu>
</template>

<style>
  .dateField .v-text-field__details .theme--light.v-messages {
    color: red;
  }
</style>

<script>
// import rules from "@/mixins/rules";
export default {
  // mixins: [rules],
  props: ['value', 'label', 'min', 'rules'],
  data () {
    return {
      menu: false,
			dataHint: "",
      persistentHint: false
    }
  },
  computed: {
		fromDate() {
			if (this.min) {
				return new Date(this.min).toISOString().substr(0, 10);
			} else {
				return new Date('1900-01-01').toISOString().substr(0, 10);
			}
		},
    date: {
			get () {
				if (this.value !== null && this.value !== undefined ) {
					return new Date(this.value).toISOString().substr(0, 10);
				}
			},
			set (val) {
        this.value = new Date(val).toISOString();
        this.value = this.value.replace('T00:00:00.000Z', 'T21:00:00.000+0000');
        this.$emit('input', this.value)
			}
		},
	  localeDate: {
	    get () {
        if (this.date !== undefined) {
          var ld = new Date(this.date).toLocaleDateString();
          var nd = ld.replace(/\D+/g,"");
          return nd;
        }
	    },
	    set (value) {
	      var day = value.substring(0,2)
	      var month = value.substring(2,4)
	      var year = value.substring(4,8)
	      var oldDate = year + '-' + month + '-' + day
        // console.log(oldDate);
        // console.log(new Date(this.fromDate));
	      if (day.length === 2 && day < 32 &&
						month.length === 2 && month < 13 &&
						year.length === 4
					) {
            console.log(new Date(oldDate));
						this.date = oldDate
						this.dataHint = ""
            this.persistentHint = false
            if ( (new Date(oldDate)) < (new Date(this.fromDate)) ) {
              this.dataHint = "Меньше начальной даты"
              this.persistentHint = true
            }
					} else {
						this.dataHint = "Введите корректную дату"
            this.persistentHint = false
					}
	    }
	  }
	},
  methods: {
    clearAll() {
      this.value = null;
      this.$emit('input', this.value)
      console.log(this.value);
    }
  }
}
</script>
