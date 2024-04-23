<template>
  <Modal ref="modalRef" class = modal-fullscreen>
    <template #title>
      Ravimi laiendatud info:
    </template>
    <template #body>
      <div>
         <h1> <img :src="selectedMedication.medicationImageData" alt="Medication Image" style="width: 300px"> </h1>
        <h2> Nimi: {{ selectedMedication.medicationName }}</h2>
        <h5>Tarvitamisjuhis:</h5>
        <h6> {{ selectedMedication.quantity }}</h6>
        <h6> {{ selectedMedication.medicationUnitName }}</h6>
        <h6> {{ selectedMedication.medicationNote }}</h6>


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
      selectedMedication: {}
    };
  },
  methods: {
    openModal(patientMedicationToTakeNow) {
      console.log("Received medication data:", patientMedicationToTakeNow);
      this.selectedMedication = patientMedicationToTakeNow;
      this.$refs.modalRef.openModal();
    }
  }
};
</script>
