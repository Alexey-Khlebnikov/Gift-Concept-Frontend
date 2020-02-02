<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar id="addNewDataSidebar" click-not-close position-right parent="body" default-index="1" color="primary"
    class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ data ? 'Edit Product': 'Add New Product' }}</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6" :settings="settings">
      <form data-vv-scope="new-product" @submit="preventDefault" >
        <div class="p-6">
          <!-- NAME -->
          <vs-input label="Name" name="name" v-model="name" v-validate="'required'" class="mt-5 w-full" />
          <span class="text-danger">{{ errors.first('new-product.name') }}</span>

          <!-- CATEGORY -->
          <vs-select v-model="category" label="Category" class="mt-5 w-full">
            <vs-select-item :key="item.id" :value="item.id" :text="item.name" v-for="item in categories" />
          </vs-select>

          <!-- CATEGORY -->
          <vs-select v-model="priceUnit" label="Price Unit" class="mt-5 w-full">
            <vs-select-item :key="item.id" :value="item.id" :text="`${item.name} (${item.symbol})`"
              v-for="item in priceUnits" />
          </vs-select>

          <!-- PRICE -->
          <vs-input label="Price" type="number" min="0" name="price" v-model="price" v-validate="'required'"
            class="mt-5 w-full" />
          <span class="text-danger">{{ errors.first('new-product.price') }}</span>

          <vs-textarea :counter="productDetailLength" label="Detail" :counter-danger.sync="detailCounterDanger" v-validate="'required'"
            v-model="detail" name="detail" class="mt-5" height="100" />
          <span class="text-danger">{{ errors.first('new-product.detail') }}</span>
          <!-- IMG -->
          <vs-upload text="Upload Image" class="img-upload" ref="fileUpload" limit="4" :multiple="true" />
          <vs-input type="hidden" name="imagesSrcs" v-validate="'required'" v-model="imagesSrcs" />
          <span class="text-danger">{{ errors.first('new-product.imagesSrcs') }}</span>
        </div>
      </form>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6" @click="actionAddNewProduct">{{ data ? 'Edit Data' : 'AddData' }}</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import { mapState } from 'vuex'

  // For custom error message
  import { Validator } from "vee-validate";
  const dict = {
    custom: {
      name: {
        required: "Name is required",
      },
      imagesSrcs: {
        required: "Please select images for current product",
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
    props: {
      isSidebarActive: {
        type: Boolean,
        required: true
      },
      data: {
        type: Object,
        default: null
      }
    },
    watch: {
      isSidebarActive(newValue) {
        if(newValue) {
          this.intervalTimer = setInterval(() => {
            this.checkVSUpload()
          }, 200);
        } else {
          clearInterval(this.intervalTimer);
        }
      },
      data(newValue) {
        this.initValues(newValue);
        console.log(newValue);
      }
    },
    data() {
      return {
        name: '',
        category: '',
        priceUnit: '',
        price: '',
        detail: '',
        images: [],


        detailCounterDanger: false,

        settings: { // perfectscrollbar settings
          maxScrollbarLength: 60,
          wheelSpeed: .60,
        },
        intervalTimer: null
      }
    },
    computed: {
      ...mapState('product', ['categories', 'priceUnits', 'productDetailLength']),
      isSidebarActiveLocal: {
        get() {
          return this.isSidebarActive
        },
        set(val) {
          if (!val) {
            this.$emit('closeSidebar');
            this.initValues();
          }
        }
      },
      imagesSrcs: {
        get() {
          if(this.images.length) {
            return "true"
          }
          return "";
        },
        set(val) {
          console.log("imagesSrcs set")
          if(!val && this.$refs.fileUpload) {
            this.$refs.fileUpload.filesx = [];
            this.$refs.fileUpload.srcs = [];
          }
        }
      },
    },
    mounted() {

      this.initValues(this.data);
    },
    methods: {
      initValues(data) {
        if(data) {
          this.name = data.name;
          this.category = data.category;
          this.priceUnit = data.priceUnit;
          this.price = data.price;
          this.detail = data.detail;
          this.detailCounterDanger = false
          this.imagesSrcs = "true"
        } else {
          this.name = 'Good Product';
          this.category = this.categories[0].id;
          this.priceUnit = this.priceUnits[0].id;
          this.price = '200';
          this.detail = 'This is a very good product';
          this.detailCounterDanger = false
          this.imagesSrcs = ""
        }
      },
      checkVSUpload() {
        if(this.$refs.fileUpload) {
          this.images = this.$refs.fileUpload.filesx.filter(file => !file.remove)
        }
      },
      preventDefault(e) {
        e.preventDefault();
      },
      actionAddNewProduct(e) {
        e.preventDefault();
        this.checkVSUpload()
        this.$validator.validateAll("new-product").then(result => {
          if (result) {
            this.$emit("newProduct", {
              name: this.name,
              category: this.category,
              priceUnit: this.priceUnit,
              price: this.price,
              detail: this.detail,
              images: this.images
            });
          }
          this.initValues();
        });
      }
    },
    components: {
      VuePerfectScrollbar,
    }
  }
</script>

<style lang="scss" scoped>
  .add-new-data-sidebar {
    /deep/ .vs-sidebar--background {
      z-index: 51999;
    }

    /deep/ .vs-sidebar {
      z-index: 51999;
      width: 400px;
      max-width: 90vw;

      .img-upload {
        margin-top: 2rem;

        .con-img-upload {
          padding: 0;

          .img-upload {
            width: 100%;
            margin-left: 0;
            margin-right: 0;

            .btn-upload-file {
              display: none;
            }
          }
        }

        .con-input-upload {
          width: 100%;
          margin: 0;
        }
      }
    }
  }

  .scroll-area--data-list-add-new {
    height: calc(100% - 4.3rem);
  }
</style>

<style lang="scss">
  #addNewDataSidebar {
    .con-img-upload {
      .img-upload {
        width: 100%;
        margin-left: 0;
        margin-right: 0;

        .btn-upload-file {
          display: none;
        }
      }
    }
  }
</style>
