<template>

  <h2>Hetkel võtmist vajavad ravimid:</h2>

  <div class="container">
<!-- <ViewMedicineInfoModal ref="viewMedicineInfoModalRef" />-->
    <div class="row justify-content-center">
      <div class="col-md-12">

        <PatientMedicationsTable/>

      </div>
    </div>
  </div>


</template>
<script>
import PatientMedicationsTable from "@/components/PatientMedicationsTable.vue";

export default {
  name: "PatientView",
  components: {PatientMedicationsTable},

  data() {
    return {

    }
  },

  methods: {
    openViewMedicineInfoModal(medicationId) {
      },


  }
}
</script>