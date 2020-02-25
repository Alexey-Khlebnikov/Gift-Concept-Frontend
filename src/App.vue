<!-- =========================================================================================
	File Name: App.vue
	Description: Main vue file - APP
	----------------------------------------------------------------------------------------
	Item Name: Vuesax Admin - VueJS Dashboard Admin Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import themeConfig from "@/../themeConfig.js";
export default {
  data() {
    return {
      firstLoginEvent: true
    };
  },
  watch: {
    "$store.state.theme"(val) {
      this.toggleClassInBody(val);
    }
  },
  async created() {
    this.$auth.renewTokens();
  },
  sockets: {
    CONNECT: function() {
    }
  },
  methods: {
    toggleClassInBody(className) {
      if (className == "dark") {
        if (document.body.className.match("theme-semi-dark"))
          document.body.classList.remove("theme-semi-dark");
        document.body.classList.add("theme-dark");
      } else if (className == "semi-dark") {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
        document.body.classList.add("theme-semi-dark");
      } else {
        if (document.body.className.match("theme-dark"))
          document.body.classList.remove("theme-dark");
        if (document.body.className.match("theme-semi-dark"))
          document.body.classList.remove("theme-semi-dark");
      }
    },
    handleWindowResize(event) {
      this.$store.dispatch("updateWindowWidth", event.currentTarget.innerWidth);
    },
    handleLoginEvent({ loggedIn, autoLogout, activateChanged }) {
      if (loggedIn) {
        this.$acl.change(this.$auth.userRole);
        if (activateChanged) {
          if (this.$auth.isActivated) {
            this.$router.push({ path: this.$router.currentRoute.query.to || "/" });
          } else {
            return router.push({path: '/pages/waiting-activation', query: {to: this.$router.currentRoute.path}})
          }
        }
      } else {
        if (!this.$router.currentRoute.meta.rule || this.$router.currentRoute.meta.rule == "anonymous") return;
        this.$acl.change("anonymous");
        if(autoLogout) {
          this.$router.push({
            path: "/pages/lock-screen",
            query: { to: this.$router.currentRoute.path }
          });
        } else {
          this.$router.replace({path: '/login'})
        }
      }
    }
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme);
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.$store.dispatch("updateWindowWidth", window.innerWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  }
};
</script>
