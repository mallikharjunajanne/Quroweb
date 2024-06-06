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
using Connect4m_Web.Models.LMSproperties;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authorization;
using Connect4m_Web.Views;
using Connect4m_Web.Models;

namespace Connect4m_Web.Controllers
{
    [Authorize]
    public class FeeSection : Controller
    {
       //Uri baseAddress = new Uri("https://localhost:44331/api/FeeSctionCtr");
       //Uri baseAddress = new Uri("http://192.168.1.142:98/api/FeeSctionCtr");
       //HttpClient client;

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

        #region STUDENT LOGIN  VIEW CHALLAN DETAILS

        #region VIEW CHALLAN DETAILS
        public IActionResult ViewChallanDetails()
        {
            return View();
        }
        [Authorize]
        public IActionResult BindtblViewfeedetails(ViewChallanDetails viewChallanDetails)
        {
            viewChallanDetails.InstanceId = InstanceId;
            viewChallanDetails.UserId = UserId;
            List<ViewChallanDetails> list =
                CommonMethodobj.CommonListMethod<ViewChallanDetails, ViewChallanDetails>(viewChallanDetails, "/GetViewfeedetailstbl", client);
            return Json(list);
        }

        public IActionResult ChallanDetailsView(int Challanid,int StudentUserId)
        {
            ViewFeeDetails ViewFeeDetails = new ViewFeeDetails();
            ViewFeeDetails.InstanceId = InstanceId;
            ViewFeeDetails.UserId = UserId;
            ViewFeeDetails.StudentUserid = StudentUserId;
            ViewFeeDetails.Challanid = Challanid;
            List<StudentChallanadetails> list =
                CommonMethodobj.CommonListMethod<ViewFeeDetails, StudentChallanadetails>(ViewFeeDetails, "/GetViewfeechallandetails", client);
            if (list[1].TermName !="")
            {
                var Amountword = list[0].Amount;
                //decimal amount = Convert.ToDecimal(Amountword);
               // var wholeNumber = Math.ceil(Amountword);
                string amountWords = ConvertAmountToWords(Amountword);
                ViewBag.Wordtext = amountWords+ " Rupees Only";
            }   
          return PartialView("_PFU_AmountPay_Recipt", list);
        }
        #endregion

        #region VIEW FEE DETAILS
        public IActionResult ViewFeeDetails()
        {
            return View();
        }
        public IActionResult Viewfeetermsddl()
        {
            List<SelectListItem> ddlvalues = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Viewfeetermsddl?StudentUserid=" + UserId+"&InstanceId=" + InstanceId ).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                ddlvalues = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(ddlvalues);
        }

        [Authorize]
        public IActionResult BindtblViewfeeterms(ViewFeeDetails viewfeedetails)
        {
            viewfeedetails.InstanceId = InstanceId;
            viewfeedetails.StudentUserid = UserId;
            List<ViewFeeDetails> list =
                CommonMethodobj.CommonListMethod<ViewFeeDetails, ViewFeeDetails>(viewfeedetails, "/GetViewfeetermstbldata", client);
            return Json(list);
        }

        #endregion

        #endregion

        #region  MANAGE FEE TYPES
        [Authorize]
        public IActionResult ManageFeeTypes()
        {  
            return View();
        }
        [Authorize]
        public IActionResult Bindtblfeetype(string FeeType)
        {
            Feetypes obj = new Feetypes();
            obj.FeeType = FeeType;
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<Feetypes> list = CommonMethodobj.CommonListMethod<Feetypes, Feetypes>(obj, "/GetFeetypstbldata", client);
            return Json(list);
        }
        [Authorize]
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
        [Authorize]
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
        [Authorize]
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
        [Authorize]
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
        [Authorize]
        public IActionResult Deletefeetype(Feetypes obj)
        {
            obj.InstanceId=InstanceId;
            string Returnvalue = CommonInsertingMethod(obj, "/Deletefeetype");
            return Json(Returnvalue);
        }

        #endregion

