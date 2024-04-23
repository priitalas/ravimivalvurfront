<template>
  <div class="accordion">
    <div class="accordion-item">
      <div class="accordion-header">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="true" aria-controls="collapseOne">
          Patsiendi raviplaan
        </button>
      </div>
      <div  id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <PatientMedicationPlan ref="patientMedicationPlanRef"/>
          <div class="row align-content-lg-start">
            <div v-if="patientId > 0" class="col col-lg-3">
              <button @click="navigateToAddPatientMedicationPlan" type="button" class="btn btn-warning">
                Lisa ravikuur
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <div class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Ravimite võtmise logi
        </button>
      </div>
      <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <PatientMedicationLogbook/>
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
      patientId: 4
    }
  },
  methods: {
    navigateToAddPatientMedicationPlan() {
      // URL + query/request parameter example
      router.push({name: 'addPatientMedicationPlanRoute', query: {patientId: this.patientId}})
    },
  }
}
</script>