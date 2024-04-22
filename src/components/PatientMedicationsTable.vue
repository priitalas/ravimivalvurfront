<template>

  <table v-if="patientMedicationsToTakeNow.length > 0" class="table table-striped table-primary table-hover" style="vertical-align: middle;">
    <thead>
    <tr >
      <th style="font-size: x-large;" scope="col">Pilt</th>
      <th style="font-size: x-large;" scope="col">Nimi</th>
      <th style="font-size: x-large;" scope="col">Kogus</th>
      <th style="font-size: x-large;" scope="col">Ühik</th>
      <th style="font-size: x-large;" scope="col">Lisainfo</th>
      <th style="font-size: x-large;" scope="col">Märgi võetuks</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="patientMedicationToTakeNow in patientMedicationsToTakeNow" :key="patientMedicationToTakeNow.medicationPlanId">
      <td> <img :src="patientMedicationToTakeNow.medicationImageData" alt="Medication Image" style="width: 250px; "></td>
      <td style="font-size: x-large;">{{ patientMedicationToTakeNow.medicationName }}</td>
      <td style="font-size: x-large;">{{ patientMedicationToTakeNow.quantity }}</td>
      <td style="font-size: x-large;">{{ patientMedicationToTakeNow.medicationUnitName }}</td>
      <td style="font-size: x-large;">{{ patientMedicationToTakeNow.medicationNote }}</td>
      <td>
        <button type="button" class="btn btn-danger btn-lg">Märgi võetuks</button>
      </td>
    </tr>
    </tbody>

  </table>
</template>

<style>
.bigger-text td {
  font-size: xx-large; /* Adjust the font size as needed */
}
</style>

<script>
import router from "@/router";

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
        }],
      errorResponse:
          {
            message: '',
            errorCode: 0
          }
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
      }).catch(() => {
       // this.$parent.$data.message = "Hetkel ei ole võtmist vajavaid ravimeid!"
      })
    },

  },

  beforeMount() {
    this.sendGetPatientMedicationsToTakeNowRequest()
  }
}
</script>