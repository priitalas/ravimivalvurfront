<template>
  <div>
    <div class="accordion" id="#accordionExample">
      <div class="accordion-item">
        <div class="accordion-header">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Patsiendi raviplaan
          </button>
        </div>
        <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <table class="table table-responsive">
              <thead>
              <tr>
                <th scope="col">Ravim</th>
                <th scope="col">Annus</th>
                <th scope="col">Ühik</th>
                <th scope="col">Kogus päevas</th>
                <th scope="col">Kuuri algus</th>
                <th scope="col">Kuuri lõpp</th>
                <th v-if="isDoctor" scope="col">Muuda</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Aspiriin</td>
                <td>1</td>
                <td>tbl</td>
                <td>2</td>
                <td>05.05.24</td>
                <td>05.10.24</td>
                <td v-if="isDoctor">
                  <font-awesome-icon @click="navigateToEditPlan(patientId)" class="link-custom cursor-pointer me-lg-2"
                                     :icon="['fas', 'pen-to-square']"/>
                  <font-awesome-icon @click="openDeletePlan(patientId)" class="link-custom cursor-pointer"
                                     :icon="['fas', 'trash']"/>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Lisa raviplaan
          </button>
        </div>
        <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            Siia tuleb eraldi komponent raviplaani lisamiseks, kus on ka ravimite tabel ja ravimi lisamise nupp
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <div class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Ravimite võtmise logi
          </button>
        </div>
        <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            Siia tulevad andmed patsiendi raviplaani Id järgi logbook tabelist
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PatientMedicationPlan",

  data(){
    return {
      medicationPlans: [ {
        medicationPlanId: 0,
        medicationPlanStatus: "",
        medicationName: "",
        medicationUnitName: "",
        frequency: 0,
        quantity: 0,
        periodStart: null,
        periodEnd: null
      }]
    }
  },

  methods: {
    navigateToEditPlan(){

    },
    openDeletePlan(){

    }
  }
}
</script>