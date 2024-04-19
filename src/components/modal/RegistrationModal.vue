<template>
  <Modal ref="modalRef" @event-close-modal="resetAllInputFields">
    <template #title>
      Registreeru kasutajaks
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <AlertDanger :message="errorMessage"/>
            <div class="mb-3">
              <label for="firstname" class="form-label">Eesnimi</label>
              <input v-model="registrationRequest.firstName" type="text" class="form-control" id="firstname">
            </div>
            <div class="mb-3">
              <label for="lastname" class="form-label">Perekonnanimi</label>
              <input v-model="registrationRequest.lastName" type="text" class="form-control" id="lastname">
            </div>
            <div class="mb-3">
              <label for="contact" class="form-label">e-mail (valikuline)</label>
              <input v-model="registrationRequest.email" type="text" class="form-control" id="contact">
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">Kasutajanimi</label>
              <input v-model="registrationRequest.username" type="text" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Salasõna</label>
              <input v-model="registrationRequest.password" type="password" class="form-control" id="password">
            </div>
            <div class="mb-3">
              <div type="roleId" class="form-check form-check-inline">
                <input v-model="registrationRequest.roleId" class="form-check-input" type="radio" name="role" value="2"
                       id="patient">
                <label class="form-check-label" for="flexRadioDefault1">
                  Patsient
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="registrationRequest.roleId" class="form-check-input" type="radio" name="role" value="3"
                       id="doctor">
                <label class="form-check-label" for="flexRadioDefault2">
                  Hooldaja / Arst
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button @click="executeRegistration" type="submit" class="btn btn-primary text-center text-nowrap">Registreeru
      </button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/Alert/AlertDanger.vue";
import router from "@/router";

export default {
  name: 'RegistrationModal',
  components: {AlertDanger, Modal},

  data() {
    return {
      registrationRequest: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        roleId: 0
      },

      errorMessage: '',
      successMessage: '',

      errorResponse: {
        message: '',
        errorCode: ''
      }
    }
  },

  methods: {

    allRequiredFieldsWithCorrectInput() {
      return this.registrationRequest.firstName !== '' &&
          this.registrationRequest.lastName !== '' &&
          this.registrationRequest.username !== '' &&
          this.registrationRequest.password !== '' &&
          this.registrationRequest.roleId !== ''
    },

    executeRegistration() {
      if (this.allRequiredFieldsWithCorrectInput()) {
        this.registrationRequest.roleId = Number(this.registrationRequest.roleId)
        this.sendRegistrationRequest();
      } else {
        this.displayAllFieldsRequiredAlert()
      }
    },

    sendRegistrationRequest() {
      this.$http.post('/registration', this.registrationRequest
      ).then(response => {
        this.resetAllInputFields()
        this.$emit('event-successful-registration', 'Kasutaja on lisatud, logige sisse.')
        this.$refs.modalRef.closeModal()

      }).catch(error => {
        this.errorResponse = error.response.data
        this.handleError(error.response.status)
      })
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 333) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    displayAllFieldsRequiredAlert() {
      this.errorMessage = 'Täida kõik väljad!'
      setTimeout(this.resetMessage, 4000)
    },

    resetAllInputFields() {
      this.registrationRequest.firstName = ''
      this.registrationRequest.lastName = ''
      this.registrationRequest.username = ''
      this.registrationRequest.password = ''
      this.registrationRequest.email = ''
      this.registrationRequest.roleId = ''
    },

    resetMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },

  }
}
</script>