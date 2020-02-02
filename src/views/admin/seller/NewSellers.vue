<!-- =========================================================================================
  File Name: DataListThumbView.vue
  Description: Data List - Thumb View
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <vs-table
      ref="table"
      multiple
      v-model="selected"
      pagination
      :max-items="itemsPerPage"
      search
      :data="users"
    >
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
        <div class="flex flex-wrap-reverse items-center">
          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mr-4 mb-4">
            <div
              class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32"
            >
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>
              <vs-dropdown-item>
                <span>Delete</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span>Archive</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span>Print</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span>Another Action</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div
            class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
          >
            <span class="mr-2">
              {{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
              {{ users.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : users.length }} of
              {{ users.length }}
            </span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>
            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th>Image</vs-th>
        <vs-th sort-key="username">Name</vs-th>
        <vs-th sort-key="email">Email</vs-th>
        <vs-th sort-key="commercialRecord">Commercial</vs-th>
        <vs-th sort-key="role">Role</vs-th>
        <vs-th sort-key="createdAt">Registered Time</vs-th>
        <vs-th>Control</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="img-container">
              <!-- <img :src="tr.img" class="product-img" /> -->
            </vs-td>

            <vs-td>
              <p class="product-name font-medium">{{ tr.username }}</p>
            </vs-td>

            <vs-td>
              <p class="product-category">{{ tr.email }}</p>
            </vs-td>

            <vs-td>
              <p class="product-category">{{ tr.commercialRecord }}</p>
            </vs-td>

            <vs-td>
              <vs-chip
                :color="getRoleStatusColor(tr.role)"
                class="product-order-status"
              >{{ tr.role }}</vs-chip>
            </vs-td>

            <vs-td>
              <p class="product-price">${{ tr.createdAt }}</p>
            </vs-td>

            <vs-td width="150">
              <div class="seller-control">
                <vs-button
                  color="primary"
                  radius
                  type="filled"
                  icon-pack="feather"
                  icon="icon-eye"
                  @click="viewSellerDetail(indextr)"
                ></vs-button>
                <vs-button
                  color="success"
                  radius
                  type="filled"
                  icon-pack="feather"
                  icon="icon-user"
                  @click="viewLicenseImage(tr.licenseImage)"
                ></vs-button>
              </div>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <vs-popup class="holamundo" title="Seller Detail View" :active.sync="popupActive">
      <div class="vx-row">
        <div class="col w-full m-5">
          <div class="flex justify-between">
            <span class="text-grey">Name</span>
            <span class>{{ selectedSeller.username }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-grey">Email</span>
            <span class>{{ selectedSeller.email }}</span>
          </div>
          <div class="vs-component vs-divider">
            <span
              class="vs-divider-border after"
              style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"
            ></span>
            <!---->
            <span
              class="vs-divider-border before"
              style="width: 100%; border-top: 1px solid rgba(0, 0, 0, 0.1);"
            ></span>
          </div>
          <div class="flex justify-between">
            <span class="text-grey">Commercial Record</span>
            <span class="font-medium">{{ selectedSeller.commercialRecord }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-grey">City</span>
            <span>{{ selectedSeller.city }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-grey">Neighborhood</span>
            <span class>{{ selectedSeller.neighborhood }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-grey">Branch</span>
            <span>{{ selectedSeller.branch }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-grey">Country</span>
            <span class>{{ selectedSeller.country }}</span>
          </div>
          <div class="flex justify-between mt-5">
            <button
              name="button"
              class="vs-component vs-button vs-button-warning vs-button-border mt-5 w-2/5"
            >
              <span
                class="vs-button-backgroundx vs-button--background"
                style="opacity: 1; left: 20px; top: 20px; width: 0px; height: 0px; transition: width 0.3s ease 0s, height 0.3s ease 0s, opacity 0.3s ease 0s;"
              ></span>
              <!---->
              <span class="vs-button-text vs-button--text">Reject</span>
              <span
                class="vs-button-linex"
                style="top: auto; bottom: -2px; left: 50%; transform: translate(-50%);"
              ></span>
            </button>
            <button
              name="button"
              class="vs-component vs-button vs-button-success vs-button-filled mt-5 w-2/5"
              @click="approveSeller(selectedSeller.id)"
            >
              <span
                class="vs-button-backgroundx vs-button--background"
                style="opacity: 1; left: 20px; top: 20px; width: 0px; height: 0px; transition: width 0.3s ease 0s, height 0.3s ease 0s, opacity 0.3s ease 0s;"
              ></span>
              <!---->
              <span class="vs-button-text vs-button--text">Approve</span>
              <span
                class="vs-button-linex"
                style="top: auto; bottom: -2px; left: 50%; transform: translate(-50%);"
              ></span>
            </button>
          </div>
        </div>
      </div>
    </vs-popup>
    <vs-popup class="holamundo" title="Seller License" :active.sync="popupLicenseImage">
      <img
        v-if="licenseImageId"
        class="responsive shadow-md rounded-lg"
        :src="licenseImageURL"
        alt="user-upload"
      />
    </vs-popup>
  </div>
</template>

<script>
import adminApi from "@/api/admin";
export default {
  data() {
    return {
      selected: [],
      users: [],
      itemsPerPage: 4,
      isMounted: false,
      popupActive: false,
      popupLicenseImage: false,
      selectedSeller: {},
      licenseImageId: null
    };
  },
  sockets: {
    newSeller(user) {
      console.log("socket", user);
      this.users.push(this.formatData(user))
    }
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    licenseImageURL() {
      if (this.licenseImageId)
        return (
          process.env.VUE_APP_API_URL +
          "/seller/licenseImage/" +
          this.licenseImageId
        );
      return null;
    }
  },
  methods: {
    getRoleStatusColor(status) {
      if (status == "on hold") return "warning";
      if (status == "delivered") return "success";
      if (status == "canceled") return "danger";
      return "primary";
    },
    getPopularityColor(num) {
      if (num > 90) return "success";
      if (num > 70) return "primary";
      if (num >= 50) return "warning";
      if (num < 50) return "danger";
      return "primary";
    },
    formatData(data) {
      // formats data received from API
      return data;
    },
    viewSellerDetail(index) {
      this.selectedSeller = this.users[index];
      this.popupActive = true;
    },
    viewLicenseImage(fileId) {
      this.licenseImageId = fileId;
      this.popupLicenseImage = true;
    },
    approveSeller(sellerId) {
      this.$vs.loading(true);
      adminApi
        .approveUser(sellerId)
        .then(() => {
          this.popupActive = false
          this.users = this.users.filter(user => this.selectedSeller.id != user.id)
          this.$vs.loading.close();
        })
        .catch(() => {
          this.popupActive = false
          this.$vs.loading.close();
        });
    }
  },
  created() {
    adminApi
      .newSellers()
      .then(response => {
        this.users = this.formatData(response);
      })
      .catch(error => {
        this.$vs.notify({
          title: "Error",
          text: error,
          color: "danger",
          iconPack: "feather",
          icon: "icon-alert-circle"
        });
      });
  },
  mounted() {
    this.isMounted = true;
  }
};
</script>

<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {
    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;

      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);

        td {
          padding: 10px;

          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }

          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }

          &.img-container {
            // width: 1rem;
            // background: #fff;

            span {
              display: flex;
              justify-content: center;
            }

            .product-img {
              height: 110px;
            }
          }
        }

        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }

      th.td-check {
        padding: 0 15px !important;
      }

      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }

  .seller-control {
    & > button {
      display: inline-block;
    }
  }

  .seller-control > button ~ button {
    margin-left: 0.25rem;
  }
}
</style>
