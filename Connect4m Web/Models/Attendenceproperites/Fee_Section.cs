﻿using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{

    public class ManageFeeTypesViewModel
    {
        public int LicenseCount { get; set; }
        public List<Fee_Section> FeeTypes { get; set; }
        public List<SelectListItem> DiscountTypes { get; set; }
    }

    public class Fee_Section
    {
        public string InstanceId { get; set; }
        public string FeeTypeId { get; set; }
        public string FeeType { get; set; } 
        public string FeeTypeStatus { get; set; }
        public string Description { get; set; }
        public string ConcedingTypeId { get; set; }
        public List<string> ConcedingtypeIds { get; set; }
        public string Quantity { get; set; }
        public string Amount { get; set; }
        public string AmountFormatted { get; set; }
        public string ConcedingTypeName { get; set; }        
    }


    public class Cr_FT 
    {

        public int ConcedingTypeId { get; set; }
        public string ConcedingTypeName { get; set; }
       
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }

    public class Manage_Fee_Terms 
    {
        public string FeeTermId { get; set; }
        public string FeeTypeIds { get; set; }
        public string InstanceId { get; set; }
        public string AcademicYearId { get; set; }
        public string TermName { get; set; }
        public string Description { get; set; }
        public string TermOrder { get; set; }
        public string Years { get; set; }
        public string FeeTypeId { get; set; }
        public string FeeType { get; set; }
    }

    public class Manage_Bank_accounts
    {
      
        public int BankAccountId { get; set; }
        public int InstanceId { get; set; }
        public string AccountNumber { get; set; }
        public string BankName{ get; set; }
        public string Description { get; set; }
        public string BankShortCode { get; set; }
        public string Address { get; set; }
        public string BranchCode { get; set; }
        public string IFSCCode  { get; set; }
        public string IFCcode  { get; set; }
        public string IsBankTransfer  { get; set; }


    }

    public class PAY_FEE_BY_USERS_Tbl1
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
       // public int userfeeactivityId { get; set; }
        public string userfeeactivityId { get; set; }
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
    public class PAY_FEE_BY_USERS 
    {
        public List<PAY_FEE_BY_USERS_Tbl1> PAY_FEE_BY_USERS_Tbl1 { get; set; }
        public List<PAY_FEE_BY_USERS_Tbl3> PAY_FEE_BY_USERS_Tbl3 { get; set; }

        
        public string Search_PayUserBtn { get; set; }



        public string BankAccountId { get; set; }
        public int InstanceRoleId { get; set; }    //4   
        public int FeeTypeid { get; set; }  //8
        public int InstanceId { get; set; }  //1   7
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string InstanceUserCode { get; set; }
        public string PortalEmail { get; set; }
        public string ParentName { get; set; }
        public string MobilePhone { get; set; }
        public string InstanceClassificationId { get; set; }       //2
        public string InstanceSubClassificationId { get; set; }        //3
        public string StudentQuota { get; set; }
        public string ICNumber { get; set; }





        public string UserId { get; set; }     //7
        public string RoleName { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public string IsActive { get; set; }
        public string FeeConceedingTypeId { get; set; }
        public string FeeConceedingTypeName { get; set; }
        public string DisplayIcon { get; set; }


        //Edit View Properties
        public int FeeTermId { get; set; }        //6
        public int AcademicYearId { get; set; }            //5
        public string TermName { get; set; }
        public string Description { get; set; }
                    
 
        public string FeeType { get; set; }
        //public int FeeTypeId { get; set; }
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
        public string CreatedBy { get; set; }
        public string InstallmentName { get; set; }
        public string ChequeDDNo { get; set; }
        public string ChequeDDDate { get; set; }
        public DateTime? ChequeDDDates{ get; set; }
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

    public class Pay_Amount_Update_byUsers 
    {
        public int  InstanceId { get; set; }
        public int UpdatedBy { get; set; }
        public List<string> Amount{ get; set; }
        public List<string> InstallmentName { get; set; }
        public List<string> InstallmentId { get; set; }
    }


    public class PAY_FEE_BY_USERS_Tbl3
    {
        public string TotalAmountPayed { get; set; }
        public string TotalFee { get; set; }
        public string DueAmount { get; set; }

        public string ChequeAmount { get; set; }
        public string discountamount { get; set; }
        public string Payedamount { get; set; }
    }

    public class Save_UpdateFee 
    {
        public string Comments { get; set; }
        public DateTime DueDate { get; set; }
        public string ConcedingAmount { get; set; }
        public string FeeAmount { get; set; }
        public int Quantity { get; set; }
        public int ConcedingTypeId { get; set; }
        public int FeeTermId { get; set; }
        public int AcademicYearId { get; set; }
        public int FeeTypeId { get; set; }
        public int UserId { get; set; }
    }

    public class DiscountAndQuantityData
    {
        public List<SelectListItem> DiscountTypeList { get; set; }
        public List<SelectListItem> QuantityList { get; set; }
    }
}