<template>
  <div class="doctorbackground-container">
    <div class="row justify-content-center">
      <div class="col-8">
        <h2>Lisa ravimi võtmise ajad ja doosid</h2>
        <h6>Patsient {{ patientFirstName }} {{ patientLastName }}, ravim {{ medicationName }}</h6>
      </div>
      <div class="row justify-content-center">
        <div class="col-2">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Aja algus</span>
            <input v-model="addedTimeslot.slotStart" type="time" class="form-control">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Aja lõpp</span>
            <input v-model="addedTimeslot.slotEnd" type="time" class="form-control">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Doos</span>
            <input v-model="addedTimeslot.quantity" type="text" class="form-control">
          </div>
        </div>
        <div class="col-2 justify-content-center">
          <button @click="sendAddTimeslotRequest" type="button" class="btn btn-primary me-3">Salvesta</button>
          <button @click="goBackToDoctorPage" type="button" class="btn btn-dark">Tagasi</button>
        </div>
      </div>
    </div>
    <p></p>
    <div class="row justify-content-center">
      <div class="col-3">
        <AlertDanger :message="errorMessage"/>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">
        <table class="table rounded-table">
          <thead>
          <tr>
            <th scope="col">Aja algus</th>
            <th scope="col">Aja lõpp</th>
            <th scope="col">Doos</th>
            <th scope="col">Muuda</th>
            <th scope="col">Kustuta</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="timeslot in timeslots" :key="timeslot.timeslotId">
            <td>{{ timeslot.slotStart }}</td>
            <td>{{ timeslot.slotEnd }}</td>
            <td>{{ timeslot.quantity }}</td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon class="link-custom cursor-pointer me-lg-2"
                                 :icon="['fas', 'pen-to-square']"/>
            </td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon @click="goToDeleteTimeslot(timeslot.timeslotId)" class="link-custom cursor-pointer"
                                 :icon="['fas', 'trash']"/>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "PatientTimeslotsView",
  components: {AlertDanger},

  data() {
    return {
      medicationPlanId: useRoute().query.medicationPlanId,
      patientId: useRoute().query.patientId,
      patientFirstName: useRoute().query.patientFirstName,
      patientLastName: useRoute().query.patientLastName,
      medicationName: useRoute().query.medicationName,
      errorMessage: '',

      addedTimeslot: {
        medicationPlanId: useRoute().query.medicationPlanId,
        slotStart: null,
        slotEnd: null,
        quantity: 0
      },

      timeslots: [
        {
          timeslotId: 0,
          slotStart: null,
          slotEnd: null,
          quantity: 0
        }]
    }
  },

  methods: {

    sendAddTimeslotRequest() {
      this.$http.post("/medication-plans/patient/time-slots", this.addedTimeslot
      ).then(response => {
        this.updateTimeslotsTable()
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    goBackToDoctorPage() {
      router.push({name: 'doctorRoute'})
    },

    updateTimeslotsTable() {
      this.$http.get("/medication-plans/patient/time-slot", {
            params: {
              medicationPlanId: this.addedTimeslot.medicationPlanId
            }
          }
      ).then(response => {
        this.timeslots = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    goToDeleteTimeslot(selectedTimeslot) {
      this.$http.delete("/medication-plans/patient/time-slot", {
            params: {
              timeslotId: selectedTimeslot
            }
          }
      ).then(response => {
        this.errorMessage = "Ravimi võtmisaeg kustutatud"
        setTimeout(this.resetMessage, 2000);
        this.updateTimeslotsTable()
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    resetMessage() {
      this.errorMessage = ""
    },
  },

  beforeMount() {
    this.updateTimeslotsTable()
  }
}
</script>