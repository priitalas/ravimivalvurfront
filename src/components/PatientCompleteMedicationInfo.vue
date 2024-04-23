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

export default {
  name: "PatientCompleteMedicationInfo",
  components: {PatientMedicationLogbook, PatientMedicationPlan},

  data() {
    return {
      patientId: 0
    }
  },
  methods: {

  }
}
</script>