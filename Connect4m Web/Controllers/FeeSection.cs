using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Connect4m_Web.Models.Attendenceproperites;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static Connect4m_Web.Models.Attendenceproperites.PayFeeCorrection;
using Connect4m_Web.Models.LMSproperties;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Connect4m_Web.Views;

namespace Connect4m_Web.Controllers
{
    [Authorize]

    public class FeeSection : Controller
    {
       // Uri baseAddress = new Uri("https://localhost:44331/api/FeeSctionCtr");
        //Uri baseAddress = new Uri("http://192.168.1.142:98/api/FeeSctionCtr");
      //  HttpClient client;




        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;
        
        private readonly IUserService _userService;

        //==========================================================  Declare The Private Varible for assigning the values from IUserServiceinterface(Read Cookies)
        private readonly int UserId;
        private readonly int InstanceId;
        private readonly int InstanceClassificationId;
        private readonly int Roleid;
        private readonly int StudentUserid;

        public FeeSection(HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/FeeSctionCtr");

            //=======================================================
            _userService = userService;

            InstanceId = _userService.InstanceId;
            UserId = _userService.LoginUserId;
            InstanceClassificationId = _userService.InstanceClassificationId;
            Roleid = _userService.Roleid;
            StudentUserid = _userService.StudentUserid;
        }
        CommanMethodClass CommonMethodobj = new CommanMethodClass();

        #region  MANAGE FEE TYPES

        public IActionResult ManageFeeTypes()
        {  
            return View();
        }

        public IActionResult Bindtblfeetype(string FeeType)
        {
            Feetypes obj = new Feetypes();
            obj.FeeType = FeeType;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<Feetypes> list = CommonMethodobj.CommonListMethod<Feetypes, Feetypes>(obj, "/GetFeetypstbldata", client);
            return Json(list);
        }

        public IActionResult Insert_feetype()
        {
            ConcedingTypes ddlobj = new ConcedingTypes();

            ddlobj.InstanceId = InstanceId;
            List<ConcedingTypes> list = CommonMethodobj.CommonListMethod<ConcedingTypes, ConcedingTypes>(ddlobj, "/BindConcedingDropdown", client); 

            var discountItems = new List<SelectListItem>
            {
                new SelectListItem { Value = "", Text = "--Select--" } // Add the "--Select--" option as the default
            };

            foreach (var item in list)
            {
                discountItems.Add(new SelectListItem { Value = item.ConcedingTypeId.ToString(), Text = item.ConcedingTypeName.ToString() });
            }
            ViewBag.ConcedingTypes = new SelectList(discountItems, "Value", "Text");

            return View();
        }

        [HttpPost]
        public IActionResult Insert_feetype(Feetypes obj)
        {
            decimal amount = Convert.ToDecimal(obj.Amount);

            string concdingIds = "";
            if (obj.ConcedingtypeIds != null)
            {
                if (obj.ConcedingtypeIds.Count > 0)
                {
                    concdingIds = string.Join(",", obj.ConcedingtypeIds);
                }    
            }

            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.Amount = amount;
            obj.Concedingtypeid = concdingIds;

            string Returnvalue = CommonInsertingMethod(obj, "/Insertfeetypes");
            return Json(Returnvalue);
        }

        [HttpGet]
        public IActionResult FeeType_Edit(int Feetypeid)
        {
            Feetypes editobj = new Feetypes();
            ConcedingTypes ddlobj = new ConcedingTypes();

            editobj.Feetypeid = Feetypeid;
            editobj.InstanceId = InstanceId;
            ddlobj.InstanceId = InstanceId;
            List<Feetypes> model = CommonMethodobj.CommonListMethod<Feetypes, Feetypes>(editobj, "/Editfeetypes", client);          

            var filteredRows = model.GroupBy(r => r.Feetypeid).SelectMany(g => g.GroupBy(r => r.Concedingtypeid)
                                    .Select(grp => grp.First())).ToList();

            // Extract unique Concedingtypeid values from the filtered rows
            List<string> uniqueConcedingTypeIds = filteredRows.Select(r => r.Concedingtypeid).Distinct().ToList();
            List<(string Id, string Name)> uniqueConcedingTypes = filteredRows.Select(r => (Id: r.Concedingtypeid, Name: r.Concedingtypename)).Distinct().ToList();


            List<ConcedingTypes> list = new List<ConcedingTypes>();
            list = CommonMethodobj.CommonListMethod<ConcedingTypes, ConcedingTypes>(ddlobj, "/BindConcedingDropdown", client);

            var discountItems = new List<SelectListItem>
            {
                new SelectListItem { Value = "", Text = "--Select--" } // Add the "--Select--" option as the default
            };
            foreach (var item in list)
            {
                discountItems.Add(new SelectListItem { Value = item.ConcedingTypeId.ToString(), Text = item.ConcedingTypeName.ToString() });
            }

            ViewBag.ConcedingTypes = new SelectList(discountItems, "Value", "Text");
            ViewBag.filteredRows = filteredRows;
            ViewBag.UniqueConcedingTypeIds = uniqueConcedingTypes;
          
            return View();
        }

        [HttpPost] //FeeType_Edit
        public IActionResult FeeTypeUpdate(Feetypes obj)
        {
            decimal amount = Convert.ToDecimal(obj.Amount);

            string concdingIds = "";
            if (obj.ConcedingtypeIds != null)
            {
                if (obj.ConcedingtypeIds.Count > 0)
                {
                    concdingIds = string.Join(",", obj.ConcedingtypeIds);
                }
            }

            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.Amount = amount;
            obj.Concedingtypeid = concdingIds;

            string Returnvalue = CommonInsertingMethod(obj, "/Updatefeetype");
            return Json(Returnvalue);
        }

        public IActionResult Deletefeetype(Feetypes obj)
        {
            obj.InstanceId=InstanceId;
            string Returnvalue = CommonInsertingMethod(obj, "/Deletefeetype");
            return Json(Returnvalue);
        }

        #endregion


        /*--------------------------------- MANAGE DISCOUNT FEE TYPES CODE START---------------------------------------*/
        #region  MANAGE DISCOUNT FEE TYPES
        public IActionResult ManageFeeConcedingTypes()
        {
            return View();
        }


        [HttpPost]
        public ActionResult ManageFeeConcedingTypes(string ConcedingTypeName,decimal amount, string Description)
        {   
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManageCreateDiscountType?InstanceId=" + InstanceId + "&ConcedingTypeName=" + ConcedingTypeName + "&Description=" + Description + "&Amount=" + amount + "&CreatedBy=" + UserId, content).Result;
                        
            var items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }           
            return Json(items);
        }

        /*--------------------------------MANAGE DISCOUNT FEE TYPE ACTION METHODS START-----------------------------------*/

