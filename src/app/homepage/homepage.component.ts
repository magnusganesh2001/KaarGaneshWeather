import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { json } from 'express';
import { stringify } from 'querystring';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  cityname = '';
  apikey = '';
  showData!: boolean;
  WeatherData:any;
  constructor(private http: HttpClient) { }
  

  ngOnInit(): void {
    this.WeatherData = {
      main : {},
      isDay: true
    };
    this.showData = true;
    this.getWeatherData();
    console.log(this.WeatherData);
  }

  showDataPage(){
    this.showData = false
  }
  hideDataPage(){
    this.showData = true
  }

  getWeatherData(){
    this.apikey = '1f34457187576effe0b41b137b105e25';
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+this.cityname+"&appid="+this.apikey)
    .then(response=>response.json())
    .then(data=>{this.setWeatherData(data);})
  }

  setWeatherData(data: any){
    this.WeatherData = data;
    let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
    this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
    this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed(0);
    this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed(0);
  }
  

}
