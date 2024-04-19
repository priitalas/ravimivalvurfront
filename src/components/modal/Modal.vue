<template>
  <!-- Modal -->
  <div v-if="isOpen" class="modal fade show d-block" tabindex="-1" style="display: block;">
    <div class="modal-dialog" ref="Modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-5">
            <slot name="title">
              <!-- Title-->
            </slot>
          </h2>
          <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="body">
            <!-- body-->
          </slot>
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-dark" @click="closeModal">Sulge</button>
          <slot name="buttons">
            <!-- button -->
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>


<script>


export default {
  name: 'Modal',
  data(){
    return {
      isOpen: false
    }
  },
  methods: {
    openModal() {
      this.isOpen = true
    },

    closeModal() {
      this.$emit('event-close-modal')
      this.isOpen = false
    }

  }
}
</script>

