<!-- =========================================================================================
    File Name: AgGridTable.vue
    Description: Ag Grid table
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div id="ag-grid-demo">
    <vx-card>
      <!-- TABLE ACTION ROW -->
      <div class="flex flex-wrap justify-between items-center">
        <!-- ITEMS PER PAGE -->
        <div class="mb-4 md:mb-0 mr-4 ag-grid-table-actions-left">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium"
            >
              <span
                class="mr-2"
              >{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ drivers.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : drivers.length }} of {{ drivers.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(50)">
                <span>50</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(100)">
                <span>100</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(150)">
                <span>150</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <div class="flex flex-wrap items-center justify-between ag-grid-table-actions-right">
          <vs-input
            class="mb-4 md:mb-0 mr-4"
            v-model="searchQuery"
            @input="updateSearchQuery"
            placeholder="Search..."
          />
          <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button>
        </div>
      </div>

      <ag-grid-vue
        @grid-ready="onGridReady"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="drivers"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
      ></ag-grid-vue>
      <vs-pagination :total="totalPages" :max="maxPageNumbers" v-model="currentPage" />
    </vx-card>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
const VxTour = () => import("@/components/VxTour.vue");

import driverApi from "@/api/driver";
import Child from "@/components/admin/Child"

import "@/assets/scss/vuesax/extraComponents/agGridStyleOverride.scss";

export default {
  components: {
    AgGridVue,
    VxTour,
  },
  data() {
    return {
      searchQuery: "",
      gridOptions: {},
      maxPageNumbers: 7,
      gridApi: null,
      gridColumnApi: null,
      defaultColDef: {
        sortable: true,
        // editable: true,
        autoHeight: true,
        cellStyle: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          wordBreak: "break-all",
          whiteSpace: "normal",
          lineHeight: "1.2"
        },
        resizable: true,
        suppressMenu: true
      },
      columnDefs: null,
      drivers: [],
      context: null
    };
  },
  watch: {
    "$store.state.windowWidth"(val) {
      if (val <= 576) {
        this.maxPageNumbers = 4;
        this.gridOptions.columnApi.setColumnPinned("email", null);
      } else this.gridOptions.columnApi.setColumnPinned("email", "left");
    }
  },
  computed: {
    paginationPageSize() {
      if (this.gridApi) return this.gridApi.paginationGetPageSize();
      else return 50;
    },
    totalPages() {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages();
      else return 0;
    },
    currentPage: {
      get() {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1;
        else return 1;
      },
      set(val) {
        this.gridApi.paginationGoToPage(val - 1);
      }
    }
  },
  beforeMount() {
    this.context = {
      componentParent: this
    };

    this.columnDefs = [
      {
        headerName: "Avatar",
        field: "avatar",
        width: 195,
        cellRenderer: this.avatarCellRenderer,
        filter: false,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true
      },
      {
        headerName: "User Name",
        field: "username",
        filter: true,
        width: 175
      },
      {
        headerName: "Email",
        field: "email",
        filter: true,
        width: 150
        // pinned: 'left'
      },
      {
        headerName: "Address",
        cellRenderer: this.addresCellRenderer,
        field: "company",
        filter: true,
        width: 250
      },
      {
        headerName: "Country",
        field: "country",
        filter: true,
        width: 150
      },
      {
        headerName: "Activation",
        field: "activated",
        filter: "agNumberColumnFilter",
        width: 120
      },
      {
        headerName: "Last Login Time",
        cellRenderer: this.loginTimeCellRenderer,
        cellStyle: {
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          wordBreak: "break-all",
          whiteSpace: "normal",
          lineHeight: "1.2",
          wordBreak: "break-word"
        },
        field: "loginTime",
        filter: true,
        width: 150
      },
      {
        headerName: "Controls",
        field: "id",
        cellRendererFramework: Child,
        filter: true,
        width: 150
      }
    ];
  },
  methods: {
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val);
    },
    avatarCellRenderer(params) {
      let flag =
        "<img border='0' width='100' height='100' style='display: block' src='/assets/img/avatar/default.png'>";
      return flag;
    },
    addresCellRenderer({ data }) {
      return data.city + " " + data.neighborhood + " " + data.branch;
    },
    loginTimeCellRenderer({ data }) {
      return this.$global.convertDate(data.loginTime);
    },
    controlCellRenderer({ data }) {
      return '<vs-button radius color="danger" type="gradient" icon-pack="feather" icon="icon-user-plus"></vs-button>';
    },
    loadData() {
      driverApi.allDrivers().then(data => {
        this.drivers = data;
      });
    },
    onGridReady(params) {
      this.gridApi.sizeColumnsToFit();
      this.loadData();
    }
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  }
};
</script>

<style>
.ag-cell-wrapper {
  display: flex;
  align-items: center;
}
</style>