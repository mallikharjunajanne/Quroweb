using System;
using System.Collections.Generic;
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
    public class ChallandetailsTermwise:Instancess
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


        public string PaymentDate { get;  set; }
        public int ROWIDCOL { get; set; }
        public string UserReceiptGenerationID { get; set; }
        public string Amount { get; set; }
        public string Createdate { get; set; }
        public string modename { get; set; }
        public string typename { get; set; }
        public string balance { get; set; }
        public string InvoiceNo { get; set; }

        public string FeeTermId { get;  set; }
        public string TermName { get;  set; }
        public string Concedingamount { get;  set; }
        public string FeeType { get;  set; }
        public string FeeTypeId { get;  set; }
        public string feeAmount { get; set; }

    }


    public class TermWiseFeeDetails:Instancess
    {
    
        public string  Due { get; set; }
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

}
