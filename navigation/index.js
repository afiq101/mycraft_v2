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
        "path": "/super-admin/pengurusan-profil",
        "icon": "ph:user-fill",
        "child": [],
        "meta": {}
      },
      {
        "title": "Administrators",
        "path": "/super-admin/administrators",
        "icon": "ph:user-list-fill",
        "child": [],
        "meta": {}
      },
      {
        "title": "Seller",
        "path": "/super-admin/seller",
        "icon": "ph:user-sound-fill",
        "child": [],
        "meta": {}
      },
      {
        "title": "Memberships",
        "path": "/super-admin/memberships",
        "icon": "ph:users-fill",
        "child": [],
        "meta": {}
      },
      {
        "title": "Global Setting Management",
        "path": "/super-admin/global-setting-management",
        "icon": "ph:globe-simple-bold",
        "child": [],
        "meta": {}
      },
      {
        "title": "System Monitoring",
        "path": "/super-admin/system-monitoring",
        "icon": "ph:projector-screen-chart-bold",
        "child": [
          {
            "title": "Server Performance Metrics",
            "path": "/super-admin/system-monitoring/server-performance-metrics",
            "icon": "",
            "child": []
          },
          {
            "title": "Application Performance Metrics",
            "path": "/super-admin/system-monitoring/application-performance-metrics",
            "icon": "",
            "child": []
          },
          {
            "title": "Database Performance Metrics",
            "path": "/super-admin/system-monitoring/database-performance-metrics",
            "icon": "",
            "child": []
          }
        ],
        "meta": {}
      },
      {
        "title": "Integration API Keys Setting",
        "path": "/super-admin/integration-api-keys-setting",
        "icon": "ph:link-simple-horizontal-duotone",
        "child": [],
        "meta": {}
      },
      {
        "title": "Courier Service Management",
        "path": "/super-admin/courier-service-management",
        "icon": "",
        "child": []
      }
    ],
    "meta": {
      "auth": {
        "role": [
          "Superadmin"
        ]
      }
    }
  }
]