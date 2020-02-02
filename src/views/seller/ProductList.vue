<!-- =========================================================================================
    File Name: FormWizard.vue
    Description: Form Wizard (third-party) - Imports page portions
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="productList">
    <div class="flex md:items-end items-center justify-between flex-wrap mb-4">
      <!-- TOGGLE SIDEBAR BUTTON -->
      <feather-icon class="inline-flex lg:hidden cursor-pointer mr-4" icon="MenuIcon"
        @click.stop="toggleFilterSidebar" />

      <p class="lg:inline-flex hidden font-semibold product-filters-label">Filters</p>

      <div class="flex justify-between items-end flex-grow">
        <p class="font-semibold md:block hidden">2343 results found</p>

        <div class="flex flex-wrap">
          <!-- SORTING -->
          <vs-select v-model="currentSortItem" @input="sortListItemChanged"
            class="mr-4 vs-input-shadow-drop vs-select-no-border d-theme-input-dark-bg w-48">
            <vs-select-item v-for="item in sortListItems" :key="item.value" :value="item.value" :text="item.text" />
          </vs-select>

          <!-- ITEM VIEW - GRID/LIST -->
          <div>
            <feather-icon icon="GridIcon" @click="currentItemView='item-grid-view'"
              class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
              :svgClasses="{'text-primary stroke-current': currentItemView == 'item-grid-view'}" />
            <feather-icon icon="ListIcon" @click="currentItemView='item-list-view'"
              class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
              :svgClasses="{'text-primary stroke-current': currentItemView == 'item-list-view'}" />
          </div>

          <div class="ml-4">
            <feather-icon icon="PlusIcon" @click="openCreateDialog = true"
              class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer ml-5"
              svgClasses="text-danger stroke-current" />
          </div>
        </div>
      </div>
    </div>
    <div class="relative clearfix" style="min-height: calc(100% - 1rem - 38px);">
      <div>
        <vs-sidebar class="items-no-padding vs-sidebar-rounded background-absolute" :click-not-close="clickNotClose"
          :hidden-background="clickNotClose" v-model="isFilterSidebarActive">
          <div class="p-6 filter-container">
            <!-- CATEGORIES -->
            <h6 class="font-bold mb-4">Category</h6>

            <ul>
              <li v-for="item in categories" :key="item.id" class="flex items-center cursor-pointer py-1"
                @click="selectCategory(item)">
                <feather-icon icon="CircleIcon"
                  :svgClasses="[{ 'text-primary fill-current': !!selected[item.id]}, 'h-5 w-5']" />
                <span class="ml-2" :class="{'text-primary': !!selected[item.id]}">{{ item.name }}</span>
              </li>
            </ul>

            <vs-divider />

            <div class="flex justify-center">
              <vs-button @click.prevent="clearFilter" :disabled="!canRefine">CLEAR ALL FILTERS</vs-button>
            </div>
          </div>
        </vs-sidebar>
      </div>
      <div :class="{'sidebar-spacer-with-margin': clickNotClose}">
        <div>
          <div class="relative mb-8">
            <!-- SEARCH INPUT -->
            <vs-input class="w-full vs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg"
              placeholder="Search here" v-model="showSearchInput" @input="searchKeyInputListener"
              @keyup.esc="clearSearch" size="large" />

            <!-- SEARCH ICON -->
            <div slot="submit-icon" class="absolute top-0 right-0 py-4 px-6" v-show="!showSearchInput">
              <feather-icon icon="SearchIcon" svgClasses="h-6 w-6" />
            </div>

            <!-- CLEAR INPUT ICON -->
            <div slot="reset-icon" class="absolute top-0 right-0 py-4 px-6" v-show="showSearchInput">
              <feather-icon icon="XIcon" svgClasses="h-6 w-6 cursor-pointer" @click="clearSearch" />
            </div>
          </div>


          <!-- GRID VIEW -->
          <template v-if="currentItemView == 'item-grid-view'">
            <div class="items-grid-view vx-row match-height">
              <div class="vx-col lg:w-1/3 sm:w-1/2 w-full" v-for="item in productItems" :key="item.objectID">

                <item-grid-view :item="item">

                  <!-- SLOT: ACTION BUTTONS -->
                  <template slot="action-buttons">
                    <div class="flex flex-wrap">

                      <!-- PRIMARY BUTTON: ADD TO WISH LIST -->
                      <div
                        class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                        @click="selectedProductURL = productImageURL(item.images[0])">
                        <feather-icon icon="HeartIcon"
                          :svgClasses="['h-4 w-4']" />

                        <span class="text-sm font-semibold ml-2">View</span>
                      </div>

                      <!-- SECONDARY BUTTON: ADD-TO/VIEW-IN CART -->
                      <div
                        class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                        @click="openEditDialog(item)">
                        <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                        <span class="text-sm font-semibold ml-2">Edit</span>
                      </div>
                    </div>
                  </template>
                </item-grid-view>

              </div>
            </div>
          </template>

          <!-- LIST VIEW -->
          <template v-else>
            <div class="items-list-view" v-for="item in productItems" :key="item.objectID">

              <item-list-view :item="item">

                <!-- SLOT: ACTION BUTTONS -->
                <template slot="action-buttons">
                  <div
                    class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
                    @click="selectedProductURL = productImageURL(item.images[0])">
                    <feather-icon icon="HeartIcon"
                      :svgClasses="['h-4 w-4']" />
                    <span class="text-sm font-semibold ml-2">View</span>
                  </div>
                  <div
                    class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
                    @click="openEditDialog(item)">
                    <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                    <span class="text-sm font-semibold ml-2">Edit</span>
                  </div>
                </template>
              </item-list-view>

            </div>
          </template>


            <vs-pagination :total="paginationData.pages" :max="7" :value="paginationData.page" @input="(val) => { setPage(val) }" />
        </div>
      </div>
    </div>
    <add-new-data-sidebar :isSidebarActive="openCreateDialog" :data="selectedProduct" @closeSidebar="openCreateDialog = false, selectedProduct = null" @newProduct="createNewProduct" />
    <gallery :images="imageURLs" :index="selectedProductURL" @close="selectedProductURL = null"></gallery>
  </div>
