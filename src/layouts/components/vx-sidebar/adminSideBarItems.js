/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: '/admin',
    name: "Dashboard",
    slug: "dashboard",
    // tag: "2",
    // tagColor: "warning",
    icon: "HomeIcon",
    i18n: "Dashboard"
  },
  {
    header: "Users",
    i18n: "Users",
  },
  {
    url: null,
    name: "Sellers",
    slug: "Sellers",
    icon: "MailIcon",
    i18n: "Sellers",
    submenu: [
      {
        url: '/admin/users/seller',
        name: "Seller List",
        slug: "sellerList",
        i18n: "Seller List",
      },
      {
        url: '/admin/users/seller/new',
        name: "New Sellers",
        slug: "newSellers",
        i18n: "New Sellers",
      },
    ]
  },
  {
    url: null,
    name: "Drivers",
    slug: "Drivers",
    icon: "MessageSquareIcon",
    i18n: "Drivers",
    submenu: [
      {
        url: '/admin/users/driver',
        name: "Driver List",
        slug: "DriverList",
        i18n: "Driver List",
      },
      {
        url: '/admin/users/driver/new',
        name: "New Drivers",
        slug: "newDrivers",
        i18n: "New Drivers",
      },
    ]
  },
  {
    url: null,
    name: "Buyers",
    slug: "Buyers",
    icon: "CheckSquareIcon",
    i18n: "Buyers",
    submenu: [
      {
        url: '/admin/users/buyer',
        name: "Buyer List",
        slug: "BuyerList",
        i18n: "Buyer List",
      },
      {
        url: '/admin/users/buyer/new',
        name: "New Buyers",
        slug: "newBuyers",
        i18n: "New Buyers",
      },
    ]
  },
]
