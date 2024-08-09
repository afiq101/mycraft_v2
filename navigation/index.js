export default [
  {
    "header": "",
    "description": "",
    "child": [
      {
        "title": "Dashboard",
        "path": "/dashboard",
        "icon": "ic:outline-dashboard",
        "child": [],
        "meta": {}
      }
    ]
  },
  {
    "header": "Pentadbir Sistem",
    "description": "Super admin",
    "child": [
      {
        "title": "Pengurusan Profil",
        "path": "/pengurusan-profil",
        "icon": "",
        "child": []
      },
      {
        "title": "Administrators",
        "path": "/administrators",
        "icon": "",
        "child": []
      },
      {
        "title": "Memberships",
        "path": "/memberships",
        "icon": "",
        "child": []
      },
      {
        "title": "Global Setting Management",
        "path": "/global-setting-management",
        "icon": "",
        "child": [
          {
            "title": "Coin Management",
            "path": "/global-setting-management/coin-management",
            "icon": "",
            "child": []
          }
        ]
      },
      {
        "title": "System Monitoring",
        "path": "/system-monitoring",
        "icon": "",
        "child": [
          {
            "title": "Server Performance Metrics",
            "path": "/system-monitoring/server-performance-metrics",
            "icon": "",
            "child": []
          },
          {
            "title": "Application Performance Metrics",
            "path": "/system-monitoring/application-performance-metrics",
            "icon": "",
            "child": []
          },
          {
            "title": "Database Performance Metrics",
            "path": "/system-monitoring/database-performance-metrics",
            "icon": "",
            "child": []
          }
        ]
      },
      {
        "title": "Integration API Keys Setting",
        "path": "/integration-api-keys-setting",
        "icon": "",
        "child": []
      },
      {
        "title": "Payment Gateway API Keys",
        "path": "/integration-api-keys-setting/payment-gateway-api-keys",
        "icon": "",
        "child": []
      }
    ],
    "meta": {}
  },
  {
    "header": "Administration",
    "description": "Manage your application",
    "child": [
      {
        "title": "Configuration",
        "icon": "ic:outline-settings",
        "child": [
          {
            "title": "Environment",
            "path": "/devtool/config/environment"
          }
        ]
      },
      {
        "title": "Menu Editor",
        "icon": "ci:menu-alt-03",
        "path": "/devtool/menu-editor",
        "child": []
      },
      {
        "title": "Manage Users",
        "path": "/devtool/user-management",
        "icon": "ph:user-circle-gear",
        "child": [
          {
            "title": "User List",
            "path": "/devtool/user-management/user-list",
            "icon": "",
            "child": []
          },
          {
            "title": "Role List",
            "path": "/devtool/user-management/role-list",
            "icon": "",
            "child": []
          }
        ]
      },
      {
        "title": "Content",
        "icon": "mdi:pencil-ruler",
        "child": [
          {
            "title": "Editor",
            "path": "/devtool/content-editor"
          },
          {
            "title": "Template",
            "path": "/devtool/content-editor/template"
          }
        ]
      },
      {
        "title": "API Editor",
        "path": "/devtool/api-editor",
        "icon": "material-symbols:api-rounded",
        "child": []
      }
    ],
    "meta": {
      "auth": {
        "role": [
          "Developer"
        ]
      }
    }
  },
  {
    "header": "Help",
    "description": "Help and documentation",
    "child": [
      {
        "title": "Documentation",
        "icon": "solar:book-bookmark-minimalistic-bold",
        "path": "https://mawar-cms-docs.vercel.app",
        "external": true
      },
      {
        "title": "UI Components",
        "icon": "material-symbols:settings-input-component-outline-rounded",
        "path": "https://corradui.datasc.dev",
        "external": true
      }
    ],
    "meta": {
      "auth": {
        "role": [
          "Developer"
        ]
      }
    }
  }
]