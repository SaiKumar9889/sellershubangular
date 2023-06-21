import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EtsyCallbackComponent } from './etsy-callback/etsy-callback.component';
import { AuthGuardService } from './_authgaurd/auth-guard.service';
import { VerifyComponent } from './verify/verify.component';
export const Approutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./-login/-login.module').then(module => module.LoginModule)
  },

  // {
  //   component: AdminComponent,
  //   path: 'rep',
  //   loadChildren: () => import('./dynamic-temp/dynamic-temp.module').then(module => module.DynamicTempModule)
  // },
  {
    component: AdminComponent,
    canActivate: [AuthGuardService],
    path: 'sellershub',
    loadChildren: () => import('./app-tabs/app-tabs.module').then(module => module.AppTabsModule)
  },
  {
    component: VerifyComponent,

    path: 'verify'

  },
  {
    component: EtsyCallbackComponent,
    canActivate: [AuthGuardService],
    path: 'etsy',
  },
  {
    component: AdminComponent,
    canActivate: [AuthGuardService],
    path: 'announcments',
    loadChildren: () => import('./announcments/announcments.module').then(module => module.AnnouncmentsModule)
  },

  // {
  //   component: AdminComponent,
  //   path: 'dashboard',
  //   loadChildren: () => import('./modules/dashboard/dashboard.module').then(module => module.DashboardModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'reports',
  //   loadChildren: () => import('./modules/reports/reports.module').then(module => module.ReportsModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'orders',
  //   loadChildren: () => import('./modules/orders/orders.module').then(module => module.OrdersModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'inventory',
  //   loadChildren: () => import('./modules/inventory/inventory.module').then(module => module.InventoryModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'listing',
  //   loadChildren: () => import('./modules/listing/listing.module').then(module => module.ListingModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'suppliers',
  //   loadChildren: () => import('./modules/suppliers/suppliers.module').then(module => module.SuppliersModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'warehouse',
  //   loadChildren: () => import('./modules/warehouse/warehouse.module').then(module => module.WarehouseModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'customers',
  //   loadChildren: () => import('./modules/customers/customers.module').then(module => module.CustomersModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'settings',
  //   loadChildren: () => import('./modules/settings/settings.module').then(module => module.SettingsModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'integration',
  //   loadChildren: () => import('./modules/integrations/integrations.module').then(module => module.IntegrationsModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'templateDesigners',
  //   loadChildren: () => import('./modules/template-designers/template-designers.module').then(module => module.TemplateDesignersModule)
  // },
  // {
  //   component: AdminComponent,
  //   path: 'betaTest',
  //   loadChildren: () => import('./modules/beta-test/beta-test.module').then(module => module.BetaTestModule)
  // },
  {
    path: 'error',
    loadChildren: () => import('./-errorredirector/-errorredirector.module').then(module => module.ErrorredirectorModule)
  },
  {
    path: '**',
    redirectTo: '/error/notfound'
  }
];
