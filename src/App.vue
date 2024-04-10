<template>
  <nav>
    <router-link to="/">Kodu</router-link>
    |
    <a href="#" @click="openRegistrationModal">Registreeru kasutajaks</a>
    |
    <a href="#" @click="openLoginModal">Logi sisse</a>
    |
  </nav>
  <router-view @event-update-nav-menu="updateNavMenu"/>
  <RegistrationModal ref="registrationModalRef" @event-update-nav-menu="updateNavMenu"/>
</template>

<script>
import RegistrationModal from "@/components/RegistrationModal.vue";

export default {
  name: 'App',
  components: {RegistrationModal},
  data() {
    return {
      isRegistered: false,
      isLogIn: false,
      isAdmin: false
    }
  },

  methods: {
    updateNavMenu() {
      this.isRegistered = true
    },

    openRegistrationModal() {
     this.$refs.registrationModalRef.$refs.modalRef.openModal()
    },

  }
}
</script>

<style>
#app {
  font-family: Avenir, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


nav {
  padding: 30px;
  justify-content: center;

}

nav a {
  font-weight: bold;
  color: #415E57;

}

nav a.router-link-exact-active {
  color: #415E57;
}

</style>
