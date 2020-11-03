import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-panel",
  templateUrl: "./panel.page.html",
  styleUrls: ["./panel.page.scss"],
})
export class PanelPage implements OnInit {
  objRouter = [
    {
      page: "Titular Information",
      redirect: "/titular",
      img: "https://aemabitfolder.sfo2.digitaloceanspaces.com/MIAPLUS/5272.jpg",
    },
    {
      page: "Dependent Information",
      redirect: "/dependent",
      img: "https://aemabitfolder.sfo2.digitaloceanspaces.com/MIAPLUS/5220.jpg",
    },
    {
      page: "Employment Information",
      redirect: "/employment",
      img: "https://aemabitfolder.sfo2.digitaloceanspaces.com/MIAPLUS/6143.jpg",
    },
    {
      page: "Upload Documents",
      redirect: "/upload-documents",
      img: "https://aemabitfolder.sfo2.digitaloceanspaces.com/MIAPLUS/8619.jpg",
    },
    {
      page: "MIAPLUS+ Support",
      img: "https://aemabitfolder.sfo2.digitaloceanspaces.com/MIAPLUS/6340.jpg",
    },
  ];

  constructor() {}

  ngOnInit() {}

  downloadPDF(){

  }
}
