using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{

    public class Instancess
    {
        public int InstanceId { get; set; }
    }
    public class FeeReports
    {
        public string InstanceSubClassificationId { get; set; }
        public string ClassificationId { get; set; }
        public string SubClassificationName { get; set; }
        public string ClassificationName { get; set; }
        public string DisplayOrder { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ErrorMessage { get; set; }
        public int InstanceId { get; set; }
        public int UserId { get; set; }

        public string UserReceiptGenerationID { get; set; }
        public string InvoiceNo { get; set; }


        public string FeeTypeId { get; set; }
        public string FeeType { get; set; }
        public string InstanceUserCode { get; set; }
        public string AdmissionNumber { get; set; }
        public string PaidAmount { get; set; }
        public string amount { get; set; }
        public string DueDate { get; set; }
        public string DateNow { get; set; }
        public string ChallanGeneratedDate { get; set; }
        public string BeforeDiscount { get; set; }
        public string DiscountAmt { get; set; }
    }


    //ViewallChallandetailsTermwise
    public class ChallandetailsTermwise : Instancess
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string StudentId { get; set; }
        public string InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }
        public string ClassificationName { get; set; }
        public string Due { get; set; }


        public int UserId { get; set; }
        public string Name { get; set; }
        public string StudentAmountSet { get; set; }
        public string StudentDiscountAmount { get; set; }
        public string StudentCollectedAmount { get; set; }
        public string StudentBalance { get; set; }
        public string totalAmountSet { get; set; }
        public string hallticket { get; set; }


        public string PaymentDate { get; set; }
        public int ROWIDCOL { get; set; }
        public string UserReceiptGenerationID { get; set; }
        public string Amount { get; set; }
        public string Createdate { get; set; }
        public string modename { get; set; }
        public string typename { get; set; }
        public string balance { get; set; }
        public string InvoiceNo { get; set; }

        public string FeeTermId { get; set; }
        public string TermName { get; set; }
        public string Concedingamount { get; set; }
        public string FeeType { get; set; }
        public string FeeTypeId { get; set; }
        public string feeAmount { get; set; }

    }


    public class TermWiseFeeDetails : Instancess
    {

        public string Due { get; set; }
        public string FeeTermId { get; set; }
        // public List<string> TermIds { get; set; }
        public string TermIds { get; set; }
        public string TermName { get; set; }
        public string FeeAmount { get; set; }
        public string PayedAmount { get; set; }
        public string Amount { get; set; }
        public string Fine { get; set; }
        public string CountFee { get; set; }
        public string TermOrder { get; set; }
        public string FirstName { get; set; }
        public string hallticket { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public int UserId { get; set; }
        public int ConcedingAmount { get; set; }
        public string LastName { get; set; }
        public string UserReceiptGenerationID { get; set; }
        public List<FeeDetailsReport_TermWiseFeeDetails1> Table0 { get; set; }
        public List<FeeDetailsReport_termwisefedailstable2> Table1 { get; set; }

    }

    public class FeeDetailsReport_TermWiseFeeDetails1
    {
        public string FeeTermId { get; set; }
        public string TermName { get; set; }
        public string FeeAmount { get; set; }
        public string PayedAmount { get; set; }
        public string Amount { get; set; }
        public string Fine { get; set; }
        public string CountFee { get; set; }
        public string TermOrder { get; set; }
        public string FirstName { get; set; }
        public string hallticket { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public int UserId { get; set; }
        public int ConcedingAmount { get; set; }
        public string LastName { get; set; }
        public string UserReceiptGenerationID { get; set; }
    }

    public class FeeDetailsReport_termwisefedailstable2
    {
        public string Due { get; set; }
        public string FeeTermId { get; set; }
        public List<string> TermIds { get; set; }
        public string TermName { get; set; }
        public string FeeAmount { get; set; }
        public string PayedAmount { get; set; }
        public string Amount { get; set; }
        public string Fine { get; set; }
        public string CountFee { get; set; }
        public string TermOrder { get; set; }
        public string FirstName { get; set; }
        public string hallticket { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public int UserId { get; set; }
        public int ConcedingAmount { get; set; }
        public string LastName { get; set; }
        public string UserReceiptGenerationID { get; set; }

    }



    //---**** FEE REPORTS ****---//

    public class Feechallanareport
    {
        public int UserId { get; set; }
        public int SubClassificationId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public int UserReceiptGenerationID { get; set; }
        public string InvoiceNo { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalDiscountAmount { get; set; }
        public decimal TotalBeforeDiscountAmount { get; set; }
        public string TotalAmountAsString { get; set; }



        public List<ManageClassification> classificationlist { get; set; }
        public List<ManageSubClassification> subclassificationlist { get; set; }
        public List<FeeReceiptdetails> feereceiptdetails { get; set; }
        public List<Feetermdetails> feetermdetails { get; set; }


    }
    public class FeeReceiptdetails
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string UserReceiptGenerationID { get; set; }
        public string InvoiceNo { get; set; }
        public string FeeTypeId { get; set; }
        public string FeeType { get; set; }
        public string InstanceUserCode { get; set; }
        public string AdmissionNumber { get; set; }
        public string PaidAmount { get; set; }
        public string amount { get; set; }
        public string DueDate { get; set; }
        public string DateNow { get; set; }
        public string ChallanGeneratedDate { get; set; }
        public string BeforeDiscount { get; set; }
        public string DiscountAmt { get; set; }
        public int InstanceSubclassificaitionId { get; set; }
        public string SubClassificationName { get; set; }
        public string SubClassificationDescription { get; set; }
        public string DisplayOrder { get; set; }
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }
        public string ClassificationDescription { get; set; }

    }
    public class Feetermdetails
    {
        public string TermName { get; set; }
    }



    public class Userwisepayment
    {
        public int UserId { get; set; }
        public string hallticket { get; set; }
        public int SubClassificationId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<ManageClassification> classificationlist { get; set; }
        public List<ManageSubClassification> subclassificationlist { get; set; }
        public List<Paymentmodedd> paymentmodeddlist { get; set; }

        public string Name { get; set; }
        public decimal StudentAmountSet { get; set; }
        public decimal StudentDiscountAmount { get; set; }
        public decimal StudentCollectedAmount { get; set; }
        public decimal StudentBalance { get; set; }
        public decimal totalAmountSet { get; set; }


        public int ROWIDCOL { get; set; }
        public int UserReceiptGenerationID { get; set; }
        public decimal Amount { get; set; }
        public string Createdate { get; set; }
        public string modename { get; set; }
        public string typename { get; set; }
        public decimal balance { get; set; }
        public string InvoiceNo { get; set; }
    }

    public class Termwisechallandetails
    {
        public int UserId { get; set; }
        public string hallticket { get; set; }
        public int SubClassificationId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<ManageClassification> classificationlist { get; set; }
        public List<ManageSubClassification> subclassificationlist { get; set; }

        public string Name { get; set; }
        public decimal StudentAmountSet { get; set; }
        public decimal StudentDiscountAmount { get; set; }
        public decimal StudentCollectedAmount { get; set; }
        public decimal StudentBalance { get; set; }
        public decimal totalAmountSet { get; set; }


        public int ROWIDCOL { get; set; }
        public int UserReceiptGenerationID { get; set; }
        public decimal Amount { get; set; }
        public string Createdate { get; set; }
        public string modename { get; set; }
        public string typename { get; set; }
        public decimal balance { get; set; }
        public string InvoiceNo { get; set; }
    }







    public class Paymentmodedd
    {
        public int PaymentModeId { get; set; }
        public string Mode { get; set; }
    }
    public class ManageClassification
    {
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }
        public string ClassificationDescription { get; set; }
    }

    public class ManageSubClassification
    {
        public int InstanceSubclassificaitionId { get; set; }
        public string SubClassificationName { get; set; }

        public string SubClassificationDescription { get; set; }
        public string DisplayOrder { get; set; }
    }

    public class ManageSlots
    {
        public int InstancesubjectId { get; set; }
        public string SubjectName { get; set; }
    }

    public class MonthlyAndWeeklyAttendanceReport : Instancess
    {
        public List<ManageClassification> classificationlist { get; set; }
        public List<ManageSubClassification> subclassificationlist { get; set; }
        public int ClassificationId { get; set; }
        public int SubClassificationId { get; set; }
        public List<string> UserIdlist { get; set; }
        public List<string> InstanceUserCodelist { get; set; }
        public List<string> AdmissionNumberlist { get; set; }
        public List<string> FirstName { get; set; }
        public List<string> datelist { get; set; }
        public List<string> Totallist { get; set; }
        public List<string> Presentlist { get; set; }
        public List<string> Percentagelist { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }


    public class TermNames
    {
        public int FeeTermId { get; set; }
        public int AcademicYearId { get; set; }
        public string TermName { get; set; }
    }

    public class Feedetails
    {
        public List<TermNames> termnames { get; set; }
        [Required]
        public List<string> FeeTermId { get; set; }
        public int SubClassificationId { get; set; }
        public int UserId { get; set; }
    }
    public class ClassificationWiseFeedetails
    {
        public int InstanceClassificaitionId { get; set; }
        public string ClassificaitionName { get; set; }
        public decimal AmountSet { get; set; }
        public decimal totalAmountSet { get; set; }
        public decimal AmountPaid { get; set; }
        public decimal discount { get; set; }
        public decimal Balance { get; set; }
    }
    public class SubclassificationWiseFeedetails
    {
        public int InstanceSubClassificaitionId { get; set; }
        public string SubClassificaitionName { get; set; }
        public decimal SubClassificaitionAmountSet { get; set; }
        public decimal totalAmountSet { get; set; }
        public decimal SubClassificaitionAmountPaid { get; set; }
        public decimal SubClassificaitiondiscount { get; set; }
        public decimal SubClassificaitionBalance { get; set; }
    }
    public class FeedetailsGetuserwiseFeeDetails
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public decimal StudentAmountSet { get; set; }
        public decimal totalAmountSet { get; set; }
        public decimal StudentCollectedAmount { get; set; }
        public decimal StudentDiscountAmount { get; set; }
        public decimal StudentBalance { get; set; }
    }

    public class FeedetailsChallanGeneratedDetails
    {
        public List<ChallanGeneratedDetailstbl1> challangenerateddetailstbl1 { get; set; }
        public List<ChallanGeneratedDetailstbl2> challangenerateddetailstbl2 { get; set; }

    }
    public class ChallanGeneratedDetailstbl1
    {
        public string InstanceName { get; set; }
        public string Address { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public string InstanceUserCode { get; set; }
        public string AdmissionNumber { get; set; }
        public int InstanceClassificaitionId { get; set; }
        public string FirstName { get; set; }
        public string userfeeid { get; set; }
        public string TermName { get; set; }
        public int FeeTermId { get; set; }
        public string FeeType { get; set; }
        public int FeeTypeId { get; set; }
        public decimal DueAmount { get; set; }
        public decimal ConcedingAmount { get; set; }
        public decimal FeeAmount { get; set; }
        public decimal PayedAmoount { get; set; }
    }
    public class ChallanGeneratedDetailstbl2
    {
        public decimal TotalAmountPayed { get; set; }
        public decimal TotalFee { get; set; }
        public decimal DueAmount { get; set; }
        public decimal Chequeamount { get; set; }
        public decimal discountamount { get; set; }
        public decimal Payedamount { get; set; }
    }


    #region MONTHLY ATTENDANCE REPORT
    public class MonthWiseclassattendancereport : Instancess
    {
        [Required]
        public int ClassificationId { get; set; }
        public string ClassificationName { get; set; }
        [Required]
        public int SubClassificationId { get; set; }
        public string SubClassificationName { get; set; }

        [Required]
        public int Month { get; set; }
        [Required]
        public int Year { get; set; }


    }
    public class Classmonthattendancereport
    {
        public string Returnmessage { get; set; }
        public List<classwisemonthreport> classwisemonthreport { get; set; }
        public List<Presentabsentdetails> percentagedetails { get; set; }
        public List<Attendancesummarydetails> attendancesummary { get; set; }
    }
    public class classwisemonthreport
    {
        public List<string> DynamicColumns { get; set; }

        public classwisemonthreport()
        {
            DynamicColumns = new List<string>();
        }
        public string UserID { get; set; }
        public string AdmissionNumber { get; set; }
        public string Name { get; set; }
        public string CastName { get; set; }
        public string EWS { get; set; }
        public string Repeater { get; set; }
        public string Dropout { get; set; }

        public string Column { get; set; }
        public string Column1 { get; set; }
        public string Column2 { get; set; }
        public string Column3 { get; set; }
        public string Column4 { get; set; }
        public string Column5 { get; set; }
        public string Column6 { get; set; }
        public string Column7 { get; set; }
        public string Column8 { get; set; }
        public string Column9 { get; set; }
        public string Column10 { get; set; }
        public string Column11 { get; set; }
        public string Column12 { get; set; }
        public string Column13 { get; set; }
        public string Column14 { get; set; }
        public string Column15 { get; set; }
        public string Column16 { get; set; }
        public string Column17 { get; set; }
        public string Column18 { get; set; }
        public string Column19 { get; set; }
        public string Column20 { get; set; }
        public string Column21 { get; set; }
        public string Column22 { get; set; }
        public string Column23 { get; set; }
        public string Column24 { get; set; }
        public string Column25 { get; set; }
        public string Column26 { get; set; }
        public string Column27 { get; set; }
        public string Column28 { get; set; }
        public string Column29 { get; set; }
        public string Column30 { get; set; }

        public string Monthwise { get; set; }
        public string Monthwise1 { get; set; }
        // public string Sep_ { get; set; }
        public string Carry_Fwd { get; set; }
        public string Total { get; set; }
        public string TotalAbsents { get; set; }

        public string TotaExracuracitivities { get; set; }
        public string Month { get; set; }
        public string Till_Date { get; set; }
    }
    public class Presentabsentdetails
    {
        public string TotalPresentsinDay { get; set; }
        public string TotalAbsentsinDay { get; set; }
    }
    public class Attendancesummarydetails
    {
        public string Startofmonth { get; set; }
        public string Boys { get; set; }
        public string Girls { get; set; }
        public string Joinees { get; set; }
        public string Withdrawals { get; set; }
        public string BoysPresent { get; set; }
        public string BoysAbsent { get; set; }
        public string BoysAvg { get; set; }
        public string GirlsPresent { get; set; }
        public string GirlsAbsent { get; set; }
        public string GirlsAvg { get; set; }
        public string TotalPresent { get; set; }
        public string TotalAbsent { get; set; }
        public string TotalAvg { get; set; }
        public string Holidays { get; set; }
        public string Currentmonth { get; set; }
        public string Sincestartofsession { get; set; }
    }

    #endregion


    #region CLASS WISE & STUDENT WISE ATTENDANCE REPORT
    public class ClasswisestudentattendanceReport : Instancess
    {
        [Required]
        public List<string> ClassificationId { get; set; }
        [Required]
        public List<string> SubClassificationId { get; set; }

        [Required]
        public DateTime? StartDate { get; set; }
        [Required]
        public DateTime? EndDate { get; set; }

        public string ClassificationIds { get; set; }
        public string SubclassificationIds { get; set; }

        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }

    }

    public class AttendancereportClasswisestudentwise
    {
        public List<classwisemonthreporttable1> attendancemonthreports { get; set; }
        public List<classwisemonthreporttable2> attendancemonthpercantage { get; set; }
        public string Message { get; set; }
    }
    public class classwisemonthreporttable1
    {
        public List<string> DynamicColumns { get; set; }

        public classwisemonthreporttable1()
        {
            DynamicColumns = new List<string>();
        }
        public string UserID { get; set; }
        public string SubclassificationName { get; set; }
        public string Name { get; set; }
        public string AdmissionNumber { get; set; }
        public string Gender { get; set; }
        public string DateOfJoining { get; set; }
        public string Totaldayspresent { get; set; }
        public string Workingdays { get; set; }
        public string DisplayOrder { get; set; }
    }
    public class classwisemonthreporttable2
    {
        public string Subclass { get; set; }
        public string TotalPresentofBoys { get; set; }
        public string TotalPresentofGirls { get; set; }
        public string TotalPresents { get; set; }
        public string TotalWorkingdaysforBoys { get; set; }
        public string TotalWorkingdaysforGirls { get; set; }
        public string TotalWorkingdays { get; set; }
        public string Attendancepercentageofboys { get; set; }
        public string Attendancepercentageofgirls { get; set; }
        public string Attendancepercentage { get; set; }
        public string displayorder { get; set; }
    }

    #endregion


}
