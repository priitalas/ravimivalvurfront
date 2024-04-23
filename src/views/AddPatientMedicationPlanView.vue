<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-3">
        <h2>Lisa uus raviplaan</h2>
      </div>
      <div class="row justify-content-center">
        <div class="col col-2">
          <select v-model="medicationPlanInfo.medicationId" class="form-select custom-dropdown">
            <option selected :value="0">Vali ravim</option>
            <option v-for="medication in medications" :value="medication.medicationId" :key="medication.medicationId">
              {{ medication.medicationName }}</option>
            <option selected :value="-1">-Lisa ravim-</option>
          </select>
        </div>
<!--        <div class="col col-2">-->
<!--          Ühik {{selectedMedication.medicationUnitName}}-->
<!--        </div>-->
        <div class="col col-2">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Kuuri algus</span>
            <input v-model="medicationPlanInfo.planStart" type="date" class="form-control">
          </div>
        </div>
        <div class="col col-3">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Kuuri lõpp</span>
            <input v-model="medicationPlanInfo.planEnd" type="date" class="form-control">
          </div>
        </div>
        <div class="col col-3">
          <button @click="addNewMedicationPlan" type="button" class="btn btn-primary">Lisa</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-8">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Ravimi nimi</th>
            <th scope="col">Algus</th>
            <th scope="col">Lõpp</th>
            <th scope="col">Võtmise tihedus</th>
            <th scope="col">Muuda</th>
            <th scope="col">Kustuta</th>
            <th scope="col">Ajad</th>
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

export default {
  name: "AddPatientMedicationPlanView.vue",

  data() {
    return {
      medications: [
        {
          medicationId: 0,
          medicationName: '',
          medicationUnitId: 0,
          medicationUnitName: ''
        }

      ],
      medicationPlanInfo: {
        patientId: useRoute().query.patientId,
        medicationId: 0,
        medicationUnitId: 0,
        planStart: null,
        planEnd: null
      },
      // URL + query/request parameter example
      patientId: useRoute().query.patientId,
    }
  },

  methods: {

    addNewMedicationPlan() {

    },

    sendGetMedicationsRequest() {
      this.$http.get("/medications")
          .then(response => {
            this.medications = response.data
          })
          .catch(() => {
            //  router.push({name: 'errorRoute'})
          })
    },

    navigateToPatientTimeslots(medicationPlanId) {
      // URL + query/request parameter example
      router.push({name: 'patientTimeslotsRoute', query: {medicationPlanId: medicationPlanId}})
    }
  },
  beforeMount() {
    this.sendGetMedicationsRequest()
  }
}

</script>