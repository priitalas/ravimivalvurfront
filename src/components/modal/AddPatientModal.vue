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
              <select v-model="addedPatientId" class="form-select">
                <option selected>Vali patsient</option>
                <option v-for="patient in patients" :value="patient.patientId" :key="patient.patientId">
                  {{ patient.firstName }} {{ patient.lastName }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button @click="sendPostNewPatientToDoctorList" type="submit" class="btn btn-primary text-center text-nowrap">Lisa
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
      addedPatientId: 0,
      patients: [
        {
          patientId: 0,
          firstName: '',
          lastName: '',
        }
      ],
      successMessage: '',
      errorMessage: '',
      errorResponse: {
        message: '',
        errorCode: ''
      }
    }
  },

  methods: {

    sendGetPatientsNotInDoctorsList() {
      this.$http.get("/doctor/patients/newpatient", {
            params: {
              doctorId: this.doctorId
            }
          }
      ).then(response => {
        this.patients = response.data
      })
          .catch(error => {
            this.errorResponse = error.response.data
            this.handleError(error.response.status)
          })
    },


    sendPostNewPatientToDoctorList() {
      this.$http.post('/patient', null, {
            params: {
              patientId: this.addedPatientId,
              doctorId: this.doctorId
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
      if (statusCode === 403 && this.errorResponse.errorCode === 888) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },


    resetMessages() {
      this.errorMessage = ''
    }

  },

  beforeMount() {
    this.sendGetPatientsNotInDoctorsList()
  }
}
</script>


