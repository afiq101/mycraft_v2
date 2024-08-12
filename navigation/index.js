export default [
  {
    header: "",
    description: "",
    child: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Profile Management",
        path: "/admin/profile-management",
        icon: "ic:round-person",
        child: [],
        meta: {},
      },
      {
        title: "User Management",
        path: "/admin/user-management",
        icon: "ic:round-supervisor-account",
        child: [],
        meta: {},
      },
      {
        title: "Product Management",
        // path: "/product-management",
        icon: "ant-design:product-filled",
        child: [
          {
            title: "Product",
            icon: "",
            path: "/admin/product-management",
          },
          {
            title: "Category",
            icon: "",
            path: "/admin/product-management/category",
          },
          {
            title: "Product Care",
            icon: "",
            path: "/admin/product-management/product-care",
          },
        ],
        meta: {},
      },
      {
        title: "Order Management",
        path: "",
        icon: "ic:baseline-assignment",
        child: [
          {
            title: "Domestic",
            path: "/admin/order-management/domestic",
            icon: "ph:dot-outline-fill",
            meta: {},
          },
          {
            title: "Non-Domestic",
            path: "/admin/order-management/non-domestic",
            icon: "ph:dot-outline-fill",
            meta: {},
          },
          {
            title: "E-book",
            path: "/admin/order-management/e-book",
            icon: "ph:dot-outline-fill",
            meta: {},
          },
        ],
        meta: {},
      },
      {
        title: "Growth Seller",
        path: "/admin/growth-seller",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Notification Management",
        path: "/admin/notification-management",
        icon: "ic:baseline-notifications",
        child: [],
        meta: {},
      },
      {
        title: "Report Management",
        path: "/admin/report-management",
        icon: "ic:baseline-bar-chart",
        child: [
          {
            title: "User Report",
            path: "/admin/report-management/user",
            icon: "ph:dot-outline-fill",
            meta: {},
          },
          {
            title: "Product Report",
            path: "/admin/report-management/product",
            icon: "ph:dot-outline-fill",
            meta: {},
          },
        ],
        meta: {},
      },
      {
        title: "Marketing Centre",
        path: "/admin/marketing-centre",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Customer Service",
        path: "/admin/customer-service",
        icon: "ri:customer-service-2-fill",
        child: [],
        meta: {},
      },
      {
        title: "Main Page Management",
        path: "/admin/main-page-management",
        icon: "ic:sharp-view-agenda",
        child: [],
        meta: {},
      },
      {
        title: "Template Management",
        path: "/admin/template-management",
        icon: "ic:sharp-file-copy",
        child: [],
        meta: {},
      },
      {
        title: "Livestream Management",
        path: "/admin/livestream-management",
        icon: "ic:twotone-live-tv",
        child: [],
        meta: {},
      },
      {
        title: "Craft Video Management",
        path: "/admin/craft-video-management",
        icon: "ic:baseline-video-library",
        child: [],
        meta: {},
      },
      {
        title: "Craft Education Hub (webinar)",
        path: "/admin/craft-education-hub",
        icon: "ic:baseline-class",
        child: [],
        meta: {},
      },
      {
        title: "Financial Management",
        path: "/admin/financial-management",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Game Management",
        path: "/admin/game-management",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
      {
        title: "Voucher",
        path: "/admin/voucher",
        icon: "ic:baseline-local-offer",
        child: [],
        meta: {},
      },
      {
        title: "Digital Product Management",
        path: "/admin/digital-product-management",
        icon: "ant-design:product-filled",
        child: [],
        meta: {},
      },
      {
        title: "Coin Management",
        path: "/admin/coin-management",
        icon: "ic:outline-dashboard",
        child: [],
        meta: {},
      },
    ],
    meta: {
      auth: {
        role: ["Admin"],
      },
    },
  },
  {
    header: "Administration",
    description: "Manage your application",
    child: [
      {
        title: "Configuration",
        icon: "ic:outline-settings",
        child: [
          {
            title: "Environment",
            path: "/devtool/config/environment",
          },
        ],
      },
      {
        title: "Menu Editor",
        icon: "ci:menu-alt-03",
        path: "/devtool/menu-editor",
        child: [],
      },
      {
        title: "Manage Users",
        path: "/devtool/user-management",
        icon: "ph:user-circle-gear",
        child: [
          {
            title: "User List",
            path: "/devtool/user-management/user-list",
            icon: "",
            child: [],
          },
          {
            title: "Role List",
            path: "/devtool/user-management/role-list",
            icon: "",
            child: [],
          },
        ],
      },
      {
        title: "Content",
        icon: "mdi:pencil-ruler",
        child: [
          {
            title: "Editor",
            path: "/devtool/content-editor",
          },
          {
            title: "Template",
            path: "/devtool/content-editor/template",
          },
        ],
      },
      {
        title: "API Editor",
        path: "/devtool/api-editor",
        icon: "material-symbols:api-rounded",
        child: [],
      },
    ],
    meta: {
      auth: {
        role: ["Developer"],
      },
    },
  },
  {
    header: "Help",
    description: "Help and documentation",
    child: [
      {
        title: "Documentation",
        icon: "solar:book-bookmark-minimalistic-bold",
        path: "https://mawar-cms-docs.vercel.app",
        external: true,
      },
      {
        title: "UI Components",
        icon: "material-symbols:settings-input-component-outline-rounded",
        path: "https://corradui.datasc.dev",
        external: true,
      },
    ],
    meta: {
      auth: {
        role: ["Developer"],
      },
    },
  },
];
