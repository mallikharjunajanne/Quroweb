

//-----------------------------------------------------------------------   Click ON Programs
$(document).on('click', '#ProgramDetails', function () {
    var VLD_parentid = $(this).closest('#VLD_ProgressDetails');
    var VLD_Instanceclassficationid = $(VLD_parentid).find("#VLD_Instanceclassficationid").val();
    var VLD_InstanceSubClassificationId = $(VLD_parentid).find("#VLD_InstanceSubClassificationId").val();
    window.location.href = "/Videos/ViewLectureDocsSub?InstanceClassificationId=" + VLD_Instanceclassficationid + "&InstanceSubClassificationId=" + VLD_InstanceSubClassificationId;

})

//-------------------------------------------------------Arial Expand Show And Hide
$(document).on('click', '.card #collapse', function (event) {
  //  alert("hii");
    event.stopImmediatePropagation();
    const collapseContent = $(this).closest('.card');
    const isExpanded = $(collapseContent).find(".collapse");

    const ariaexpanded = $(this).attr("aria-expanded") === "true";
   
    if (ariaexpanded) {
        $(isExpanded).removeClass("show");
        $(this).attr("aria-expanded", "false");
    }
    else {
        $(isExpanded).addClass("show");
        $(this).attr("aria-expanded", "true");
    }
   
})


//------------------------------------------------------------------------Click On  Subjects
$(document).on('click', '.card #ProgramDetails_sub', function () {
    var VLD_parentid = $(this).closest('#VLD_ProgressDetails_sub');
    var VLD_Instanceclassficationid = $(VLD_parentid).find("#VLD_Instanceclassficationid_sub").val();
    var VLD_InstanceSubClassificationId = $(VLD_parentid).find("#VLD_InstanceSubClassificationId_sub").val();
    var VLD_InstanceSubjectid = $(VLD_parentid).find("#VLD_SubjectId_sub").val();
    window.location.href = "/Videos/ViewLectureDocsSubVideos?InstanceClassificationId=" + VLD_Instanceclassficationid + "&InstanceSubClassificationId=" + VLD_InstanceSubClassificationId + "&SubjectId=" + VLD_InstanceSubjectid;

})
//-------------------------------------------------------------------------------Back To Programs
$(document).on('click', '#VLD_Backtoprogram', function () {
    window.location.href = "/Videos/ViewLectureDocs";
})

//-----------------------------------------------------------------------  Go to Video 

$(document).on('click', '#VLD_VideoView input[type="text"]', function (event) {
    event.stopImmediatePropagation();
    debugger;
    const elementsWithClass = document.querySelectorAll(".clickedlinkinvideos");

    elementsWithClass.forEach(element => {
        element.classList.remove(".clickedlinkinvideos");
    });

    var source = $(this).closest("tr").find("img").attr("src");
    $(this).closest("tr").addClass("clickedlinkinvideos");
    var endsWithImg = source.endsWith("mp4.png");
    var endsWithpdf = source.endsWith("pdf.png");
    var endswithdocs = source.endsWith("doc.png");
    var endswithexcel = source.endsWith("xls.png");
    if (endsWithImg) {
        window.location.href = "/Videos/ListChaptersQuestionsAnswers?SubjectVideoId=" + $(this).val();
    }
  
    if (endsWithpdf || endswithdocs || endswithexcel ) {
       // var divsource = $(this).closest("tr").find("div").text();
       // var displayname = $(this).closest("tr").find('#VLD_VideoView').text();
        
        window.location.href = "/Videos/ListChaptersQuestionsAnswers?SubjectVideoId=" + $(this).val() +"&type=1215";
        //showPDF(divsource);
    }



})

               


//-----------------------------------------------------------------------------------   Pdf View 
function showPDF(source) {
   // debugger;
    document.getElementById("container2").style.display = "none";
    document.getElementById("video").style.display = "none";
    document.getElementById("chapters-panel").style.display = "none";
    document.getElementById("show-panel-button").style.display = "none";
    document.getElementById("Hide-panel-button").style.display = "none";
    document.getElementById("pdfcontainer").style.display = "block";
    document.getElementById("pdfshow").innerHTML = '';

    if (source.endsWith('.docx')) {
        renderWordDocument('/LMSDocs/Instance545/'+source, 'pdfshow');

    }
    else if (source.endsWith('.xlsx')){
        renderEXCEL('/LMSDocs/Instance545/' + source, document.getElementById("pdfshow"));

    }
    else {

        renderPDF('/LMSDocs/Instance545/' + source, document.getElementById("pdfshow"));//725488file (22).pdf
        //  renderPDF('/LMSDocs/Instance545/725488file (22).pdf', document.getElementById("pdfshow"));
    }
}

