<template>
  <RegistrationModal ref="registrationModalRef" @event-update-nav-menu="updateNavMenu"/>
  <LogInModal ref="logInModalRef" @event-update-nav-menu="updateNavMenu"/>
  <div>
    <nav>
      <router-link to="/">Kodu</router-link>
          |
      <router-link to="/">Registreeru</router-link>
          |
      <template>
        <a href="#" @click="openRegistrationModal">Registreeru kasutajaks</a>
      </template>
          |
    </nav>
    <router-view/>
    </div>

</template>

<script>
import RegistrationModal from "@/components/RegistrationModal.vue";

export default {
  name: 'App',
  components: {RegistrationModal, LogInModal, LogOutModal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false
    }
  },

  methods: {
    openRegistrationModal() {
      this.$refs.registrationModalRef.$refs.modalRef.openModal()
    },

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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
