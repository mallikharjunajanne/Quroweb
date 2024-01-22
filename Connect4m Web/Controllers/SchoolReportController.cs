using Connect4m_Web.Models.LMSproperties;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Connect4m_Web.Controllers
{
    [Authorize]
    public class SchoolReportController : Controller
    {
        #region  Http Connection
        private readonly HttpClientFactory _httpClientFactory;
        HttpClient client;

        private readonly IUserService _userService;
        //==========================================================  Declare The Private Varible for assigning the values from IUserServiceinterface(Read Cookies)
        private readonly int UserId;
        private readonly int InstanceId;
        private readonly int InstanceClassificationId;
        private readonly int Roleid;
        private readonly int StudentUserid;

        public SchoolReportController(HttpClientFactory httpClientFactory, IConfiguration configuration, IUserService userService)
        {
            _httpClientFactory = httpClientFactory;
            string apiBaseAddress = configuration["AppSettings:ApiBaseAddress"];
            client = _httpClientFactory.CreateClient();
            client.BaseAddress = new Uri(apiBaseAddress + "/SchoolReport");
            //=======================================================
            _userService = userService;

            InstanceId = _userService.InstanceId;
            UserId = _userService.LoginUserId;
            InstanceClassificationId = _userService.InstanceClassificationId;
            Roleid = _userService.Roleid;
            StudentUserid = _userService.StudentUserid;


        }
        #endregion




        //===============================  Commonn Dropdown

        public List<SelectListItem> CommonDropdown(string methodname, string[] Parameters, string text, string value)
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





        #region  SIMPLE EXPENSE SUMMARY REPORT
        public IActionResult SimpleExpenseReport()
        {
            string[] parameter = new string[] { InstanceId.ToString() };

         //   string[] variables =new string[] { InstanceId.ToString() };
            ViewBag.AcademicYearSessionId = CommonDropdown("FinancialYear",parameter,"Years","AcademicYearId");

            return View();
        } 

        //==============================================  Search Results
        [HttpGet]
        public IActionResult SimpleExpenseSummary(int summary)
        {
            ViewBag.summaryid = summary;

            return View();
        }
         [HttpPost]
        public IActionResult SimpleExpenseSummary(SchoolReport obj)
        {
            obj.InstanceId = InstanceId;
            obj.CreatedBy = UserId;

            CreditDebitreportList Mainlist = new CreditDebitreportList();
            try
            {

                string jsonData = JsonConvert.SerializeObject(obj);

                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");


                HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/SimpleExpenseSummary", content).Result;

                if (response.IsSuccessStatusCode)
                {
                    string data = response.Content.ReadAsStringAsync().Result;
                    Mainlist = JsonConvert.DeserializeObject<CreditDebitreportList>(data);

                    if (Mainlist.Listone.Count > 1)
                    {
                        Mainlist.Listone.Add(new CreditDebitreport
                        {
                            Credit_Debit = "Total",
                            //Apr = Mainlist.Listone.Sum(x => x.Apr),
                            Apr = Mainlist.Listone[1].Apr - Mainlist.Listone[0].Apr,
                            May = Mainlist.Listone[1].May - Mainlist.Listone[0].May,
                            Jun = Mainlist.Listone[1].Jun - Mainlist.Listone[0].Jun,
                            Jul = Mainlist.Listone[1].Jul - Mainlist.Listone[0].Jul,
                            Aug = Mainlist.Listone[1].Aug - Mainlist.Listone[0].Aug,
                            Sep = Mainlist.Listone[1].Sep - Mainlist.Listone[0].Sep,
                            Oct = Mainlist.Listone[1].Oct - Mainlist.Listone[0].Oct,
                            Nov = Mainlist.Listone[1].Nov - Mainlist.Listone[0].Nov,
                            Dec = Mainlist.Listone[1].Dec - Mainlist.Listone[0].Dec,
                            Jan = Mainlist.Listone[1].Jan - Mainlist.Listone[0].Jan,
                            Feb = Mainlist.Listone[1].Feb - Mainlist.Listone[0].Feb,
                            Mar = Mainlist.Listone[1].Mar - Mainlist.Listone[0].Mar,
                            Total = Mainlist.Listone[1].Total - Mainlist.Listone[0].Total
                        });
                    }
                    else
                    {
                        
                        Mainlist.Listone.Add(new CreditDebitreport {
                            Credit_Debit= "Total",
                            Apr= Mainlist.Listone[0].Apr,
                            May= Mainlist.Listone[0].May,
                            Jun= Mainlist.Listone[0].Jun,
                            Jul= Mainlist.Listone[0].Jul,
                            Aug= Mainlist.Listone[0].Aug,
                            Sep= Mainlist.Listone[0].Sep,
                            Oct= Mainlist.Listone[0].Oct,
                            Nov= Mainlist.Listone[0].Nov,
                            Dec= Mainlist.Listone[0].Dec,
                            Jan= Mainlist.Listone[0].Jan,
                            Feb= Mainlist.Listone[0].Feb,
                            Mar= Mainlist.Listone[0].Mar,
                            Total= Mainlist.Listone[0].Total
                        });



                    }

                    if (Mainlist.Listtwo.Count != 0)
                    {
                        if (obj.FundFlag == "0")
                        {

                            var grouplist = Mainlist.Listtwo.GroupBy(x => x.Credit_Debit == "Credit(Income)").ToList();
                            int grouplist2 = Mainlist.Listtwo.Where(x => x.Credit_Debit == "Credit(Income)").Sum(x => x.Apr)
                                            - Mainlist.Listtwo.Where(x => x.Credit_Debit != "Credit(Income)").Sum(x => x.Apr);

                            Mainlist.Listtwo.Add(new CreditDebitreport
                            {
                                TypeofExpenditure = "Total",

                                Apr = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Apr) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Apr),
                                May = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.May) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.May),
                                Jun = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Jun) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Jun),
                                Jul = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Jul) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Jul),
                                Aug = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Aug) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Aug),
                                Sep = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Sep) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Sep),
                                Oct = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Oct) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Oct),
                                Nov = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Nov) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Nov),
                                Dec = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Dec) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Dec),
                                Jan = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Jan) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Jan),
                                Feb = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Feb) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Feb),
                                Mar = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Mar) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Mar),
                                Total = Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Credit")).Sum(x => x.Total) - Mainlist.Listtwo.Where(x => x.Credit_Debit.StartsWith("Debit")).Sum(x => x.Total)

                            });
                        }
                        else
                        {
                            Mainlist.Listtwo.Add(new CreditDebitreport
                            {
                                TypeofExpenditure = "Total",
                                Apr = Mainlist.Listtwo.Sum(x => x.Apr),
                                May = Mainlist.Listtwo.Sum(x => x.May),
                                Jun = Mainlist.Listtwo.Sum(x => x.Jun),
                                Jul = Mainlist.Listtwo.Sum(x => x.Jul),
                                Aug = Mainlist.Listtwo.Sum(x => x.Aug),
                                Sep = Mainlist.Listtwo.Sum(x => x.Sep),
                                Oct = Mainlist.Listtwo.Sum(x => x.Oct),
                                Nov = Mainlist.Listtwo.Sum(x => x.Nov),
                                Dec = Mainlist.Listtwo.Sum(x => x.Dec),
                                Jan = Mainlist.Listtwo.Sum(x => x.Jan),
                                Feb = Mainlist.Listtwo.Sum(x => x.Feb),
                                Mar = Mainlist.Listtwo.Sum(x => x.Mar),
                                Total = Mainlist.Listtwo.Sum(x => x.Total)


                            });
                        }



                    }
                    return Json(Mainlist);
                }
                return Json(0);
            }
            catch(Exception ex)
            {
                return Json(0);
            }

           

           
        }

        #endregion

        #region  ORGANISATION FEE SUMMARY


        public IActionResult OrganisationFeeSummary()
        {
            string[] parameter = new string[] { InstanceId.ToString() };

            //   string[] variables =new string[] { InstanceId.ToString() };
            ViewBag.FeeselectLocation = CommonDropdown("FeeselectLocation", parameter, "locationname", "locationid");
            ViewBag.instanceid = InstanceId;
            return View();
        }
        //================================================    
        public IActionResult ReportOrganisationFeeSummary()
        {
            string[] parameter = new string[] { InstanceId.ToString() };

            //   string[] variables =new string[] { InstanceId.ToString() };
            ViewBag.FeeselectLocation = CommonDropdown("FeeselectLocation", parameter, "locationname", "locationid");
            ViewBag.instanceid = InstanceId;
            return View();
        }

        //========================  Pocket Money

        public IActionResult PocketMoneyDetails(FeeSummaryReport obj)
        {
            obj.Instance = InstanceId;
         
            string jsonData = JsonConvert.SerializeObject(obj);
            List<PocketMoney> list = new List<PocketMoney>();
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/PocketMoneyDetails", content).Result;
           
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<PocketMoney>>(data);
                list.Add(new PocketMoney {
                    IntanceName="Total",
                    ParentPaidAmount=list.Sum(x=>x.ParentPaidAmount),
                    StudentReceivedAmount=list.Sum(x=>x.StudentReceivedAmount),
                    DueAmount=list.Sum(x=>x.DueAmount)
                });
                return Json(list);
            }

            return Json(list);
        }
        //========================  FeeEntityInstanceSummary  ( 1st Table )

        public IActionResult FeeEntityInstanceSummaryone(FeeSummaryReport obj)
        {
            obj.Instance = InstanceId;
            List<feesummaryone> list = new List<feesummaryone>();
            string jsonData = JsonConvert.SerializeObject(obj);
           
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/FeeEntityInstanceSummaryone", content).Result;
           
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                 list = JsonConvert.DeserializeObject<List<feesummaryone>>(data);
              
                return Json(list);
            }

            return Json(list);
        }//========================  FeeEntityInstanceSummary  ( 2nd Table )

        public IActionResult FeeEntityInstanceSummarytwo(FeeSummaryReporttw obj)
        {
            //FeeSummaryReport obj = new FeeSummaryReport();
            //obj.Instance =Instance;
            //obj.StartDate = StartDate;
            //obj.EndDate = EndDate;
            List<feesummarytwo> list = new List<feesummarytwo>();
            string jsonData = JsonConvert.SerializeObject(obj);
           
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/FeeEntityInstanceSummarytwo", content).Result;
           
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                 list = JsonConvert.DeserializeObject<List<feesummarytwo>>(data);
              
                return Json(list);
            }

            return Json(list);
        }
        //========================  FeeEntityInstanceSummary  ( 3rd Table )

        public IActionResult FeeEntityInstanceSummarythree(FeeSummaryReportchild obj)
        {
           
            List<feesummarythree> list = new List<feesummarythree>();
            string jsonData = JsonConvert.SerializeObject(obj);
           
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/FeeEntityInstanceSummarythree", content).Result;
           
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                 list = JsonConvert.DeserializeObject<List<feesummarythree>>(data);
              
                return Json(list);
            }

            return Json(list);
        }
         //========================  FeeEntityInstanceSummary  ( 4th Table )

        public IActionResult FeeEntityInstanceSummaryfour(FeeSummaryReportfourthchild obj)
        {
           
            List<feesummaryfour> list = new List<feesummaryfour>();
            string jsonData = JsonConvert.SerializeObject(obj);
           
            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/FeeEntityInstanceSummaryfour", content).Result;
           
            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                 list = JsonConvert.DeserializeObject<List<feesummaryfour>>(data);
              
                return Json(list);
            }

            return Json(list);
        }




        #endregion


        #region  SCHOOL WISE ATTENDANCE REPORT


        //==================================================     SCHOOL WISE ATTENDANCE REPORT
        public IActionResult SchoolwiseAttendanceReport()
        {
            string[] parameter = new string[] { InstanceId.ToString() };

             
            ViewBag.SchInstance = CommonDropdown("SchoolInstances", parameter, "InstanceName", "InstanceId");
           // ViewBag.SchInstance = new List<SelectListItem>();
           // ViewBag.SchInstance.Add(new SelectListItem { Text = "Ads School", Value = "873" });


            return View();
        }
        //==================================================     SCHOOL WISE ATTENDANCE REPORT
        public IActionResult SearchSchoolwiseAttendanceReport(SchoolInstances obj)
        {
            List<SchoolInstanceslist> list = new List<SchoolInstanceslist>();
            string jsonData = JsonConvert.SerializeObject(obj);

            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/SchoolwiseAttendanceReport", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SchoolInstanceslist>>(data);
                if (list.Count > 0)
                {
                    list.Add(new SchoolInstanceslist
                    {

                        Instanceid = "0",
                        InstanceName = "Total",
                        
                     TotalStrength = list.Sum(x => { int intValue; if (int.TryParse(x.TotalStrength, out intValue)) { return intValue; } else { return 0; } }).ToString(),
                        PresentCount = list.Sum(x => { int intValue; if (int.TryParse(x.PresentCount, out intValue)) { return intValue; } else { return 0; } }).ToString(),
                        AbsentCount = list.Sum(x => { int intValue; if (int.TryParse(x.AbsentCount, out intValue)) { return intValue; } else { return 0; } }).ToString()



                    });
                }

                // return View(list);
            }

          
            return View(list);
        }
         //==================================================     SCHOOL WISE ATTENDANCE REPORT SUB
        public IActionResult SearchSchoolwiseAttendanceReportsub(SchoolInstances obj)
        {
            List<SchoolInstanceslistSub> list = new List<SchoolInstanceslistSub>();
            string jsonData = JsonConvert.SerializeObject(obj);

            StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + "/SchoolwiseAttendanceReportsub", content).Result;

            if (response.IsSuccessStatusCode)
            {
                string data = response.Content.ReadAsStringAsync().Result;
                list = JsonConvert.DeserializeObject<List<SchoolInstanceslistSub>>(data);

                // return View(list);

                list.Add(new SchoolInstanceslistSub
                {

                   
                    InstanceName = "Total",
                    ClassificationName = "",
                    SubClassificationName = "",
                    //TotalStrength = list.Sum(x => Convert.ToInt32(x.TotalStrength)).ToString(),
                    TotalStrength = list.Sum(x =>{int intValue;if (int.TryParse(x.TotalStrength, out intValue)){return intValue;} else {return 0; }}).ToString(),
                    PresentCount = list.Sum(x =>{int intValue;if (int.TryParse(x.PresentCount, out intValue)){return intValue;} else {return 0; }}).ToString(),
                    AbsentCount = list.Sum(x =>{int intValue;if (int.TryParse(x.AbsentCount, out intValue)){return intValue;} else {return 0; }}).ToString(),

              
                    AtendancePostedStatus ="",


                });

            }

          
            return Json(list);
        }



        #endregion
    }
}
