import { Component } from '@angular/core';
import { TileUrlTemplateArgs } from '@progress/kendo-angular-map';
import { ShapeOptions } from '@progress/kendo-drawing';
import urbanAreas from "./mocks/urban-areas.json";

@Component({
  selector: 'app-map-with-bubbles',
  templateUrl: './map-with-bubbles.component.html',
  styleUrls: ['./map-with-bubbles.component.scss']
})
export class MapWithBubblesComponent {

  center = [30.2675, -97.7409];

  tileSubdomains = ["a", "b", "c"];
  tileUrl = (e: TileUrlTemplateArgs): string =>
    `https://${e.subdomain}.tile.openstreetmap.org/${e.zoom}/${e.x}/${e.y}.png`;

  bubbles = urbanAreas;
  bubbleStyle: ShapeOptions = {
    fill: {
      color: "orange",
      opacity: 0.5,
    },
    stroke: {
      width: 1,
      color: "black",
    },
  };
  constructor(){

  }
}
