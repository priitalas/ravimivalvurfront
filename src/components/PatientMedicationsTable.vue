<template>
  <div>
    <ViewPatientMedicationInfoModal ref="ViewPatientMedicationInfoModalRef"/>
    <table v-if="medications.length > 0" class="table table-striped table-primary table-hover"
           style="vertical-align: middle;">
      <thead>
      <tr>
        <th style="font-size: x-large;" scope="col">Pilt</th>
        <th style="font-size: x-large;" scope="col">Nimi</th>
        <th style="font-size: x-large;" scope="col">Annus</th>
        <th style="font-size: x-large;" scope="col">Ühik</th>
        <th style="font-size: x-large;" scope="col">Lisainfo</th>
        <th style="font-size: x-large;" scope="col">Märgi võetuks</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="medication in medications"
          :key="medication.medicationPlanId">
        <td>
          <img :src="medication.medicationImageData" alt="Medication Image" style="width: 180px;
        cursor: pointer;" @click="openViewPatientMedicationInfoModal(medication.medicationId)">
        </td>
        <td style="font-size: x-large;">{{ medication.medicationName }}</td>
        <td style="font-size: x-large;">{{ medication.quantity }}</td>
        <td style="font-size: x-large;">{{ medication.medicationUnitName }}</td>
        <td style="font-size: x-large;">{{ medication.medicationNote }}</td>

        <td>
          <button @click="takeMedication(medication.medicationPlanId, medication.medicationTimeId)" type="button"
                  class="btn btn-danger btn-lg">Märgi
            võetuks
          </button>

        </td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<style>
.bigger-text td {
  font-size: xx-large;
}
</style>

<script>
import router from "@/router";
import PatientViewMedicationInfoModal from "@/components/modal/patient/ViewPatientMedicationInfoModal.vue";
import modal from "@/components/modal/Modal.vue";

export default {
  name: 'PatientMedicationsTable',
  components: {ViewPatientMedicationInfoModal: PatientViewMedicationInfoModal},
  data() {
    return {
      patientId: sessionStorage.getItem('userId'),

      medications: [
        {
          medicationPlanId: 0,
          medicationId: 0,
          medicationName: '',
          medicationUnitName: '',
          medicationNote: '',
          itsTimeToTakeMedication: true,
          medicationTimeId: 0,
          quantity: 0,
          medicationImageData: ''
        }
      ],

      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {

    takeMedication(medicationPlanId, medicationTimeId) {
      this.sendPostLogbookRequest(medicationPlanId, medicationTimeId)
    },

    sendPostLogbookRequest(medicationPlanId, medicationTimeId) {
      this.$http.post("/logbook", null, {
            params: {
              medicationPlanId: medicationPlanId,
              medicationTimeId: medicationTimeId
            }
          }
      ).then(() => {
        this.sendGetPatientMedicationsToTakeNowRequest()
      }).catch(error => {
        const errorResponseBody = error.response.data
      })
    },


    sendGetPatientMedicationsToTakeNowRequest() {
      this.$http.get("medication-plans/patient/to-take-now", {
            params: {
              patientId: this.patientId
            }
          }
      ).then(response => {
        this.medications = response.data
      }).catch(() => {
        this.$parent.$data.message = "Hetkel ei ole võtmist vajavaid ravimeid!"
      })
    },

    openViewPatientMedicationInfoModal(medicationId) {
      this.$refs.ViewPatientMedicationInfoModalRef.openModal(medicationId);
    },

  },

  beforeMount() {
    this.sendGetPatientMedicationsToTakeNowRequest()
  }
}
</script>