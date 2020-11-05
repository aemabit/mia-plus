import { Component, OnInit } from "@angular/core";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { File } from "@ionic-native/file/ngx";
import { LoadingController, Platform } from "@ionic/angular";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { UserById } from "src/app/core/models/userById.model";
import { AuthService } from "src/app/core/services/auth/auth.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  loadedUserData: UserById[] = [];
  pdfObj;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private file: File,
    private plt: Platform,
    private fileOpener: FileOpener
  ) {}

  ngOnInit() {
    this.authService.userId.subscribe((res) => {
      if (res == null) {
        return null;
      }
      this.authService
        .getUserById(res)
        .subscribe((responseUserData: UserById[]) => {
          this.loadedUserData = responseUserData;
        });
    });
  }

  downloadPDF(btn) {
    btn.disabled = true;
    setTimeout(() => {
      btn.disabled = false;
    }, 2000);

    this.loadingCtrl
      .create({
        keyboardClose: true,
        message: "Loading...",
      })
      .then((loadingEl) => {
        loadingEl.present();

        const createPDFdate = Date.now();

        let createAt = new Date(Number(createPDFdate)).toDateString();
        let dateNow = new Date().toLocaleString();

        let docDefinition = {
          content: [],
          styles: {
            f18: {
              fontSize: 18,
            },
            subheader: {
              fontSize: 14,
              bold: true,
              margin: [0, 15, 0, 0],
            },
            header: {
              fontSize: 18,
              bold: true,
            },
            strong: {
              bold: true,
            },
            sectionHeader: {
              bold: true,
              decoration: "underline",
              fontSize: 14,
              margin: [0, 15, 0, 15],
            },
          },
        };

        docDefinition.content.push(
          {
            text: "Powered by KWIKLEE & MIAPLUS+",
            fontSize: 10,
            alignment: "right",
            bold: true,
          },
          {
            text: `CASE: ${this.loadedUserData[0].infoTitular.name}`,
            style: "header",
          }
        );

        docDefinition.content.push(" ");

        docDefinition.content.push({
          text: "Titular Details",
          style: "sectionHeader",
        });

        docDefinition.content.push(" ");
        docDefinition.content.push(
          {
            text: `Full Name: ${this.loadedUserData[0].infoTitular.name}`,
            bold: true,
          },
          {
            text: `Phone Number: ${this.loadedUserData[0].infoTitular.phone}`,
            bold: true,
          },

          {
            text: `Email: ${this.loadedUserData[0].infoTitular.email}`,
            bold: true,
          },
          {
            text: `Gender: ${this.loadedUserData[0].infoTitular.gender}`,
            bold: true,
          },
          {
            text: `Birth: ${this.loadedUserData[0].infoTitular.dateOfBirth}`,
            bold: true,
          },

          {
            text: `Country of Birth: ${this.loadedUserData[0].infoTitular.countryOfBirth}`,
            bold: true,
          },
          {
            text: `Marital Status: ${this.loadedUserData[0].infoTitular.maritalStatus}`,
            bold: true,
          },
          {
            text: `SSN: ${this.loadedUserData[0].infoTitular.ssn}`,
            bold: true,
          },

          {
            text: `Address: ${this.loadedUserData[0].infoTitular.city}, ${
              (this.loadedUserData[0].infoTitular.address,
              this.loadedUserData[0].infoTitular.zipcode)
            }`,
            bold: true,
          },

          {
            text: `Citizen Status: ${this.loadedUserData[0].infoTitular.citizenStatus}`,
            bold: true,
          },
          {
            text: `Citizenship Number: ${this.loadedUserData[0].infoTitular.citizenshipNumber}`,
            bold: true,
          },

          {
            text: `Alien Number: ${this.loadedUserData[0].infoTitular.alienNumber}`,
            bold: true,
          },
          {
            text: `Card Number: ${this.loadedUserData[0].infoTitular.cardNumber}`,
            bold: true,
          },
          {
            text: `Date of Work Permit Exp: ${this.loadedUserData[0].infoTitular.dateOfWorkPermitExpiration}`,
            bold: true,
          },
          {
            text: `Work Permit Category: ${this.loadedUserData[0].infoTitular.workPermitCategory}`,
            bold: true,
          }
        );

        docDefinition.content.push(" ");

        docDefinition.content.push({
          text: "Dependents Details",
          style: "sectionHeader",
        });

        if (this.loadedUserData[0].infoDependent.length > 0) {
          for (
            let i = 0;
            i < this.loadedUserData[0].infoDependent.length;
            i++
          ) {
            docDefinition.content.push(" ");

            docDefinition.content.push(
              {
                text: `Name: ${this.loadedUserData[0].infoDependent[i].name} `,
                bold: true,
              },
              {
                text: `Gender: ${this.loadedUserData[0].infoDependent[i].gender} `,
                bold: true,
              },
              {
                text: `Birth: ${this.loadedUserData[0].infoDependent[i].dateOfBirth} `,
                bold: true,
              },
              {
                text: `Relation: ${this.loadedUserData[0].infoDependent[i].relation} `,
                bold: true,
              },
              {
                text: `Citizen Status: ${this.loadedUserData[0].infoDependent[i].citizenStatus} `,
                bold: true,
              },
              {
                text: `Citizenship Number: ${this.loadedUserData[0].infoDependent[i].citizenshipNumber} `,
                bold: true,
              },
              {
                text: `Alien Number: ${this.loadedUserData[0].infoDependent[i].alienNumber} `,
                bold: true,
              },
              {
                text: `Card Number: ${this.loadedUserData[0].infoDependent[i].cardNumber} `,
                bold: true,
              },
              {
                text: `Date of Work Permit Exp: ${this.loadedUserData[0].infoDependent[i].dateOfWorkPermitExpiration} `,
                bold: true,
              },
              {
                text: `Work Permit Category: ${this.loadedUserData[0].infoDependent[i].workPermitCategory} `,
                bold: true,
              }
            );
            docDefinition.content.push({
              canvas: [
                { type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 },
              ],
            });
          }
        }

        docDefinition.content.push(" ");

        docDefinition.content.push({
          text: "Employment Details",
          style: "sectionHeader",
        });

        docDefinition.content.push(
          {
            text: `Employer: ${this.loadedUserData[0].infoEmployment.employer} `,
            bold: true,
          },
          {
            text: `Annual Income: ${this.loadedUserData[0].infoEmployment.annualIncome} `,
            bold: true,
          },
          {
            text: `Household Taxes: ${this.loadedUserData[0].infoEmployment.houseHoldTaxes} `,
            bold: true,
          },
          {
            text: `Spouse Employer: ${this.loadedUserData[0].infoEmployment.spouseEmployer} `,
            bold: true,
          },
          {
            text: `Spuse Annual Income: ${this.loadedUserData[0].infoEmployment.spouseAnnualIcome} `,
            bold: true,
          }
        );

        docDefinition.content.push(" ");

        docDefinition.content.push({
          text: "Docs Details",
          style: "sectionHeader",
        });

        docDefinition.content.push(
          {
            text: `Document: ${this.loadedUserData[0].infoDocs.doc1} `,
            bold: true,
          },
          { text: " " },

          {
            text: `Document: ${this.loadedUserData[0].infoDocs.doc2} `,
            bold: true,
          },
          { text: " " },

          {
            text: `Document: ${this.loadedUserData[0].infoDocs.doc3} `,
            bold: true,
          },
          { text: " " },

          {
            text: `Document: ${this.loadedUserData[0].infoDocs.doc4} `,
            bold: true,
          }
        );

        this.pdfObj = pdfMake.createPdf(docDefinition);
        setTimeout(() => {
          this.downloadPdf();
          loadingEl.dismiss();
        }, 1500);
      });
  }

  downloadPdf() {
    let ordernum = this.loadedUserData[0].infoTitular.zipcode;

    if (this.plt.is("cordova")) {
      this.pdfObj.getBuffer((buffer) => {
        let utf8 = new Uint8Array(buffer);
        let binaryArray = utf8.buffer;
        let blob = new Blob([binaryArray], { type: "application/pdf" });
        if (this.plt.is("ios") || this.plt.is("ipad")) {
          this.file
            .writeFile(this.file.cacheDirectory, `order${ordernum}.pdf`, blob, {
              replace: true,
            })
            .then((fileEntry) => {
              this.fileOpener.open(
                this.file.cacheDirectory + `order${ordernum}.pdf`,
                "application/pdf"
              );
            });
        } else {
          this.file
            .writeFile(this.file.dataDirectory, `order${ordernum}.pdf`, blob, {
              replace: true,
            })
            .then((fileEntry) => {
              this.fileOpener.open(
                this.file.dataDirectory + `order${ordernum}.pdf`,
                "application/pdf"
              );
            });
        }
      });
    } else {
      this.pdfObj.print();
    }
  }
}
