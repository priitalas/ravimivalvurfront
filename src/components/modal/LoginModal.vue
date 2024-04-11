<template>
  <Modal ref="modalRef">
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
      <button type="submit" class="btn btn-primary text-center text-nowrap">Logi sisse</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: "LoginModal",
  components: {Modal},

  data() {
    return {
      username: '',
      password: '',
      message: '',
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
};
</script>


