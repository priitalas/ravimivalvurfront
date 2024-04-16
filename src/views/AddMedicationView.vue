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
      <div class="col col-5 justify-content-start">
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
        <div class="col col-5 justify-content-start">
          <select v-model="medicationInfo.unitId" class="form-select">
            <option selected value="0">Vali ühik</option>
            <option v-for="unit in units" :value="unit.unitId" :key="unit.unitId">{{ unit.unitName }}</option>
          </select>
        </div>
        <div class="col col-7 justify-content-start">
          <label for="imageData" class="form-label" accept="image/x-png,image/jpeg,image/gif">Vali pilt</label>
          <input class="form-control" type="file" id="imageData">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AlertDanger from "@/components/Alert/AlertDanger.vue";
import AlertSuccess from "@/components/Alert/AlertSuccess.vue";
import router from "@/router";

export default {
  name: "AddMedicationView",
  components: {AlertSuccess, AlertDanger},

  data() {
    return {
      medicationInfo: {
        medicationName: '',
        description: '',
        note: '',
        unitId: 0,
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
    }
  },
  beforeMount() {
    this.sendUnitsRequest()
  }
}
</script>