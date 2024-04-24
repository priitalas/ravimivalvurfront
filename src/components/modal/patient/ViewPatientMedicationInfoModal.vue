<template>
  <Modal ref="modalRef" class = modal-fullscreen>
    <template #title>
      Ravimi laiendatud info:
    </template>
    <template #body>
      <div>
         <h1> <img :src="medication.medicationImageData" alt="Medication Image" style="width: 300px"> </h1>
        <h2> Nimi: {{ medication.medicationName }}</h2>
        <h5>Tarvitamisjuhis:</h5>
        <h6> {{ medication.quantity }}</h6>
        <h6> {{ medication.medicationUnitName }}</h6>
        <h6> {{ medication.medicationNote }}</h6>


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
    openModal(medicationId) {
      // medicationId === 1
      // todo: too ära backendist konkreetse ravimi kogu info kasutades medicationId
      //  GET /medication?medicationId=1
      //  GET /medication/1

      this.$refs.modalRef.openModal();
    }
  }
};
</script>
