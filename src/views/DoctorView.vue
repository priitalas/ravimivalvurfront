<template>
  <h2>Arsti / hooldaja töölaud</h2>
  <p></p><p></p>
  <div>
    <div class="container text-start">
      <div class="row">
        <div class="col col-lg-3">
          <h4> PATSIENDID </h4>
        </div>
        <div class="col col-lg-2">
          <button type="button" class="btn btn-primary">Lisa uus patsient</button>
        </div>
        <div class="col col-lg-5">
          <h4> RAVIMID</h4>
         </div>
        <div class="col col-lg-2">
          <button @click="goToAddMedication" type="button" class="btn btn-primary">Lisa uus ravim</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import AlertSuccess from "@/components/Alert/AlertSuccess.vue";

export default {
  name: "DoctorView",
  components: {AlertSuccess},

  methods: {
    goToAddMedication(){
      router.push({name: 'addMedicationRoute'})
    }
  }

}

</script>