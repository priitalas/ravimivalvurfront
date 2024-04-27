<template>
  <Modal ref="modalRef" class="modal-info-dialog">
    <template #title>
      Ravim {{ medication.medicationName }}
    </template>
    <template #body>
      <div>
        <MedicationLargeImage :image-data="medication.medicationImageData"/>
        <h6> Tarvitamisjuhis:</h6>
        <div textarea class="form-control"> {{ medication.medicationNote }}</div>
        <p>/</p>
        <div textarea class="form-control"> {{ medication.medicationDescription }}</div>
      </div>
    </template>
    <template #buttons>

    </template>
  </Modal>
</template>


<script>
import Modal from "@/components/modal/Modal.vue";
import MedicationImage from "@/components/medication/MedicationImage.vue";
import MedicationLargeImage from "@/components/medication/MedicationLargeImage.vue";

export default {
  name: 'ViewPatientMedicationInfoModal',

  components: {MedicationLargeImage, MedicationImage, Modal},
  data() {
    return {
      medication: {
        medicationName: '',
        medicationNote: '',
        medicationDescription: '',
        medicationImageData: ''
      },
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
  }
}
</script>
