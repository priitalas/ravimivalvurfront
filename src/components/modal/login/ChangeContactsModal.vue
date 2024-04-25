<template>
  <Modal ref="modalRef" @event-close-modal="resetAllInputFields">
    <template #title>
      Muuda oma kontakte
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
import AlertDanger from "@/components/alert/AlertDanger.vue";
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
      this.$http.put('/user', this.changeContactsRequest
      ).then(response => {
        this.resetAllInputFields()
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