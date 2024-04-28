<template>
  <div class="doctorbackground-container">
    <AddPatientModal ref="addPatientModalRef" :doctorId="doctorId" @event-new-patient-added="handlePatientAdded"/>
    <DeletePatientFromListModal ref="deletePatientFromListModalRef"
                                @event-patient-deleted-from-list="handlePatientDeletedFromList"/>
    <DoctorPatientConnectingModal ref="DoctorPatientConnectingModal"
                                  @event-patient-accepted-doctor="handlePatientAdded"/>
    <h2>Arsti / hooldaja töölaud</h2>
    <p></p>
    <p></p>
    <div class="container">
      <div class="row">
        <div class="col col-lg-5">
          <table v-if="patients.length>0" class="table rounded-table table-hover mt-2 text-start table-responsive"
                 id="patientTable">
            <thead>
            <tr>
              <th colspan="5" style="text-align: center"><h4>Patsiendid</h4>
                <AlertDanger :message="errorMessage"/>
                <AlertSuccess :message="successMessage"/>
              </th>
            </tr>
            <tr>
              <th colspan="6" class="justify-content-evenly">
                <input type="text" v-model="searchedPatient" placeholder="Otsi patsienti"
                       class="light me-2"/>
                <button @click="findSearchedPatient" type="button" class="btn btn-primary me-2">
                  <font-awesome-icon :icon="['fas', 'magnifying-glass']"/>
                </button>
                <button @click="goToAddNewPatient" type="button" class="btn btn-primary m-lg-2 mt-2">Lisa uus patsient
                </button>
              </th>
            </tr>
            <tr>
              <th scope="col">Perekonnanimi</th>
              <th scope="col">Eesnimi</th>
              <th class="col-2 text-center">Raviinfo</th>
              <th class="col-2 text-center">Kirjuta</th>
              <th class="col-2 text-center">Kustuta</th>

            </tr>
            </thead>
            <tbody>
            <tr v-for="patient in sortedPatients" :key="patient.patientId"
                :class="{ 'table-secondary': patient.patientStatus === 'P' }">
              <td>{{ patient.lastName }}</td>
              <td>{{ patient.firstName }}</td>
              <td v-if="patient.patientStatus === 'A'" class="col-2 text-center">
                <font-awesome-icon
                    class="link-custom cursor-pointer"
                    @click="showPatientCompleteMedicationInfo(patient.patientId, patient.firstName, patient.lastName)"
                    :icon="['fas', 'eye']"/>
              </td>
              <td v-else class="col-2 text-center">
                kinnitamata
              </td>
              <td class="col-2 text-center">
              <font-awesome-icon class="link-custom cursor-pointer justify-content-center" :icon="['fas', 'envelope']" />
              </td>
              <td class="col-2 text-center">
                <font-awesome-icon @click="deletePatientFromDoctorsList(patient)"
                                   class="link-custom cursor-pointer justify-content-center"
                                   :icon="['fas', 'trash']"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="col col-lg-7 justify-content-start mt-2">
          <table class="table rounded-table">
            <thead>
            <tr>
              <th scope="col"><h4>Patsiendi raviinfo</h4></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <PatientCompleteMedicationInfo ref="patientCompleteMedicationInfoRef"/>
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
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AddPatientModal from "@/components/modal/patient/AddPatientModal.vue";
import DeletePatientFromListModal from "@/components/modal/patient/DeletePatientFromListModal.vue";
import PatientCompleteMedicationInfo from "@/components/PatientCompleteMedicationInfo.vue";
import DoctorPatientConnectingModal from "@/App.vue";

export default {
  name: "DoctorView",
  components: {
    DoctorPatientConnectingModal,
    PatientCompleteMedicationInfo,
    AddPatientModal, DeletePatientFromListModal,
    AlertDanger, AlertSuccess
  },

  data() {
    return {
      searchedPatient: '',
      search: false,
      errorResponse: '',
      errorMessage: '',
      successMessage: '',
      isDoctor: true,
      selectedPatientId: 0,
      selectedPatientFirstName: '',
      selectedPatientLastName: '',
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
        if (a.patientStatus !== b.patientStatus) {
          return a.patientStatus.localeCompare(b.patientStatus);
        }
        return a.lastName.localeCompare(b.lastName);
      });
    }
  },

  methods: {

    showPatientCompleteMedicationInfo(selectedPatientId, selectedPatientFirstName, selectedPatientLastName) {
      this.$refs.patientCompleteMedicationInfoRef.patientFirstName = selectedPatientFirstName
      this.$refs.patientCompleteMedicationInfoRef.patientLastName = selectedPatientLastName
      this.$refs.patientCompleteMedicationInfoRef.$refs.patientMedicationPlanRef.showPatientCompleteMedicationInfo = true
      this.$refs.patientCompleteMedicationInfoRef.$refs.patientMedicationLogbookRef.showPatientLogbook = true
      this.$refs.patientCompleteMedicationInfoRef.$refs.patientMedicationPlanRef.isDoctor = true
      this.$refs.patientCompleteMedicationInfoRef.$refs.patientMedicationPlanRef.patientId = selectedPatientId
      this.$refs.patientCompleteMedicationInfoRef.$refs.patientMedicationLogbookRef.patientId = selectedPatientId
      this.$refs.patientCompleteMedicationInfoRef.$refs.patientMedicationPlanRef.medicationPlans = []
      this.$refs.patientCompleteMedicationInfoRef.$refs.patientMedicationPlanRef.sendGetPatientMedicationPlan()
      this.$refs.patientCompleteMedicationInfoRef.$refs.patientMedicationLogbookRef.getPatientMedicationLogbook()
    },

    goToAddNewPatient() {
      this.$refs.addPatientModalRef.$refs.modalRef.openModal()
    },

    findSearchedPatient() {
      this.search = true
      this.executeGetDoctorPatients()
    },

    executeGetDoctorPatients() {
      if(this.search){
        this.sendGetSearchedPatientRequest
      } else {
        this.sendGetDoctorPatientsRequest
      }
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

    sendGetSearchedPatientRequest() {
      this.$http.get("doctor/patients/searched", {
            params: {
              doctorId: this.doctorId,
              query: this.searchedPatient
            }
          }
      ).then(response => {
        this.patients = response.data
      }).catch(error => {
        this.errorMessage = "Selliseid patsiente teil ei ole"
      })
    },

    deletePatientFromDoctorsList(selectedPatient) {
      this.$refs.deletePatientFromListModalRef.patientId = selectedPatient.patientId
      this.$refs.deletePatientFromListModalRef.lastName = selectedPatient.lastName
      this.$refs.deletePatientFromListModalRef.firstName = selectedPatient.firstName
      this.$refs.deletePatientFromListModalRef.doctorId = this.doctorId
      this.$refs.deletePatientFromListModalRef.$refs.modalRef.openModal()
    },

    handlePatientAdded(message) {
      this.successMessage = message
      setTimeout(this.resetMessages, 4000);
      this.sendGetDoctorPatientsRequest()
    },

    handlePatientDeletedFromList(message) {
      this.errorMessage = message
      setTimeout(this.resetMessages, 2000);
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