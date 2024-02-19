function DataCallToAjax(method, url, data, successCallback, errorCallback) {
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


//=====DELETE ADDED USERS TABLE DATA IN DELETE USER
$('#PostNoticetblid_searchandadduserspostthisnotice_Table tbody').on('click', '.fa-trash-alt', function () {
    //exec stp_tblUser_SELUsersByUserIds @UserIds='28560'
    try {
        if (confirm('Are you sure you want to delete the User ?\n Click ' + 'OK' + ' to delete, else click ' + 'CANCEL' + 'to stop deleting.')) {

            var tbodyLength = $('#PostNoticetblid_searchandadduserspostthisnotice_Table tbody tr').length;
            debugger;
            var Row = $(this).closest('tr');
            var DeleteUserid = Row.find('td:nth-child(10) #Usersidtxt').val();
            var Userid = DeleteUserid;

            if (tbodyLength == 1) {

                debugger;
                //handle_searchuserstopostnotice_btnclick_tabledata();

                handle_searchuserstopostnotice_without_btnclick_tabledata("", "");
                $('#PostNoticeAddinguserstable_Div').empty();
            //    //var data = { Userids: Userid };

            ////    url: "/Admin/SELUsersByUserIds",
            ////        type: "POST",
            //        var data= {
            //            UserIds: Userid,
            //            Noofusers: "1",
            //};

            //    //DataCallToAjax('GET', '/Admin/Selecteduserdelete', data,
            //        DataCallToAjax('GET', '/Admin/SELUsersByUserIds', data,
            //        function (response) {
            //            Row.remove();
            //            $('#PostNoticeAddinguserstable_Div').empty();
            //            //$('#PostNoticeAddinguserstable_Div').html(response);
            //        },
            //        function (status, error) {
            //            // Handle errors here
            //            //$('#Home_SearchNoticesdiv').show();
            //            //$('#Home_SearchNotices_Updatediv').hide();
            //            loaddingimg.css('display', 'none');
            //        }
            //    );
                
            } else {
               
                
                var ExcludeUserIds = "";
                var rowId = "20";

                loaddingimg.css('display', 'block');
                Alluserspostnotice(Userid, rowId, ExcludeUserIds);
                loaddingimg.css('display', 'none');
            }

        }

    }
    catch (e) {
        loaddingimg.css('display', 'none');
    }
});



