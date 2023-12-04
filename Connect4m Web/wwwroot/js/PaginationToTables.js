

function Pagination(TableLength, Tableid) {
    try {
    debugger;
    $("#" + Tableid + " tfoot").remove();
    // $('#' + TBlFooterPaginationDiv_ID).empty();
    if (TableLength < 11) {
        $("#" + Tableid + " tfoot").remove();
        // $("#" + Tableid + " tfoot").hide();
    }
    else {

        var table = $('#' + Tableid);
        var tbody = table.find('tbody');

        var thead_TH_Count = table.find('thead').find("th").length;

        var TBlFooterPaginationDiv_ID = Tableid + "_pagination";
        var TBlFooterPaginationClass = TBlFooterPaginationDiv_ID + '_Class';


        var tfootContent = '<tfoot>' +
            '<tr>' +
            '<td style="padding:2px" colspan='+thead_TH_Count+'>' +
            '<div style="text-align:center" id="' + TBlFooterPaginationDiv_ID + '">' +
            '</div>' +
            '</td>' +
            '</tr>' +
            '</tfoot>';

        $('#' + Tableid).append(tfootContent);

        var pagenationtext = $("#" + TBlFooterPaginationDiv_ID + " ." + TBlFooterPaginationClass+".active").text();

        debugger;



        var rowsPerPage = 10; // Number of rows to display per page
       // var numPages = Math.ceil(TableLength / rowsPerPage);
        var currentPage = 1; // Default current page

        var pagination = $('#' + TBlFooterPaginationDiv_ID);
      //  pagination.empty();

        // Create pagination links
        var previousLink = $('<a class="' + TBlFooterPaginationClass + '" style="margin: 0 2px;" href="#">Previous</a>');
        //pagination.append(previousLink);

        //var startIndex = 1; // Start index for pagination links
        //var endIndex = Math.min(numPages, 10); // End index for pagination links

        //for (var i = startIndex; i <= endIndex; i++) {
        //    var link = $('<a class="' + TBlFooterPaginationClass + '" style="margin: 0 2px;" href="#">' + i + '</a>');
        //    pagination.append(link);
        //}


        var nextLink = $('<a class="' + TBlFooterPaginationClass + '" style="margin: 0 2px;" href="#">Next</a>');
       // pagination.append(nextLink);

        // Show the first page by default
        //showPage(currentPage);

        // Adjust pagination alignment
        pagination.css('text-align', 'center');
        debugger;
        if (pagenationtext != '') {


            // Get all the <a> elements within the specified div
            var aTags = document.querySelectorAll("#" + TBlFooterPaginationDiv_ID+" a");

            // Loop through each <a> tag and check if the selected text matches its inner text
            var isSelectedTextAvailable = false;
            for (var i = 0; i < aTags.length; i++) {
                if (aTags[i].innerText === pagenationtext) {
                    isSelectedTextAvailable = true;
                    break;
                }
            }
            if (isSelectedTextAvailable) {
                showPage(pagenationtext);
            }
            else {
                showPage(1);
            }
        }
        else {
            // Show the first page by default
            showPage(currentPage);

            // Adjust pagination alignment
            pagination.css('text-align', 'center');
            debugger;
            // Handle pagination link click event
            pagination.on('click', '.' + TBlFooterPaginationClass, function (e) {   
                e.preventDefault();
               // LeaveLevels_In_Table_Caliingfunction(event, 12);

                var numPages = Math.ceil(tbody.find('tr').length / rowsPerPage);

                var linkText = $(this).text();
                if (linkText === "Previous") {
                    currentPage = Math.max(currentPage - 1, 1);
                } else if (linkText === "Next") {
                    currentPage = Math.min(currentPage + 1, numPages);
                } else {
                    currentPage = parseInt(linkText);
                }
                showPage(currentPage);
            });
        }

        // Function to display the specified page
        function showPage(page) {
            var start = (page - 1) * rowsPerPage;
            var end = start + rowsPerPage;

            tbody.find('tr').hide(); // Hide all rows
            tbody.find('tr').slice(start, end).show(); // Show rows for the specified page

            var numPages2 = Math.ceil(tbody.find('tr').length / rowsPerPage);



            // Update pagination links
            var newStartIndex = Math.max(1, page - 4);
            var newEndIndex = Math.min(newStartIndex + 9, numPages2);

            if (newEndIndex === numPages2) {
                newStartIndex = Math.max(1, numPages2 - 9);
            }

            pagination.empty();
            pagination.append(previousLink);

            for (var i = newStartIndex; i <= newEndIndex; i++) {
                var link = $('<a class="' + TBlFooterPaginationClass + '" style="margin: 0 2px;" href="#">' + i + '</a>');
                pagination.append(link);
            }

            pagination.append(nextLink);

            // Update active class on current page link
            $('.' + TBlFooterPaginationClass).removeClass('active');
            $('.' + TBlFooterPaginationClass).eq(page - newStartIndex + 1).addClass('active').css('cursor', 'unset');;
            debugger;
            $('.' + TBlFooterPaginationClass + '.active').css({
                /* Add any additional styles for the active page number */
                'background-color': 'black',
                'color': 'white',
                'cursor': 'default',

            });

        }


        


       // $("#" + Tableid + " tfoot").show();
        }
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
    }
}