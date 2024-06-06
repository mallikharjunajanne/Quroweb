function handleAjax(method, url, data, successCallback, errorCallback) {
    var ajaxOptions = {
        url: url,
        method: method,
        data: data,
        processData: false, // Important when sending FormData
        contentType: false, // Important when sending FormData
        success: function (response) {
            successCallback(response);
        },
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    };
    $.ajax(ajaxOptions);
}
function CallToAjax(method, url, data, successCallback, errorCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
        success: function (response) {
            successCallback(response);
        },
        error: function (xhr, status, error) {
            errorCallback(xhr.status, error);
        }
    });
}
function fetchDataAndPopulateDropdown(url, dropdownSelector, valueField, textField, Responsevalues) {
    /*debugger;*/
    CallToAjax('GET', url, null,
        function (response) {

            /*debugger;*/
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
    /*debugger;*/
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


$(document).ready(function () {
    /*debugger;*/
    Bindroleddl();
    BindDepartmentddl();
    BindReferralddl();
    BindAcademicyearddl();
   
});

function Bindroleddl() {
    fetchDataAndPopulateDropdown(                           //==== << ** Role Dropdown ** >>
        '/FeeSection/RoleddlBind',                       // URL for data fetching
        '#ddlRole',                                         // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        ' '                                                 // Response value return class name
    );
}

function BindDepartmentddl() {
    fetchDataAndPopulateDropdown(                           //==== << ** Department Dropdown ** >>
        '/FeeSection/DepartmentddlBind',                 // URL for data fetching
        '#ddlInstanceClassification',                       // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        ' '                                                 // Response value return class name
    );
}

function BindReferralddl() {
    fetchDataAndPopulateDropdown(                           //==== << ** Department Dropdown ** >>
        '/FeeSection/ReferralddlBind',                   // URL for data fetching
        '#ddlStudentQuota',                                 // Dropdown selector
        'value',                                            // Field name for option text
        'text',                                             // Field name for option values
        ' '                                                 // Response value return class name
    );
}

function BindAcademicyearddl() {
    fetchDataAndPopulateDropdown(                                //==== << ** Department Dropdown ** >>
        '/FeeSection/AcademicyearddlBind',                   // URL for data fetching
        '#ddlYears',                                            // Dropdown selector
        'value',                                                // Field name for option text
        'text',                                                 // Field name for option values
        ' '                                                     // Response value return class name
    );
}

$('#ddlTerms').on('change', function () {
    /*debugger;*/
    Termsonchangefeetypeddl();
});
$('#ddlInstanceSubClassification').on('change', function () {
    /*debugger;*/
    SubclassonchangeUsersddl();
});

function Disocuntchkfun() {
    /*debugger;*/
    var checkboxListFeeType_Container = document.getElementById("checkboxListFeeType_Container");
    var FeeType_checkboxListFeeType = document.getElementById("FeeType_checkboxListFeeType");
    var checkboxItems = FeeType_checkboxListFeeType.querySelectorAll("li input[type='checkbox']");

    var feeTypeidSelect = document.getElementById("ddlFeeTypes");
    var checkbox = document.querySelector(".form-group input[type='checkbox']");
    var label = document.getElementById("FeetypeLbl_ID");

    label.classList.remove("label-modified");
    label.classList.add("label-normal");

    if (checkbox.checked) {
        /*debugger;*/
        Termsonchangefeetypeddl();
        checkboxListFeeType_Container.style.display = "none";
        feeTypeidSelect.style.display = "block";
        label.classList.remove("label-modified");
        label.classList.add("label-normal");
        for (var i = 0; i < checkboxItems.length; i++) {
            checkboxItems[i].checked = false;
        }
    } else {
        //debugger;
        Termsonchangefeetypeddl();
        checkboxListFeeType_Container.style.display = "block";
        feeTypeidSelect.style.display = "none";
        label.classList.remove("label-normal");
        label.classList.add("label-modified");
        //debugger;
        document.getElementById("selectAllFeeTypes").checked = false;
    }
}

function Termsonchangefeetypeddl() {

    var Academicyear = $('#ddlYears').val();
    var Terms = $('#ddlTerms').val();
    //debugger;

    fetch(`/FeeSection/FeetypeddlBind?AcademicYearId=${Academicyear}&FeeTermId=${Terms}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Request failed with status " + response.status);
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data  => {
            //debugger;
            const data1 = data.slice(); // Create a copy of the data array
            const data2 = data.slice(); // Create another copy of the data array

            data1.sort((a, b) => a.text.localeCompare(b.text));
            data2.sort((a, b) => a.text.localeCompare(b.text));

            const dropdown = document.getElementById("ddlFeeTypes");
            const FeeType_checkboxListFeeType = document.getElementById("FeeType_checkboxListFeeType");
            dropdown.innerHTML = "";

            // Create the default option
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "---------Select-----------";
            dropdown.appendChild(defaultOption);

            // Populate dropdown with options
            data1.forEach(item => {
                const option = document.createElement("option");
                option.value = item.value;
                option.textContent = item.text;
                dropdown.appendChild(option);
            });

            // Populate checkbox list
            FeeType_checkboxListFeeType.innerHTML = '';
            data2.forEach(item => {
                const listItem = document.createElement("li");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.id = item.value;
                checkbox.value = item.value;
                checkbox.classList.add("form-check-input");

                const label = document.createElement("label");
                label.htmlFor = item.value;
                label.textContent = item.text;
                listItem.appendChild(checkbox);
                listItem.appendChild(label);
                FeeType_checkboxListFeeType.appendChild(listItem);
            });

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function SubclassonchangeUsersddl() {
    var ddlInstanceClassification = $('#ddlInstanceClassification').val();
    var ddlInstanceSubClassification = $('#ddlInstanceSubClassification').val();
    var ddlRole = $('#ddlRole').val();

    var data = {
        InstanceClassificationId: ddlInstanceClassification,
        InstanceSubClassificationId: ddlInstanceSubClassification,
        RoleId: ddlRole,
    };
    //debugger;
    fetch(`/FeeSection/UsersddlBind?InstanceClassificationId=${ddlInstanceClassification}&InstanceSubClassificationId=${ddlInstanceSubClassification}&RoleId=${ddlRole}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Request failed with status " + response.status);
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            data.sort((a, b) => a.firstName.localeCompare(b.firstName));

            const Users_checkboxList = document.getElementById("Users_checkboxList");
            Users_checkboxList.innerHTML = '';

            data.forEach(item => {
                const listItem = document.createElement("li");

                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = item.userId;
                checkbox.id = item.collegeHostel;
                checkbox.name = item.gender;
                checkbox.classList.add("form-check-input");

                const label = document.createElement("label");
                label.htmlFor = `checkbox_${item.userId}`;
                label.textContent = item.firstName;

                listItem.appendChild(checkbox);
                listItem.appendChild(label);

                Users_checkboxList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

$('#Gender').on("change", function () {
    //debugger;

    const selectedValue = $(this).val();
    const listItemContainer = $("#Users_checkboxList");

    listItemContainer.children().each(function () {
        const listItem = $(this);
        const genderValue = listItem.find("input").attr("name");
        const inputElement = listItem.find("input");

        if (selectedValue === genderValue) {
            listItem.css("display", "flex");
            inputElement.css("display", "block");
            listItem.find("label").css("display", "block");
        } else if (selectedValue === "0142") {
            SubclassonchangeUsersddl();
        } else {
            listItem.css("display", "none");
            inputElement.css("display", "none");
            listItem.find("label").css("display", "none");
            inputElement.prop("checked", false);
        }
    });
});


function Hostlers() {
    //debugger;
    //filterUsersByHostlerStatus(false);
    const checkbox = document.getElementById("checkbox1");
    const Users_checkboxList = document.getElementById("Users_checkboxList");

    if (checkbox.checked) {
        const collegeHostlersList = Users_checkboxList.querySelectorAll("li input[id='False']");
        Users_checkboxList.innerHTML = '';
        for (let i = 0; i < collegeHostlersList.length; i++) {
            const listItem = document.createElement("li");
            const checkbox = collegeHostlersList[i].cloneNode(true);
            const label = collegeHostlersList[i].parentNode.querySelector("label").cloneNode(true);
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            Users_checkboxList.appendChild(listItem);
        }
    } else {
        SubclassonchangeUsersddl(); // Reset to the original list
    }
}

function NonHostlers() {
    //debugger;
    //filterUsersByHostlerStatus(true);
    const checkbox = document.getElementById("checkbox2");
    const Users_checkboxList = document.getElementById("Users_checkboxList");

    if (checkbox.checked) {
        const collegeHostlersList = Users_checkboxList.querySelectorAll("li input[id='True']");
        Users_checkboxList.innerHTML = '';
        for (let i = 0; i < collegeHostlersList.length; i++) {
            const listItem = document.createElement("li");
            const checkbox = collegeHostlersList[i].cloneNode(true);
            const label = collegeHostlersList[i].parentNode.querySelector("label").cloneNode(true);
            listItem.appendChild(checkbox);
            listItem.appendChild(label);
            Users_checkboxList.appendChild(listItem);
        }
    } else {
        SubclassonchangeUsersddl(); // Reset to the original list
    }
}

function PayfeeforusersGetform(event) {
    debugger;
    loaddingimg.css('display', 'block');
    event.preventDefault();
    event.preventDefault();
    event.stopPropagation();
    $('#Commonerrormessage').text('');
    $('#partialViewContainer').empty();

    setTimeout(function () {
        $('#Commonerrormessage').text('');

        if (ValidationForSetFeeUsers()) {
            debugger;

            loaddingimg.css('display', 'block');
            var checkboxes = document.querySelectorAll("#FeeType_checkboxListFeeType input[type='checkbox']");
            var FeeType_checkedValues = [];
            var FeeType_CheckedTextNames = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    FeeType_checkedValues.push(checkbox.value);
                    const labelText = checkbox.nextElementSibling.textContent.trim(); // Get the text content of the next sibling (label) and remove any extra whitespace
                    FeeType_CheckedTextNames.push(labelText);
                }
            });

            if (FeeType_CheckedTextNames.length <= 10) {

                var Users_checkboxes = document.querySelectorAll("#Users_checkboxList input[type='checkbox']");
                var Users_checkedValues = [];

                Users_checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        Users_checkedValues.push(checkbox.value);
                    }
                });

                if (Users_checkedValues.length <= 0) {
                    loaddingimg.css('display', 'none');
                    $('#partialViewContainer').empty();
                    $('#Commonerrormessage').text('Please Select Users.');
                    return false;
                }

                var formData = new FormData();
                var FeeTermId = $('#ddlTerms').val();
                var AcademicYearId = $('#ddlYears').val();
                var FeeTypeid = $('#ddlFeeTypes').val();
                var FeeTypeText = $('#ddlFeeTypes option:selected').text();
                var InstanceRoleId = $('#ddlRole').val();
                var InstanceSubClassificationId = $('#ddlInstanceSubClassification').val();
                var InstanceClassificationId = $('#ddlInstanceClassification').val();

                if (FeeType_checkedValues.length > 0) {
                    debugger;
                    formData.append('FeeTypeids', FeeType_checkedValues);
                    formData.append('FeeTypeCheckedFeetypeids', JSON.stringify(FeeType_checkedValues))
                }
                else {
                    debugger;
                    var discountCheckbox = document.getElementById("Discount_Checkbox_ID");
                    if (discountCheckbox.checked) {
                        //var Discount_CheckboxValue = "1432_Arjun"
                        formData.append('Discount_CheckBoxValue', "True");
                    }
                    if (FeeTypeid != "") {
                        FeeType_CheckedTextNames.push(FeeTypeText);
                        FeeType_checkedValues.push(FeeTypeid);
                        formData.append('FeeTypeids', FeeTypeid);
                        formData.append('FeeTypeCheckedFeetypeids', JSON.stringify(FeeType_checkedValues))
                    }
                    else {
                        $('#partialViewContainer').empty();
                        // $('#validation2').text('Following fields have invalid data:');
                        $('#Commonerrormessage').text('Please Select FeeType');
                        loaddingimg.css('display', 'none');
                        return false;
                    }

                }

                formData.append('UserIds', Users_checkedValues);
                formData.append('FeeTermId', FeeTermId);
                formData.append('AcademicYearId', AcademicYearId);
                formData.append('InstanceRoleId', InstanceRoleId);
                formData.append('InstanceSubClassificationId', InstanceSubClassificationId);
                formData.append('InstanceClassificationId', InstanceClassificationId);
                formData.append('FeeType_CheckedTextNames', JSON.stringify(FeeType_CheckedTextNames));
                debugger;
                //handleAjax('POST', "/FeeSection/Fee_Set_Users_GetFormBtn_click_TblDt", formData,
                handleAjax('POST', "/FeeSection/SetfeeforusersGettable", formData,
                    function (response) {
                        debugger;
                        console.log(response);
                        $('#partialViewContainer').empty();
                        $('#partialViewContainer').append(response);
                        loaddingimg.css('display', 'none');
                    },
                    function (status, error) {
                        loaddingimg.css('display', 'none');
                    },
                );
            }
            else {
                loaddingimg.css('display', 'none');
                $('#partialViewContainer').empty();
                $('#Commonerrormessage').text('Please select exactly 10 Fee Types.');
            }
        }
    }, 50);
    loaddingimg.css('display', 'none');
}

function ValidationForSetFeeUsers() {
    debugger;
    const fieldLabels = {
        'ddlRole': 'Role',
        'ddlInstanceClassification': 'Department',
        'ddlInstanceSubClassification': 'Class',
        'ddlYears': 'AcademicYear',
        'ddlTerms': 'FeeTerm'
    };
    const fields = ['ddlRole', 'ddlInstanceClassification', 'ddlInstanceSubClassification', 'ddlYears', 'ddlTerms'];
    const validationMessages = fields.filter(field => !$('#' + field).val()).map(field => `${fieldLabels[field]} <br>`);

    if (validationMessages.length > 0) {
        $('#Commonerrormessage').html("Following fields have invalid data: <br>");
        $("#Commonerrormessage1").html(validationMessages.join(''));
        $('html, body').animate({
            scrollTop: $('#Commonerrormessage').offset().top
        }, 50);
        return false;
    } else {
        $("#Commonerrormessage").html("");
        $("#Commonerrormessage1").html("");
        return true;
    }
}

function clearForm(formId) {
    debugger;
    var form = document.getElementById(formId);
    if (form) {
        form.reset(); // Reset the form elements
        var validationSpans = form.querySelectorAll('span[data-valmsg-for]');
        validationSpans.forEach(span => {
            span.textContent = ''; // Clear validation messages
        });
        $('#Commonerrormessage').text('');
        $('#Commonerrormessage1').text('');
        $('#partialViewContainer').empty();
    }
}

