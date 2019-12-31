<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center error-404">
        <div class="column">
          <div class="fixed-center text-center">
            <p class="code">
              <img src="@/assets/sad.svg" />
            </p>
            <p class="title">¡Uy! Página no encontrada</p>
            <p
              class="subtitle"
            >Lo sentimos, pero la página que busca no existe o no está disponible temporalmente.</p>
            <q-btn color="secondary" style="width:200px;" to="/" label="Ir al sitio" />
          </div>
        </div>
      </q-page>
    </q-page-container>
    <AppFooter />
  </q-layout>
</template>

<style lang="sass">
  @import "@/views/404/NotFoundPage.sass"
</style>
