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
        public FeeSection(HttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/FeeSctionCtr");
        }

        /*--------------------------------MANAGE FEE TYPES CODE START  GET AND POST AND DELETE AND EDIT AND UPDATE ----------------------------------------------*/
        public IActionResult ManageFeeTypes(string FeeTypeSearchname)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];

            var ConcedingTypeName = " ";



            List<Cr_FT> Dis_Typesli = new List<Cr_FT>();
            HttpResponseMessage Dis_Types_Repsonse = client.GetAsync(client.BaseAddress + "/DiscountTypes_DD?InstanceId=" + InstanceId + "&ConcedingTypeName=" + ConcedingTypeName).Result;
            if (Dis_Types_Repsonse.IsSuccessStatusCode)
            {
                string DD_Data = Dis_Types_Repsonse.Content.ReadAsStringAsync().Result;
                Dis_Typesli = JsonConvert.DeserializeObject<List<Cr_FT>>(DD_Data);
            }

            var discountItems = new List<SelectListItem>
            {
                new SelectListItem { Value = "", Text = "--Select--" } // Add the "--Select--" option as the default
            };

            foreach (var item in Dis_Typesli)
            {
                discountItems.Add(new SelectListItem { Value = item.ConcedingTypeId.ToString(), Text = item.ConcedingTypeName.ToString() });
            }
            ViewBag.Discount_Types_DDValues = new SelectList(discountItems, "Value", "Text");




            return View();
        }


        [HttpPost]
        public IActionResult ManageFeeTypes(Fee_Section Obj)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            var CreatedBy = Request.Cookies["LoginUserId"];

            string data1 = JsonConvert.SerializeObject(Obj);

            decimal amount = Convert.ToDecimal(Obj.Amount);
            string concdingIds = string.Join(",", Obj.ConcedingtypeIds); // Convert the list to a comma-separated string

            string url = $"{client.BaseAddress}/ManageFeeTypes_Post?InstanceId={InstanceId}&FeeType={Obj.FeeType}&FeeTypeStatus={Obj.FeeTypeStatus}&Description={Obj.Description}&Quantity={Obj.Quantity}&Amount={amount}&ConcedingtypeIds={concdingIds}&CreatedBy={CreatedBy}";
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(url, content).Result;

            var data2 = "";
            var items = "";

            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }



            return Json(items);
        }

        public IActionResult Tbl_FeeTypes(string FeeTypeSearchname)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];

            List<Fee_Section> Feeli = new List<Fee_Section>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/Fee_TypesTbl?InstanceId=" + InstanceId + "&FeeType=" + FeeTypeSearchname).Result;
            if (Response.IsSuccessStatusCode)
            {
                string Cl_data = Response.Content.ReadAsStringAsync().Result;
                Feeli = JsonConvert.DeserializeObject<List<Fee_Section>>(Cl_data);
            }
            ViewBag.Feeli = Feeli;

            return new JsonResult(ViewBag.Feeli);
        }


        [HttpGet]
        public IActionResult FeeType_Edit(int FeeTypeId)
        {
            //Fee_Section item = null;
            List<Fee_Section> item = new List<Fee_Section>();

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Fee_Type_EditGet?FeeTypeId=" + FeeTypeId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                //item = JsonConvert.DeserializeObject<Fee_Section>(data);
                item = JsonConvert.DeserializeObject<List<Fee_Section>>(data);
            }

            return Json(item);
        }

        [HttpPost]
        public IActionResult FeeType_Edit_To_Update(Fee_Section obj)
        {
            var UpdatedBy = Request.Cookies["LoginUserId"];

            //exec stp_tblInstanceFeeTypes_UPDATE @FeeTypeId = 4956,@InstanceId = 545,@FeeType = 'Test123456',@FeeTypeStatus = 0,@Description = 'abbababa',@Quantity = 1,@Amount = 5000.00,@UpdatedBy = 217606,@UpdatedDate = '2023-07-13 17:03:39.643',@ConcedingtypeIds = '543',@ReceiptCode = default,@ReceiptNoFrom = 0

            decimal amount = Convert.ToDecimal(obj.Amount);
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/FeeType_Update?InstanceId=" + obj.InstanceId + "&FeeTypeId=" + obj.FeeTypeId + "&FeeType=" + obj.FeeType + "&FeeTypeStatus=" + obj.FeeTypeStatus + "&Description=" + obj.Description + "&Quantity=" + obj.Quantity + "&Amount=" + amount + "&ConcedingTypeId=" + obj.ConcedingTypeId + "&UpdatedBy=" + UpdatedBy, content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);

        }


        [HttpPost]
        public IActionResult Delete_FeeType(int InstanceId, int concedingTypeId, int FeeTypeId)
        {
            HttpResponseMessage response = client.DeleteAsync(client.BaseAddress + "/DeleteFeeType?InstanceId=" + InstanceId + "&ConcedingtypeId=" + concedingTypeId + "&FeeTypeId=" + FeeTypeId).Result;
            string result = "";
            if (response.IsSuccessStatusCode)
            {
                string Data = response.Content.ReadAsStringAsync().Result;
                result = JsonConvert.DeserializeObject<string>(Data);
            }
            return Json(result);
        }



        /*--------------------------------MANAGE FEE TYPES CODE END  GET AND POST AND DELETE AND EDIT AND UPDATE ----------------------------------------------*/















        /*--------------------------------- MANAGE DISCOUNT FEE TYPES CODE START---------------------------------------*/

        public IActionResult ManageFeeConcedingTypes()
        {
            return View();
        }


        [HttpPost]
        public ActionResult ManageFeeConcedingTypes(Fee_Section obj)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            var CreatedBy = Request.Cookies["LoginUserId"];


            decimal amount = Convert.ToDecimal(obj.Amount);


            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");

            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManageCreateDiscountType?InstanceId=" + InstanceId + "&ConcedingTypeName=" + obj.ConcedingTypeName + "&Description=" + obj.Description + "&Amount=" + amount + "&CreatedBy=" + CreatedBy, content).Result;

            var data2 = "";
            var items = "";

            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            //return View();
            return Json(items);
        }



        /*--------------------------------MANAGE DISCOUNT FEE TYPE ACTION METHODS START-----------------------------------*/


        [HttpGet]
        public IActionResult DiscountFT_Edit(int ConcedingTypeId)
        {
            Fee_Section item = null;

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/DicountFee_Type_EditGet?ConcedingTypeId=" + ConcedingTypeId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<Fee_Section>(data);
            }

            return Json(item);
        }

        [HttpPost]
        public IActionResult DiscountFT_Edit(Fee_Section obj)
        {
            var UpdatedBy = Request.Cookies["LoginUserId"];

            //exec stp_tblFeeConcedingTypes_UPDATE @ConcedingTypeId = 1970,@InstanceId = 545,@ConcedingTypeName = 'TestDiscount',@Amount =$150.0000,@Description = 'ABCD bc',@UpdatedBy = 217606,@UpdatedDate = '2023-07-14 14:43:30.390'

            decimal amount = Convert.ToDecimal(obj.Amount);
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/DicountFee_Type_EditUpdate?ConcedingTypeId=" + obj.ConcedingTypeId + "&InstanceId=" + obj.InstanceId + "&ConcedingTypeName=" + obj.ConcedingTypeName + "&Amount=" + amount + "&Description=" + obj.Description + "&UpdatedBy=" + UpdatedBy, content).Result;

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
            var InstanceId = Request.Cookies["INSTANCEID"];

            List<Fee_Section> DiscountLi = new List<Fee_Section>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/ManageDiscountType_Tbl?InstanceId=" + InstanceId + "&ConcedingTypeName=" + ConcedingTypeName).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                DiscountLi = JsonConvert.DeserializeObject<List<Fee_Section>>(data);
            }
            ViewBag.DiscountCount = DiscountLi.Count();
            ViewBag.Discount = DiscountLi;

            //return View();

            return new JsonResult(ViewBag.Discount);
        }


        public IActionResult Delete_Manage_FeeDisountType(int ConcedingTypeId)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
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




        /*--------------------------------- MANAGE DISCOUNT FEE TYPES CODE END---------------------------------------*/







        /*----------------------------------MANAGE FEE TERMS METHODS START----------------------------------------------------*/



        [HttpGet]
        public IActionResult ManageFeeTerms(string TermName, string AcademicYearId)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];

            /*AcademicYear DD Code start*/
            List<SelectListItem> AcYear = new List<SelectListItem>();
            HttpResponseMessage YearResponse = client.GetAsync(client.BaseAddress + "/AcademicYear_GETTYPES?InstanceId=" + InstanceId).Result;
            if (YearResponse.IsSuccessStatusCode)
            {
                string Yearsdata = YearResponse.Content.ReadAsStringAsync().Result;
                AcYear = JsonConvert.DeserializeObject<List<SelectListItem>>(Yearsdata);
            }
            ViewBag.AcadamicYearDD = AcYear;

            /*AcademicYear DD Code End*/


            /*Fee Type DD Code start*/
            List<SelectListItem> FeeTypeDD = new List<SelectListItem>();
            HttpResponseMessage FeeTyperesponse = client.GetAsync(client.BaseAddress + "/FeeTypes_GETTypes?InstanceId=" + InstanceId).Result;
            if (FeeTyperesponse.IsSuccessStatusCode)
            {
                string FTypes = FeeTyperesponse.Content.ReadAsStringAsync().Result;
                FeeTypeDD = JsonConvert.DeserializeObject<List<SelectListItem>>(FTypes);
            }
            SelectListItem defaultOption = new SelectListItem
            {
                Value = "",
                Text = "--Select--"
            };
            FeeTypeDD.Insert(0, defaultOption);

            SelectList feeTypesSelectList = new SelectList(FeeTypeDD, "Value", "Text");

            ViewBag.Feetypesdd = feeTypesSelectList;

            /*Fee Type DD Code End*/


            /*FeeTerms_Tbl Code start*/


            /*FeeTerms_Tbl Code End*/

            return View();
        }

        [HttpPost]
        public IActionResult ManageFeeTerms(Manage_Fee_Terms Obj)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            var CreatedBy = Request.Cookies["LoginUserId"];

            string data1 = JsonConvert.SerializeObject(Obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/New_ManageFeeTerms?InstanceId=" + InstanceId + "&AcademicYearId=" + Obj.AcademicYearId + "&FeeTypeIds=" + Obj.FeeTypeIds + "&TermName=" + Obj.TermName + "&Description=" + Obj.Description + "&CreatedBy=" + CreatedBy, content).Result;
            var data2 = "";
            var items = "";

            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            //return View();
            return Json(items);
        }



        public IActionResult Fee_Terms_GetTable(string TermName, string AcademicYearId)
        {


            var InstanceId = Request.Cookies["INSTANCEID"];

            List<Manage_Fee_Terms> DiscountLi = new List<Manage_Fee_Terms>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/ManageFeeTerms_Tbl?InstanceId=" + InstanceId + "&AcademicYearId=" + AcademicYearId + "&TermName=" + TermName).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                DiscountLi = JsonConvert.DeserializeObject<List<Manage_Fee_Terms>>(data);
            }

            ViewBag.FT_Tbl = DiscountLi;

            return new JsonResult(ViewBag.FT_Tbl);
        }


        public IActionResult Delete_FeeTerm(string InstanceId, string FeeTermId, string FeeTypeId)
        {

            //var InstanceId = Request.Cookies["INSTANCEID"];
            //HttpResponseMessage response = client.DeleteAsync(client.BaseAddress + "/Delete_Discount_FeeType?InstanceId=" + InstanceId + "&ConcedingTypeId=" + ConcedingTypeId).Result;
            //string result = "";
            //if (response.IsSuccessStatusCode)
            //{
            //    string Data = response.Content.ReadAsStringAsync().Result;
            //    result = JsonConvert.DeserializeObject<string>(Data);
            //}

            //return Json(result);

            int Instanceid = int.Parse(InstanceId);
            int FeeTermid = int.Parse(FeeTermId);

            HttpResponseMessage response = client.DeleteAsync(client.BaseAddress + "/Delete_FeeTerm?InstanceId=" + Instanceid + "&FeeTermId=" + FeeTermid + "&FeeTypeId=" + FeeTypeId).Result;
            string result = "";
            if (response.IsSuccessStatusCode)
            {
                string Data = response.Content.ReadAsStringAsync().Result;
                result = JsonConvert.DeserializeObject<string>(Data);
            }

            return Json(result);
        }

        [HttpGet]
        public IActionResult Fee_Terms_EditGet(int FeeTermId)
        {
            Manage_Fee_Terms item = null;

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/FeeTermId_EditGet?FeeTermId=" + FeeTermId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<Manage_Fee_Terms>(data);
            }

            return Json(item);
        }

        [HttpPost]
        public IActionResult Fee_Terms_EditUpdate(Manage_Fee_Terms obj)
        {

            var UpdatedBy = Request.Cookies["LoginUserId"];

            // exec stp_tblFeeTerms_UPDATE @FeeTermId=4616,@InstanceId=545,@AcademicYearId=2956,@TermName='test12345',@Description='sdsdf',@UpdatedBy=217606,@UpdatedDate='2023-07-15 10:58:58.960',@FeeTypeIds='1467'


            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/FeeTermId_EditUpdate?FeeTermId=" + obj.FeeTermId + "&InstanceId=" + obj.InstanceId + "&AcademicYearId=" + obj.AcademicYearId + "&TermName=" + obj.TermName + "&Description=" + obj.Description + "&UpdatedBy=" + UpdatedBy + "&FeeTypeIds=" + obj.FeeTypeIds, content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);
        }


        /*----------------------------------MANAGE FEE TERMS METHODS END----------------------------------------------------*/








        /*----------------------------------MANAGE BANK ACCOUNTS ACTION METHODS START ----------------------------------*/

        public IActionResult Manage_Bank_Accounts()
        {
            return View();
        }

        public IActionResult M_N_A_Tbl(string AccountNumber, string BankName)
        {
            //exec stp_tblInstanceBankAccounts_SEARCH @InstanceId=545,@AccountNumber='',@BankName=''
            var InstanceId = Request.Cookies["INSTANCEID"];

            List<Manage_Bank_accounts> DiscountLi = new List<Manage_Bank_accounts>();
            HttpResponseMessage Response = client.GetAsync(client.BaseAddress + "/ManageBankAccounts_Tbl?InstanceId=" + InstanceId + "&AccountNumber=" + AccountNumber + "&BankName=" + BankName).Result;
            if (Response.IsSuccessStatusCode)
            {
                string data = Response.Content.ReadAsStringAsync().Result;
                DiscountLi = JsonConvert.DeserializeObject<List<Manage_Bank_accounts>>(data);
            }

            ViewBag.FT_Tbl = DiscountLi;

            return new JsonResult(ViewBag.FT_Tbl);
        }


        public IActionResult Bank_account_Delete(string InstanceId, string BankAccountId)
        {
            int Instanceid = int.Parse(InstanceId);
            int BankAccountid = int.Parse(BankAccountId);

            HttpResponseMessage response = client.DeleteAsync(client.BaseAddress + "/Delete_BankAccounts?InstanceId=" + Instanceid + "&BankAccountId=" + BankAccountid).Result;
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
        public IActionResult ManageBankAccount_EditUpdate(Manage_Bank_accounts obj)
        {
            var UpdatedBy = Request.Cookies["LoginUserId"];


            //int BankAccountId,int InstanceId,string AccountNumber,string Address,string BranchCode,string IFCcode,string BankName,string Description,string UpdatedBy

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ManageBankAccount_EditUpdate?InstanceId=" + obj.InstanceId + "&BankAccountId=" + obj.BankAccountId + "&AccountNumber=" + obj.AccountNumber + "&Address=" + obj.Address + "&BranchCode=" + obj.BranchCode + "&IFCcode=" + obj.IFCcode + "&BankName=" + obj.BankName + "&Description=" + obj.Description + "&UpdatedBy=" + UpdatedBy, content).Result;

            string items = "";
            if (response.IsSuccessStatusCode)
            {
                string data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);
        }

        [HttpPost]
        public IActionResult Manage_Bank_Accounts(Manage_Bank_accounts obj)
        {

            //   New_BankAccounts_Create exec stp_tblInstanceBankAccounts_INSERT InstanceId=545,AccountNumber='123456789',BankName='ABCD',Address='Bank Branch Address',BranchCode='154263',IFCcode='1452369871',Description='Description',AccountName=default,Swiftcode=default,CreatedBy=217606,CreatedDate='2023-07-15 15:40:06.660'
            var InstanceId = Request.Cookies["INSTANCEID"];
            var CreatedBy = Request.Cookies["LoginUserId"];

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/New_BankAccounts_Create?InstanceId=" + InstanceId + "&AccountNumber=" + obj.AccountNumber + "&BranchCode=" + obj.BranchCode + "&IFCcode=" + obj.IFCcode + "&BankName=" + obj.BankName + "&Address=" + obj.Address + "&Description=" + obj.Description + "&CreatedBy=" + CreatedBy, content).Result;
            var data2 = "";
            var items = "";

            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            //return View();
            return Json(items);
        }

        /*----------------------------------MANAGE BANK ACCOUNTS ACTION METHODS END ----------------------------------*/





        /*==========================SET FEE FOR USERS ACTION METHOD  START==================================*/

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


        /*==========================SET FEE FOR USERS ACTION METHOD  END==================================*/




        /*==========      PayFeeForUser ACTION METHOD GET AND POST METHOD START ===========*/

        public IActionResult PayFeeForUser()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;
            return View();
        }

        [HttpPost]
        public IActionResult PayFeeForUser(PAY_FEE_BY_USERS obj)
        {
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ForPayFee_SearchUsers", content).Result;
            var data2 = "";
            List<PAY_FEE_BY_USERS> items = new List<PAY_FEE_BY_USERS>();

            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<PAY_FEE_BY_USERS>>(data2);
            }
            return Json(items);
        }


        [HttpGet]
        public IActionResult GetFeeTermDetialsByUserId(int UserId)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
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
        public IActionResult PFU_FeeInstallments_BulkFeeUPDATE(string UpdateData, string ChallanDetails)
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

        public IActionResult PFU_FeeType_By_FeeTerms(int FeeTermId)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];

            //exec stp_tblFeeTerms_SELECTALLByAcadamicYearId @InstanceId=545

            List<SelectListItem> PFU_SubCl_GetByCl_DD = new List<SelectListItem>();
            HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_FeeType_ByFeeTerms?InstanceId=" + InstanceId + "&FeeTermId=" + FeeTermId).Result;
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

        public IActionResult PFU_DiscountType_By_FeeType(int FeeTypeId)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];



            List<SelectListItem> PFU_SubCl_GetByCl_DD = new List<SelectListItem>();
            List<SelectListItem> PFU_quantityList = new List<SelectListItem>();
            HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/PFU_DiscountType_ByFeeType?InstanceId=" + InstanceId + "&FeeTypeId=" + FeeTypeId).Result;
            if (SubCl_GetByCl_DD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = SubCl_GetByCl_DD_Response.Content.ReadAsStringAsync().Result;

                //PFU_SubCl_GetByCl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
                var data = JsonConvert.DeserializeObject<DiscountAndQuantityData>(Sub_DD_Data);
                PFU_SubCl_GetByCl_DD = data.DiscountTypeList;
                PFU_quantityList = data.QuantityList;
            }
            ViewBag.Subdd_Data = PFU_SubCl_GetByCl_DD;
            ViewBag.PFU_quantityList = PFU_quantityList;

            //return Json(ViewBag.Subdd_Data);
            return Json(new { Subdd_Data = PFU_SubCl_GetByCl_DD, PFU_quantityList = PFU_quantityList });

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

        public IActionResult PayFeeForUserForChallan()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;
            return View();
        }


        [HttpPost]
        public IActionResult PFUC_FeeInstallments_BulkFeeUPDATE(string UpdateData, string ChallanDetails)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            var UpdatedBy = Request.Cookies["LoginUserId"];




            string data1 = JsonConvert.SerializeObject(UpdateData);
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFU_FeeInstallments_BulkFeeUpdate_By_Challans?UpdateData=" + UpdateData + "&InstanceId=" + InstanceId + "&UpdatedBy=" + UpdatedBy, content).Result;

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

        [HttpPost]
        public IActionResult PFUC_Terms_Delte(int InstanceId, int UserId, int TermId, int TypeId, int ChallanId)
        {
            var UpdatedBy = Request.Cookies["LoginUserId"];

            // url: '/FeeSection/PFUC_Terms_Delte?InstanceId=' + InstanceId + "&UserId=" + UserId + "&TermId=" + TermId + "&TypeId=" + TypeId + "&ChallanId=" + ChallanId,
            StringContent content = new StringContent("", Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFUC_tblFeeTerms_DELETE_ByInstanceId?InstanceId=" + InstanceId + "&UserId=" + UserId + "&TermId=" + TermId + "&TypeId=" + TypeId + "&ChallanId=" + ChallanId + "&UpdatedBy=" + UpdatedBy, content).Result;

            var items = "";

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }

            return Json(items);
        }


        /*--------***  PayFeeForUserForChallana Dropdwons Methods Start ***-------*/
        public IActionResult PFUC_Classification_DD()
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
        public IActionResult PFUC_AmountPay_Recipt(PAY_FEE_BY_USERS obj)
        {
            var CreatedBy = Request.Cookies["LoginUserId"];
            obj.CreatedBy = CreatedBy;

            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/FeeInstallments_INSERT_challan?", content).Result;

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




            return PartialView("_PFUC_AmountPay_Recipts", limodel);

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


        /*-Search Icon Click Show New Window -*/
        [HttpGet]
        public IActionResult PFUC_PaidAmount_Edit_User(PAY_FEE_BY_USERS obj)
        {

            List<PAY_FEE_BY_USERS> item = null;
            string data1 = JsonConvert.SerializeObject(obj);
            //exec stp_tblFeeInstallments_GetFeeDetialsByUserFeeId @UserId=80781,@FeeTermId=4582,@UserFeeId1=417163

            //StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFUC_PaidAmount_EditUsers_Get?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<PAY_FEE_BY_USERS>>(data);
            }

            return Json(item);

            //return View();
        }

        /*-Search Icon Click Show New Window -*/


        [HttpPost]
        public IActionResult PayFeeForUserForChallan(PAY_FEE_CORRECTIONS_BY_USERS obj)
        {
            //exec stp_tblUser_SEARCHUSERSFORPAYFEE @InstanceId=545,@UserName='',@FirstName='',@LastName='',@InstanceUserCode='',@PortalEmail='',@ParentName='',@MobilePhone='',@InstanceClassificationId=806,@InstanceSubClassificationId=1172,@StudentQuota=default
            string data1 = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data1, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/ForPayFeeCorrections_SearchUsers", content).Result;
            var data2 = "";
            List<PAY_FEE_CORRECTIONS_BY_USERS> items = new List<PAY_FEE_CORRECTIONS_BY_USERS>();

            if (response.IsSuccessStatusCode)
            {
                data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<PAY_FEE_CORRECTIONS_BY_USERS>>(data2);
            }
            return Json(items);
        }


        [HttpGet]
        public IActionResult PFU_FC_PaidAmount_Edit_User(PAY_FEE_BY_USERS obj)
        {
            List<PAY_FEE_BY_USERS> item = null;
            string data1 = JsonConvert.SerializeObject(obj);
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFUFC_PaidAmount_EditUsers_Get?UserId=" + obj.UserId + "&FeeTermId=" + obj.FeeTermId + "&UserFeeId1=" + obj.UserFeeId1).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<PAY_FEE_BY_USERS>>(data);
            }
            ViewBag.itemscount = item.Count();
            return PartialView("_PFU_FC_PaidAmount_Edit_User", item);

        }




        //PAY_FEE_BY_CorrectionUSERS EDIT METHOD AND POST METHOD CODE START
        [HttpGet]
        public IActionResult PFC_GetFeeTermDetialsByUserId(int UserId)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            List<PAY_FEE_CORRECTIONS_BY_USERS_Tbl1> item = null;

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFC_FeeTermDetials_ByUserId_Get?UserId=" + UserId + "&InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                item = JsonConvert.DeserializeObject<List<PAY_FEE_CORRECTIONS_BY_USERS_Tbl1>>(data);
            }

            return Json(item);

        }


        [HttpPost]
        public IActionResult PFC_SaveFee_UpdateFee_ByTblUser(int UserId, int FeeTermId, int FeeTypeId, string Amount, int ChallanId, DateTime DueDate)
        {


            // exec Stp_insert_update_setandchallanfee InstanceId=545,UserId=80781,FeeTermId=4582,FeeTypeId=3680,         
            //Amount = 400000,ChallanId= 222930,Duedate= '2023-08-09 00:00:00',CreatedBy= 217606,CreatedDate= '2023-08-03 00:00:00'

            var CreatedBy = Request.Cookies["LoginUserId"];
            int InstanceId = 545;



            string Duedate = DueDate.ToString("yyyy-MM-dd");
            var Querystring = $"?UserId={UserId}&FeeTermId={FeeTermId}&FeeTypeId={FeeTypeId}&Amount={Amount}&ChallanId={ChallanId}&DueDate={Duedate}&CreatedBy={CreatedBy}&InstanceId={InstanceId}";

            StringContent content = new StringContent("application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PFC_SaveFee_UpdateFeeByTblUser" + Querystring, content).Result;
            var items = "";

            if (response.IsSuccessStatusCode)
            {
                var data2 = response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<string>(data2);
            }
            return Json(items);
            //return View();
        }



        //PAY_FEE_BY_CorrectionUSERS EDIT METHOD AND POST METHOD CODE END


        /*----DROPDOWNS DATA PAY FEE CORRECTIONS START----*/

        public IActionResult PFC_tblFeeTerms_Challana_DD(string Userid)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];

            List<PAY_FEE_CORRECTIONS_BY_USERS> items = new List<PAY_FEE_CORRECTIONS_BY_USERS>();
            HttpResponseMessage SubCl_GetByCl_DD_Response = client.GetAsync(client.BaseAddress + "/PFC_Challana_DD?InstanceId=" + InstanceId + "&Userid=" + Userid).Result;
            if (SubCl_GetByCl_DD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = SubCl_GetByCl_DD_Response.Content.ReadAsStringAsync().Result;
                items = JsonConvert.DeserializeObject<List<PAY_FEE_CORRECTIONS_BY_USERS>>(Sub_DD_Data);
            }
            ViewBag.Subdd_Data = items;

            return Json(items);
        }


        /*----DROPDOWNS DATA PAY FEE CORRECTIONS END----*/


        public IActionResult PFC_SearchUser_By_TableData(int UserId, string FeeTermIds)
        {
            var InstanceId = Request.Cookies["INSTANCEID"];


            List<PAY_FEE_CORRECTIONS_BY_USERS> Items = new List<PAY_FEE_CORRECTIONS_BY_USERS>();
            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/PFC_SearchUserByTableData?UserId=" + UserId + "&FeeTermIds=" + FeeTermIds + "&InstanceId=" + InstanceId).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                Items = JsonConvert.DeserializeObject<List<PAY_FEE_CORRECTIONS_BY_USERS>>(data);
            }

            return Json(Items);

        }


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

        public IActionResult GenerateFeeReceipt()
        {
            var InstanceId = Request.Cookies["INSTANCEID"];
            ViewBag.InstanceId = InstanceId;
            return View();
        }



        [HttpPost]
        public IActionResult GenerateFeeReceipt(int InstanceId, int ClassificationId, int SubClassificationId)
        {
            List<New_GenerateFeeReceipt> DiscountLi = new List<New_GenerateFeeReceipt>();

            var queryString = $"?InstanceId={InstanceId}&ClassificationId={ClassificationId}&SubClassificationId={SubClassificationId}";
            //exec stp_tblUser_HallTickets @InstanceId=545,@ClassificationId=806,@SubClassificationId=1172

            HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/Feereceipt_UserTable_Get" + queryString).Result;
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                DiscountLi = JsonConvert.DeserializeObject<List<New_GenerateFeeReceipt>>(data);
            }

            ViewBag.FT_Tbl = DiscountLi;

            return new JsonResult(ViewBag.FT_Tbl);

        }
        public IActionResult GenerateFeeReceipt_New_Classification_DD(int InstanceId)
        {
            List<SelectListItem> PFU_Cl_DD = new List<SelectListItem>();
            HttpResponseMessage ClS_DD_Response = client.GetAsync(client.BaseAddress + "/GenerateFeeReceipt_Classification_GetDD?InstanceId=" + InstanceId).Result;
            if (ClS_DD_Response.IsSuccessStatusCode)
            {
                string DD_Data = ClS_DD_Response.Content.ReadAsStringAsync().Result;
                PFU_Cl_DD = JsonConvert.DeserializeObject<List<SelectListItem>>(DD_Data);
            }
            ViewBag.AcadamicYearDD = PFU_Cl_DD;

            return Json(ViewBag.AcadamicYearDD);

        }
        public IActionResult GenerateFeeReceipt_New_Class_DD(int InstanceId, int InstanceClassificationId)
        {
            List<SelectListItem> MFD_ClassDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/GenerateFeeReceipt_ClassDD?InstanceId=" + InstanceId + "&InstanceClassificationId=" + InstanceClassificationId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_ClassDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_Class_Data = MFD_ClassDD_li;

            return Json(ViewBag.MFD_Class_Data);
        }

        public IActionResult GenerateFeeReceipt_New_FeeTerms_DD(int InstanceId)
        {
            List<SelectListItem> MFD_ClassDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/GenerateFeeReceipt_FeeTermsDD?InstanceId=" + InstanceId).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_ClassDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_Class_Data = MFD_ClassDD_li;

            return Json(ViewBag.MFD_Class_Data);
        }
        public IActionResult GenerateFeeReceipt_New_FeeType_DD(int InstanceId, int FeeTermIds)
        {
            List<SelectListItem> MFD_ClassDD_li = new List<SelectListItem>();
            HttpResponseMessage MFD_Response = client.GetAsync(client.BaseAddress + "/GenerateFeeReceipt_FeeTypeDD?InstanceId=" + InstanceId + "&FeeTermIds=" + FeeTermIds).Result;
            if (MFD_Response.IsSuccessStatusCode)
            {
                string Sub_DD_Data = MFD_Response.Content.ReadAsStringAsync().Result;
                MFD_ClassDD_li = JsonConvert.DeserializeObject<List<SelectListItem>>(Sub_DD_Data);
            }
            ViewBag.MFD_Class_Data = MFD_ClassDD_li;

            return Json(ViewBag.MFD_Class_Data);
        }


        [HttpPost]
        public IActionResult GenerateFeeReceipt_New_Users_Challan_Result_Tbl(string FeeTermId, string FeeTypeIds, string UserIds, int InstanceId)
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




    }
}
