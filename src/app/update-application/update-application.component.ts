import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Application } from '../model/application.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { Editeur } from '../model/editeur.model';

@Component({
  selector: 'app-update-application',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-application.component.html',
  styles: ``
})
export class UpdateApplicationComponent implements OnInit {
  currentApplication = new Application();
  editeurs! : Editeur[];
  updatedEditId! : number | null; // Modifier le type pour accepter null

  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
    private applicationService: ApplicationService) { }
  
  ngOnInit() {
    this.applicationService.listeEditeurs().subscribe(edits => {
      console.log(edits);
      this.editeurs = edits._embedded.editeurs; 
    }); 
    this.applicationService.consulterApplication(this.activatedRoute.snapshot.params['id']).
    subscribe(app => {
      this.currentApplication = app;
      // Ajouter une vérification pour s'assurer que editeur et idEdit existent
      if (this.currentApplication.editeur && this.currentApplication.editeur.idEdit !== null) {
        this.updatedEditId = this.currentApplication.editeur.idEdit;
      }
    });
  }

  updateApplication(){
    // Ajouter une vérification pour s'assurer que updatedEditId n'est pas null
    if (this.updatedEditId !== null) {
      this.currentApplication.editeur = this.editeurs.find(edit => edit.idEdit === this.updatedEditId)!;
      this.applicationService.updateApplication(this.currentApplication).subscribe(app => {
        this.router.navigate(['applications']);
      });
    }
  }
}
