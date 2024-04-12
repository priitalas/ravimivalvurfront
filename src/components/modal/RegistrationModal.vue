<template>
  <Modal ref="modalRef">
    <template #title>
      Registreeru kasutajaks
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <AlertDanger :message="message"/>
            <div class="mb-3">
              <label for="firstname" class="form-label">Eesnimi</label>
              <input v-model="registrationRequest.firstName" type="text" class="form-control" id="firstname">
            </div>
            <div class="mb-3">
              <label for="lastname" class="form-label">Perekonnanimi</label>
              <input v-model="registrationRequest.lastName" type="text" class="form-control" id="lastname">
            </div>
            <div class="mb-3">
              <label for="contact" class="form-label">e-mail</label>
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
              <div type="roleId" class="form-check">
                <input v-model="registrationRequest.roleId" class="form-check-input" type="radio" name="role" value="2" id="patient">
                <label class="form-check-label" for="flexRadioDefault1">
                  Patsient
                </label>
              </div>
              <div class="form-check">
                <input v-model="registrationRequest.roleId" class="form-check-input" type="radio" name="role" value="3" id="doctor">
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
      <button @click="executeRegistration" type="submit" class="btn btn-primary text-center text-nowrap">Registreeru</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import AlertDanger from "@/components/Alert/AlertDanger.vue";

export default {
  name: 'RegistrationModal',
  components: {AlertDanger, Modal},

  data() {
    return {
      registrationRequest:{
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        roleId: 0
      },
      message: ''
    }
  },

  methods: {

    allRequiredFieldsWithCorrectInput() {
      return this.firstName.length > 0 &&
          this.lastName.length > 0 &&
          this.username.length > 0 &&
          this.password.length > 0 &&
          roleName !== null
    },

    executeRegistration() {
      if (this.allRequiredFieldsWithCorrectInput()) {
        this.sendRegistrationRequest();
      } else {
        this.displayAllFieldsRequiredAlert()
      }
    },

    sendRegistrationRequest() {
      this.$http.post('/registration', {
        params: {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
          email: this.email,
          roleId: this.roleId
        }

          }
      );
    },

    displayAllFieldsRequiredAlert() {
      this.message = 'Täida kõik nõutud väljad!'
      setTimeout(this.resetMessage, 4000)
    },

  }
}
</script>