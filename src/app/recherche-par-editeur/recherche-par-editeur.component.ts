import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Application } from '../model/application.model';
import { Editeur } from '../model/editeur.model';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-recherche-par-editeur',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-editeur.component.html',
  styles: ``
})
export class RechercheParEditeurComponent implements OnInit {
  
  applications! : Application[];
  IdEditeur! : number;
  editeurs! : Editeur[];
 
  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.listeEditeurs().subscribe(edits =>
    {this.editeurs = edits._embedded.editeurs;
    }
    )
  }

  onChange(){
    this.applicationService.rechercherParEditeur(this.IdEditeur).subscribe(apps => {
      this.applications = apps;
    });
  }
}
