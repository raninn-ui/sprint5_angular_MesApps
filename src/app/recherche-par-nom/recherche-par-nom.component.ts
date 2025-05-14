import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Application } from '../model/application.model';
import { ApplicationService } from '../services/application.service';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule,CommonModule,SearchFilterPipe],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit{

  nomApplication! : string;
  applications! : Application[];
  allApplications! : Application[];
  searchTerm!: string;

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.listeApplication().subscribe(apps => {
      console.log(apps);
      this.applications = apps;
    });
  }

  rechercherApps(){
    if (this.nomApplication)
      this.applicationService.rechercherParNom(this.nomApplication).subscribe(apps => {
        this.applications = apps;
        console.log(apps)
      });
    else
    this.applicationService.listeApplication().
  subscribe((apps)=>{
  console.log(apps);
      this.applications = apps;
      
    });
  }

  onKeyUp(filterText : string){
    this.applications = this.allApplications.filter(item =>
    item.nomApp!.toLowerCase().includes(filterText));
    }
    
}