        #region MANAGE FEE TERMS        
        [Authorize]
        [HttpGet]
        public IActionResult ManageFeeTerms()
        {
            return View();
        }
        [Authorize]
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
        [Authorize]
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
        [Authorize]
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
        [Authorize]
        public IActionResult Insert_feeterms()
        {
            return View();
        }
        [Authorize]
        [HttpPost]
        public IActionResult Insert_feeterms(Feeterms obj)
        {
            //decimal amount = Convert.ToDecimal(obj.Amount);
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

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
        [Authorize]
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
        [Authorize]
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
        [Authorize]
        public IActionResult Deletefeeterm(Feeterms obj)
        {
            obj.InstanceId = InstanceId;
            string Returnvalue = CommonInsertingMethod(obj, "/Deletefeeterm");
            return Json(Returnvalue);
        }

        #endregion

        #region  MANAGE DISCOUNT FEE TYPES
        [Authorize]
        public IActionResult ManageFeeConcedingTypes()
        {
            return View();
        }
        [Authorize]
        public IActionResult Managefeeconcedingtypestbl(Feeconcedingtypes obj)
        {
            //Feeconcedingtypestbl
            obj.ConcedingTypeName = obj.ConcedingTypeName ?? "";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            List<Feeconcedingtypes> list = CommonMethodobj.CommonListMethod<Feeconcedingtypes, Feeconcedingtypes>(obj, "/Feeconcedingtypestbl", client);
            return Json(list);
        }
        [Authorize]
        public IActionResult Insert_ManageFeeConcedingTypes()
        {
            return View();
        }
        [Authorize]
        [HttpPost]
        public IActionResult Insert_ManageFeeConcedingTypes(Feeconcedingtypes obj)
        {
            //InsertFeeconcedingtypes
            decimal amount = Convert.ToDecimal(obj.Amount);
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.Amount = amount;

            string Returnvalue = CommonInsertingMethod(obj, "/InsertFeeconcedingtypes");
            return Json(Returnvalue);            
        }
        [Authorize]
        public IActionResult Update_ManageFeeConcedingTypes(int ConcedingTypeId)
        {
            Feeconcedingtypes editobj = new Feeconcedingtypes();

            editobj.ConcedingTypeId = ConcedingTypeId;
            editobj.InstanceId = InstanceId;
            Feeconcedingtypes model = CommonMethodobj.CommonEditMethod<Feeconcedingtypes, Feeconcedingtypes>(null, "/EditFeeconcedingtypes?ConcedingTypeId=" + ConcedingTypeId, client);
            return View(model);
        }
        [Authorize]
        [HttpPost]
        public IActionResult Update_ManageFeeConcedingTypes(Feeconcedingtypes obj)
        {
            //UpdateFeeconcedingtypes
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            string Returnvalue = CommonInsertingMethod(obj, "/UpdateFeeconcedingtypes");
            return Json(Returnvalue);
        }
        [Authorize]
        public IActionResult Delete_ManageFeeConcedingTypes(int ConcedingTypeId)
        {
            //DeleteFeeconcedingtypes
            Feeconcedingtypes obj = new Feeconcedingtypes();
            obj.InstanceId = InstanceId;
            obj.ConcedingTypeId = ConcedingTypeId;
            obj.CreatedBy = UserId;

            string Returnvalue = CommonInsertingMethod(obj, "/DeleteFeeconcedingtypes");
            return Json(Returnvalue);
        }

        #endregion

        #region  MANAGE BANK ACCOUNTS
        [Authorize]
        public IActionResult ManageBankAccounts()
        {
            return View();
        }
        [Authorize]
        public IActionResult Bankaccountstbl(BankAccounts bank)
        {            
            BankAccounts obj = new BankAccounts();
            obj.AccountNumber = bank.AccountNumber??"";
            obj.BankName = bank.BankName??"";
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            //Bindingbankaccountstbl
            List<BankAccounts> list = CommonMethodobj.CommonListMethod<BankAccounts, BankAccounts>(obj, "/Bindingbankaccountstbl", client);
            return Json(list);
        }
        [Authorize]
        public IActionResult Insert_Bankaccounts()
        {
            return View();
        }
        [Authorize]
        [HttpPost]
        public IActionResult Insert_Bankaccounts(BankAccounts obj)
        {
            //Insertbankaccount
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

            string Returnvalue = CommonInsertingMethod(obj, "/Insertbankaccount");
            return Json(Returnvalue);
        }
        [Authorize]
        [HttpGet]
        public IActionResult Edit_Bankaccounts(int BankAccountId)
        {
            //Editbankaccount
            BankAccounts editobj = new BankAccounts();
            editobj.BankAccountId = BankAccountId;
            editobj.InstanceId = InstanceId;
            BankAccounts model = CommonMethodobj.CommonEditMethod<BankAccounts, BankAccounts>(null, "/Editbankaccount?BankAccountId="+BankAccountId, client);
            return View(model);
        }
        [Authorize]
        [HttpPost]
        public IActionResult Edit_Bankaccounts(BankAccounts obj)
        {
            //Updatebankaccount
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

            string Returnvalue = CommonInsertingMethod(obj, "/Updatebankaccount");
            return Json(Returnvalue);
        }
        [Authorize]
        public IActionResult Delete_Bankaccounts(int BankAccountId)
        {
            BankAccounts obj = new BankAccounts();
            obj.InstanceId = InstanceId;
            obj.BankAccountId = BankAccountId;
            
            string Returnvalue = CommonInsertingMethod(obj, "/DeleteBankaccounts");
            return Json(Returnvalue);
        }

        #endregion

        #region SET FEE FOR USERS
        [Authorize]
        public IActionResult ManageFeeDetails()
        {
            return View();
        }
        [Authorize]
        [HttpPost]
        public IActionResult InsertUserfeedetails(string feeDetailsList)
        {
            List<UserFeedetails> feeDetailsListvalues = JsonConvert.DeserializeObject<List<UserFeedetails>>(feeDetailsList);
            foreach (var feeDetail in feeDetailsListvalues)
            {
                feeDetail.InstanceId = InstanceId;
                feeDetail.CreatedBy = UserId;
            }
            string jsonData = JsonConvert.SerializeObject(feeDetailsListvalues);

            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Insertsetfeeforuser", content).Result;

            string returnvalue = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                returnvalue = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(returnvalue);
        }
        [Authorize]
        [HttpPost]
        public IActionResult InsertUserdiscountfeedetails(string Discountamountuserfeedetails)
        {
            List<Discountfeedetails> Discountamountdetails = JsonConvert.DeserializeObject<List<Discountfeedetails>>(Discountamountuserfeedetails);
            foreach (var Discountdetails in Discountamountdetails)
            {
                Discountdetails.InstanceId = InstanceId;
                Discountdetails.CreatedBy = UserId;
            }
            string jsonData = JsonConvert.SerializeObject(Discountamountdetails);
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Insertdiscountfeedetailsforuser", content).Result;

            string returnvalue = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                returnvalue = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(returnvalue);
        }
        [Authorize]
        [HttpPost] 
        public IActionResult SetfeeforusersGettable(ManageFeeDetails obj)
        {
            List<ManageFeeDetails> DiscountLi = new List<ManageFeeDetails>();
            var feeTypeCheckedTextNamesJson = Request.Form["FeeType_CheckedTextNames"];
            var feeTypeCheckedFeetypeidsJson = Request.Form["FeeTypeCheckedFeetypeids"];
            var feeTypeCheckedTextNames = JsonConvert.DeserializeObject<List<string>>(feeTypeCheckedTextNamesJson);
            var feeTypeCheckedFeetypeids = JsonConvert.DeserializeObject<List<string>>(feeTypeCheckedFeetypeidsJson);

            obj.InstanceId = InstanceId;
            DiscountLi = CommonMethodobj.CommonListMethod<ManageFeeDetails, ManageFeeDetails>(obj, "/SetfeeforuserGettbl", client);
            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fee_set_UserTable_data_Get" + queryString).Result;


            FeeDetailsViewModel viewModel = new FeeDetailsViewModel
            {
                UsersList = DiscountLi,
                FeeTypeCheckedTextNames = feeTypeCheckedTextNames,
                FeeTypeCheckedFeetypeids = feeTypeCheckedFeetypeids
            };

            if (obj.Discount_CheckBoxValue == "True")
            {
                return PartialView("_Fee_Set_DiscountUsers_GetFormBtn_click_TblDt", viewModel);
            }
            else
            {
                return PartialView("_Fee_Set_Users_GetFormBtn_click_TblDt", viewModel);
            }


        }
        [Authorize]
        public IActionResult DiscounttypebydiscountAmountddl(string ConcedingTypeId)
        {
            List<DiscountAmount_DD> items = new List<DiscountAmount_DD>();
            // HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/DicountType_By_DiscountAmt?ConcedingTypeId=" + ConcedingTypeId).Result;
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Discounttypebydiscountamount?InstanceId=" + InstanceId + "&ConcedingTypeId=" + ConcedingTypeId + "&CreatedBy=" + UserId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<DiscountAmount_DD>>(data);
            }
            if (items.Count > 0)
            {
                var AmountTXT = items[0].Amount;        // Assuming you want the Amount from the first item in the list
                return Json(new { Amount = AmountTXT });
            }
            return Json(new { Amount = 0 });

        }
        [Authorize]
        public IActionResult RoleddlBind()
        {
            DropdownClass val = new DropdownClass();

            List<SelectListItem> Rolelist = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Roleddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                Rolelist = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(Rolelist);
        }
        [Authorize]
        public IActionResult DepartmentddlBind()
        {
            List<SelectListItem> Departmentlist = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/Departmentddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Data = MFD_Response.Content.ReadAsStringAsync().Result;
                Departmentlist = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(Departmentlist);
        }
        [Authorize]
        public IActionResult ReferralddlBind()//Referral ddlStudentQuota 
        {
            List<SelectListItem> StudentQuotalist = new List<SelectListItem>();
            //HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_ReferralDD?InstanceId=" + InstanceId).Result;
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/Referralddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string data = MFD_Response.Content.ReadAsStringAsync().Result;
                StudentQuotalist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(StudentQuotalist);
        }
        [Authorize]
        public IActionResult AcademicyearddlBind()
        {
            List<SelectListItem> StudentQuotalist = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/Yearddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string data = MFD_Response.Content.ReadAsStringAsync().Result;
                StudentQuotalist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(StudentQuotalist);
        }
        [Authorize]
        public IActionResult ClassddlBind(int InstanceClassificationId)
        {
            List<SelectListItem> classlist = new List<SelectListItem>();
            //HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/MFD_ClassDD?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/Classddl?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId + "&CreatedBy=" + UserId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string data = MFD_Response.Content.ReadAsStringAsync().Result;
                classlist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(classlist);
        }
        [Authorize]
        public IActionResult TermsddlBind(int AcademicYearId)
        {
            List<SelectListItem> StudentQuotalist = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/Termddl?InstanceId=" + InstanceId + "&AcademicYearId=" + AcademicYearId + "&CreatedBy=" + UserId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string data = MFD_Response.Content.ReadAsStringAsync().Result;
                StudentQuotalist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(StudentQuotalist);
        }
        [Authorize]
        public IActionResult UsersddlBind(int InstanceClassificationId, int InstanceSubClassificationId, int RoleId)
        {
            List<userDropdown> ddllist = new List<userDropdown>();

            string url = $"{client.BaseAddress}/Usersddl?InstanceId={InstanceId}&InstanceClassificationId={InstanceClassificationId}&InstanceSubClassificationId={InstanceSubClassificationId}&RoleId={RoleId}&CreatedBy={UserId}";

            HttpResponseMessage ddlresponse = client.GetAsync(url).Result;
            if (ddlresponse.IsSuccessStatusCode)
            {
                string ddldata = ddlresponse.Content.ReadAsStringAsync().Result;
                ddllist = JsonConvert.DeserializeObject<List<userDropdown>>(ddldata);
            }
            return Json(ddllist);
        }
        [Authorize]
        public IActionResult FeetypeddlBind(int AcademicYearId, int FeeTermId)
        {
            List<SelectListItem> Feetypeslist = new List<SelectListItem>();
            string url = $"{client.BaseAddress}/Feetypeddl?InstanceId={InstanceId}&AcademicYearId={AcademicYearId}&FeeTermId={FeeTermId}&CreatedBy={UserId}";
            HttpResponseMessage ddlresponse = client.GetAsync(url).Result;

            if (ddlresponse.IsSuccessStatusCode)
            {
                string Ftdata = ddlresponse.Content.ReadAsStringAsync().Result;
                Feetypeslist = JsonConvert.DeserializeObject<List<SelectListItem>>(Ftdata);
            }
            return Json(Feetypeslist);
        }

