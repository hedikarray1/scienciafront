import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  content: string;



  constructor(private titleService: Title) {

  }

  ngOnInit() {
    this.setTitle("Accueil - Sciencia ");
  }

  generatePdf() {

    const option = {
      filename: 'test.pdf',
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { orientation: 'portrait' }
    };

    const content = document.getElementById('exportthis');

    html2pdf().from(content).set(option).output("dataurlnewwindow", option);

  }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
