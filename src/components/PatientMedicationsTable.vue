<template>

  <table class="table table-striped table-primary table-hover" style="vertical-align: middle;">
    <thead>
    <tr>
      <th scope="col">Pilt</th>
      <th scope="col">Nimi</th>
      <th scope="col">Kogus</th>
      <th scope="col">Ühik</th>
      <th scope="col">Lisainfo</th>
      <th scope="col">Märgi võetuks</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="patientMedicationToTakeNow in patientMedicationsToTakeNow" :key="patientMedicationToTakeNow.medicationPlanId">
      <td>{{  }}</td>
      <td>{{ patientMedicationToTakeNow.medicationName }}</td>
      <td>{{ patientMedicationToTakeNow.quantity }}</td>
      <td>{{ patientMedicationToTakeNow.medicationUnitName }}</td>
      <td>{{patientMedicationToTakeNow.medicationNote}}</td>
      <td>
        <button type="button" class="btn btn-danger btn-lg">Märgi võetuks</button>
      </td>
    </tr>
    </tbody>

  </table>
</template>
<script>
export default {
  name: 'PatientMedicationsTable',
  data() {
    return {
      patientId: sessionStorage.getItem('userId'),
      patientMedicationsToTakeNow: [
        {
          medicationPlanId: 0,
          medicationId: 0,
          medicationName: '',
          medicationImageData: '',
          quantity: 0,
          medicationUnitName: '',
          medicationNote: '',
          timeSlotStatus: ''
        }
      ]
    }
  },

  methods: {

    sendGetPatientMedicationsToTakeNowRequest: function () {
      this.$http.get("medication-plans/patient/to-take-now", {
            params: {
              patientId: this.patientId
            }
          }
      ).then(response => {
        this.patientMedicationsToTakeNow = response.data
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },



  },

  beforeMount() {
    this.sendGetPatientMedicationsToTakeNowRequest()
  }
}
</script>