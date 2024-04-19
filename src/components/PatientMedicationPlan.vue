<template>
  <div>
    <table v-if="medicationPlans.length>0" class="table table-responsive">
      <thead>
      <tr>
        <th scope="col">Ravim</th>
        <th scope="col">Annus</th>
        <th scope="col">Ühik</th>
        <th scope="col">Kogus päevas</th>
        <th scope="col">Kuuri algus</th>
        <th scope="col">Kuuri lõpp</th>
        <th v-if="isDoctor" scope="col">Muuda</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="medicationPlan in medicationPlans" :key="medicationPlans.medicationPlanIdId">
          <td>{{ medicationPlan.medicationName }}</td>
          <td>{{ medicationPlan.quantity }}</td>
          <td>ühik</td>
          <td>{{ medicationPlan.frequency }}</td>
          <td>{{ medicationPlan.periodStart }}</td>
          <td>{{ medicationPlan.periodEnd }}</td>
        <td v-if="isDoctor">
          <font-awesome-icon @click="navigateToEditPlan(patientId)" class="link-custom cursor-pointer me-lg-2"
                             :icon="['fas', 'pen-to-square']"/>
          <font-awesome-icon @click="openDeletePlan(patientId)" class="link-custom cursor-pointer"
                             :icon="['fas', 'trash']"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "PatientMedicationPlan",
  props: {
    isDoctor: Boolean,
    selectedPatientId: String
  },

  data(){
    return {
      medicationPlans: [ {
        medicationPlanId: 0,
        medicationPlanStatus: "",
        medicationName: "",
        medicationUnitName: "",
        frequency: 0,
        quantity: 0,
        periodStart: null,
        periodEnd: null
      }],
    }
  },

  methods: {
    navigateToEditPlan(){
    },
    openDeletePlan(){
    },

    sendGetPatientMedicationPlan() {
      this.$http.get("/medication-plans/patient", {
            params: {
              patientId: this.selectedPatientId
            }
          }
      ).then(response => {
        this.medicationPlans = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
     //   this.handleError(error.response.status)
      })
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 666) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },
  },

   beforeMount() {
     this.sendGetPatientMedicationPlan();
   }
}
</script>