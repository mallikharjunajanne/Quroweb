using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Connect4m_Web.Models;
using Microsoft.AspNetCore.Authorization;
using Connect4m_Web.Models.LMSproperties;
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Connect4m_Web.Views;
using System.IO;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Claims;

namespace Connect4m_Web.Controllers
{
    [Authorize]
    public class UsersController : Controller
    {
        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        //==========================================================  Declare The Private Varible for assigning the values from IUserServiceinterface(Read Cookies)

        private readonly IMemoryCache _memoryCache;
        private int loginCount = 0;

        private readonly IUserService _userService;
        private readonly int UserId;
        private readonly int InstanceId;
        private readonly int InstanceClassificationId;
        private readonly int InstanceSubClassificationId;
        private readonly int Roleid;
        private readonly int StudentUserid;
        private readonly string RoleName;
        private readonly string UserNameHeader_;

        CommanMethodClass CommonMethodobj = new CommanMethodClass();
        private string returnvalue;

        public UsersController(HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/Users");

            //===================Values Getting====================================
            _userService = userService;

            InstanceId = _userService.InstanceId;
            UserId = _userService.LoginUserId;
            InstanceClassificationId = _userService.InstanceClassificationId;
            InstanceSubClassificationId = _userService.InstanceSubClassificationId;
            Roleid = _userService.Roleid;
            StudentUserid = _userService.StudentUserid;
            RoleName = _userService.RoleName;
            UserNameHeader_ = _userService.UserNameHeader_;

            //InstanceId = 545;
            //UserId = 32891;
            //InstanceClassificationId = 806;
            //InstanceSubClassificationId = 1171;
            //Roleid = 773;
            //StudentUserid = 0;
        }

        //To check Role
        //if (RoleName.ToUpper().Contains("STUDENT"))
        //    {
        //        ViewBag.IsStudentIdentification = "Student";
        //    }


        //--------------->>>>>>>>>>>>>========Manage Users Screen ==============<<<<<<<<<<<<<<<<<<<<==

