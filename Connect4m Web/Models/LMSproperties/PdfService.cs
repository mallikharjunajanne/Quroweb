using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;  
using Microsoft.AspNetCore.Mvc;
using System.IO;
using DinkToPdf;
using DinkToPdf.Contracts;

namespace Connect4m_Web.Models.LMSproperties
{
    public class PdfGenerator
    {
        private readonly IConverter _converter;

        public PdfGenerator(IConverter converter)
        {
            this._converter = converter;
        }


        public byte[] GeneratorPdf(string htmlContent)
        {
            var globalSettings = new GlobalSettings
            {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10, Bottom = 10, Left = 10, Right = 10 },
                DocumentTitle = "Generated PDF"
            };

            var objectSettings = new ObjectSettings
            {
                PagesCount = true,
                HtmlContent = htmlContent,
               // Page = "https://vendor.connect4m.com/Get_All_Format/_List_TblClientInfomation/",
               // Page = "http://192.168.1.79:82/School/GetWorksAvailableDetails/",
                WebSettings = { DefaultEncoding = "utf-8" },
                HeaderSettings = { FontSize = 12, Right = "Page [page] of [toPage]", Line = true, Spacing = 2.812 },
                FooterSettings = { FontSize = 12, Line = true, Right = "© " + DateTime.Now.Year }
            };

            var document = new HtmlToPdfDocument()
            {
                GlobalSettings = globalSettings,
                Objects = { objectSettings }
            };

            return _converter.Convert(document);
        }

    }
}






