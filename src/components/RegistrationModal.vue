<template>
  <Modal ref="modalRef" @event-close-modal="resetAllInputFields">
    <template #title>
      Registreeru kasutajaks
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
              <label for="contact" class="form-label">Kontakt</label>
              <input v-model="contact" type="text" class="form-control" id="contact">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Parool</label>
              <input v-model="password" type="password" class="form-control" id="password">
            </div>
            <div class="mb-3">
              <div v-model="roleName" type="roleName" class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                  Patsient
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
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
export default {
  name: "RegistrationModal",
  components: {Modal},

  data() {
    return {
      username: '',
      contact: '',
      password: '',


    }
  }
}
</script>