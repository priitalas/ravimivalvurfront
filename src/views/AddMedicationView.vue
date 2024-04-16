<template>
  <div class="container text-center">
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
          <span class="input-group-text">Lisainfo</span>
          <input v-model="medicationInfo.note" type="text" class="form-control">
        </div>
        <div class="row align-bottom mt-lg-3">
          <div class="col col-4 justify-content-evenly align-bottom">
            <select v-model="medicationInfo.selectedUnitId" class="form-select">
              <option selected value="0">Vali ühik</option>
              <option v-for="unit in units" :value="unit.unitId" :key="unit.unitId">{{ unit.unitName }}</option>
            </select>
          </div>
          <div class="col col-8 justify-content-evenly">
            <ImageInput @event-new-image-file-selected="setImageData"/>
          </div>
        </div>
        <div class="row justify-content-start mt-lg-5">
          <div class="col col-6">
            <button @click="navigateToDoctorView" type="button" class="btn btn-dark me-3">Loobu</button>
            <button @click="getAndSetMedicationInfo" type="button" class="btn btn-primary me-3">Salvesta</button>
          </div>
        </div>
      </div>
      <div class="col col-4">
        <MedicationImage :image-data="medicationInfo.imageData"/>
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

export default {
  name: "AddMedicationView",
  components: {MedicationImage, ImageInput, AlertSuccess, AlertDanger},

  data() {
    return {
      medicationInfo: {
        medicationName: '',
        description: '',
        note: '',
        selectedUnitId: 0,
        imageData: ''
      },
      errorMessage: '',
      successMessage: '',

      selectedUnitId: '',
      units: [
        {
          unitId: 0,
          unitName: ''
        }
      ]
    }
  },

  methods: {

    sendUnitsRequest() {
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
      this.$http.post('/add-medication', this.medicationInfo
      ).then(response => {
        this.resetAllInputFields()
        this.successMessage = "Ravim lisatud"
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
          this.medicationInfo.selectedUnitId !== 0 &&
          this.medicationInfo.imageData !== ''
    },

    displayAllFieldsRequiredAlert() {
      this.errorMessage = 'Täida kõik väljad!'
      setTimeout(this.resetMessage, 4000)
    },

    setImageData(imageData) {
      this.medicationInfo.imageData = imageData
    },

    resetAllInputFields() {
      this.medicationInfo.medicationName = '',
          this.medicationInfo.description = '',
          this.medicationInfo.note = '',
          this.medicationInfo.selectedUnitId = 0,
          this.medicationInfo.imageData = '';
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 444) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

  },
  beforeMount() {
    this.sendUnitsRequest()
  }
}
</script>