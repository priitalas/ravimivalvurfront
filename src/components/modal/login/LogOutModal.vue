<template>
  <Modal ref="modalRef">
    <template #title>
      Soovid välja logida?
    </template>
    <template #buttons>
      <button @click="executeLogOut" type="button" class="btn btn-warning">Jah</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import router from "@/router";

export default {
  name: "LogOutModal",
  components: {Modal},
  methods: {

    executeLogOut() {
      sessionStorage.clear()
      this.$emit('event-update-nav-menu')
      this.$refs.modalRef.closeModal()
      router.push({name: 'homeRoute'})
    },

  }
}
</script>