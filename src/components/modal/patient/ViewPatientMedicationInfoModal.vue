<template>
  <Modal ref="modalRef" class=modal-fullscreen>
    <template #title>
      Ravimi laiendatud info:
    </template>
    <template #body>
      <div>
        <h6><img :src="medication.medicationImageData" alt="Medication Image"></h6>
        <h6> Nimi: {{ medication.medicationName }}</h6>
        <h6> Tarvitamisjuhis:</h6>
        <h6> {{ medication.medicationNote }}</h6>
        <h6> {{ medication.medicationDescription }}</h6>

      </div>
    </template>
    <template #buttons>

    </template>
  </Modal>
</template>


<script>
import Modal from "@/components/modal/Modal.vue";
import MedicationImage from "@/components/medication/MedicationImage.vue";

export default {
  name: 'ViewPatientMedicationInfoModal',

  components: {MedicationImage, Modal},
  data() {
    return {
      // todo: swageri resonse pealt saad mudeli
      medication: {}
    };
  },
  methods: {
    handleOpenViewPatientMedicationInfoModal(medicationId) {
      this.sendGetMedicationRequest(medicationId)
    },

    sendGetMedicationRequest(medicationId) {
      this.$http.get(`/medication/${medicationId}`)
          .then(response => {
            this.medication = response.data
            this.$refs.modalRef.openModal();
          })
          .catch(error => {
            const errorResponseBody = error.response.data
          })
    },

    // todo: too ära backendist konkreetse ravimi kogu info kasutades medicationId
    //  GET /medication?medicationId=1
    //  GET /medication/1


  }
};
</script>
