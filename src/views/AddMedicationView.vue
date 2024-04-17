<template>
  <div class="container text-center">
    <AddUnitModal ref="addUnitModalRef" @event-new-unit-added="handleNewUnitAdded"/>
    <div class="row justify-content-lg-center">
      <div class="col col-4">
        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>
        <h2>Lisa uus ravim</h2>
      </div>
    </div>
    <div class="row justify-content-center mt-lg-5">
      <div class="col col-4 justify-content-center">
        <div class="input-group mb-3">
          <span class="input-group-text">Ravimi nimi</span>
          <input v-model="medicationInfo.medicationName" type="text" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Kirjeldus</span>
          <textarea v-model="medicationInfo.description" type="text" class="form-control"></textarea>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Lisainfo (vajadusel)</span>
          <input v-model="medicationInfo.note" type="text" class="form-control">
        </div>
        <div class="row align-bottom mt-lg-3">
          <div class="col col-4 justify-content-evenly align-bottom">
            <select v-model="medicationInfo.unitId" @change="handleUnitChange" class="form-select">
              <option selected :value="0">Vali ühik</option>
              <option v-for="unit in units" :value="unit.unitId" :key="unit.unitId">{{ unit.unitName }}</option>
              <option selected :value="-1">-Lisa ühik-</option>
            </select>
          </div>
          <div class="col col-8 justify-content-evenly">
            <ImageInput @event-new-image-file-selected="setImageData"/>
          </div>
        </div>
        <div class="row justify-content-start mt-lg-5">
          <div class="col col-6 text-nowrap">
            <button @click="navigateToDoctorView" type="button" class="btn btn-dark me-3 ">Tagasi</button>
            <button @click="getAndSetMedicationInfo" type="button" class="btn btn-primary me-3">Salvesta</button>
          </div>
        </div>
      </div>
      <div class="col col-4">
        <MedicationImage :image-data="medicationInfo.medicationImage"/>
      </div>
    </div>
  </div>
</template>

<script>
import AlertDanger from "@/components/Alert/AlertDanger.vue";
import AlertSuccess from "@/components/Alert/AlertSuccess.vue";
import router from "@/router";
import ImageInput from "@/components/ImageInput.vue";
import MedicationImage from "@/components/MedicationImage.vue";
import AddUnitModal from "@/components/modal/AddUnitModal.vue";

export default {
  name: "AddMedicationView",
  components: {AddUnitModal, MedicationImage, ImageInput, AlertSuccess, AlertDanger},

  data() {
    return {
      medicationInfo: {
        medicationName: '',
        description: '',
        note: '',
        unitId: 0,
        medicationImage: ''
      },
      errorMessage: '',
      successMessage: '',

      units: [
        {
          unitId: 0,
          unitName: ''
        }
      ]
    }
  },

  methods: {

    handleNewUnitAdded(addedUnitId) {
      // todo too ära dropdowni andmed ja muuda ära selected unit Id
      this.sendGetUnitsRequest()
      this.medicationInfo.unitId = addedUnitId
    },

    handleUnitChange() {
      if (this.medicationInfo.unitId < 0) {
        this.$refs.addUnitModalRef.$refs.modalRef.openModal()
      }
    },


    sendGetUnitsRequest() {
      this.$http.get('/units')
          .then(response => {
            this.units = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    getAndSetMedicationInfo() {
      if (this.allRequiredFieldsWithCorrectInput()) {
        this.sendMedicationInfo();
      } else {
        this.displayAllFieldsRequiredAlert()
      }
    },

    sendMedicationInfo() {
      this.$http.post('/medication', this.medicationInfo
      ).then(response => {
        this.successMessage = "Ravim lisatud"
        setTimeout(this.resetMessages, 4000)
        this.resetAllInputFields()
      }).catch(error => {
        this.errorResponse = error.response.data
        this.handleError(error.response.status)
      })
    },

    navigateToDoctorView() {
      router.push({name: "doctorRoute"})
    },

    allRequiredFieldsWithCorrectInput() {
      return this.medicationInfo.medicationName !== '' &&
          this.medicationInfo.description !== '' &&
          this.medicationInfo.unitId !== 0 &&
          this.medicationInfo.medicationImage !== ''
    },

    displayAllFieldsRequiredAlert() {
      this.errorMessage = 'Täida kõik nõutud väljad!'
      setTimeout(this.resetMessage, 4000)
    },

    setImageData(imageData) {
      this.medicationInfo.medicationImage = imageData
    },

    resetAllInputFields() {
      this.medicationInfo.medicationName = '',
          this.medicationInfo.description = '',
          this.medicationInfo.note = '',
          this.medicationInfo.unitId = 0,
          this.medicationInfo.medicationImage = '';
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 444) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    resetMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    }

  },
  beforeMount() {
    this.sendGetUnitsRequest()
  }
}
</script>