using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class ConcedingTypes : Commonproperties
    {
        public int ConcedingTypeId { get; set; }
        public string ConcedingTypeName { get; set; }
        public decimal ConcedingAmount { get; set; }
    }
    public class Feetypesddl : Commonproperties
    {
        public string FeetypeId { get; set; }
        public string Feetype { get; set; }
        public decimal Amount { get; set; }
    }
    public class AcademicYearddl : Commonproperties
    {
        public int AcademicYearId { get; set; }
        public string Years { get; set; }
    }
    public class Feetypes : Commonproperties
    {
        public int Feetypeid { get; set; }

        [Required(ErrorMessage = "Fee Type is required")]
        public string FeeType { get; set; }
        public string Description { get; set; }

        [Required(ErrorMessage = "Fee Type is for is required")]
        public string Feetypestatus { get; set; }
        public string Quantity { get; set; }
        public decimal Amount { get; set; }
        public string Concedingtypeid { get; set; }
        public string Concedingtypename { get; set; }
        public List<string> ConcedingtypeIds { get; set; }

        //public List<Feetypes> FilteredRows { get; set; }
    }
    public class Feeterms : Commonproperties
    {
        public int FeeTermId { get; set; }

        [Required(ErrorMessage = "Academic Year is required")]
        public int? AcademicYearId { get; set; }

        [Required(ErrorMessage = "Fee Term is required")]
        public string TermName { get; set; }
        public string Description { get; set; }
        public string TermOrder { get; set; }
        public string Years { get; set; }
        [Required(ErrorMessage = "Fee Type is required")]
        public string FeeTypeId { get; set; }
        public string FeeType { get; set; }
        public List<string> FeeTypeIds { get; set; }
    }
    public class BankAccounts : Commonproperties
    {
        [RegularExpression("^[0-9]+$", ErrorMessage = "Account Number must contain only digits.")]
        [Required(ErrorMessage = "Account Number is required")]
        public string AccountNumber { get; set; }

        [RegularExpression("^[a-zA-Z ]+$", ErrorMessage = "Only alphabetic characters and spaces are allowed.")]
        [Required(ErrorMessage = "Bank Name is required")]
        public string BankName { get; set; }
        public int BankAccountId { get; set; }
        public string Description { get; set; }
        public string BankShortCode { get; set; }
        public string Address { get; set; }

        [RegularExpression("^[0-9]+$", ErrorMessage = "Branch Code must contain only digits.")]
        [StringLength(5, MinimumLength = 5, ErrorMessage = "Branch Code must be exactly 5 characters.")]
        public string BranchCode { get; set; }

        [RegularExpression(@"^[A-Za-z]{4}\d{7}$", ErrorMessage = "IFSC Code must be in the format ABCD0123456.")]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "IFSC Code must be exactly 11 characters.")]
        public string IFSCCode { get; set; }
        public string IFCCode { get; set; }
        public string IsBankTransfer { get; set; }

    }
    public class Feeconcedingtypes : Commonproperties
    {
        public int ConcedingTypeId { get; set; }

        [Required(ErrorMessage = "Amount is required")]
        public decimal Amount { get; set; }

        [Required(ErrorMessage = "Fee Discount Type is required")]
        public string ConcedingTypeName { get; set; }
        public string Description { get; set; }
        public string FeeTypeId { get; set; }
        public string ChangeActivity { get; set; }
        public string FeeType { get; set; }
        public string FeeTypeStatus { get; set; }
        public List<string> ConcedingtypeIds { get; set; }
        public string Quantity { get; set; }
        public string AmountFormatted { get; set; }
    }
    public class ChallanaDetails
    {
        public string Challana_TermName { get; set; }
        public string Challana_FeeType { get; set; }
        public double Challana_FeeAmount { get; set; }
        public string Challana_DiscountType { get; set; }
        public string Challana_DiscountAmount { get; set; }
        public string Challana_PaidAmount { get; set; }
        public double Challana_PayingAmount { get; set; }
        public string Challana_DueAmount { get; set; }
        public double Challana_BalanceDue { get; set; }
        public string Challana_DueDate { get; set; }
        public string Challana_UserRegId { get; set; }
        public string Challana_ClassificationName { get; set; }
        public string Challana_subclassificationName { get; set; }
        public string Challana_UserName { get; set; }
        public int ReturnStringValue { get; set; }
        public string Description { get; set; }
    }
    public class DiscountAndQuantityData
    {
        public List<SelectListItem> DiscountTypeList { get; set; }
        public List<SelectListItem> QuantityList { get; set; }
    }

    #region payfeeforusers   
    public class Userpayfee : Commonproperties
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
    public class Payfeebyuserstbl
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
    public class GetUserfeedetails
    {
        public List<FeetermdetialsbyuserId> feetermdetialsbyuserId { get; set; }
        public List<Feedetialsbyuseridforpreviousdues> feedetialsbyuseridforpreviousdues { get; set; }
        public List<FeedetialsbyuserId> feedetialsbyuserId { get; set; }
        public List<Usertotalpayedamount> usertotalpayedamount { get; set; }
        public List<FeetermdetialsbyuserId> feetermsdd { get; set; }
    }
    public class FeetermdetialsbyuserId
    {
        public int FeeTermId { get; set; }
        public int AcademicYearId { get; set; }
        public string TermName { get; set; }
    }
    public class Feedetialsbyuseridforpreviousdues
    {
        public string FeeTypeId { get; set; }
        public string AcademicYearId { get; set; }
        public string FeeType { get; set; }
        public string FeeTypeStatus { get; set; }
        public string Quantity { get; set; }
        public string Amount { get; set; }
        public string ReceiptCode { get; set; }
        public string ReceiptNoForm { get; set; }
        public string OrderBy { get; set; }
        public string FeeTypeOrder { get; set; }
        public string FeeTypeTermId { get; set; }
    }
    public class FeedetialsbyuserId
    {
        public string InstanceName { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public string InstanceUserCode { get; set; }
        public string AdmissionNumber { get; set; }
        public string FirstName { get; set; }
        public string userfeeid { get; set; }
        public string TermName { get; set; }
        public string FeeTermId { get; set; }
        public string FeeTypeId { get; set; }
        public string FeeType { get; set; }
        public string ConcedingTypeId { get; set; }
        public string AcademicYearId { get; set; }
        public string PayedAmount { get; set; }
        public string FeeAmount { get; set; }
        public string Quantity { get; set; }
        public string DiscountName { get; set; }
        public string ConcedingAmount { get; set; }
        public string DueAmount { get; set; }
        public string AmountTextBox { get; set; }
        public string DueDate { get; set; }
        public string ChequeAmount { get; set; }
        public string Amount { get; set; }
        public string LastPayedAmount { get; set; }
        public string ReceiptNo { get; set; }
        public string userfeeactivityId { get; set; }
        public string DisplayIcon { get; set; }
        public string DisplayIcon1 { get; set; }
    }
    public class Usertotalpayedamount
    {
        public string TotalAmountPayed { get; set; }
        public string TotalFee { get; set; }
        public string DueAmount { get; set; }
        public string ChequeAmount { get; set; }
        public string discountamount { get; set; }
        public string Payedamount { get; set; }
    }
    public class DiscountAndQuantitylist
    {
        public List<SelectListItem> DiscountTypeList { get; set; }
        public List<Quantityamountllist> QuantityList { get; set; }
    }
    public class Quantityamountllist
    {
        public string FeeTypeId { get; set; }
        public string FeeType { get; set; }
        public string FeeTypeStatus { get; set; }
        public string Quantity { get; set; }
        public string Amount { get; set; }
        public string ReceiptCode { get; set; }
        public string ReceiptNoForm { get; set; }
        public string OrderBy { get; set; }
    }
    public class Feeupdateinpayfeeforusers : Commonproperties
    {
        public int StudentuserId { get; set; }
        public int FeeTypeId { get; set; }
        public int AcademicYearId { get; set; }
        public int FeeTermId { get; set; }
        public string ConcedingTypeId { get; set; }
        public string Quantity { get; set; }
        public string FeeAmount { get; set; }
        public string ConcedingAmount { get; set; }
        public DateTime DueDate { get; set; }
        public string Comments { get; set; }
    }
    public class FeeInstallmentResult
    {
        public string ReceiptNo { get; set; }
        public string Insertretunmessage { get; set; }
        public List<FeedetialsbyuserId> FeedetialsList { get; set; }
        public List<Usertotalpayedamount> UserPayedList { get; set; }
    }
    public class Feedetaisledit
    {
        public int UserId { get; set; }
        public int FeeTermId { get; set; }
        public int UserFeeId1 { get; set; }

    }
    public class Feedetaisleditupdateproperties
    {
        public string Search_PayUserBtn { get; set; }
        public string BankAccountId { get; set; }
        public int InstanceRoleId { get; set; }
        public int FeeTypeid { get; set; }
        public int InstanceId { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string InstanceUserCode { get; set; }
        public string PortalEmail { get; set; }
        public string ParentName { get; set; }
        public string MobilePhone { get; set; }
        public string InstanceClassificationId { get; set; }
        public string InstanceSubClassificationId { get; set; }
        public string StudentQuota { get; set; }
        public string ICNumber { get; set; }
        public string UserId { get; set; }
        public string RoleName { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public string IsActive { get; set; }
        public string FeeConceedingTypeId { get; set; }
        public string FeeConceedingTypeName { get; set; }
        public string DisplayIcon { get; set; }

        //Edit View Properties
        public int FeeTermId { get; set; }
        public int AcademicYearId { get; set; }
        public string TermName { get; set; }
        public string Description { get; set; }
        public string FeeType { get; set; }
        public string FeeAmount { get; set; }
        public string DiscountName { get; set; }
        public string PayedAmount { get; set; }
        public string DueAmount { get; set; }
        public string DueDate { get; set; }
        public string Amount { get; set; }
        public string TotalFee { get; set; }
        public string ChequeAmount { get; set; }
        public string Discountamount { get; set; }
        public string CCDDNo { get; set; }
        public string UserFeeId1 { get; set; }
        public int PaymentModeId { get; set; }
        public string InstanceName { get; set; }
        public string ContactUs { get; set; }
        public string PhoneNumber { get; set; }
        public string Fax { get; set; }
        public string Address { get; set; }
        public string AdmissionNumber { get; set; }
        public string userfeeid { get; set; }
        public string AmountTextBox { get; set; }
        public string ConcedingAmount { get; set; }
        public string Comments { get; set; }
        public string TextBoxEnable { get; set; }
        public string DisplayIcon1 { get; set; }
        public string PaidAmount { get; set; }
        public string Gender { get; set; }
        public string ReceiptNo { get; set; }
        public string TotalAmountPayed { get; set; }
        public string FatherName { get; set; }
        public string TransCancel { get; set; }
        public string LastpayedAmount { get; set; }

        public string ChequeFeePaidAmount { get; set; }
        public string FeePaidAmount { get; set; }
        public string PaymentStatus { get; set; }
        public string BankName { get; set; }
        public string AccountNumber { get; set; }
        public string Mode { get; set; }
        public string CollectedBy { get; set; }
        public string InstallmentId { get; set; }
        public string ConcedingTypeId { get; set; }
        public string ChequeStatusValue { get; set; }
        public string ChequeStatus { get; set; }
        public string PhoneExtension { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public string InstallmentName { get; set; }
        public string ChequeDDNo { get; set; }
        public string ChequeDDDate { get; set; }
        public DateTime? ChequeDDDates { get; set; }
        public string ChequeDDBank { get; set; }
        public string PayableBranchId { get; set; }
        public string CCDDNameOfCard { get; set; }
        public string CCDDType { get; set; }
        public string CCDDNameofIssuer { get; set; }
        public string BankAddress { get; set; }



        /*-------------------------------- CHALLAN PROPERTIES START   ----------------------------------*/
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
    public class Feeupdaterecieptdetails
    {
        public string ReceiptNo { get; set; }
        public string DiscountName { get; set; }
        public string DueDate { get; set; }
        public string FirstName { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public string InstallmentName { get; set; }
        public string Amount_Txt { get; set; }
        public string InstallmentId { get; set; }
        public string PaidDate { get; set; }
        public string PaidTime { get; set; }
        public string FeeType { get; set; }
        public string Term { get; set; }
        public string FeeAmount { get; set; }
        public string ConcedingAmount { get; set; }
        public string DueAmount { get; set; }
        public string balanceamount { get; set; }
    }
    public class PayFeeCorrectionsupdateinpayfeeforusers : Commonproperties
    {
        public int ChallanId { get; set; }
        public int StudentuserId { get; set; }
        public int FeeTypeId { get; set; }
        public int AcademicYearId { get; set; }
        public int FeeTermId { get; set; }
        public string ConcedingTypeId { get; set; }
        public string Quantity { get; set; }
        public string FeeAmount { get; set; }
        public string ConcedingAmount { get; set; }
        public DateTime DueDate { get; set; }
        public string Comments { get; set; }
    }
    #endregion

    #region FEE STATUS
    public class Feestatus:Commonproperties
    {
        [Required(ErrorMessage ="Role is required")]
        public int RoleId { get; set; }
        public int ClassificationId { get; set; }
        public int SubclassificationId { get; set; }
        public int StudentQuotaId { get; set; }
        [Required(ErrorMessage = "Academic year is required")]
        public int AcademicYearId { get; set; }
        public int FeeTermId { get; set; }
        [Required(ErrorMessage = "Feetype is required")]
        public string FeeTypeId { get; set; }
        public string Amounttype { get; set; }
        public string Operator { get; set; }
        public string Price { get; set; }
        public string Actionbuttonvalue { get; set; }
        public string StudentUserId { get; set; }
    }
    public class Feestatusdetails
    {
        public string StudentName { get; set; }
        public int Studentid { get; set; }
        public string StudentSmsStatus { get; set; }
        public string FeeAmount { get; set; }
        public string ParentName { get; set; }
        public string ParentSmsStatus { get; set; }
        public string ParentEmail { get; set; }
        public string ParentPhone { get; set; }
        public string FeePaid { get; set; }
        public string StudentMobile { get; set; }
        public string StudentEmail { get; set; }
        public decimal ConcedingAmount { get; set; }
        public string ConcedingTypeName { get; set; }
        public string DueAmount { get; set; }
        public string Program { get; set; }
        public string Batch { get; set; }
    }
    public class FeestatusIndividual
    {
        public string DueAmount { get; set; }
        public string PayedAmount { get; set; }
        public string DiscountName { get; set; }
        public string ConcedingAmount { get; set; }
        public string FeeAmount { get; set; }
        public string FeeType { get; set; }
    }
    public class RequestedDataModel:Commonproperties
    {
        public string CollectedData { get; set; }
        public string Subject { get; set; }
        public string Studentphonenumbers { get; set; }
        public string Parentphonenumbers { get; set; }
        public string Studentemails { get; set; }
        public string Parentemails { get; set; }
        public string Studentsmsstatus { get; set; }
        public string Parentsmsstatus { get; set; }
        public string Typeoff { get; set; }
        public Boolean StudentSMSChk { get; set; }
        public Boolean ParentSMSChk { get; set; }
        public Boolean StudentEmailChk { get; set; }
        public Boolean ParentEmailChk { get; set; }
        public string Studentids { get; set; }
    }
    public class CommunicationData
    {
        public List<string> studentMobileNumbers { get; set; }
        public List<string> parentMobileNumbers { get; set; }
        public List<string> studentEmails { get; set; }
        public List<string> parentEmails { get; set; }
        public List<string> Studentsmsstatus { get; set; }
        public List<string> Parentsmsstatus { get; set; }
        public List<string> Studentids { get; set; }
    }
    public class DropdownLists
    {
        public List<SelectListItem> RoleList { get; set; }
        public List<SelectListItem> ClassificationList { get; set; }
        public List<SelectListItem> StudentQuotaList { get; set; }
        public List<SelectListItem> AcademicYearList { get; set; }
    }
    #endregion
}
