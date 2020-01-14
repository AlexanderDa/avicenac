<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container class="activation">
      <q-page class="flex flex-center">
        <q-card>
          <q-card-section>
            <span class="flex flex-center text-activation">Activar cuenta</span>
            <div class="flex flex-center">
              <img src="@/assets/logo.svg" width="150" />
            </div>
            <span class="flex flex-center text-welcome">{{userName}}</span>
            <br />
            <q-form @submit="activation" @reset="onReset" class="q-gutter-md">
              <q-input
                label="Contraseña *"
                v-model="password"
                :rules="[
                  v => (v && v.length > 0) || 'Atributo requerido.',
                  v => v.length >= 8 || 'Contraseña muy corta'
                ]"
                type="password"
                lazy-rules
                filled
              >
                <template v-slot:append>
                  <q-btn round dense flat icon="person" />
                </template>
              </q-input>

              <q-input
                v-model="passwordConfirm"
                label="Confirmar contraseña *"
                :rules="[
                  v => (v && v.length > 0) || 'Atributo requerido.',
                  v => v === password || 'Las contraseñas no coinciden.'
                ]"
                type="password"
                lazy-rules
                filled
              >
                <template v-slot:append>
                  <q-btn round dense flat icon="check_circle" />
                </template>
              </q-input>

              <div>
                <q-btn
                  label="Activar cuenta"
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
import ActivationPage from './ActivationPageController'
export default ActivationPage
</script>

<style lang="sass">
  @import "./ActivationPage.sass"
</style>
