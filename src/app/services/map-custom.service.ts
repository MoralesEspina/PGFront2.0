import { Route } from './../models/mapa.interface';
import { MapaService } from 'src/app/services/mapa.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl' ;
import { Global } from './global';
import { Mapa } from '../models/mapa.interface';
import { AnySourceData } from 'mapbox-gl';
//import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

@Injectable({
  providedIn: 'root'
})
export class MapCustomService {

  mapbox = (mapboxgl as typeof mapboxgl);
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 14.636676228946675 ;
  lng = -89.99137169695203;
  zoom = 13;
  wayPoints: Array<any> = [];
  markerDriver: any = null;

  constructor(private _mapa:MapaService) {

    this.mapbox.accessToken = environment.mapPK;
  }

  getRouteBetweenPoints(start: [number, number], end: [number,number]){
    this._mapa.get<Mapa>(`/${ start.join(',') };${end.join(',')}`)
    .subscribe( resp => this.drawPolyline(resp.routes[0]));
  }

  private drawPolyline (route : Route){
    console.log(route.distance / 1000, route.duration/60)

    const coords = route.geometry.coordinates;

    const bounds = new mapboxgl.LngLatBounds();
    coords.forEach( ([lng,lat]) => {
      bounds.extend ([lng, lat]);
    })

    //Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data:{
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry:{
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    this.map.addSource('RouteString', sourceData);

    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout:{
        "line-cap": 'round',
        "line-join": 'round'
      },
      paint:{
        "line-color": 'black',
        "line-width": 3
      }
    })
  //Limpiar Ruta Previa


  }


  /*buildMap(): Promise<any> {

    return new Promise((resolve, reject) => {
      try {
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: this.zoom,
          center: [this.lng, this.lat]
        });


        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,

        });

        resolve({
          map: this.map,
          geocoder
        });
      }catch(e) {
        reject(e);
      }
    });
  }*/
}
