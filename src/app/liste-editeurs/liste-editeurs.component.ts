import { Component, OnInit } from '@angular/core';
import { Editeur } from '../model/editeur.model';
import { ApplicationService } from '../services/application.service';
import { UpdateEditeurComponent } from "../update-editeur/update-editeur.component";
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-liste-editeurs',
  imports: [UpdateEditeurComponent,CommonModule],
  templateUrl: './liste-editeurs.component.html',
  styles: ``
})
export class ListeEditeursComponent implements OnInit {
  
  editeurs! : Editeur[];
  updatedEdit:Editeur = {"idEdit":null, "nomEdit":"", "adresseEdit":""};
  ajout:boolean = true; // Initialiser à true par défaut

  constructor(private applicationService: ApplicationService,public authService: AuthService) { }

  ngOnInit(): void {
    this.chargerEditeurs();
  }

  chargerEditeurs() {
    this.applicationService.listeEditeurs().
    subscribe(edits => {
      this.editeurs = edits._embedded.editeurs;
      console.log(edits);
    });
  }

  editeurUpdated(edit: Editeur) {
    console.log("Edit updated event", edit);
    
    if (this.ajout) {
      // Code pour l'ajout (fonctionne déjà)
      const editeurSansId = {
        nomEdit: edit.nomEdit,
        adresseEdit: edit.adresseEdit
      };
      
      this.applicationService.ajouterEditeur(editeurSansId as Editeur)
        .subscribe({
          next: () => {
            console.log("Éditeur ajouté avec succès");
            this.chargerEditeurs();
            this.updatedEdit = {"idEdit":null, "nomEdit":"", "adresseEdit":""};
          },
          error: (err) => {
            console.error("Erreur lors de l'ajout:", err);
          }
        });
    } else {
      // Vérifier que l'ID existe
      if (!edit.idEdit) {
        console.error("Impossible de mettre à jour un éditeur sans ID");
        return;
      }
      
      // Vérifier d'abord que l'éditeur existe
      this.applicationService.getEditeurById(edit.idEdit).subscribe({
        next: (existingEdit) => {
          console.log("Éditeur existant trouvé:", existingEdit);
          
          // Préparer l'objet de mise à jour
          const editeurToUpdate = {
            idEdit: edit.idEdit,
            nomEdit: edit.nomEdit,
            adresseEdit: edit.adresseEdit
          };
          
          // Effectuer la mise à jour
          this.applicationService.updateEditeur(editeurToUpdate)
            .subscribe({
              next: (response) => {
                console.log("Éditeur mis à jour avec succès:", response);
                this.chargerEditeurs();
                this.updatedEdit = {"idEdit":null, "nomEdit":"", "adresseEdit":""};
                this.ajout = true;
              },
              error: (err) => {
                console.error("Erreur lors de la mise à jour:", err);
                if (err.error) {
                  console.error("Détails de l'erreur:", err.error);
                }
              }
            });
        },
        error: (err) => {
          console.error("Erreur lors de la récupération de l'éditeur:", err);
          alert("Éditeur introuvable. Impossible de mettre à jour.");
        }
      });
    }
  }

  updateEdit(edit: Editeur) {
    console.log("Édition de l'éditeur:", edit);
    // Créer une copie pour éviter de modifier l'original
    this.updatedEdit = {...edit};
    this.ajout = false;
  }
}
