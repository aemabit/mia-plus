import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { SigninGuard } from "./modules/signin/signin.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "navigation",
    pathMatch: "full",
  },
  {
    path: "navigation",
    loadChildren: () =>
      import("./modules/home-selector/home-selector.module").then(
        (m) => m.HomeSelectorPageModule
      ),
  },
  {
    path: "signin",
    loadChildren: () =>
      import("./modules/signin/signin.module").then((m) => m.SigninPageModule),
  },
  {
    path: "titular",
    loadChildren: () =>
      import("./modules/form/form-titular/form-titular.module").then(
        (m) => m.FormTitularPageModule
      ),
  },
  {
    path: "dependent",
    loadChildren: () =>
      import("./modules/form/form-dependent/form-dependent.module").then(
        (m) => m.FormDependentPageModule
      ),
    canLoad: [SigninGuard],
  },
  {
    path: "employment",
    loadChildren: () =>
      import("./modules/form/form-employment/form-employment.module").then(
        (m) => m.FormEmploymentPageModule
      ),
    canLoad: [SigninGuard],
  },
  {
    path: "upload-documents",
    loadChildren: () =>
      import(
        "./modules/form/form-upload-documents/form-upload-documents.module"
      ).then((m) => m.FormUploadDocumentsPageModule),
    canLoad: [SigninGuard],
  },
  {
    path: "panel",
    loadChildren: () =>
      import("./modules/panel/panel.module").then((m) => m.PanelPageModule),
    canLoad: [SigninGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
