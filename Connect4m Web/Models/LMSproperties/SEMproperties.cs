using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class SEMproperties : Instance
    {
        public int FundSourceId { get; set; }
        public string FundSourceName { get; set; }
        public int FundFlag { get; set; }

        

    }

    public class SEMfees
    {
     
        public double FeeCollected { get; set; }
        public double Transfered { get; set; }
        public double RemainingAmount { get; set; }
        public double DebitedAmount { get; set; }
        public double ApprovalTotalAmount { get; set; }
        public double ApprovalDebitedAmount { get; set; }
        public double RejectedTotalAmount { get; set; }
        public double RejectedDebitedAmount { get; set; }
        public double PendingTotalAmount { get; set; }
        public double PendingDebitedAmount { get; set; }
    }
    public class SEMpaymentmode : Instance
    {
        public int PaymentModeId { get; set; }
        public string Mode { get; set; }

    }
    public class SEMacademicyear : Instance
    {
        public int AcademicYearId { get; set; }
        public string Years { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int PaymentModeId { get; set; }
        public int AttendanceModeId { get; set; }
        public int HealthCheckUpsModeId { get; set; }
        public int isactive { get; set; }
    }
    public class SEMproperitesSub:SEMfees
    {

        [Display( Name ="Type of Expenditure")]
        public string TypeofExpenditure { get; set; }

        [Display(Name = "Payment Mode")]
        public string PaymentMode { get; set; }
        public double Amount { get; set; }
        public string Recipient { get; set; }
        [Display(Name = "Year")]
        public string YearId { get; set; }
        [Display(Name = "Month")]
        public string MonthId { get; set; }
        [Display(Name = "Vendor Category ")]
        public string VendorCategory { get; set; }
        [Display(Name = "Payment Date")]
        [DataType(DataType.Date)]

        public DateTime PaymentDate { get; set; }
        public string Approvals { get; set; }
    }
    public class ExpensiveReport
    {
        public List<SEMtblGovFundRecieved> obj { get; set; }
        public double Amount { get; set; }
    }
    public class ExpensiveReportsub
    {
        public int InstanceId { get; set; }
        public string Approval { get; set; }
        public string ExpenditureType { get; set; }
        [Required]
        [DataType(DataType.Date)]
        public DateTime FromDate { get; set; }
        [Required]
        [DataType(DataType.Date)]

        public DateTime Todate { get; set; }

    }

    public class SEMtblGovFundRecieved
    {
        public int GovFundId { get; set; }
        public int InstanceId { get; set; }
        public int FundRecievedFromId { get; set; }
        public int FinancialYearId { get; set; }
        public int PaymentModeId { get; set; }
        public int BankAccountId { get; set; }
        public string InstallmentNo { get; set; }
        [Required]
        [Display(Name = "Type of Expenditure")]
        public string TypeofExpenditure { get; set; }
        [Required]
        [RegularExpression(@"[.0-9]+$", ErrorMessage = "Please Enter a Valid Amount ")]

        public double Amount { get; set; }
        [Required]
        [Display(Name = "Payment Mode")]
        public string PaymentMode { get; set; }
        public string Description { get; set; }
        [DataType(DataType.Date)]
        [Required]
        [Display(Name = "Payment Date")]
        public DateTime PaymentDate { get; set; }
        [Required]
        [Display(Name = "Bank Name")]
        public string BankName { get; set; }
        [Required]
        [Display(Name = "Bank Address")]
        public string BankAddress { get; set; }
        [Required]
        [Display(Name = "Cheque/DD Number")]
        public string ChequeDDNo { get; set; }
        [DataType(DataType.Date)]
        [Required]
        [Display(Name = "Cheque/DD Date ")]
        public DateTime? ChequeDDDate { get; set; }
        [Required]
        [Display(Name = "Cheque/DD Bank Name")]
        public string ChequeDDBank { get; set; }
        [Required]
        [Display(Name = "Cheque/DD Bank Branch")]
        public string ChequeDDBranch { get; set; }
        [Required]
        [Display(Name = "Routing/Branch Number")]
        public string RoutingNumber { get; set; }
        public int Unit { get; set; }
        [Required]
        [Display(Name = "Year")]
        public int YearId { get; set; }
        [Required]
        [Display(Name = "Month")]
        public int MonthId { get; set; }
        [Display(Name = "Vendor Name")]

        public string VendorName { get; set; }
        [Display(Name = "Vendor Category")]
        public string VendorCategory { get; set; }
        [Display(Name = "Attachment")]
        public string DocName { get; set; }
        public string DocNameEdit { get; set; }


        [DataType(DataType.Date)]
        [Required]
        [Display(Name = "Remind At Date")]
        public DateTime RemindAt { get; set; }
        public int CreatedBy { get; set; }
        public int FundCategoryId { get; set; }
        public string ExpenditureType { get; set; }
        public int AcademicYearId { get; set; }

        public int Radiobuttonid { get; set; }
        public string Approvals { get; set; }
        public string AprovalDescription { get; set; }



    }
}
