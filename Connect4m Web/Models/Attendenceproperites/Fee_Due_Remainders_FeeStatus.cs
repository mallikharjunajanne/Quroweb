using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class Fee_Due_Remainders_FeeStatus
    {
        public int InstanceId { get; set; }
        public int InstanceRoleId { get; set; }
        public string RoleName { get; set; }
        public string UserIds { get; set; }  


        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }


        public int InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }


        public int StudentQuotaId { get; set; }
        public string StudentQuotaName { get; set; }

        public int AcademicYearId { get; set; }
        public string Years { get; set; }

        public int FeeTermId { get; set; }
        public string TermName { get; set; }

        public string FeeTypeid { get; set; }
        public string FeeType { get; set; }

        public string Selected_FeeTypeIds { get; set; }
        public string FeeTypeIds { get; set; }
        public string ButtonName { get; set; }
        public string Operator { get; set; }
        public string AmountType { get; set; }
        public string Price { get; set; }
        public string StudentQuota { get; set; }




        public string StudentName{ get; set; }        
        public int Studentid { get; set; }
        public string StudentSmsStatus{ get; set; }
        public string FeeAmount { get; set; }
        public string ParentName { get; set; }
        public string ParentSmsStatus { get; set; }
        public string ParentEmail{ get; set; }
        public string ParentPhone{ get; set; }
        public string FeePaid{ get; set; }
        public string StudentMobile{ get; set; }
        public string StudentEmail{ get; set; }
        public decimal ConcedingAmount { get; set; }
        public string ConcedingTypeName { get; set; }
        public string DueAmount { get; set; }
        public string Program { get; set; }
        public string Batch { get; set; }       
        public string Total { get; set; }
    }

    public class Fee_Due_Remainders_FeeStatus_ByIndividual 
    {
        public string InstanceName{ get; set; }
        public string ContactUs{ get; set; }
        public string PhoneNumber{ get; set; }
        public string Fax{ get; set; }
        public string PhoneExtension{ get; set; }
        public string Address{ get; set; }
        public string ClassificationName{ get; set; }
        public string SunClassificationName{ get; set; }
        public string InstanceUserCode{ get; set; }
        public string FirstName{ get; set; }
        public string Userfeeid{ get; set; }
        public string TermName{ get; set; }
        public string FeeTermId{ get; set; }
        public string FeeType { get; set; }
        public string FeeTypeId{ get; set; }
        public string ConcedingTypeId{ get; set; }
        public string AcademicYearId { get; set; }
        public string PayedAmount { get; set; }
        public string FeeAmount { get; set; }
        public string DiscountName { get; set; }
        public string ConcedingAmount { get; set; }
        public string DueAmount { get; set; }
        public string AmountTextBox { get; set; }
        public string DueDate { get; set; }
        public string LastPayedAmount { get; set; }
        public string ReceiptNo { get; set; }
        public string PaymentMode { get; set; }
        public string AcademicYear { get; set; }
        public string CreatedDate { get; set; }

    }



    public class RequestedDataModel
    {
        public string CollectedData { get; set; }
        public string Subject { get; set; }
    }
    public class CommunicationData
    {
        public List<string> studentMobileNumbers { get; set; }
        public List<string> parentMobileNumbers { get; set; }
        public List<string> studentEmails { get; set; }
        public List<string> parentEmails { get; set; }
    }


    public class DropdownLists
    {
        public List<SelectListItem> RoleList { get; set; }
        public List<SelectListItem> ClassificationList { get; set; }
        public List<SelectListItem> StudentQuotaList { get; set; }
        public List<SelectListItem> AcademicYearList { get; set; }
    }

}
