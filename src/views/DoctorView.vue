<template>
  <h2>Arsti / hooldaja töölaud</h2>
  <p></p>
  <p></p>
  <div>
    <div class="container justify-content-start">
      <div class="row mb-2">
        <div class="col col-lg-5">
          <h4> Patsiendid </h4>
          <div>
            <input type="search" id="searchInput" v-model="searchValue" placeholder="Otsi patsienti"
                   class="light me-lg-1" name="q"/>
            <button @click="findPatientFromSearch" type="button" class="btn btn-primary me-4">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
            </button>
            <button type="button" class="btn btn-primary m-lg-2">Lisa uus patsient</button>
          </div>
        </div>
        <div class="col col-lg-5">
          <h4> Ravimiplaanid</h4>
        </div>
        <div class="col col-lg-2">
          <button @click="goToAddMedication" type="button" class="btn btn-primary">Lisa uus ravim</button>
        </div>
      </div>
      <div class="row">
        <div class="col col-lg-5 justify-content-start">
          <table class="table table-hover mt-2 text-start" id="patientTable">
            <thead>
            <tr>
              <th scope="col">Eesnimi</th>
              <th scope="col">Perekonnanimi</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Siia tuleb eesnimi</td>
              <td>Siia tuleb perekonnanimi</td>
              <td>
                <font-awesome-icon @click="showPatientMedicationPlan(patient_Id)" class="link-primary cursor-pointer"
                                   :icon="['fas', 'eye']"/>
              </td>
              <td>
                <font-awesome-icon @click="deactivatePatient(patient_Id)" class="link-primary cursor-pointer"
                                   :icon="['fas', 'trash']"/>
              </td>
            </tr>
            </tbody>
          </table>
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

  data() {
    return {
      searchValue: '',
      found: false
    };
  },

  methods: {
    goToAddMedication() {
      router.push({name: 'addMedicationRoute'})
    },

    findPatientFromSearch() {
      let searchValue = this.searchValue.trim().toLowerCase();
      let rows = document.getElementById("patientTable").getElementsByTagName("tr");
      let found = false

      for (let i = 0; i < rows.length; i++) {
        let firstName = rows[i].getElementsByTagName("td")[0];
        let lastName = rows[i].getElementsByTagName("td")[1];

        if (firstName && lastName) {
          let firstNameText = firstName.textContent.trim().toLowerCase();
          let lastNameText = lastName.textContent.trim().toLowerCase();

          if (firstNameText.includes(searchValue) || lastNameText.includes(searchValue)) {
            rows[i].classList.add("active");
            rows[i].scrollIntoView({block: 'center'});
            found = true;
          } else {
            rows[i].classList.remove("active");
          }
        }
      }
    }
  },

}

</script>