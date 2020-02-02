<template>
  <div class="h-screen flex w-full bg-img" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 mx-auto self-center">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row">
            <div class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center">
              <img src="@/assets/images/pages/register.jpg" alt="login" class="mx-auto" />
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center d-theme-dark-bg">
              <div class="vx-row pt-5">
                <div class="vx-col mt-5">
                  <h2>Create Account</h2>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col w-full">
                  <form-wizard
                    color="rgba(var(--vs-primary), 1)"
                    errorColor="rgba(var(--vs-danger), 1)"
                    :title="null"
                    :subtitle="null"
                    finishButtonText="Submit"
                  >
                    <tab-content
                      title="Step 1"
                      class="mb-5"
                      icon="feather icon-home"
                      :before-change="validateStep1"
                    >
                      <form data-vv-scope="step-1">
                        <div class="vx-row">
                          <div class="vx-col w-full mt-5">
                            <vs-input
                              size="large"
                              label="Your Name"
                              v-model="seller.name"
                              class="w-full"
                              name="name"
                              v-validate="'required|alpha'"
                            />
                            <span class="text-danger">{{ errors.first('step-1.name') }}</span>
                          </div>
                          <div class="vx-col w-full mt-5">
                            <vs-input
                              type="email"
                              size="large"
                              label="Email"
                              v-model="seller.email"
                              class="w-full"
                              name="email"
                              v-validate="'required|email'"
                            />
                            <span class="text-danger">{{ errors.first('step-1.email') }}</span>
                          </div>
                          <div class="vx-col w-full mt-5">
                            <vs-input
                              type="password"
                              size="large"
                              v-validate="'required|min:6|max:10'"
                              ref="password"
                              label="Your Password"
                              name="password"
                              v-model="seller.password"
                              class="mt-5 w-full"
                            />
                            <span
                              class="text-danger text-sm"
                              v-show="errors.has('step-1.password')"
                            >{{ errors.first('step-1.password') }}</span>
                          </div>
                          <div class="vx-col w-full mt-5">
                            <vs-input
                              type="password"
                              size="large"
                              v-validate="'required|min:6|max:10|confirmed:password'"
                              data-vv-as="password"
                              label="Confirm Password"
                              name="confirm_password"
                              v-model="confirm_password"
                              class="mt-5 w-full"
                            />
                            <span
                              class="text-danger text-sm"
                              v-show="errors.has('step-1.confirm_password')"
                            >{{ errors.first('step-1.confirm_password') }}</span>
                          </div>
                        </div>
                      </form>
                    </tab-content>

                    <tab-content
                      title="Step 2"
                      class="mb-5"
                      icon="feather icon-briefcase"
                      :before-change="validateStep2"
                    >
                      <form data-vv-scope="step-2">
                        <div class="vx-row">
                          <div class="vx-col w-full mt-5">
                            <vs-input
                              size="large"
                              label="Commercial Record"
                              v-model="seller.commercialRecord"
                              class="w-full"
                              name="commercial_record"
                              v-validate="'required'"
                            />
                            <span class="text-danger">{{ errors.first('step-2.commercial_record') }}</span>
                          </div>
                          <div class="vx-col w-full mt-5">
                            <vs-input
                              type="hidden"
                              size="large"
                              label="License"
                              v-model="license"
                              class="v-full"
                              name="license"
                              v-validate="'required'"
                            />
                            <vx-card>
                              <div slot="no-body" style="height: 300px; overflow-y: auto;">
                                <vs-button
                                  v-if="!licenseSrc"
                                  type="border"
                                  class="h-full w-full"
                                  @click.prevent="selectLicenseImage"
                                >Select your file</vs-button>
                                <input
                                  type="file"
                                  style="display: none;"
                                  name="license_image"
                                  accept="image/*"
                                  ref="licenseIamge"
                                  @change="selectedLicenseImage"
                                />
                                <img
                                  v-if="licenseSrc"
                                  :src="licenseSrc"
                                  alt="content-img"
                                  class="responsive card-img-top v-full"
                                />
                                <vs-button
                                  v-if="licenseSrc"
                                  radius
                                  color="danger"
                                  type="border"
                                  icon-pack="feather"
                                  icon="icon-x"
                                  style="position: absolute; right: -19px; top: -19px;"
                                  @click.prevent="unselectLicenseImage"
                                ></vs-button>
                              </div>
                            </vx-card>
                            <span class="text-danger">{{ errors.first('step-2.license') }}</span>
                          </div>
                        </div>
                      </form>
                    </tab-content>

                    <tab-content
                      title="Step 3"
                      class="mb-5"
                      icon="feather icon-image"
                      :before-change="validateStep3"
                    >
                      <form data-vv-scope="step-3">
                        <div class="vx-row">
                          <div class="vx-col w-full">
                            <vs-input
                              label="City/Cities *"
                              v-model="seller.city"
                              class="w-full mt-5"
                              name="city"
                              v-validate="'required'"
                            />
                            <span class="text-danger">{{ errors.first('step-3.city') }}</span>
                          </div>
                          <div class="vx-col w-full">
                            <vs-select
                              v-model="seller.neighborhood"
                              class="w-full select-large mt-5"
                              label="Event Location"
                            >
                              <vs-select-item
                                :key="index"
                                :value="item.value"
                                :text="item.text"
                                v-for="(item,index) in cityOptions"
                                class="w-full"
                              />
                            </vs-select>
                          </div>
                          <div class="vx-col w-full mt-5">
                            <vs-select
                              v-model="seller.branch"
                              class="w-full select-large"
                              label="Branches"
                            >
                              <vs-select-item
                                :key="index"
                                :value="item.value"
                                :text="item.text"
                                v-for="(item,index) in statusOptions"
                                class="w-full"
                              />
                            </vs-select>
                          </div>
                          <div class="vx-col w-full">
                            <vs-select
                              v-model="seller.country"
                              class="w-full select-large mt-5"
                              label="country"
                            >
                              <vs-select-item
                                :key="index"
                                :value="item.value"
                                :text="item.text"
                                v-for="(item,index) in cityOptions"
                                class="w-full"
                              />
                            </vs-select>
                          </div>
                        </div>
                      </form>
                    </tab-content>
                  </form-wizard>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col mx-auto mb-5">
                  <vs-button
                    color="primary"
                    type="border"
                    @click.prevent="$router.replace({path: '/login'})"
                  >Go to Login</vs-button>
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
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

