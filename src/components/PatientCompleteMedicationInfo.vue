<template>
  <div class="accordion">
    <div class="accordion-item">
      <div class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="true" aria-controls="collapseOne">
          Patsiendi raviplaan
        </button>
        <h6>{{ patientFirstName}} {{patientLastName}}</h6>
      </div>
      <div  id="collapseOne" class="accordion-collapse collapse show" data-bs-toggle="collapse">
        <div class="accordion-body">
          <PatientMedicationPlan ref="patientMedicationPlanRef"
                                 :patientFirstName="patientFirstName" :patientLastName="patientLastName"/>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <div class="accordion-header">
        <button @click="showPatientMedicationLogbook" class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Ravimite võtmise logi
        </button>
      </div>
      <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <PatientMedicationLogbook ref="patientMedicationLogbookRef"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PatientMedicationPlan from "@/components/PatientMedicationPlan.vue";
import PatientMedicationLogbook from "@/components/PatientMedicationLogbook.vue";
import router from "@/router";

export default {
  name: "PatientCompleteMedicationInfo",
  components: {PatientMedicationLogbook, PatientMedicationPlan},

  data() {
    return {
      patientId: 0,
      patientFirstName: '',
      patientLastName: ''
    }
  },

  methods:{
    showPatientMedicationLogbook() {
      this.$refs.patientMedicationLogbookRef.patientId = this.patientId
      this.$refs.patientMedicationLogbookRef.getPatientMedicationLogbook()
    },
  }

}
</script>