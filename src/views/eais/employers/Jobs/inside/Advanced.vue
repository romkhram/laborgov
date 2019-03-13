<template>
<div>
    <v-container fluid class="eais__readerform">
        <v-layout row wrap>

            <v-flex md3 py-1>
                <span class="body-1">Стаж не менее:</span>
                <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
            </v-flex>

            <v-flex md4 py-1>
                <span class="body-1">Водительские категории:</span>
                <span class="subheading font-weight-medium">
                    <v-chip small>{{oneItem.data.test}}</v-chip>
                </span>
            </v-flex>

        </v-flex>
        <v-flex md4 py-1>
            <span class="body-1">Требуемое образование:</span>
            <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
        </v-flex>

        <v-flex md12 py-1>
            <v-divider></v-divider>
        </v-flex>

        <v-flex md6 py-1>
            <!-- Рома! нужно сделать обязательную проверку что выбрать можно только конечный элемент (наименование), уровень выше нельзя выбирать -->
            <span class="body-1">Специальность по образованию - ОКСО-2016:
            </span>
            <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
        </v-flex>

        <v-flex md5 py-1>
            <span class="body-1">Желательная профессия:
            </span>
            <span class="subheading font-weight-medium">{{oneItem.data.test}}</span>
        </v-flex>

        <v-flex md12 py-1>
            <v-divider></v-divider>
        </v-flex>

        <v-flex md11 py-1>
            <span class="body-1">Навыки</span>
            <span class="subheading font-weight-medium">
                <v-chip small>{{oneItem.data.test}}</v-chip>
            </span>
        </v-flex>

        <v-flex md11 py-1>
            <span class="body-1">Проживание</span>
            <span class="subheading font-weight-medium">
                <v-chip small>{{oneItem.data.test}}</v-chip>
            </span>
        </v-flex>

        <v-flex md11 py-1>
            <span class="body-1">ПК</span>
            <span class="subheading font-weight-medium">
                <v-chip small>{{oneItem.data.test}}</v-chip>
            </span>
        </v-flex>

        <v-flex md11 py-1>
            <span class="body-1">Категории</span>
            <span class="subheading font-weight-medium">
                <v-chip small>{{oneItem.data.test}}</v-chip>
            </span>
        </v-flex>

        <v-flex md11 py-1>
            <span class="body-1">Нарушения функций</span>
            <span class="subheading font-weight-medium">
                <v-chip small>{{oneItem.data.test}}</v-chip>
            </span>
        </v-flex>

        <v-flex md1 py-1>
            <div class="text-xs-right mrm-4">
                <v-btn class="ma-0" icon @click="emplMain = true">
                    <v-icon color="primary">edit</v-icon>
                </v-btn>
            </div>
        </v-flex>

    </v-layout>
</v-container>

<v-dialog v-model="emplMain" max-width="1100">
    <v-card>
        <v-card-title class="headline">Дополнительно</v-card-title>

        <v-container fluid grid-list-xl>
            <v-layout row wrap>

                <v-flex md3 py-1>
                    <v-text-field label="Требуемый стаж (лет)"></v-text-field>
                </v-flex>

                <v-flex md4 py-1>
                    <v-select :no-data-text="noDataText" label="Категория управления автомобилем" multiple></v-select>
                </v-flex>

                <v-flex md5 py-1>
                    <v-select :no-data-text="noDataText" label="Образование"></v-select>
                </v-flex>

                <v-flex md12 py-1 mt-3>
                    <v-title class="body-2">Специальность по образованию: ОК 009-2016
                    </v-title>
                </v-flex>

                <v-flex md4 py-1>
                    <v-select :no-data-text="noDataText" label="Уровень образования"></v-select>
                </v-flex>

                <v-flex md4 py-1>
                    <v-autocomplete :no-data-text="noDataText" label="Профиль"></v-autocomplete>
                </v-flex>

                <v-flex md4 py-1>
                    <v-autocomplete :no-data-text="noDataText" label="Направление"></v-autocomplete>
                </v-flex>

                <v-flex md6 py-1>
                    <!-- Поиск может осуществляться только по конечному коду/названию наименования!!! -->
                    <v-autocomplete :no-data-text="noDataText" label="Наименование"></v-autocomplete>
                </v-flex>

                <v-flex md6 py-1>
                    <v-autocomplete :no-data-text="noDataText" label="Желательная профессия"></v-autocomplete>
                </v-flex>

                <v-flex md12 py-1>
                    <v-select :no-data-text="noDataText" chips label="Навыки" multiple></v-select>
                </v-flex>

                <v-flex md6 py-1>
                    <v-select :no-data-text="noDataText" chips label="Районы" multiple></v-select>
                </v-flex>

                <v-flex md6 py-1>
                    <v-select :no-data-text="noDataText" chips label="ПК" multiple></v-select>
                </v-flex>

                <v-flex md12 py-1>
                    <v-select :no-data-text="noDataText" chips label="Особо учитываемые категории" multiple></v-select>
                </v-flex>

                <v-flex md12 py-1>
                    <v-select :no-data-text="noDataText" chips label="Допустимые нарушения функций" multiple></v-select>
                </v-flex>

            </v-layout>
        </v-container>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="primary" flat="flat" @click="emplMain = false">
                Отменить
            </v-btn>

            <v-btn color="primary" flat="flat" @click="emplMain = false">
                Продолжить
            </v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>

</div>
</template>

<style>
span.body-1:first-letter {text-transform: capitalize;}
.eais__readerform .body-1 {color: rgba(0, 0, 0, 0.50);}
.eais__readerform .subheading:empty::before {content: "\2014";}
.eais__readerform .subheading {color: #464D69;}
</style>

<script>




// oneItem.data.people
// oneItem.data.foreigner

export default {
	props: ['oneItem'],
	data: () => ({
		ownerTypeAr: [
			'организация',
			'предприниматель',
			'иногороднее',
			'филиал'
		],
		switch1: false,
		emplMain: false,
		dateMenu01: false,
		dateMenu02: false,
		dateMenu03: false,
		dateMenu04: false,
		date01: null,
		date02: null,
		date03: null,
		date04: null,
    noDataText: 'Нет данных',
	}),
	mounted() {
		this.getEmplCenters();
	},
	computed: {
		EmplCenters () {
			return this.$store.state.eais.EmplCenters;
		}
	},
  components: {
  },
	methods: {
		noMore(val1, val2) {
			if (val1 > val2) {
				this.oneItem.data.foreigner = val2;
			}
		},
		getEmplCenters() {
			this.$store.dispatch('getEmplCenters');
		},
		returnId() {
			console.log(this.oneItem.data.emplCenterId);
		}
	}
}

</script>
