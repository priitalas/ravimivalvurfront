<template>
  <Modal ref="modalRef">
    <template #title>
      Muuda ravikuuri
    </template>
    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <AlertDanger :message="errorMessage"/>
            Ravim {{ medicationName }}
            <div class="input-group mt-3 mb-3">
              <span class="input-group-text" id="basic-addon1">Kuuri algus</span>
              <input v-model="periodStart" type="date" id="startDate"
                     class="form-control">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">Kuuri lõpp</span>
              <input v-model="periodEnd" type="date" id="endDate" min="startDate"
                     class="form-control">
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button @click="executeEditMedicationPlan" type="submit" class="btn btn-primary text-center text-nowrap">Salvesta
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
  name: "EditMedicationPlanModal",
  components: {Modal, AlertDanger},

  data() {
    return {
      medicationPlanId: 0,
      medicationName: '',
      periodStart: null,
      periodEnd: null,
      errorMessage: '',
      editedMedicationPlanInfo: {
        id: 0,
        periodStart: null,
        periodEnd: null
      },
    }
  },

  methods: {

    // sendGetMedicationPlanToEditRequest() {
    //   this.$http.get("/medication-plan", {
    //         params: {
    //           medicationPlanId: this.medicationPlanId
    //         }
    //       }
    //   ).then(response => {
    //     this.medicationPlanToEdit = response.data
    //   }).catch(error => {
    //     // router.push({name: 'errorRoute'})
    //   })
    // },

    executeEditMedicationPlan() {
      if (this.allRequiredFieldsWithCorrectInput()) {
        this.editedMedicationPlanInfo.medicationPlanId = this.medicationPlanId
        this.editedMedicationPlanInfo.periodStart = this.periodStart
        this.editedMedicationPlanInfo.periodEnd = this.periodEnd

        this.$http.put("/medication-plan", this.editedMedicationPlanInfo
        ).then(response => {
          this.$emit('event-medication-plan-edited', 'Ravikuur on muudetud')
          this.resetAllInputFields()
          this.$refs.modalRef.closeModal()

        }).catch(error => {
          router.push({name: 'errorRoute'})
        })
      } else {
        this.displayAllFieldsRequiredAlert()
      }
    },

    allRequiredFieldsWithCorrectInput() {
      return this.periodStart !== null &&
          this.periodEnd !== null
    },

    displayAllFieldsRequiredAlert() {
      this.errorMessage = 'Täida kõik väljad!'
      setTimeout(this.resetMessage, 4000)
    },

    resetAllInputFields() {
      this.periodStart = null
      this.periodEnd = null
    },

    resetMessages() {
      this.errorMessage = ''
    }

  },

}
</script>