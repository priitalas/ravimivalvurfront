<template>
  <Modal ref="modalRef">
    <template #title>
      Ravimi laiendatud info:
    </template>
    <template #body>
      <div>
        <h6>
          <MedicationLargeImage :image-data="medication.medicationImageData"/>
        </h6>
        <h5> Nimi: {{ medication.medicationName }}</h5>
        <h5> Tarvitamisjuhis:</h5>
        <h5 textarea class="form-control"> {{ medication.medicationNote }}</h5>
        <h6 textarea class="form-control"> {{ medication.medicationDescription }}</h6>

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
