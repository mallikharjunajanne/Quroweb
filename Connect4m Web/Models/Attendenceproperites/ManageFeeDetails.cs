using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class ManageFeeDetails
    {
        public int InstanceId { get; set; }
        public string FeeTypeids { get; set; }
        public string UserIds { get; set; }
        public string StopName { get; set; }
        public string RouteName { get; set; }
        public string RoleName { get; set; }

        [Required(ErrorMessage = "Role is required")]
        public int InstanceRoleId { get; set; }

        [Required(ErrorMessage = "Department is required")]
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }

        [Required(ErrorMessage = "Class is required")]
        public int InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }
        public int StudentQuotaId { get; set; }
        public string StudentQuotaName { get; set; }
        public int Gender { get; set; }

        [Required(ErrorMessage = "Academic Year is required")]
        public int AcademicYearId { get; set; }
        public string Years { get; set; }

        [Required(ErrorMessage = "FeeTerm is required")]
        public int FeeTermId { get; set; }
        public string TermName { get; set; }
        public string FeeTypeid { get; set; }
        public string FeeType { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string InstanceUserCode { get; set; }
        public int StudentQuota { get; set; }
        public int CollegeHostel { get; set; }
        public string PaidAmount { get; set; }
        public string DueAmount { get; set; }
        public string DisplayIcon1 { get; set; }
        public string DisplayIcon { get; set; }
        public string TextBoxEnable { get; set; }
        public string Comments { get; set; }
        public string DueDate { get; set; }
        public string FeeAmount { get; set; }
        public string userfeeactivityId { get; set; }
        public string ConcedingTypeId { get; set; }
        public decimal ConcedingAmount { get; set; }
        public string userFeeId { get; set; }
        public string Discount_CheckBoxValue { get; set; }
        public string ErrorMessage { get; set; }
        public List<SelectListItem> Discount_Amount_DD { get; set; }

        //public List<ManageFeeDetails> ManageFeeDetails_Discount { get; set; }
        //public string FeeType_CheckedTextNames { get; set; }
    }
    public class UserFeedetails :Commonproperties
    {
        public string StudentUserId { get; set; }
        public string FeeTermId { get; set; }    
        public string AcademicYearId { get; set; }
        public string ConcedingTypeId { get; set; }
        public decimal ConcedingAmount { get; set; }
        public List<FeetypesDetail> FeeDetails { get; set; }
    }
    public class FeetypesDetail
    {
        public string FeeTypeId { get; set; }
        public decimal? PaidAmounts { get; set; }
        public decimal FeeAmount { get; set; }
        public string Comments { get; set; }
        public DateTime? DueDates { get; set; }
    }
    public class Discountfeedetails: Commonproperties
    {
        public string StudentUserId { get; set; }
        public string FeeTermId { get; set; }
        public string AcademicYearId { get; set; }
        public string ConcedingTypeId { get; set; }
        public decimal ConcedingAmount { get; set; }
        public string FeeTypeId { get; set; }
        public decimal? PaidAmounts { get; set; }
        public decimal FeeAmount { get; set; }
        public string Comments { get; set; }
        public DateTime? DueDates { get; set; }
    }
    public class DiscountAmount_DD
    {
        public string ConcedingTypeId { get; set; }
        public string ConcedingTypeName { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }

    }
    public class User_FeeDetails:Commonproperties
    {
        public string FirstName { get; set; }
        public string InstanceUserCode { get; set; }
        public string StudentUserId { get; set; }
        public string StudentUserid { get; set; } //Newly Added
        public string FeeTypeId { get; set; }
        public decimal FeeAmount { get; set; }
        public string Comments { get; set; }      
    }
    public class FeeDetailsViewModel
    {
        public List<ManageFeeDetails> UsersList { get; set; }
        public List<string> FeeTypeCheckedTextNames { get; set; }
        public List<string> FeeTypeCheckedFeetypeids { get; set; }
    }
    public class userDropdown
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string InstanceUserCode { get; set; }
        public string StudentQuota { get; set; }
        public string CollegeHostel { get; set; }
        public string Gender { get; set; }
    }
}
