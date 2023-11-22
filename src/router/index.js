import { createRouter, createWebHistory } from "vue-router";


const routes = [
  // ADMIN

    {
      path: "/admin/dashboard",
      name: "AdminDashboard",
      component: () => import("../pages/Admin/AdminDashboard.vue"),
    },
    {
      path: "/admin/profile",
      name: "AdminProfile",
      component: () => import("../pages/Profile/AdminProfile.vue"),
    },
    {
      path: "/admin/edit-profile",
      name: "AdminEditProfile",
      component: () => import("../pages/Profile/AdminProfile.vue"),
    },
    {
      path: "/admin/clients",
      name: "AdminClients",
      component: () => import("../pages/Admin/clients/AdminViewClients.vue"),
    }, 
    {
      path: "/admin/clients/:id",
      name: "ClientViewById",
      component: () => import("../pages/Admin/clients/Index.vue"),
    },
    
    {
      path: '/admin/clients/:id',

      component: () => import("../pages/Admin/clients/Index.vue"),
      children: [
        {
          path: 'info',
          name: "info",
          component: () => import("../pages/Admin/clients/ClientPersonalInfo.vue"),
        },
        {
          path: 'overview',
          name: "AdminClientOverview",
          component: () => import("../pages/Admin/clients/AdminClientOverview.vue"),
        },
        {
          path: 'history',
          name: "AdminClientHistory",
          component: () => import("../pages/Admin/clients/AdminClientHistory.vue"),
        },
        {
          path: 'report',
          name: "AdminClientReport",
          component: () => import("../pages/Admin/clients/AdminClientReport.vue"),
        },
        ],
    },
    
      {
      path: "/admin/edit-client",
      name: "AdminEditClients",
      component: () => import("../pages/Admin/clients/AdminEditClient.vue"),
    },
      
      {
      path: "/admin/add-client",
      name: "AdminAddClients",
      component: () => import("../pages/Admin/clients/AdminAddClient.vue"),
    },  
     {
      path: "/admin/meters",
      name: "AdminViewMeters",
      component: () => import("../pages/Admin/meters/AdminViewMeters.vue"),
    },

    {
      path: "/admin/add-meter",
      name: "AdminAddMeter",
      component: () => import("../pages/Admin/meters/AdminAddMeter.vue"),
    }, 
    {
      path: "/admin/edit-meters",
      name: "AdminEditMeters",
      component: () => import("../pages/Admin/meters/AdminEditMeters.vue"),
    },

     // CLIENT
     {
      path: "/client/dashboard",
      name: "ClientDashboard",
      component: () => import("../pages/Client/ClientDashboard.vue"),
    },
    // CORE
    {
      path: "/",
      name: "Login",
      component: () => import("../pages/core/Login.vue"),
    },    {
      path: "/register",
      name: "Register",
      component: () => import("../pages/core/Register.vue"),
    },
    {
      path: "/forgot-password",
      name: "ForgotPassword",
       component: () => import("../pages/core/ForgotPassword.vue"),
    },
    {
      path: "/reset-password",
      name: "ResetPassword",
      component: () => import("../pages/core/ForgotPassword.vue"),
    },
    {
      path: "/otp",
      name: "OTP",
      component: () => import("../pages/core/Otp.vue"),
    },

   
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;

