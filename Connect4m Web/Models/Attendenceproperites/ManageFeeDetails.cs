using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{

    public class User_FeeDetails
    {
        public string FirstName { get; set; }
        public string InstanceUserCode { get; set; }
        public string UserId { get; set; }
        public string FeeTypeId { get; set; }
        public decimal FeeAmount { get; set; }
        public string Comments { get; set; }
        //public List<DetailData> Details { get; set; }
      
    }

    public class DetailData
    {
        public int FeeTypeId { get; set; }
        public decimal FeeAmount { get; set; }
        public string Comments { get; set; }
    }


    public class FeeDetailsViewModel
    {
        public List<ManageFeeDetails> UsersList { get; set; }
        public List<string> FeeTypeCheckedTextNames { get; set; }
        public List<string> FeeTypeCheckedFeetypeids { get; set; }
    }
    public class ManageFeeDetails
    {



        //[JsonProperty("FeeTypeids")]
        //public List<string> FeeTypeids { get; set; }

        ////[JsonProperty("UserIds")]
        //public List<string> UserIds { get; set; }
        public string FeeTypeids { get; set; }
        public string UserIds { get; set; }
        public string StopName { get; set; }
        public string RouteName { get; set; }

        public int InstanceId { get; set; }  //1
        public string RoleName { get; set; }
        public  int InstanceRoleId { get; set; }
        //FeeTypeid InstanceRoleId

        public int InstanceClassificationId { get; set; }
        public string ClassificationName{ get; set; }
        public int InstanceSubClassificationId { get; set; }
        public string SubClassificationName{ get; set; }


        public int StudentQuotaId{ get; set; }
        public string StudentQuotaName{ get; set; }


        public int Gender { get; set; }

        public int AcademicYearId{ get; set; }
        public string Years{ get; set; }

        public int FeeTermId{ get; set; }
        
        public string TermName{ get; set; }

        public string FeeTypeid { get; set; }
      //  public int FeeTypeid { get; set; }
        public string FeeType { get; set; }


        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string  InstanceUserCode{ get; set; }
        public int  StudentQuota{ get; set; }
        public int  CollegeHostel{ get; set; }


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

        //public string FeeType_CheckedTextNames { get; set; }
        public List<SelectListItem> Discount_Amount_DD { get; set; }
        //public List<ManageFeeDetails> ManageFeeDetails_Discount { get; set; }

    }

    public class DiscountAmount_DD 
    {
        public string ConcedingTypeId { get; set; }
        public string ConcedingTypeName { get; set; }
        public decimal Amount { get; set; }
        public string Description{ get; set; }   

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
