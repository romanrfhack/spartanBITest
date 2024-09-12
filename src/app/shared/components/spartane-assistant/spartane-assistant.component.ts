import { Component } from '@angular/core';

@Component({
  selector: 'app-spartane-assistant',
  templateUrl: './spartane-assistant.component.html',
  styleUrls: ['./spartane-assistant.component.scss']
})
export class SpartaneAssistantComponent {
  isExpanded: boolean = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
