<template>
  <Modal ref="modalRef" @event-close-modal="resetAllInputFields">
    <template #title>
      Lisa ühik
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <AlertDanger :message="errorMessage"/>
            <AlertSuccess :message="successMessage"/>
            <div class="mb-3">
              <label for="unitName" class="form-label">Ühik</label>
              <input v-model="unitName" type="text" class="form-control" id="userName">
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button @click="executeAddNewUnit" type="submit" class="btn btn-primary text-center text-nowrap">Salvesta
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
  name: "AddUnitModal",
  components: {Modal, AlertSuccess, AlertDanger},

  data() {
    return {
      unitName: '',
      successMessage: '',
      errorMessage: '',
      unitResponse: '',
      errorResponse: {
        message: '',
        errorCode: ''
      }
    }
  },

  methods: {
    sendPostUnitRequest() {
      this.$http.post('/unit', this.unitName
      ).then(response => {
        this.unitResponse = response.data
        this.$emit('event-new-unit-added')
        this.resetAllInputFields()
        this.$refs.modalRef.closeModal()

      }).catch(error => {
        this.errorResponse = error.response.data
        this.handleError(error.response.status)
      })
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 555) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessages, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    allFieldsWithCorrectInput() {
      return this.unitName !==''
    },
    executeAddNewUnit() {
      if (this.allFieldsWithCorrectInput()) {
        this.sendPostUnitRequest();
      }else {
        this.displayAllFieldsRequiredAlert();
      }
    },
    displayAllFieldsRequiredAlert() {
      this.errorMessage = 'Täida väli!'
      setTimeout(this.resetMessage, 4000)
    },

    resetAllInputFields() {
      this.unitName = ''
    },

    resetMessages() {
      this.unitName = ''
    }

  }
}
</script>


