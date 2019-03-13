<template>
	<div class="session-wrapper">
		<div class="session-left" style="width:31.25rem;"></div>
		<div class="session-right text-xs-center">
			<div class="session-table-cell">
				<div class="session-content">
					<!-- <img
						:src="appLogo"
						class="img-responsive mb-3"
						width="78"
						height="78"
					/>
					<h2 class="mb-3">{{$t('message.loginToAdmin')}}</h2>
					<p class="fs-14">{{$t('message.enterUsernameAndPasswordToAccessControlPanelOf')}} {{brand}}.</p> -->
					<h2 class="mb-3">Добро пожаловать в ЕАИС</h2>
					<p class="fs-14 my-5">Введите логин и пароль для доступа к личному кабинету.</p>

					<v-form class="mb-4">
						<v-text-field
							label="Логин"
							v-model="auth.login"
							required
							placeholder=" "
							@keyup.enter="logIn"
						></v-text-field>
						<v-text-field
							label="Пароль"
							v-model="auth.password"
							type="password"
							:rules="auth.passwordRules"
							required
							placeholder=" "
							@keyup.enter="logIn"
						></v-text-field>
						<!-- <v-checkbox
							color="primary"
							label="Запомнить меня"
							v-model="checkbox"
						></v-checkbox> -->
						<div>
							<v-btn :disabled="progress" large @click="logIn" block color="primary">

								<span v-if="!progress">Войти</span>

								<v-progress-circular
									v-if="progress"
									indeterminate
									color="white"
								></v-progress-circular>

							</v-btn>
						</div>
					</v-form>

				</div>
			</div>
		</div>
		<v-snackbar
			:value="logInSnackbar"
			vertical
			color="error"
			top
			class="headline"
		>
			{{txt}}
			<v-btn flat icon @click="logInSnackbarOff">
				<v-icon>close</v-icon>
			</v-btn>
		</v-snackbar>
	</div>
</template>

<script>


export default {
  data: () => ({
    // checkbox: false,
		auth: {
	    login: "",
	    password: "",
	    passwordRules: [v => !!v || "Это обязательное поле"]
		}
  }),
	computed: {
		logInSnackbar () {
			return this.$store.state.auth.tokenParams.logInSnackbar;
		},
		txt () {
			return this.$store.state.auth.tokenParams.txt;
		},
		progress () {
			return this.$store.state.auth.tokenParams.progress;
		}
	},
  methods: {
    logIn() {
      this.$store.dispatch("getToken", this.auth);
    },
    logInSnackbarOff() {
      this.$store.commit("logInSnackbarOff");
    }
  }
};
</script>
