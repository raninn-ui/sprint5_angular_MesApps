import { Component, OnInit } from '@angular/core';
import { Application } from '../model/application.model';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../services/application.service';
import { Editeur } from '../model/editeur.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-application',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-application.component.html',
  styleUrl: './add-application.component.css'
})
export class AddApplicationComponent implements OnInit{
  newApplication = new Application();
  editeurs!: Editeur[];
  newIdEdit!: number;
  newEditeur!: Editeur;

  constructor(private applicationService: ApplicationService,
    private router: Router) { }

  ngOnInit(): void {
    this.applicationService.listeEditeurs().subscribe(edits => {
      console.log(edits);
      this.editeurs = edits._embedded.editeurs; 
    });
    
  }

  addApplication() {
    this.newApplication.editeur = this.editeurs.find(edit => edit.idEdit == this.newIdEdit)!;
    this.applicationService.ajouterApplication(this.newApplication)
      .subscribe(app => {
        console.log(app);
        this.router.navigate(['applications']);
      });
  }
}