</template>

<script>
import AddNewDataSidebar from '@/views/components/seller/AddNewDataSidebar.vue';
import ApiProduct from "@/api/product"
import Store from '@/store'
import { Api } from '@/api'
import { mapState } from 'vuex'
import VueGallery from 'vue-gallery';


  export default {
    data() {
      return {
        sortListItems: [
          { value: 0, text: "Featured" },
          { value: 1, text: "Lowest Price" },
          { value: -1, text: "Highest Price" }
        ],
        currentSortItem: 0,
        currentItemView: "item-grid-view",

        showSearchInput: "",
        clickNotClose: true,
        isFilterSidebarActive: true,

        productItems: [],

        openCreateDialog: false,
        selected: {},
        selectedProductURL: null,
        selectedProduct: null,
        paginationData: {
          docs: [],
          total: 0,
          limit: 9,
          page: 1,
          pages: 1
        },

        filterOption: {
          page: 0,
          limit: 9
        },

      };
    },
    async beforeRouteEnter(to, from, next) {
      await Store.dispatch('product/loadCategories')
      await Store.dispatch('product/loadPriceUnits');
      let res = await Api.post('/product/find')
      next(vm => {
        vm.productItems = res.docs
        vm.paginationData = res
      })
    },
    sockets: {
      createNewProduct() {
        this.loadProducts();
      }
    },

    components: {
      ItemGridView: () => import("@/views/components/seller/ItemGridView.vue"),
      ItemListView: () => import("@/views/components/seller/ItemListView.vue"),
      AddNewDataSidebar,
      gallery: VueGallery
    },
    computed: {
      ...mapState('product', ['categories']),
      canRefine() {
        return true;
      },
      imageURLs() {
        return this.productItems.map(item => this.productImageURL(item.images[0]))
      }
    },
    methods: {
      setPage(val) {
        this.filterOption.page = val;
        this.loadProducts();
      },
      async loadProducts() {
        let filtered_categories = []
        for (const id in this.selected) {
          if (this.selected.hasOwnProperty(id)) {
            const selected = this.selected[id];
            if(selected) filtered_categories.push(id)
          }
        }
        this.filterOption.order = this.currentSortItem

        Api.post('/product/find', {query: {categories: filtered_categories, name: this.showSearchInput }, options: this.filterOption}).then(res => {
          this.productItems = res.docs
          this.paginationData = res
        })
      },
      productImageURL(url) {
        return Api.getURL('/product/productImage/' + url)
      },
      sortListItemChanged() {
        this.loadProducts()
      },
      async selectCategory(item) {
        let clicked = !this.selected[item.id]
        this.selected = {};
        this.selected[item.id] = clicked
        this.loadProducts();
      },
      clearFilter() {
        this.selected = {}
        this.loadProducts();
      },
      clearSearch() { },
      searchKeyInputListener(e) {
        this.loadProducts();
      },
      handleWindowResize(event) {
        this.windowWidth = event.currentTarget.innerWidth;
        this.setSidebarWidth();
      },
      setSidebarWidth() {
        if (this.windowWidth < 992) {
          this.isFilterSidebarActive = this.clickNotClose = false;
        } else {
          this.isFilterSidebarActive = this.clickNotClose = true;
        }
      },
      createNewProduct(product) {
        ApiProduct.create(product)
        .then(() => {
          this.openCreateDialog = false
        })
      },

      // GRID VIEW - ACTIONS
      toggleFilterSidebar() {
        if (this.clickNotClose) return;
        this.isFilterSidebarActive = !this.isFilterSidebarActive;
      },
      toggleItemInWishList(item) {
        this.$store.dispatch("eCommerce/toggleItemInWishList", item);
      },
      additemInCart(item) {
        this.$store.dispatch("eCommerce/additemInCart", item);
      },
      cartButtonClicked(item) {
        console.log(item);
      },
      openEditDialog(data) {
        this.selectedProduct = data
        this.openCreateDialog = true
      }
    },
    created() {
      this.$nextTick(() => {
        window.addEventListener("resize", this.handleWindowResize);
      });
      this.setSidebarWidth();
    },
    beforeDestroy: function () {
      window.removeEventListener("resize", this.handleWindowResize);
    }
  };
</script>

<style lang="scss">
  #productList {
    .product-filters-label {
      width: calc(260px + 2.4rem);
    }

    .vs-sidebar {
      position: relative;
      float: left;
    }

    .item-list-view {}

    .item-view-primary-action-btn {
      color: #2c2c2c !important;
      background-color: #f6f6f6;
      min-width: 50%;
    }

    .item-view-secondary-action-btn {
      min-width: 50%;
    }
  }

  .theme-dark {
    .vs-sidebar {
      background-color: #10163a;
    }
  }

  @media (min-width: 992px) {
    .vs-sidebar-rounded {
      .vs-sidebar {
        border-radius: 0.5rem;
      }

      .vs-sidebar--items {
        border-radius: 0.5rem;
      }
    }
  }

  @media (max-width: 992px) {
    .vs-sidebar {
      position: absolute !important;
      float: none !important;
    }
  }
</style>
