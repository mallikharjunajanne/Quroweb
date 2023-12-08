

//---------------------------   Close The Alert Message 
$('.alert button').click(function (event) {
    event.preventDefault();
    $(this).closest('.alert').css('display', 'none');
})




//To check all check boxes
//Calling function   -SelectAllCheckBoxes(this);
function SelectAllCheckBoxes(checkbox) {
    $(".ErrorMessageSpan").empty();
    var checked = checkbox.checked;
    $(':checkbox:not(:disabled)').prop("checked", checked);
}



//var js = jQuery.noConflict(true);


function CharactercountFunction(LabelId) {
    debugger;
    var textareavalue = $(this).val();
    var maxlength = 500;
    var textareacount = maxlength - textareavalue.length;
    if (textareacount != 500) {
        $("#" + LabelId).show();
    }
    $("#" + LabelId).text(textareacount);
}


//Data table function with Out columns

function TblDataTableWith_OutColumns_CallingFunction(tablename, response, TableCountsId, currentPage, ExelTitlename, ExcelDownloadColumnsNo, columnDefs, DivId_Toshow) {
    try {
        debugger;
    // var js = jQuery.noConflict(true);
       var tableLength;


        debugger;

        if (TableCountsId != "" || TableCountsId == 0) {
            tableLength = TableCountsId;
        } else {
            tableLength = response.length;
        }
    
       // var table = js('#' + tablename).DataTable();
       // var currentPage = table.page.info().page;

       //table.destroy();
        // var columns = [];
        debugger;
        
        
        if (tablename == 'LeaveLevels_SearchRecords_Table') {
            columns = [
                {
                    data: "LeaveLevelId",
                    render: function (data, type, row, meta) {
                        var LeaveLevelId = "<input type='text' id='LeaveLevelId_TBL' value='" + row.leaveLevelId + "' hidden />";
                        var LevelID = "<input type='text' id='LevelID_TBL' value='" + row.levelID + "' hidden />";
                        var InstanceDesignationId = "<input type='text' id='InstanceDesignationId_TBL' value='" + row.instanceDesignationId + "' hidden />";
                        var InstanceClassificationId = "<input type='text' id='instanceClassificationId_TBL' value='" + row.instanceClassificationId + "' hidden />";
                        return "<a id='Leavelevelid' style='cursor: pointer;font-weight: bold;'>" + row.levelName + "</a>" + LeaveLevelId + LevelID + InstanceDesignationId + InstanceClassificationId;
                    }
                },
                {
                    data: "ClassificationName",
                    render: function (data, type, row, meta) {
                        return row.classificationName
                    }
                },
                {
                    data: "RoleName",
                    render: function (data, type, row, meta) {
                        return row.roleName
                    }
                },
                {
                    data: "AppliedUserName",
                    render: function (data, type, row, meta) {
                        var AppliedUserId = "<input type='text' id='AppliedUserId_TBL' value='" + row.appliedUserId + "' hidden />";
                        //   "<td>" + row.approverUserName + "" + Approveruserid + "</td>" +
                        return row.appliedUserName + AppliedUserId
                        // return   + row.appliedUserName + " " + AppliedUserId + 
                        //return row.leaveFromdate
                    }
                },
                {
                    data: "ApproverUserName",
                    render: function (data, type, row, meta) {
                        var Approveruserid = "<input type='text' id='Approveruserid_TBL' value='" + row.userid + "' hidden />";
                        //"<td>" + Value2.approverUserName + "" + Approveruserid + "</td>" +    
                        return row.approverUserName + Approveruserid
                        // return   + row.appliedUserName + " " + AppliedUserId + 
                        //return row.leaveFromdate
                    }
                },
                {
                    data: "LeaveTodate",
                    className: "CenterAlign",
                    render: function (data, type, row, meta) {
                        var DeleteBTN = "<p class='fa fa-trash -o' title='Click to delete this record' style='font-size:18px; color:red; cursor:pointer; '><input type='text' hidden  id='id_For_Delete' value=''></p>";
                        return DeleteBTN
                    }
                },
            ]
            var Newtable = js("#" + tablename).DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: "Export to Excel",
                        title: ExelTitlename,
                        exportOptions: {
                            columns: ExcelDownloadColumnsNo
                        }, customize: function (xlsx) {
                            var sheet = xlsx.xl.worksheets['sheet1.xml'];

                            //// Center-align the title in the worksheet
                            //var titleCell = $(sheet).find('c[r^="A1"]');
                            //titleCell.attr('s', '2'); // Apply a style to center-align
                            $('c[r*="A1"]', sheet).attr('s', '2');

                            // Apply a border to the entire table
                            var rows = $(sheet).find('row');
                            rows.each(function () {
                                $(this).find('c').attr('s', '25'); // Apply a style with a border (s=25) to each cell
                            });
                        },
                    }
                ],
                columnDefs: columnDefs,
                info: false,
                processing: false,
                lengthChange: false,
                filter: false,
                sort: true,
                searching: false,
                order: [],
                paging: true,
                paginate: false,
               // jQuery: false,
                data: response,
                columns: columns,
               // rowsGroup: [0]
            });
        } else {
            var Newtable = js("#" + tablename).DataTable({
                dom: 'Bfrtip',
                buttons: [
                    {
                        extend: 'excelHtml5',
                        text: "Export to Excel",
                        title: ExelTitlename,
                        // visible: false,
                        exportOptions: {
                            columns: ExcelDownloadColumnsNo,
                            // columns: ':visible',
                            // visible: false,
                        },
                        customize: function (xlsx) {
                            var sheet = xlsx.xl.worksheets['sheet1.xml'];

                            //// Center-align the title in the worksheet
                            //var titleCell = $(sheet).find('c[r^="A1"]');
                            //titleCell.attr('s', '2'); // Apply a style to center-align
                            $('c[r*="A1"]', sheet).attr('s', '2');

                            // Apply a border to the entire table
                            var rows = $(sheet).find('row');
                            rows.each(function () {
                                $(this).find('c').attr('s', '25'); // Apply a style with a border (s=25) to each cell
                            });
                        },
                    },
                ],
                columnDefs: columnDefs,
                bInfo: false,
                bProcessing: false,
                bLengthChange: false,
                bfilter: false,
                bSort: true,
                searching: false,
                aaSorting: [],
                paging: true,
                bPaginate: false,
                paging: true,
                bPaginate: false,
                jQuery: false,
                
                //data: response,
                //columns: columns,
            });
        }
        //if (tablename == 'LeaveLevels_SearchRecords_Table') {
        //    Newtable.clear().rows.add(response).columns(columns).draw();
        //}
        Newtable.page(currentPage).draw('page');
        if (tableLength < 1) {
          //  $("#" + tablename).empty();
            $("#" + tablename).hide();
            $(".dataTables_paginate").hide();
            $(".dt-buttons").hide();
        } else {
            $("#" + tablename).show();
            //$(".dataTables_paginate").hide();
            if (tableLength < 11) {
                $(".dataTables_paginate").hide();
            } else {
                $(".dataTables_paginate").show();
            }
        }
        $("#" + DivId_Toshow).show();

        //if (response.length < 11) {
        //    $(".dataTables_paginate").hide();
        //} else {
        //    $(".dataTables_paginate").show();
        //}
        //$("#exportExcelButton").click(function () {
        //    debugger;
        //    Newtable.button('0').trigger();
        //});
} catch (error) {
        $("#Main_Span_Error").text("Something Error");
        $("#loadingOverlay").hide();
}
}


