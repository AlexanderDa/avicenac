<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="login">
      <q-page class="flex flex-center">
        <q-card>
          <q-card-section>
            <div class="flex flex-center">
              <img src="@/assets/logo.svg" width="150" />
            </div>
            <q-form @submit="login" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                v-model="emailAddress"
                label="Correo Electrónico *"
                lazy-rules
                :rules="rules.email"
              >
                <template v-slot:append>
                  <q-btn round dense flat icon="person" />
                </template>
              </q-input>

              <q-input
                filled
                v-model="password"
                label="Contraseña *"
                lazy-rules
                :type="showPass ? 'password' : null"
                :rules="rules.password"
              >
                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    flat
                    :icon="showPass ? 'visibility' : 'visibility_off'"
                    @click="()=>{showPass=!showPass}"
                  />
                </template>
              </q-input>

              <div>
                <q-btn
                  label="Entrar"
                  type="submit"
                  color="secondary"
                  :loading="loading"
                  :disabled="loading"
                  style="width:100%"
                >
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />Cargando...
                  </template>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import LoginPage from './LoginPageController'
export default LoginPage
</script>

<style lang="sass">
  @import "@/views/login/LoginPage.sass"
</style>
