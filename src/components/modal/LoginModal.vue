<template>
  <div>
    <Modal ref="modalRef" @event-close-modal="resetAllInputFields" >
      <template #title>
        Logi sisse
      </template>

      <template #body>
        <div class="container text-start">
          <div class="row justify-content-center">
            <div class="col">
              <div class="mb-3">
                <label for="username" class="form-label">Ees- ja perekonnanimi</label>
                <input v-model="username" type="text" class="form-control" id="username">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Salasõna</label>
                <input v-model="password" type="password" class="form-control" id="password">
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #buttons>
        <button @click="openRegistrationModal" type="submit" class="btn btn-warning text-center text-nowrap">Loo uus
          kasutaja
        </button>
        <button @click="executeLogIn" type="submit" class="btn btn-primary text-center text-nowrap">Logi sisse</button>
      </template>

    </Modal>
    <Modal ref="registrationModalRef">
    </Modal>

  </div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import RegistrationModal from "@/components/modal/RegistrationModal.vue";
import router from "@/router";

export default {
  name: "LoginModal",
  components: {RegistrationModal, Modal},

  data() {
    return {
      username: '',
      password: '',
      message: '',
      isRegistered: false,
      loginResponse: {
        userId: 0,
        roleName: '',
        userStatus: ''
      },
      errorResponse: {
        message: '',
        errorCode: ''
      }
    }


  },
  methods: {
    openRegistrationModal() {
      //this.isRegistered = true;
      this.$refs.modalRef.closeModal();
      this.$refs.registrationModalRef.openModal();

    },
    executeLogIn() {
      if (this.allFieldsWithCorrectInput()) {
        this.sendLoginRequest()
      } else {
        this.displayAllFieldsRequiredAlert();
      }
    },
    allFieldsWithCorrectInput() {
      return this.username.length > 0 && this.password.length > 0;
    },
    displayAllFieldsRequiredAlert() {
      this.message = "Täida kõik väljad!";
      setTimeout(this.resetMessage, 4000);
    },
    sendLoginRequest() {
      this.$http.get('/login', {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        sessionStorage.setItem('roleName', this.loginResponse.roleName)
        sessionStorage.setItem('userStatus', this.loginResponse.userStatus)
        this.$emit('event-update-nav-menu')
        this.resetAllInputFields()
        this.$refs.modalRef.closeModal()
      })
          .catch(error => {
            this.errorResponse = error.response.data
            this.handleError(error.response.status)
          })
    },
    resetAllInputFields() {
      this.username = ''
      this.password = ''
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 111) {
        this.message = this.errorResponse.message;
        setTimeout(this.resetMessage, 4000);
      } else router.push({name: 'errorRoute'})
    },
  }
};
</script>


