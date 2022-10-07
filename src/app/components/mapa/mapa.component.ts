import { Component, ElementRef, OnInit } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  mapa!: Mapboxgl.Map;


  LatE = '' + localStorage.getItem('Lat');
  LngE = '' + localStorage.getItem('Lng');
  LatC = parseFloat(this.LatE);
  LngC = parseFloat(this.LngE);
  latitude =0.00;
  longitude = 0;

  constructor(private router: Router,
    private locationService:LocationService) { }

  ngOnInit(): void {
    this.inicializarMapa();
    this.crearMarcador();
  }

  inicializarMapa() {
    this.locationService.getPosition().then(pos => {
      this.latitude = pos.lat;
      this.longitude = pos.lng;

  });
    (Mapboxgl as any).accessToken = environment.mapPK
    if (environment.editing) {
      this.mapa = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.LngC, this.LatC],
        zoom: 16
      });

    } else {
      this.mapa = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-89.99243177908552, 14.64490083338755],
        zoom: 13
      });
    }

  }

  crearMarcador() {
    if (environment.editing) {
      const marker = new Mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([this.LngC, this.LatC])
        .addTo(this.mapa);
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        localStorage.setItem("Lat", lngLat.lat.toString());
        localStorage.setItem("Lng", lngLat.lng.toString());
      });
    } else {
      const marker = new Mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([-89.99243177908552, 14.64490083338755])
        .addTo(this.mapa);
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        localStorage.setItem("Lat", lngLat.lat.toString());
        localStorage.setItem("Lng", lngLat.lng.toString());
      });
    }
  }

  return() {
    if (environment.editing) {
      this.router.navigate(["Client", localStorage.getItem("ID")]);
      environment.editing = false;
    } else {
      this.router.navigate(["Client"]);
    }
  }

  exit(){
    if (environment.editing) {
      this.router.navigate(["Client", localStorage.getItem("ID")]);
      environment.editing = false;
    } else {
      this.router.navigate(["Client"]);
    }
  }

}
