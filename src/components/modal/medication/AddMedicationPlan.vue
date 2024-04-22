<template>
  <Modal ref="modalRef" @event-close-modal="resetAllInputFields">
    <template #title>
      Lisa patsiendile raviplaan
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <AlertDanger :message="errorMessage"/>
            <AlertSuccess :message="successMessage"/>
            <div class="mb-3">
              <label for="unitName" class="form-label"></label>
              <input v-model="unitName" type="text" class="form-control" id="userName">
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button @click="executeAddNewMedicationPlan" type="submit" class="btn btn-primary text-center text-nowrap">
        Salvesta
      </button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "AddMedicationPlanModal",
  components: {Modal, AlertSuccess, AlertDanger},

  data() {
    return {
     newMedicationPlanRequest: {
        patientId: 0,
        medicationId: 0,
        medicationUnitId: 0,
        frequency: 0,
        quantity: 0,
        periodStart: null,
        periodEnd: null
      },
      medications: [
        {
          medicationId: 0,
          medicationName: ''
        }
      ]
    }
  },

  methods: {

    sendGetAllMedicationsRequest () {
      this.$http.get("/medications")
          .then(response => {
            this.medications = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    executeAddNewMedicationPlan() {
      if (this.allFieldsWithCorrectInput()) {
        this.sendPostNewMedicationPlanRequest();
      } else {
        this.displayAllFieldsRequiredAlert();
      }
    },

    sendPostNewMedicationPlanRequest() {
      this.$http.post("/medication-plans/patient/", this.newMedicationPlanRequest
      ).then(response => {
        const responseBody = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 555) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    allFieldsWithCorrectInput() {
      return this.newMedicationPlanRequest.medicationId !== 0 &&
          this.newMedicationPlanRequest.periodEnd !== null &&
          this.newMedicationPlanRequest.periodStart !== null &&
          this.newMedicationPlanRequest.frequency !== 0 &&
          this.newMedicationPlanRequest.quantity !== 0
    },

    displayAllFieldsRequiredAlert() {
      this.errorMessage = 'Täida kõik väljad!'
      setTimeout(this.resetMessage, 4000)
    },

    resetAllInputFields() {
      this.newMedicationPlanRequest.medicationId =0
      this.newMedicationPlanRequest.frequency = 0
      this.newMedicationPlanRequest.quantity = 0
      this.newMedicationPlanRequest.medicationUnitId = 0
      this.newMedicationPlanRequest.periodEnd = null
      this.newMedicationPlanRequest.periodStart = null
    },

    resetMessages() {
      this.unitName = ''
    }

  }
}
</script>


