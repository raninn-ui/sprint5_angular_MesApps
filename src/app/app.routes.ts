import { Routes } from '@angular/router';
import { ApplicationsComponent } from './applications/applications.component';
import { AddApplicationComponent } from './add-application/add-application.component';
import { UpdateApplicationComponent } from './update-application/update-application.component';
import { RechercheParEditeurComponent } from './recherche-par-editeur/recherche-par-editeur.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeEditeursComponent } from './liste-editeurs/liste-editeurs.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { applicationGuard } from './application.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

export const routes: Routes = [
    {path: "applications", component : ApplicationsComponent},
    {path: "add-application", component : AddApplicationComponent, canActivate:[applicationGuard]},
    {path: "updateApplication/:id", component: UpdateApplicationComponent, canActivate:[applicationGuard]},
    {path: "rechercheParEditeur", component: RechercheParEditeurComponent},
    {path: "rechercheParNom", component: RechercheParNomComponent},
    {path: "listeEditeurs", component: ListeEditeursComponent},
    {path: 'login', component: LoginComponent},
    {path: 'app-forbidden', component: ForbiddenComponent},
    {path:'register',component:RegisterComponent},
     { path: 'verifEmail', component: VerifEmailComponent }, 
    {path: "", redirectTo: "applications", pathMatch: "full"}
];
