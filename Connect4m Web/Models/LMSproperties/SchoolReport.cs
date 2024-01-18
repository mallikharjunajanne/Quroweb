using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class SchoolReport:Instance
    {
        //exec stp_tblGovFundRecieved_SearchSimpleExpense @InstanceId=545,@MonthId=default,@YearId=default,@StartDate=default,@EndDate=default,@AcademicYearSessionId=534,@FundFlag=0
        [DisplayName("Financial Year")]
        public string AcademicYearSessionId { get; set; }
        public string FundFlag { get; set; }
        public string Summary { get; set; }
      
    }
    public class CreditDebitreport
    {
        public string TypeofExpenditure { get; set; }
        public string Credit_Debit { get; set; }
        public int Total { get; set; }
        public int Apr { get; set; }
        public int May { get; set; }
        public int Jun { get; set; }
        public int Jul { get; set; }
        public int Aug { get; set; }
        public int Sep { get; set; }
        public int Oct { get; set; }
        public int Nov { get; set; }
        public int Dec { get; set; }
        public int Jan { get; set; }
        public int Feb { get; set; }
        public int Mar { get; set; }
      
    }
    public class CreditDebitreportList
    {
        public List<CreditDebitreport> Listone { get; set; }
        public List<CreditDebitreport> Listtwo { get; set; }
    }

    public class FeeSummaryReporttw
    {
        public string Instances { get; set; }

       
        public string StartDate { get; set; }
   
        public string EndDate { get; set; }
    }

        public class FeeSummaryReport
    {
        public int Instance { get; set; }
        [Required]
        [DisplayName("Locations")]
        public string Location { get; set; }
         [Required]
        [DisplayName("Sub Locations")]
        public string SubLocation { get; set; }
         [Required]
        [DisplayName("Instances")]
        public List<string> Instances { get; set; }
       
        [DisplayName("Start Date")]
        public string StartDate { get; set; }
 
        [DisplayName("End Date")]
        public string EndDate { get; set; }


    }

    public class FeeSummaryReportsub : FeeSummaryReport
    {
        public int FeeTermId { get; set; }
        public string FeeTypeId { get; set; }
        public int AcademicYearId { get; set; }
    }
    public class FeeSummaryReportchild
    {
        public int FeeTermId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
     public class FeeSummaryReportfourthchild
    {
        public string Instance { get; set; }
        public string FeeTypeId { get; set; }
        public string FeeTermId { get; set; }
        public string AcademicYearId { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }

    public class PocketMoney
    {
        public string IntanceName { get; set; }
        public int ParentPaidAmount { get; set; }
        public int StudentReceivedAmount { get; set; }
        public int DueAmount { get; set; }
    }

    public class feesummaryone
    {
        public string Instancename { get; set; }
        public int InstanceId { get; set; }
        public string NoUser { get; set; }
        public string FeeAmount { get; set; }
        public string ConcedingAmont { get; set; }
        public string FeeCollected { get; set; }
        public string DueAmount { get; set; }
        public string Sorting { get; set; }
    }
    public class feesummarytwo
    {
        public string TermName { get; set; }
        public string Feetermid { get; set; }
        public string FeeAmount { get; set; }
        public string DiscountAmont { get; set; }
        public string PayAmont { get; set; }
        public string DueAmount { get; set; }
    }
    public class feesummarythree : feesummarytwo
    {
        public int FeeTypeid { get; set; }
        public string FeeType { get; set; }

    }
    public class feesummaryfour
    {
        public int Instancesubclassificationid { get; set; }
        public string cld { get; set; }
        public string Instanceclassificationname { get; set; }
        public int CountSCIDUsers { get; set; }
        public int Feeassigneduser { get; set; }
        public int PartialFeePayed { get; set; }
        public int FullFeePayed { get; set; }
        public int FeeNotPayed { get; set; }
    }


    public class SchoolInstances
    {
        [Display(Name = "Schools")]
        [Required]
        public List<string> SchInstance { get; set; }
        [Display(Name = "Attendance From Date")]
        [Required]
        public string AttendanceFromdate { get; set; }

    }

    public class SchoolInstanceslist
    {
        
        public string Instanceid { get; set; }
      
        public string InstanceName { get; set; }
        public string TotalStrength { get; set; }
        public string PresentCount { get; set; }
        public string AbsentCount { get; set; }

    }

   
    public class SchoolInstanceslistSub
    {


        public string InstanceName { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public string TotalStrength { get; set; }
        public string PresentCount { get; set; }
        public string AbsentCount { get; set; }
        public string AtendancePostedStatus { get; set; }

    }

}
