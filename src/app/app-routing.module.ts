import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminComponent } from "./admin/admin.component";
import { AuthGuardService } from "./_authgaurd/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },

  {
    path: "login",
    loadChildren: () =>
      import("./_login/-login.module").then((module) => module.LoginModule),
  },
  {
    component: AdminComponent,
    canActivate: [AuthGuardService],
    path: "sellershub",
    loadChildren: () =>
      import("./app-tabs/app-tabs.module").then(
        (module) => module.AppTabsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
