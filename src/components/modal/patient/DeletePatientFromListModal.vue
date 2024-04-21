<template>
  <Modal ref="modalRef">
    <template #title>
      Soovite patsienti oma nimekirjast kustutada?
    </template>

    <template #body>
      <div class="container text-start">
        <div class="row justify-content-center">
          <div class="col">
            <div class="mb-3">
              {{ firstName }} {{ lastName }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #buttons>
      <button @click="sendDeletePatientFromDoctorsList" type="submit" class="btn btn-primary text-center text-nowrap">
        Kustuta
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: "DeletePatientFromListModal",
  components: {Modal},

  props: {
    patientId: Number,
    firstName: String,
    lastName: String
  },

  data() {
    return {
      doctorId: sessionStorage.getItem('userId'),
    }
  },

  methods: {

    sendDeletePatientFromDoctorsList () {
      this.$http.delete("/doctor/patient", {
            params: {
              doctorId: this.doctorId,
              patientId: this.patientId
            }
          }
      ).then(response => {
        this.$emit('event-patient-deleted-from-list', 'Patsient on nimekirjast kustutatud')
        this.$refs.modalRef.closeModal()
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },


//  resetAllInputFields() {
//    this.patientId = 0
//    this.firstName = ''
//    this.lastName = ''
//  },
  },

}
</script>


