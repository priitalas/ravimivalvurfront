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
            <button @click="findSearchedPatient" type="button" class="btn btn-primary me-4">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
            </button>
            <button type="button" class="btn btn-primary m-lg-2">Lisa uus patsient</button>
          </div>
          <AlertDanger :message="errorMessage"/>
        </div>
        <div class="col col-7">
          <h4>Raviplaanid</h4>
          <div class="justify-content-start">
            <button @click="goToAddMedication" type="button" class="btn btn-primary m-lg-2">Lisa uus raviplaan</button>
            <button @click="goToAddMedication" type="button" class="btn btn-primary m-lg-2">Lisa uus ravim</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col col-lg-5">
          <table v-if="patients.length>0" class="table table-hover mt-2 text-start" id="patientTable">
            <thead>
            <tr>
              <th scope="col">Eesnimi</th>
              <th scope="col">Perekonnanimi</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="patient in patients" :key="patient.patientId">
              <td>{{ patient.firstName }}</td>
              <td>{{ patient.lastName }}</td>
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
        <div v-if="showMedicationPlan" class="col col-lg-7 justify-content-start mt-2">
          <PatientMedicationPlan ref="patientMedicationPlanRef"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import AlertSuccess from "@/components/Alert/AlertSuccess.vue";
import PatientMedicationPlan from "@/components/PatientMedicationPlan.vue";
import AlertDanger from "@/components/Alert/AlertDanger.vue";

export default {
  name: "DoctorView",
  components: {AlertDanger, PatientMedicationPlan, AlertSuccess},

  data() {
    return {
      searchValue: '',
      found: false,
      showMedicationPlan: false,
      errorResponse:'',
      errorMessage:'',
      doctorId: sessionStorage.getItem('userId'),
      patients: [
        {
          patientId: 0,
          firstName: '',
          lastName: ''
        }
      ]
    };
  },

  methods: {
    goToAddMedication() {
      router.push({name: 'addMedicationRoute'})
    },

    sendGetDoctorActivePatientsRequest() {
      this.$http.get("/patients", {
            params: {
              doctorId: this.doctorId
            }
          }
      ).then(response => {
        this.patients = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
        this.handleError(error.response.status)
      })
    },

    showPatientMedicationPlan() {
      this.showMedicationPlan = true
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 666) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    }
  },

  beforeMount() {
    this.sendGetDoctorActivePatientsRequest();
  }
}

</script>