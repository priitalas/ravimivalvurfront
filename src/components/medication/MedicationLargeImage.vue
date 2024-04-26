<template>
  <div>
    <img v-if="imageData === ''" src="../../assets/vaikimisi_ravimi_pilt.png" class="img-fluid" alt="ravimi pilt">
    <img v-else :src="imageData" class="large-image"  alt="ravimi pilt">
  </div>
</template>
<script>
export default {
  name: 'MedicationLargeImage',
  props: {
    imageData: String
  }
}
</script>