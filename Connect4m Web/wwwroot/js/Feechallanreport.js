     /*---==**** FEE CHALLAN REPORT ****==---*/

//----***** Ajax Common Method *****---------
//function CallToAjax(method, url, data, successCallback, errorCallback, hasFileUpload) {
//    var ajaxOptions = {
//        url: url,
//        method: method,
//        data: data,
//        processData: false,
//        contentType: false,
//        success: successCallback,
//        error: function (xhr, status, error) {
//            errorCallback(xhr.status, error);
//        }
//    };
//    if (hasFileUpload) {

//        ajaxOptions.processData = false;
//        ajaxOptions.contentType = false;
//    }

//    $.ajax(ajaxOptions);
//}



$(document).ready(function () {

    function CallToAjax_Withoutdata(method, url, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: method,
            success: successCallback,
            error: function (xhr, status, error) {
                errorCallback(xhr.status, error);
            }
        });
    }

    ///-----------******* DROPDOWN FUNCTION CODE START
    fetchDataAndPopulateDropdown(
        '/Reports/InstanceClassification_DD', // URL for data fetching
        '#FddlDepartment',                    // Dropdown selector
        'instanceSubclassificaitionId',           // Field name for option values
        'subClassificationName',                 // Field name for option text
        'subclassificationlist'                      // Response value return class name
    ); 
    function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
        CallToAjax_Withoutdata('GET', url,
            function (response) {
                debugger;
                var dataToPopulate = Array.isArray(response) ? response : response[Responsevalues] || [];
                populateDropdown(dataToPopulate, dropdownSelector, valueField, textField);
            },
            function (status, error) {
                // Handle errors here
                console.error("Error fetching data:", error);
            }
        );
    }
    function populateDropdown(data, dropdownSelector, valueField, textField) {
        var dropdown = $(dropdownSelector);
        dropdown.empty(); // Clear existing options

        dropdown.append($('<option>', {
            value: '',
            text: '---Select---'
        }));
        $.each(data, function (index, item) {
            dropdown.append($('<option>', {
                value: item[valueField],
                text: item[textField]
            }));
        });
    }





    function CallToAjax(method, url, data, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: method,
            data: data,
            success: successCallback,
            error: function (xhr, status, error) {
                errorCallback(xhr.status, error);
            }
        });
    }

    $("#Btnsearch").click(function () {
        debugger;
        var Subclassificationid = $('#FddlDepartment').val();
        var FirstName = $('#Firstnametxtid').val();
        var LastName = $('#Lastnametxtid').val();
        var requestData = {
            SubClassificationId: Subclassificationid,
            FirstName: FirstName,
            LastName: LastName
            // Add other properties if needed
        };
        var url = "/Reports/FeeReceiptNew_tbldata";
         CallToAjax('GET', url, requestData,
            function (response) {
                debugger;
                bindDatatable(response);
            },
            function (status, error) {
                console.error("Error fetching data:", error);
            }
        );
    });


    //-----------------DataTable Data Dinding Function
    function bindDatatable(response) {

        var formattedDate = GetDateFormat();
        debugger;
        var table = $('#Frtableid').DataTable();
        table.destroy();
        $("#tablecountlblid").text(response.length);

        var newTable = $("#Frtableid").DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'pdfHtml5',
                    title: 'Manage Holidays Report',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6]
                    },

                }
                ,
                {
                    extend: 'excel',
                    title: 'Manage Holidays Report',
                    message: "Report On: " + formattedDate,

                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6]
                    },
                },


                {
                    extend: 'print',
                    title: 'Manage Holidays Report',
                    message: "Report On: " + formattedDate,
                    exportOptions: {
                        columns: [1, 2, 3, 4, 5, 6]
                    },
                }


            ],

            bProcessing: false,
            bLengthChange: true,
            /*  lengthMenu: [[5, 10, 25, -1], [5, 10, 25, "ALL"]],*/
            bfilter: false,
            bSort: true,
            searching: false,
            //scrollX: true,
            //scrollY: '400px',
            /* scrollCollapse: true,*/
            paging: true,
            bPaginate: true,
            //  stateSave:true,
            data: response,
            columns: [

                //{
                //    data: "SNO",
                //    //visible: false,

                //    render: function (data, type, row, meta) {
                //        //  length++;
                //        return row.holidayId
                //    }
                //},
                {
                    targets: 0, // Assuming this is the column index where you want to display numbering
                    render: function (data, type, row, meta) {
                        var currentPage = table.page.info().page;
                        var rowsPerPage = table.page.info().length;
                        return (0 * rowsPerPage) + meta.row + 1;
                    }
                },

                {
                    data: "FirstName",

                    render: function (data, type, row, meta) {
                        //  length++;
                        var userId = row.userId;
                        var divId = 'Div_' + userId;
                        return '<span class="firstNameColumn">' + row.firstName + '</span><div id="' + divId + '"></div>';
                        //return row.firstName + '<div id="' + divId + '"></div>';

                    }
                },
                {
                    data: "FirstName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.firstName

                    }
                },
                {
                    data: "ClassificationName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.classificationlist[0].classificationName + '<input type="text" value=' + row.userId + ' hidden/>'

                    }
                },
                {
                    data: "SubClassificationName",

                    render: function (data, type, row, meta) {
                        //  length++;

                        return row.subclassificationlist[0].subClassificationName

                    }
                }
                //,
                //{
                //    data: "NoofDays",

                //    render: function (data, type, row, meta) {
                //        return row.noofDays
                //        //var paymentDate = new Date(row.paymentDate);

                //        // return paymentDate.toLocaleDateString();

                //    }
                //},
                //{
                //    data: "IsPosted",

                //    render: function (data, type, row, meta) {
                //        //return row.isPosted
                //        if (row.isPosted == 'False') {
                //            return 'Not Posted'
                //        } else {
                //            return 'Posted'
                //        }

                //        //if (row.docName.trim() !== "") {
                //        //    return '<i class="fa fa-eye" title="View Expenditure Details" id="SEM_Expendituredetails" ></i><i class="fa fa-eye" title="View document" id="SEMView_document" ><span style="display:none">' + row.docName + '</span> </i>'
                //        //}
                //        //else {
                //        //    return '<i class="fa fa-eye" title="View Expenditure Details" id="SEM_Expendituredetails" ></i>'
                //        //}

                //    }
                //}, {
                //    data: "HolidayId",

                //    render: function (data, type, row, meta) {
                //        // return row.holidayId
                //        return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'
                //        // return row.holidayId + '<input type="text" value=' + row.holidayId + ' hidden/>'
                //        //if (row.expenditureType == 0) {
                //        //    return '<span>Credit</span>';

                //        //}
                //        //else {
                //        //    return '<span>Debit</span>';

                //        //}

                //    }
                //}
                //}, {
                //    data: "Approvals",

                //    render: function (data, type, row, meta) {
                //        if (row.approvals == null || row.approvals == "") {

                //            return '<div class="SEMapprovals"><img src="/Images_IMP/pending_02.png"  title="Pending" /></div>'
                //        }
                //        else if (row.approvals == "0") {
                //            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/Rejects.png" title="Reject" /><i class="fa fa-eye" style="font-size:20px" title="View Comments" ></i></i></div>'
                //        }
                //        else {
                //            return '<div class="SEMapprovalsafter"><img src="/Images_IMP/approvals_1.png"  title="Approvals" /><i class="fa fa-eye" style="font-size:20px" title="View Comments"  ></i></i></div>'
                //        }

                //    }
                //}
                //, {

                //    render: function (data, type, row, meta) {
                //        //  length++;
                //        if (row.approvals == "1") {
                //            return ''
                //        }
                //        else {
                //            return '<i class="fa fa-trash-o" style="color:red;font-size: 23px;cursor: pointer;" title="Delete"></i>'

                //        }

                //    }
                //}
            ]


        });

        table.on('draw', function () {
            $('#Frtableid').find('td:nth-child(1)').attr('title', 'Edit');
        });
        $('#Frtableid').find('td:nth-child(1)').attr('title', 'Edit');
    }



});



