<template>
  <Modal ref="modalRef" @event-close-modal="resetAllInputFields">
    <template #title>
      Muuda oma andmeid
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <div class="mb-3">
              <label for="firstname" class="form-label">Eesnimi</label>
              <input v-model="changeContactsRequest.firstName" type="text" class="form-control" id="firstname">
            </div>
            <div class="mb-3">
              <label for="lastname" class="form-label">Perekonnanimi</label>
              <input v-model="changeContactsRequest.lastName" type="text" class="form-control" id="lastname">
            </div>
            <div class="mb-3">
              <label for="contact" class="form-label">e-mail</label>
              <input v-model="changeContactsRequest.email" type="text" class="form-control" id="contact">
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">Kasutajanimi</label>
              <input v-model="changeContactsRequest.username" type="text" class="form-control" id="username">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Salasõna</label>
              <input v-model="changeContactsRequest.password" type="password" class="form-control" id="password">
            </div>
            <div class="mb-3">
              <div type="roleId" class="form-check form-check-inline">
                <input v-model="changeContactsRequest.roleId" class="form-check-input" type="radio" name="role"
                       value="2"
                       id="patient">
                <label class="form-check-label" for="flexRadioDefault1">
                  Patsient
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input v-model="changeContactsRequest.roleId" class="form-check-input" type="radio" name="role"
                       value="3"
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
      <button @click="sendChangeContactsRequest" type="submit" class="btn btn-primary text-center text-nowrap">Salvesta
      </button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/Alert/AlertDanger.vue";
import router from "@/router";

export default {
  name: 'ChangeContactsModal',
  components: {AlertDanger, Modal},

  data() {
    return {
      changeContactsRequest: {
        userId: sessionStorage.getItem('userId'),
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

    sendChangeContactsRequest() {
      this.changeContactsRequest.roleId = Number(this.changeContactsRequest.roleId)
      this.$http.put('/registration', this.changeContactsRequest
      ).then(response => {
        this.resetAllInputFields()
        this.$emit('event-contacts-successfully-changed', 'Teie andmed on muudetud')
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

    resetAllInputFields() {
      this.changeContactsRequest.firstName = ''
      this.changeContactsRequest.lastName = ''
      this.changeContactsRequest.username = ''
      this.changeContactsRequest.password = ''
      this.changeContactsRequest.email = ''
      this.changeContactsRequest.roleId = ''
    },

    resetMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },

  }
}
</script>