        #endregion

        #region PAY FEE FOR USERS === Payfeeforuser
        [Authorize]
        public IActionResult PayFeeForUsers()
        {
            return View();
        }
        [Authorize]
        public IActionResult Pfudepartmentdd()
        { 
            List<SelectListItem> ddli = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfudepartmentddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string DD_Data = response.Content.ReadAsStringAsync().Result;
                ddli = JsonConvert.DeserializeObject<List<SelectListItem>>(DD_Data);
            }
            return Json(ddli);
        }
        [Authorize]
        public IActionResult PfuStudentquota()
        {  
            List<SelectListItem> SQddli= new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfustudentquotadd?InstanceId=" + InstanceId+ "&CreatedBy="+UserId).Result;    
            if (response.IsSuccessStatusCode)
            {
                string SQuota_DD_Data = response.Content.ReadAsStringAsync().Result;
                SQddli = JsonConvert.DeserializeObject<List<SelectListItem>>(SQuota_DD_Data);
            } 
            return Json(SQddli);
        }
        [Authorize]
        public IActionResult Pfubankaccountsdd()
        {
            List<SelectListItem> ddli = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/pfubankaccountsddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                ddli = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }      
            return Json(ddli);
        }
        [Authorize]
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
        [Authorize]
        public IActionResult PfuSubClass(int InstanceClassificationId)
        {
            List<SelectListItem> Cli= new List<SelectListItem>();
            HttpResponseMessage Clresponse = client.GetAsync(client.BaseAddress + "/Pfusubclass?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId + "&CreatedBy=" + UserId).Result;
            if (Clresponse.IsSuccessStatusCode)
            {
                string Sub_DD_Data = Clresponse.Content.ReadAsStringAsync().Result;
                Cli = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }   
            return Json(Cli);
        }
        [Authorize]
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
        [Authorize]
        [HttpGet]
        public IActionResult Getfeedetailsbyuser(int StudentUserId)
        {
            List<GetUserfeedetails> item = null;
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfufeedetailsforusers?UserId=" + StudentUserId + "&InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<GetUserfeedetails>>(data);
            }
            return Json(item);
        }
        [Authorize]
        public IActionResult Getfeedetailsbyfeeterms(int StudentUserId, string FeeTermIds)
        {
            List<GetUserfeedetails> item = null;
            if (FeeTermIds == "null")
            {
                FeeTermIds = default;
            }
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Termwisesearchfeedetails?UserId=" + StudentUserId + "&InstanceId=" + InstanceId+ "&FeeTermIds="+ FeeTermIds + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<GetUserfeedetails>>(data);
            }
            return Json(item);
        }
        [Authorize]
        public IActionResult Pfufeetermbyfeetype(int FeeTermId)
        {  
            List<SelectListItem> feetypelist= new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Pfufeetermbyfeetypedd?InstanceId=" + InstanceId + "&FeeTermId=" + FeeTermId + "&CreatedBy=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                feetypelist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            } 
            return Json(feetypelist);
        }
        [Authorize]
        public IActionResult Pfufeetypebydiscountdd(int FeeTypeId)
        {
            List<DiscountAndQuantitylist> list = new List<DiscountAndQuantitylist>();         
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PfuDiscounttypebyfeetype?InstanceId=" + InstanceId + "&FeeTypeId=" + FeeTypeId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;

                list = JsonConvert.DeserializeObject<List<DiscountAndQuantitylist>>(data1);              
            }           
            return Json(list);
        }
        [Authorize]
        public IActionResult pfudiscounttypebydiscountamount(int ConcedingTypeId)
        {            
            List<SelectListItem> list = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Discounttypebydiscountamount?InstanceId=" + InstanceId + "&ConcedingTypeId=" + ConcedingTypeId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }    
            return Json(list); 
        }
        [Authorize]
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
        [Authorize]
        [HttpPost]
        public IActionResult Pfuuserfeeinstallment(Feeinstallmentsinsert obj)
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
            return PartialView("_Installmentreceipt", limodel);           
        }
        [Authorize]
        [HttpGet]
        public IActionResult Pfusingleuserpaidamount_edit(Feedetaisledit obj)
        {
            List<Feedetaisleditupdateproperties> item = new List<Feedetaisleditupdateproperties>();
            try
            {
                string data1 = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent("", Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetPfusingleuserpaidamountedit?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1+ "&CreatedBy="+ UserId+ "&InstanceId="+InstanceId).Result;

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
        [Authorize]
        [HttpGet]
        public IActionResult PfusingleuserpaidamountSearchicon(Feedetaisledit obj)
        {
            List<Feedetaisleditupdateproperties> item = new List<Feedetaisleditupdateproperties>();
            try
            {
                string data1 = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent("", Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetPfusingleuserpaidamountedit?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1 + "&CreatedBy=" + UserId + "&InstanceId=" + InstanceId).Result;
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
        [Authorize]
        [HttpPost]
        public IActionResult Pfusingleuserfeeinstallment(string UpdateData, string ChallanDetails)
        {
            //_PFU_PaidAmount_Edit_SingleUser Partial view means updating table
            //_PFU_FeeInstallments_BulkFeeUPDATE Partial view means Challan report view table

            string data1 = JsonConvert.SerializeObject(UpdateData);
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");     
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

        #region PAY FEE CORRECTIONS // PayFeeForUserForChallan 
        [Authorize]
        public IActionResult PayFeeForUserForChallan()
        {
            return View();
        }
        [Authorize]
        public IActionResult Pfudepartmentddl()
        {
            List<SelectListItem> ddli = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfudepartmentddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string DD_Data = response.Content.ReadAsStringAsync().Result;
                ddli = JsonConvert.DeserializeObject<List<SelectListItem>>(DD_Data);
            }
            return Json(ddli);
        }
        [Authorize]
        public IActionResult PfuStudentquotaddl()
        {
            List<SelectListItem> SQddli = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfustudentquotadd?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string SQuota_DD_Data = response.Content.ReadAsStringAsync().Result;
                SQddli = JsonConvert.DeserializeObject<List<SelectListItem>>(SQuota_DD_Data);
            }
            return Json(SQddli);
        }
        [Authorize]
        public IActionResult PfuPaymentddl()
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
        [Authorize]
        public IActionResult Pfubankaccountsddl()
        { 
            List<SelectListItem> ddli = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/pfubankaccountsddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                ddli = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(ddli);
        }
        [Authorize]
        public IActionResult PfuSubClassddl(int InstanceClassificationId)
        {
            List<SelectListItem> Cli = new List<SelectListItem>();
            HttpResponseMessage Clresponse = client.GetAsync(client.BaseAddress + "/Pfusubclass?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId + "&CreatedBy=" + UserId).Result;
            if (Clresponse.IsSuccessStatusCode)
            {
                string Sub_DD_Data = Clresponse.Content.ReadAsStringAsync().Result;
                Cli = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            return Json(Cli);
        }
        [Authorize]
        public IActionResult Payfeecorrectionssearchtbl(Userpayfeecorrections obj)
        {
            List<Payfeecorrectionstbl> items = new List<Payfeecorrectionstbl>();
            try
            {
                obj.InstanceId = InstanceId;
                string data1 = JsonConvert.SerializeObject(obj);
                StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Pfcsearchusers", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data2 = response.Content.ReadAsStringAsync().Result;
                    items = JsonConvert.DeserializeObject<List<Payfeecorrectionstbl>>(data2);
                }
                return Json(items);
            }
            catch (Exception)
            {
                return Json(items);
            }
        }
        [Authorize]
        public IActionResult Pfcuserwisefeedetails(int StudentUserId)
        {
            PFCfeedetailstbl itesmode = new PFCfeedetailstbl();         
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfcuserwisefedetailsedit?UserId=" + StudentUserId + "&InstanceId=" + InstanceId+ "&CreatedBy=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                itesmode = JsonConvert.DeserializeObject<PFCfeedetailstbl>(data);
            }
            return Json(itesmode);
        }
        [Authorize]
        public IActionResult Pfcfeedetailsbyfeetermstbl(int Studentuserid, string FeeTermIds)
        {
            if (FeeTermIds == "null")
            {
                FeeTermIds = default;
            }
            PFCfeedetailstbl Items = new PFCfeedetailstbl();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfcuserswisetabledata?UserId=" + Studentuserid + "&FeeTermIds=" + FeeTermIds + "&InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Items = JsonConvert.DeserializeObject<PFCfeedetailstbl>(data);
            }
            return Json(Items);
        }
        [Authorize]
        [HttpPost]
        public IActionResult Pfcamountpayreceipt(Feeinstallmentsinsert obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;
            obj.PaymentDate = DateTime.Now;

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            //HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/FeeInstallments_INSERT_challan?", content).Result;
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Feeinstallmentsreceipts?", content).Result;

            FeeInstallmentResult items = new FeeInstallmentResult();
            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<FeeInstallmentResult>(data2);
            }

            int returnmessage = int.Parse(items.Insertretunmessage);
            int ReceiptNo = int.Parse(items.ReceiptNo);
            List<ChallanaDetails> limodel = new List<ChallanaDetails>();
            limodel.Add(new ChallanaDetails
            {
                Challana_TermName = obj.Challana_TermName,                            //1  "Challana_TermName",              
                Challana_FeeType = obj.Challana_FeeType,                              //2  "Challana_FeeType",               
                Challana_FeeAmount = double.Parse(obj.Challana_FeeAmount),            //3  "Challana_FeeAmount",             
                Challana_DiscountType = obj.Challana_DiscountType,                    //4  "Challana_DiscountType",          
                Challana_DiscountAmount = obj.Challana_DiscountAmount,                //5  "Challana_DiscountAmount",        
                Challana_PaidAmount = obj.Challana_PaidAmount,
                Challana_PayingAmount = double.Parse(obj.Challana_PayingAmount),      //6  "Challana_PaidAmount",      
                Challana_DueAmount = obj.Challana_DueAmount,                          //7  "Challana_PayingAmount",----          
                Challana_BalanceDue = double.Parse(obj.Challana_BalanceDue),          //8  "Challana_DueAmount",             
                Challana_DueDate = obj.Challana_DueDate,                              //9  "Challana_BalanceDue",            
                Challana_UserRegId = obj.Challana_UserRegId,                          //10 "Challana_DueDate",               
                Challana_ClassificationName = obj.Challana_ClassificationName,        //11 "Challana_UserRegId",             
                Challana_subclassificationName = obj.Challana_subclassificationName,  //12 "Challana_ClassificationName",    
                Description = obj.Description,
                Challana_UserName = obj.Challana_UserName,                            //13 "Challana_subclassificationName", 
                ReturnStringValue = returnmessage,

            });
            return PartialView("_PFUC_AmountPay_Recipts", limodel);
        }
        [Authorize]
        [HttpGet]
        public IActionResult PfcPaidamountedituser(Feedetaisledit obj)
        {
            List<Feedetaisleditupdateproperties> item = new List<Feedetaisleditupdateproperties>();            
            string data1 = JsonConvert.SerializeObject(obj);
            int Studentuserid = obj.UserId;
            int FeeTermId = obj.FeeTermId;
            int UserFeeId1 = obj.UserFeeId1;

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfcpaidamountedituser?Studentuserid=" + Studentuserid + "&FeeTermId=" + FeeTermId + "&UserFeeId1=" + UserFeeId1 + "&InstanceId="+InstanceId+ "&CreatedBy="+UserId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Feedetaisleditupdateproperties>>(data);
            }
            return Json(item);
        }

        [Authorize]
        [HttpGet]
        //public IActionResult PFU_FC_PaidAmount_Edit_User(Feedetaisledit obj)Pfcfcpaidamountedituser
        public IActionResult Pfcfcpaidamountedituser(Feedetaisledit obj)
        {
            List<Feedetaisleditupdateproperties> item = new List<Feedetaisleditupdateproperties>();      
            string data1 = JsonConvert.SerializeObject(obj);
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Pfcpaidamountedituser?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;
            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFUC_PaidAmount_EditUsers_Get?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;


            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<Feedetaisleditupdateproperties>>(data);
            }
            ViewBag.itemscount = item.Count();
            return PartialView("_Payfeecorrectionspaidamountupdate", item);
            //return PartialView("_PFU_FC_PaidAmount_Edit_User", item);
         }
        [Authorize]
        [HttpPost]
        public IActionResult PFUC_FeeInstallments_BulkFeeUPDATE(string UpdateData, string ChallanDetails)
        {
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
        [Authorize]
        public IActionResult PFUC_Termidbyfeetype(int FeeTermId)
        {           
            List<SelectListItem> list = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/PFU_Feetermbyfeetype?InstanceId=" + InstanceId + "&FeeTermId=" + FeeTermId+ "&CreatedBy="+UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }           
            return Json(list);
        }
        [Authorize]
        public IActionResult Pfucfeetypebydiscountdd(int FeeTypeId)
        {
            DiscountAndQuantitylist list = new DiscountAndQuantitylist();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PfuDiscounttypebyfeetype?InstanceId=" + InstanceId + "&FeeTypeId=" + FeeTypeId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;

                list = JsonConvert.DeserializeObject<DiscountAndQuantitylist>(data1);
            }
            return Json(list);
        }
        [Authorize]
        [HttpPost]
        //public IActionResult PFC_SaveFee_UpdateFee_ByTblUser(int UserId, int FeeTermId, int FeeTypeId, string Amount, int ChallanId, DateTime DueDate)
        public IActionResult PFC_FeetypetermsInsert_Update(PayFeeCorrectionsupdateinpayfeeforusers obj)
        {
            obj.CreatedBy = UserId;
            obj.InstanceId= InstanceId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PfcuserfeeInsert_update", content).Result;

            var items = "";
            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(items);
        }
        [Authorize]
        [HttpPost]
        public IActionResult PfcTermsdlt(PayFeeCorrectionsupdateinpayfeeforusers obj)
        {
            //public IActionResult PFUC_Terms_Delte(int InstanceId, int UserId, int TermId, int TypeId, int ChallanId)
            obj.CreatedBy = UserId;
            obj.InstanceId = InstanceId;
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/Pfcfeetermsdelete", content).Result;

            var items = "";
            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(items);
        }

        #endregion
        //_PFU_FeeInstallments_BulkFeeUPDATE
        //_PFU_PaidAmount_Edit_SingleUser
        //_PFU_AmountPay_Recipt

        #region  GenerateFeeReceipt     GENERATE FEE CHALLAN
        [Authorize]
        public IActionResult GenerateFeeReceipt()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;
            return View();
        }
        [Authorize]
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
        [Authorize]
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
        [Authorize]
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
        [Authorize]
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

        #region VIEW TERM WISE FEE DETAILS
        [HttpGet]
        public IActionResult ViewTermWiseFeeDetails()
        {
            return View();
        }
        public IActionResult BindtermWiseddl()
        {
            List<SelectListItem> ddllist = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/TermWisefeedetailsddl?InstanceId=" + InstanceId + "&CreatedBy=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                ddllist = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(ddllist);
        }

        [HttpPost]
        public IActionResult ViewTermWiseFeeDetails_TableData(TermWiseFeeDetails termWisefeedetails)
        {
            TermWiseFeeDetails details = new TermWiseFeeDetails();
            termWisefeedetails.InstanceId = InstanceId;
            termWisefeedetails.CreatedBy = UserId;
            var jsonContent = JsonConvert.SerializeObject(termWisefeedetails);
            var contentString = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/GetAllChallanDetails", contentString).Result;
            if (response.IsSuccessStatusCode)
            {
                string Cl_data = response.Content.ReadAsStringAsync().Result;
                details = JsonConvert.DeserializeObject<TermWiseFeeDetails>(Cl_data);
            }
            ViewBag.Table1 = details.Table1;
            ViewBag.Table2 = details.Table2;
            return PartialView("_ViewTermWiseFeeDetails_TableData");
        }

        #endregion

        #region SEND FEE DUE REMAINDERS (FEE STATUS)
        [HttpGet]
        public IActionResult FeeStatus()
        {
         return View();
        }
        public IActionResult Bindfeestatusddl()
        {
            DropdownLists ddllists = new DropdownLists();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/GetFeestatusddls?InstanceId=" + InstanceId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                ddllists = JsonConvert.DeserializeObject<DropdownLists>(data);
            }
            return Json(ddllists);

        }
        public IActionResult Departmentbysubclassddl(int Classificationid)
        {
            List<SelectListItem> Subclasslist = new List<SelectListItem>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/DepartmentbyClassddl?InstanceId=" + InstanceId + "&Classificationid=" + Classificationid + "&CreatedBy=" + UserId).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                Subclasslist = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(Subclasslist);
        }
        public IActionResult Acadamicyearbytermsddl(int Academiyearid)
        {
            List<SelectListItem> Termsddllist = new List<SelectListItem>();
            //HttpResponseMessage Fs_Response = client.GetAsync(client.BaseAddress + "/FeeStatus_FeeTermDD?InstanceId=" + InstanceId + "&AcademicYearId=" + AcademicYearId).Result;
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Getfeestatustermsddl?InstanceId=" + InstanceId + "&Academicyearid=" + Academiyearid).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Data = Response.Content.ReadAsStringAsync().Result;
                Termsddllist = JsonConvert.DeserializeObject<List<SelectListItem>>(Data);
            }
            return Json(Termsddllist);
        }
        public IActionResult Feetermbyfeetypes(int Academicyearid, int Feetermid)
        {
            List<SelectListItem> typsddl = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Getfeestatusfeetypesddl?InstanceId=" + InstanceId + "&Academicyearid=" + Academicyearid + "&FeeTermId=" + Feetermid+ "&CreatedBy="+UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                typsddl = JsonConvert.DeserializeObject<List<SelectListItem>>(data);
            }
            return Json(typsddl);
        }
        public IActionResult Bindfeestatustbl(Feestatus feestatus)
        {
            ViewBag.ButtonName = null;
            feestatus.InstanceId = InstanceId;
            feestatus.CreatedBy = UserId;
            List<Feestatusdetails> list = CommonMethodobj.CommonListMethod<Feestatus, Feestatusdetails>(feestatus, "/Getfeestatustable", client);
            ViewBag.ButtonName = feestatus.Actionbuttonvalue.ToUpper();
            ViewBag.ItemsCount = list.Count(); 
            return PartialView("_TableData_FeeStatus", list);
        }

        [HttpGet]
        public IActionResult FeeStatus_ByIndividual(int FeeTermId, string Studentid)
        {
            Feestatus feestatus = new Feestatus();
            feestatus.FeeTermId = FeeTermId;
            feestatus.StudentUserId = Studentid;
            feestatus.InstanceId = InstanceId;
            feestatus.CreatedBy = UserId;
            List<FeestatusIndividual> list = CommonMethodobj.CommonListMethod<Feestatus, FeestatusIndividual>(feestatus, "/Getfeestatusbyindividualtable", client);
            
            ViewBag.ChallanaUsersCOunt = list.Count();
            ViewBag.ChallanaUsers = list;
            return PartialView("_FeeStatus_ByIndividual", list);
        }

        [HttpPost]
        public IActionResult FeeStatus_SmsMails(string CollectedData, string Subject,string Typeoff,Boolean StudentSMSChk,Boolean ParentSMSChk, Boolean StudentEmailChk, Boolean ParentEmailChk)
        {
            
            var decodedCollectedData = System.Web.HttpUtility.UrlDecode(CollectedData);
            var collectedData = Newtonsoft.Json.JsonConvert.DeserializeObject<CommunicationData>(decodedCollectedData);

            RequestedDataModel requestedData = new RequestedDataModel();
            requestedData.Subject = Subject;
            requestedData.InstanceId = InstanceId;
            requestedData.CreatedBy= UserId;
            if (Typeoff == " PARTIAL FEE ")
            {
                requestedData.Typeoff = "PARTIALFEE";
            }
            else if (Typeoff == " NO FEE ")
            {
                requestedData.Typeoff = "NOFEE";
            }
            requestedData.Studentphonenumbers = String.Join(",", collectedData.studentMobileNumbers);
            requestedData.Parentphonenumbers = String.Join(",", collectedData.parentMobileNumbers);
            requestedData.Studentemails = String.Join(",", collectedData.studentEmails);
            requestedData.Parentemails = String.Join(",", collectedData.parentEmails);
            requestedData.Studentsmsstatus = String.Join(",", collectedData.Studentsmsstatus);
            requestedData.Parentsmsstatus = String.Join(",", collectedData.Parentsmsstatus);
            requestedData.Studentids = String.Join(",", collectedData.Studentids);
            requestedData.StudentSMSChk = StudentSMSChk;
            requestedData.ParentSMSChk = ParentSMSChk;
            requestedData.StudentEmailChk = StudentEmailChk;
            requestedData.ParentEmailChk = ParentEmailChk;

            string Returnvalue = CommonInsertingMethod(requestedData, "/FeestatusSendingsmsemails");
            return Json(Returnvalue);
        }

        #endregion

        /*----====Feereceipt Action methods start ====----*/
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
            HttpResponseMessage ClS_DD_Response = client.GetAsync(client.BaseAddress + "/ddlClassification?InstanceId=" + InstanceId+ "&CreatedBy="+UserId).Result;
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
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/Classddl?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
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
        /*----====Feereceipt Action methods start ====----*/


        /*----====TransferChallan Action Method Code Start ====----*/
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
        /*----====TransferChallan Action Method Code End ====----*/


        /*----====Fee Challana Reports Action Method Code Start ====----*/
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
            List<FeeReports> items = new List<FeeReports>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/ChellanaDetails?ChallanId=" + ChallanId + "&UserId=" + UserId).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<FeeReports>>(data);
            }
            return PartialView("_GetChellanaDetails", items);
        }
        /*----==== Fee Challana Reports Action Method Code End ====----*/

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

        /*----==== DROPDOWNS DATA BIND ACTION METHOD CODE START ====----*/

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
        /*----==== DROPDOWNS DATA BIND ACTION METHOD CODE END ====----*/

        public IActionResult FeeUploadnew()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.Instanceid = InstanceId;
            return View();
        }


    


        /*----====VIEW STUDENT ACCOUNT ACTION METHOD CODE START ====----*/
        [HttpGet]
        public IActionResult ViewallChallandetailsTermwise()
        {
            //var InstanceId = Request.Cookies["INSTANCEID"];
            //ViewBag.Instance = InstanceId;

            return View();
        }
        public IActionResult Vacdt_Departmentddl()
        {

            List<SelectListItem> li = new List<SelectListItem>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/VaCdt_Classificaation_DD?InstanceId=" + InstanceId).Result;
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
        public IActionResult Userwise_FeeInstallments(int StudentUserId)
        {

            List<ChallandetailsTermwise> Fee_installments_details = new List<ChallandetailsTermwise>();

            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Userwise_FeeInstallments?UserId=" + StudentUserId).Result;

            if (Response.IsSuccessStatusCode)
            {
                string Cl_data = Response.Content.ReadAsStringAsync().Result;
                Fee_installments_details = JsonConvert.DeserializeObject<List<ChallandetailsTermwise>>(Cl_data);
            }
            ViewBag.Details = Fee_installments_details;

            return View();
        }
        public IActionResult Userwise_FeeInstallmentsReport(int UserId,int ChallanId, string StartDate)
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
        /*----====VIEW STUDENT ACCOUNT ACTION METHOD CODE START ====----*/

        /*----====Fee Challan Details ACTION METHOD CODE START ====----*/
        [HttpGet]
        public IActionResult FeeChallanDetails()
        {
            return View();
        }
        /*----====Fee Challan Details ACTION METHOD CODE END ====----*/


        /*----==== FeePeriodWiseReport  ACTION METHOD CODE START ====----*/
        [HttpGet]
        public IActionResult FeePeriodWiseReport()
        {
            return View();
        }
        /*----==== FeePeriodWiseReport ACTION METHOD CODE END ====----*/


        /*----==== ChallanGenerateddates ACTION METHOD CODE START ====----*/
        [HttpGet]
        public IActionResult ChallanGenerateddates()
        {
            return View();
        }
        /*----==== ChallanGenerateddates ACTION METHOD CODE END ====----*/


        /*----==== ViewTermwisefeereportNew ACTION METHOD CODE START ====----*/
        [HttpGet]
        public IActionResult ViewTermwisefeereportNew()
        {
            return View();
        }
        /*----==== ViewTermwisefeereportNew ACTION METHOD CODE END ====----*/


        /*----==== UserWiseFeeDetails ACTION METHOD CODE START ====----*/
        [HttpGet]
        public IActionResult UserWiseFeeDetails()
        {
            return View();
        }
        /*----==== UserWiseFeeDetails ACTION METHOD CODE END ====----*/


        /*----==== USERWISE FEE PAYMENT ACTION METHOD CODE START ====----*/
        [HttpGet]
        public IActionResult PaymentAutomationuserwise()
        {
            return View();
        }
        /*----==== USERWISE FEE PAYMENT ACTION METHOD CODE END ====----*/



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

        public string ConvertAmountToWords(decimal amount)
        {

            if (amount == 0)
            {
                return "Zero";
            }

            string[] ones = {
                "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
                "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
            };

            string[] tens = {
                "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
            };

            string words = "";

            if ((int)(amount / 10000000) > 0)
            {
                words += ConvertAmountToWords((int)(amount / 10000000)) + " Crore ";
                amount %= 10000000;
            }

            if ((int)(amount / 100000) > 0)
            {
                words += ConvertAmountToWords((int)(amount / 100000)) + " Lakh ";
                amount %= 100000;
            }

            if ((int)(amount / 1000) > 0)
            {
                words += ConvertAmountToWords((int)(amount / 1000)) + " Thousand ";
                amount %= 1000;
            }

            if ((int)(amount / 100) > 0)
            {
                words += ConvertAmountToWords((int)(amount / 100)) + " Hundred ";
                amount %= 100;
            }

            if (amount > 0)
            {
                if (words != "")
                    words += "and ";

                if (amount < 20)
                {
                    words += ones[(int)amount];
                }
                else
                {
                    words += tens[(int)(amount / 10)];
                    if ((int)(amount % 10) > 0)
                        words += " " + ones[(int)(amount % 10)];
                }
            }

            return words;
        }

    }
}
