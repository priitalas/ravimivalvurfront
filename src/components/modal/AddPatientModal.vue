<template>
  <Modal ref="modalRef" @event-close-modal="resetAllInputFields">
    <template #title>
      Lisa patsient
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <AlertDanger :message="errorMessage"/>
            <AlertSuccess :message="successMessage"/>
            <div class="mb-3">
              <select class="form-select">
                <option selected>Vali patsient</option>
                <option v-for="patient in patients" :value="patient.patientId" :key="patient.patientId">{{ patient.firstName }} {{ patient.lastName }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button @click="executeAddNewPatient" type="submit" class="btn btn-primary text-center text-nowrap">Salvesta
      </button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";
import AlertDanger from "@/components/Alert/AlertDanger.vue";
import AlertSuccess from "@/components/Alert/AlertSuccess.vue";

export default {
  name: "AddPatientModal",
  components: {Modal, AlertSuccess, AlertDanger},

  data() {
    return {
      doctorId: sessionStorage.getItem('userId'),
      patients: {
        patientId: 0,
        firstName: '',
        lastName: '',
      },
      successMessage: '',
      errorMessage: '',
      addedPatientId: 0,
      errorResponse: {
        message: '',
        errorCode: ''
      }
    }
  },

  methods: {

    sendGetPatientsNotInDoctorsList() {
      this.$http.get("/patients/nonactive", {
            params: {
              doctorId: this.doctorId
            }
          }
      ).then(response => {
            this.patients = response.data
          })
          .catch(error => {
            const errorResponseBody = error.response.data
          })
    },


    sendPostPatientRequest() {
      this.$http.post('/doctor/', null, {
            params: {
              patientId: this.addedPatientId
            }
          }
      ).then(response => {
        this.resetAllInputFields()
        this.$refs.modalRef.closeModal()

      }).catch(error => {
        this.errorResponse = error.response.data
        this.handleError(error.response.status)
      })
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 555) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },


    resetMessages() {
      this.unitName = ''
    }

  },

  beforeMount() {
    this.sendGetPatientsNotInDoctorsList()
  }
}
</script>


