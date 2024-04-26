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
  methods: {

    executeDeleteMedicationPlan() {

    },

  }
}
</script>