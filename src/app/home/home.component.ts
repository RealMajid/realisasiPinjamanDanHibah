import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgbdDatepickerPopup } from '../datepicker-popup';
import { EventManager } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as Globals from '../globals';
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
  jenisReport: any;
  loading: boolean;
  realisasiList: any;

  constructor(private modalService: BsModalService, private http: HttpClient) {
  }

  ngOnInit() {
    this.getRealisasi();
  }

  getRealisasi() {
    this.loading = true;
    this.http.get(Globals.serviceUrl + 'realisasi')
      .subscribe(data => {
        this.realisasiList = data;
        console.log(this.realisasiList);
        this.loading = false
      }, err => {
        this.loading = false;
      });
  }

  trackRealisasi(index, realisasi) {
    return realisasi ? realisasi.NOMOR : undefined;
  }

  onGetData(template: TemplateRef<any>, kdJenis: number) {
    this.jenisReport = kdJenis;
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
    if (this.modalService.onHidden) {
      this.asOf = null;
    }
  }

  generateReport(format: string) {
    var pageURL = "";

    let tanggal = `${this.asOf.year}-${this.asOf.month}-${this.asOf.day}`;

    switch (this.jenisReport) {
      case 1:
        pageURL = Globals.reportUrl + "getpln?tanggal=" + tanggal + "&format=" + format;
        break;
      case 2:
        pageURL = Globals.reportUrl + "gethibah?tanggal=" + tanggal + "&format=" + format;
        break;
      case 3:
        pageURL = Globals.reportUrl + "getpdn?tanggal=" + tanggal + "&format=" + format;
        break;
      case 4:
        pageURL = Globals.reportUrl + "getall?tanggal=" + tanggal + "&format=" + format;
        break;
      case 5:
        pageURL = Globals.reportUrl + "getpipelinepln?tanggal=" + tanggal + "&format=" + format;
        break;
      case 6:
        pageURL = Globals.reportUrl + "getpipelinehibah?tanggal=" + tanggal + "&format=" + format;
        break;
      case 7:
        pageURL = Globals.reportUrl + "getpipelinepdn?tanggal=" + tanggal + "&format=" + format;
        break;
      case 8:
        pageURL = Globals.reportUrl + "getallpipeline?tanggal=" + tanggal + "&format=" + format;
        break;
    }

    this.setReport('Laporan', pageURL);
  }

  setReport(title: string, pageURL: string) {
    var pageURL = pageURL;
    var title = title;
    var w = 800;
    var h = 600;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    var targetWin = window.open(pageURL, title, 'toolbar=no,fullscreen=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=false, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
  }

  onChangeCalendar(event) {
    this.asOf = event;
  }
}
