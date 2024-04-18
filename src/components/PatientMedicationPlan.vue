<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Ravim</th>
        <th scope="col">Annus</th>
        <th scope="col">Ühik</th>
        <th scope="col">Kogus päevas</th>
        <th scope="col">Kuuri algus</th>
        <th scope="col">Kuuri lõpp</th>
        <th scope="col">Muuda</th>
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
        <td>
          <font-awesome-icon @click="navigateToEditPlan(patientId)" class="link-custom cursor-pointer me-lg-2"
                                :icon="['fas', 'pen-to-square']"/>
          <font-awesome-icon @click="openDeletePlan(patientId)" class="link-custom cursor-pointer"
                             :icon="['fas', 'trash']"/>
        </td>



      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: "PatientMedicationPlan"
}
</script>