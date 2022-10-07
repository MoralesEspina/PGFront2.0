import { MapCustomService } from './../../../services/map-custom.service';
import { Mapa, Route } from './../../../models/mapa.interface';
import { ClienteService } from 'src/app/services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ClientI } from 'src/app/models/client.interface';
import { ActivatedRoute, Router } from '@angular/router';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';
import { MapaService } from 'src/app/services/mapa.service';
import { AnySourceData } from 'mapbox-gl';
import * as mapboxgl from 'mapbox-gl';


declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  public cliente;
  public success_msg;
  public error_msg;
  public id;
  public editing: boolean = false;
  public id_entrada;
  public hlatitude;
  public hlength ;
  public latitude;
  public length;
  public lat;
  public lenght;

  mapa!: Mapboxgl.Map;

  constructor(private _clientService:ClienteService,
    private _route: ActivatedRoute,
    private router: Router,
    private _mapa: MapCustomService,
    private _mapa2:MapaService) {

    this.cliente = new ClientI('','','','','','','','');

    }

  ngOnInit(): void {
  this.id_entrada = this._route.snapshot.params['id'];
  this.loadClient();
  if (this.editing) {

  } else{
    this.inicializarMapa();
    this.crearMarcador();
  }
  }

  success_alert() {
    this.success_msg = '';
  }

  error_alert() {
    this.error_msg = '';
  }

  loadClient() {
    if (this.id_entrada) {
      this.editing = true;
      this._clientService.getClient(this.id_entrada).subscribe(
        response => {
          this.cliente = response
          this.hlatitude = response.latitude
          this.hlength = response.length
          this.inicializarMapa();
          this.crearMarcador();
        },
        error => {

        }
      )
    } else {
      this.editing = false;
    }
  }

  aggClient(clienteForm){
    if (this.editing) {
      const Client: ClientI = {
        _id: this.id_entrada,
        name: clienteForm.value.name,
        nit: clienteForm.value.nit,
        phoneNumber: clienteForm.value.phoneNumber,
        direction: clienteForm.value.direction,
        references: clienteForm.value.references,
        latitude: clienteForm.value.latitude,
        length: clienteForm.value.length,
      }
      if (clienteForm.valid) {
        this._clientService.updateClient(Client, this.id_entrada).subscribe(
          data => {
            this.success_msg = "Cliente Actualizado Correctamente";
          },
          error => {

          })
      } else {
        this.error_msg = 'Complete Correctamente el Formulario';
      }
    } else {
      this.editing = false;
      const Client: ClientI = {
        _id: '',
        name: clienteForm.value.name,
        nit: clienteForm.value.nit,
        phoneNumber: clienteForm.value.phoneNumber,
        direction: clienteForm.value.direction,
        references: clienteForm.value.references,
        latitude: clienteForm.value.latitude,
        length: clienteForm.value.length,
      }
      if (clienteForm.valid) {
        this._clientService.createClient(Client).subscribe(
          response => {
            this.success_msg = "Se Registro el Cliente Correctamente";
            this.cliente = new ClientI('','','','','','','','');
            this.hlatitude = '';
            this.hlength = '';
          }, error => {

          }
        );
      } else {
        this.error_msg = 'Complete Correctamente el Formulario';
      }
    }
  }

  inicializarMapa() {
    (Mapboxgl as any).accessToken = environment.mapPK
    if (this.editing) {
      this.mapa = new Mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [this.hlength, this.hlatitude],
        zoom: 15,
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

  getRouteBetweenPoints(start: [number, number], end: [number,number]){
    this._mapa2.get<Mapa>(`/${ start.join(',') };${end.join(',')}`)
    .subscribe( resp => this.drawPolyline(resp.routes[0]));

  }


    drawPolyline (route : Route){
      this.lat = route.distance/1000
      this.lenght = route.duration/60

    const coords = route.geometry.coordinates;

    const bounds = new mapboxgl.LngLatBounds();
    coords.forEach( ([lng,lat]) => {
      bounds.extend ([lng, lat]);
    })

    this.mapa?.fitBounds(bounds,{
      padding:200
    });
    //Polyline

  //Limpiar Ruta Previa
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

  this.mapa.addSource('RouteString', sourceData);

  this.mapa.addLayer({
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
  }

  getDirections(){

  var start: [number, number];
  var end: [number, number];
  start = [-89.9913721846008,14.636701229860305]
  end = [this.hlength,this.hlatitude]

  this.getRouteBetweenPoints(start,end)


  }

  crearMarcador() {
    if (this.editing) {
      const marker = new Mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([this.hlength, this.hlatitude])
        .addTo(this.mapa);
        marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        this.hlatitude = lngLat.lat.toString();
        this.hlength = lngLat.lng.toString();
      });
    } else {
      const marker = new Mapboxgl.Marker({
        draggable: true
      })
        .setLngLat([-89.99243177908552, 14.64490083338755])
        .addTo(this.mapa);
      marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        this.hlatitude = lngLat.lat.toString();
        this.hlength = lngLat.lng.toString();
      });
    }
  }
}
