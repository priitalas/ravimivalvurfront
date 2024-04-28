<template>
  <div>
    <ViewPatientMedicationInfoModal ref="ViewPatientMedicationInfoModalRef"/>
    <table v-if="medications.length > 0" class="table table-hover rounded-table table-striped ">
      <thead>
      <tr>
        <th class="col-2 bigtext-center ms-5" colspan="2">Ravim</th>
        <th class="col-3 bigtext-center">Kui palju pead võtma</th>
        <th class="col-5 bigtext-center">Lisainfo</th>
        <th class="col-2 bigtext-center">Märgi võetuks</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="medication in medications"
          :key="medication.medicationPlanId">
        <td>
          <div class="image-container">
            <img :src="medication.medicationImageData" alt="Medication Image" class="picture-button"
                 @click="openViewPatientMedicationInfoModal(medication.medicationId)">
            <img src="../assets/magnifying-glass-plus-solid.svg" class="magnifying-glass" />
          </div>
        </td>
        <td class="col-2 bigtext-left fw-bold">{{ medication.medicationName }}</td>
        <td class="col-3 bigtext-center">{{ medication.quantity }} {{ medication.medicationUnitName }}</td>
        <td class="col-5 bigtext-center ms-10">{{ medication.medicationNote }}</td>
        <td class="col-2 bigtext-center">
          <button @click="takeMedication(medication.medicationPlanId, medication.medicationTimeId)" type="button"
                  class="btn btn-danger btn-lg">Võtsin
          </button>

        </td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

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