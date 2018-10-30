import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_WEATHER } from '../config/config';


@Injectable()
export class ClimaService {

  constructor(
    public http: HttpClient
  ) { }

  loadWheaterCity(lat: number = 0, lon: number= 0, units: string= 'M') {
    const url = URL_WEATHER  + lat + '/' + lon + '/' + units ;
    return this.http.get(url);
  }
}
