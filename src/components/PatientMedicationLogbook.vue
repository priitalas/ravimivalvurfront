<template>
  <div v-if="showPatientLogbook" class="container text-center">
    <div class="row justify-content-center">
      <div>
        <AlertDanger :message="errorMessage"/>
      </div>
      <div v-if="patientLogbooks.length > 0" class="col">
        <table class="table rounded-table table-hover table-responsive">
          <thead>
          <tr>
            <th class="col">Ravimi nimi</th>
            <th class="col">Võtmise kuupäev</th>
            <th class="col">Võtmise kellaaeg</th>
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

  data() {
    return {
      patientId: 0,
      errorMessage: '',
      showPatientLogbook: false,
      patientLogbooks: [
        {
          medicationName: '',
          date: null,
          time: null
        }
      ],
      errorResponse: {
        message: '',
        errorCode: ''
      }
    }
  },

  methods: {
    getPatientMedicationLogbook () {
      this.patientLogbooks=[]
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
        setTimeout(this.resetMessage, 6000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    resetMessage() {
      this.errorMessage = ""
    },
  },

  mounted() {
    this.getPatientMedicationLogbook()
  }
}
</script>

