<template>
  <AddPatientModal ref="addPatientModalRef" :doctorId="doctorId" @event-new-patient-added="handlePatientAdded" />
 <!-- <DeletePatientFromListModal ref="deletePatientFromListModalRef"
                              :patientId="patient.patientId"
                              :firstName="patient.firstName"
                              :lastName="patient.lastName"
                              @event-patient-deleted-from-list="handlePatientDeletedFromList" /> -->
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
              <th colspan="2" style="width:20%; text-align: center; justify-content: center;">Vaata / Kustuta</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="patient in sortedPatients" :key="patient.patientId" :class="{ 'table-secondary': patient.patientStatus === 'P' }">
              <td>{{ patient.lastName }}</td>
              <td>{{ patient.firstName }}</td>
              <td v-if="patient.patientStatus === 'A'" style="width:10%; text-align: center; justify-content: center;">
                <font-awesome-icon @click="showPatientCompleteMedicationInfo = true; selectedPatientId = patient.patientId"
                                   class="link-custom cursor-pointer me-lg-2"
                                   :icon="['fas', 'eye']"/>
              </td>
              <td v-else style="width:10%; text-align: center; justify-content: center;">
                kinnitamata
              </td>
              <td>
                <font-awesome-icon  class="link-custom cursor-pointer"
                                   :icon="['fas', 'trash']"/>
                <!-- @click="deletePatientFromDoctorsList()" -->
              </td>

            </tr>
            </tbody>
          </table>
        </div>
        <div class="col col-lg-7 justify-content-start mt-2">
          <PatientCompleteMedicationInfo :patientId="selectedPatientId" :isDoctor="isDoctor" :showPatientCompleteMedicationInfo="showPatientCompleteMedicationInfo"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import router from "@/router";
import AlertSuccess from "@/components/Alert/AlertSuccess.vue";
import AlertDanger from "@/components/Alert/AlertDanger.vue";
import AddPatientModal from "@/components/modal/patient/AddPatientModal.vue";
import DeletePatientFromListModal from "@/components/modal/patient/DeletePatientFromListModal.vue";
import PatientCompleteMedicationInfo from "@/components/PatientCompleteMedicationInfo.vue";

export default {
  name: "DoctorView",
  components: {
    PatientCompleteMedicationInfo,
    AddPatientModal, DeletePatientFromListModal,
    AlertDanger, AlertSuccess},

  data() {
    return {
      searchValue: '',
      found: false,
      errorResponse: '',
      errorMessage: '',
      successMessage: '',
      isDoctor: true,
      selectedPatientId: 0,
      showPatientCompleteMedicationInfo: false,
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

    deletePatientFromDoctorsList(){
      this.$refs.deletePatientFromListModalRef.$refs.modalRef.openModal()
    },

    handlePatientAdded(message){
      this.successMessage = message
      setTimeout(this.resetMessages, 4000);
      this.sendGetDoctorPatientsRequest()
    },

    handlePatientDeletedFromList(message){
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