<template>
  <div class="container text-center">
<!--    <AlertDanger :message="errorMessage"/>-->
    <div class="row">
      <div class="col">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Ravimi nimi</th>
            <th scope="col">Võtmise kuupäev</th>
            <th scope="col">Võtmise kellaaeg</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="patientLogbook in patientLogbooks">
            <td>{{ patientLogbook.medicationName }}</td>
            <td>{{ patientLogbook.date }}</td>
            <td>{{ patientLogbook.time }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "PatientMedicationLogbook",
  components: {AlertDanger},
  // props: {
  //   patientId: String
  // },

  data() {
    return {
      patientId: 0,
      patientLogbooks: [
        {
          medicationName: '',
          date: null,
          time: null
        }
      ]
    }
  },

  methods: {
    getPatientMedicationLogbook () {
      this.$http.get("/logbook/patient", {
            params: {
              patientId: this.patientId
            }
          }
      ).then(response => {
        this.patientLogbooks = response.data
      }).catch(error => {
        this.errorResponse = error.response.data
        setTimeout(this.resetMessage, 2000);
        this.handleError(error.response.status)
      })
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 999) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessage, 2000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    resetMessage() {
      this.errorMessage = ""
    },
  },

  // mounted() {
  //   this.getPatientMedicationLogbook()
  // }
}
</script>

