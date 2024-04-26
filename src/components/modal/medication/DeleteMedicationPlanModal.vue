<template>
  <Modal ref="modalRef">
    <template #title>
      Soovid ravikuuri kustutada?
    </template>
    <template #buttons>
      <button @click="executeDeleteMedicationPlan" type="button" class="btn btn-warning">Jah</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: "DeleteMedicationPlanModal",
  components: {Modal},
  data() {
    return {
      medicationPlanId: 0
    }
  },
  methods: {

    executeDeleteMedicationPlan() {
        this.$http.delete("medication-plan", {
              params: {
                medicationPlanId: this.medicationPlanId
              }
            }
        ).then(response => {
          this.$emit('event-medication-plan-deleted', 'Ravikuur on kustutatud')
          this.$refs.modalRef.closeModal()
        }).catch(error => {
          router.push({name: 'errorRoute'})
        })
      },

    },
}
</script>