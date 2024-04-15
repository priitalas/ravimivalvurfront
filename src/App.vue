<template>
  <div>
    <LoginModal ref="loginModalRef" @event-open-registration-modal="openRegistrationModal"
                @event-update-nav-menu="updateNavMenu"/>
    <RegistrationModal ref="registrationModalRef" @event-successful-registration="openLoginModal"/>
    <LogOutModal ref="logOutModalRef" @event-update-nav-menu="updateNavMenu"/>
    <nav>
      <router-link to="/">Kodu</router-link>
      |
      <template v-if="isLoggedIn">
        <a href="#" @click="openLogOutModal">Logi välja</a>
      </template>
      <template v-else>
        <a href="#" @click="openLoginModal">Logi sisse</a>
      </template>
    </nav>
    <router-view @event-update-nav-menu="updateNavMenu"/>
  </div>
</template>

<script>

import LoginModal from "@/components/modal/LoginModal.vue";
import RegistrationModal from "@/components/modal/RegistrationModal.vue";
import LogOutModal from "@/components/modal/LogOutModal.vue";

export default {
  name: 'App',
  components: {LogOutModal, RegistrationModal, LoginModal},
  data() {
    return {
      isLoggedIn: false,
    }
  },

  methods: {
    updateNavMenu() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
    },


    openRegistrationModal() {
      this.$refs.registrationModalRef.$refs.modalRef.openModal()
    },

    openLoginModal() {
      this.$refs.loginModalRef.$refs.modalRef.openModal()
    },

    openLogOutModal() {
      this.$refs.logOutModalRef.$refs.modalRef.openModal()
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
