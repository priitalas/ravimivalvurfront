<template>
  <div v-if="showPatientCompleteMedicationInfo" class="container text-center">
    <DeleteMedicationPlanModal ref="deleteMedicationPlanModalRef"
                               @event-medication-plan-deleted="handleMedicationPlanDeleted"/>
    <div class="row">
      <AlertDanger :message="errorMessage"/>
      <table v-if="medicationPlans.length>0" class="table rounded-table table-hover table-responsive ">
        <thead>
        <tr>
          <th scope="col-2" style="text-align: start">Ravim</th>
          <th scope="col-3">Kuuri algus</th>
          <th scope="col-3">Kuuri lõpp</th>
          <th scope="col-2">Päevas kordi</th>
          <th v-if="isDoctor" style="width:10%">Lisa võtmiskordi</th>
          <th v-if="isDoctor" style="width:10%">Muuda</th>
          <th v-if="isDoctor" style="width:10%">Kustuta</th>

        </tr>
        </thead>
        <tbody>
        <tr v-for="medicationPlan in sortedMedicationPlans" :key="medicationPlan.medicationPlanId"
            :class="{ 'table-secondary': medicationPlan.medicationPlanStatus === 'D' }">
          <td style="text-align: start">
            {{ medicationPlan.medicationName }}, {{ medicationPlan.medicationUnitName }}
          </td>
          <td>{{ medicationPlan.periodStart }}</td>
          <td>{{ medicationPlan.periodEnd }}</td>
          <td> {{ medicationPlan.frequency }}</td>
          <td v-if="isDoctor" style="width:5%; text-align: center; justify-content: center;">
            <font-awesome-icon
                @click="navigateToPatientTimeslots(medicationPlan.medicationPlanId, medicationPlan.medicationName)"
                class="link-custom cursor-pointer" :icon="['fas', 'clock']"/>
          </td>
          <td v-if="isDoctor" style="width:5%; text-align: center; justify-content: center;">
            <font-awesome-icon @click="navigateToEditPlan()"
                               class="link-custom cursor-pointer me-lg-2"
                               :icon="['fas', 'pen-to-square']"/>
          </td>
          <td v-if="isDoctor" style="width:5%; text-align: center; justify-content: center;">
            <font-awesome-icon @click="navigateToDeleteMedicationPlan(medicationPlan.medicationPlanId)"
                               class="link-custom cursor-pointer"
                               :icon="['fas', 'trash']"/>

          </td>
        </tr>
        </tbody>
      </table>
      <div class="col col-lg-3">
        <button @click="navigateToAddPatientMedicationPlan" type="button" class="btn btn-warning">
          Lisa ravikuur
        </button>
      </div>
    </div>

  </div>
</template>

<script>

import AlertDanger from "@/components/alert/AlertDanger.vue";
import router from "@/router";
import DeleteMedicationPlanModal from "@/components/modal/medication/DeleteMedicationPlanModal.vue";
import AddUnitModal from "@/components/modal/medication/AddUnitModal.vue";

export default {
  name: "PatientMedicationPlan",
  components: {AddUnitModal, DeleteMedicationPlanModal, AlertDanger},
  props: ['patientFirstName', 'patientLastName'],

  data() {
    return {
      showPatientCompleteMedicationInfo: false,
      isDoctor: false,
      isWithoutTimeslots: false,
      patientId: 0,
      errorMessage: '',
      selectedMedicationPlanId: 0,
      medicationPlans: [{
        medicationPlanId: 0,
        medicationPlanStatus: "",
        medicationName: "",
        medicationUnitName: "",
        frequency: 0,
        periodStart: null,
        periodEnd: null
      }],
      errorResponse: {
        message: '',
        errorCode: ''
      }
    }
  },

  computed: {
    sortedMedicationPlans() {
      return this.medicationPlans.sort((a, b) => {
        if (a.medicationPlanStatus === b.medicationPlanStatus) {
          return a.medicationPlanStatus.localeCompare(b.medicationPlanStatus);
        } else {
          return a.medicationPlanStatus.localeCompare(b.medicationPlanStatus);
        }
      });
    }
  },

  methods: {
    // URL + query/request parameter example
    navigateToAddPatientMedicationPlan() {
      router.push({
        name: 'addPatientMedicationPlanRoute',
        query: {
          patientId: this.patientId,
          patientFirstName: this.patientFirstName,
          patientLastName: this.patientLastName,
        }
      })
    },

    navigateToDeleteMedicationPlan(selectedMedicationPlanId) {
      this.$refs.deleteMedicationPlanModalRef.medicationPlanId = selectedMedicationPlanId
      this.$refs.deleteMedicationPlanModalRef.$refs.modalRef.openModal()
    },

    sendGetPatientMedicationPlan() {
      this.$http.get(`/medication-plans/patient/${this.patientId}`
      ).then(response => {
        this.medicationPlans = response.data
        this.$emit('event-medication-plans-found');
        this.isWithoutTimeslots = this.checkIfAnyPlanWithZeroFrequency()
        if (this.isWithoutTimeslots) {
          this.errorMessage = "Patsiendil on raviplaane, millel on võtmise ajad ja doosid sisestamata!"
          setTimeout(this.resetMessage, 4000);
        }
      }).catch(error => {
        this.$emit('event-medication-plans-not-found');
        this.errorResponse = error.response.data
        setTimeout(this.resetMessage, 2000);
        this.handleError(error.response.status)
      })
    },

    checkIfAnyPlanWithZeroFrequency() {
      return this.medicationPlans.some(plan => plan.frequency === 0 && plan.medicationPlanStatus === "A");
    },

    handleMedicationPlanDeleted(message) {
      this.errorMessage = message
      this.sendGetPatientMedicationPlan()
    },

    handleError(statusCode) {
      if (statusCode === 403 && this.errorResponse.errorCode === 777) {
        this.errorMessage = this.errorResponse.message;
        setTimeout(this.resetMessage, 4000);
      } else {
        router.push({name: 'errorRoute'})
      }
    },

    resetMessage() {
      this.errorMessage = ""
    },

    navigateToPatientTimeslots(selectedMedicationPlanId, selectedMedicationName) {
      // URL + query/request parameter example
      router.push({
        name: 'patientTimeslotsRoute',
        query: {
          patientId: this.patientId,
          patientFirstName: this.patientFirstName,
          patientLastName: this.patientLastName,
          medicationPlanId: selectedMedicationPlanId,
          medicationName: selectedMedicationName
        }
      })
    },
  },
}
</script>