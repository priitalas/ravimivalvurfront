<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col col-6">
        <AlertDanger :message="errorMessage"/>
        <AlertSuccess :message="successMessage"/>
        <h1>Lisa uus ravim</h1>
      </div>
      <div class="col col-8">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Ravimi nimi</span>
          <input v-model="medicationName" type="text" class="form-control" aria-describedby="basic-addon1">

          <span class="input-group-text" id="basic-addon1">Kirjeldus</span>
          <textarea v-model="description" type="text"></textarea>

        </div>
      </div>
      <div class="col">
        Pildi lisamise koht
      </div>
    </div>
  </div>
</template>


<script>
import AlertDanger from "@/components/Alert/AlertDanger.vue";
import AlertSuccess from "@/components/Alert/AlertSuccess.vue";

export default {
  name: "AddMedicationView",
  components: {AlertSuccess, AlertDanger},

  data() {
    return {
      medicationName: '',
      description: '',
      note: '',
      unitId: '',
      imageData: '',
      errorMessage: '',
      successMessage: ''
    }
  }
}
</script>