//Data table function with columns

function TblDataTableWithColumns_CallingFunction(event, val, Url, tablename, TableCountsId, FormId, DivId_Toshow, ExelTitlename, ExcelDownloadColumnsNo, paging) {
    try {
        debugger;
        //var js = jQuery.noConflict(true);
        $(".ErrorMessageSpan").empty();
        if (val != "Stop") {
            event.preventDefault();
        }

        var formdata = new FormData($("#" + FormId)[0]);
        if (tablename == "TblLeaveDeligationAuthorityList_SearchedRecords") {
            var Fromdate = $("#TxtFromDate").val();
            var Todate = $("#TxtToDate").val();
            if (Fromdate != "" || Todate != "") {
                if (Fromdate === "") {
                    if (Todate != "") {
                        $("#Main_Span_Error").text('Please Select From Date also');
                        return;
                    }
                }
                if (Todate === "") {
                    if (Fromdate != "") {
                        $("#Main_Span_Error").text('Please Select To Date also');
                        return;
                    }
                }
                if (Date.parse(Todate) < Date.parse(Fromdate)) {
                    $("#Main_Span_Error").text("'From Date' cannot be greater than 'To Date'. ");
                    return;
                }
            }
        }

        if (val != "Stop") {
            $("#loadingOverlay").show();
        }
        //if (paging != false || paging !=null) {
        if (paging != false ) {
            paging = true;
        } else {

        }
        //var paging = true;
        if (tablename == "TblLeaveRequested_SearchRecords" || tablename == "TblUser") {
            paging = false;
        }
         if (FormId == "FmUsersSearchForMBA") { 
            formdata.append("ScreenName", "ManageSubjectAssociationForMBA");
        }


        // Make AJAX call to the controller action
        $.ajax({
            //url: "/Attendance/TblCompensatoryLeavesSummery_CallingFunction",
            url: Url,
            type: "POST",
            data: formdata,
            contentType: false,
            processData: false,
            success: function (response) {
                debugger;
                var tableLength = response.length;
                $("#" + TableCountsId).text(tableLength);                       
                    var table = js('#' + tablename).DataTable();
                    var currentPage = table.page.info().page;
                    table.destroy();
                    var columns = [];
                    debugger;
                if (FormId == 'FmCOMPENSATORYLEAVESSEARCH') {
                    //tablename == "TblcompensatoryLeaves_SearchedRecords"
                    columns = [
                        {
                            data: "Leavetypeid",
                            visible: false,
                            render: function (data, type, row, meta) {
                                hiddenFieldValue = row.leavetypeid;
                                return row.leavetypeid ///compoffleaveid
                            }
                        },
                        {
                            data: "Username",
                            render: function (data, type, row, meta) {
                                if (row.leaveDetails == "No") {
                                    return '<a style="color:blue;cursor:pointer"  class="Undeline" id="UserName" onclick="EditCompensatoryLeavesFunction.call(this,' + row.leavetypeid + ')"> ' + row.username + '</a>';
                                } else
                                    return row.username
                            }
                        },
                        {
                            data: "ClassificationName",
                            render: function (data, type, row, meta) {
                                return row.classificationName
                            }
                        },
                        {
                            data: "Leavetype",
                            render: function (data, type, row, meta) {
                                return row.leavetype
                            }
                        },
                        {
                            data: "LeaveFromdate",
                            render: function (data, type, row, meta) {
                                return row.leaveFromdate //	Compensate Date
                            }
                        },
                        {
                            data: "Daystype",
                            render: function (data, type, row, meta) {
                                return row.daystype
                            }
                        },
                        {
                            data: "LeaveTodate",
                            render: function (data, type, row, meta) {
                                return row.leaveTodate //Expiry Date
                            }
                        },

                        {
                            data: "LeaveDetails",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                return row.leaveDetails
                            }
                        },
                        {
                            data: "Text",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                return row.text
                            }
                        },
                        {
                            data: "CreatedDate",
                            render: function (data, type, row, meta) {
                                var date = new Date(row.createdDate);

                                var formattedDate =
                                    date.getDate().toString().padStart(2, '0') + '-' +
                                    (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
                                    date.getFullYear() + ' ' +
                                    date.getHours().toString().padStart(2, '0') + ':' +
                                    date.getMinutes().toString().padStart(2, '0') + ':' +
                                    date.getSeconds().toString().padStart(2, '0');
                                return formattedDate //Created On
                            }
                        },
                        {
                            className: "CenterAlign",
                            // data: "Leavetypeid", //campoffleaveid
                            render: function (data, type, row, meta) {
                                var Value = "";
                                if (row.leaveDetails == "No")
                                    Value = '<a class="fa fa-trash" style="font-size: 15px; color: red;    cursor: pointer;" id="delete" onclick="DeleteCompensatoryLeavesFunction(' + row.leavetypeid + ')"></a>';
                                else
                                    value = "";

                                return Value
                            }
                        }

                    ]
                }
                else if (tablename == 'TblAlloPastdaysform_SearchedRecords') {
                    columns = [

                        {
                            data: "Username",
                            render: function (data, type, row, meta) {
                                return row.username
                            }
                        },
                        {
                            data: "ClassificationName",
                            render: function (data, type, row, meta) {
                                return row.classificationName
                            }
                        },
                        {
                            data: "Leavetype",
                            render: function (data, type, row, meta) {
                                return row.leavetype
                            }
                        },
                        {
                            data: "LeaveFromdate",
                            render: function (data, type, row, meta) {
                                return row.leaveFromdate
                            }
                        },

                        {
                            data: "LeaveTodate",
                            render: function (data, type, row, meta) {
                                return row.leaveTodate
                            }
                        },

                        {
                            data: "CreatedDate",
                            render: function (data, type, row, meta) {
                                var date = new Date(row.createdDate);

                                var formattedDate =
                                    date.getDate().toString().padStart(2, '0') + '-' +
                                    (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
                                    date.getFullYear() + ' ' +
                                    date.getHours().toString().padStart(2, '0') + ':' +
                                    date.getMinutes().toString().padStart(2, '0') + ':' +
                                    date.getSeconds().toString().padStart(2, '0');

                                return formattedDate
                            }
                        },
                        {
                            data: "LeaveStatus",
                            render: function (data, type, row, meta) {
                                return row.leaveStatus
                            }
                        },
                        //{
                        //    data: "CreatedDate",
                        //    render: function (data, type, row, meta) {
                        //        var date = new Date(row.createdDate);

                        //        var formattedDate =
                        //            date.getDate().toString().padStart(2, '0') + '-' +
                        //            (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
                        //            date.getFullYear() + ' ' +
                        //            date.getHours().toString().padStart(2, '0') + ':' +
                        //            date.getMinutes().toString().padStart(2, '0') + ':' +
                        //            date.getSeconds().toString().padStart(2, '0');



                        //        return formattedDate //Created On
                        //    }
                        //},
                        {
                            data: "LeaveAppliedDate", //campoffleaveid
                            render: function (data, type, row, meta) {

                                return row.leaveAppliedDate
                            }
                        }

                    ]
                }
                else if (tablename == "TblLeaveDeligationAuthorityList_SearchedRecords") {//Leave Cancellation Screen                      
                    columns = [
                        {
                            data: "LeaveApplicationId",
                            visible: false,
                            render: function (data, type, row, meta) {
                                return row.leaveApplicationId
                            }
                        },
                        {
                            data: "FirstName",
                            render: function (data, type, row, meta) {
                                return row.firstName
                            }
                        },
                        {
                            data: "ClassificationName",
                            render: function (data, type, row, meta) {
                                return row.classificationName
                            }
                        },
                        {
                            data: "LeaveReason",
                            render: function (data, type, row, meta) {
                                return row.leaveReason
                            }
                        },
                        {
                            data: "Leavetype",
                            render: function (data, type, row, meta) {
                                return row.leavetype
                            }
                        },
                        {
                            data: "LeaveFromdate",
                            render: function (data, type, row, meta) {
                                return row.leaveFromdate
                            }
                        },
                        {
                            data: "LeaveTodate",
                            render: function (data, type, row, meta) {
                                return row.leaveTodate
                            }
                        },
                        {
                            data: "LeaveNoOfDays1",
                            render: function (data, type, row, meta) {
                                return row.leaveNoOfDays1
                            }
                        },
                        {
                            data: "LeaveStatus",
                            render: function (data, type, row, meta) {
                                return row.leaveStatus
                            }
                        },
                        {
                            data: "Batchid",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                if (row.leaveCancelledFlag != "True") {
                                    return '<span id="BtnCancel" onclick="CommentopenPopup(\'DivCancelComment\',' + row.batchid + ',' + row.userId + ')" style="cursor: pointer; " class="badge badge-primary" title="Cancel Leave">Cancel</span>';
                                }
                                else {
                                    return ' Cancelled';
                                }
                            }
                        },
                        {
                            data: "Leavecomments",
                            render: function (data, type, row, meta) {
                                return row.leavecomments
                            }
                        },
                        {
                            data: "LeaveCancelledFlag",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                var Value = "";
                                if (row.leaveCancelledFlag == "True") {

                                }
                                else if (row.leavetype == " P" || row.leavetype == "P") {
                                    Value = '<a class="fa fa-edit" style="font-size: 11px; color: red;"></a>';
                                }
                                else {
                                    Value = '<a class="fa fa-edit" title="Edit" onclick="EditLeavesCalingFunction.call(this,' + row.userId + ',' + row.leaveApplicationId + ', \'' + row.leaveStatus + '\',\'' + row.username + '\')" style="font - size: 16px !important; color: red; cursor: pointer; "></a>';
                                }
                                return Value
                            }
                        }
                    ]
                }
                else if (tablename == "TblStaffList_SearchedRecords") {
                    columns = [
                        {
                            data: "FirstName",
                            render: function (data, type, row, meta) {
                                return row.firstName
                            }
                        },
                        {
                            data: "RoleName",
                            render: function (data, type, row, meta) {
                                return row.roleName
                            }
                        },
                        {
                            data: "DepartmentName",
                            render: function (data, type, row, meta) {
                                return row.departmentName
                            }
                        },
                        {
                            data: "InstanceUserCode",
                            render: function (data, type, row, meta) {
                                return row.instanceUserCode
                            }
                        },
                        {
                            data: "PortalEmail",
                            render: function (data, type, row, meta) {
                                return row.portalEmail
                            }
                        },
                        {
                            data: "DateOfJoining",
                            render: function (data, type, row, meta) {
                                return row.dateOfJoining
                            }
                        },
                        {
                            data: "Mobilephone",
                            render: function (data, type, row, meta) {
                                return row.mobilephone
                            }
                        },
                        {
                            data: "Userid",
                            render: function (data, type, row, meta) {
                                return '<a onclick="ApplyStaffLeavePageDiv_CalingFunction.call(this,event,' + row.userid + ')" style="color:blue;cursor:pointer;font-weight:600" class="Undeline">Apply Leave</a>';
                            }
                        },
                    ]
                }
                else if (tablename == "TblLeaveRequested_SearchRecords") {
                    columns = [
                        {
                            data: "Name",
                            render: function (data, type, row, meta) {
                                return row.name
                            }
                        },
                        {
                            data: "ClassificationName",
                            render: function (data, type, row, meta) {
                                return row.classificationName
                            }
                        },
                        {
                            data: "SubClassificationName",
                            render: function (data, type, row, meta) {
                                return row.subClassificationName
                            }
                        },
                        {
                            data: "LeaveType",
                            render: function (data, type, row, meta) {
                                return row.leaveType
                            }
                        },
                        {
                            data: "Reason",
                            render: function (data, type, row, meta) {
                                return row.reason
                            }
                        },
                        {
                            data: "FromdateString",
                            render: function (data, type, row, meta) {
                                return row.fromdateString
                            }
                        },
                        {
                            data: "TodateString",
                            render: function (data, type, row, meta) {
                                return row.todateString
                            }
                        }, {
                            data: "NoOfDays",
                            render: function (data, type, row, meta) {
                                return row.noOfDays
                            }
                        },
                        {
                            data: "RequestedDate",
                            render: function (data, type, row, meta) {
                                return row.requestedDate
                            }
                        }, {
                            data: "ApprovedDate",
                            render: function (data, type, row, meta) {
                                return row.approvedDate
                            }
                        }, {
                            data: "ApprovalStatus",
                            render: function (data, type, row, meta) {
                                return row.approvalStatus
                            }
                        },

                    ]
                }
                else if (tablename == "TblExamListData") {
                    columns = [
                        {
                            data: "ExamName",
                            render: function (data, type, row, meta) {
                                return '<a id="TBLExamid" class="Undeline" onclick="EditValuesGettingFunction(' + row.id + ')" style="cursor: pointer;font-weight: bold;color:black">' + row.examName+'</a>';
                            }
                        },  {
                            data: "Displayorder",
                            visible: false,
                            render: function (data, type, row, meta) {
                                return row.displayorder
                            }
                        },  {
                            data: "AcademicYearId",
                            visible: false,
                            render: function (data, type, row, meta) {
                                return row.academicYearId
                            }
                        },
                        {
                            data: "ExaternalExam",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                return row.exaternalExam
                            }
                        },
                        {
                            data: "Id",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                var Value = '<a class="fa fa-trash" title="Delete" onclick="DeleteExamsById(' + row.id+')"  style="font-size: 15px!important; color: red; cursor: pointer; "></a>';
                                return Value
                            }
                        }
                    ]
                }
                else if (tablename == "TblSubjectListData") {
                    columns = [
                        {
                            data: "Name",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                               return '<a style="cursor:pointer" class="Undeline" id="UserName" onclick="EditValuesGettingFunction(this.text)">'+row.name+' </a>';
                            
                            }
                        }
                    ]
                }
                else if (tablename == "TblBulkUploadSubjectsList") {//BulkUploadSubjects
                    columns = [
                        {
                            target: 1,// Assuming this is the column index where you want to display numbering
                            render: function (data, type, row, meta) {
                               return (meta.row + 1)
                            }
                        },
                        {
                            data: "SubjectName",
                            render: function (data, type, row, meta) {
                                return '<a id="TBLSubjectid" class="Undeline" onclick="EditValuesGettingFunction(' + row.instanceSubjectId + ')" style="cursor: pointer;font-weight: bold;color:black">' + row.subjectName + '</a>';
                            }
                        }, {
                            data: "SubjectCode",                         
                            render: function (data, type, row, meta) {
                                return row.subjectCode
                            }
                        }, {
                            data: "DepartmentName",          
                            render: function (data, type, row, meta) {
                                return row.departmentName
                            }
                        },
                        {
                            data: "ClassName",
                           
                            render: function (data, type, row, meta) {
                                return row.className
                            }
                        },
                        {
                            data: "SubjectTypeName",
                            render: function (data, type, row, meta) {
                                return row.subjectTypeName
                            }
                        },
                        {
                            data: "IncludeInTotalString",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                return row.includeInTotalString
                            }
                        },
                          {
                            data: "SubjectTypeName",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                var Value = '<a class="fa fa-trash" title="Delete" onclick="DeleteExamsById(' + row.instanceSubjectId + ')"  style="font-size: 15px!important; color: red; cursor: pointer; "></a>';
                                return Value
                            }
                        }
                    ]
                }
                else if (tablename == "TblUser") {//ManageSubjectAssociation Screen
                    columns = [
                        {
                            target: 1,// Assuming this is the column index where you want to display numbering
                            render: function (data, type, row, meta) {
                                return (meta.row + 1)
                            }
                        },
                        {
                            data: "UserId",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                var isChecked = row.subjectAssociationId !== "";
                                var isAssociated = row.name !== null;

                               // var AssociatedCheck = row.name;
                                                                debugger;
                              //  return '<input id="chkSMS" type="checkbox"    ' + (isChecked1 ? ' class="Associated'+ row.instanceSubjectId+'"' : '') + '  value="' + row.userId + '" ' + (isChecked ? ' checked="checked" name="selectedUsers"' : '') + '>';
                                return '<input id="chkSMS" type="checkbox" style="height:13px !important"   ' + (isAssociated ? ' class="'+ row.instanceSubjectId+'"' : '') + '  value="' + row.userId + '" ' + (isChecked ? ' checked="checked" name="selectedUsers"' : '') + '>';
                                //return row.userId
                            }
                        }, {
                            data: "InstanceUserCode",
                            render: function (data, type, row, meta) {
                                return row.instanceUserCode
                            }
                        }, {
                            data: "FirstName",
                            render: function (data, type, row, meta) {
                                return row.firstName
                            }
                        },
                        {
                            data: "LastName",
                            render: function (data, type, row, meta) {
                                return row.lastName
                            }
                        },
                    ]
                }
                else if (tablename == "TblExamSubjects") {//Post Results(Step2) Screen
                    columns = [
                        {
                            target: 1,// Assuming this is the column index where you want to display numbering
                            render: function (data, type, row, meta) {
                                return (meta.row + 1)
                            }
                        }, 
                        {
                            data: "SubjectsName",
                            render: function (data, type, row, meta) {
                                return '' + row.subjectsName + '<input type="hidden" value="' + row.actualDateConducted + '" id=ActualDateConducted><input type="hidden" value="' + row.subjectId + '" id=SubjectId><input type="hidden" value="' + row.examSubjectId + '" id=ExamSubjectId>'
                               // return row.subjectsName
                            }
                        }, {
                            data: "IncludeInTotal",
                            render: function (data, type, row, meta) {
                                return row.includeInTotal == "True" || row.includeInTotal == "1" ? "Yes" : "No";
                            }
                        },  {
                            data: "DateConducted",
                            render: function (data, type, row, meta) {
                              //  var date = row.dateConducted;
                               // var setteddate = date.split("T")[0];
                                var dateObject = formatDate(row.dateConducted);
                                //var dateObject = new Date(row.dateConducted);
                                return '<input type="date" class="" id="TxtDate"  title="Conducted Date"  value="' + dateObject + '">';
                         }
                        },
                        {
                            data: "PassMarks",
                            render: function (data, type, row, meta) {
                                return '<input type="text" class="" id="TxtPassMarks" maxlength="5" title="Pass Marks" oninput="restrictCharacters_AllowDots(this)" value="' + row.passMarks +'">';
                            }
                        }, {
                            data: "MaxMarks",
                            render: function (data, type, row, meta) {
                                return '<input type="text" class="" id="TxtMaxMarks" maxlength="5" title="Max Marks" oninput="restrictCharacters_AllowDots(this,".")" value="' + row.maxMarks +'">';
                            }
                        },
                    ]
                }

                else {
                    //tablename == "TblLeavesSummery"
                    columns = [
                        {
                            data: "Username",
                            render: function (data, type, row, meta) {
                                return row.username
                            }
                        },
                        {
                            data: "ClassificationName",
                            render: function (data, type, row, meta) {
                                return row.classificationName
                            }
                        },
                        {
                            data: "Leavetype",
                            render: function (data, type, row, meta) {
                                return row.leavetype
                            }
                        },
                        {
                            data: "TotalLeaves",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                return row.totalLeaves
                            }
                        },
                        {
                            data: "Total",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                return row.total
                            }
                        },
                        {
                            data: "DaysUsed",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                return row.daysUsed
                            }
                        },
                        {
                            data: "ApprovedNotUsedLeaves",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                return row.approvedNotUsedLeaves
                            }
                        },
                        {
                            data: "LeavesAwaitingApprovalLeaves",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                return row.leavesAwaitingApprovalLeaves
                            }
                        },
                        {
                            data: "AvailableLeaves",
                            className: "CenterAlign",
                            render: function (data, type, row, meta) {
                                return row.availableLeaves
                            }
                        },
                    ]
                }
                    var Newtable = js("#" + tablename).DataTable({
                      //  dom: 'Bfrtip',
                        dom: 'Bfrtip',
                        buttons: [
                            //{
                            //    extend: 'pdfHtml5',
                            //    exportOptions: {
                            //        columns: [1, 2, 3]
                            //    },
                            //}
                            //,
                            {
                                extend: 'excel',
                                title: ExelTitlename,
                                text:"Export to Excel",
                                exportOptions: {
                                    columns: ExcelDownloadColumnsNo
                                },
                                customize: function (xlsx) {
                                    var sheet = xlsx.xl.worksheets['sheet1.xml'];

                                    //// Center-align the title in the worksheet
                                    //var titleCell = $(sheet).find('c[r^="A1"]');
                                    //titleCell.attr('s', '2'); // Apply a style to center-align
                                    $('c[r*="A1"]', sheet).attr('s', '2');

                                    // Apply a border to the entire table
                                    var rows = $(sheet).find('row');
                                    rows.each(function () {
                                        $(this).find('c').attr('s', '25'); // Apply a style with a border (s=25) to each cell
                                    });
                                },
                            },
                             {
                                 extend: 'print',
                                // title: ExelTitlename,
                                 title: 'Leave Approval Report',
                                 //customize: function (win) {
                                    
                                 //    $(win.document.body).find('h1').addClass('print-title-center'); // Add a CSS class to the title element

                                 //    $(win.document.body)
                                 //        .find('thead th')
                                 //        .css('color', 'black'); // Set your desired text color
                                 //    $(win.document.body)
                                 //        .find('.top')
                                 //        .css('font-size', '12px');
                                 //},
                               //  messageTop: 'YOUR SEARCH RESULTED ' + tableLength + ' RECORD(S).',



                                 messageTop: function () {
                                     // Generate the timestamp
                                     var now = new Date();
                                     var formattedTime = now.toLocaleDateString(); // You can format the time as needed

                                     return 'YOUR SEARCH RESULTED ' + tableLength + ' RECORD(S).<div class="timestamp"> Printed on  ' + formattedTime + '</div>';
                                 },
                                 customize: function (win) {
                                     // Apply custom styles for print
                                     var timestampElement = $(win.document.body).find('.timestamp');
                                     timestampElement.css({
                                         'position': 'absolute',
                                         'top': '0',
                                         'right': '0',
                                         'font-size': '12px' // Adjust the font size as needed
                                     });

                                     $(win.document.body).find('h1').addClass('print-title-center'); // Add a CSS class to the title element

                                     $(win.document.body)
                                         .find('thead th')
                                         .css('color', 'black'); // Set your desired text color
                                     $(win.document.body)
                                         .find('.top')
                                         .css('font-size', '12px');


                                     // Apply black borders to all table cells
                                     $(win.document.body).find('table').css({
                                         'border-collapse': 'collapse',
                                         'border': '1px solid black' // Set the border color to black
                                     });

                                     // Apply black border to table header cells (th)
                                     $(win.document.body).find('th').css({
                                         'border': '1px solid black' // Set the border color to black
                                     });
                                     $(win.document.body).find('td').css({
                                         'border': '1px solid black' // Set the border color to black
                                     });
                                 },
                               // text: "Print",
                                 exportOptions: {
                                     columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                },
                            }
                        ],
                        //"columnDefs": [{
                        //    "targets": 'nosort',
                        //    "orderable": false
                        //}],
                        bInfo: false,
                        bProcessing: false,
                        bLengthChange: false,
                        bfilter: false,
                        bSort: true,
                        searching: false,
                        aaSorting: [],
                        paging: paging,
                        bPaginate: false,
                        data: response,
                        columns: columns,
                        //rowGroup: {
                        //    dataSrc: 0, // Use the first column (0-based index) for grouping
                        //}
                      //  rowsGroup: [1]
                        //  rowsGroup: [// Always the array (!) of the column-selectors in specified order to which rows groupping is applied
                        //    // (column-selector could be any of specified in https://datatables.net/reference/type/column-selector)
                        //    'FirstName:name',
                        //    1,

                        //],
                    });
                    Newtable.page(currentPage).draw('page');
                    //$("#exportExcelButton").click(function () {
                    //    debugger;
                    //    Newtable.button('0').trigger();
                    //});

                if (tableLength < 1) {
                   // $("#" + tablename).empty();
                    $("#" + tablename).hide();
                    $(".dataTables_paginate").hide();
                    $(".dt-buttons").hide();
                }
                else {
                    $("#" + tablename).show();
                    //$(".dataTables_paginate").hide();
                    if (tableLength < 11) {
                        $(".dataTables_paginate").hide();
                    } else {
                        $(".dataTables_paginate").show();
                    }              
                }
                $("#" + DivId_Toshow).show();
              //  $("#TblLeavesSearchedResultPage_Div").show();
                $("#loadingOverlay").hide();
            },
            error: function () {
                $("#loadingOverlay").hide();
                $("#Main_Span_Error").text("Something Error");
            }
        });
        //$('#TblcompensatoryLeaves_SearchedRecords').on('click', '#UserName', function () {
        //    // Get the hidden field value from the data-row-id attribute
        //    debugger;
        //    var leavetypeid = $(this).data('row-id');

        //});
    } catch (error) {
        $("#Main_Span_Error").text("Something Error");
        $("#loadingOverlay").hide();
    }
}
//------------------------------------this is for formatted date from string to date

