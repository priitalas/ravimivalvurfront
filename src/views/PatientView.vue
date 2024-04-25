<template>
  <h2></h2>
  <h2 style="font-size: xx-large;">Hetkel võtmist vajavad ravimid:</h2>

  <div class="container">
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