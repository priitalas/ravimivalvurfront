<template>
<<<<<<< HEAD
  <div>
    <Modal ref="modalRef">
      <template #title>
        Logi sisse
      </template>

      <template #body>
        <div class="container text-start">
          <div class="row justify-content-center">
            <div class="col">
              <div class="mb-3">
                <label for="username" class="form-label">Kasutajanimi</label>
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
        <button @clickt="executeLogIn" type="submit" class="btn btn-primary text-center text-nowrap">Logi sisse</button>
        <button @click="openRegistrationModal" type="submit" class="btn btn-warning text-center text-nowrap">Loo uus
          kasutaja
        </button>
      </template>

    </Modal>
    <Modal ref="registrationModalRef">
    </Modal>
  </div>
=======
  <Modal ref="modalRef" @event-close-modal="resetAllInputFields">
    <template #title>
      Logi sisse
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <AlertDanger :message="message"/>
            <div class="mb-3">
              <label for="username" class="form-label">Kasutajanimi</label>
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
      <button @click="executeLogin" type="submit" class="btn btn-primary text-center text-nowrap">Logi sisse</button>
      <button @click="openRegistrationModal" type="submit" class="btn btn-warning text-center text-nowrap">Loo uus
        kasutaja
      </button>
    </template>

  </Modal>
>>>>>>> master
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import RegistrationModal from "@/components/modal/RegistrationModal.vue";
<<<<<<< HEAD

export default {
  name: "LoginModal",
  components: {RegistrationModal, Modal},
=======
import router from "@/router";
import AlertDanger from "@/components/Alert/AlertDanger.vue";

export default {
  name: "LoginModal",
  components: {RegistrationModal, Modal, AlertDanger},
>>>>>>> master

  data() {
    return {
      username: '',
      password: '',
      message: '',
<<<<<<< HEAD
      loginResponse: {
        userId: 0,
        roleName: '',
        userStatus: '',
      },
      errorResponse: {
        message: '',
        errorCode: 0,
      }
    }
  },
  methods: {

=======
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
>>>>>>> master
    openRegistrationModal() {
      this.$emit('event-open-registration-modal')
      this.$refs.modalRef.closeModal();
    },

    allFieldsWithCorrectInput() {
      return this.username.length > 0 && this.password.length > 0;
    },

<<<<<<< HEAD
    executeLogIn() {
      if (this.allFieldsWithCorrectInput()) {
        this.sendLoginRequest()
=======
    executeLogin() {
      if (this.allFieldsWithCorrectInput()) {
        this.sendLoginRequest();
>>>>>>> master
      } else {
        this.displayAllFieldsRequiredAlert();
      }
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
<<<<<<< HEAD
        sessionStorage.setItem('roleName', this.loginResponse.roleName);
        sessionStorage.setItem('userStatus', this.loginResponse.userStatus)
        this.$emit('event-update-nav-menu')
        this.username = '';
        this.password = '';
        this.$refs.modalRef.closeModal()
      }).catch(error => {
        this.errorResponse = error.response.data;
        this.handleError(error.response.status);
      })
    },


=======
        sessionStorage.setItem('roleName', this.loginResponse.roleName)
        sessionStorage.setItem('userStatus', this.loginResponse.userStatus)
        this.$emit('event-update-nav-menu')
        this.resetAllInputFields()
        this.$refs.modalRef.closeModal()

        if (this.loginResponse.roleName = 'patient') {
          router.push({name: 'patientRoute'})
        } else {
          router.push({name: 'doctorRoute'});
        }


      }).catch(error => {
        this.errorResponse = error.response.data
        this.handleError(error.response.status)
      })
    },

>>>>>>> master
    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 111) {
        this.message = this.errorResponse.message;
        setTimeout(this.resetMessage, 4000);
<<<<<<< HEAD
      }


    },
    displayAllFieldsRequiredAlert() {
      this.message = "Täida kõik väljad";
      setTimeout(this.resetMessage, 4000);
=======
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    displayAllFieldsRequiredAlert() {
      this.message = 'Täida kõik väljad!'
      setTimeout(this.resetMessage, 4000)
    },

    resetAllInputFields() {
      this.username = ''
      this.password = ''
>>>>>>> master
    },

    resetMessage() {
      this.message = ''
    },
<<<<<<< HEAD


  }
}

</script>

=======
  }
}
</script>


>>>>>>> master
