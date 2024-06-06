function CallToAjax(method, url, data,successCallback, errorCallback) {
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

$(document).ready(function () {
    debugger;
    Bindddls();
});
function Bindddls() {
    $.ajax({
        url: '/FeeSection/Bindfeestatusddl',
        type: 'GET',
        success: function (response) {
            debugger;
            var Roleddlid = $('#Roleddl');
            var Departmentddlid = $('#Classificationddl');
            var Academicyearddlid = $('#Acadamicyearddl');
            var Studentquotaddlid = $('#Studentquotaddl');

            Roleddlid.empty();
            Departmentddlid.empty();
            Academicyearddlid.empty();
            Studentquotaddlid.empty();

            Roleddlid.append($('<option>').val('').text('------Select------'));
            response.roleList.sort(function (a, b) {
                var textA = a.text.toUpperCase();
                var textB = b.text.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            response.roleList.forEach(function (item) {
                Roleddlid.append($('<option>').val(item.value).text(item.text));
            });

            Departmentddlid.append($('<option>').val('').text('------Select------'));
            response.classificationList.sort(function (a, b) {
                var textA = a.text.toUpperCase();
                var textB = b.text.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            response.classificationList.forEach(function (item) {
                Departmentddlid.append($('<option>').val(item.value).text(item.text));
            });

            Academicyearddlid.append($('<option>').val('').text('Select Academic Year'));
            response.academicYearList.sort(function (a, b) {
                var textA = a.text.toUpperCase();
                var textB = b.text.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            response.academicYearList.forEach(function (item) {
                Academicyearddlid.append($('<option>').val(item.value).text(item.text));
            });

            Studentquotaddlid.append($('<option>').val('').text('------Select------'));
            response.studentQuotaList.sort(function (a, b) {
                var textA = a.text.toUpperCase();
                var textB = b.text.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
            response.studentQuotaList.forEach(function (item) {
                Studentquotaddlid.append($('<option>').val(item.value).text(item.text));
            });
        },
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}
$('#Feetermsddl').on("change", function () {
    debugger;

    var AcadamicSelectedvalue = $('#Acadamicyearddl').val();
    var TermSelectedvalue = $('#Feetermsddl').val();
    //var data = { Acadamicyear: AcadamicSelectedvalue, Feeterm: TermSelectedvalue};
    $.ajax({
        url: '/FeeSection/Feetermbyfeetypes?Academicyearid=' + AcadamicSelectedvalue + "&Feetermid=" + TermSelectedvalue,
        //data:data,
        type: 'GET',
        success: function (response) {
            const ul = $("#Feetypesddl");
            ul.empty();
            $.each(response, function (index, item) {
                const li = $("<li>");
                const checkbox = $("<input>").attr({
                    type: "checkbox",
                    value: item.value,
                    id: `feeTypeCheckbox_${item.value}`
                }).addClass("form-check-input Feetypechk");
                const label = $("<label>").attr("for", `feeTypeCheckbox_${item.value}`).text(item.text);

                li.append(checkbox, label);
                ul.append(li);
            });

            //var Feetypesddl = $('#Feetypesddl');
            //Feetypesddl.empty();
            //Feetypesddl.append($('<option>').val('').text('------Select------'));
            //response.sort(function (a, b) {
            //    var textA = a.text.toUpperCase();
            //    var textB = b.text.toUpperCase();
            //    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            //});
            //response.forEach(function (item) {
            //    Feetypesddl.append($('<option>').val(item.value).text(item.text));
            //});
        },
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
});
function validatePriceInput() {
    var inputField = document.getElementById('Pricetxtid');
    var inputValue = inputField.value;

    // Remove any character that is not a digit
    var cleanedValue = inputValue.replace(/[^\d]/g, '');

    // If the cleaned value is different from the input value, clear the input field
    if (cleanedValue !== inputValue) {
        inputField.value = cleanedValue;
    }
}
function previouspages(url, data) {
    return new Promise((resolve, reject) => {
        /* debugger;*/
        loaddingimg.css('display', 'block');
        handleAjax('GET', `/FeeSection/${url}`, data, (response) => {
            window.location.href = `/FeeSection/${url}`;
            loaddingimg.css('display', 'none');
            resolve();
        }, (status, error) => {
            loaddingimg.css('display', 'none');
            reject();
        }, false);
    });
}

function submitForm(Buttonvalue) {
    $('#PartialContainer').empty();

    setTimeout(function () {
        $('#Commonerrormessage').text('');
        var validationMessages = $('.field-validation-error');
        var validationMessages2 = $('.error2');
        var validationMessagesLength = validationMessages.length;

        if (validationMessagesLength === 0 && validationMessages2.length === 0) {
            loaddingimg.css('display', 'block');
            debugger;

            var Roleddl = $('#Roleddl').val();
            var Classificationddl = $('#Classificationddl').val();
            var Subclassddlid = $('#Subclassddlid').val();
            var Studentquotaddl = $('#Studentquotaddl').val();
            var Acadamicyearddl = $('#Acadamicyearddl').val();
            var Feetermsddl = $('#Feetermsddl').val();
            let Feetypesddlids = Array.from(document.querySelectorAll("#Feetypesddl input[type=checkbox]:checked"), checkbox => checkbox.value);
            var Amounttypeddl = $('#Amounttypeddl').val();
            var Operatorddl = $('#Operatorddl').val();
            var Pricetxtid = $('#Pricetxtid').val();
            var Actionbuttonname = Buttonvalue;

            if (!(Amounttypeddl && Operatorddl && Pricetxtid)) {
                Amounttypeddl = 1;
                Operatorddl = 1;
                Pricetxtid = 1;
            }
            debugger;
            var formData = {
                RoleId: Roleddl,
                ClassificationId: Classificationddl,
                SubclassificationId: Subclassddlid,
                StudentQuotaId: Studentquotaddl,
                AcademicYearId: Acadamicyearddl,
                FeeTermId: Feetermsddl,
                FeeTypeId: Feetypesddlids,
                Amounttype: Amounttypeddl,
                Operator: Operatorddl,
                Price: Pricetxtid,
                Actionbuttonvalue: Actionbuttonname,
            };
            //$.ajax({
            //    url: '/FeeSection/Bindfeestatustbl',
            //    data: formData,
            //    type: 'GET',
            //    success: function (response) {
            //        debugger;
            //        $('#PartialContainer').append(response);
            //        loaddingimg.css('display', 'none');
            //    },
            //    error: function (xhr, status, error) {
            //        $('#Commonerrormessage').text('Something weent wrong.....!!!');
            //        loaddingimg.css('display', 'none');
            //    }
            //});



            CallToAjax('POST', "/FeeSection/Bindfeestatustbl", formData,
                function (resp) {
                    debugger;
                    $('#PartialContainer').append(resp);
                    loaddingimg.css('display', 'none');
                },
                function (status, error) {
                    $('#Commonerrormessage').text('Something weent wrong.....!!!');
                    loaddingimg.css('display', 'none');
                },
            );
        }
    }, 50);
}

function lnkAddNew() {
    debugger;
    loaddingimg.css('display', 'block');
    $('#PartialContainer').empty();
    $('#Feetypesddl').empty();
    CallToAjax('GET', "/FeeSection/FeeStatus", null,
        function() {
            Bindddls();
            var form = document.getElementById('Searchform');
            if (form) {
                form.reset(); // Reset the form elements
                var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
                validationSpans.forEach(span => {
                    span.textContent = ''; // Clear validation messages
                });
                $('#Commonerrormessage').text('');
            }
            loaddingimg.css('display', 'none');
        },
        function (status, error) {
            loaddingimg.css('display', 'none');
        }
    );
}


// Select All functionality
$("#chkSelectAll").change(function () {
    const isChecked = $(this).is(":checked");
    $(".Feetypechk").prop("checked", isChecked);
});

 // Uncheck master checkbox if any individual checkbox is unchecked
$(document).on('change', '.Feetypechk', function () {
    if (!$(this).is(":checked")) {
        $("#chkSelectAll").prop("checked", false);
    }
    // Check master checkbox if all individual checkboxes are checked
    if ($(".Feetypechk:checked").length === $(".Feetypechk").length) {
        $("#chkSelectAll").prop("checked", true);
    }
});