<template>
  <div>
    <LoginModal ref="loginModalRef" @event-open-registration-modal="openRegistrationModal"
                @event-update-nav-menu="updateNavMenu"/>
    <RegistrationModal ref="registrationModalRef" @event-successful-registration="openLoginModalWithAlert"/>
    <ChangeContactsModal ref="changeContactsModalRef" @event-contacts-successfully-changed="updateNavMenu"/>
    <LogOutModal ref="logOutModalRef" @event-update-nav-menu="updateNavMenu"/>
    <nav>
      <router-link to="/">Kodu</router-link>
      |
      <template v-if="isLoggedIn">
        <template v-if="isDoctor || isAdmin">
          <router-link to="/doctor">Arsti töölaud</router-link>
          |
        </template>
        <template v-if="isPatient">
          <router-link to="/patient">Minu ravimid</router-link>
          |
        </template>
        <a href="#" @click="openChangeContactsModal">Muuda oma andmeid</a>
        |
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

import LoginModal from "@/components/modal/login/LoginModal.vue";
import RegistrationModal from "@/components/modal/login/RegistrationModal.vue";
import LogOutModal from "@/components/modal/login/LogOutModal.vue";
import ChangeContactsModal from "@/components/modal/login/ChangeContactsModal.vue";
import AlertSuccess from "@/components/Alert/AlertSuccess.vue";

export default {
  name: 'App',
  components: {AlertSuccess, LogOutModal, RegistrationModal, LoginModal, ChangeContactsModal},
  data() {
    return {
      isLoggedIn: false,
      isDoctor: false,
      isPatient: false,
      isAdmin: false,
      successMessage: ''
    }
  },

  methods: {
    updateNavMenu() {
      this.updateIsLoggedInValue()
      this.updateRoleValue()
    },

    updateIsLoggedInValue() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null
    },

    updateRoleValue() {
      if (this.isLoggedIn) {
        let roleName = sessionStorage.getItem('roleName')
        this.isDoctor = roleName === 'doctor'
        this.isPatient = roleName === 'patient'
        this.isAdmin = roleName === 'admin'

      }
    },

    openRegistrationModal() {
      this.$refs.registrationModalRef.$refs.modalRef.openModal()
    },

    openLoginModal() {
      this.$refs.loginModalRef.$refs.modalRef.openModal()
    },

    openLoginModalWithAlert(message) {
      this.$refs.loginModalRef.$refs.modalRef.openModal()
      this.$refs.loginModalRef.successMessage = message
    },

    openChangeContactsModal() {
      this.$refs.changeContactsModalRef.$refs.modalRef.openModal()
    },


    openLogOutModal() {
      this.$refs.logOutModalRef.$refs.modalRef.openModal()
    }

  },

  mounted() {
    this.updateNavMenu()
  }

}
</script>

<style>
#app {
  font-family: Roboto, sans-serif;
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
  color: #0d6efd;
}

nav a:active {
  color: #0d6efd;
}

</style>
