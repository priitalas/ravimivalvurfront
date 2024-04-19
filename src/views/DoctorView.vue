<template>
  <h2>Arsti / hooldaja töölaud</h2>
  <p></p>
  <p></p>
  <div>
    <div class="container">
      <div class="row mb-2">
        <div class="col col-lg-5">
          <h4> Patsiendid </h4>
        </div>
        <div class="col col-7">
          <h4>Raviplaanid</h4>
        </div>
      </div>
      <div class="row text-start">
        <div class="col col-5 justify-content-evenly">
          <input type="search" id="searchInput" v-model="searchValue" placeholder="Otsi patsienti"
                 class="light me-lg-1" name="q"/>
          <button @click="findSearchedPatient" type="button" class="btn btn-primary me-4">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
          </button>
          <button type="button" class="btn btn-primary m-lg-2 mt-2">Lisa uus patsient</button>
        </div>
      </div>
      <div class="row">
        <div class="col col-lg-5">
          <AlertDanger :message="errorMessage"/>
          <table v-if="patients.length>0" class="table table-hover mt-2 text-start table-responsive" id="patientTable">
            <thead>
            <tr>
              <th scope="col">Eesnimi</th>
              <th scope="col">Perekonnanimi</th>
              <th scope="col" style="width:15%"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="patient in patients" :key="patient.patientId">
              <td>{{ patient.firstName }}</td>
              <td>{{ patient.lastName }}</td>
              <td>
                <font-awesome-icon @click="showPatientMedicationPlan(patient_Id)"
                                   class="link-custom cursor-pointer me-lg-2"
                                   :icon="['fas', 'eye']"/>
                <font-awesome-icon @click="deactivatePatient(patient_Id)" class="link-custom cursor-pointer"
                                   :icon="['fas', 'trash']"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="col col-lg-7 justify-content-start mt-2">
          <div class="accordion" id="#accordionExample">
            <div class="accordion-item">
              <div class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Patsiendi raviplaan
                </button>
              </div>
              <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <PatientMedicationPlan ref="patientMedicationPlanRef" :isDoctor="isDoctor" :selectedPatientId="this.selectedPatientId"/>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Lisa raviplaan
                </button>
              </div>
              <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  Siia tuleb eraldi komponent raviplaani lisamiseks, kus on ka ravimite tabel ja ravimi lisamise nupp
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Ravimite võtmise logi
                </button>
              </div>
              <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  Siia tulevad andmed patsiendi raviplaani Id järgi logbook tabelist
                </div>
              </div>
            </div>
          </div>
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
      errorResponse: '',
      errorMessage: '',
      isDoctor: true,
      doctorId: sessionStorage.getItem('userId'),
      selectedPatientId: 0,
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
      this.selectedPatientId = this.patients.patientId
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