// For custom error message
import { Validator } from "vee-validate";
const dict = {
  custom: {
    name: {
      required: "Name is required",
      alpha: "Name may only contain alphabetic characters"
    },
    email: {
      required: "Email is required",
      email: "Please enter valid email"
    },
    job_title: {
      required: "Job title name is required",
      alpha: "Job title may only contain alphabetic characters"
    },
    commercial_record: {
      required: "Commercial Record is required"
    },
    license: {
      required: "Please input license file"
    }
  }
};

// register custom messages
Validator.localize("en", dict);

export default {
  data() {
    return {
      seller: {
        name: "Sotnikov",
        email: "sotnikov.uri@gmail.com",
        password: "123456",

        commercialRecord: "sample commercial record",
        licenseImage: null,

        city: "new-york",
        neighborhood: "new-york",
        branch: "plannning",
        country: "boston"
      },
      confirm_password: "123456",
      license: "",
      licenseSrc: null,

      cityOptions: [
        { text: "New York", value: "new-york" },
        { text: "Chicago", value: "chicago" },
        { text: "San Francisco", value: "san-francisco" },
        { text: "Boston", value: "boston" }
      ],
      statusOptions: [
        { text: "Plannning", value: "plannning" },
        { text: "In Progress", value: "in progress" },
        { text: "Finished", value: "finished" }
      ],
      LocationOptions: [
        { text: "New York", value: "new-york" },
        { text: "Chicago", value: "chicago" },
        { text: "San Francisco", value: "san-francisco" },
        { text: "Boston", value: "boston" }
      ]
    };
  },
  sockets: {},
  methods: {
    validateStep1() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-1").then(result => {
          if (result) {
            resolve(true);
          } else {
            reject("correct all values");
          }
        });
      });
    },
    validateStep2() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-2").then(result => {
          if (result) {
            resolve(true);
          } else {
            reject("correct all values");
          }
        });
      });
    },
    validateStep3() {
      return new Promise((resolve, reject) => {
        this.$validator.validateAll("step-3").then(result => {
          if (result) {
            resolve(true);
            this.register();
          } else {
            reject("correct all values");
          }
        });
      });
    },
    selectLicenseImage() {
      this.$refs.licenseIamge.click();
    },
    selectedLicenseImage(e) {
      this.seller.licenseImage = null;
      if (e.target.files && (this.seller.licenseImage = e.target.files[0])) {
        this.licenseSrc = URL.createObjectURL(this.seller.licenseImage);
        this.license = "true";
      } else {
        this.licenseSrc = null;
        this.license = "";
      }
    },
    unselectLicenseImage() {
      this.$refs.licenseIamge.value = "";
      this.licenseSrc = null;
      this.license = "";
      this.seller.licenseImage = null;
    },
    async register() {
      if (this.$auth.isAuthenticated) {
        this.notifyAlreadyLogedIn();
        return;
      }
      this.$vs.loading({ type: "radius" });

      const payload = {
        userDetails: this.seller,
        notify: this.$vs.notify,
        acl: this.$acl
      };

      this.$store
        .dispatch("auth/registerUser", payload)
        .then(() => this.$vs.loading.close());
    },
    notifyAlreadyLogedIn() {
      this.$vs.notify({
        title: "Login Attempt",
        text: "You are already logged in!",
        iconPack: "feather",
        icon: "icon-alert-circle",
        color: "warning"
      });
    }
  },
  components: {
    FormWizard,
    TabContent
  }
};
</script>
