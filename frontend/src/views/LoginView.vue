<script>
import { useAccountStore } from '@/stores/account'
import { mapActions } from 'pinia'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useAccountStore, ['login']),
    async doLogin() {
      await this.login(this.email, this.password)
      this.$router.push('/')
    }
  }
}
</script>

<template lang="pug">
.log-in
  h3 Log in

  form(@submit.prevent="doLogin")
    .form-group
      label(for="email") Email
      input#email.form-control(type="email" v-model="email" required)
    .form-group
      label(for="password") Password
      input#password.form-control(type="password" v-model="password" required)

    .button-submit
      button.btn.btn-primary(type="submit") Log in
</template>

<style lang="scss" scoped>
.log-in {
  max-width: 400px;
  margin: 0 auto;

  .button-submit {
    margin-top: 20px;
    button {
      margin: 0 auto;
    }
  }
}
</style>
