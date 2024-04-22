<template>

  <h2></h2>
  <h2>Hetkel võtmist vajavad ravimid:</h2>

  <div class="container">
    <!-- <ViewMedicineInfoModal ref="viewMedicineInfoModalRef" />-->
    <AlertDanger :message="message"/>
    <div class="row justify-content-center">
      <div class="col-md-12">

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
      message: ''
    }
  },

  methods: {
    openViewMedicineInfoModal(medicationId) {
    },

    updatePatientMedicationsTable(patientId) {
// todo: f10:02:15 refidega?
    },

  }
}
</script>