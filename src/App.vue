<template>
  <div>
    <LoginModal ref="loginModalRef" @event-open-registration-modal="openRegistrationModal"/>
    <RegistrationModal ref="registrationModalRef"/>
    <nav>
      <router-link to="/">Kodu</router-link>
      |
      <a href="#" @click="openLoginModal">Logi sisse</a>
    </nav>
    <router-view @event-update-nav-menu="updateNavMenu"/>
  </div>
</template>

<script>

import LoginModal from "@/components/modal/LoginModal.vue";
import RegistrationModal from "@/components/modal/RegistrationModal.vue";

export default {
  name: 'App',
  components: {RegistrationModal, LoginModal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
    }
  },

  methods: {
    updateNavMenu() {
      this.isLoggedIn = true
    },

    openLoginModal() {
      this.isLoggedIn = true
      this.$refs.loginModalRef.$refs.modalRef.openModal()
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
  color: blue;
}

</style>