        [HttpGet]
        public IActionResult DiscountFT_Edit(int ConcedingTypeId)
        {
            FeeConcedingTypes item = null;
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/DicountFee_Type_EditGet?ConcedingTypeId=" + ConcedingTypeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<FeeConcedingTypes>(data);
            }
            return Json(item);
        }

        [HttpPost]
        //public IActionResult DiscountFT_Edit(Fee_Section obj)
        ////exec stp_tblFeeConcedingTypes_UPDATE @ConcedingTypeId=2997,@InstanceId=545,@ConcedingTypeName='Staff chilldren dico',@Amount=$0.0000,@Description=default,@UpdatedBy=32891,@UpdatedDate='2024-01-30 10:27:27.253'

        public IActionResult DiscountFT_Edit(int ConcedingTypeId,string ConcedingTypeName,decimal Amount,string Description)
        {
            //var UpdatedBy = Request.Cookies["LoginUserId"];
            //exec stp_tblFeeConcedingTypes_UPDATE @ConcedingTypeId = 1970,@InstanceId = 545,@ConcedingTypeName = 'TestDiscount',@Amount =$150.0000,@Description = 'ABCD bc',@UpdatedBy = 217606,@UpdatedDate = '2023-07-14 14:43:30.390'
            //decimal amount = Convert.ToDecimal(obj.Amount);
            //string data1 = JsonConvert.SerializeObject(obj);

            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/DicountFee_Type_EditUpdate?ConcedingTypeId=" + ConcedingTypeId + "&InstanceId=" + InstanceId + "&ConcedingTypeName=" + ConcedingTypeName + "&Amount=" + Amount + "&Description=" + Description + "&UpdatedBy=" + UserId, content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(items);
        }

        public IActionResult Tbl_FeeConcedingTypes(string ConcedingTypeName)
        {           

            List<FeeConcedingTypes> DiscountLi = new List<FeeConcedingTypes>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/ManageDiscountType_Tbl?InstanceId=" + InstanceId + "&ConcedingTypeName=" + ConcedingTypeName).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                DiscountLi = JsonConvert.DeserializeObject<List<FeeConcedingTypes>>(data);
            }
           // ViewBag.DiscountCount = DiscountLi.Count();
           // ViewBag.Discount = DiscountLi;
            //return View();
           // return new JsonResult(ViewBag.Discount);
            return Json(DiscountLi);
        }


        public IActionResult Delete_Manage_FeeDisountType(int ConcedingTypeId)
        {
            //var InstanceId = Request.Cookies["INSTANCEID"];
            HttpResponseMessage response = client.DeleteAsync(client.BaseAddress + "/Delete_Discount_FeeType?InstanceId=" + InstanceId + "&ConcedingTypeId=" + ConcedingTypeId).Result;
            string result = "";
            if (response.IsSuccessStatusCode)
            {
                string Data = response.Content.ReadAsStringAsync().Result;
                result = JsonConvert.DeserializeObject<string>(Data);
            }

            return Json(result);
        }
        /*--------------------------------MANAGE DISCOUNT FEE TYPE ACTION METHODS END------------------------------*/
        #endregion

        #region MANAGE FEE TERMS        

        [HttpGet]
        public IActionResult ManageFeeTerms()
        {            
            return View();
        }
        public IActionResult GetAcadamicyeardd()
        {
            List<SelectListItem> AcYear = new List<SelectListItem>();
            HttpResponseMessage YearResponse = client.GetAsync(client.BaseAddress + "/AcademicYear_GETTYPES?InstanceId=" + InstanceId).Result;
            if (YearResponse.IsSuccessStatusCode)
            {
                string Yearsdata = YearResponse.Content.ReadAsStringAsync().Result;
                AcYear = JsonConvert.DeserializeObject<List<SelectListItem>>(Yearsdata);
            }
            //ViewBag.AcadamicYearDD = AcYear;
            return Json(AcYear);
        }
        public IActionResult Getfeetypesdd()
        {
            List<SelectListItem> feetypesli = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/FeeTypes_GETTypes?InstanceId=" + InstanceId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Yearsdata = Response.Content.ReadAsStringAsync().Result;
                feetypesli = JsonConvert.DeserializeObject<List<SelectListItem>>(Yearsdata);
            }

            return Json(feetypesli);
        }

        public IActionResult Bindtblfeeterm(Feeterms OBJS)
        {
            Feeterms obj = new Feeterms();
            obj.TermName = OBJS.TermName;
            obj.AcademicYearId = OBJS.AcademicYearId;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

            List<Feeterms> list = CommonMethodobj.CommonListMethod<Feeterms, Feeterms>(obj, "/GetFeetermstbldata", client);
            return Json(list);
        }
        
        public IActionResult Insert_feeterms()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Insert_feeterms(Feeterms obj)
        {
            //decimal amount = Convert.ToDecimal(obj.Amount);

            string FeeTypeIds = "";
            if (obj.FeeTypeIds != null)
            {
                if (obj.FeeTypeIds.Count > 0)
                {
                    FeeTypeIds = string.Join(",", obj.FeeTypeIds);
                }
            }
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.FeeType = FeeTypeIds;

            string Returnvalue = CommonInsertingMethod(obj, "/Insertfeeterms");
            return Json(Returnvalue);
        }

        [HttpGet]
        public IActionResult FeeTerm_Edit(int FeeTermId)
        {
            Feeterms editobj = new Feeterms();
            Feetypesddl ddlobj = new Feetypesddl();
            AcademicYearddl AcademicYearddl = new AcademicYearddl();

            editobj.FeeTermId = FeeTermId;
            editobj.InstanceId = InstanceId;
            ddlobj.InstanceId = InstanceId;
            AcademicYearddl.InstanceId = InstanceId;
            List<Feeterms> model = CommonMethodobj.CommonListMethod<Feeterms, Feeterms>(editobj, "/Editfeeterms", client);

            var filteredRows = model.GroupBy(r => r.FeeTermId).SelectMany(g => g.GroupBy(r => r.FeeTypeId)
                                    .Select(grp => grp.First())).ToList();

            var filteredRow = model.GroupBy(r => r.FeeTermId).SelectMany(g => g.GroupBy(r => r.FeeTypeId).Select(grp => grp.First())).ToList();
            List<string> uniqueFeeTypeIds = filteredRow.Select(r => r.FeeTypeId).Distinct().ToList();
            List<(string Id, string Name)> uniqueFeeTypes = filteredRows.Select(r => (Id: r.FeeTypeId, Name: r.FeeType)).Distinct().ToList();

            
            
            List<Feetypesddl> list = new List<Feetypesddl>();
            list = CommonMethodobj.CommonListMethod<Feetypesddl, Feetypesddl>(ddlobj, "/BindFeetypeDropdown", client);

            var discountItems = new List<SelectListItem>
            {
                new SelectListItem { Value = "", Text = "--Select--" } // Add the "--Select--" option as the default
            };
            foreach (var item in list)
            {
                discountItems.Add(new SelectListItem { Value = item.FeetypeId.ToString(), Text = item.Feetype.ToString() });
            }

            List<AcademicYearddl> Acylist = new List<AcademicYearddl>();
            Acylist = CommonMethodobj.CommonListMethod<AcademicYearddl, AcademicYearddl>(AcademicYearddl, "/BindacademicDropdown", client);

            var AcademicyearItems = new List<SelectListItem>
            {
                new SelectListItem { Value = "", Text = "--Select--" } // Add the "--Select--" option as the default
            };

            foreach (var item in Acylist)
            {
                AcademicyearItems.Add(new SelectListItem { Value = item.AcademicYearId.ToString(), Text = item.Years.ToString() });
            }




            ViewBag.Feetype = new SelectList(discountItems, "Value", "Text");
            ViewBag.filteredRows = filteredRows;
            ViewBag.UniqueConcedingTypeIds = uniqueFeeTypes;
            ViewBag.AcademicyearItems = AcademicyearItems;
            ViewBag.modellist = model;

            return View();
        }

        [HttpPost] 
        public IActionResult FeeTermUpdate(Feeterms obj)
        {
            string FeeTypeIds = "";
            if (obj.FeeTypeIds != null)
            {
                if (obj.FeeTypeIds.Count > 0)
                {
                    FeeTypeIds = string.Join(",", obj.FeeTypeIds);
                }
            }
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.FeeType = FeeTypeIds;

            string Returnvalue = CommonInsertingMethod(obj, "/Updatefeeterms");
            return Json(Returnvalue);
        }

        public IActionResult Deletefeeterm(Feeterms obj)
        {
            obj.InstanceId = InstanceId;
            string Returnvalue = CommonInsertingMethod(obj, "/Deletefeeterm");
            return Json(Returnvalue);
        }
         
        #endregion








        #region  MANAGE BANK ACCOUNTS
        public IActionResult ManageBankAccounts()//Manage_Bank_Accounts
        {
            return View();
        }
             
        public IActionResult M_N_A_Tbl(Manage_Bank_accounts obj)
        {   
            List<Manage_Bank_accounts> DiscountLi = new List<Manage_Bank_accounts>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/ManageBankAccounts_Tbl?InstanceId=" + InstanceId + "&AccountNumber=" + obj.AccountNumber + "&BankName=" + obj.BankName).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                DiscountLi = JsonConvert.DeserializeObject<List<Manage_Bank_accounts>>(data);
            }       
            return Json(DiscountLi);
        }

        [HttpPost]
        public IActionResult Bank_account_Delete(int BankAccountId)
        {  
            HttpResponseMessage response = client.DeleteAsync(client.BaseAddress + "/Delete_BankAccounts?InstanceId=" + InstanceId + "&BankAccountId=" + BankAccountId).Result;
            string result = "";
            if (response.IsSuccessStatusCode)
            {
                string Data = response.Content.ReadAsStringAsync().Result;
                result = JsonConvert.DeserializeObject<string>(Data);
            }
            return Json(result);
        }

        [HttpGet]
        public IActionResult Bank_Account_EditGet(int BankAccountId)
        {
            Manage_Bank_accounts item = null;

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ManageBankAccount_EditGet?BankAccountId=" + BankAccountId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<Manage_Bank_accounts>(data);
            }

            return Json(item);
        }

        [HttpPost]       
        public IActionResult ManageBankAccount_EditUpdate(int BankAccountId,string BankName, string AccountNumber, string Branchcode, string IFSCCode, string Address, string Description)      
        {       
           
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManageBankAccount_EditUpdate?InstanceId=" + InstanceId + "&BankAccountId=" + BankAccountId + "&AccountNumber=" + AccountNumber + "&Address=" + Address + "&BranchCode=" + Branchcode + "&IFCcode=" + IFSCCode + "&BankName=" + BankName + "&Description=" + Description + "&UpdatedBy=" + UserId, content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);
        }

        [HttpPost]
        public IActionResult ManageBankAccounts(string BankName, string AccountNumber, string Branchcode, string IFSCCode, string Address, string Description)
        {
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/New_BankAccounts_Create?InstanceId=" + InstanceId + "&AccountNumber=" + AccountNumber + "&BranchCode=" + Branchcode + "&IFCcode=" + IFSCCode + "&BankName=" + BankName + "&Address=" + Address + "&Description=" + Description + "&CreatedBy=" + UserId, content).Result;
            var data2 = "";
            var items = "";
            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(items);
        }

        #endregion




        /*==========================SET FEE FOR USERS ACTION METHOD  START==================================*/
        #region SET FEE FOR USERS
        public IActionResult ManageFeeDetails()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;


            var CreatedBy = Request.Cookies["LoginUserId"];
            ViewBag.Updatedby = CreatedBy;

            return View();
        }


        [HttpPost]
        public IActionResult ManageFeeDetails(string datalists)
        {

            try
            {
                // Serialize the list of User_FeeDetails to JSON
                string jsonData = JsonConvert.SerializeObject(datalists);

                // Create a StringContent with the serialized JSON
                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Make the POST request to the Web API
                HttpResponseMessage response = client.PostAsync("/api/FeeSctionCtr/MFD_Fee_set_Users_Insert_data", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data2 = response.Content.ReadAsStringAsync().Result;
                    return Json(data2);
                }

                return Json(new { success = false, message = "Request failed" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return Json(new { success = false, error = ex.Message });
            }


        }

        [HttpPost]
        public IActionResult DiscountAMount_ManageFeeDetails(string Discount_Amount_Users_Details)
        {
            string jsonData = JsonConvert.SerializeObject(Discount_Amount_Users_Details);
            string data2 = "";
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync("/api/FeeSctionCtr/MFD_Discount_Fee_set_Users_Insert_data", content).Result;
            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
            }
            return Json(data2);

        }

        [HttpPost]
        public IActionResult Fee_Set_Users_GetFormBtn_click_TblDt(ManageFeeDetails obj)
        {

            var feeTypeCheckedTextNamesJson = Request.Form["FeeType_CheckedTextNames"];
            var feeTypeCheckedFeetypeidsJson = Request.Form["FeeTypeCheckedFeetypeids"];
            var feeTypeCheckedTextNames = JsonConvert.DeserializeObject<List<string>>(feeTypeCheckedTextNamesJson);
            var feeTypeCheckedFeetypeids = JsonConvert.DeserializeObject<List<string>>(feeTypeCheckedFeetypeidsJson);



            List<ManageFeeDetails> DiscountLi = new List<ManageFeeDetails>();

            ViewBag.FeeSet_Discoount_Users = obj.Discount_CheckBoxValue;

            var queryString = $"?InstanceId={obj.InstanceId}&ClassificationId={obj.InstanceClassificationId}&SubClassificationId={obj.InstanceSubClassificationId}&RoleId={obj.InstanceRoleId}&UserIds={obj.UserIds}&FeeTypeids={obj.FeeTypeids}&AcademicYearId={obj.AcademicYearId}&FeeTermId={obj.FeeTermId}&Discount_CheckBoxValue={obj.Discount_CheckBoxValue}";



            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fee_set_UserTable_data_Get" + queryString).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                DiscountLi = JsonConvert.DeserializeObject<List<ManageFeeDetails>>(data);
            }

            FeeDetailsViewModel viewModel = new FeeDetailsViewModel
            {
                UsersList = DiscountLi,
                FeeTypeCheckedTextNames = feeTypeCheckedTextNames,
                FeeTypeCheckedFeetypeids = feeTypeCheckedFeetypeids
            };

            ViewBag.FT_Tbl = DiscountLi;
            if (obj.Discount_CheckBoxValue == "1432_Arjun")
            {
                return PartialView("_Fee_Set_DiscountUsers_GetFormBtn_click_TblDt", viewModel);
            }
            else
            {
                return PartialView("_Fee_Set_Users_GetFormBtn_click_TblDt", viewModel);
            }


        }

        /*----IN Table Discount Type Click Fire This Action Method & Return This Discount Amount TextBox Value Action Method Start----*/
        public IActionResult DiscountType_By_DiscountAmount_DD(string ConcedingTypeId)
        {

            List<DiscountAmount_DD> items = new List<DiscountAmount_DD>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/DicountType_By_DiscountAmt?ConcedingTypeId=" + ConcedingTypeId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<DiscountAmount_DD>>(data);
            }
            if (items.Count > 0)
            {
                var AmountTXT = items[0].Amount; // Assuming you want the Amount from the first item in the list
                return Json(new { Amount = AmountTXT });
            }
            return Json(new { Amount = 0 });

        }
        /*----IN Table Discount Type Click Fire This Action Method & Return This Discount Amount TextBox Value Action Method End----*/

        public IActionResult Role_DD(int InstanceId)
        {
            List<SelectListItem> MFD_ROLEDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_RoleDD?InstanceId=" + InstanceId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_ROLEDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.RoleDD_Data = MFD_ROLEDD_li;

            return Json(ViewBag.RoleDD_Data);
        }



        public IActionResult Department_DD(int InstanceId)
        {
            List<SelectListItem> MFD_DepartmentDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_DepartmentDD?InstanceId=" + InstanceId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_DepartmentDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_DepartmentDD_Data = MFD_DepartmentDD_li;

            return Json(ViewBag.MFD_DepartmentDD_Data);
        }

        public IActionResult Class_DD(int InstanceId, int InstanceClassificationId)
        {
            List<SelectListItem> MFD_ClassDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_ClassDD?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_ClassDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_Class_Data = MFD_ClassDD_li;

            return Json(ViewBag.MFD_Class_Data);
        }

        public IActionResult Referral_DD(int InstanceId)//Referral
        {
            List<SelectListItem> MFD_ReferralDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_ReferralDD?InstanceId=" + InstanceId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_ReferralDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_DepartmentDD_Data = MFD_ReferralDD_li;

            return Json(ViewBag.MFD_DepartmentDD_Data);
        }
        public IActionResult AcademicYear_DD(int InstanceId)//Referral
        {
            List<SelectListItem> MFD_AcademicYearDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_AcademicYearDD?InstanceId=" + InstanceId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_AcademicYearDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_AcademicYearDD_Data = MFD_AcademicYearDD_li;

            return Json(ViewBag.MFD_AcademicYearDD_Data);
        }

        public IActionResult FeeTerm_DD(int InstanceId, int AcademicYearId)
        {
            List<SelectListItem> MFD_FeeTermDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_FeeTermDD?InstanceId=" + InstanceId + "&AcademicYearId=" + AcademicYearId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_FeeTermDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_FeeTerm_Data = MFD_FeeTermDD_li;

            return Json(ViewBag.MFD_FeeTerm_Data);
        }

        public IActionResult FeeType_DD(int InstanceId, int AcademicYearId, int FeeTermId)
        {
            List<SelectListItem> MFD_FeeTypeDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_FeeTypeDD?InstanceId=" + InstanceId + "&AcademicYearId=" + AcademicYearId + "&FeeTermId=" + FeeTermId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_FeeTypeDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_FeeType_Data = MFD_FeeTypeDD_li;

            return Json(ViewBag.MFD_FeeType_Data);
        }
        public IActionResult Users_DD(int InstanceId, int InstanceClassificationId, int InstanceSubClassificationId, int RoleId)
        {


            //exec stp_tblUser_SEARCHSTUDENTSFORFEE @InstanceId=545,@InstanceClassificationId=806,@InstanceSubClassificationId=1172,@RoleId=775

            List<userDropdown> MFD_UsersDD_li = new List<userDropdown>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_UsersDD?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&RoleId=" + RoleId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_UsersDD_li = JsonConvert.DeserializeObject<List<userDropdown>>(Sub_DD_Data);
            }
            ViewBag.MFD_Users_Data = MFD_UsersDD_li;

            return Json(ViewBag.MFD_Users_Data);
        }

        #endregion

        /*==========================SET FEE FOR USERS ACTION METHOD  END==================================*/


        #region Payfeeforuser
        public IActionResult PayFeeForUsers()
        {
            return View();
        }
        public IActionResult Pfudepartmentdd()
        { 
            List<SelectListItem> ddli = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfudepartmentddl?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string DD_Data = response.Content.ReadAsStringAsync().Result;
                ddli = JsonConvert.DeserializeObject<List<SelectListItem>>(DD_Data);
            }
            return Json(ddli);
        }
        public IActionResult PfuStudentquota()
        {  
            List<SelectListItem> SQddli= new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFU_StudentQuota_GetDD?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string SQuota_DD_Data = response.Content.ReadAsStringAsync().Result;
                SQddli = JsonConvert.DeserializeObject<List<SelectListItem>>(SQuota_DD_Data);
            } 
            return Json(SQddli);
        }
        public IActionResult Pfubankaccountsdd()
        {
            //exec stp_tblInstanceBankAccounts_SELECTALL @InstanceId=545

            List<SelectListItem> ddli = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/pfubankaccountsddl?InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                ddli = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }      
            return Json(ddli);
        }
        public IActionResult PfuPaymentdd()
        {    
            List<SelectListItem> ddli = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/pfuPaymentmodeddl").Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                ddli = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(ddli);
        }
        //PFU_PaymentMode_DD

        public IActionResult PfuSubClass(int InstanceClassificationId)
        {
            List<SelectListItem> Cli= new List<SelectListItem>();
            HttpResponseMessage Clresponse = client.GetAsync(client.BaseAddress + "/Pfusubclass?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (Clresponse.IsSuccessStatusCode)
            {
                string Sub_DD_Data = Clresponse.Content.ReadAsStringAsync().Result;
                Cli = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }   
            return Json(Cli);
        }

        public IActionResult Payfeeforuserssearchtbl(Userpayfee obj)
        {
            List<Payfeebyuserstbl> items = new List<Payfeebyuserstbl>();
            try
            {
                obj.InstanceId = InstanceId;
                string data1 = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Pfusearchusers", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data2 = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<Payfeebyuserstbl>>(data2);
                }
                return Json(items);
            }
            catch (Exception)
            {
                return Json(items);
            }
        }


        [HttpGet]
        public IActionResult Getfeedetailsbyuser(int UserId)
        {
            List<GetUserfeedetails> item = null;
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfufeedetailsforusers?UserId=" + UserId + "&InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<GetUserfeedetails>>(data);
            }
            return Json(item);
        }

        public IActionResult Getfeedetailsbyfeeterms(int UserId, string FeeTermIds)
        {
            List<GetUserfeedetails> item = null;
            if (FeeTermIds == "null")
            {
                FeeTermIds = default;
            }
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Termwisesearchfeedetails?UserId=" + UserId + "&InstanceId=" + InstanceId+ "&FeeTermIds="+ FeeTermIds).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<GetUserfeedetails>>(data);
            }
            return Json(item);
        }
        public IActionResult Pfufeetermbyfeetype(int FeeTermId)
        {  
            //exec stp_tblFeeTerms_SELECTALLByAcadamicYearId @InstanceId=545

            List<SelectListItem> feetypelist= new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Pfufeetermbyfeetypedd?InstanceId=" + InstanceId + "&FeeTermId=" + FeeTermId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                feetypelist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            } 
            return Json(feetypelist);
        }

        public IActionResult Pfufeetypebydiscountdd(int FeeTypeId)
        {
            List<DiscountAndQuantitylist> list = new List<DiscountAndQuantitylist>();         
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PfuDiscounttypebyfeetype?InstanceId=" + InstanceId + "&FeeTypeId=" + FeeTypeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;

                list = JsonConvert.DeserializeObject<List<DiscountAndQuantitylist>>(data1);              
            }           
            return Json(list);
        }
        public IActionResult pfudiscounttypebydiscountamount(int ConcedingTypeId)            
        {            
            List<SelectListItem> list = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Discounttypebydiscountamount?InstanceId=" + InstanceId + "&ConcedingTypeId=" + ConcedingTypeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }    
            return Json(list); 
        }

        [HttpPost]
        public IActionResult Pfuuserfee_BulkUpdate(Feeupdateinpayfeeforusers obj)       
        {
            var items = "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Pfuuserfeebulkupdate", content).Result;
            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(items);           
        }

        [HttpPost]
        public IActionResult Pfuuserfeeinstallment(Feeinstallmentsinsert obj)    //(PAY_FEE_BY_USERS obj)//PFU_AmountPay_Recipt
        {
            obj.CreatedBy = UserId;
            obj.InstanceId = InstanceId;
            obj.PaymentDate = DateTime.Now;         

           

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Pfufeeinstallmentsinsert", content).Result;
            FeeInstallmentResult items = new FeeInstallmentResult();
           

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<FeeInstallmentResult>(data2);
            }
            int returnmessage= int.Parse(items.Insertretunmessage);
            //string returnmessage=items.Insertretunmessage;
            int ReceiptNo =int.Parse(items.ReceiptNo);

            List<ChallanaDetails> limodel = new List<ChallanaDetails>();

            limodel.Add(new ChallanaDetails
            {

                //Item = item,
                Challana_TermName = obj.Challana_TermName,                            //1  "Challana_TermName",              
                Challana_FeeType = obj.Challana_FeeType,                              //2  "Challana_FeeType",               
                Challana_FeeAmount = double.Parse(obj.Challana_FeeAmount),                          //3  "Challana_FeeAmount",             
                Challana_DiscountType = obj.Challana_DiscountType,                    //4  "Challana_DiscountType",          
                Challana_DiscountAmount = obj.Challana_DiscountAmount,                //5  "Challana_DiscountAmount",        
                Challana_PaidAmount = obj.Challana_PaidAmount,
                Challana_PayingAmount = double.Parse(obj.Challana_PayingAmount),//6  "Challana_PaidAmount",            

                Challana_DueAmount = obj.Challana_DueAmount,                          //7  "Challana_PayingAmount",----          
                Challana_BalanceDue = double.Parse(obj.Challana_BalanceDue),                        //8  "Challana_DueAmount",             
                Challana_DueDate = obj.Challana_DueDate,                              //9  "Challana_BalanceDue",            
                Challana_UserRegId = obj.Challana_UserRegId,                          //10 "Challana_DueDate",               
                Challana_ClassificationName = obj.Challana_ClassificationName,        //11 "Challana_UserRegId",             
                Challana_subclassificationName = obj.Challana_subclassificationName,  //12 "Challana_ClassificationName",    
                Description = obj.Description,
                Challana_UserName = obj.Challana_UserName,                             //13 "Challana_subclassificationName", 
                ReturnStringValue = returnmessage,

            });

            //return Json(item);
            //dlete partial view();
            return PartialView("_Installmentreceipt", limodel);
            //return PartialView("_PFU_AmountPay_Recipt", limodel);

        }

        [HttpGet]
        public IActionResult Pfusingleuserpaidamount_edit(Feedetaisledit obj)
        {
            List<Feedetaisleditupdateproperties> item = new List<Feedetaisleditupdateproperties>();
            try
            {
            string data1 = JsonConvert.SerializeObject(obj);

            //exec stp_tblFeeInstallments_GetFeeDetialsByUserFeeId @UserId=80781,@FeeTermId=4582,@UserFeeId1=417163
           
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetPfusingleuserpaidamountedit?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;            
            
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Feedetaisleditupdateproperties>>(data);
            }           
                ViewBag.itemscount = item.Count();
                return PartialView("_PFU_PaidAmount_Edit_SingleUser", item);
            }
            catch (Exception)
            {
               
                return PartialView("_PFU_PaidAmount_Edit_SingleUser", item);
                throw;
            }
          
        }
        [HttpGet]
        public IActionResult PfusingleuserpaidamountSearchicon(Feedetaisledit obj)
        {
            List<Feedetaisleditupdateproperties> item = new List<Feedetaisleditupdateproperties>();
            try
            {
                string data1 = JsonConvert.SerializeObject(obj);

                //exec stp_tblFeeInstallments_GetFeeDetialsByUserFeeId @UserId=80781,@FeeTermId=4582,@UserFeeId1=417163

                StringContent content = new StringContent("", Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetPfusingleuserpaidamountedit?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    item = JsonConvert.DeserializeObject<List<Feedetaisleditupdateproperties>>(data);
                }
                return Json(item);
            }
            catch (Exception)
            {
                return Json(item);
                throw;
            }

        }

        [HttpPost]
        public IActionResult Pfusingleuserfeeinstallment(string UpdateData, string ChallanDetails)//PFU_FeeInstallments_BulkFeeUPDATE
        {
            //_PFU_PaidAmount_Edit_SingleUser Partial view means updating table
            //_PFU_FeeInstallments_BulkFeeUPDATE Partial view means Challan report view table

            string data1 = JsonConvert.SerializeObject(UpdateData);
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFU_FeeInstallments_BulkFeeUpdate_By_Users?UpdateData=" + UpdateData + "&InstanceId=" + InstanceId + "&UpdatedBy=" + UserId, content).Result;
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Pfufeeinstallmentsupdatebyusers?UpdateData=" + UpdateData + "&InstanceId=" + InstanceId + "&UpdatedBy=" + UserId, content).Result;

            var items = "";

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            if (items == "1")
            {
                var challanaDetailsList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<dynamic>>(ChallanDetails);

                ViewBag.ChallanDetails = challanaDetailsList;
                return PartialView("_PFU_FeeInstallments_BulkFeeUPDATE");

            }
            else if (items == "-2")
            {
                ViewBag.ErrorMessage = "Entered Amount is Exceeding the Fee Amount,Please Verify the Amount. ";
                return PartialView("_PFU_PaidAmount_Edit_SingleUser", ViewBag.ErrorMessage);
            }
            else
            {
                ViewBag.ErrorMessage = " Something Went Wrong Please Try Again.........!";
            }
            return PartialView("_PFU_PaidAmount_Edit_SingleUser");
        }



        #endregion

        #region PAY FEE  CORRECTIONS // PayFeeForUserForChallan
        public IActionResult PayFeeForUserForChallan()
        {
            //var InstanceId = Request.Cookies["INSTANCEID"];
            //ViewBag.InstanceId = InstanceId;
            return View();
        }

        //public IActionResult PFUC_Classification_DD()
        //{
        //    var InstanceId = Request.Cookies["INSTANCEID"];

        //    List<SelectListItem> PFU_Cl_DD = new List<SelectListItem>();
        //    HttpResponseMessage ClS_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_Classification_GetDD?InstanceId=" + InstanceId).Result;
        //    if (ClS_DD_Response.IsSuccessStatusCode)
        //    {
        //        string DD_Data = ClS_DD_Response.Content.ReadAsStringAsync().Result;
        //        PFU_Cl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(DD_Data);
        //    }
        //    ViewBag.AcadamicYearDD = PFU_Cl_DD;

        //    return Json(ViewBag.AcadamicYearDD);

        //}

        //public IActionResult PFC_challanaddl(string Userid)
        //{
        //    var InstanceId = Request.Cookies["INSTANCEID"];

        //    List<PAY_FEE_CORRECTIONS_BY_USERS> items = new List<PAY_FEE_CORRECTIONS_BY_USERS>();
        //    HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/PFC_Challana_DD?InstanceId=" + InstanceId + "&Userid=" + Userid).Result;
        //    if (SubCl_GetByCl_DD_Response.IsSuccessStatusCode)
        //    {
        //        string Sub_DD_Data = SubCl_GetByCl_DD_Response.Content.ReadAsStringAsync().Result;
        //        items = JsonConvert.DeserializeObject<List<PAY_FEE_CORRECTIONS_BY_USERS>>(Sub_DD_Data);
        //    }
        //    ViewBag.Subdd_Data = items;

        //    return Json(items);
        //}

        //public IActionResult PFC_tblFeeTerms_Challana_DD(string Userid)
        //{
        //    var InstanceId = Request.Cookies["INSTANCEID"];

        //    List<PAY_FEE_CORRECTIONS_BY_USERS> items = new List<PAY_FEE_CORRECTIONS_BY_USERS>();
        //    HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/PFC_Challana_DD?InstanceId=" + InstanceId + "&Userid=" + Userid).Result;
        //    if (SubCl_GetByCl_DD_Response.IsSuccessStatusCode)
        //    {
        //        string Sub_DD_Data = SubCl_GetByCl_DD_Response.Content.ReadAsStringAsync().Result;
        //        items = JsonConvert.DeserializeObject<List<PAY_FEE_CORRECTIONS_BY_USERS>>(Sub_DD_Data);
        //    }
        //    ViewBag.Subdd_Data = items;

        //    return Json(items);
        //}

        [HttpPost]
        public IActionResult PayFeeForUserForChallan(Userpayfee obj)//PAY_FEE_CORRECTIONS_BY_USERS
        {
            //List<PAY_FEE_CORRECTIONS_BY_USERS> items = new List<PAY_FEE_CORRECTIONS_BY_USERS>();
            //exec stp_tblUser_SEARCHUSERSFORPAYFEE @InstanceId=545,@UserName='',@FirstName='',@LastName='',@InstanceUserCode='',@PortalEmail='',@ParentName='',@MobilePhone='',@InstanceClassificationId=806,@InstanceSubClassificationId=1172,@StudentQuota=default
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ForPayFeeCorrections_SearchUsers", content).Result; delete this method after

            List<Payfeebyuserstbl> items = new List<Payfeebyuserstbl>();
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Pfusearchusers", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<Payfeebyuserstbl>>(data2);
            }
            return Json(items);
        }

        public IActionResult Pfcuserwisefeedetails(int UserId) 
        {
            PFCfeedetailstbl itesmode = new PFCfeedetailstbl();
            
            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFC_FeeTermDetials_ByUserId_Get?UserId=" + UserId + "&InstanceId=" + InstanceId).Result;
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfcuserwisefedetailsedit?UserId=" + UserId + "&InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                itesmode = JsonConvert.DeserializeObject<PFCfeedetailstbl>(data);
            }
            return Json(itesmode);
        } 
        
        [HttpGet]
        public IActionResult PFC_GetFeeTermDetialsByUserId(int UserId)
        {
            //var InstanceId = Request.Cookies["INSTANCEID"];
            List<PAY_FEE_CORRECTIONS_BY_USERS_Tbl1> item = null;
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFC_FeeTermDetials_ByUserId_Get?UserId=" + UserId + "&InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<PAY_FEE_CORRECTIONS_BY_USERS_Tbl1>>(data);
            }
            return Json(item);
        }



        public IActionResult PFCfeedetails_byfeetermstableData(int UserId, string FeeTermIds)
        {
            if (FeeTermIds == "null")
            {
                FeeTermIds = default;
            }
            PFCfeedetailstbl Items = new PFCfeedetailstbl();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFC_SearchUserByTableData?UserId=" + UserId + "&FeeTermIds=" + FeeTermIds + "&InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Items = JsonConvert.DeserializeObject<PFCfeedetailstbl>(data);
            }

            return Json(Items);

        }
        /*-Search Icon Click Show New Window -*/
        [HttpGet]
        //public IActionResult PFUC_PaidAmount_Edit_User(PAY_FEE_BY_USERS obj)
        public IActionResult PFUC_PaidAmount_Edit_User(Feedetaisledit obj)
        {
            List<Feedetaisleditupdateproperties> item = new List<Feedetaisleditupdateproperties>();

            //List<PAY_FEE_BY_USERS> item = null;
            string data1 = JsonConvert.SerializeObject(obj);
            //exec stp_tblFeeInstallments_GetFeeDetialsByUserFeeId @UserId=80781,@FeeTermId=4582,@UserFeeId1=417163

            //StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFUC_PaidAmount_EditUsers_Get?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Feedetaisleditupdateproperties>>(data);
                //item = JsonConvert.DeserializeObject<List<PAY_FEE_BY_USERS>>(data);
            }

            return Json(item);

            //return View();
        }

        /*-Search Icon Click Show New Window -*/
        [HttpGet]
        public IActionResult PFU_FC_PaidAmount_Edit_User(Feedetaisledit obj)/*PAY_FEE_BY_USERS objs*/
        {

            List<Feedetaisleditupdateproperties> item = new List<Feedetaisleditupdateproperties>();
            //List<PAY_FEE_BY_USERS> item = null;
            string data1 = JsonConvert.SerializeObject(obj);
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFUC_PaidAmount_EditUsers_Get?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;
           // HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFUFC_PaidAmount_EditUsers_Get?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Feedetaisleditupdateproperties>>(data);
            }
            ViewBag.itemscount = item.Count();
            return PartialView("_Payfeecorrectionspaidamountupdate", item);
            //return PartialView("_PFU_FC_PaidAmount_Edit_User", item);

        }

        [HttpPost]
        //public IActionResult PFUC_AmountPay_Recipt(PAY_FEE_BY_USERS obj)
        public IActionResult PFUC_AmountPay_Recipt(Feeinstallmentsinsert obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.PaymentDate = DateTime.Now;

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/FeeInstallments_INSERT_challan?", content).Result;

            FeeInstallmentResult items = new FeeInstallmentResult();
            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<FeeInstallmentResult>(data2);
            }
           
            int returnmessage = int.Parse(items.Insertretunmessage);
            //string returnmessage=items.Insertretunmessage;
            int ReceiptNo = int.Parse(items.ReceiptNo);

            List<ChallanaDetails> limodel = new List<ChallanaDetails>();

            limodel.Add(new ChallanaDetails
            {

                //Item = item,
                Challana_TermName = obj.Challana_TermName,                            //1  "Challana_TermName",              
                Challana_FeeType = obj.Challana_FeeType,                              //2  "Challana_FeeType",               
                Challana_FeeAmount = double.Parse(obj.Challana_FeeAmount),                          //3  "Challana_FeeAmount",             
                Challana_DiscountType = obj.Challana_DiscountType,                    //4  "Challana_DiscountType",          
                Challana_DiscountAmount = obj.Challana_DiscountAmount,                //5  "Challana_DiscountAmount",        
                Challana_PaidAmount = obj.Challana_PaidAmount,
                Challana_PayingAmount = double.Parse(obj.Challana_PayingAmount),//6  "Challana_PaidAmount",            

                Challana_DueAmount = obj.Challana_DueAmount,                          //7  "Challana_PayingAmount",----          
                Challana_BalanceDue = double.Parse(obj.Challana_BalanceDue),                        //8  "Challana_DueAmount",             
                Challana_DueDate = obj.Challana_DueDate,                              //9  "Challana_BalanceDue",            
                Challana_UserRegId = obj.Challana_UserRegId,                          //10 "Challana_DueDate",               
                Challana_ClassificationName = obj.Challana_ClassificationName,        //11 "Challana_UserRegId",             
                Challana_subclassificationName = obj.Challana_subclassificationName,  //12 "Challana_ClassificationName",    
                Description = obj.Description,
                Challana_UserName = obj.Challana_UserName,                             //13 "Challana_subclassificationName", 
                ReturnStringValue = returnmessage,

            });
            return PartialView("_PFUC_AmountPay_Recipts", limodel);

        }
        [HttpPost]
        public IActionResult PFUC_FeeInstallments_BulkFeeUPDATE(string UpdateData, string ChallanDetails)
        {
            //var InstanceId = Request.Cookies["INSTANCEID"];
            //var UpdatedBy = Request.Cookies["LoginUserId"];




            string data1 = JsonConvert.SerializeObject(UpdateData);
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFU_FeeInstallments_BulkFeeUpdate_By_Challans?UpdateData=" + UpdateData + "&InstanceId=" + InstanceId + "&UpdatedBy=" + UserId, content).Result;

            var items = "";

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            if (items == "1")
            {
                var challanaDetailsList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<dynamic>>(ChallanDetails);

                ViewBag.ChallanDetails = challanaDetailsList;
                return PartialView("_PFU_FeeInstallments_BulkFeeUPDATE");

            }
            else if (items == "-2")
            {
                ViewBag.ErrorMessage = "Entered Amount is Exceeding the Fee Amount,Please Verify the Amount. ";
                return PartialView("_PFU_PaidAmount_Edit_SingleUser", ViewBag.ErrorMessage);
            }
            else
            {
                ViewBag.ErrorMessage = " Something Went Wrong Please Try Again.........!";
            }


            return PartialView("_PFU_PaidAmount_Edit_SingleUser");
        }

        public IActionResult PFUC_Termidbyfeetype(int FeeTermId)//PFU_FeeType_By_FeeTerms
        {           
            List<SelectListItem> list = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/PFU_Feetermbyfeetype?InstanceId=" + InstanceId + "&FeeTermId=" + FeeTermId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = Response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
           
            return Json(list);
        }
        public IActionResult Pfucfeetypebydiscountdd(int FeeTypeId)
        {
            DiscountAndQuantitylist list = new DiscountAndQuantitylist();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFU_DiscountType_ByFeeType?InstanceId=" + InstanceId + "&FeeTypeId=" + FeeTypeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;

                list = JsonConvert.DeserializeObject<DiscountAndQuantitylist>(data1);
            }
            return Json(list);
        }
        [HttpPost]
        //public IActionResult PFC_SaveFee_UpdateFee_ByTblUser(int UserId, int FeeTermId, int FeeTypeId, string Amount, int ChallanId, DateTime DueDate)
        public IActionResult PFC_SaveFee_UpdateFee_ByTblUser(PayFeeCorrectionsupdateinpayfeeforusers obj)
        {


            // exec Stp_insert_update_setandchallanfee InstanceId=545,UserId=80781,FeeTermId=4582,FeeTypeId=3680,         
            //Amount = 400000,ChallanId= 222930,Duedate= '2023-08-09 00:00:00',CreatedBy= 217606,CreatedDate= '2023-08-03 00:00:00'

            //Already 2100.00 paid for this fee type.

            //exec Stp_insert_update_setandchallanfee @InstanceId = 545,@UserId = 80796,@FeeTermId = 5634,@FeeTypeId = 1466,@Amount = 825000,@ChallanId = 223405,@Duedate = '2024-02-21 00:00:00',@CreatedBy = 32891,@CreatedDate = '2024-02-08 00:00:00'
            //This Procedure return --->3 Error message ===>>>. User Already Fee payed, Record can not be Updated
            //---->> 4 ===>>> For User Already Fee set, Record can not be Updated

            obj.CreatedBy = UserId;
            obj.InstanceId= InstanceId;


            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFC_SaveFee_UpdateFeeByTblUser", content).Result;



            //string Duedate = DueDate.ToString("yyyy-MM-dd");
            //var Querystring = $"?UserId={UserId}&FeeTermId={FeeTermId}&FeeTypeId={FeeTypeId}&Amount={Amount}&ChallanId={ChallanId}&DueDate={Duedate}&CreatedBy={CreatedBy}&InstanceId={InstanceId}";

            //StringContent content = new StringContent("application/json");
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFC_SaveFee_UpdateFeeByTblUser" + Querystring, content).Result;


            var items = "";

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(items);
            //return View();
        }


        [HttpPost]
        public IActionResult PFUC_Terms_Delte(PayFeeCorrectionsupdateinpayfeeforusers obj)
        //public IActionResult PFUC_Terms_Delte(int InstanceId, int UserId, int TermId, int TypeId, int ChallanId)
        {
             // var UpdatedBy = Request.Cookies["LoginUserId"];
            //var UpdatedBy = UserId;

            // url: '/FeeSection/PFUC_Terms_Delte?InstanceId=' + InstanceId + "&UserId=" + UserId + "&TermId=" + TermId + "&TypeId=" + TypeId + "&ChallanId=" + ChallanId,

            obj.CreatedBy = UserId;
            obj.InstanceId = InstanceId;

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFUC_tblFeeTerms_DELETE_ByInstanceId", content).Result;






            //StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFUC_tblFeeTerms_DELETE_ByInstanceId?InstanceId=" + InstanceId + "&UserId=" + UserId + "&TermId=" + TermId + "&TypeId=" + TypeId + "&ChallanId=" + ChallanId + "&UpdatedBy=" + UpdatedBy, content).Result;

            var items = "";

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);
        }



        //public IActionResult PFUC_Feetypeby_Discounttype(int FeeTypeId)
        //    //   PFU_DiscountType_By_FeeType
        //{
        //    //PfuDiscounttypebyfeetype
        //    List<DiscountAndQuantitylist> list = new List<DiscountAndQuantitylist>();
        //    HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFUC_Feetypbydescountamount?InstanceId=" + InstanceId + "&FeeTypeId=" + FeeTypeId).Result;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data1 = response.Content.ReadAsStringAsync().Result;

        //        list = JsonConvert.DeserializeObject<List<DiscountAndQuantitylist>>(data1);
        //    }
        //    return Json(list);


        //    // old PFU_DiscountType_ByFeeType
        //    // New method PFUC_Feetypbydescountamount

        //    //List<SelectListItem> list = new List<SelectListItem>();
        //    //List<SelectListItem> PFU_quantityList = new List<SelectListItem>();
        //    //HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_DiscountType_ByFeeType?InstanceId=" + InstanceId + "&FeeTypeId=" + FeeTypeId).Result;
        //    //if (SubCl_GetByCl_DD_Response.IsSuccessStatusCode)
        //    //{
        //    //    string Sub_DD_Data = SubCl_GetByCl_DD_Response.Content.ReadAsStringAsync().Result;

        //    //    //PFU_SubCl_GetByCl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
        //    //    var data = JsonConvert.DeserializeObject<DiscountAndQuantityData>(Sub_DD_Data);
        //    //    PFU_SubCl_GetByCl_DD = data.DiscountTypeList;
        //    //    PFU_quantityList = data.QuantityList;
        //    //}
        //    //ViewBag.Subdd_Data = list;
        //    //ViewBag.PFU_quantityList = PFU_quantityList;

        //    ////return Json(ViewBag.Subdd_Data);
        //    //return Json(new { Subdd_Data = PFU_SubCl_GetByCl_DD, PFU_quantityList = PFU_quantityList });

        //}


        #endregion



        /*==========     PayFeeForUser ACTION METHOD GET AND POST METHOD START ===========*/
        #region PayFeeForUser
        public IActionResult PayFeeForUser()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;
            return View();
        }


        // Search table data bind action method
        [HttpPost]
        public IActionResult PayFeeForUser(PAY_FEE_BY_USERS obj)
        {
            obj.InstanceId = InstanceId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ForPayFee_SearchUsers", content).Result;
            
            //List<PAY_FEE_BY_USERS> items = new List<PAY_FEE_BY_USERS>();
            List<Payfeebyuserstbl> items = new List<Payfeebyuserstbl>();

            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<Payfeebyuserstbl>>(data2);
            }
            return Json(items);
        }

        [HttpGet]
        public IActionResult GetFeeTermDetialsByUserId(int UserId)
        {            
            List<PAY_FEE_BY_USERS> item = null;
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/FeeTermDetials_ByUserId_Get?UserId=" + UserId + "&InstanceId=" + InstanceId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<PAY_FEE_BY_USERS>>(data);
            }
            return Json(item);
        }



        [HttpPost]
        public IActionResult SaveFee_UpdateFee_ByTblUser(int UserId, int FeeTypeId, int AcademicYearId, int FeeTermId, int ConcedingTypeId, string Quantity, string FeeAmount, string ConcedingAmount, DateTime DueDate, string Comments)
        {
            var UpdatedBy = Request.Cookies["LoginUserId"];


            string Duedate = DueDate.ToString("yyyy-MM-dd");
            var Querystring = $"?UserId={UserId}&FeeTypeId={FeeTypeId}&AcademicYearId={AcademicYearId}&FeeTermId={FeeTermId}&ConcedingTypeId={ConcedingTypeId}&Quantity={Quantity}&FeeAmount={FeeAmount}&ConcedingAmount={ConcedingAmount}&DueDate={Duedate}&Comments={Comments}&updatedBy={UpdatedBy}";

            StringContent content = new StringContent("application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/SaveFee_UpdateFeeByTblUser" + Querystring, content).Result;
            var items = "";

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(items);
            //return View();
        }


        [HttpPost]
        public IActionResult PFU_AmountPay_Recipt(PAY_FEE_BY_USERS obj)
        {
            var CreatedBy = Request.Cookies["LoginUserId"];
            obj.CreatedBy = CreatedBy;
            //exec stp_tblFeeInstallments_INSERT_New @InstanceId = 545,@FeeTypeId = 3650,@UserFeeId1 = 417163,@AcademicYearId = 2956,@FeeTermId = 4582,@InstallmentName = '',@BankAccountId = NULL,@PaymentModeId = 502,@Amount = 10,@Description = NULL,@CreatedBy = 217606,@CreatedDate = '2023-07-27 19:16:33.177',@ReceiptNo = NULL,@PaymentDate = '2023-07-27 19:16:33.177',@ChequeDDNo = NULL,@ChequeDDDate = NULL,@ChequeDDBank = NULL,@PayableBranchId = NULL,@CCDDNo = '27/07/2023 19:16:33',@CCDDNameOfCard = NULL,@CCDDType = NULL,@CCDDNameofIssuer = NULL,@BankAddress = NULL,@DueAmount = NULL


            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/FeeInstallments_INSERT_New?", content).Result;

            var items = "";

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }
            int ReturnStringValue = int.Parse(items);


            List<ChallanaDetails> limodel = new List<ChallanaDetails>();

            limodel.Add(new ChallanaDetails
            {

                //Item = item,
                Challana_TermName = obj.Challana_TermName,                            //1  "Challana_TermName",              
                Challana_FeeType = obj.Challana_FeeType,                              //2  "Challana_FeeType",               
                Challana_FeeAmount = double.Parse(obj.Challana_FeeAmount),                          //3  "Challana_FeeAmount",             
                Challana_DiscountType = obj.Challana_DiscountType,                    //4  "Challana_DiscountType",          
                Challana_DiscountAmount = obj.Challana_DiscountAmount,                //5  "Challana_DiscountAmount",        
                Challana_PaidAmount = obj.Challana_PaidAmount,
                Challana_PayingAmount = double.Parse(obj.Challana_PayingAmount),//6  "Challana_PaidAmount",            

                Challana_DueAmount = obj.Challana_DueAmount,                          //7  "Challana_PayingAmount",----          
                Challana_BalanceDue = double.Parse(obj.Challana_BalanceDue),                        //8  "Challana_DueAmount",             
                Challana_DueDate = obj.Challana_DueDate,                              //9  "Challana_BalanceDue",            
                Challana_UserRegId = obj.Challana_UserRegId,                          //10 "Challana_DueDate",               
                Challana_ClassificationName = obj.Challana_ClassificationName,        //11 "Challana_UserRegId",             
                Challana_subclassificationName = obj.Challana_subclassificationName,  //12 "Challana_ClassificationName",    
                Description = obj.Description,
                Challana_UserName = obj.Challana_UserName,                             //13 "Challana_subclassificationName", 
                ReturnStringValue = ReturnStringValue,

            });

            //return Json(item);
            return PartialView("_PFU_AmountPay_Recipt", limodel);

        }

        [HttpPost]
        public IActionResult PFU_FeeInstallments_BulkFeeUPDATE(string UpdateData, string ChallanDetails)//--
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            var UpdatedBy = Request.Cookies["LoginUserId"];





            string data1 = JsonConvert.SerializeObject(UpdateData);
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFU_FeeInstallments_BulkFeeUpdate_By_Users?UpdateData=" + UpdateData + "&InstanceId=" + InstanceId + "&UpdatedBy=" + UpdatedBy, content).Result;

            var items = "";

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            if (items == "1")
            {
                var challanaDetailsList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<dynamic>>(ChallanDetails);

                ViewBag.ChallanDetails = challanaDetailsList;
                return PartialView("_PFU_FeeInstallments_BulkFeeUPDATE");

            }
            else if (items == "-2")
            {
                ViewBag.ErrorMessage = "Entered Amount is Exceeding the Fee Amount,Please Verify the Amount. ";
                return PartialView("_PFU_PaidAmount_Edit_SingleUser", ViewBag.ErrorMessage);
            }
            else
            {
                ViewBag.ErrorMessage = " Something Went Wrong Please Try Again.........!";
            }


            return PartialView("_PFU_PaidAmount_Edit_SingleUser");



        }

        [HttpGet]
        public IActionResult PFU_PaidAmount_Edit_User(PAY_FEE_BY_USERS obj)
        {

            List<PAY_FEE_BY_USERS> item = null;
            string data1 = JsonConvert.SerializeObject(obj);
            //exec stp_tblFeeInstallments_GetFeeDetialsByUserFeeId @UserId=80781,@FeeTermId=4582,@UserFeeId1=417163

            //StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFU_PaidAmount_EditUsers_Get?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<PAY_FEE_BY_USERS>>(data);
            }

            return Json(item);

            //return View();
        }

        [HttpGet]
        public IActionResult PFU_PaidAmount_Edit_SingleUser(PAY_FEE_BY_USERS obj)
        {
            List<PAY_FEE_BY_USERS> item = null;
            string data1 = JsonConvert.SerializeObject(obj);
            //exec stp_tblFeeInstallments_GetFeeDetialsByUserFeeId @UserId=80781,@FeeTermId=4582,@UserFeeId1=417163

            //StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFU_PaidAmount_EditUsers_Get?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<PAY_FEE_BY_USERS>>(data);
            }

            //return Json(item);
            ViewBag.itemscount = item.Count();



            return PartialView("_PFU_PaidAmount_Edit_SingleUser", item);
        }


        #endregion

        //---========= ##-- PAY FEE FOR USER DROPDOWNS ACTION METHODS START --####-----------------------------------

        public IActionResult PFU_Classification_DD()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];

            List<SelectListItem> PFU_Cl_DD = new List<SelectListItem>();
            HttpResponseMessage ClS_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_Classification_GetDD?InstanceId=" + InstanceId).Result;
            if (ClS_DD_Response.IsSuccessStatusCode)
            {
                string DD_Data = ClS_DD_Response.Content.ReadAsStringAsync().Result;
                PFU_Cl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(DD_Data);
            }
            ViewBag.AcadamicYearDD = PFU_Cl_DD;

            return Json(ViewBag.AcadamicYearDD);

        }

        public IActionResult PFU_StudentQuota()
        {
            //            exec stp_tblStudentQuota_SELAll @InstanceID = 545
            var InstanceId = Request.Cookies["INSTANCEID"];

            List<SelectListItem> PFU_SQuota_DD = new List<SelectListItem>();
            HttpResponseMessage SQuota_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_StudentQuota_GetDD?InstanceId=" + InstanceId).Result;
            if (SQuota_DD_Response.IsSuccessStatusCode)
            {
                string SQuota_DD_Data = SQuota_DD_Response.Content.ReadAsStringAsync().Result;
                PFU_SQuota_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(SQuota_DD_Data);
            }
            ViewBag.SQuota_DD = PFU_SQuota_DD;

            return Json(ViewBag.SQuota_DD);


        }

        public IActionResult PFU_SubClassification_GetByClassification(string InstanceClassificationId)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];


            //exec stp_tblInstanceSubClassification_GetByClassificationId @InstanceId = 545,@InstanceClassificationId = 806

            List<SelectListItem> PFU_SubCl_GetByCl_DD = new List<SelectListItem>();
            HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/SubClassification_GetByClassificationId?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (SubCl_GetByCl_DD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = SubCl_GetByCl_DD_Response.Content.ReadAsStringAsync().Result;
                PFU_SubCl_GetByCl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.Subdd_Data = PFU_SubCl_GetByCl_DD;

            return Json(ViewBag.Subdd_Data);
        }

        public IActionResult PFU_tblFeeTerms_SELECTALLByAcadamicYearId_DD()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];

            //exec stp_tblFeeTerms_SELECTALLByAcadamicYearId @InstanceId=545

            List<SelectListItem> PFU_SubCl_GetByCl_DD = new List<SelectListItem>();
            HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_FeeTermsNames_SELECTALLByAcadamicYearId_DD?InstanceId=" + InstanceId).Result;
            if (SubCl_GetByCl_DD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = SubCl_GetByCl_DD_Response.Content.ReadAsStringAsync().Result;
                PFU_SubCl_GetByCl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.Subdd_Data = PFU_SubCl_GetByCl_DD;

            return Json(ViewBag.Subdd_Data);
        }

        

        public IActionResult PFU_SearchUser_By_TableData(int UserId, string FeeTermIds)
        {
            //var InstanceId = Request.Cookies["INSTANCEID"];



            List<PAY_FEE_BY_USERS> Items = new List<PAY_FEE_BY_USERS>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFU_SearchUserByTableData?UserId=" + UserId + "&FeeTermIds=" + FeeTermIds + "&InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Items = JsonConvert.DeserializeObject<List<PAY_FEE_BY_USERS>>(data);
            }

            return Json(Items);

        }

       
        public IActionResult PFU_DiscountType_By_DiscountAmount(int ConcedingTypeId)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];

            //exec stp_tblFeeTerms_SELECTALLByAcadamicYearId @InstanceId=545

            List<SelectListItem> PFU_SubCl_GetByCl_DD = new List<SelectListItem>();
            HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_DiscountType_ByDiscountAmount?InstanceId=" + InstanceId + "&ConcedingTypeId=" + ConcedingTypeId).Result;
            if (SubCl_GetByCl_DD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = SubCl_GetByCl_DD_Response.Content.ReadAsStringAsync().Result;
                PFU_SubCl_GetByCl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.Subdd_Data = PFU_SubCl_GetByCl_DD;

            return Json(ViewBag.Subdd_Data);

            //exec stp_tblFeeTypeConType_SelectConcedingTypesByTypeId InstanceId=545,=1466

        }

        public IActionResult PFU_tblInstanceBankAccounts_SELECTALL()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];

            //exec stp_tblInstanceBankAccounts_SELECTALL @InstanceId=545

            List<SelectListItem> PFU_SubCl_GetByCl_DD = new List<SelectListItem>();
            HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_tblInstanceBankAccounts_SELECTALL?InstanceId=" + InstanceId).Result;
            if (SubCl_GetByCl_DD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = SubCl_GetByCl_DD_Response.Content.ReadAsStringAsync().Result;
                PFU_SubCl_GetByCl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.Subdd_Data = PFU_SubCl_GetByCl_DD;

            return Json(ViewBag.Subdd_Data);
        }

        public IActionResult PFU_PaymentMode_DD()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];

            //exec stp_tblPaymentMode_SELECTALL 

            List<SelectListItem> PFU_SubCl_GetByCl_DD = new List<SelectListItem>();
            HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/PFUPaymentModeDD?InstanceId=" + InstanceId).Result;
            if (SubCl_GetByCl_DD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = SubCl_GetByCl_DD_Response.Content.ReadAsStringAsync().Result;
                PFU_SubCl_GetByCl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.Subdd_Data = PFU_SubCl_GetByCl_DD;

            return Json(ViewBag.Subdd_Data);
        }





        //---========= ##-- PAY FEE FOR USER DROPDOWNS ACTION METHODS END --####-----------------------------------




        /*==========      PayFeeForUser ACTION METHOD GET AND POST METHOD END ===========*/





        /* ====================PAY FEE CORRECTIONS  FOR USERS  GET AND POST METHODS CODE START========================= */

        


        
       

        /*--------***  PayFeeForUserForChallana Dropdwons Methods Start ***-------*/


        public IActionResult PFUC_StudentQuota()
        {

            var InstanceId = Request.Cookies["INSTANCEID"];

            List<SelectListItem> PFU_SQuota_DD = new List<SelectListItem>();
            HttpResponseMessage SQuota_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_StudentQuota_GetDD?InstanceId=" + InstanceId).Result;
            if (SQuota_DD_Response.IsSuccessStatusCode)
            {
                string SQuota_DD_Data = SQuota_DD_Response.Content.ReadAsStringAsync().Result;
                PFU_SQuota_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(SQuota_DD_Data);
            }
            ViewBag.SQuota_DD = PFU_SQuota_DD;

            return Json(ViewBag.SQuota_DD);


        }


       
        [HttpPost]
        public IActionResult PFU_FeeInstallments_BulkFeeUPDATE_Challana(string UpdateData, string ChallanDetails)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            var UpdatedBy = Request.Cookies["LoginUserId"];




            string data1 = JsonConvert.SerializeObject(UpdateData);
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFU_FeeInstallments_BulkFeeUpdate_By_Users?UpdateData=" + UpdateData + "&InstanceId=" + InstanceId + "&UpdatedBy=" + UpdatedBy, content).Result;

            var items = "";

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            if (items == "1")
            {
                var challanaDetailsList = Newtonsoft.Json.JsonConvert.DeserializeObject<List<dynamic>>(ChallanDetails);

                ViewBag.ChallanDetails = challanaDetailsList;
                return PartialView("_PFU_FeeInstallments_BulkFeeUPDATE");

            }
            else if (items == "-2")
            {
                ViewBag.ErrorMessage = "Entered Amount is Exceeding the Fee Amount,Please Verify the Amount. ";
                return PartialView("_PFU_PaidAmount_Edit_SingleUser", ViewBag.ErrorMessage);
            }
            else
            {
                ViewBag.ErrorMessage = " Something Went Wrong Please Try Again.........!";
            }


            return PartialView("_PFU_PaidAmount_Edit_SingleUser");



        }



        public IActionResult PFUC_SearchUser_By_TableData(int UserId, string FeeTermIds)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];



            List<PAY_FEE_BY_USERS> Items = new List<PAY_FEE_BY_USERS>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFU_SearchUserByTableData?UserId=" + UserId + "&FeeTermIds=" + FeeTermIds + "&InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Items = JsonConvert.DeserializeObject<List<PAY_FEE_BY_USERS>>(data);
            }

            return Json(Items);

        }

        /*--------***  PayFeeForUserForChallana Dropdwons Methods End ***-------*/


      


      

      


        //PAY_FEE_BY_CorrectionUSERS EDIT METHOD AND POST METHOD CODE START
        
       



        //PAY_FEE_BY_CorrectionUSERS EDIT METHOD AND POST METHOD CODE END


        /*----DROPDOWNS DATA PAY FEE CORRECTIONS START----*/



        /*----DROPDOWNS DATA PAY FEE CORRECTIONS END----*/


       
        /* ====================PAY FEE CORRECTIONS  FOR USERS  GET AND POST METHODS CODE END========================= */





        /*--------------------=======Feereceipt Action methods start===========------------------------------*/

        public IActionResult Feereceipt()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;
            return View();

        }
        [HttpPost]
        public IActionResult Feereceipt(int InstanceId, int ClassificationId, int SubClassificationId)
        {
            List<Feereceipt> DiscountLi = new List<Feereceipt>();

            var queryString = $"?InstanceId={InstanceId}&ClassificationId={ClassificationId}&SubClassificationId={SubClassificationId}";
            //exec stp_tblUser_HallTickets @InstanceId=545,@ClassificationId=806,@SubClassificationId=1172

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Feereceipt_UserTable_Get" + queryString).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                DiscountLi = JsonConvert.DeserializeObject<List<Feereceipt>>(data);
            }

            ViewBag.FT_Tbl = DiscountLi;

            return new JsonResult(ViewBag.FT_Tbl);

        }
        public IActionResult Feereceipt_Classification_DD(int InstanceId)
        {
            List<SelectListItem> PFU_Cl_DD = new List<SelectListItem>();
            HttpResponseMessage ClS_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_Classification_GetDD?InstanceId=" + InstanceId).Result;
            if (ClS_DD_Response.IsSuccessStatusCode)
            {
                string DD_Data = ClS_DD_Response.Content.ReadAsStringAsync().Result;
                PFU_Cl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(DD_Data);
            }
            ViewBag.AcadamicYearDD = PFU_Cl_DD;

            return Json(ViewBag.AcadamicYearDD);

        }
        public IActionResult FeereceiptClass_DD(int InstanceId, int InstanceClassificationId)
        {
            List<SelectListItem> MFD_ClassDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_ClassDD?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_ClassDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_Class_Data = MFD_ClassDD_li;

            return Json(ViewBag.MFD_Class_Data);
        }

        public IActionResult FeeTerms_DD(int InstanceId)
        {
            List<SelectListItem> MFD_ClassDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/Feereceipt_FeeTermsDD?InstanceId=" + InstanceId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_ClassDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_Class_Data = MFD_ClassDD_li;

            return Json(ViewBag.MFD_Class_Data);
        }
        public IActionResult Feereceipt_FeeType_DD(int InstanceId, int FeeTermIds)
        {
            List<SelectListItem> MFD_ClassDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/Feereceipt_FeeTypeDD?InstanceId=" + InstanceId + "&FeeTermIds=" + FeeTermIds).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_ClassDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_Class_Data = MFD_ClassDD_li;

            return Json(ViewBag.MFD_Class_Data);
        }


        [HttpPost]
        public IActionResult Feereceipt_Users_Challan_Result_Tbl(string FeeTermId, string FeeTypeIds, string UserIds, int InstanceId)
        {


            StringContent content = new StringContent("application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Feereceipt_Users_Challan_Result?FeeTermId=" + FeeTermId + "&FeeTypeIds=" + FeeTypeIds + "&UserIds=" + UserIds + "&InstanceId=" + InstanceId, content).Result;
            var data2 = "";
            List<Feereceipt> items = new List<Feereceipt>();

            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<Feereceipt>>(data2);
            }
            return Json(items);

        }

        /*--------------------=======Feereceipt Action methods end===========------------------------------*/


        /*--------------------=======Generate Fee Receipt Action methods start===========------------------------------*/
        #region  GenerateFeeReceipt     GENERATE FEE CHALLAN
        public IActionResult GenerateFeeReceipt()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;
            return View();
        }

        [HttpPost]
    
        public IActionResult GenerateFeeReceipt(int InstanceClassificationId, int InstanceSubClassificationId)    
        {
            List<New_GenerateFeeReceipt> list = new List<New_GenerateFeeReceipt>();         
            var queryString = $"?InstanceId={InstanceId}&ClassificationId={InstanceClassificationId}&SubClassificationId={InstanceSubClassificationId}"; 
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Feereceipt_UserTable_Get" + queryString).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<New_GenerateFeeReceipt>>(data);
            }         

            return Json(list);
        }
        //public IActionResult GenerateFeeReceipt_New_Classification_DD()
        //{
        //    List<SelectListItem> lidd = new List<SelectListItem>();
        //    HttpResponseMessage ClS_DD_Response = client.GetAsync(client.BaseAddress + "/GenerateFeeReceipt_Classification_GetDD?InstanceId=" + InstanceId).Result;
        //    if (ClS_DD_Response.IsSuccessStatusCode)
        //    {
        //        string DD_Data = ClS_DD_Response.Content.ReadAsStringAsync().Result;
        //        lidd = JsonConvert.DeserializeObject<List<SelectListItem>>(DD_Data);
        //    }
        //    ViewBag.AcadamicYearDD = lidd;

        //    return Json(ViewBag.AcadamicYearDD);

        //}
        //public IActionResult GenerateFeeReceipt_New_Class_DD(int InstanceId, int InstanceClassificationId)
        //{
        //    List<SelectListItem> MFD_ClassDD_li = new List<SelectListItem>();
        //    HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/GenerateFeeReceipt_ClassDD?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
        //    if (MFD_Response.IsSuccessStatusCode)
        //    {
        //        string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
        //        MFD_ClassDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
        //    }
        //    ViewBag.MFD_Class_Data = MFD_ClassDD_li;

        //    return Json(ViewBag.MFD_Class_Data);
        //}

        public IActionResult GenerateFeeReceipt_New_FeeTerms_DD()
        {
            List<SelectListItem> list = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/GenerateFeeReceipt_FeeTermsDD?InstanceId=" + InstanceId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }   
            return Json(list);
        }
        public IActionResult GenerateFeeReceipt_New_FeeType_DD(string FeeTermIds)
        {
            List<SelectListItem> list = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/GenerateFeeReceipt_FeeTypeDD?InstanceId=" + InstanceId + "&FeeTermIds=" + FeeTermIds).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(list);
        }


        [HttpPost]
        public IActionResult GenerateFeeReceipt_New_Users_Challan_Result_Tbl(string FeeTermId, string FeeTypeIds, string UserIds)
        {
            StringContent content = new StringContent("application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/GenerateFeeReceipt_Users_Challan_Result?FeeTermId=" + FeeTermId + "&FeeTypeIds=" + FeeTypeIds + "&UserIds=" + UserIds + "&InstanceId=" + InstanceId, content).Result;
            var data2 = "";
            List<New_GenerateFeeReceipt> items = new List<New_GenerateFeeReceipt>();

            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<New_GenerateFeeReceipt>>(data2);
            }
            return Json(items);

        }
        #endregion
        /*--------------------=======Generate Fee Receipt Action methods end===========------------------------------*/


        /*--------------------=======TransferChallan Action Method Code Start===========------------------------------*/

        public IActionResult TransferChallan()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;
            var CreatedBy = Request.Cookies["LoginUserId"];
            ViewBag.CreatedBy = CreatedBy;
            return View();
        }

        [HttpPost]
        public IActionResult TransferChallan(TransferChallan obj)
        {

            List<TransferChallan> ChallanaUsers = new List<TransferChallan>();

            //var queryString = $"?InstanceId={obj.InstanceId}&PaidChallanNo={obj.PaidChallanNo}&TransferChallanNo={obj.TransferChallanNo}&CreatedBy={obj.CreatedBy}";

            string items = "";
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/From_ChallanTransfer_To", content).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data1);

            }

            return Json(items);
        }

        [HttpPost]
        public IActionResult From_Challana_Users_Details(TransferChallan Obj)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;

            var CreatedBy = Request.Cookies["LoginUserId"];
            ViewBag.CreatedBy = CreatedBy;

            List<TransferChallan> ChallanaUsers = new List<TransferChallan>();


            var queryString = $"?InstanceId={Obj.InstanceId}&UserReceiptGenerationID={Obj.UserReceiptGenerationID}";


            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/From_Challana_Users_Details" + queryString).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                ChallanaUsers = JsonConvert.DeserializeObject<List<TransferChallan>>(data);
            }

            ViewBag.ChallanaUsersCOunt = ChallanaUsers.Count();
            ViewBag.ErrorMessage = ChallanaUsers[0].ErrorMessage;
            ViewBag.ChallanaUsers = ChallanaUsers;

            // return Json(ChallanaUsers);
            return View();
        }


        [HttpPost]
        public IActionResult To_Challana_Users_Details(TransferChallan Obj)
        {
            List<TransferChallan> ChallanaUsers = new List<TransferChallan>();


            var queryString = $"?InstanceId={Obj.InstanceId}&UserReceiptGenerationID={Obj.UserReceiptGenerationID}";


            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/From_Challana_Users_Details" + queryString).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                ChallanaUsers = JsonConvert.DeserializeObject<List<TransferChallan>>(data);
            }

            ViewBag.ChallanaUsersCOunt = ChallanaUsers.Count();
            ViewBag.ChallanaUsers = ChallanaUsers;

            return View();


        }



        /*--------------------=======TransferChallan Action Method Code End===========------------------------------*/


        /*---Fee Challana Reports Action Method Code Start---*/

        public IActionResult FeeReceiptNew()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;
            return View();
        }

        public IActionResult FR_SubClassiFication_DD()
        {
            var instanceid = Request.Cookies["INSTANCEID"];

            List<SelectListItem> value1 = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_FR_SubClassificationNames?InstanceId=" + instanceid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                value1 = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.SubClassificationNames = value1;

            return Json(value1);
        }

        [HttpPost]
        public IActionResult FeeReceiptNew_Data(FeeReports obj)
        {

            List<FeeReports> ChallanaUsers = new List<FeeReports>();


            var queryString = $"?InstanceId={obj.InstanceId}&InstanceSubClassificationId={obj.InstanceSubClassificationId}&FirstName={obj.FirstName}&LastName={obj.LastName}";


            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_FR_ChallanaUSers" + queryString).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                ChallanaUsers = JsonConvert.DeserializeObject<List<FeeReports>>(data);
            }

            ViewBag.ChallanaUsersCOunt = ChallanaUsers.Count();

            ViewBag.ChallanaUsers = ChallanaUsers;

            // return Json(ChallanaUsers);
            return View();
        }

        [HttpGet]
        public IActionResult Users_By_FeeChallanNo(string userId)
        {
            List<FeeReports> ChallanaUsers = new List<FeeReports>();


            var queryString = $"?UserId={userId}";


            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_FR_ChallanaUSers_Details" + queryString).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                ChallanaUsers = JsonConvert.DeserializeObject<List<FeeReports>>(data);
            }

            ViewBag.ChallanaUsersCOunt = ChallanaUsers.Count();

            ViewBag.ChallanaUsers = ChallanaUsers;

            return PartialView("_Users_By_FeeChallanNo", ChallanaUsers);
            //return Json(ChallanaUsers);
            //return View();
        }


        [HttpGet]
        public IActionResult DeleteUserChallana(string UserReceiptGenerationId)
        {

            var InstanceId = Request.Cookies["INSTANCEID"];
            var DeletedBy = Request.Cookies["LoginUserId"];

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/User_Delete_Challana?UserReceiptGenerationId=" + UserReceiptGenerationId + "&InstanceId=" + InstanceId + "&DeletedBy=" + DeletedBy).Result;

            String Items = "";

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Items = JsonConvert.DeserializeObject<string>(data);
            }
            //return PartialView("_Users_By_FeeChallanNo", Items);
            return Json(Items);
        }


        [HttpGet]
        public IActionResult GetChellanaDetails(string ChallanId, string UserId)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            var DeletedBy = Request.Cookies["LoginUserId"];

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ChellanaDetails?ChallanId=" + ChallanId + "&UserId=" + UserId).Result;

            List<FeeReports> items = new List<FeeReports>();

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<FeeReports>>(data);
            }
            // return Json(items);
            return PartialView("_GetChellanaDetails", items);

        }
        /*---Fee Challana Reports Action Method Code End---*/

        [HttpGet]
        public IActionResult AutomaticChallanGeneration()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.Instanceid = InstanceId;

            var CreatedBy = Request.Cookies["LoginUserId"];
            ViewBag.CreatedBy = CreatedBy;
            return View();
        }
        [HttpPost]
        public IActionResult A_ChallanGeneration(AutomaticChallanGeneration requestData)
        {
            try
            {
                // Serialize the list of User_FeeDetails to JSON
                string jsonData = JsonConvert.SerializeObject(requestData);

                // Create a StringContent with the serialized JSON
                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                // Make the POST request to the Web API
                HttpResponseMessage response = client.PostAsync("/api/FeeSctionCtr/ACG_ChallanGeneration", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data2 = response.Content.ReadAsStringAsync().Result;
                    return Json(data2);
                }

                return Json(new { success = false, message = "Request failed" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return Json(new { success = false, error = ex.Message });
            }

            //return View();
        }


        public IActionResult View_Edit_Challan_ViewId()
        {
            return PartialView("_View_Edit_Challan_ViewId");
        }


        /*<--------------- DROPDOWNS DATA BIND ACTION METHOD CODE START --------------->*/

        public IActionResult GetAcademicYears(string InstanceId)
        {
            //exec stp_tblInstanceAcademicYear_GETTYPES @InstanceId=545

            List<SelectListItem> item = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ACG_GetAcademicYears?InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }

            return Json(item);

        }


        public IActionResult GetPrevious_FeeTerm(string InstanceId, string AcademicYearId)
        {
            //exec stp_tblFeeTerms_GETTermsByInstanceIdandacademinyear @InstanceId = 545, @AcademicYearId = default

            List<SelectListItem> item = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ACG_GetPrevious_FeeTerm?InstanceId=" + InstanceId + "&AcademicYearId=" + AcademicYearId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }

            return Json(item);
        }
        public IActionResult Need_to_be_set_GETTerms(string InstanceId)
        {
            //exec stp_tblFeeTerms_GETTermsByInstanceId_currentyear @InstanceId=545

            List<SelectListItem> item = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ACG_GETTerms?InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }

            return Json(item);

        }

        public IActionResult InstanceSubclassification(string InstanceId)
        {
            //exec stp_tblInstanceAcademicYear_GETTYPES @InstanceId=545

            List<SelectListItem> item = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ACG_GetInstanceSubclassification?InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }

            return Json(item);

        }

        public IActionResult PreviousFeeTypes(string InstanceId, string FeeTermId)
        {
            //exec stp_tblInstanceAcademicYear_GETTYPES @InstanceId=545

            List<SelectListItem> item = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ACG_PreviousFeeTypes?InstanceId=" + InstanceId + "&FeeTermId=" + FeeTermId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }

            return Json(item);

        }
        /*<--------------- DROPDOWNS DATA BIND ACTION METHOD CODE END --------------->*/



        public IActionResult FeeUploadnew()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.Instanceid = InstanceId;
            return View();
        }







        /*---------- Send Fee Due Remainders (Fee Status) Action Method Code Start ----------*/
        [HttpGet]
        public IActionResult FeeStatus()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.Instanceid = InstanceId;
            return View();
        }

        [HttpGet]
        public IActionResult FeeStatus_TableData(int InstanceId, int InstanceClassificationId, int InstanceSubClassificationId, int InstanceRoleId, string Selected_FeeTypeIds, int FeeTermId, int AcademicYearId, string AmountType, string Operator, int Price, int StudentQuota, string ButtonValue)
        {

            //exec stp_tblUser_SEARCHFORPARTIALFEESTATUS_Unikop @InstanceId=545,@InstanceClassificationId=806,@InstanceSubClassificationId=1172,@RoleId=775,@FeeTypeId='1466',@FeeTermId=4582,@AcademicYearId=2956,@AmountType=default,@Operator=default,@Price=default

            //int Prices = 123;
            //if (Price != null)
            //{
            //    Prices = Price;
            //}


            //int StudentQuotas = 123;
            //if (StudentQuota != 0)
            //{
            //    StudentQuotas = StudentQuota;
            //}
            //var Operators = "123";
            //if (Operator != null)
            //{
            //    Operators = Operator;
            //}
            //var AmountTypes = "123";
            //if (AmountType != null)
            //{
            //    AmountTypes = AmountType;
            //}


            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/FeeStatus_TableData?InstanceId=" + InstanceId + "&InstanceSubClassificationId=" + InstanceSubClassificationId + "&InstanceClassificationId=" + InstanceClassificationId + "&InstanceRoleId=" + InstanceRoleId + "&Selected_FeeTypeIds=" + Selected_FeeTypeIds + "&FeeTermId=" + FeeTermId + "&AcademicYearId=" + AcademicYearId + "&AmountType=" + AmountType + "&Operator=" + Operator + "&Price=" + Price + "&StudentQuota=" + StudentQuota + "&ButtonValue=" + ButtonValue).Result;

            List<Fee_Due_Remainders_FeeStatus> items = new List<Fee_Due_Remainders_FeeStatus>();

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<Fee_Due_Remainders_FeeStatus>>(data);
            }

            ViewBag.ItemsCount = items.Count();
            return PartialView("_TableData_FeeStatus", items);


        }


        [HttpGet]
        public IActionResult FeeStatus_ByIndividual(int InstanceId, string FeeTermId, int Studentid)
        {
            List<Fee_Due_Remainders_FeeStatus_ByIndividual> ChallanaUsers = new List<Fee_Due_Remainders_FeeStatus_ByIndividual>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Get_FeeStatus_ByIndividual?InstanceId=" + InstanceId + "&FeeTermId=" + FeeTermId + "&UserId=" + Studentid).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                ChallanaUsers = JsonConvert.DeserializeObject<List<Fee_Due_Remainders_FeeStatus_ByIndividual>>(data);
            }

            ViewBag.ChallanaUsersCOunt = ChallanaUsers.Count();

            ViewBag.ChallanaUsers = ChallanaUsers;

            return PartialView("_FeeStatus_ByIndividual", ChallanaUsers);
        }

        [HttpPost]
        public IActionResult FeeStatus_Mails_and_Sms(string CollectedData, string Subject)
        {
            var decodedCollectedData = System.Web.HttpUtility.UrlDecode(CollectedData);
            var collectedData = Newtonsoft.Json.JsonConvert.DeserializeObject<CommunicationData>(decodedCollectedData);

            // Now you can access the arrays within collectedData
            var studentMobileNumbers = collectedData.studentMobileNumbers;
            var parentMobileNumbers = collectedData.parentMobileNumbers;
            var studentEmails = collectedData.studentEmails;
            var parentEmails = collectedData.parentEmails;

            return View();
        }

        public IActionResult Role_Dropdown(int InstanceId)
        {
            DropdownLists Fs_All_DropdownLists = new DropdownLists();
            HttpResponseMessage Role_response = client.GetAsync(client.BaseAddress + "/FeeStatus_RoleDD?InstanceId=" + InstanceId).Result;

            if (Role_response.IsSuccessStatusCode)
            {
                string data = Role_response.Content.ReadAsStringAsync().Result;
                Fs_All_DropdownLists = JsonConvert.DeserializeObject<DropdownLists>(data);
            }

            return Json(Fs_All_DropdownLists);
        }

        public IActionResult Class_Dropdown_By_Department_DropdownId(int InstanceId, int InstanceClassificationId)
        {
            List<SelectListItem> Fs_ClassDD = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/FeeStatus_ClassDD?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                Fs_ClassDD = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }

            return Json(Fs_ClassDD);
        }


        public IActionResult AcademicYear_Dropdown_By_Feeterm_DropdownId(int InstanceId, int AcademicYearId)
        {
            List<SelectListItem> Fs_FeeTermDD = new List<SelectListItem>();
            HttpResponseMessage Fs_Response = client.GetAsync(client.BaseAddress + "/FeeStatus_FeeTermDD?InstanceId=" + InstanceId + "&AcademicYearId=" + AcademicYearId).Result;
            if (Fs_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = Fs_Response.Content.ReadAsStringAsync().Result;
                Fs_FeeTermDD = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }

            return Json(Fs_FeeTermDD);
        }

        public IActionResult FeeTermid_Dropdown_By_FeeType_DropdownId(int InstanceId, int AcademicYearId, int FeeTermId)
        {
            List<SelectListItem> Fs_FeeTypeDD = new List<SelectListItem>();
            HttpResponseMessage Fs_Response = client.GetAsync(client.BaseAddress + "/FeeStatus_FeeTypeDD?InstanceId=" + InstanceId + "&AcademicYearId=" + AcademicYearId + "&FeeTermId=" + FeeTermId).Result;
            if (Fs_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = Fs_Response.Content.ReadAsStringAsync().Result;
                Fs_FeeTypeDD = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            return Json(Fs_FeeTypeDD);
        }
        /*---------- Send Fee Due Remainders (Fee Status) Action Method Code End ----------*/







        /*----------------- VIEW STUDENT ACCOUNT ACTION METHOD CODE START---------*/
        [HttpGet]
        public IActionResult ViewallChallandetailsTermwise()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.Instance = InstanceId;

            return View();
        }


        public IActionResult Classdropdown_VaCdT(int Instanceid)
        {

            List<SelectListItem> li = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/VaCdt_Classificaation_DD?InstanceId=" + Instanceid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                li = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.NoticeTypedd = li;

            return Json(li);
        }

        [HttpPost]
        public IActionResult ViewallChallandetailsTermwise_Tabledata(ChallandetailsTermwise obj)
        {
            List<ChallandetailsTermwise> details = new List<ChallandetailsTermwise>();
            if (obj.FirstName == null)
            {
                obj.FirstName = " ";
            }
            if (obj.LastName == null)
            {
                obj.LastName = "";
            }
            if (obj.StudentId == null)
            {
                obj.StudentId = "";
            }
            if (obj.InstanceSubClassificationId== "--Select Class--")
            {
                obj.InstanceSubClassificationId = "";
            }

            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/VaCdt_Tabledata?InstanceId=" + obj.InstanceId + "&InstanceSubClassificationId=" + obj.InstanceSubClassificationId + "&FirstName=" + obj.FirstName + "&LastName=" + obj.LastName + "&StudentId=" + obj.StudentId + "&Due=" + obj.Due).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Cl_data = Response.Content.ReadAsStringAsync().Result;
                details = JsonConvert.DeserializeObject<List<ChallandetailsTermwise>>(Cl_data);
            }
            ViewBag.Feeli = details;
            return PartialView("_ViewallChallandetailsTermwise_Tabledata", details);
        }

        public IActionResult Userwise_FeeInstallments(int UserId)
        {

            List<ChallandetailsTermwise> Fee_installments_details = new List<ChallandetailsTermwise>();

            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Userwise_FeeInstallments?UserId=" + UserId).Result;

            if (Response.IsSuccessStatusCode)
            {
                string Cl_data = Response.Content.ReadAsStringAsync().Result;
                Fee_installments_details = JsonConvert.DeserializeObject<List<ChallandetailsTermwise>>(Cl_data);
            }
            ViewBag.Details = Fee_installments_details;

            return View();
        }

        public IActionResult Userwise_FeeInstallmentsReport(int UserId,int InstanceId,int ChallanId, string StartDate)
        {
            List<ChallandetailsTermwise> Fee_installments_details = new List<ChallandetailsTermwise>();

            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Userwise_InstallmentsReport?UserId=" + UserId+ "&InstanceId="+ InstanceId+ "&ChallanId="+ ChallanId+ "&StartDate="+ StartDate).Result;

            if (Response.IsSuccessStatusCode)
            {
                string Cl_data = Response.Content.ReadAsStringAsync().Result;
                Fee_installments_details = JsonConvert.DeserializeObject<List<ChallandetailsTermwise>>(Cl_data);
            }
            ViewBag.installments_details = Fee_installments_details;

            return View(Fee_installments_details);
        }

        /*----------------- VIEW STUDENT ACCOUNT ACTION METHOD CODE START---------*/





        /*-----------------VIEW ALL CHALLAN DETAILS ACTION METHOD CODE START---------*/
        [HttpGet]
        public IActionResult ViewTermWiseFeeDetails()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.Instance = InstanceId;
            return View();
        }


        public IActionResult TermWisedropdown_VTFTD(int Instanceid)
        {
            List<SelectListItem> li = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/VaCdt_TermWise_DD?InstanceId=" + Instanceid).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                li = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            ViewBag.NoticeTypedd = li;

            return Json(li);
        }



        [HttpPost]
        public IActionResult ViewTermWiseFeeDetails_TableData(TermWiseFeeDetails obj , int InstanceId,string TermIds, int  Due)
        {
            //List<TermWiseFeeDetails> details = new List<TermWiseFeeDetails>();
            TermWiseFeeDetails details = new TermWiseFeeDetails();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/VaCdt_TermWise_Tabledata?InstanceId=" + InstanceId + "&TermIds=" + TermIds + "&Due=" + Due).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Cl_data = Response.Content.ReadAsStringAsync().Result;
                details = JsonConvert.DeserializeObject<TermWiseFeeDetails>(Cl_data);
            }
            ViewBag.Table0 = details.Table0;
            ViewBag.Table1 = details.Table1;
         
            return PartialView("_ViewTermWiseFeeDetails_TableData");
        }
        /*----------------- VIEW ALL CHALLAN DETAILS ACTION METHOD CODE START---------*/




        /*-----------------Fee Challan Details ACTION METHOD CODE START---------*/
        [HttpGet]
        public IActionResult FeeChallanDetails()
        {
            return View();
        }
        /*----------------- Fee Challan Details ACTION METHOD CODE END---------*/



        /*-----------------FeeDetails  ACTION METHOD CODE START---------*/
        [HttpGet]
        public IActionResult FeeDetails()
        {
            return View();
        }
        /*----------------- FeeDetails ACTION METHOD CODE END---------*/


        /*-----------------FeePeriodWiseReport  ACTION METHOD CODE START---------*/
        [HttpGet]
        public IActionResult FeePeriodWiseReport()
        {
            return View();
        }
        /*----------------- FeePeriodWiseReport ACTION METHOD CODE END---------*/

        /*-----------------ChallanGenerateddates ACTION METHOD CODE START---------*/
        [HttpGet]
        public IActionResult ChallanGenerateddates()
        {
            return View();
        }
        /*----------------- ChallanGenerateddates ACTION METHOD CODE END---------*/




        /*-----------------ViewTermwisefeereportNew ACTION METHOD CODE START---------*/
        [HttpGet]
        public IActionResult ViewTermwisefeereportNew()
        {
            return View();
        }
        /*----------------- ViewTermwisefeereportNew ACTION METHOD CODE END---------*/


        /*-----------------UserWiseFeeDetails ACTION METHOD CODE START---------*/
        [HttpGet]
        public IActionResult UserWiseFeeDetails()
        {
            return View();
        }
        /*----------------- UserWiseFeeDetails ACTION METHOD CODE END---------*/



        /*-----------------USERWISE FEE PAYMENT ACTION METHOD CODE START---------*/
        [HttpGet]
        public IActionResult PaymentAutomationuserwise()
        {
            return View();
        }
        /*----------------- USERWISE FEE PAYMENT ACTION METHOD CODE END---------*/



        //===>>> COMMON DROPDOWN METHOD
        [Authorize]
        public List<SelectListItem> CommonDropdownData(string methodname, string[] Parameters, string text, string value)
        {
            List<SelectListItem> DropdownList = new List<SelectListItem>();
            CommonDropdown obj = new CommonDropdown();
            obj.procedurename = methodname;
            obj.Parameters = Parameters;
            obj.text = text;
            obj.value = value;
            string jsonData = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/" + methodname, content).Result;
            //  HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/"+methodname+"?Parameters=" + Parameters + "&text=" + text + "&value=" + value).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                DropdownList = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return DropdownList;
        }

        //===>>> COMMON INSERT METHOD
        public string CommonInsertingMethod<T>(T obj, string WebApiMethodname)
        {
            string returnval = "";
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + WebApiMethodname, content).Result;
            if (response.IsSuccessStatusCode)
            {
                return returnval = response.Content.ReadAsStringAsync().Result;
            }
            var returnval1 = response.Content.ReadAsStringAsync().Result;
            return "0";
        }
    }
}
