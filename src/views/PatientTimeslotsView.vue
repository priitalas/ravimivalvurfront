<template>
  <div class="background-container">
    <div class="row justify-content-center">
      <div class="col-8">
        <h2>Lisa ravimi võtmise ajad ja doosid</h2>
      </div>
      <div class="row justify-content-center">
        <div class="col-2">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Aja algus</span>
            <input v-model="timeslot.timeStart" type="time" class="form-control">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Aja lõpp</span>
            <input v-model="timeslot.timeEnd" type="time" class="form-control">
          </div>
        </div>
        <div class="col-2">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Doos</span>
            <input v-model="timeslot.quantity" type="text" class="form-control">
          </div>
        </div>
        <div class="col-2 justify-content-center">
          <div class="input-group mb-3">
            <button @click="sendAddTimeslotRequest" type="button" class="btn btn-primary">Salvesta</button>
          </div>
        </div>
      </div>
    </div>
    <p></p>
    <div class="row justify-content-center">
      <div class="col-8">
        <table class="table rounded-table">
          <thead>
          <tr>
            <th scope="col">Aja algus</th>
            <th scope="col">Aja lõpp</th>
            <th scope="col">Doos</th>
            <th scope="col">Muuda</th>
            <th scope="col">Kustuta</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>10:00</td>
            <td>12:00</td>
            <td>2</td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon class="link-custom cursor-pointer me-lg-2"
                                 :icon="['fas', 'pen-to-square']"/>
            </td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon class="link-custom cursor-pointer"
                                 :icon="['fas', 'trash']"/>
            </td>
          </tr>
          <tr>
            <td>14:00</td>
            <td>16:00</td>
            <td>2</td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon class="link-custom cursor-pointer me-lg-2"
                                 :icon="['fas', 'pen-to-square']"/>
            </td>
            <td style="width:10%; text-align: center; justify-content: center;">
              <font-awesome-icon class="link-custom cursor-pointer"
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

export default {
  name: "PatientTimeslotsView",

  data() {
    return {
      // URL + query/request parameter example
      medicationPlanId: useRoute().query.medicationPlanId,
      timeslot: {
          timeStart: null,
          timeEnd: null,
          quantity: 0
        },
    }
  },

  methods: {

    sendAddTimeslotRequest(){

    }

  },
}
</script>