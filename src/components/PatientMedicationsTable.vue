<template>
  <div>
    <ViewPatientMedicationInfoModal ref="ViewPatientMedicationInfoModalRef"/>
    <table v-if="medications.length > 0" class="table table-hover rounded-table table-striped"
           style="vertical-align: middle;">
      <thead>
      <tr style="text-align: left">
        <th class="bigtext" style="text-align: center" scope="col">Pilt</th>
        <th class="bigtext" scope="col">Nimi</th>
        <th class="bigtext" scope="col">Annus</th>
        <th class="bigtext" scope="col">Ühik</th>
        <th class="bigtext" scope="col">Lisainfo</th>
        <th class="bigtext" scope="col">Märgi võetuks</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="medication in medications"
          :key="medication.medicationPlanId">
        <td>
          <img :src="medication.medicationImageData" alt="Medication Image" style="width: 180px;
        cursor: pointer;" @click="openViewPatientMedicationInfoModal(medication.medicationId)">
        </td>
        <td class="bigtext" style="text-align: left">{{ medication.medicationName }}</td>
        <td class="bigtext" style="text-align: center">{{ medication.quantity }}</td>
        <td class="bigtext" style="text-align: left">{{ medication.medicationUnitName }}</td>
        <td class="bigtext" style="text-align: left">{{ medication.medicationNote }}</td>

        <td>
          <button @click="takeMedication(medication.medicationPlanId, medication.medicationTimeId)" type="button"
                  class="btn btn-danger btn-lg">Märgi võetuks
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
        this.$parent.$data.message = "Hetkel teil võtmist vajavaid ravimeid ei ole!"
      })
    },

    openViewPatientMedicationInfoModal(medicationId, medicationImageData) {
      this.$refs.ViewPatientMedicationInfoModalRef.handleOpenViewPatientMedicationInfoModal(medicationId, medicationImageData)
    },
  },

  beforeMount() {
    this.sendGetPatientMedicationsToTakeNowRequest()
  }
}
</script>