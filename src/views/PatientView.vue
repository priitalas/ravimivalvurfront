<template>
  <div class="container patientbackground-container">
    <h2>Hetkel võtmist vajavad ravimid:</h2>
    <div class="row justify-content-center">
      <div v-if="message.length > 0" class="col-4 justify-content-center">
        <AlertDanger :message="message"/>
      </div>
      <div v-else class="col-md-12">
        <PatientMedicationsTable/>
      </div>
    </div>
  </div>
</template>
<script>
import PatientMedicationsTable from "@/components/PatientMedicationsTable.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "PatientView",
  components: {AlertDanger, PatientMedicationsTable},

  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      message: '',
      statusInfo: {
        doctorPatientId: 0,
        doctorFirstName: "",
        doctorLastName: ""
      },

    }
  }
}
</script>