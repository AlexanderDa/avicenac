<template>
  <div class="calendar-container">
    <q-toolbar class="shadow-1 bg-white">
      <q-btn round flat color="secondary" icon="event">
        <q-menu v-model="dateMenu" fit anchor="top left" self="bottom left">
          <q-date
            :locale="$store.state.ConstStore.calendar"
            default-view="Calendar"
            v-model="selectedDate"
            mask="YYYY-MM-DD"
            minimal
          >
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="SOLO HOY" color="primary" flat v-close-popup @click="today(true)" />
              <q-btn label="HOY" color="primary" flat v-close-popup @click="today()" />
            </div>
          </q-date>
        </q-menu>
      </q-btn>
      <q-btn
        flat
        round
        color="secondary"
        icon="keyboard_arrow_left"
        @click="$refs.calendar.prev()"
      />
      <q-btn
        flat
        round
        color="secondary"
        icon="keyboard_arrow_right"
        @click="$refs.calendar.next()"
      />
      <span>{{selectedDateLabel}}</span>
      <q-space />
      <q-btn-dropdown outline color="primary" style="width:150px">
        <template v-slot:label>
          <div class="row items-center no-wrap">
            <div class="text-center text-grey">
              <span class="text-secondary q-mr-xs">ver por</span>
              <span v-if="view==='day'" style="font-size:10px">día</span>
              <span v-if="view==='week'" style="font-size:10px">semana</span>
              <span v-if="view==='month'" style="font-size:10px">mes</span>
            </div>
          </div>
        </template>

        <q-list>
          <q-item clickable v-close-popup @click="view='day'">
            <q-item-section>
              <q-item-label>Día</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="view='week'">
            <q-item-section>
              <q-item-label>Semana</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup @click="view='month'">
            <q-item-section>
              <q-item-label>Mes</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn flat round dense icon="refresh" @click="findElements()" />
      <q-btn @click="dialog=true" color="secondary" icon="add" flat round />
    </q-toolbar>
    <q-scroll-area style>
      <QCalendar
        transition-prev="slide-right"
        transition-next="slide-left"
        @click:interval="onCellClicked"
        @click:time="onCellClicked"
        @click:day="onCellClicked"
        @click:week="onCellClicked"
        v-model="selectedDate"
        locale="es-ec"
        ref="calendar"
        :view="view"
        hour24-format
        animated
      >
      <template #day-body="{date, timeStartPos, timeDurationHeight}">
        <div>
          <template v-for="(event, index) in getReservations(date)" disable="true">
          <q-btn
            :key="index"
            class="my-event justify-center ellipsis"
            :style="badgeStyles(event, timeStartPos, timeDurationHeight)"
          >
            <q-icon  name="query_builder" class="q-mr-xs"></q-icon><span class="ellipsis">{{ event.title }}</span>
          </q-btn>
        </template>
        </div>
      </template>
      </QCalendar>
    </q-scroll-area>
    <q-dialog v-model="dialog" persistent>
      <Frame :title="elementIndex!==-1?'Editar':'Nuevo'" icon="event" width="700">
        <q-btn slot="action" flat round dense icon="close" @click="reset()" />
        <q-form slot="content" @submit="submit" class="q-gutter-md">
          <div class="row">
            <div class="col-xs-12 col-md-6">
              <SearchDoctor @selected="(item)=>onDoctorSelected(item)"/>
              <SearchPatient @selected="(item)=>onPatientSelected(item)"/>
              <SearchProcedure @selected="(item)=>onProcedureSelected(item)"/>
                <SelectPeriod onlyid="true" v-model="element.periodId"/>
              <q-input
                v-model="element.reservationDate"
                label="Fecha de reserveción *"
                :rules="rules.date"
                mask="####/##/## ##:##"
                outlined
                dense
                fill-mask
                lazy-rules

              />
            </div>
            <div class="col-xs-12 col-md-6">
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="secondary" name="fas fa-user-md" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Doctor</q-item-label>
                    <q-item-label caption>{{resInfo.doctor}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon color="secondary" name="fas fa-user-injured" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Paciente</q-item-label>
                    <q-item-label caption>{{resInfo.patient}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon color="secondary" name="airline_seat_flat_angled" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Procedimiento</q-item-label>
                    <q-item-label caption>{{resInfo.procedure}}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="secondary" name="event" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Fecha de agendamiento</q-item-label>
                    <q-item-label caption>{{resInfo.reservationDate}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>{{element}}
          </div>
          <div>
            <q-btn label="guardar" type="submit" color="secondary" />
            <q-btn label="limpiar" type="reset" color="secondary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </Frame>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import ReservationPage from './ReservationPageController'
export default ReservationPage
</script>
<style lang="sass">
.calendar-container
    & .q-scrollarea
        height: calc( 100vh - 100px )
.my-event
  width: 100%
  position: absolute
  font-size: 12px
.full-width
  left: 0
  width: 100%
.left-side
  left: 0
  width: 49.75%
.right-side
  left: 50.25%
  width: 49.75%
</style>
