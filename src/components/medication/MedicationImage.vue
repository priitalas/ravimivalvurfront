<template>
  <div>
    <img v-if="imageData === ''" src="../../assets/vaikimisi_ravimi_pilt.png" class="img-fluid" alt="ravimi pilt">
    <img v-else :src="imageData" class="img-thumbnail" alt="ravimi pilt">
  </div>
</template>
<script>
export default {
  name: 'MedicationImage',
  props: {
    imageData: String
  }
}
</script>