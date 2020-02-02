
<template>
  <div class="h-screen flex w-full bg-img">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/register.jpg" alt="register" class="mx-auto" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="p-8">
                <div class="vx-card__title">
                  <h4 class="mb-4">Setup Admin</h4>
                  <p>Fill the below form to create a new admin.</p>
                </div>
                <div class="clearfix">
                  <vs-input
                    v-validate="'required|alpha_dash|min:3'"
                    data-vv-validate-on="blur"
                    label-placeholder="Admin Name"
                    name="username"
                    placeholder="Admin Name"
                    v-model="adminData.username"
                    class="w-full"
                  />
                  <span class="text-danger text-sm">{{ errors.first('username') }}</span>
                  <vs-input
                    v-validate="'required|email'"
                    data-vv-validate-on="blur"
                    name="email"
                    type="email"
                    label-placeholder="Email"
                    placeholder="Email"
                    v-model="adminData.email"
                    class="w-full mt-6"
                  />
                  <span class="text-danger text-sm">{{ errors.first('email') }}</span>
                  <vs-input
                    ref="password"
                    type="password"
                    data-vv-validate-on="blur"
                    v-validate="'required|min:6|max:10'"
                    name="password"
                    label-placeholder="Password"
                    placeholder="Password"
                    v-model="adminData.password"
                    class="w-full mt-6"
                  />
                  <span class="text-danger text-sm">{{ errors.first('password') }}</span>
                  <vs-input
                    type="password"
                    v-validate="'min:6|max:10|confirmed:password'"
                    data-vv-validate-on="blur"
                    data-vv-as="password"
                    name="confirm_password"
                    label-placeholder="Confirm Password"
                    placeholder="Confirm Password"
                    v-model="confirmPassword"
                    class="w-full mt-6"
                  />
                  <span class="text-danger text-sm">{{ errors.first('confirm_password') }}</span>
                  <vs-button type="border" color="warning" class="mt-6" @click="reset">Reset</vs-button>
                  <vs-button
                    class="float-right mt-6"
                    @click="setupAdmin"
                    :disabled="!validateForm"
                  >Register</vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      pageName: "admin-setup",
      adminData: {
        username: "Admin",
        email: "Alexey.Khlebnikov@outlook.com",
        password: "123456"
      },
      confirmPassword: "123456"
    };
  },
  methods: {
    reset() {
      this.adminData.username = this.adminData.email = this.adminData.password = this.confirmPassword =
        "";
    },
    setupAdmin() {
      if (!this.validateForm) return false;
      this.$store.dispatch('auth/adminSetup', {notify: this.$vs.notify, adminData: this.adminData})
    }
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.adminData.username != "" &&
        this.adminData.password != "" &&
        this.adminData.email != ""
      );
    }
  },
  async beforeCreate() {},
  mounted() {},
  destroyed() {}
};
</script>
