<template>
  <ModalLarge ref="modalLargeRef">
    <template #title>
      Ravim {{ medication.medicationName }}
    </template>
    <template #body>
      <div>
        <MedicationLargeImage :image-data="medication.medicationImageData"/>
        <p></p>
        <h5>Milleks määratud ja tarvitamisjuhised:</h5>
        <div class="bigtext-center"> {{ medication.medicationDescription }}</div>
        <div class="bigtext-center"> {{ medication.medicationNote }}</div>
      </div>
    </template>
    <template #buttons>

    </template>
  </ModalLarge>
</template>


<script>
import MedicationImage from "@/components/medication/MedicationImage.vue";
import MedicationLargeImage from "@/components/medication/MedicationLargeImage.vue";
import ModalLarge from "@/components/modal/ModalLarge.vue";
import router from "@/router";

export default {
  name: 'ViewPatientMedicationInfoModal',

  components: {MedicationLargeImage, MedicationImage, ModalLarge},
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
            this.$refs.modalLargeRef.openModal();
          })
          .catch(error => {
            router.push({name: 'errorRoute'})
          })
    },
  }
}
</script>
