import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Application } from '../model/application.model';
import { ApplicationService } from '../services/application.service';
import { RouterLink } from '@angular/router';
import { Editeur } from '../model/editeur.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-applications',
  imports: [CommonModule,RouterLink],
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit{
  applications!: Application[];
  editeurs!: Editeur[];
  constructor(private applicationService: ApplicationService,public authService: AuthService) {
    //this.applications = applicationService.listeApplication();
     }
  ngOnInit(): void {
    this.chargerApplications();
    
  }

  chargerApplications() {
    this.applicationService.listeApplication().subscribe(apps => {
        console.log(apps);  // Check if releaseDate is being returned
        this.applications = apps;
    });
}

  

    supprimerApplication(a: Application)
     {
      //console.log(a);
      let conf = confirm("Etes-vous sûr ?");
      if (conf)
      this.applicationService.supprimerApplication(a.idApp!).subscribe(()=> {
      console.log("application supprimée");
      this.chargerApplications();
      });
      }
     
}
