import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorServiceService {

  constructor() { 
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  generatePDF(documentDefinition: any, fileName: string) {
    pdfMake.createPdf(documentDefinition).download(fileName);
  }
}