function showGeneratedPDF(source,displayname) {
   // debugger;
    $("#video").find('source').attr("src", " ");
    $('#displaynameTop').text(displayname);
    document.getElementById("container2").style.display = "none";
    document.getElementById("video").style.display = "none";
    document.getElementById("chapters-panel").style.display = "none";
    document.getElementById("show-panel-button").style.display = "none";
    document.getElementById("Hide-panel-button").style.display = "none";
    document.getElementById("pdfcontainer").style.display = "block";

    renderPDF('/Generated PDFs/Instance545/' + source, document.getElementById("pdfshow"));//725488file (22).pdf
    //  renderPDF('/LMSDocs/Instance545/725488file (22).pdf', document.getElementById("pdfshow"));
}



async function renderPDF(url, container) {
    document.getElementById("pdfshow").innerHTML = '';
    const pdf = await pdfjsLib.getDocument(url).promise;

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        // Create a canvas element to render the PDF page
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");

        // Render the PDF page into the canvas
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        await page.render(renderContext).promise;

        // Create a container for each page along with its page number
        const pageContainer = document.createElement("div");
        pageContainer.className = "pdf-page";

        const pageNumberDiv = document.createElement("div");
        pageNumberDiv.className = "page-number";
        pageNumberDiv.textContent = "Page " + pageNumber;

        pageContainer.appendChild(canvas);
        pageContainer.appendChild(pageNumberDiv);
        container.appendChild(pageContainer);
    }
}
//------------------------------------------  Open Docs
function renderWordDocument(url, containerId) {
    debugger;
    const container = document.getElementById(containerId);

    fetch(url)
        .then(response => response.arrayBuffer())
        .then(data => {
            const options = {
                styleMap: [
                    "p[style-name='Title'] => h1:fresh",
                    "p[style-name='Title'] => h1.centered:fresh", // Add a centered class to h1
                    "p[style-name='Heading'] => h2:fresh",
                    "p[style-name='Heading'] => h2.centered:fresh", // Add a centered class to h2
                    "p[style-name='Subheading'] => h3:fresh",
                    "p[style-name='Subheading'] => h3.centered:fresh", // Add a centered class to h3
                ]
            };

            const reader = new FileReader();
            reader.onload = function (event) {
                const arrayBuffer = event.target.result;
                mammoth.convertToHtml({ arrayBuffer: arrayBuffer }, options)
                    .then(result => {
                        debugger;
                        container.innerHTML = result.value;
                        container.style.cssText = `
                            background-color: white;
                            color: black;
                            text-align: start;
                            line-height: 52px;
                            word-spacing: 10px;
                            overflow-y: scroll;
                            height: 76vh;
                             padding: 18px;
                            border: 2px solid black;
                        `;
                    })
                    .catch(error => {
                        console.error("Error rendering Word document:", error);
                    });
            };
            reader.readAsArrayBuffer(new Blob([data]));
        })
        .catch(error => {
            console.error("Error fetching Word document:", error);
        });
}






//-------------------------------------------------------------------------- EXCEL View


function renderEXCEL(fileUrl, tableElement) {
    var tableid = document.createElement('table');
   // tableid.className = 'styled-table';
    debugger;
    fetch(fileUrl)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const htmlTable = XLSX.utils.sheet_to_html(worksheet);
            tableid.innerHTML = htmlTable;
            tableElement.appendChild(tableid);
        })
        .catch(error => {
            console.error('Error loading Excel file:', error);
        });
}



// Call the function with the URL of your Word document and the container ID
//renderWordDocument('/LMSDocs/Instance545/Affidavit_format.docx', 'pdfshow');






//function renderWordDocument(url, containerId) {
//    debugger;
//    const container = document.getElementById(containerId);
//    container.style.cssText = "background-color: white; color: black;text-align:start;line-height:52px;word-spacing:10px;overflow-y:scroll;height:76vh;border:2px solid black;";
// //   container.style.backgroundColor = "white";

//    fetch(url)
//        .then(response => response.arrayBuffer())
//        .then(data => {
//            const zip = new JSZip(data);
//            const doc = new window.docxtemplater().loadZip(zip);

//            const content = doc.getFullText();

//            container.innerHTML = content;
//        })
//        .catch(error => {
//            console.error("Error rendering Word document:", error);
//        });
//}



//------------------------------------- Progress Bar In Lecture Docs

















//function renderPDF(url, container) {
//    pdfjsLib.getDocument(url).promise.then(function (pdf) {
//        // Loop through all pages in the PDF
//        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
//            pdf.getPage(pageNumber).then(function (page) {
//                var scale = 1.5;
//                var viewport = page.getViewport({ scale: scale });

//                // Create a canvas element to render the PDF page
//                var canvas = document.createElement("canvas");
//                canvas.width = viewport.width;
//                canvas.height = viewport.height;
//                var context = canvas.getContext("2d");

//                // Render the PDF page into the canvas
//                var renderContext = {
//                    canvasContext: context,
//                    viewport: viewport
//                };
//                page.render(renderContext).promise.then(function () {
//                    // Append the canvas to the specified container
//                    container.appendChild(canvas);
//                });
//            });
//        }
//    });
//}
