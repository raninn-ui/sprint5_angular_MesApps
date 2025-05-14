import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Editeur } from '../model/editeur.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-editeur',
  imports: [FormsModule,CommonModule],
  templateUrl: './update-editeur.component.html',
  styles: ``
})
export class UpdateEditeurComponent implements OnInit {
  @Input()
  editeur! : Editeur;
  
  @Input()
  ajout! : boolean;

  @Output()
  editeurUpdated = new EventEmitter<Editeur>();
  
  
  constructor() { }

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateEditeur", this.editeur);
    
    // S'assurer que l'éditeur est correctement initialisé
    if (!this.editeur) {
      this.editeur = {
        idEdit: null,
        nomEdit: '',
        adresseEdit: ''
      };
    }
  }

  saveEditeur(){
    console.log("Sauvegarde de l'éditeur:", this.editeur);
    
    // Vérifier que l'éditeur a des valeurs valides
    if (!this.editeur.nomEdit || this.editeur.nomEdit.trim() === '') {
      console.error("Nom d'éditeur invalide");
      return;
    }
    
    // Émettre l'événement avec l'éditeur complet (y compris l'ID pour la mise à jour)
    this.editeurUpdated.emit(this.editeur);
  }
}
