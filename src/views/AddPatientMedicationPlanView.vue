<template>
  <div class="doctorbackground-container">
    <DeleteMedicationPlanModal ref="deleteMedicationPlanModalRef"
                               @event-medication-plan-deleted="handleMedicationPlanDeleted"/>
    <div class="row justify-content-center">
      <div class="col-8">
        <h2>Lisa patsiendile {{ patientFirstName }} {{ patientLastName }} uus ravikuur</h2>
      </div>
      <div class="row justify-content-lg-center">
        <div class="col-3">
          <select v-model="newMedicationPlanInfo.medicationId" @change="handleMedicationChange"
                  class="form-select custom-dropdown">
            <option selected :value="0">Vali ravim</option>
            <option v-for="medication in medications" :value="medication.medicationId" :key="medication.medicationId">
              {{ medication.medicationName }}, {{ medication.unitName }}
            </option>
            <option selected :value="-1">-Lisa ravim-</option>
          </select>
        </div>
        <div class="col-2">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Algus</span>
            <input v-model="newMedicationPlanInfo.periodStart" type="date" id="startDate"
                   class="form-control">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Lõpp</span>
            <input v-model="newMedicationPlanInfo.periodEnd" type="date" id="endDate" min="startDate"
                   class="form-control">
          </div>
        </div>
        <div class="col-1 justify-content-start">
          <button @click="addNewMedicationPlan" type="button" class="btn btn-primary"
                  @event-new-medication-added="handleNewMedicationAdded">Salvesta
          </button>
        </div>
      </div>
    </div>
    <p></p>

    <div class="row justify-content-center">
      <div class="col-8">
        <h4>Lisa sisestatud ravikuurile ravimi igapäevased võtmise ajad</h4>
        <AlertDanger :message="errorMessage"/>
        <table class="table rounded-table">
          <thead>
          <tr>
            <th class="col">Ravimi nimi</th>
            <th class="col">Algus</th>
            <th class="col">Lõpp</th>
            <th class="col">Mitu korda päevas</th>
            <th class="col text-danger">Lisa ajad</th>
            <th class="col">Muuda</th>
            <th class="col">Kustuta</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="addedMedicationPlan in addedMedicationPlans" :key="addedMedicationPlan.medicationPlanId">
            <td>{{ addedMedicationPlan.medicationName }}</td>
            <td>{{ addedMedicationPlan.periodStart }}</td>
            <td>{{ addedMedicationPlan.periodEnd }}</td>
            <td>{{ addedMedicationPlan.frequency }}</td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon
                  @click="navigateToMedicationTimeslots(addedMedicationPlan.medicationPlanId, addedMedicationPlan.medicationName)"
                  class="link-custom cursor-pointer text-danger"
                  :icon="['fas', 'clock']"/>
            </td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon class="link-custom cursor-pointer me-lg-2"
                                 :icon="['fas', 'pen-to-square']"/>
            </td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon @click="navigateToDeleteMedicationPlan(addedMedicationPlan.medicationPlanId)"
                                 class="link-custom cursor-pointer"
                                 :icon="['fas', 'trash']"/>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import router from "@/router";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import PatientMedicationPlan from "@/components/PatientMedicationPlan.vue";
import DeleteMedicationPlanModal from "@/components/modal/medication/DeleteMedicationPlanModal.vue";

export default {
  name: "AddPatientMedicationPlanView.vue",
  components: {DeleteMedicationPlanModal, PatientMedicationPlan, AlertDanger},

  data() {
    return {
      errorMessage: '',
      successMessage: '',
      selectedMedicationName: '',
      selectedMedicationPlanId: 0,

      selectedMedication: {
        medicationId: 0,
        medicationName: ''
      },

      medications: [
        {
          medicationId: 0,
          medicationName: '',
          unitName: ''
        }
      ],

      newMedicationPlanInfo: {
        patientId: useRoute().query.patientId,
        medicationId: 0,
        periodStart: null,
        periodEnd: null
      },

      addedMedicationPlans: [
        {
          medicationPlanId: 0,
          medicationName: '',
          periodStart: null,
          periodEnd: null,
          frequency: 0
        }
      ],

      // URL + query/request parameter example
      patientId: useRoute().query.patientId,
      patientFirstName: useRoute().query.patientFirstName,
      patientLastName: useRoute().query.patientLastName,
    }
  },

  methods: {

    addNewMedicationPlan() {
      if (this.allFieldsWithCorrectInput()) {
        this.sendAddPatientMedicationPlanInfo();
      } else {
        this.displayAllFieldsRequiredAlert()
      }
    },

    sendAddPatientMedicationPlanInfo() {
      this.$http.post("/medication-plans/patient/", this.newMedicationPlanInfo
      ).then(response => {
        this.sendGetAddedMedicationPlansRequest()
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    sendGetAddedMedicationPlansRequest() {
      this.$http.get("/medication-plans/patient/new-plans/", {
            params: {
              patientId: this.patientId
            }
          }
      ).then(response => {
        this.addedMedicationPlans = response.data
      }).catch(error => {
        router.push({name: 'errorRoute'})
      })
    },

    handleMedicationPlanDeleted(message) {
      this.errorMessage = message
      this.sendGetAddedMedicationPlansRequest()
    },

    navigateToDeleteMedicationPlan(selectedMedicationPlanId) {
      this.$refs.deleteMedicationPlanModalRef.medicationPlanId = selectedMedicationPlanId
      this.$refs.deleteMedicationPlanModalRef.$refs.modalRef.openModal()
    },

    handleMedicationChange() {
      this.selectedMedication = this.medications.find(medication => medication.medicationId === this.newMedicationPlanInfo.medicationId);
      if (this.selectedMedication) {
        this.newMedicationPlanInfo.medicationName = this.selectedMedication.medicationName;
      } else {
        this.newMedicationPlanInfo.medicationName = '';
      }
      if (this.newMedicationPlanInfo.medicationId < 0
      ) {
        router.push({name: 'addMedicationRoute'})
      }
    },

    handleNewMedicationAdded() {
      this.sendGetMedicationsRequest()
    },

    sendGetMedicationsRequest() {
      this.$http.get("/medications")
          .then(response => {
            this.medications = response.data
          })
          .catch(() => {
            router.push({name: 'errorRoute'})
          })
    },

    navigateToMedicationTimeslots(selectedMedicationPlanId, selectedMedicationName) {
      // URL + query/request parameter example
      router.push({
        name: 'patientTimeslotsRoute',
        query: {
          medicationPlanId: selectedMedicationPlanId,
          medicationName: selectedMedicationName,
          patientId: this.patientId,
          patientFirstName: this.patientFirstName,
          patientLastName: this.patientLastName,
        }
      })
    },

    allFieldsWithCorrectInput() {
      return this.newMedicationPlanInfo.medicationId !== 0 &&
          this.newMedicationPlanInfo.periodStart !== null &&
          this.newMedicationPlanInfo.periodEnd !== null &&
          this.newMedicationPlanInfo.periodStart < this.newMedicationPlanInfo.periodEnd

    },

    displayAllFieldsRequiredAlert() {
      this.errorMessage = 'Täida kõik väljad korrektselt!'
      setTimeout(this.resetMessages, 2000)
    },

    resetMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },
  },

  beforeMount() {
    this.sendGetMedicationsRequest()
  }
}

</script>