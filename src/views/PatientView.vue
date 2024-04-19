<template>

  <h2>Hetkel võtmist vajavad ravimid:</h2>

  <div class="container">
<!-- <ViewMedicineInfoModal ref="viewMedicineInfoModalRef" />-->
    <div class="row justify-content-center">
      <div class="col-md-12">

        <table v-if="quantity>0" class="table table-striped table-primary table-hover" style="vertical-align: middle;">
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

      </div>
    </div>
  </div>


</template>
<script>
export default {
  name: "PatientView",

  data() {
    return {
    // medicationPlanId: 0,
    // medicationId: 0,
    // medicationName: '',
    // medicationImageData: '',
    // quantity: 0,
    // medicationUnitName: '',
    // medicationNote: '',
    // timeSlotStatus: ''
    }
  },

  methods: {
    openViewMedicineInfoModal(medicationId) {
      },


  }
}
</script>