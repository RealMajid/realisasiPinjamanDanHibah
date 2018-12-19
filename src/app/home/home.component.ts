import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbdDatepickerPopup } from '../datepicker-popup';
import { EventManager } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public modalRef: BsModalRef;
  jenisData: string;
  asOf: any;

  constructor(private modalService: BsModalService) { 
  }

  ngOnInit() {
  }

  onGetData(template: TemplateRef<any>, kdJenis: number) {
    switch (kdJenis) {
      case 1:
       this.jenisData = "Pinjaman Luar Negeri";
       break;
      case 2:
       this.jenisData = "Hibah";
       break;
      case 3:
       this.jenisData = "Pinjaman Dalam Negeri";
       break;
      case 4:
       this.jenisData = "All Data (PLN, Hibah, PDN)";
       break;
      case 5:
       this.jenisData = "Pinjaman Luar Negeri (Pipeline)";
       break;
      case 6:
       this.jenisData = "Hibah (Pipeline)";
       break;
      case 7:
       this.jenisData = "Pinjaman Dalam Negeri (Pipeline)";
       break;
      case 8:
       this.jenisData = "All Data (PLN, Hibah, PDN) Pipeline";
       break;
    }
    this.modalRef = this.modalService.show(template);
  }

  generateReport() {
  }

  onChangeCalendar(event) {
    console.log(event);
  }
}
