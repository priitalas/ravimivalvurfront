<template>
  <div class="container patientbackground-container">
    <div class="row justify-content-center">
      <div class="col col-12 mb-5">
        <button @click="navigateToPatientMedicationPlan" type="button" class="btn btn-primary me-3">
          Vaata kõiki oma ravikuure
        </button>
        <button @click="navigateToPatientLogbook" type="button" class="btn btn-primary me-3">
          Vaata oma ravimivõtmise logi
        </button>
        <button type="button" class="btn btn-primary">Kirjuta arstile</button>
      </div>
    </div>
    <h2>Hetkel võtmist vajavad ravimid:</h2>
    <div class="row justify-content-center">
      <div v-if="message.length > 0" class="col-4 justify-content-center">
        <AlertDanger :message="message"/>
      </div>
      <div v-else class="col-md-12">
        <PatientMedicationsTable/>
      </div>
      <div class="row justify-content-center">
      <div v-if showPatientMedicationPlan class="col-8 justify-content-center">
        <PatientMedicationPlan ref="patientMedicationPlanRef"/>
      </div>
      <div v-if showPatientLogbook class="col-8 justify-content-center">
        <PatientMedicationLogbook ref="patientMedicationLogbookRef"/>
      </div>
      </div>
    </div>
  </div>
</template>
<script>

import PatientMedicationsTable from "@/components/PatientMedicationsTable.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import PatientMedicationPlan from "@/components/PatientMedicationPlan.vue";
import PatientMedicationLogbook from "@/components/PatientMedicationLogbook.vue";

export default {
  name: "PatientView",
  components: {PatientMedicationLogbook, PatientMedicationPlan, AlertDanger, PatientMedicationsTable},

  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      showPatientMedicationPlan: false,
      showPatientLogbook: false,
      message: '',
      statusInfo: {
        doctorPatientId: 0,
        doctorFirstName: "",
        doctorLastName: ""
      },

    }
  },
  methods: {
    navigateToPatientMedicationPlan() {
      this.$refs.patientMedicationPlanRef.patientId = this.userId
      this.$refs.patientMedicationPlanRef.showPatientCompleteMedicationInfo = true
      this.showPatientMedicationPlan = true
      this.$refs.patientMedicationPlanRef.sendGetPatientMedicationPlan()
    },

    navigateToPatientLogbook() {
      this.$refs.patientMedicationLogbookRef.patientId = this.userId
      this.showPatientLogbook = true
      this.$refs.patientMedicationLogbookRef.showPatientLogbook = true
      this.$refs.patientMedicationLogbookRef.getPatientMedicationLogbook()
    },
  }
}
</script>