using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class UserScreen
    {
        public class Insatnceids
        {
            public int InstanceId { get; set; }
            public int UserId { get; set; }
            public int CreatedBy { get; set; }
        }

        public class CoolLinks : Insatnceids
        {
            public int CoollinkId { get; set; }
            public string LinkName { get; set; }
            public string LinkURL { get; set; }

            [Required(ErrorMessage = "Description")]            
            public string Description { get; set; }

        }
      
        public class ENoticeByNoticeType : Insatnceids
        {
            public int CategoryId { get; set; }
            public string CategoryName { get; set; }
            public string CategoryDescription { get; set; }
            //public int CategoryTypeId { get; set; }
            public int CategoryTypeId { get; set; }
            public int AssetTypeId { get; set; }

            public bool  IsSMSTemplate { get; set; }
            public string Subject { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public int ENoticeTypeId { get; set; }
            public int IsGlobalNotice { get; set; }
            public int GetAll { get; set; }

        }
        public class NoticeTypes:Insatnceids
        {
            public int DisplayOrder { get; set; }
            public int ENoticeId { get; set; }
            [Required(ErrorMessage = "Notice Type")]
            public string Subject { get; set; }
            public string ENoticeDescription { get; set; }
            public string NoticeDocument { get; set; }
            public string ShowInLogin { get; set; }
            public string createddate { get; set; }

            public string CategoryName { get; set; }
            public string IsPostedv { get; set; }
            public string ExpiryDate { get; set; }
            public string StartDate { get; set; }
            public string IsPosted { get; set; }
            public string DisplayIcon { get; set; }


            public bool IsSMSTemplate { get; set; }            
            public DateTime EndDate { get; set; }
            public int ENoticeTypeId { get; set; }
            public int IsGlobalNotice { get; set; }
            public int GetAll { get; set; }
            public string DocSize { get; set; }

        }

        public class TemplateDetails : NoticeTypes
        {
            public int TemplateMasterPK { get; set; }
            public string TemplateDescription { get; set; }
            public int NumberofParameter { get; set; }
            public string AttributeName { get; set; }
            public string AttributeType { get; set; }
            public string length { get; set; }


            public TemplateDetails_SMS SmsDetails{get; set;}
        }

        public class TemplateDetails_SMS:Insatnceids
        {
            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public string Subject { get; set; }
            public string ENoticeDescription { get; set; }
            public string NoticeDocument { get; set; }
            public string DocSize { get; set; }
            public int DisplayOrder { get; set; }
            public string DisplayIcon { get; set; }
            public int ShowInLogin { get; set; }
            public int IsGlobalNotice { get; set; }
            public int ENoticeTypeId { get; set; }
       
            public int ENoticeId { get; set; }       
            public string createddate { get; set; }
            public string CategoryName { get; set; }
            public string IsPostedv { get; set; }
            public string ExpiryDate { get; set; }     
            public string IsPosted { get; set; }  
            public bool IsSMSTemplate { get; set; }  
            public int GetAll { get; set; }




            public List<RoleList> IRoleList { get; set; }
            public List<RoleList> roleList_byInstanceId { get; set; }
            public List<GroupList> GroupList { get; set; }
            public List<ClassificationList> ClassificationList { get; set; }
            public List<SubclassificationList> SubclassificationList { get; set; }
            public List<RouteList> RouteList { get; set; }


         

            public string UserName { get; set; }
            public int RoleId { get; set; }
            public string InstanceRoleId { get; set; }
            public string InstanceUserCodes { get; set; }
            public string PortalEmail { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int InstanceClassificationId { get; set; }
            public int InstanceSubClassificationId { get; set; }
            public string RouteId { get; set; }
            public int CollegeHostel { get; set; }
            public string MultiAdmissionNumber { get; set; }
            public string ExcludeUserIds { get; set; }





          
            //public string InstanceUserCode { get; set; }
           
       
            //public string FatherName { get; set; }
            //public string ClassificationName { get; set; }
            //public string AdmissionNumber { get; set; }
            //public string SubClassificationName { get; set; }
            //public string StaffMobilePhone { get; set; }
            //public string RoleName { get; set; }      

        }

        public class RoleList
        {
            public int InstanceRoleId { get; set; }
            public string RoleName { get; set; }
            public string RoleDescription { get; set; }
            public string FolderMemorySize { get; set; }
            public string InboxMemorySize { get; set; }
            public string BookingLimit { get; set; }
        }
        public class GroupList
        {
            public int GroupId { get; set; }
            public string GroupName { get; set; }
        }
        public class ClassificationList
        {
            public int InstanceClassificationId { get; set; }
            public string ClassificationName { get; set; }
            public int ProgramType { get; set; }
        }
        public class SubclassificationList
        {
            public int InstanceSubClassificationId { get; set; }
            public string SubClassificationName { get; set; }
            public string DisplayOrder { get; set; }
            public string EndDate { get; set; }
            public string Startdate { get; set; }
        }
        public class RouteList
        {
            public int RouteId { get; set; }
            public string RouteName { get; set; }
        }

        public class Srekanth
        {
            public string Userids { get; set; }
        }

        public class Postnoticetabledate :Insatnceids
        {
            public string UserName { get; set; }
            public int RoleId { get; set; }
            public string InstanceUserCode { get; set; }
            public int InstanceUserCodes { get; set; }
            public string PortalEmail { get; set; }
            public string FirstName { get; set; }
            public string FatherName { get; set; }
            public string ClassificationName { get; set; }
            public string AdmissionNumber { get; set; }
            public string SubClassificationName { get; set; }
            public string StaffMobilePhone { get; set; }
            public string RoleName { get; set; }
            public string LastName { get; set; }
            public int InstanceClassificationId { get; set; }
            public int InstanceSubClassificationId { get; set; }
            public string RouteId { get; set; }
            public int CollegeHostel { get; set; }
            public string MultiAdmissionNumber { get; set; }
            public string ExcludeUserIds { get; set; }
          
        }


    }
}
