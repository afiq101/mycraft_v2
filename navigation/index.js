export default [
  // {
  //   header: "",
  //   description: "",
  //   child: [
  //     {
  //       title: "Dashboard",
  //       path: "/dashboard",
  //       icon: "ic:outline-dashboard",
  //       child: [],
  //       meta: {},
  //     },
  //   ],
  // },
  // {
  //   header: "Administration",
  //   description: "Manage your application",
  //   child: [
  //     {
  //       title: "Configuration",
  //       icon: "ic:outline-settings",
  //       child: [
  //         {
  //           title: "Environment",
  //           path: "/devtool/config/environment",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Menu Editor",
  //       icon: "ci:menu-alt-03",
  //       path: "/devtool/menu-editor",
  //       child: [],
  //     },
  //     {
  //       title: "Manage Users",
  //       path: "/devtool/user-management",
  //       icon: "ph:user-circle-gear",
  //       child: [
  //         {
  //           title: "User List",
  //           path: "/devtool/user-management/user-list",
  //           icon: "",
  //           child: [],
  //         },
  //         {
  //           title: "Role List",
  //           path: "/devtool/user-management/role-list",
  //           icon: "",
  //           child: [],
  //         },
  //       ],
  //     },
  //     {
  //       title: "Content",
  //       icon: "mdi:pencil-ruler",
  //       child: [
  //         {
  //           title: "Editor",
  //           path: "/devtool/content-editor",
  //         },
  //         {
  //           title: "Template",
  //           path: "/devtool/content-editor/template",
  //         },
  //       ],
  //     },
  //     {
  //       title: "API Editor",
  //       path: "/devtool/api-editor",
  //       icon: "material-symbols:api-rounded",
  //       child: [],
  //     },
  //   ],
  //   meta: {
  //     auth: {
  //       role: ["Developer"],
  //     },
  //   },
  // },
  // {
  //   header: "Help",
  //   description: "Help and documentation",
  //   child: [
  //     {
  //       title: "Documentation",
  //       icon: "solar:book-bookmark-minimalistic-bold",
  //       path: "https://mawar-cms-docs.vercel.app",
  //       external: true,
  //     },
  //     {
  //       title: "UI Components",
  //       icon: "material-symbols:settings-input-component-outline-rounded",
  //       path: "https://corradui.datasc.dev",
  //       external: true,
  //     },
  //   ],
  //   meta: {
  //     auth: {
  //       role: ["Developer"],
  //     },
  //   },
  // },
  {
    header: "Merchant",
    description: "Merchant business management module",
    child: [
      {
        title: "Dashboard",
        path: "/merchant/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Registration",
        path: "/merchant/registration",
        icon: "material-symbols:person-add-rounded",
        child: [],
        meta: {},
      },
      {
        title: "Shop Profile",
        path: "/merchant/shop-profile",
        icon: "ph:shopping-bag-fill",
        child: [],
        meta: {},
      },
      {
        title: "Products",
        path: "",
        icon: "gridicons:product",
        child: [
          {
            title: "Add Products",
            path: "/merchant/product/add",
            icon: "",
            child: [],
            meta: {},
          },
          {
            title: "Manage Products",
            path: "/merchant/product/manage",
            icon: "",
            child: [],
            meta: {},
          },
        ],
        meta: {},
      },
      {
        title: "Customer Orders",
        path: "/merchant/orders",
        icon: "material-symbols-light:orders-rounded",
        child: [
          {
            title: "Manage",
            path: "/merchant/orders/manage-orders",
            icon: "",
            child: [],
            meta: {},
          },
          {
            title: "Return Orders",
            path: "/merchant/orders/return-orders",
            icon: "",
            child: [],
            meta: {},
          },
        ],
        meta: {},
      },
      {
        title: "Financial",
        path: "/merchant/financial",
        icon: "material-symbols:finance-mode",
        child: [
          {
            title: "Income",
            path: "/merchant/financial/income",
            icon: "",
            child: [],
            meta: {},
          },
          {
            title: "Balance",
            path: "/merchant/financial/balance",
            icon: "",
            child: [],
            meta: {},
          },
          {
            title: "Logistics Fee",
            path: "/merchant/financial/logistics-fees",
            icon: " ",
            child: [],
            meta: {},
          },
        ],
        meta: {},
      },
      {
        title: "Livestream",
        path: "/merchant/livestream",
        icon: "ic:sharp-live-tv",
        child: [
          {
            title: "Livestream View",
            path: "/merchant/livestream/livestream-view",
            icon: "",
            child: [],
            meta: {},
          },
          {
            title: "Manage",
            path: "/merchant/livestream/manage",
            icon: "",
            child: [],
            meta: {},
          },
        ],
        meta: {},
      },
      {
        title: "Customer Service",
        path: "/merchant/customer-service",
        icon: "ri:customer-service-fill",
        child: [{
          title: "Manage",
          path: "/merchant/customer-service/manage",
          icon: "",
          child: [],
          meta: {},
        },
        {
          title: "Chat",
          path: "/merchant/customer-service/chat",
          icon: "",
          child: [],
          meta: {},
        },  
      ],
        meta: {},
      },
      {
        title: "Notification",
        path: "/merchant/notification",
        icon: "material-symbols:notifications-rounded",
        child: [],
        meta: {},
      },  
    ],
  },
];