        #region Show profile
        //==============Genetral Tab Page
        public IActionResult ShowProfile(DropdownClass val)
        {
            try
            {

                //ViewBag.url = "GeneralInfoTab";
                //var RoleName = "Student";

                if (RoleName.ToUpper().Contains("STUDENT"))
                {
                    ViewBag.IsStudentIdentification = "STUDENT";
                }

                // ViewBag.IsStudentIdentification = RoleName;
                val.InstanceID = InstanceId;
                val.UserId = UserId;
                List<MultipleDropDownList> MultipleDropDownList = CommonMethodobj.CommonListMethod<DropdownClass, MultipleDropDownList>(val, "/DdlBindingFunctions_CreateUsers_Calingfunction", client);
                if (MultipleDropDownList.Count > 0)
                {
                    List<DropdownClass> DdlInstanceRole = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceRole_Calingfunction", client);
                    List<DropdownClass> DdlDesignation = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlDesignation_Calingfunction", client);

                    ViewBag.DdlSessionList = MultipleDropDownList[0].DdlSessionList;
                    ViewBag.DdlBloodGroupList = MultipleDropDownList[0].DdlBloodGroupList;
                    ViewBag.DdlFeeConcedingTypesList = MultipleDropDownList[0].DdlFeeConcedingTypesList;
                    ViewBag.DdlPayRoleCategoryList = MultipleDropDownList[0].DdlPayRoleCategoryList;
                    ViewBag.DdlLMSCategoryList = MultipleDropDownList[0].DdlLMSCategoryList;
                    ViewBag.DdlReligionList = MultipleDropDownList[0].DdlReligionList;
                    ViewBag.DdlCommunityList = MultipleDropDownList[0].DdlCommunityList;
                    ViewBag.DdlMotherTongueList = MultipleDropDownList[0].DdlMothorTongueList;
                    ViewBag.DdlCountryList = MultipleDropDownList[0].DdlCountryList;
                    //ViewBag.DdlStateList = MultipleDropDownList[0].DdlStateList;
                    ViewBag.DdlDisabilityList = MultipleDropDownList[0].DdlDisabilityList;
                    ViewBag.DdlSecurityQuestionList = MultipleDropDownList[0].DdlSecurityQuestionList;
                    ViewBag.DdlInstanceClassificationList = MultipleDropDownList[0].DdlInstanceClassificationList;
                    ViewBag.DdlInstanceSubClassificationIdList = new List<SelectListItem>();
                    ViewBag.DdlClassTeacherIdList = new List<SelectListItem>();
                    // ViewBag.DdlCountryIdList = new List<SelectListItem>();
                    ViewBag.DdlStateList = new List<SelectListItem>();
                    ViewBag.DdlPayRoleCategoryIdList = new List<SelectListItem>();
                    ViewBag.DdlLMSSubCategoryIdList = new List<SelectListItem>();

                    ViewBag.DdlInstanceRole = DdlInstanceRole;
                    ViewBag.DdlDesignation = DdlDesignation;
                    //  Response.Cookies.Delete("UserId");
                    if (UserId != 0)
                    {
                        //  Response.Cookies.Append("UserId", UserId.ToString());
                        val.Id = 1;// i gave default @SubjectMode
                        val.UserId = UserId;
                        ManageUsersModel DdlUsersDetails = new ManageUsersModel();
                        //returnvalue = CommonMethodobj.CommonSaveMethod(val, "/GettingUserDetails_EditFunction", client);
                        returnvalue = CommonMethodobj.CommonSaveMethod(val, "/GettingUserDetails_ShowProfileFunction", client);
                        DdlUsersDetails = JsonConvert.DeserializeObject<ManageUsersModel>(returnvalue);

                        val.InstanceClassificationId = DdlUsersDetails.InstanceClassificationId;
                        List<DropdownClass> DdlInstanceSubClassificationIdList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceSubClassificationId_Calingfunction", client);
                        //List <DropdownClass> DdlInstanceClassification =CommonMethodobj.CommonDropDownMethod(client, "ApplyStudentAttendance", "DdlClassId_Calingfunction2");
                        ViewBag.DdlInstanceSubClassificationIdList = DdlInstanceSubClassificationIdList;


                        val.InstanceSubClassificationId = DdlUsersDetails.InstanceSubClassificationId;
                        val.Name = "TEACHER','CLASS TEACHER";//Role Name I gave Default
                        List<DropdownClass> DdlClassTeacherIdList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlClassTeacher_Calingfunction", client);
                        ViewBag.DdlClassTeacherIdList = DdlClassTeacherIdList;
                        int NewId = 0;
                        if (int.TryParse(DdlUsersDetails.PCountryId, out NewId))
                        {
                            val.Id = NewId;
                        }

                        List<DropdownClass> DdlStateList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlStateByCountry_Calingfunction", client);
                        ViewBag.DdlStateList = DdlStateList;

                        NewId = 0;
                        if (int.TryParse(DdlUsersDetails.Category, out NewId))
                        {
                            val.Id = NewId;
                        }

                        List<DropdownClass> DdlPayRoleCategoryIdList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPayRoleCategory_Calingfunction", client);
                        ViewBag.DdlPayRoleCategoryIdList = DdlPayRoleCategoryIdList;

                        NewId = 0;
                        if (int.TryParse(DdlUsersDetails.LMSCategory, out NewId))
                        {
                            val.Id = NewId;
                        }
                        List<DropdownClass> DdlLMSSubCategoryIdList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlLMSCategory_Calingfunction", client);
                        ViewBag.DdlLMSSubCategoryIdList = DdlLMSSubCategoryIdList;



                        //Response.Cookies.Delete("UpdateIdentification");
                        //Response.Cookies.Append("UpdateIdentification", "UpdateDetails");
                        ViewBag.UpdateIdentification = "UpdateDetails";
                        ViewBag.UserId = val.UserId;
                        if (DdlUsersDetails.PhotoName != null && DdlUsersDetails.PhotoName != "")
                        {
                            ViewBag.PhotoName = DdlUsersDetails.PhotoName;
                            ViewBag.PhotoNameFullName = "/UserPhotos/" + InstanceId + "/" + val.UserId + "/" + DdlUsersDetails.PhotoName;
                        }
                        else
                        {
                            ViewBag.PhotoNameFullName = "/Images/No imageAvailable.gif";
                        }
                        ViewBag.identitypassword = DdlUsersDetails.Password;
                        ViewBag.identityUserName = DdlUsersDetails.UserName;


                        ManageUsersModel DdlParentDetails = new ManageUsersModel();
                        returnvalue = CommonMethodobj.CommonSaveMethod(val, "/TblUserGetParentDetails", client);
                        DdlParentDetails = JsonConvert.DeserializeObject<ManageUsersModel>(returnvalue);
                        //DdlUsersDetails.ParentId = DdlParentDetails.ParentId;
                        //DdlUsersDetails.ParentStatusId = DdlParentDetails.ParentStatusId;


                        ViewBag.ParentId = DdlParentDetails.ParentId;
                        ViewBag.MotherId = DdlParentDetails.ParentStatusId;

                        //ViewBag.FatherName = DdlUsersDetails.ParentName;
                        //ViewBag.MotherFirstName = DdlUsersDetails.MotherFirstName;
                        ViewBag.FatherName = DdlParentDetails.ParentName;
                        ViewBag.MotherFirstName = DdlParentDetails.MotherFirstName;
                        //ModelState.Clear();

                        int communityid = DdlUsersDetails.CommunityId;
                        string communityText = null;
                        if (ViewBag.DdlCommunityList != null)
                        {
                            foreach (var item in ViewBag.DdlCommunityList)
                            {
                                // Assuming item.Id and communityid are integers
                                if (item.Value == communityid.ToString())
                                {
                                    communityText = item.Text;
                                    break;
                                }
                            }
                        }
                        DdlUsersDetails.CommunityName = communityText;

                        return View(DdlUsersDetails);
                    }
                }
                // ViewBag.DdlPickUpRoute = DdlPickUpRoute;
                return View();

            }
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        #region Manage Users Code
        //===========================Searched Users details in table

        public IActionResult ManageUsersPreview(DropdownClass val, int UserId, string IsParentIdentification)
        {
            try
            {
                if (UserId != 0)
                {


                    //ViewBag.url = "GeneralInfoTab";
                    val.InstanceID = InstanceId;
                    ViewBag.UpdateIdentification = "UpdateDetails";

                    //return View(DdlParentDetails);
                    //ViewBag.IsParentIdentification = IsParentIdentification;
                    //return PartialView("ManageUsersPreview", DdlParentDetails);

                    //  Response.Cookies.Append("UserId", UserId.ToString());
                    val.Id = 1;// i gave default @SubjectMode
                    val.UserId = UserId;
                    ManageUsersModel DdlUsersDetails = new ManageUsersModel();
                    returnvalue = CommonMethodobj.CommonSaveMethod(val, "/GettingUserDetails_EditFunction", client);
                    DdlUsersDetails = JsonConvert.DeserializeObject<ManageUsersModel>(returnvalue);
                    ViewBag.UserId = val.UserId;
                    if (DdlUsersDetails.PhotoName != null && DdlUsersDetails.PhotoName != "")
                    {
                        ViewBag.PhotoName = DdlUsersDetails.PhotoName;
                        ViewBag.PhotoNameFullName = "/UserPhotos/" + InstanceId + "/" + val.UserId + "/" + DdlUsersDetails.PhotoName;
                    }
                    else
                    {
                        ViewBag.PhotoNameFullName = "/Images/No imageAvailable.gif";
                    }


                    ManageUsersModel DdlParentNames = new ManageUsersModel();
                    returnvalue = CommonMethodobj.CommonSaveMethod(val, "/TblUserGetParentDetails", client);
                    DdlParentNames = JsonConvert.DeserializeObject<ManageUsersModel>(returnvalue);

                    //ViewBag.ParentId = DdlParentNames.ParentId;
                    //ViewBag.MotherId = DdlParentNames.ParentStatusId;
                    ViewBag.FatherName = DdlParentNames.ParentName;
                    ViewBag.MotherFirstName = DdlParentNames.MotherFirstName;


                    ManageUsersModel DdlParentDetails = new ManageUsersModel();
                    // if (DdlUsersDetails.RoleId == 775)
                    if (DdlUsersDetails.RoleName.ToUpper().Contains("STUDENT"))
                    {
                        returnvalue = CommonMethodobj.CommonSaveMethod(val, "/GettingParentDetails_PreviewFunction", client);
                        DdlParentDetails = JsonConvert.DeserializeObject<ManageUsersModel>(returnvalue);
                        ViewBag.IsParentIdentification = "Parent";
                        if (DdlParentDetails.PhotoName != null && DdlParentDetails.PhotoName != "")
                        {
                            ViewBag.ParentPhotoName = DdlParentDetails.PhotoName;
                            //ViewBag.ParentPhotoNameFullName = "/ParentPhotos/" + InstanceId + "/" + DdlParentDetails.Relationship + "/" + val.UserId + "/" + DdlParentDetails.PhotoName;
                            //ViewBag.ParentPhotoNameFullName = "/ParentPhotos/" + InstanceId + "/" + DdlParentNames.Relationship + "/" + val.UserId + "/" + DdlParentDetails.PhotoName;
                            //ViewBag.ParentPhotoNameFullName = "/ParentPhotos/" + InstanceId + "/" + DdlParentNames.Relationship + "/" + DdlParentDetails.ParentId + "/" + DdlParentDetails.PhotoName;
                            ViewBag.ParentPhotoNameFullName = "/ParentPhotos/" + InstanceId + "/" + DdlParentNames.Relationship + "/" + val.UserId + "/" + DdlParentDetails.PhotoName;
                        }
                        else
                        {
                            ViewBag.ParentPhotoNameFullName = "/Images/No imageAvailable.gif";
                        }
                    }
                    List<DropdownClass> DdlInstanceRole = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceRole_Calingfunction", client);
                    ViewBag.DdlInstanceRole = DdlInstanceRole;
                    string Lactypes = DdlParentDetails.LacsType;
                    int firstPart;
                    int secondPart;
                    if (!string.IsNullOrEmpty(Lactypes))
                    {
                        string[] parts = Lactypes.Split('.');

                        int part0 = int.Parse(parts[0]);
                        int part1 = int.Parse(parts[1]);
                        string fisrtvalue = "";
                        string Secoundvalue = "";
                        if (part0 > 0)
                        {
                            firstPart = part0;
                            fisrtvalue = Convert.ToString(firstPart);
                        }
                        if (part1 > 1)
                        {
                            secondPart = part1;
                            Secoundvalue = Convert.ToString(secondPart);
                        }
                        string LactypeValues = fisrtvalue + Secoundvalue;
                        DdlParentDetails.LacsType = LactypeValues;
                    }

                    ManageUsersModel viewModel = new ManageUsersModel
                    {
                        DdlParentDetails = DdlParentDetails,
                        DdlUsersDetails = DdlUsersDetails
                    };

                    return View(viewModel);
                }
                ManageUsersModel viewModelEmpty = new ManageUsersModel
                {
                    DdlParentDetails = new ManageUsersModel(),
                    DdlUsersDetails = new ManageUsersModel()
                };
                return View(viewModelEmpty);
            }
            catch (Exception)
            {

                throw;
            }
        }


        #region


        #endregion

        public IActionResult TblUsersSearch(ManageUsersModel obj)
        {
            try
            {
                // InitializeCookieValues();
                // obj.TcTaken = 1;//i gave default
                obj.InstanceID = InstanceId;
                List<ManageUsersModel> list = CommonMethodobj.CommonListMethod<ManageUsersModel, ManageUsersModel>(obj, "/TblUsersSearch", client);
                return Json(list.OrderBy(x => x.FirstName).ToList());

            }
            catch (Exception)
            {

                throw;
            }
        }
        //===========================Search Users details 

        public IActionResult DdlStateByCountry_Calingfunction(DropdownClass val, int CountryId)
        {
            val.Id = CountryId;
            List<DropdownClass> DdlCountryId = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlStateByCountry_Calingfunction", client);
            return Json(DdlCountryId);
        }
        public IActionResult DdlPayRoleCategory_Calingfunction(DropdownClass val, int Id)
        {
            val.Id = Id;
            val.InstanceID = InstanceId;
            List<DropdownClass> DdlPayRoleCategoryId = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPayRoleCategory_Calingfunction", client);
            return Json(DdlPayRoleCategoryId);
        }
        public IActionResult DdlLMSCategory_Calingfunction(DropdownClass val, int Id)
        {
            val.Id = Id;
            val.InstanceID = InstanceId;
            List<DropdownClass> DdlLMSSubCategoryIdList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlLMSCategory_Calingfunction", client);
            return Json(DdlLMSSubCategoryIdList);
        }
        public IActionResult DdlClassTeacher_Calingfunction(ManageUsersModel val1)
        {
            DropdownClass val = new DropdownClass();
            val.InstanceID = InstanceId;
            val.InstanceClassificationId = val1.InstanceClassificationId;
            val.InstanceSubClassificationId = val1.InstanceSubClassificationId;
            val.Name = "TEACHER','CLASS TEACHER";//Role Name I gave Default
            List<DropdownClass> DdlClassTeacher = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlClassTeacher_Calingfunction", client);
            return Json(DdlClassTeacher);
        }

        public IActionResult DdlStudentStatus_Calingfunction(DropdownClass val, int Id)
        {
            val.InstanceID = InstanceId;
            val.Id = Id;
            List<DropdownClass> DdlStudentStatus = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlStudentStatus_Calingfunction", client);
            return Json(DdlStudentStatus);
        }

        public IActionResult DdlPickUpStop_Calingfunction(DropdownClass val, int RouteId)
        {
            val.Id = RouteId;
            List<DropdownClass> DdlPickUpStop = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPickUpStop_Calingfunction", client);
            return Json(DdlPickUpStop);
        }
        public IActionResult CheckUserAvailability(DropdownClass val, string UserName)
        {
            val.InstanceID = InstanceId;
            val.UserId = 0;
            val.Name = UserName;//UserName
            returnvalue = CommonMethodobj.CommonSaveMethod(val, "/CheckUserAvailability", client);
            if (returnvalue != "0")
                return Json(new { success = true, message = returnvalue });
            else
                return Json(new { success = false, message = "Something Error" });

        }

        //=======Create Users Main  Page
        public IActionResult CreateUsers(int UserId)
        {
            ViewBag.url = "GeneralInfoTab";
            ViewBag.UserId = UserId;
            return View();
        }
        //==============Genetral Tab Page
        public IActionResult GeneralInfoTab(DropdownClass val, int UserId)
        {
            try
            {

                //ViewBag.url = "GeneralInfoTab";
                val.InstanceID = InstanceId;
                List<MultipleDropDownList> MultipleDropDownList = CommonMethodobj.CommonListMethod<DropdownClass, MultipleDropDownList>(val, "/DdlBindingFunctions_CreateUsers_Calingfunction", client);
                if (MultipleDropDownList.Count > 0)
                {
                    List<DropdownClass> DdlInstanceRole = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceRole_Calingfunction", client);
                    List<DropdownClass> DdlDesignation = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlDesignation_Calingfunction", client);

                    ViewBag.DdlSessionList = MultipleDropDownList[0].DdlSessionList;
                    ViewBag.DdlBloodGroupList = MultipleDropDownList[0].DdlBloodGroupList;
                    ViewBag.DdlFeeConcedingTypesList = MultipleDropDownList[0].DdlFeeConcedingTypesList;
                    ViewBag.DdlPayRoleCategoryList = MultipleDropDownList[0].DdlPayRoleCategoryList;
                    ViewBag.DdlLMSCategoryList = MultipleDropDownList[0].DdlLMSCategoryList;
                    ViewBag.DdlReligionList = MultipleDropDownList[0].DdlReligionList;
                    ViewBag.DdlCommunityList = MultipleDropDownList[0].DdlCommunityList;
                    ViewBag.DdlMotherTongueList = MultipleDropDownList[0].DdlMothorTongueList;
                    ViewBag.DdlCountryList = MultipleDropDownList[0].DdlCountryList;
                    //ViewBag.DdlStateList = MultipleDropDownList[0].DdlStateList;
                    ViewBag.DdlDisabilityList = MultipleDropDownList[0].DdlDisabilityList;
                    ViewBag.DdlSecurityQuestionList = MultipleDropDownList[0].DdlSecurityQuestionList;
                    ViewBag.DdlInstanceClassificationList = MultipleDropDownList[0].DdlInstanceClassificationList;
                    ViewBag.DdlInstanceSubClassificationIdList = new List<SelectListItem>();
                    ViewBag.DdlClassTeacherIdList = new List<SelectListItem>();
                    // ViewBag.DdlCountryIdList = new List<SelectListItem>();
                    ViewBag.DdlStateList = new List<SelectListItem>();
                    ViewBag.DdlPayRoleCategoryIdList = new List<SelectListItem>();
                    ViewBag.DdlLMSSubCategoryIdList = new List<SelectListItem>();

                    ViewBag.DdlInstanceRole = DdlInstanceRole;
                    ViewBag.DdlDesignation = DdlDesignation;
                    //  Response.Cookies.Delete("UserId");
                    if (UserId != 0)
                    {
                        //  Response.Cookies.Append("UserId", UserId.ToString());
                        val.Id = 1;// i gave default @SubjectMode
                        val.UserId = UserId;
                        ManageUsersModel DdlUsersDetails = new ManageUsersModel();
                        returnvalue = CommonMethodobj.CommonSaveMethod(val, "/GettingUserDetails_EditFunction", client);
                        DdlUsersDetails = JsonConvert.DeserializeObject<ManageUsersModel>(returnvalue);

                        val.InstanceClassificationId = DdlUsersDetails.InstanceClassificationId;
                        List<DropdownClass> DdlInstanceSubClassificationIdList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceSubClassificationId_Calingfunction", client);
                        //List <DropdownClass> DdlInstanceClassification =CommonMethodobj.CommonDropDownMethod(client, "ApplyStudentAttendance", "DdlClassId_Calingfunction2");
                        ViewBag.DdlInstanceSubClassificationIdList = DdlInstanceSubClassificationIdList;


                        val.InstanceSubClassificationId = DdlUsersDetails.InstanceSubClassificationId;
                        val.Name = "TEACHER','CLASS TEACHER";//Role Name I gave Default
                        List<DropdownClass> DdlClassTeacherIdList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlClassTeacher_Calingfunction", client);
                        ViewBag.DdlClassTeacherIdList = DdlClassTeacherIdList;
                        int NewId = 0;
                        if (int.TryParse(DdlUsersDetails.PCountryId, out NewId))
                        {
                            val.Id = NewId;
                        }

                        List<DropdownClass> DdlStateList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlStateByCountry_Calingfunction", client);
                        ViewBag.DdlStateList = DdlStateList;

                        NewId = 0;
                        if (int.TryParse(DdlUsersDetails.Category, out NewId))
                        {
                            val.Id = NewId;
                        }

                        List<DropdownClass> DdlPayRoleCategoryIdList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPayRoleCategory_Calingfunction", client);
                        ViewBag.DdlPayRoleCategoryIdList = DdlPayRoleCategoryIdList;

                        NewId = 0;
                        if (int.TryParse(DdlUsersDetails.LMSCategory, out NewId))
                        {
                            val.Id = NewId;
                        }
                        List<DropdownClass> DdlLMSSubCategoryIdList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlLMSCategory_Calingfunction", client);
                        ViewBag.DdlLMSSubCategoryIdList = DdlLMSSubCategoryIdList;



                        //Response.Cookies.Delete("UpdateIdentification");
                        //Response.Cookies.Append("UpdateIdentification", "UpdateDetails");
                        ViewBag.UpdateIdentification = "UpdateDetails";
                        ViewBag.UserId = val.UserId;
                        if (DdlUsersDetails.PhotoName != null && DdlUsersDetails.PhotoName != "")
                        {
                            ViewBag.PhotoName = DdlUsersDetails.PhotoName;
                            ViewBag.PhotoNameFullName = "/UserPhotos/" + InstanceId + "/" + val.UserId + "/" + DdlUsersDetails.PhotoName;
                        }
                        else
                        {
                            ViewBag.PhotoNameFullName = "/Images/No imageAvailable.gif";
                        }

                        ViewBag.identitypassword = DdlUsersDetails.Password;
                        ViewBag.identityUserName = DdlUsersDetails.UserName;
                        ManageUsersModel DdlParentDetails = new ManageUsersModel();
                        returnvalue = CommonMethodobj.CommonSaveMethod(val, "/TblUserGetParentDetails", client);
                        DdlParentDetails = JsonConvert.DeserializeObject<ManageUsersModel>(returnvalue);
                        //DdlUsersDetails.ParentId = DdlParentDetails.ParentId;
                        //DdlUsersDetails.ParentStatusId = DdlParentDetails.ParentStatusId;


                        ViewBag.ParentId = DdlParentDetails.ParentId;
                        ViewBag.MotherId = DdlParentDetails.ParentStatusId;

                        //ViewBag.FatherName = DdlUsersDetails.ParentName;
                        //ViewBag.MotherFirstName = DdlUsersDetails.MotherFirstName;
                        ViewBag.FatherName = DdlParentDetails.ParentName;
                        ViewBag.MotherFirstName = DdlParentDetails.MotherFirstName;

                        ViewBag.IsUserjoinedid = DdlUsersDetails.IsUserJoined;
                        //ModelState.Clear();


                        return View(DdlUsersDetails);
                    }
                }
                // ViewBag.DdlPickUpRoute = DdlPickUpRoute;
                return View();
            }
            catch (Exception)
            {

                throw;
            }
        }


        //==========Parent details Main Tab page
        public IActionResult ParentDetailsTab(DropdownClass val, int UserId)
        {
            try
            {
                ViewBag.UserId = UserId;
                val.Id = 1;// i gave default @SubjectMode
                val.UserId = UserId;
                val.InstanceID = InstanceId;
                ManageUsersModel DdlStudentDetails = new ManageUsersModel();
                returnvalue = CommonMethodobj.CommonSaveMethod(val, "/GettingUserDetails_EditFunction", client);
                DdlStudentDetails = JsonConvert.DeserializeObject<ManageUsersModel>(returnvalue);
                ViewBag.Name = DdlStudentDetails.Name;
                ViewBag.Department = DdlStudentDetails.ClassificationName;
                ViewBag.Class = DdlStudentDetails.SubClassificationName;
                ViewBag.InstanceUserCode = DdlStudentDetails.InstanceUserCode;

                if (DdlStudentDetails.PhotoName != null && DdlStudentDetails.PhotoName != "")
                {
                    ViewBag.PhotoName = DdlStudentDetails.PhotoName;
                    ViewBag.PhotoNameFullName = "/UserPhotos/" + InstanceId + "/" + val.UserId + "/" + DdlStudentDetails.PhotoName;
                }
                else
                {
                    ViewBag.PhotoNameFullName = "/Images/No imageAvailable.gif";
                }
                return View();

            }
            catch (Exception)
            {

                throw;
            }
        }

        //=================Delete Photo
        public IActionResult DeletePhoto_CallingFunction(DropdownClass val, int UserId)
        {
            try
            {
                val.UserId = UserId;
                returnvalue = CommonMethodobj.CommonSaveMethod(val, "/DeletePhoto_CallingFunction", client);
                if (returnvalue != "0")
                {
                    return Json(new { success = true, message = returnvalue });
                }
                else
                    return Json(new { success = false, message = "Something Error" });

            }
            catch (Exception)
            {

                throw;
            }

        }
        public IActionResult DeleteParentPhoto_CallingFunction(DropdownClass val, int UserId)
        {
            try
            {
                val.UserId = UserId;
                returnvalue = CommonMethodobj.CommonSaveMethod(val, "/DeleteParentPhoto_CallingFunction", client);
                if (returnvalue != "0")
                {
                    return Json(new { success = true, message = returnvalue });
                }
                else
                    return Json(new { success = false, message = "Something Error" });

            }
            catch (Exception)
            {

                throw;
            }

        }

        // ============= Search Users Page
        public IActionResult ManageUsers(DropdownClass val)
        {
            try
            {
                //if (url != null)
                //{
                // ViewBag.url = "ManageUsers";
                ViewBag.url = "UserSearchTab";
                // }
                // i am not used this
                //exec stp_tblInstancemenu_GetMenuAssignedDetailsByID @instanceid=545,@UserId=32891
                val.InstanceID = InstanceId;
                List<DropdownClass> DdlInstanceRole = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlInstanceRole_Calingfunction", client);
                List<DropdownClass> DdlDesignation = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlDesignation_Calingfunction", client);
                List<DropdownClass> DdlPickUpRoute = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlPickUpRoute_Calingfunction", client);
                ViewBag.DdlInstanceRole = DdlInstanceRole;
                ViewBag.DdlDesignation = DdlDesignation;
                ViewBag.DdlPickUpRoute = DdlPickUpRoute;
                return View();

            }
            catch (Exception)
            {

                throw;
            }
        }


        //================Save and Update Users Method
        [HttpPost]
        public IActionResult ManageUsers(ManageUsersModel val)
        {
            try
            {

                //ViewBag.isuserjoined= val.IsUserJoined;
                ViewBag.isuserjoined= val.IsUserJoinedbool;
                if (val.IsUserJoinedbool == true)
                {
                    val.IsUserJoined = "1";
                }
                else
                {
                    val.IsUserJoined = "0";
                }
                //if (rolename.toupper().contains("student"))//identification is stundent or teachers
                //{
                //    val.rolename = "student";
                //}



                //if (val.RoleId == 775){
                //    val.Name = "Student";//Identification is stundent or Teachers
                //}
                bool PhotoAvailable = false;
                var ErrorMessage = ""; int errorCount = 0;
                //if (ModelState.IsValid){
                if ((val.IsActive == "1" && val.TcTaken == "1") || (val.IsActive == "1" && val.TcTaken == "1"))
                {
                    if (val.RoleName == "STUDENT")
                    {
                        ErrorMessage = "Selected Criteria should be : Is Active as Yes and TC issued as No / Is Active as No and TC issued as as Yes.";
                    }
                    else
                        ErrorMessage = "Selected Criteria should be : Is Active as Yes and Hide In Portal as No / Is Active as No and Hide in Portal as Yes.";
                    errorCount++;
                }
                else if (val.AdmissionDate > DateTime.Now)
                {
                    ErrorMessage = "Admission Date should not be greater than todays date.";
                    errorCount++;
                }
                else if (val.DOB > DateTime.Now)
                {
                    ErrorMessage = "Date Of Birth should not be greater than todays date.";
                    errorCount++;
                } //else if (val.DateOfJoining > val.DateOfJoining)
                //{
                //    ErrorMessage = "TC Date should be greater than Date Of Join.";
                //    errorCount++;
                //}
                if (errorCount > 0)
                {
                    return Json(new { success = false, message = ErrorMessage, userid = 0 });
                }
                if (val.Photo != null || val.Photo?.Length > 0)
                {
                    val.PhotoSize = Convert.ToInt32(val.Photo.Length);
                    val.PhotoName = val.Photo.FileName;
                    var fileExtension = Path.GetExtension(val.Photo.FileName);
                    if (fileExtension.ToLower() != ".gif" && fileExtension.ToLower() != ".jpg" && fileExtension.ToLower() != ".jpeg" && fileExtension.ToLower() != ".png")
                    {
                        ErrorMessage = "Invalid file extension.allowed extensions are .gif,.jpg,.jpeg,.png";
                        errorCount++;
                    }
                    else
                        PhotoAvailable = true;
                }
                if (errorCount > 0)
                {
                    return Json(new { success = false, message = ErrorMessage, userid = 0 });
                }
                //return Json(new { success = false, message = "Something Error" });
                val.InstanceID = InstanceId;
                val.CreatedBy = UserId;


                if (val.IdentityPassword != val.Password)
                {
                    val.Password = HashUtility.HashData((val.Password).Trim());//this for convert code into Binary code
                }


                val.CollegeHostel = "1";//i gave defalut
                returnvalue = CommonMethodobj.CommonSaveMethod(val, "/ManageUsers", client);
                if (returnvalue != "0")
                {
                    var jsonResponse = JsonConvert.DeserializeObject<dynamic>(returnvalue);
                    // var Returnvalue1 = jsonResponse.successMSG.Value;
                    returnvalue = jsonResponse.successMSG.Value;
                    int UserIdForInsert = 0;
                    //if (returnvalue.Contains("Record inserted successfully.") || returnvalue.Contains("Record updated successfully."))
                    //{
                    //    UserIdForInsert =Convert.ToInt32(jsonResponse.userId.Value);
                    //}
                    var PhotoUrl = "";

                    if ((returnvalue.Contains("Record inserted successfully.") || returnvalue.Contains("Record updated successfully.")))
                    {
                        UserIdForInsert = Convert.ToInt32(jsonResponse.userId.Value);
                        if (val.PhotoName != null && val.PhotoName != "")
                        {
                            PhotoUrl = $"/UserPhotos/{val.InstanceID }/{UserIdForInsert }/{ val.PhotoName }";
                        }
                        else
                        {
                            PhotoUrl = "/Images/No imageAvailable.gif";
                        }
                        //  PhotoUrl = $"/UserPhotos/{val.InstanceID }/{UserIdForInsert }/{ val.PhotoName }";
                        if (PhotoAvailable)
                        {
                            string path = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/UserPhotos/{val.InstanceID }/{UserIdForInsert }");
                            // string path = Path.Combine(Directory.GetCurrentDirectory(), $"UserPhotos/{val.InstanceID }/{UserIdForInsert }/{ val.Photo.FileName }");

                            if (!Directory.Exists(path))
                                Directory.CreateDirectory(path);

                            string fileNameWithPath = Path.Combine(path, val.Photo.FileName);
                            using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
                            {
                                val.Photo.CopyTo(stream);
                            }
                        }
                    }
                    return Json(new { success = true, message = returnvalue, userid = UserIdForInsert, photoUrl = PhotoUrl });
                }
                else
                {
                    return Json(new { success = false, message = "Something Error", userid = 0 });
                }
                //}
                //else{
                //    return Json(new { success = false, message = "Something Error" });
                //}
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                // throw;
                return Json(new { success = false, message = "Something Error", userid = 0 });
            }
        }


        public IActionResult ManageUsersPayrole()
        {
            DropdownClass val = new DropdownClass();
            val.InstanceID = InstanceId;
            List<MultipleDropDownList> MultipleDropDownList = CommonMethodobj.CommonListMethod<DropdownClass, MultipleDropDownList>(val, "/DdlBindingFunctions_CreateUsersinPayrollCategory_Calingfunction", client);
            if (MultipleDropDownList.Count > 0)
            {
                ViewBag.DdlPayRoleCategoryList = MultipleDropDownList[0].DdlPayRoleCategoryList;
                ViewBag.DdlLMSCategoryList = MultipleDropDownList[0].DdlLMSCategoryList;
                ViewBag.DdlPayRoleCategoryIdList = new List<SelectListItem>();
                ViewBag.DdlLMSSubCategoryIdList = new List<SelectListItem>();
                ViewBag.testing = "Testing images";
            }

            return View();
        }

        #endregion

        #region Manage Parents Code
        //==================== ParentRoleMenu Tab

        //===========================Searched Users details in table
        public IActionResult TblParentsSearch(ManageUsersModel obj, int UserId)
        {
            // InitializeCookieValues();
            // obj.TcTaken = 1;//i gave default
            obj.InstanceID = InstanceId;
            obj.UserId = UserId;
            List<ManageUsersModel> list = CommonMethodobj.CommonListMethod<ManageUsersModel, ManageUsersModel>(obj, "/TblParentsSearch", client);
            return Json(list.OrderBy(x => x.ParentName).ToList());
        }

        //==========Parent details Create new Tab Page
        public IActionResult CreateNewParents(DropdownClass val, int UserId, int ParentId, int isParentTable)
        {

            ViewBag.StudentUserId = UserId;
            ViewBag.UserId = UserId;
            //ViewBag.url = "GeneralInfoTab";
            val.UserId = UserId;
            val.InstanceID = InstanceId;
            val.Name = "CUR";//==@Code
            List<MultipleDropDownList> MultipleDropDownList = CommonMethodobj.CommonListMethod<DropdownClass, MultipleDropDownList>(val, "/DdlBindingFunctions_CreateParents_Calingfunction", client);
            if (MultipleDropDownList.Count > 0)
            {
                ViewBag.DdlCountryList = MultipleDropDownList[0].DdlCountryList;
                // ViewBag.DdlCountryIdList = new List<SelectListItem>();
                ViewBag.DdlStateList = new List<SelectListItem>();
                // ViewBag.DdlStateList = MultipleDropDownList[0].DdlStateList;
                ViewBag.DdlSecurityQuestionList = MultipleDropDownList[0].DdlSecurityQuestionList;


                ViewBag.DdlRelationship = MultipleDropDownList[0].DdlRelationshipList;
                ViewBag.DdlOccupation = MultipleDropDownList[0].DdlOccupationList;
                ViewBag.DdlCurrency = MultipleDropDownList[0].DdlCurrencyList;
                if (ParentId != 0)
                //  if (false)
                {
                    ViewBag.ParentId = ParentId;
                    //  int IsParent = 0;// i gave default 
                    //int IsParent = 1;// i gave default 
                    int IsParent = isParentTable;// i gave default 
                    val.UserId = ParentId;
                    ManageUsersModel DdlParentDetails = new ManageUsersModel();
                    returnvalue = CommonMethodobj.CommonSaveMethod(val, "/GettingParentDetails_EditFunction?IsParent=" + IsParent, client);
                    DdlParentDetails = JsonConvert.DeserializeObject<ManageUsersModel>(returnvalue);

                    int NewId = 0;
                    if (int.TryParse(DdlParentDetails.PCountryId, out NewId))
                    {
                        val.Id = NewId;
                    }
                    List<DropdownClass> DdlStateList = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(val, "/DdlStateByCountry_Calingfunction", client);
                    ViewBag.DdlStateList = DdlStateList;


                    //Response.Cookies.Delete("UpdateIdentification");
                    //Response.Cookies.Append("UpdateIdentification", "UpdateDetails");
                    ViewBag.UpdateIdentification = "UpdateDetails";
                    ViewBag.UserId = val.UserId;
                    if (DdlParentDetails.PhotoName != null && DdlParentDetails.PhotoName != "")
                    {
                        ViewBag.PhotoName = DdlParentDetails.PhotoName;
                        //ViewBag.PhotoNameFullName = "/ParentPhotos/" + InstanceId + "/" + DdlParentDetails.Relationship + "/" + val.UserId + "/" + DdlParentDetails.PhotoName;
                        ViewBag.PhotoNameFullName = "/ParentPhotos/" + InstanceId + "/" + DdlParentDetails.Relationship + "/" + DdlParentDetails.StudentId + "/" + DdlParentDetails.PhotoName;
                    }
                    else
                    {
                        ViewBag.PhotoNameFullName = "/Images/No imageAvailable.gif";
                    }
                    ViewBag.identitypassword = DdlParentDetails.Password;
                    ViewBag.identityUserName = DdlParentDetails.UserName;
                    ViewBag.isParentTable = isParentTable;
                    ViewBag.instanceid = InstanceId;
                    return View(DdlParentDetails);
                }

                // ViewBag.TblParentsDetailsList = MultipleDropDownList[0].TblParentsDetailsList.Count;
                if (MultipleDropDownList?[0]?.TblParentsDetailsList.Count <= 0)
                {
                    ViewBag.isParentTable = 1;
                }
            }
            // ViewBag.DdlPickUpRoute = DdlPickUpRoute;
            return View();
        }


        //=================Make Primary Contact
        public IActionResult MakePrimaryContact_CallingFunction(DropdownClass val, int StudentId, int ParentId, int IsParent)
        {
            val.UserId = StudentId;//StudentId
            val.Id = ParentId;//ParentId
            val.InstanceID = InstanceId;
            val.CreatedBy = UserId;
            returnvalue = CommonMethodobj.CommonSaveMethod(val, "/MakePrimaryContact_CallingFunction?IsParent=" + IsParent, client);
            if (returnvalue != "0")
            {
                return Json(new { success = true, message = returnvalue });
            }
            else
                return Json(new { success = false, message = "Something Error" });

        }

        //=================Delete User
        public IActionResult DeleteUser_CallingFunction(DropdownClass val, int UserId)
        {
            val.UserId = UserId;
            var UserFeeCheck = "ON";
            var UserAttendanceCheck = "ON";
            var UserResultsCheck = "ON";
            var RoleName = "TEACHER,CLASS TEACHER";
            val.InstanceID = InstanceId;
            returnvalue = CommonMethodobj.CommonSaveMethod(val, "/DeleteUser_CallingFunction?RoleName=" + RoleName + "&UserAttendanceCheck=" + UserAttendanceCheck + "&UserResultsCheck=" + UserResultsCheck + "&UserFeeCheck=" + UserFeeCheck, client);
            if (returnvalue != "0")
            {
                return Json(new { success = true, message = returnvalue });
            }
            else
                return Json(new { success = false, message = "Something Error" });

        }

        //============================Save and Update Parents
        [HttpPost]
        public IActionResult ManageParents(ManageUsersModel val)
        {
            try
            {
                bool PhotoAvailable = false;
                var ErrorMessage = ""; int errorCount = 0;
                //if (ModelState.IsValid){
                if (val.DOB > DateTime.Now)
                {
                    ErrorMessage = "Date Of Birth should not be greater than todays date.";
                    errorCount++;
                }
                if (errorCount > 0)
                {
                    return Json(new { success = false, message = ErrorMessage });
                }
                if (val.Photo != null || val.Photo?.Length > 0)
                //if (val.Photo != null )
                {
                    // if (val.Photo.Length > 0){
                    val.PhotoSize = Convert.ToInt32(val.Photo.Length);
                    val.PhotoName = val.Photo.FileName;
                    var fileExtension = Path.GetExtension(val.Photo.FileName);
                    if (fileExtension.ToLower() != ".gif" && fileExtension.ToLower() != ".jpg" && fileExtension.ToLower() != ".jpeg" && fileExtension.ToLower() != ".png")
                    {
                        ErrorMessage = "Invalid file extension.allowed extensions are .gif,.jpg,.jpeg,.png";
                        errorCount++;
                        return Json(new { success = false, message = ErrorMessage });
                    }
                    else
                        PhotoAvailable = true;
                    // }
                }
                //return Json(new { success = false, message = "Something Error" });
                val.InstanceID = InstanceId;
                val.CreatedBy = UserId;
                //if (val.ButtonName == "Update"){
                //    val.IsParent = "1";//check this once
                //}
                //if (val.IdentityPassword != val.Password){
                //if (val.IdentityPassword != "undefined" && val.Password  != null && val.IdentityPassword != val.Password)
                if (val.Password != null && val.IdentityPassword != val.Password)
                {
                    val.Password = HashUtility.HashData((val.Password).Trim());//this for convert code into Binary code
                }
                returnvalue = CommonMethodobj.CommonSaveMethod(val, "/ManageParents", client);
                var PhotoUrl = "";
                if (returnvalue != "0")
                {
                    if ((returnvalue.Contains("Record inserted successfully.") || returnvalue.Contains("Record updated successfully.")))
                    {
                        if (val.PhotoName != null && val.PhotoName != "")
                        {
                            PhotoUrl = $"/ParentPhotos/{val.InstanceID }/{ val.Relationship}/{val.StudentId }/{ val.PhotoName }";
                        }
                        else
                        {
                            PhotoUrl = "/Images/No imageAvailable.gif";
                        }
                        //  PhotoUrl = $"/UserPhotos/{val.InstanceID }/{UserIdForInsert }/{ val.PhotoName }";
                        if (PhotoAvailable)
                        {
                            // PhotoUrl = $"/ParentPhotos/{val.InstanceID }/{ val.Relationship}/{val.StudentId }/{ val.Photo.FileName }";
                            //string path = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/ParentPhotos/{val.InstanceID}/{val.Relationship}/{val.StudentId}");
                            string path = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/ParentPhotos/{val.InstanceID}/{val.Relationship}/{val.StudentId}");

                            if (!Directory.Exists(path))
                                Directory.CreateDirectory(path);

                            string fileNameWithPath = Path.Combine(path, val.Photo.FileName);
                            using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
                            {
                                val.Photo.CopyTo(stream);
                            }
                        }
                    }
                    return Json(new { success = true, message = returnvalue, photoUrl = PhotoUrl });
                }
                else
                {
                    return Json(new { success = false, message = "Something Error" });
                }
            }
            catch (Exception ex)
            {
                string message = ex.Message;
                // throw;
                return Json(new { success = false, message = "Something Error" });
            }
        }


        #endregion

        #region LOGIN PAGE 
        //private int IncrementLoginCount(string username)
        //{

        //    // Retrieve the current login count from the cache
        //    if (_memoryCache.TryGetValue(username, out loginCount))
        //    {
        //        // Increment the login count
        //        loginCount++;
        //    }
        //    else
        //    {
        //        // If the user doesn't have a login count, initialize it to 1
        //        loginCount = 1;
        //    }

        //    // Store the updated login count in the cache
        //    _memoryCache.Set(username, loginCount);

        //    return loginCount; // Return the updated login count
        //}
        //public async Task<string> GetPublicIpAddress()
        //{
        //    using (var client = new HttpClient())
        //    {
        //        var response = await client.GetStringAsync("https://api.ipify.org?format=json");
        //        dynamic result = Newtonsoft.Json.JsonConvert.DeserializeObject(response);
        //        string ipAddress = result.ip;
        //        return ipAddress;
        //    }
        //}

        //public async Task<IActionResult> LoginPage()
        //{
        //    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //    // ViewBag.Layout = "LoginPage";
        //    return View();
        //}

        //[HttpPost]
        //[AllowAnonymous]       
        //public async Task<IActionResult> LoginPage(LoginModel val)
        //{
        //    //try
        //    //{


        //    //installed packeges 
        //    //Microsoft.AspNetCore.Session
        //    //Microsoft.AspNetCore.Authentication.Cookies


        //    // var result = await _signInManager.PasswordSignInAsync(val.Username, val.Password, val.RememberMe, lockoutOnFailure: false);

        //    if (val.Password == null || val.Username == null)
        //    {
        //        //ViewBag.ErrorMessage = "Invalid User ID/Password.";
        //        //ViewBag.Layout = "LoginPage";
        //        //return View();
        //        return Json(0);
        //    }

        //    val.Password = HashUtility.HashData((val.Password).Trim());//this for convert code into Binary code

        //    //  return View();
        //    val.CHK = "False"; //i gave default  . work on this   it is true when pagesubmission . when session exipire

        //    // val.SubDomineName = "DEVELOP.CONNECT4M.COM";//it is temperory using //DATABASE NAME:-Dev_C4MProd
        //    val.SubDomineName = "Quro.connect4m.com";//it is temperory using  //NEW DATABASE Name:C4MProd
        //    //  val.SubDomineName = HtstpContext.Request.Host.Host.ToUpper();

        //    //val.IPAddress = "183.82.116.209";
        //    val.IPAddress = await GetPublicIpAddress();//to get IP address


        //    // val.URL = "http://develop.connect4m.com";
        //    //currentUrl
        //    //val.URL = HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + HttpContext.Request.QueryString;
        //    val.URL = HttpContext.Request.GetDisplayUrl();


        //    val.LoginAttempt = IncrementLoginCount(val.Username);
        //    val.LoginStatus = 1;

        //    List<LoginDetailsListModel> Value2 = new List<LoginDetailsListModel>();
        //    string data = JsonConvert.SerializeObject(val);
        //    StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
        //    HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/LoginPage", content).Result;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data1 = response.Content.ReadAsStringAsync().Result;
        //        Value2 = JsonConvert.DeserializeObject<List<LoginDetailsListModel>>(data1);
        //        if (Value2.Count > 0)
        //        {
        //            if (Value2[0].UserDetailsList.Count > 0 && Value2[0].UserDetailsList.Count > 0)
        //            {
        //                _memoryCache.Set(val.Username, 0);//set a login count is 0 with Username

        //                Response.Cookies.Append("Instanceid", Value2[0].UserDetailsList[0].InstanceID.ToString());
        //                Response.Cookies.Append("LoginUserId", Value2[0].UserDetailsList[0].UserId.ToString());
        //                Response.Cookies.Append("InstanceClassificationId", Value2[0].UserDetailsList[0].InstanceClassificationId.ToString());
        //                Response.Cookies.Append("InstanceSubClassificationId", Value2[0].UserDetailsList[0].InstanceSubClassificationId.ToString());
        //                Response.Cookies.Append("Roleid", Value2[0].UserDetailsList[0].RoleId.ToString());
        //                Response.Cookies.Append("StudentUserid", Value2[0].UserDetailsList[0].StudentUserid.ToString());
        //                Response.Cookies.Append("RoleName", Value2[0].UserDetailsList[0].RoleName.ToString().ToUpper());
        //                Response.Cookies.Append("ThemeName", Value2[0].UserDetailsList[0].ThemeName.ToString());
        //                Response.Cookies.Append("Quote", Value2[0].UserDetailsList[0].Quote.ToString());
        //                //  Response.Cookies.Append("RoleName", Value2[0].UserDetailsList[0].RoleName.ToString());

        //                int DelegationClasses = 1;// This for Arjun

        //                Response.Cookies.Append("DelegationClasses", DelegationClasses.ToString());
        //                Response.Cookies.Append("UserNameHeader_", Value2[0].UserDetailsList[0].FirstName.ToString() + " " + Value2[0].UserDetailsList[0].LastName.ToString()); Response.Cookies.Append("ChangePWOnLogin", Value2[0].UserDetailsList[0].ChangePWOnLogin.ToString());

        //                var claims = new List<Claim>
        //                {
        //                    new Claim(ClaimTypes.Name, val.Username),
        //                    new Claim(ClaimTypes.Role, "Admin")
        //                };

        //                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        //                var authProperties = new AuthenticationProperties
        //                {
        //                    // Set additional properties if needed
        //                };

        //                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity), authProperties);
        //                if (Value2[0]?.UserDetailsList[0]?.ChangePWOnLogin?.ToString() == "1")
        //                {
        //                    return Json("changepassword");
        //                }
        //                else
        //                {
        //                    return Json("correct");
        //                }
        //            }
        //            //else
        //            //{
        //            //    //ViewBag.Layout = "LoginPage";
        //            //    //ViewBag.ErrorMessage = "Invalid User ID/Password.";
        //            //    //return View();
        //            //    return Json(0);
        //            //}
        //        }
        //        //else
        //        //{
        //        //    ViewBag.Layout = "LoginPage";
        //        //    ViewBag.ErrorMessage = "Invalid User ID/Password.";
        //        //    return View();
        //        //}
        //    }
        //    //ViewBag.ErrorMessage = "Invalid User ID/Password.";
        //    //return View();
        //    return Json(0);
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    return Json(0);
        //    //}
        //}

        //public async Task<IActionResult> LogoutPage()
        //{
        //    // await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //    // Redirect to the logout success page or wherever you prefer
        //    //  await HttpContext.SignOutAsync();
        //    // await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //    return RedirectToAction("LoginPage", "Attendance");
        //}

        //public IActionResult AccessDenied()
        //{
        //    return View();
        //}

        //public IActionResult ChangePassword()
        //{
        //    return View();
        //}

        //[HttpPost]
        //public IActionResult ChangePassword(LoginModel val)
        //{
        //    try
        //    {
        //        if (val.Password == null)
        //        {
        //            return Json(0);
        //        }
        //        if (Request.Cookies["ChangePWOnLogin"] != "1")
        //        {
        //            string vals = Request.Cookies["ChangePWOnLogin"];
        //            return Json(1);
        //        }
        //        val.InstanceID = InstanceId;
        //        val.UserId = UserId;
        //        val.CreatedBy = UserId;


        //        if (Request.Cookies["RoleName"] == "PARENT")
        //        {
        //            val.ParentFlag = 1;
        //        }
        //        else
        //        {
        //            val.ParentFlag = 0;
        //        }

        //        val.Password = HashUtility.HashData((val.Password).Trim());//this for convert code into Binary code
        //        returnvalue = CommonMethodobj.CommonSaveMethod(val, "/ChangePassword", client);
        //        if (returnvalue != "0")
        //        {
        //            return Json("correct");
        //        }
        //        else
        //        {
        //            return Json(0);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        string message = ex.Message;
        //        return Json(0);
        //    }
        //}

        #endregion

    }
}
