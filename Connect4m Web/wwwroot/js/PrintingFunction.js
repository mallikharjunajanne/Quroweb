


function CallPrint(tableid) {
    try {
        var printContent = document.getElementById(tableid);
        var windowUrl = 'about:blank';
        var uniqueName = new Date();

        var printWindow = window.open(windowUrl, uniqueName);
        printWindow.document.open();
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        printWindow.document.write(printContent.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
 
    // printWindow.close();
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}