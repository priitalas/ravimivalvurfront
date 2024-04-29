<template>
  <Modal ref="modalRef" @event-close-modal="resetAllInputFields">
    <template #title>
      Muuda oma kontakte
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <AlertDanger :message="errorMessage"/>
            <div class="mb-3">
              <label for="firstname" class="form-label">Eesnimi</label>
              <input v-model="userContactInfo.firstName" type="text" class="form-control" id="firstname">
            </div>
            <div class="mb-3">
              <label for="lastname" class="form-label">Perekonnanimi</label>
              <input v-model="userContactInfo.lastName" type="text" class="form-control" id="lastname">
            </div>
            <div class="mb-3">
              <label for="contact" class="form-label">e-mail</label>
              <input v-model="userContactInfo.email" type="text" class="form-control" id="contact">
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button @click="executeContactsChange" type="submit" class="btn btn-primary text-center text-nowrap">Salvesta
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
      userId: sessionStorage.getItem('userId'),

      changeContactsRequest: {
        userId: sessionStorage.getItem('userId'),
        firstName: '',
        lastName: '',
        email: '',
      },

      userContactInfo: {
        firstName: '',
        lastName: '',
        email: '',
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

    handleOpenChangeContactsModal() {
      this.userId = sessionStorage.getItem('userId')
      this.sendGetUserContactInfo()
      this.$refs.modalRef.openModal()
    },

    sendGetUserContactInfo() {
      this.$http.get("/user", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.userContactInfo = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    allRequiredFieldsWithCorrectInput() {
      return this.userContactInfo.firstName !== '' &&
          this.userContactInfo.lastName !== ''
    },

    executeContactsChange() {
      if (this.allRequiredFieldsWithCorrectInput()) {
        this.changeContactsRequest.firstName = this.userContactInfo.firstName
        this.changeContactsRequest.lastName = this.userContactInfo.lastName
        this.changeContactsRequest.email = this.userContactInfo.email

        this.$http.put('/user', this.changeContactsRequest
        ).then(response => {
          this.resetAllInputFields()
          this.$refs.modalRef.closeModal()

        }).catch(error => {
          this.errorResponse = error.response.data
          this.handleError(error.response.status)
        })
      } else {
        this.displayAllFieldsRequiredAlert()
      }
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
      this.changeContactsRequest.firstName = ''
      this.changeContactsRequest.lastName = ''
      this.changeContactsRequest.email = ''
    },

    resetMessages() {
      this.successMessage = ''
      this.errorMessage = ''
    },
  },

  }
</script>