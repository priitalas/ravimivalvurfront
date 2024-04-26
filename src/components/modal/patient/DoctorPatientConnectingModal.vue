<template>
  <Modal ref="modalRef">
    <template #title>
      <div>Arst soovib Teid enda patsiendiks!</div>
    </template>
    <template #body>
      <div class="m-2">{{ doctorRelationship.doctorFirstName }}</div>
      <div class="m-2">{{ doctorRelationship.doctorLastName }}</div>
    </template>

    <template #buttons>
      <button @click="patientRejects" type="button" class="btn btn-danger">Ei</button>
      <button @click="patientAccepts" type="button" class="btn btn-warning">Jah</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: "DoctorPatientConnectingModal",
  components: {Modal},

  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      doctorRelationship: {
        doctorPatientId: 0,
        doctorFirstName: "",
        doctorLastName: ""
      },

    }
  },
  methods: {

    patientAccepts() {
      this.sendPutPatientDoctorRequest(true);
    },


    patientRejects() {
      this.sendPutPatientDoctorRequest(false);
    },

    handleOpenDoctorPatientConnectingModal() {
      this.sendGetPatientDoctorStatusRequest()
    },

    sendGetPatientDoctorStatusRequest() {
      this.$http.get("/patient/doctor", {
            params: {
              patientId: this.userId
            }
          }
      ).then(response => {
        this.doctorRelationship = response.data
        this.$emit('patient-accepted-doctor', 'Nimekirja lisandus patsient' )
        this.$refs.modalRef.openModal()
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },

    sendPutPatientDoctorRequest(hasAccepted) {
      this.$http.put("/patient/doctor", null, {
            params: {
              doctorPatientId: this.doctorRelationship.doctorPatientId,
              hasAccepted: hasAccepted
            }
          }
      ).then(response => {
        this.$refs.modalRef.closeModal()
        router.push({name: 'patientRoute'});
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },
  }


}
</script>