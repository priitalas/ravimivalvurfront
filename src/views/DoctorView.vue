<template>
  <AddPatientModal ref="addPatientModalRef" :doctorId="doctorId" @event-new-patient-added="handlePatientAdded" />
  <h2>Arsti / hooldaja töölaud</h2>
  <p></p>
  <p></p>
  <div>
    <div class="container">
      <div class="row text-start">
        <div class="col col-5 justify-content-evenly">
          <input type="search" id="searchInput" v-model="searchValue" placeholder="Otsi patsienti"
                 class="light me-lg-1" name="q"/>
          <button @click="findSearchedPatient" type="button" class="btn btn-primary me-4">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
          </button>
          <button @click="goToAddNewPatient" type="button" class="btn btn-primary m-lg-2 mt-2">Lisa uus patsient</button>
        </div>
      </div>
      <div class="row">
        <div class="col col-lg-5">
          <AlertDanger :message="errorMessage"/>
          <AlertSuccess :message="successMessage"/>
          <table v-if="patients.length>0" class="table table-hover mt-2 text-start table-responsive" id="patientTable">
            <thead>
            <tr>
              <th colspan="4"><h4>Patsiendid</h4></th>
            </tr>
            <tr>
              <th scope="col">Perekonnanimi</th>
              <th scope="col">Eesnimi</th>
              <th scope="col" style="width:10%"></th>
              <th scope="col" style="width:10%"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="patient in sortedPatients" :key="patient.patientId" :class="{ 'table-secondary': patient.patientStatus === 'P' }">
              <td>{{ patient.lastName }}</td>
              <td>{{ patient.firstName }}</td>
              <td v-if="patient.patientStatus === 'A'">
                <font-awesome-icon @click="showPatientMedicationPlan = true, selectedPatientId =patient.patientId"
                                   class="link-custom cursor-pointer me-lg-2"
                                   :icon="['fas', 'eye']"/>
              </td>
              <td v-else>
                kinnitamata
              </td>
              <td>
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
                <div class="accordion-body">
                  <PatientMedicationPlan :isDoctor="isDoctor" :patientId="selectedPatientId"/>
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
import AddPatientModal from "@/components/modal/AddPatientModal.vue";

export default {
  name: "DoctorView",
  components: {
    AddPatientModal,
    PatientMedicationLogbook, AddPatientMedicationPlan, AlertDanger, PatientMedicationPlan, AlertSuccess},

  data() {
    return {
      searchValue: '',
      found: false,
      errorResponse: '',
      errorMessage: '',
      successMessage: '',
      isDoctor: true,
      selectedPatientId: 0,
      showPatientMedicationPlan: false,
      doctorId: sessionStorage.getItem('userId'),
      patients: [
        {
          patientId: 0,
          firstName: '',
          lastName: '',
          patientStatus: ''
        }
      ],
    };
  },

  computed: {
    sortedPatients() {
      return this.patients.sort((a, b) => {
        if (a.status === b.status) {
          return a.lastName.localeCompare(b.lastName);
        } else {
          return a.status.localeCompare(b.status);
        }
      });
    }
  },

  methods: {

    goToAddNewPatient(){
      this.$refs.addPatientModalRef.$refs.modalRef.openModal()
    },

    goToAddMedication() {
      router.push({name: 'addMedicationRoute'})
    },

    sendGetDoctorPatientsRequest() {
      this.$http.get("doctor/patients", {
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

    handlePatientAdded(message){
      this.successMessage = message
      setTimeout(this.resetMessages, 4000);
      this.sendGetDoctorPatientsRequest()
    },


    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 666) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    resetMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    }
  },

  beforeMount() {
    this.sendGetDoctorPatientsRequest();
  }
}

</script>