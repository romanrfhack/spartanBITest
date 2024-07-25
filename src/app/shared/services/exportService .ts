import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private exportImageSubject = new Subject<void>();

  // Observable to which the component 2 will subscribe
  exportImageObservable$ = this.exportImageSubject.asObservable();

  // Method to call when the button in component 1 is clicked
  triggerExport() {
    this.exportImageSubject.next();
  }
}
