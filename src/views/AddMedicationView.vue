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
          <input v-model="medicationName" type="text" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Kirjeldus</span>
          <textarea v-model="description" type="text" class="form-control"></textarea>
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">Lisainfo</span>
          <textarea v-model="note" type="text" class="form-control"></textarea>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mt-3">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" >
          Vali ühik
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
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
      medicationInfo:{
        medicationName: '',
        description: '',
        note: '',
        unitId: '',
        imageData: ''
      },
      errorMessage: '',
      successMessage: '',

      selectedUnitId: '',
      units: [
        {
          unitId: '',
          unitName: ''
        }
      ]
    }
  },

  methods: {

    sendUnitsRequest(){
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