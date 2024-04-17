<template>
  <h2>Arsti / hooldaja töölaud</h2>
  <p></p>
  <p></p>
  <div>
    <div class="container justify-content-start">
      <div class="row">
        <div class="col col-lg-3 g-0">
          <h4> Patsiendid </h4>
          <div>
            <input type="search" placeholder="Otsi patsienti" class="light" name="q"/>
            <button type="submit" class="btn btn-primary">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
            </button>
            <table class="table table-hover mt-2 text-start">
              <thead>
              <tr>
                <th scope="col">Eesnimi</th>
                <th scope="col">Perekonnanimi</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col col-lg-2 g-0">
          <button type="button" class="btn btn-primary">Lisa uus patsient</button>
        </div>
        <div class="col col-lg-5 g-0">
          <h4> Ravimiplaanid</h4>
        </div>
        <div class="col col-lg-2 g-0">
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
    goToAddMedication() {
      router.push({name: 'addMedicationRoute'})
    }
  }

}

</script>