//----converting to anytype to date
function formatDate(inputDate) {
    var dateParts = inputDate.split("/");
    // Rearrange the date parts to the "YYYY-MM-DD" format
    var formattedDate = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
    return formattedDate;
}

//-----compare date not greater than today
function compareDatesNotGreaterThanToday(conductedDate) {
    var today = new Date(); // Get today's date
    var selectedDate = new Date(conductedDate); // Convert conductedDate to Date object
    // Compare the dates
    if (selectedDate > today)
    {
        // Conducted date is greater than today's date
        return false;
    } else {
        // Conducted date is not greater than today's date
        return true;
    }
}

//------------Printing
function CallPrint(tableid) {
    try {
        debugger;
        var printContent = document.getElementById(tableid);
        var windowUrl = 'about:blank';
        var uniqueName = new Date();

        var printWindow = window.open(windowUrl, uniqueName);
        printWindow.document.open();
        var currentDate = new Date();
        var formattedDate = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();

        printWindow.document.write('<div class="print-date" style="text-align:end">Printed on: ' + formattedDate + '</div>');
        printWindow.document.write('<html><head><title>Print</title></head><body>');
        if ("printDetails_Form" != tableid) {
            printWindow.document.write('<style>table {border-collapse: collapse; width: 100%;} th, td {border: 1px solid black; padding: 8px; text-align: left;}</style>');
        }
            printWindow.document.write(printContent.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();

         printWindow.close();
    } catch (e) {
        $("#Main_Span_Error").text("Something Error");
        $("#loadingOverlay").hide();
    }
}


//------New changes are applied
//-------------View changing activities
function _ViewChangeActivities(event,TableName, SourceId, AuditKey,Url) {
    try {
        debugger;
        event.preventDefault();
        $(".ErrorMessageSpan").empty();
        //OpenIFrameModel("../Admin/ViewUserCompOffLeavesLapsedDetails.aspx?InstanceId=" + InstanceId + "&UserID=" + UserID + "&AcademicYearID=" + AcademicYearID + "&Lapsed=" + Lapsed, 700, 250)
        //return false;

        if (Url == '') {
            Url = "/Attendance/_ViewChangeActivities?SourceId=" + SourceId + "&AuditKey=" + AuditKey + "&TableName=" + TableName;
        }
        debugger;
        $.ajax({
            url: Url,
            type: "GET",
            success: function (response) {
                var screenWidth = screen.availWidth;
                var windowWidth = 700; // Adjust the width of the window as needed
                var windowLeft = screenWidth - windowWidth;
                var newWindow = window.open("", "_blank", "width=" + windowWidth + ",left=" + windowLeft);
                // Write the HTML content to the new window
               // newWindow.document.open();
                newWindow.document.write(response);
               // newWindow.document.close();
            },
            error: function () {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    }
    catch (e) {
        $("#Main_Span_Error").text("Something Error");
        $("#loadingOverlay").hide();
    }
}


//-------------------------------this is for restrict the Characters
//oninput="restrictCharacters(this)";
function restrictCharacters(element) {
    debugger;element.value = element.value.replace(/[^0-9]/g, '');
}

function restrictCharacters_AllowDots(element) {
    debugger;element.value = element.value.replace(/[^\d.]|(\..*)\./g, '$1');
}

function restrictCharacters_AllowDotsAndHyphen(element) {
    debugger;element.value = element.value.replace(/[^0-9-]|(?<=\..*)\./g, '');
}



function CommonClearFunction(Formid) {
    document.getElementById(Formid).reset(); // Reset the form   
}



function CommonDeleteFunction(type, URL, Deletemsg, successCallback) {//I used this in manage Exams Screen
  
    debugger;
    $("#ErrorMessageSpan").empty();
    Swal.fire({
        title: "Are you sure?",
        text: ("You want to delete the " + Deletemsg + " !"),
        //type: "warning", -  doesn't exist
        showCancelButton: true,
        showCloseButton: true, // optional
        showConfirmButton: true, // optional
        confirmButtonColor: '#d33',
        confirmButtonText: "Yes",
        icon: "warning",
        //closeOnConfirm: false -  doesn't exist
    })
        .then(function (isConfirm) {
            if (isConfirm.isConfirmed) {
                $("#loadingOverlay").show();
                $.ajax({
                    //  url: "/Attendance/ManageCompansatoryLeaves?ButtonName=Delete&CompOffLeaveID=" + CompOffLeaveID,
                    //  type: "Post",
                    url: URL,
                    type: type,
                    success: function (responce) {
                        if (responce.message == "Record deleted successfully.") {
                            //TblDataTableWithColumns_CallingFunction(event, 'noStop', '/Attendance/TblCompensatoryLeavesDetails_CallingFunction', 'TblcompensatoryLeaves_SearchedRecords', 'counts', 'FmCOMPENSATORYLEAVESSEARCH');
                            //Swal.fire({
                            //    icon: "success",
                            //    title: "Deleted!",
                            //    text: (responce.message),
                            //});

                            successCallback(responce);
                            //$("#Main_Span_Error").text(responce.message);
                        }
                        else {
                            Swal.fire({
                                icon: "error",
                                title: "Failed!",
                                text: (responce.message),
                            });
                            // $("#Main_Span_Error").text(responce.message);
                        }
                       // $("#loadingOverlay").hide();
                    },
                    error: function (xhr, status, error) {
                        $("#loadingOverlay").hide();
                        $("#Main_Span_Error").text("Something Error");
                    }
                });
            }
            else {
                return; //close popup
            }
        });
  
}

//CommonMethod to ALL
function performCrudOperationCommonFunction(type, Url, Data, successCallback, errorCallback, hasFileUpload) {
   // try {
        debugger;
        $(".ErrorMessageSpan").empty();
        //var formdata = new FormData($("#" + FormId)[0]);

        var ajaxOptions = {
            url: Url,
            method: type,
            data: Data,
            success: function (response) {
                successCallback(response)
            },
            error: function (xhr, status, error) {
                
                errorCallback(xhr.status, error);
            }
        };

        if (hasFileUpload) {
            // Handling file uploads with FormData
            //var formData = new FormData();
            //for (var key in data) {
            //    if (data.hasOwnProperty(key)) {
            //        formData.append(key, data[key]);
            //    }
            //}

            //  ajaxOptions.data = formData;
            ajaxOptions.processData = false;
            ajaxOptions.contentType = false;
        }
        else {
            // Regular data serialization for non-file-upload requests
            //ajaxOptions.dataType = 'json';
            //ajaxOptions.contentType = 'application/json';
            // ajaxOptions.data = data;
        }

        $.ajax(ajaxOptions);

        //$.ajax({
        //    url: Url,
        //    type: type,
        //    //  dataType: 'json',
        //    data: Data,
        //    contentType: false,
        //    processData: false,
        //    success: function (response) {
        //        successCallback(response);
        //    },
        //    error: function (status, error) {
        //        errorCallback(response);
        //        $("#Main_Span_Error").text("Something Error");
        //    }
        //});
    //} catch (e) {
    //    $("#Main_Span_Error").text("Something Error");
    //    $("#loadingOverlay").hide();
    //}
}

//-------------------------------------------------common Dropdopdown
function CommonDropdownFunction(Method, Url, EffectingDropdownid, FirstSelectText, Isdisbled, FormId) {
  
        $("#ErrorMessageSpan").empty();
        //var InstanceClassificationId = $("#DdlDepartment").val();
        //var InstanceSubClassificationId = $("#DdlClass").val();
        //if (InstanceClassificationId == "" || InstanceSubClassificationId == "") {
        //    $("#" + EffectingDropdownid).empty();
        //    $("#" + EffectingDropdownid).append('<option value="" >' + FirstSelectText + '</option>');
        //    return;
        //}
        if (FormId != "") {
            var form = new FormData($("#" + FormId)[0]);
        } else {
            var form = null;
        }
     
       // var Data = { InstanceClassificationId: InstanceClassificationId, InstanceSubClassificationId: InstanceSubClassificationId}
        debugger;
        $.ajax({
            url: Url,
            type: Method,
            data: form,
            contentType: false,
            processData:false,           
            success: function (responce) {
                // $("#AppliedEmployeesNames_Id").empty();
                $("#" + EffectingDropdownid).empty();
                $("#" + EffectingDropdownid).append('<option value="" >' + FirstSelectText + '</option>');
                $.each(responce, function (i, Value2) {
                    $("#" + EffectingDropdownid).append('<option value="' + Value2.value + '" >' + Value2.text + '</option>')
                });
                if (Isdisbled == true) {
                    if (responce.length <= 0) {
                        $("#" + EffectingDropdownid).prop('disabled', true);
                    } else {
                        $("#" + EffectingDropdownid).prop('disabled', false);
                    }
                }
            },
            error: function (xhr, status, error) {
                $("#Main_Span_Error").text("Something Error");
            }
        });
    
};


//New
//-------This for add same value in Textboxes by selecting checkbox
function UpdateAllTextboxvaluesByChecked(checkbox, FirstTextBoxId, EffectiveTxtClass) {
    debugger;
    const AllTextboxes = document.querySelectorAll('.' + EffectiveTxtClass);
    const FirstTxtValue = document.getElementById(FirstTextBoxId).value;
    //const FirstTxtValue = document.getElementById(FirstTextBoxId).value;
    if (checkbox.checked) {
        AllTextboxes.forEach(textbox => {
            textbox.value = FirstTxtValue;
        });
    }
}






//-sr---------------------------------------------------------------------------------   Common Ajax Function To all
function CommonAjaxFunction(method, url, data, successCallback, errorCallback, hasFileUpload) {
    // debugger;
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        success: successCallback,
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };

    if (hasFileUpload) {
        // Handling file uploads with FormData
        //var formData = new FormData();
        //for (var key in data) {
        //    if (data.hasOwnProperty(key)) {
        //        formData.append(key, data[key]);
        //    }
        //}

        //  ajaxOptions.data = formData;
        ajaxOptions.processData = false;
        ajaxOptions.contentType = false;
    } else {
        // Regular data serialization for non-file-upload requests
        //ajaxOptions.dataType = 'json';
        //ajaxOptions.contentType = 'application/json';
        // ajaxOptions.data = data;
    }

    $.ajax(ajaxOptions);

}

//--sr------------------------------------------------ Common Delete Function 

function CommonDeleteFunction1(title, type, url, data, successcallback) {

    Swal.fire({
        title: "Are you sure you want to delete this " + title + "?",
        text: "  ",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        // If user confirms deletion
        if (result.isConfirmed) {
            $.ajax({

                url: url,
                data: data,
                type: type,
                success: successcallback

            })
        }
    })
}