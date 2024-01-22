using Microsoft.AspNetCore.Http;
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

        public class Manageholidays: Insatnceids
        {           
  
            public int HolidayId { get; set; }
            [Required]
            public string HolidayName { get; set; }
            [Required]
            public string StartDate { get; set; }
            public string IsPosted { get; set; }
            [Required]
            public string EndDate { get; set; }
            public string NoofDays { get; set; }
            public string dateorder { get; set; }
            [Required]
            public string HolidayType { get; set; }

            [Required(ErrorMessage = "Please enter a valid date")]
            public DateTime? Sdate { get; set; }
            [Required(ErrorMessage = "Please enter a valid date")]
            public DateTime? Edate { get; set; }
            public int HType { get; set; }

            public int Year { get; set; }
            public string Month { get; set; }
            public int Type { get; set; }
            public int CountFlag { get; set; }


            public string[] RoleIds { get; set; }
            public string[] GroupIds { get; set; }
            public string[] ClassificationIds { get; set; }
            public string[] SubClassificationIds { get; set; }
            public int ForAll { get; set; }


        }

        public class ManageClassification : Insatnceids
        {
            public int InstanceClassificationId { get; set; }
            [Required]
            public string ClassificationName { get; set; }
            public string ClassificationDescription { get; set; }
            public string Description { get; set; }
            [Required]
            public DateTime? StartDate { get; set; }
            [Required]
            public DateTime? EndDate { get; set; }          
            public int ProgramTypeId { get; set; }
            public int AllowedDialougeCount { get; set; }      
           
        }

        public class ManageSubClassification : Insatnceids
        {
            [Required]
            public int InstanceSubclassificaitionId { get; set; }
            [Required]
            public int InstanceClassificationId { get; set; }
            [Required]
            public string SubClassificationName { get; set; }
            public string SubClassificationDescription { get; set; }
            public string ClassificationName { get; set; }           
            public string ClassTeacher { get; set; }
            public string ProgramType { get; set; }
            public string SubClassificationDescriptionWords { get; set; }
            public string DisplayOrder { get; set; }                      
            public string StartDate { get; set; }                      
            public string EndDate { get; set; }       
            [Required]
            public int ResultsModeID { get; set; }                      
            public string CoClassTeacher { get; set; }
            [Required]
            public int ClassTeacherId { get; set; }
            [Required]
            public int CoClassTeacherId { get; set; }
            public int IsActive { get; set; }
            [Required]
            public DateTime? AttendanceEndDate { get; set; }
            [Required]
            public DateTime? AttendanceEffectiveDate { get; set; }
            public List<ClassificationList> ClassificationList { get; set; }
            public List<Classteacher> ClassteacherList { get; set; }
            public List<CoClassteacher> CoClassteacherList { get; set; }   
        }

        public class Categorytypes
        {
            public int CategoryId { get; set; }
            public string CategoryName { get; set; }
            public string CategoryDescription { get; set; }         
            public int CategoryTypeId { get; set; }
            public int AssetTypeId { get; set; }         
        }

        public class BestPerformer : Insatnceids
        {
            public int PerformerId { get; set; }
            [Required]
            public string Title { get; set; }
            public string FirstName { get; set; }
            //public string UserId { get; set; }
            public string Description { get; set; }
            [Required]
            public string DisplayUntill { get; set; }
            public string IsEvent { get; set; }
            public string InstanceUserCode { get; set; }
            public string ClassificationName { get; set; }
            public string ClassificationHeader { get; set; }
            public string IsWelcomePage { get; set; }                     
            public string Eventphotos { get; set; }
            public DateTime? DisplayUntill_ { get; set; }

            public List<ClassificationList> ClassificationList { get; set; }
            public List<SubclassificationList> SubclassificationList { get; set; }
            public List<RoleList> RoleList { get; set; }
            public string LastName { get; set; }
            public string InstanceClassificationId { get; set; }
            public string InstanceSubClassificationId { get; set; }
        
            public string AdmissionNumber { get; set; }
          
            public string TcTaken { get; set; }
            public string RouteId { get; set; }
            public string StopId { get; set; }    
            public string UserName { get; set; }
            public string RoleName { get; set; }
            public string RoleID { get; set; }

            public string LabBatchId { get; set; }
            public string PortalEmail { get; set; }
            public string MobilePhone { get; set; }
            public string SearchDateType { get; set; }
            public string SearchEndDate { get; set; }
            public string SearchStartDate { get; set; }
            public string MotherLastName { get; set; }
            public string FatherLastName { get; set; }
            public string MotherFirstName { get; set; }
            public string FatherFirstName { get; set; }
            public string DesignationId { get; set; }
            public string IsActive { get; set; }
            public string Transport { get; set; }
            public string CollegeHostel { get; set; }
            public string Gender { get; set; }
            public string StudentQuota { get; set; }
            public string CollegeCode { get; set; }

            public IFormFile EventPhoto { get; set; }

        }

        public class Managequote : Insatnceids
        {
            public int QuoteId { get; set; }
            [Required]
            public string Quote { get; set; }
         
            public string DisplayDate { get; set; }
            [Required]
            public DateTime? DisplayDate_ { get; set; }
        }

        public class studentstaffleaves
        {
            public List<StudentleaveName> StudentleaveName { get; set; }
            public List<leaves> studentstaffleavescount { get; set; }
            public List<leavetypes> leavetypes { get; set; }
            public List<studentwithdrawal> studentwithdrawal { get; set; }
            public List<leavestatus> leavestatus { get; set; }
        }
        public class StudentleaveName
        {
            public string FirstName { get; set; }
            public string ClassificationName { get; set; }
            public string SubclassificationName { get; set; }
            public string AdmissionNumber { get; set; }
            public string PFirstName { get; set; }
            public string MobilePhone { get; set; }
            public string StaffLeave { get; set; }
            public string StudentLeave { get; set; }
        }

        public class leavestatus
        {
            public string LeaveType { get; set; }
            public string FromDate { get; set; }
            public string ToDate { get; set; }
            public string LeaveDays { get; set; }
            public string Status { get; set; }
        }
        public class leaves
        {
            public string Studentleaves { get; set; }
            public string Staffleaves { get; set; }

        }
        public class leavetypes
        {
            public int LeaveTypeId { get; set; }
            public string ShortName { get; set; }
            public string LeaveType { get; set; }
            public string ApplicableFor { get; set; }
            public string Total { get; set; }
            public string DaysUsed { get; set; }
            public string Approved { get; set; }
            public string InProcess { get; set; }
            public string Available { get; set; }
            public string AvailableLink { get; set; }
        }

        public class studentwithdrawal
        {
            public string UserId { get; set; }
            public string StudentWithdrawalID { get; set; }
            public string TCIssueDate { get; set; }
            public string FirstName { get; set; }
            public string ClassificationName { get; set; }
            public string SubclassificationName { get; set; }
        }
        public class EventsClander
        {
            public int EventId { get; set; }
            public string eventdate { get; set; }
            public string EventTitle { get; set; }
            public string EventDescription { get; set; }
            public string calendardate { get; set; }
            public string diff { get; set; }
        }

        public class Posted_Questions : StudentleaveName
        {
            public string AssignedTold { get; set; }
            public string InstanceQuestiondId { get; set; }
            public string Description { get; set; }
            public string DocumentName { get; set; }
            public string Question { get; set; }
            public string CreatedDate { get; set; }
        }

        public class CoolLinks : Insatnceids
        {
            public int CoollinkId { get; set; }
            public string LinkName { get; set; }
            public string LinkURL { get; set; }

            [Required(ErrorMessage = "Description")]            
            public string Description { get; set; }

        }

        public class Worksheetsdata 
        {
            public string Subject{ get; set; }
            public string ENoticeDescription{ get; set; }
            public string CategoryName{ get; set; }
            public string Createddate{ get; set; }
            public string Noticedate{ get; set; }
            public string Noticestartdate{ get; set; }
            
        }



        public class manageenotice
        {
            public int ENoticeId { get; set; }
            public string Subject { get; set; }
            public string CategoryName { get; set; }
            public string IsPosted { get; set; }
            public string StartDate { get; set; }
            public string ExpiryDate { get; set; }
            public string ExpiryDateSort { get; set; }
            public string IsSMSTemplate { get; set; }
            public string TemplateMasterFK { get; set; }
            public string IncludeParents { get; set; }
            public string SendSMS { get; set; }
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
          
            public DateTime StartDate { get; set; }
            public string IsPosted { get; set; }
            public string DisplayIcon { get; set; }


            public bool IsSMSTemplate { get; set; }
            public DateTime EndDate { get; set; }
            [Required]
            public int ENoticeTypeId { get; set; }
            public int IsGlobalNotice { get; set; }
            public int GetAll { get; set; }
            public string DocSize { get; set; }
            //public int DocSize { get; set; }//  property datatype change

            // ---->>Create Notice and SMS           
            public IFormFile AttachedDocument { get; set; }

            //---> Mails Related Properties
            public string SMSTextInXML { get; set; }
            public string Action { get; set; }
            public string SMSFromText { get; set; }
            [Required]
            public DateTime ExDate { get; set; }
            [Required]
            public DateTime SDate { get; set; }            
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
            [Required]
            public DateTime ExDate { get; set; }
            [Required]
            public DateTime SDate { get; set; }

            public DateTime? StartDate { get; set; }
            public DateTime? EndDate { get; set; }
            public string Subject { get; set; }
            public string ENoticeDescription { get; set; }
            public string NoticeDocument { get; set; }
            public string DocSize { get; set; }
            public int DisplayOrder { get; set; }
            public string DisplayIcon { get; set; }
            public string ShowInLogin { get; set; }
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
            public string DMLTYPE { get; set; }
            public int SendSMS { get; set; }
            public int SendEMail { get; set; }
            public int IncludeParents { get; set; }
            public int ForAll { get; set; }
            public string NotificationSubject { get; set; }
            public string RoleName { get; set; }
            public string MobilePhone { get; set; }
            public DateTime? NotifcationDate { get; set; }
            public int IsParent { get; set; }
            //---Mail related Parameters
            public string SMSTextInXML { get; set; }
            public string SMSFromText { get; set; }
            public string Action { get; set; }

            public string[] RoleIds { get; set; }
            public string[] GroupIds { get; set; }
            public string[] ClassificationIds { get; set; }
            public string[] SubClassificationIds { get; set; }
            public string[] UserIds { get; set; }

            public List<RoleList> IRoleList { get; set; }
            public List<RoleList> roleList_byInstanceId { get; set; }
            public List<GroupList> GroupList { get; set; }
            public List<ClassificationList> ClassificationList { get; set; }
            public List<SubclassificationList> SubclassificationList { get; set; }
            public List<RouteList> RouteList { get; set; }
            public List<List<HolidaytargetTbl>> HolidayTargetTbl { get; set; }
            public List<List<ENoticetargetTbl>> ENoticeTargetTbl { get; set; }

     //====>> Api Properties and web properties  comparing           
            //public string StartDate { get; set; }          
            //public IFormFile AttachedDocument { get; set; }
         

        }

        public class SmsSendingResult
        {
            public List<TemplateDetails_SMS> PushNotifications_Notices { get; set; }
            public List<TemplateDetails_SMS> tblENotice_GetTargetUsers { get; set; }
            public string Printmessages { get; set; }
            public string Message1 { get; set; }
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
        public class Classteacher
        {
            public int UserId { get; set; }
            public string UserName { get; set; }
        }
        public class CoClassteacher
        {     
            public int UserId_CO { get; set; }
            public string UserName_CO { get; set; }
        }
        public class HolidaytargetTbl
        {          
            public string HolidayTargetId { get; set; }
            public string HolidayId { get; set; }
            public string Value { get; set; }
            public string AuthTypeId { get; set; }
            public string ForAll { get; set; }

        }
        public class ENoticetargetTbl
        {
            public string ENoticeTargetId { get; set; }
            //public string InstanceId { get; set; }
            //public string ENoticeId { get; set; }
            public string ForAll_ { get; set; }
            public string Value { get; set; }
            public string AuthTypeId { get; set; }

        }

        public class Multipuleusers
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

        public class BirthdaysByInstance
        {
            public string DOB { get; set; }
            //public string InstanceId { get; set; }
            //public string ENoticeId { get; set; }
            public string Dateofbirth { get; set; }
            public string FirstName { get; set; }
            public string Photo { get; set; }
            public string UserId { get; set; }
            public string Class { get; set; }
            public string InstanceId { get; set; }
            public string RoleName { get; set; }

        }


    }
}
