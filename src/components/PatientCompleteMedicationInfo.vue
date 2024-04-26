<template>
  <div class="accordion">
    <h6 style="margin-left: 10px">{{ patientFirstName }} {{ patientLastName }}</h6>
    <div class="accordion-item">
      <div class="accordion-header">
        <button :class="collapseMedicationPlanButton" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                aria-expanded="false" aria-controls="collapseOne">
          Patsiendi raviplaan
        </button>
      </div>
      <div id="collapseOne" :class="collapseMedicationPlanComponent" data-bs-toggle="collapse">
        <div class="accordion-body">
          <PatientMedicationPlan
              ref="patientMedicationPlanRef"
              :patientFirstName="patientFirstName" :patientLastName="patientLastName"
              @event-medication-plans-found="expandMedicationPlan"
              @event-medication-plans-not-found="collapseMedicationPlan"
          />
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <div class="accordion-header">
        <button @click="showPatientMedicationLogbook" class="accordion-button collapsed" type="button"
                data-bs-toggle="collapse"
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
      collapseMedicationPlanButton: 'accordion-button collapsed',
      collapseMedicationPlanComponent: 'accordion-collapse collapse',
      patientId: 0,
      patientFirstName: '',
      patientLastName: ''
    }
  },

  methods: {
    showPatientMedicationLogbook() {
      this.$refs.patientMedicationLogbookRef.patientId = this.patientId
      this.$refs.patientMedicationLogbookRef.getPatientMedicationLogbook()
    },

    expandMedicationPlan() {
      this.collapseMedicationPlanButton = 'accordion-button'
      this.collapseMedicationPlanComponent = 'accordion-collapse collapse show'
    },
    collapseMedicationPlan() {
      this.collapseMedicationPlanButton = 'accordion-button collapsed'
      this.collapseMedicationPlanComponent = 'accordion-collapse collapse'
    },
  }

}
</script>