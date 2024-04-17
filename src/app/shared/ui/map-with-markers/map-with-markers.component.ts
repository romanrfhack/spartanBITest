import { Component } from '@angular/core';
import { TileUrlTemplateArgs } from '@progress/kendo-angular-map';

@Component({
  selector: 'app-map-with-markers',
  templateUrl: './map-with-markers.component.html',
  styleUrls: ['./map-with-markers.component.scss']
})
export class MapWithMarkersComponent {
  center = [30.268107, -97.744821];

  tileSubdomains = ["a", "b", "c"];
  tileUrl = (e: TileUrlTemplateArgs): string =>
    `https://${e.subdomain}.tile.openstreetmap.org/${e.zoom}/${e.x}/${e.y}.png`;

  markers = [
    { latlng: [30.2675, -97.7409], name: "Zevo Toys" },
    { latlng: [30.2707, -97.749], name: "Foo Bars" },
    { latlng: [30.2705, -97.7409], name: "Mainway Toys" },
    { latlng: [30.2686, -97.7494], name: "Acme Toys" },
  ];

  constructor(){
    
  }
}
