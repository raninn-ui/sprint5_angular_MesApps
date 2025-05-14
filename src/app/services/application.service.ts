import { Injectable } from '@angular/core';
import { Application } from '../model/application.model';
import { Editeur } from '../model/editeur.model';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EditeurWrapped } from '../model/editeurWrapped.model';
import { AuthService } from './auth.service';

const httpOptions = {
headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  applications! : Application[]
  application! : Application;
  editeurs! : Editeur[];
  apiURL: string='http://localhost:8081/app/api';
  apiURLEdit: string = 'http://localhost:8081/app/edit';

  constructor(private http : HttpClient, private authService: AuthService) { 
   
     }

     listeApplication():Observable<Application[]>{
      /*let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})*/
      return this.http.get<Application[]>(this.apiURL+"/all");     
    }

      ajouterApplication(app: Application): Observable<Application> {
        /*let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt });*/
        return this.http.post<Application>(this.apiURL+"/addapp", app);
      }
    
      supprimerApplication(id: number) {
        const url = `${this.apiURL}/delapp/${id}`;
        /*let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt });*/
        return this.http.delete(url);
      }
    
      consulterApplication(id: number): Observable<Application> {
        const url = `${this.apiURL}/getbyid/${id}`;
        /*let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt });*/
        return this.http.get<Application>(url);
      }
    
      updateApplication(app: Application): Observable<Application> {
        /*let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt });*/
        return this.http.put<Application>(this.apiURL+"/updateapp", app);
      }
    
      listeEditeurs(): Observable<EditeurWrapped> {
        /*let jwt = this.authService.getToken();
        jwt = "Bearer " + jwt;
        let httpHeaders = new HttpHeaders({ "Authorization": jwt });*/
        return this.http.get<EditeurWrapped>(this.apiURLEdit);
      }
    
      consulterEditeur(id: number): Editeur {
        return this.editeurs.find(ed => ed.idEdit == id)!;
      }
    
      rechercherParEditeur(idEdit: number): Observable<Application[]> {
        const url = `${this.apiURL}/appsEdit/${idEdit}`;
        return this.http.get<Application[]>(url);
      }
    
      rechercherParNom(nom: string): Observable<Application[]> {
        const url = `${this.apiURL}/appsByName/${nom}`;
        return this.http.get<Application[]>(url);
      }
    
      ajouterEditeur(edit: Editeur): Observable<Editeur> {
        const { idEdit, ...editeurSansId } = edit;
        return this.http.post<Editeur>(this.apiURLEdit, editeurSansId,httpOptions);
      }
    
      updateEditeur(edit: Editeur): Observable<Editeur> {
        const url = `${this.apiURLEdit}/${edit.idEdit}`;
        return this.http.put<Editeur>(url, edit, httpOptions);
      }
    
      getEditeurById(id: number): Observable<Editeur> {
        const url = `${this.apiURLEdit}/${id}`;
        return this.http.get<Editeur>(url);
      }
    

    
}
