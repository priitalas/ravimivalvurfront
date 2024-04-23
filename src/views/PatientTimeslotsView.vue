<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <div class="col-3">
        <h4>Lisa ravimi võtmise ajad</h4>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Aja algus</span>
          <input type="time" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Aja lõpp</span>
          <input type="time" class="form-control">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">Kogus</span>
          <input type="text" class="form-control">
        </div>
        <div class="input-group mb-3">
          <button type="button" class="btn btn-primary">Lisa</button>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-5">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Aja algus</th>
            <th scope="col">Aja lõpp</th>
            <th scope="col">Kogus</th>
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
              <font-awesome-icon  class="link-custom cursor-pointer"
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
              <font-awesome-icon  class="link-custom cursor-pointer"
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

  data(){
    return{
      // URL + query/request parameter example
      medicationPlanId: useRoute().query.medicationPlanId,
    }
  }
}
</script>


<style scoped>

</style>