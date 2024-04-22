<template>
  <div v-if="showPatientCompleteMedicationInfo">
    <AlertDanger :message="errorMessage"/>
    <table v-if="medicationPlans.length>0" class="table table-hover table-responsive">
      <thead>
      <tr>
        <th scope="col">Ravim</th>
        <th scope="col">Annus</th>
        <th scope="col">Ühik</th>
        <th scope="col">Kogus päevas</th>
        <th scope="col">Kuuri algus</th>
        <th scope="col">Kuuri lõpp</th>
        <th v-if="isDoctor" colspan="2" style="width:10%">Muuda / Kustuta</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="medicationPlan in medicationPlans" :key="medicationPlan.medicationPlanId">
        <td>{{ medicationPlan.medicationName }}</td>
        <td>{{ medicationPlan.quantity }}</td>
        <td>{{ medicationPlan.medicationUnitName }}</td>
        <td>{{ medicationPlan.frequency }}</td>
        <td>{{ medicationPlan.periodStart }}</td>
        <td>{{ medicationPlan.periodEnd }}</td>
        <td v-if="isDoctor" style="width:10%; text-align: center; justify-content: center;">
          <font-awesome-icon @click="navigateToEditPlan()" class="link-custom cursor-pointer me-lg-2"
                             :icon="['fas', 'pen-to-square']"/>
        </td>
        <td v-if="isDoctor" style="width:10%; text-align: center; justify-content: center;">
          <font-awesome-icon @click="openDeletePlan()" class="link-custom cursor-pointer"
                             :icon="['fas', 'trash']"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import AlertDanger from "@/components/Alert/AlertDanger.vue";

export default {
  name: "PatientMedicationPlan",
  components: {AlertDanger},
  data() {
    return {
      showPatientCompleteMedicationInfo: false,
      isDoctor: false,
      patientId: 0,
      errorMessage: '',
      medicationPlans: [{
        medicationPlanId: 0,
        medicationPlanStatus: "",
        medicationName: "",
        medicationUnitName: "",
        frequency: 0,
        quantity: 0,
        periodStart: null,
        periodEnd: null
      }],
      errorResponse: {
        message: '',
        errorCode: ''
      }
    }
  },

  methods: {

    sendGetPatientMedicationPlan() {
      this.$http.get(`/medication-plans/patient/${this.patientId}`
      ).then(response => {
        this.medicationPlans = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
        setTimeout(this.resetMessage, 2000);
        this.handleError(error.response.status)
      })
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 777) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    resetMessage() {
      this.errorMessage = ""
    },
  },
}
</script>