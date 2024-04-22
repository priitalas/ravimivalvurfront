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
    <tr>
<!--      v-for="patientCurrentMedication in patientCurrentMedications" :key="patientCurrentMedication.medicationId"-->
      <td>Siia tuleb pilt</td>
      <td>Aspirin</td>
      <td>1</td>
      <td>Tablett</td>
      <td>Võtta enne sööki</td>
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
      patientCurrentMedications: [
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

    sendGetPatientCurrentMedicationsRequest: function () {
      this.$http.get("/patient/medications")
          .then(response => {

            this.patientCurrentMedications = response.data
          })

          .catch(error => {
            const errorResponseBody = error.response.data
          })
    },

  },

  beforeMount() {
    this.sendGetPatientCurrentMedicationsRequest()
  }
}
</script>