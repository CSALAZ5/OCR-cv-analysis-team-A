import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module

@Injectable({
  providedIn: 'root'
})
export class ScanTalentServiceService {

  private contextCaptura = 'https://negociaciontarifaspru:6009/talent-api';

  constructor(private http: HttpClient) { } // Inject the HttpClient module


  getDetalleArchivo(){
    return this.http.get(`https://ia83uu6dq8.execute-api.us-east-1.amazonaws.com/v2/data/rest`, { responseType: 'json' }).pipe();
  }
}
