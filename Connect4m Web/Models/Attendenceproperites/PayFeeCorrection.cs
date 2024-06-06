using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class Userpayfeecorrections : Commonproperties
    {
        public string InstanceUserCode { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string InstanceClassificationId { get; set; }
        public string InstanceSubClassificationId { get; set; }
        public string ParentName { get; set; }
        public string MobilePhone { get; set; }
        public string PortalEmail { get; set; }
        public string StudentQuota { get; set; }
        public string ICNumber { get; set; }
        public string Actionbuttonname { get; set; }
    }
    public class Payfeecorrectionstbl
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string RoleName { get; set; }
        public string InstanceUserCode { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public string MobilePhone { get; set; }
        public string PortalEmail { get; set; }
    }
    public class PFCfeedetailstbl
    {
        public List<PFCfeetermsnames> Managefeedetailsfeeterms { get; set; }
        public List<FeedetialsbyuserId> feedetialsli { get; set; }
        public List<Usertotalpayedamount> userpayedli { get; set; }
        public List<PFCfeetermsnames> feetermsnames { get; set; }
        public List<PFCfeetermdetialsbyuserId> Termdetaisli { get; set; }
        public List<Feedetialsbyuseridforpreviousdues> Previousduesli { get; set; }


    }
    public class Feeinstallmentsinsert : Commonproperties
    {
        public string BankAccountId { get; set; }
        public string Description { get; set; }
        public string ReceiptNo { get; set; }
        public int UserFeeId1 { get; set; }
        public string ChequeDDNo { get; set; }
        public string ChequeDDDate { get; set; }
        public string ChequeDDBank { get; set; }
        public string PayableBranchId { get; set; }
        public string CCDDNameOfCard { get; set; }
        public string CCDDType { get; set; }
        public string CCDDNameofIssuer { get; set; }
        public string BankAddress { get; set; }
        public string DueAmount { get; set; }
        public string InstallmentName { get; set; }
        public string Amount { get; set; }
        public int FeeTypeid { get; set; }
        public int AcademicYearId { get; set; }
        public int FeeTermId { get; set; }
        public int PaymentModeId { get; set; }
        public DateTime PaymentDate { get; set; }
        public string CCDDNo { get; set; }
        public DateTime? ChequeDDDates { get; set; }
        public string Challana_TermName { get; set; }
        public string Challana_FeeType { get; set; }
        public string Challana_FeeAmount { get; set; }
        public string Challana_DiscountType { get; set; }
        public string Challana_DiscountAmount { get; set; }
        public string Challana_PaidAmount { get; set; }
        public string Challana_PayingAmount { get; set; }
        public string Challana_DueAmount { get; set; }
        public string Challana_BalanceDue { get; set; }
        public string Challana_DueDate { get; set; }
        public string Challana_UserRegId { get; set; }
        public string Challana_ClassificationName { get; set; }
        public string Challana_subclassificationName { get; set; }
        public string Challana_UserName { get; set; }
        public int ReturnStringValue { get; set; }

    }
    public class PFCfeetermsnames
    {
        public int FeeTermId { get; set; }
        public string TermName { get; set; }
        public string UserReceiptGenerationID { get; set; }
        public string TermNameReceiptNo { get; set; }
    }
    public class PFCfeetermdetialsbyuserId
    {
        public int FeeTermId { get; set; }
        public int AcademicYearId { get; set; }
        public string TermName { get; set; }
    }
}
