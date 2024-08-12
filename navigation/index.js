export default [
  {
    header: "",
    description: "",
    child: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Profile Management",
        path: "/profile-management",
        icon: "ic:round-person",
        child: [],
        meta: {},
      },
      {
        title: "User Management",
        path: "/user-management",
        icon: "ic:round-supervisor-account",
        child: [],
        meta: {},
      },
      {
        title: "Product Management",
        // path: "/product-management",
        icon: "ic:outline-dashboard",
        child: [
          {
            title: "Product",
            icon: "",
            path: "/product-management",
          },
          {
            title: "Category",
            icon: "",
            path: "/product-management/category",
          },
          {
            title: "Product Care",
            icon: "",
            path: "/product-management/product-care",
          },
        ],
        meta: {},
      },
      {
        title: "Order Management",
        path: "/order-management",
        icon: "ic:baseline-assignment",
        child: [
          {
            title: "Domestic",
            path: "/order-management/domestic",
            icon: "ph:dot-outline-fill",
            meta: {},
          },
          {
            title: "Non-Domestic",
            path: "/order-management/non-domestic",
            icon: "ph:dot-outline-fill",
            meta: {},
          },
          {
            title: "E-book",
            path: "/order-management/e-book",
            icon: "ph:dot-outline-fill",
            meta: {},
          },
        ],
        meta: {},
      },
      {
        title: "Growth Seller",
        path: "/growth-seller",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Notification Management",
        path: "/notification-management",
        icon: "ic:baseline-notifications",
        child: [],
        meta: {},
      },
      {
        title: "Report Management",
        path: "/report-management",
        icon: "ic:baseline-bar-chart",
        child: [
          {
            title: "User Report",
            path: "/report-management/user",
            icon: "ph:dot-outline-fill",
            meta: {},
          },
          {
            title: "Product Report",
            path: "/report-management/product",
            icon: "ph:dot-outline-fill",
            meta: {},
          },
        ],
        meta: {},
      },
      {
        title: "Marketing Centre",
        path: "/marketing-centre",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Customer Service",
        path: "/customer-service",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Main Page Management",
        path: "/main-page-management",
        icon: "ic:sharp-view-agenda",
        child: [],
        meta: {},
      },
      {
        title: "Template Management",
        path: "/template-management",
        icon: "ic:sharp-file-copy",
        child: [],
        meta: {},
      },
      {
        title: "Livestream Management",
        path: "/livestream-management",
        icon: "ic:twotone-live-tv",
        child: [],
        meta: {},
      },
      {
        title: "Craft Video Management",
        path: "/craft-video-management",
        icon: "ic:baseline-video-library",
        child: [],
        meta: {},
      },
      {
        title: "Craft Education Hub (webinar)",
        path: "/craft-education-hub",
        icon: "ic:baseline-class",
        child: [],
        meta: {},
      },
      {
        title: "Financial Management",
        path: "/financial-management",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Game Management",
        path: "/game-management",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Voucher",
        path: "/voucher",
        icon: "ic:baseline-local-offer",
        child: [],
        meta: {},
      },
      {
        title: "Digital Product Management",
        path: "/digital-product-management",
        icon: "ant-design:product-filled",
        child: [],
        meta: {},
      },
      {
        title: "Coin Management",
        path: "/coin-management",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
    ],
    meta: {
      auth: {
        role: ["Developer"],
      },
    },
  },
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
];