//-------------------------------------   Click For Update in the list(table)
$(document).on('click', '#Frtableid .firstNameColumn', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var table = $('#Frtableid').DataTable();
    var rowData = table.row($(this).closest('tr')).data(); // Get the row data

    if (rowData) {
        var Userid = rowData.userId;       
        Userfeedetails(Userid);
    } 
})


function Userfeedetails(Userid) {
    $.ajax({
        url: '/Reports/Get_FeeReceiptdetails?FUserid=' + Userid,
        type: 'GET',  
        success: function (response) {           
            $('#Div_' + Userid).html(response);
        },
        error: function (xhr, status, error) {
            
        }
    });
}
//----->>>Open New window
var windowOpened = false; 

function openNewWindow(userReceiptGenerationID, userID) {
    event.stopImmediatePropagation();

    var url = '/Reports/GetFeeReceiptdetailsByUserIdChallanId?FUserId=' + userID + '&ChallanId=' + userReceiptGenerationID;

    if (!windowOpened) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function (response) {
                debugger;
                var newWindow = window.open();
                newWindow.document.write(response);
                newWindow.focus();
            },
            error: function (xhr, status, error) {

            }
        });

        windowOpened = true; // Set the flag to true after opening the window
    }
}




//======>>>>>> Delete Challan
$(document).on('click', '#Feedetailsbyusertbl .delete-icon', function (event) {
    event.stopImmediatePropagation();
    debugger;
    var table = $('#Feedetailsbyusertbl').DataTable();
    var rowData = table.row($(this).closest('tr')).data(); // Get the row data

    if (rowData) {
        var Userid = rowData.userReceiptGenerationId;
        Deleteuserchallan(Userid);
    }
})
