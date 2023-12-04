using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class PayFeeCorrection
    {

        

    }
    public class PAY_FEE_CORRECTIONS_BY_USERS_Tbl1
    {
        public string InstanceName { get; set; }
        public string AmountTextBox { get; set; }
        public string userfeeid { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public string InstanceUserCode { get; set; }
        public string AdmissionNumber { get; set; }
        public string TermName { get; set; }
        public string FeeType { get; set; }
        public int FeeTypeId { get; set; }
        public int FeeTermId { get; set; }
        public int userfeeactivityId { get; set; }
        public int AcademicYearId { get; set; }
        //public int FeeTypeid { get; set; }
        public string FeeAmount { get; set; }
        public string DiscountName { get; set; }
        public string DueAmount { get; set; }
        public string DueDate { get; set; }
        public string Amount { get; set; }
        public string ReceiptNo { get; set; }
        public string PayedAmount { get; set; }
        public string ConcedingAmount { get; set; }
        public string FirstName { get; set; }


    }

    public class PAY_FEE_CORRECTIONS_BY_USERS
    {

        public List<PAY_FEE_CORRECTIONS_BY_USERS_Tbl1> PAY_FEE_CORRECTIONS_BY_USERS_Tbl1 { get; set; }
        public List<PAY_FEE_CORRECTIONS_BY_USERS_Tbl3> PAY_FEE_CORRECTIONS_BY_USERS_Tbl3 { get; set; }



        public string Search_PayUserBtn { get; set; }
        public string BankAddress { get; set; }
        public string CCDDNameofIssuer { get; set; }
        public string CCDDType { get; set; }
        public string CCDDNameOfCard { get; set; }
        public string PayableBranchId { get; set; }
        public string ChequeDDBank { get; set; }
        public string ChequeDDDate { get; set; }
        public string ChequeDDNo { get; set; }
        public string CreatedBy { get; set; }
        public string BankAccountId { get; set; }
        public string InstallmentName { get; set; }
        public string PaymentDate { get; set; }


        public int InstanceId { get; set; }//44
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
        public string CCDDNo { get; set; }
        public string UserFeeId1 { get; set; }
        public int PaymentModeId { get; set; }
        public string FeeType { get; set; }
        public int FeeTypeId { get; set; }
        //public int FeeTypeid { get; set; }
        public string FeeAmount { get; set; }
        public string DiscountName { get; set; }
        public string PayedAmount { get; set; }
        public string DueAmount { get; set; }
        public string DueDate { get; set; }
        public string Amount { get; set; }
        public string TotalFee { get; set; }
        public string ChequeAmount { get; set; }
        public string Discountamount { get; set; }
        public string ConcedingAmount { get; set; }
        public string Comments { get; set; }
        public string TextBoxEnable { get; set; }
        public string DisplayIcon1 { get; set; }
        public string PaidAmount { get; set; }
        public string Gender { get; set; }
        public string InstanceName { get; set; }
        public string ContactUs { get; set; }
        public string PhoneNumber { get; set; }
        public string Fax { get; set; }
        public string Address { get; set; }
        public string AdmissionNumber { get; set; }
        public string userfeeid { get; set; }
        public string AmountTextBox { get; set; }
        //public string ReceiptNo { get; set; }
        public string TotalAmountPayed { get; set; }

        public int InstanceRoleId { get; set; }
        // public int FeeTypeid { get; set; }


        // Fee amount Paid edit fee paid amount properties
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
        public string FeeTypeStatus { get; set; }
        public string Quantity { get; set; }
        public string ReceiptCode { get; set; }
        public string ReceiptNoForm { get; set; }
        public string UpdatedDate { get; set; }
        public string OrderBy { get; set; }
        public string FeeTypeOrder { get; set; }
        public string FeeTypeTermId { get; set; }
        public string UserReceiptGenerationID { get; set; }
        public string TermNameReceiptNo { get; set; }



    }
    public class PAY_FEE_CORRECTIONS_BY_USERS_Tbl3
    {
        public string TotalAmountPayed { get; set; }
        public string TotalFee { get; set; }
        public string DueAmount { get; set; }

        public string ChequeAmount { get; set; }
        public string discountamount { get; set; }
        public string Payedamount { get; set; }
    }
}
