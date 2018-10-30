import { Component } from '@angular/core';
import { ClimaService } from './service/clima.service';
import { Chart } from 'chart.js';
import { Weather } from './models/weather.model';
import { Temperature } from './models/Temperature.model';
import { City } from './models/city.model';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {

  selectedCity: City;
  selectedTemp: Temperature;

  chartLines = [];
  weather : Weather [] = [];
  temp;
  Cities: City[] = [
    {id: 0, name: "Cuidad Obregon", lon:  -109.9388, lat: 27.4938},
    {id: 1, name: "Hermosillo" ,  lon: -110.9667, lat: 29.0667},
    {id: 2, name: "Navojoa" ,  lon: -109.4452, lat: 27.0808}
  ];

 temperatures: Temperature []  = [
    {id: 'M', name: "Celsius"},
    {id: 'I', name: "Farenheit"}
  ];

  constructor(
    public _ClimaService: ClimaService,
  ) { }

  ngOnInit() {
    this.loadWheater();
  }

  onCityChange(event) {
    let Temp = $("#Temperature option:selected").val();
    this.loadWheater(this.Cities[event.target.value].lon, this.Cities[event.target.value].lat,Temp);
  }

  onTempChange()
  {
    let Temp = $("#Temperature option:selected").val();
    let lon = this.Cities[$("#City option:selected").val()].lon;
    let lat = this.Cities[$("#City option:selected").val()].lat;
    //localStorage.setItem('temperatura', JSON.stringify(event.target.value));
    this.loadWheater(lon, lat , Temp);
    
  }

  loadWheater(lon: number = -109.9388, lat: number = 27.4938, Temp : string ='M') {

    this._ClimaService.loadWheaterCity(lat, lon,  Temp)
        .subscribe((resp: any) => {
            this.weather = resp.data;
            let listMax = resp['data'].map(resp => resp.max_temp);
            let listMin = resp['data'].map(resp => resp.min_temp);
            let listDates = resp['data'].map(resp => resp.valid_date);

            let weatherDates = [];
            listDates.forEach(resp => {
              let jsdate = new Date(resp);
              weatherDates.push(jsdate.toLocaleDateString('es', {month: 'short', day: 'numeric'}));
            });

            this.chartLines = new Chart('weatherChart', {
              type: 'line',
              data: {
                labels: weatherDates,
                datasets: [
                  {
                    label:'Max Temperature',
                    data: listMax,
                    borderColor: '#3cba9f',
                    fill: false
                  },
                  {
                    label:'Min Temperature',
                    data: listMin,
                    borderColor: '#ffcc00',
                    fill: false
                  },
                ]
              },
              options: {
                legend: {
                  display: true
                },
                scales: {
                  xAxes: [{
                    display: true
                  }],
                  yAxes: [{
                    display: true
                  }]
                }
              }
            })
        });
  }

}
