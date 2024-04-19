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
                <font-awesome-icon @click="showPatientMedicationPlan = true, this.selectedPatientId=this.patient.patientId"
                                   class="link-custom cursor-pointer me-lg-2"
                                   :icon="['fas', 'eye']"/>
                <font-awesome-icon @click="deactivatePatient(patient.patientId)" class="link-custom cursor-pointer"
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
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                        aria-expanded="true" aria-controls="collapseOne">
                  Patsiendi raviplaan
                </button>
              </div>
              <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div v-if="showMedicationPlan" class="accordion-body">
                  <PatientMedicationPlan :isDoctor="isDoctor" :patientId="this.selectedPatientId"/>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Lisa raviplaan
                </button>
              </div>
              <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <AddPatientMedicationPlan/>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Ravimite võtmise logi
                </button>
              </div>
              <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <PatientMedicationLogbook/>
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
import AlertDanger from "@/components/Alert/AlertDanger.vue";
import PatientMedicationPlan from "@/components/PatientMedicationPlan.vue";
import AddPatientMedicationPlan from "@/components/AddPatientMedicationPlan.vue";
import PatientMedicationLogbook from "@/components/PatientMedicationLogbook.vue";

export default {
  name: "DoctorView",
  components: {PatientMedicationLogbook, AddPatientMedicationPlan, AlertDanger, PatientMedicationPlan, AlertSuccess},

  data() {
    return {
      searchValue: '',
      found: false,
      showMedicationPlan: false,
      errorResponse: '',
      errorMessage: '',
      isDoctor: true,
      selectedPatientId: 0,
      showPatientMedicationPlan: false,
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