<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-3">
        <h2>Lisa uus ravikuur</h2>
      </div>
      <AlertDanger :message="errorMessage" />
      <div class="row justify-content-lg-center">
        <div class="col col-sm-3">
          <select v-model="newMedicationPlanInfo.medicationId" @change="handleMedicationChange"
                  class="form-select custom-dropdown">
            <option selected :value="0">Vali ravim</option>
            <option v-for="medication in medications" :value="medication.medicationId" :key="medication.medicationId">
              {{ medication.medicationName }}, {{ medication.unitName }}
            </option>
            <option selected :value="-1">-Lisa ravim-</option>
          </select>
        </div>
        <div class="col col-sm-2 me-0">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Algus</span>
            <input v-model="newMedicationPlanInfo.planStart" type="date" class="form-control">
          </div>
        </div>
        <div class="col col-sm-2 me-0">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Lõpp</span>
            <input v-model="newMedicationPlanInfo.planEnd" type="date" class="form-control">
          </div>
        </div>
        <div class="col col-sm-2 ms-0">
          <button @click="addNewMedicationPlan" type="button" class="btn btn-primary"
                  @event-new-medication-added="handleNewMedicationAdded">Lisa
          </button>
        </div>
      </div>
    </div>
    <p></p>
    <div class="row justify-content-center">
      <div class="col-9">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Ravimi nimi</th>
            <th scope="col">Algus</th>
            <th scope="col">Lõpp</th>
            <th scope="col">Võtmise tihedus</th>
            <th scope="col">Muuda</th>
            <th scope="col">Kustuta</th>
            <th scope="col">Lisa ajad</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Aspirin</td>
            <td>01/05/2024</td>
            <td>20/05/2024</td>
            <td>0</td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon class="link-custom cursor-pointer me-lg-2"
                                 :icon="['fas', 'pen-to-square']"/>
            </td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon class="link-custom cursor-pointer"
                                 :icon="['fas', 'trash']"/>
            </td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon @click="navigateToPatientTimeslots" class="link-custom cursor-pointer"
                                 :icon="['fas', 'clock']"/>
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
  name: "AddPatientMedicationPlanView.vue",
  components: {AlertDanger},

  data() {
    return {
      errorMessage: '',
      medications: [
        {
          medicationId: 0,
          medicationName: '',
          unitName: ''
        }
      ],
      newMedicationPlanInfo: {
        patientId: useRoute().query.patientId,
        medicationId: 0,
        planStart: null,
        planEnd: null
      },

      medicationPlanId: 0,

      // URL + query/request parameter example
      patientId: useRoute().query.patientId,
    }
  },

  methods: {

    addNewMedicationPlan(){
      if (this.allFieldsWithCorrectInput()) {
        this.sendAddPatientMedicationPlanInfo();
      } else {
        this.displayAllFieldsRequiredAlert()
      }
    },

    sendAddPatientMedicationPlanInfo () {
        this.$http.post("/medication-plans/patient/", this.newMedicationPlanInfo
        ).then(response => {
          this.medicationPlanId = response.data
        }).catch(error => {
          router.push({name: 'errorRoute'})
        })
      },

    sendGetNewMedicationPlanInfo(){

    },

    handleMedicationChange() {
      if (this.medicationPlanInfo.medicationId < 0) {
        router.push({name: 'addMedicationRoute'})
      }
    },

    handleNewMedicationAdded() {
      this.sendGetMedicationsRequest()
      this.medicationPlanInfo.medicationId = data.message
    },

    sendGetMedicationsRequest() {
      this.$http.get("/medications")
          .then(response => {
            this.medications = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    navigateToPatientTimeslots(medicationPlanId) {
      // URL + query/request parameter example
      router.push({name: 'patientTimeslotsRoute', query: {medicationPlanId: medicationPlanId}})
    },

    allFieldsWithCorrectInput() {
      return this.medicationPlanInfoInfo.medicationId !== 0 &&
          this.medicationPlanInfoInfo.planStart !== null &&
          this.medicationPlanInfoInfo.planEnd !== null
    },

    displayAllFieldsRequiredAlert() {
      this.errorMessage = 'Täida kõik väljad!'
      setTimeout(this.resetMessage, 4000)
    },
  },
  beforeMount() {
    this.sendGetMedicationsRequest()
  }
}

</script>