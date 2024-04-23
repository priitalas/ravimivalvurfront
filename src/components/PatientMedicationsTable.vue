<template>
  <div>
    <ViewPatientMedicationInfoModal ref="ViewPatientMedicationInfoModalRef"/>
    <table v-if="patientMedicationsToTakeNow.length > 0" class="table table-striped table-primary table-hover"
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
      <tr v-for="patientMedicationToTakeNow in patientMedicationsToTakeNow"
          :key="patientMedicationToTakeNow.medicationPlanId">
        <td>
          <img :src="patientMedicationToTakeNow.medicationImageData" alt="Medication Image" style="width: 180px;
        cursor: pointer;" @click="openViewPatientMedicationInfoModal(patientMedicationToTakeNow)">
        </td>
        <td style="font-size: x-large;">{{ patientMedicationToTakeNow.medicationName }}</td>
        <td style="font-size: x-large;">{{ patientMedicationToTakeNow.quantity }}</td>
        <td style="font-size: x-large;">{{ patientMedicationToTakeNow.medicationUnitName }}</td>
        <td style="font-size: x-large;">{{ patientMedicationToTakeNow.medicationNote }}</td>

        <td>
          <button @click="postPatientTakesMedicationToLogbook" type="button" class="btn btn-danger btn-lg">Märgi
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
  font-size: xx-large; /* Adjust the font size as needed */
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
      medicationTimeId: '',
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
        this.$parent.$data.message = "Hetkel ei ole võtmist vajavaid ravimeid!"
      })
    },

    openViewPatientMedicationInfoModal(patientMedicationToTakeNow) {
      this.$refs.ViewPatientMedicationInfoModalRef.openModal(patientMedicationToTakeNow);
    },


    postPatientTakesMedicationToLogbook() {
      this.$http.post('/medication-plan/patient/take-medication-logbook', null, {
            params: {
              medicationPlanId: this.medicationPlanId,
              medicationTimeId: this.medicationTimeId
            }
          }
      );
    }

  },


  beforeMount() {
    this.sendGetPatientMedicationsToTakeNowRequest()
  }
}
</script>