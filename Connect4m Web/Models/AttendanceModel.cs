using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Net.Http;

namespace Connect4m_Web.Models
{
    //public class TextBoxValueModel
    //{
    //    public List<string> ParamStrings { get; set; }
    //}

   



    public class YourDataModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class SubjectEditValuesListModel : CommonClass
    {
        public List<SubjectModel> EditValuesList { get; set; }
        public List<Subjects> SubjectNamesList { get; set; }
        public List<Mentors> MentorsNamesList { get; set; }
        public List<SubjectModel> UsersNamesList { get; set; }
        public List<SubjectModel> SubjectAssociatedList { get; set; }

        public int InstanceSubjectId { get; set; }
        public int SubjectTypeId1 { get; set; }
        //  public string RoleName { get; set; }
        public string MentorRoles { get; set; }
    }
    public class Subjects
    {
        public string SubjectName { get; set; }
        public int SubjectId { get; set; }
    }

    public class CommonClass
    {
        public string ButtonId { get; set; }//new
        public int Id { get; set; }
        [Display(Name="User Role")]
        [Required(ErrorMessage = "The Role is Required")]
        public int RoleId { get; set; }
        public int CreatedBy { get; set; }
        public int InstanceID { get; set; }
        public int UserId { get; set; }
        [Required(ErrorMessage ="The Department is Required")]
        [Display(Name = "Department ")]
        public int InstanceClassificationId { get; set; }
        [Required(ErrorMessage ="The Class is Required")]
        [Display(Name = "Class")]
        public int InstanceSubClassificationId { get; set; }
        public string ScreenName { get; set; }
        
        public string Name { get; set; }
        public string ButtonName { get; set; }
        public string DisplayOrders { get; set; }
        //[Required(ErrorMessage = "The Admission Number is Required")]
        [Required]
        [Display(Name= "Admission Number")]
        public string AdmissionNumber { get; set; }
        [Required]
        [RegularExpression(@"^[a-zA-Z. ]+$", ErrorMessage = "Invalid First Name")]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        //[Required(ErrorMessage = "The Admission Number is Requireddsfs")]
        //[Display(Name = "First Name1")]
        //public string FirstName1_ { get; set; }
        [RegularExpression(@"^[a-zA-Z. ]+$", ErrorMessage = "Invalid Last Name")]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }
    }
    public class AttendanceModel
    {
        public List<int> List_UserId { get; set; }
        public List<string> List_LeaveNameandDayCount { get; set; }
        public string ScreenName { get; set; }
        public int LapsedId { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public int GenderId_Int { get; set; }
        public string ParamString_LeaveNameandDayCount { get; set; }
        public Dictionary<string,string> LeavetypeDaysDynamicDictionary { get; set; }
        public Dictionary<string,object> LeaveShortNamesDynamic { get; set; }
        public int DesignationId { get; set; }
        public string   GenderId { get; set; }
        public int IsleaveApplicable { get; set; }
        public int IsPayrollApplicable { get; set; }
        public int LeavesAllocated { get; set; }
        public string PayrollSubCategoryName { get; set; }
        public int PayrollSubCategoryId { get; set; }
        public string PayrollCategoryName { get; set; }
        public int PayrollCategoryId { get; set; }


        public string CurrentValueCreatedBy { get; set; }
        public string PreviousValueCreatedBy { get; set; }
        public string EditEligibleReturnValue { get; set; }
        public int AuditTrailId { get; set; }

        public string TableName { get; set; }
        public string CurrentValue { get; set; }
        public string PreviousValue { get; set; }

        public string AuditKey { get; set; }
        public string SourceId { get; set; }
        public bool Carryforward_bool { get; set; }
        public bool AllowPastDates_bool { get; set; }

        public string Description { get; set; }
        public string ShortName { get; set; }
        public string  Checkbox_ByChecked { get; set; }
        public string  TrRowId { get; set; }
        public int ConvertCount { get; set; }
        public string  SLCount { get; set; }
        public string  AcadamicYearId { get; set; }
        public int CreatedBy { get; set; }
        public int ConvertedCount { get; set; }
        public int Monthid { get; set; }
        public int InstanceRoleId { get; set; }
        public string FromTimeHrs { get; set; }
        public string ToTimeHrs { get; set; }
        public string FromTimeMin { get; set; }
        public string ToTimeMin { get; set; }
        public string  FromMonthName { get; set; }
        public int Cancelled { get; set; }
        public string TotalTime { get; set; }
        public string FromTime { get; set; }
        public string ToTime { get; set; }
        public int Batchid { get; set; }
        public int Userjoined { get; set; }
        public int InstanceID { get; set; }
       
        public int UserId { get; set; }
        
        public int InstanceClassificationId { get; set; }
      

        public int InstanceSubClassificationId { get; set; }
        

        public string ClassName { get; set; }
    

        public string ClassidString { get; set; }
        public int Classid { get; set; }
       

        public string StudentName { get; set; }
       
        public int Studentid { get; set; }
        
        public string Leavetype { get; set; }
      
        public int Leavetypeid { get; set; }
       
        public string AdmissionNumber { get; set; }
      
        public String AttendancePercentage { get; set; }

        //public double AttendancePercentage { get; set; }



        public string Daystype { get; set; }

        public DateTime Fromdate { get; set; }
       
        public DateTime Todate { get; set; }
       
        public string Leavecomments { get; set; }


        public string attachdocument { get; set; }

        //public IFormFile attachdocument { get; set; }


        public IFormFile file { get; set; }

        public int SatHolidy { get; set; }

        public int SunHolidy { get; set; }

        public string HolidayName { get; set; }

        public DateTime HolidayDate { get; set; }
        public DateTime LastAttendanceDate { get; set; }

        public string Slotname { get; set; }

        public int LeaveApplicationId { get; set; }

        public int AllowPastDaysLeaveType { get; set; }
        public int AllowPastDaysFlagUser { get; set; }
        public string Text { get; set; }

        public string Value { get; set; }




        public string Username { get; set; }
        public DateTime LeaveAppliedDate1 { get; set; }

        public string Approved_Regected_Date { get; set; }


        public int StudentLeaveDetailsID { get; set; }

        //==================Apply Student Leaves sql ado=======

        //---MY LEAVES DETAILS

        public int Carryforward { get; set; }

        public int AllowPastDates { get; set; }
        public string Leavetype1 { get; set; }

        public double TotalLeaves { get; set; }

        public double DaysUsed { get; set; }

        public double ApprovedNotUsedLeaves { get; set; }

        public double LeavesAwaitingApprovalLeaves { get; set; }

        public double AvailableLeaves { get; set; }


        //---MY SAVED LEAVES


        public string LeaveReason { get; set; }

        public string  LeaveFromdate { get; set; }

        public string  LeaveTodate { get; set; }

        public double LeaveNoOfDays { get; set; }

        public string LeaveStatus { get; set; }

        //---MY APPLIED LEAVES  
        public string LeaveAppliedDate { get; set; }

        public string LeaveNoOfDays1 { get; set; }

        //-------------APPLY LEAVE DETAILS


        public string LeaveCancelledFlag { get; set; }
        public string Leavetype2 { get; set; }
        public string ShortDescriptionforLeave_Reason { get; set; }

        public bool marriagechecking { get; set; }
        public int marriagechecking_Int { get; set; }


        public string marriagechecking_String { get; set; }
        public string Daysession { get; set; }

        public string Daysessionname { get; set; }
        public string Dayname { get; set; }

        public string RequestStatus { get; set; }

        public string deleteProp { get; set; }


        public string submitBStudentLeaveDetailsIDutton { get; set; }
        public string submitButton { get; set; }


        //====this is for 	ATTENDANCE DETAILS  in apply student leaves

        public double Totalpresents { get; set; }

        public double TotalAbsents { get; set; }

        public double PresentPercentage { get; set; }
        public double AbsentsPercentage { get; set; }

        //====this is for 	ATTENDANCE DETAILS   stp_tblStudentLeaveDetails_TotalByUserId  in apply student leaves

        public double Total { get; set; }

        public double Pending { get; set; }

        public double Approved { get; set; }
        public double Rejected { get; set; }



        //this are for mail details

        public string LeaveDetails { get; set; }
        public string EmailId { get; set; }
        public string FirstName { get; set; }
        public string Mobilephone { get; set; }
        public string NotifierEmail { get; set; }

        public string NotifierName { get; set; }

        public string LevelEmailIDs { get; set; }
        public string NotifierLeavedetails { get; set; }
        //----------------


        public DateTime CreatedDate { get; set; }

        public string Submittedby { get; set; }
        public string AssignedTo { get; set; }


        public string Comments { get; set; }

        public string Approvalstatus { get; set; }

        public string OverallRequestStatus { get; set; }



        //----print details in View status

        public string Department { get; set; }

        public string DateofJoin { get; set; }

        public string Submittedto { get; set; }

        public string InstanceName { get; set; }

        public string Address { get; set; }

        public int NextLevelUserID { get; set; }


    }
    public class FormDataModel
    {
        public DateTime  TogridDate { get; set; }

        public DateTime  FromgridDate { get; set; }

        public string TogridDate_Sting { get; set; }

        public string FromgridDate_String { get; set; }
        public string NotifierName { get; set; }
        public string Leavetypeid { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public int num { get; set; }
        public string file { get; set; }
    }


    //this of getting multiple list of apply staff leaves module
    public class RequestDataModel
    {
        public List<AttendanceModel> AttendanceModel_Data { get; set; }

        public List<FormDataModel> tableDataList_Data { get; set; }
    }


    //---------------Leavelevels

    public class LeaveLevelModel
    {
        public int LevelID { get; set; }
        public string LevelName { get; set; }
        public int InstanceId { get; set; }
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }
        public int ProgramType { get; set; }
     
        public string Department { get; set; }
        public string RoleName { get; set; }
        public string AppliedUserName { get; set; }
        public string ApproverUserName { get; set; }


        public string  AppliedUserId { get; set; }
        public string  ApproverUserId { get; set; }
        public int Userid { get; set; }
        public string FirstName { get; set; }
        public string InstanceUserCode { get; set; }
        public int InstanceRoleId { get; set; }

        public int InstanceDesignationId { get; set; }
        public int CreatedBy { get; set; }

        public int LeaveLevelId { get; set; }

        public string submitButton { get; set; }

    }


    public class StudentLeaveApprovalModel
    {

        public int InstanceId { get; set; }
        public int InstanceClassificationId { get; set; }

        public int InstanceSubClassificationId { get; set; }
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public int Userid { get; set; }

        public int Status { get; set; }
        public int Flag { get; set; }
        public int Tab { get; set; }
        public int Departmentid { get; set; }
        public int LeaveDetailsId { get; set; }
        public int Classid { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ParentName { get; set; }
        public string StudentName { get; set; }
        public int StudentId { get; set; }
        public string AdmissionNumber { get; set; }

        public string Name { get; set; }
        public string ClassandSectionName { get; set; }

        public string LeaveType { get; set; }
        public string Comments { get; set; }
        public string WaitingComments { get; set; }
        public string AttachedFileName { get; set; }
        public string LeaveAppliedBy { get; set; }
        public string LeaveAppliedByName { get; set; }
        //public Double NoOfDays { get; set; }
        public string NoOfDays { get; set; }
        public DateTime LeaveAppliedDate { get; set; }
        public DateTime Fromdate { get; set; }
        public DateTime Todate { get; set; }

        public int StudentLeaveDetailsID { get; set; }

        public string Username { get; set; }

        public string Approved_Regected_Date { get; set; }


        public string LeaveNoOfDays { get; set; }
        public string LeaveStatus { get; set; }
        //public Double NoOfDays { get; set; }
        public string Remarks { get; set; }
        public int Month { get; set; }
        public int AcademicYearId { get; set; }
        public int StudentUserId { get; set; }
        public string AttendanceType { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
        public int SanctionId { get; set; }
        public int SubjectSlotID { get; set; }
        public int CreatedBy { get; set; }
        public int AttendanceTypeId { get; set; }

        public string submitButtonName { get; set; }
        public int SatHoliday { get; set; }
        public int SunHoliday { get; set; }

        public string ApprovedBy { get; set; }
        public string RejectedBy { get; set; }
        public string ApprovedDate { get; set; }
        public string RejectedDate { get; set; }

        public String DisplayApprovalLink { get; set; }
    }


    public class StaffLeaveApprovalModel
    {

        public int InstanceId { get; set; }
        public int InstanceClassificationId { get; set; }


        public string ClassificationName { get; set; }

        public int Userid { get; set; }

        public int Status { get; set; }

        public int Departmentid { get; set; }


        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string StaffName { get; set; }
        public int StaffId { get; set; }


        public string Name { get; set; }


        public string LeaveType { get; set; }
        public string Comments { get; set; }
        public string WaitingComments { get; set; }
        public string AttachedFileName { get; set; }
        public string LeaveAppliedBy { get; set; }
        public string LeaveAppliedByName { get; set; }
        //public Double NoOfDays { get; set; }
        public string NoOfDays { get; set; }
        public string Reason { get; set; }
        public string RequestedDate { get; set; }
        public int DelegationFlag { get; set; }
        public int DelegationFrom { get; set; }
        public string TodateString { get; set; }
        public string FromdateString { get; set; }
        public DateTime Fromdate { get; set; }
        public DateTime Todate { get; set; }



        public string Username { get; set; }

        public string Approved_Regected_Date { get; set; }


        public string LeaveNoOfDays { get; set; }
        public string LeaveStatus { get; set; }
        //public Double NoOfDays { get; set; }

        public int StaffUserId { get; set; }
        public string AttendanceType { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }

        public int CreatedBy { get; set; }
        public int AttendanceTypeId { get; set; }

        public string submitButtonName { get; set; }
        public DateTime AttendanceDate { get; set; }

        public int SatHoliday { get; set; }
        public int SunHoliday { get; set; }

        public string ApprovedBy { get; set; }
        public string RejectedBy { get; set; }
        public string ApprovedDate { get; set; }
        public string RejectedDate { get; set; }



        public int LeaveApplicationId { get; set; }
        public string Daysession { get; set; }
        public int BatchId { get; set; }
        public int RoleID { get; set; }
        public int NextLevelUserID { get; set; }
        public string DelegationRecord { get; set; }

        public string NotifierEmail { get; set; }

        public string NotifierName { get; set; }

        public string LevelEmailIDs { get; set; }
        public string NotifierLeavedetails { get; set; }
        public string ApprovedRejectedProp { get; set; }
        public int InstanceSubClassificationId { get; set; }

        public string SubClassificationName { get; set; }
        public string ApprovalStatus { get; set; }
    }

    public class LeaveTypesModel
    {
        public int LeaveTypeId { get; set; }

        public string LeaveType { get; set; }

    }
    public class ConvertShortLeavesModel_ListValues
    {
        public List<AttendanceModel> AttendanceModel_Data { get; set; }

       // public List<AttendanceModel> _ViewChangeActivitiesList { get; set; }
        public List<LeaveTypesModel> Leavetypes_List { get; set; }
    }
    public class LeaveDelegationModel
    {
        public int LMSSubCategoryId { get; set; }
        public int LMSCategoryId { get; set; }
        public string  InstanceUserCode { get; set; }
        public string Mobilephone { get; set; }
        public string DateOfJoining { get; set; }


        public int DelegationFromUserId { get; set; }
        public int DelegationToUserId { get; set; }
        public string BtnName { get; set; }
        public int CreatedBy { get; set; }
        public int LeaveDelegationId { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string LastName { get; set; }
        public string PortalEmail { get; set; }
        public int DesignationId { get; set; }
        public string Designation { get; set; }
        public string Username { get; set; }
        public int InstanceSubClassificationId { get; set; }
        public int Userid { get; set; }
        public int InstanceID { get; set; }
        public int InstanceClassificationId { get; set; }

        public int InstanceDesignationId { get; set; }
        public int DelegationId { get; set; }



        public string FirstName { get; set; }
        public string DelegationFromUserName { get; set; }
        public string DelegationToUserName { get; set; }
        public string DepartmentName { get; set; }
        public DateTime Fromdate { get; set; }
        public DateTime Todate { get; set; }
    }

    public class ExaminationModel : CommonClass
    {
        public string ExamName { get; set; }
        public string AcademicYearId { get; set; }
        public string ExaternalExam { get; set; }
        public string Displayorder { get; set; }
        public int ExamForAcademics { get; set; }
    }

    public class SubjectModel : CommonClass
    {//New

        //this below for Bulk upload subjects
        public int bFlagMultipleSubjects { get; set; }
       // public string FirstName { get; set; }
        //public string LastName { get; set; }
        public string InstanceUserCode { get; set; }
        public string SubjectAssociationId { get; set; }
        [Required]
        public string SubjectName { get; set; }
        public string DepartmentName { get; set; }
        public string ClassName { get; set; }
        public string IncludeInTotalString { get; set; }
        public string MentorName { get; set; }
        //New 
        [Required(ErrorMessage="Please Upload a File")]
        public IFormFile SubjectExelFile { get; set; }



        public string UserIdString { get; set; }
        public int SubjectAssociated { get; set; }
        public int InstanceSubjectId { get; set; }

        public List<string> InstanceSubjectId_AvailableCheck { get; set; }
        public List<int> InstanceSubjectIdList { get; set; }
        [Required(ErrorMessage ="The Subject Type is Required")]
        public int SubjectTypeId1 { get; set; }

        [Required(ErrorMessage = "The IncludeInTotal is Required")]
        public int IncludeInTotal1 { get; set; }
        public string AttendanceRequired1 { get; set; }
        public string MentorIds1 { get; set; }
        public string TotalPeriods1 { get; set; }
        public int IsInternal1 { get; set; }
        public int DisplayOrder1 { get; set; }
        public string SubjectShortName1 { get; set; }
        public List<int> bFlag { get; set; }
        public string SubjectTypeName { get; set; }



        [Required(ErrorMessage = "The Subject Code is Required")]
        public string SubjectCode { get; set; }
        public List<string> SubjectCodeList { get; set; }
        public int ProgramType { get; set; }
        public List<int> SubjectTypeId { get; set; }

        public List<string> SubjectTypeIdString { get; set; }
        public List<string> UserIdList { get; set; }
        public List<int> IsInternal { get; set; }
        public List<int> InstanceSubClassificationIdList { get; set; }
        public List<int> InstanceClassificationIdList { get; set; }
        public List<int> IncludeInTotal { get; set; }

        public List<string> IncludeInTotalStringList { get; set; }
        public List<string> AttendanceRequired { get; set; }
        public List<string> MentorIds { get; set; }
        public List<string> TotalPeriods { get; set; }

        public List<int> DisplayOrder { get; set; }
        public List<string> SubjectShortName { get; set; }
        public List<string> SubjectNameList { get; set; }
    }

    public class SubClassifications
    {
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }
        public int ProgramType { get; set; }

        public int InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }
        public string DisplayOrder { get; set; }
        public string Startdate { get; set; }
        public string EndDate { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
    }
    public class Mentors
    {
        public string MentorName { get; set; }
        public string Qulification { get; set; }
        public int MentorUsertid { get; set; }
    }
    public class Subclassfications_MS
    {
        public List<SubClassifications> subclassfication { get; set; }
        public List<Mentors> mentors { get; set; }
        public List<SubjectModel> editlist { get; set; }

        public List<SubClassifications> SubjectTypes { get; set; }

        public string RoleName { get; set; }
        public int InstanceID { get; set; }
        public int InstanceClassificationId { get; set; }
       

    }


    public class Instance
    {
        public int InstanceId { get; set; }
        public int UserId { get; set; }
        [Display(Name = "Role")]
        [Required]
        public int RoleId { get; set; }
        public int CreatedBy { get; set; }
    }



    //----------------------------------------   Creating Class For CommonMethods of all

    //public class HttpClientFactory
    //{
    //    private readonly string _baseAddress;

    //    public HttpClientFactory(IConfiguration configuration)
    //    {
    //        _baseAddress = configuration["AppSettings:ApiBaseAddress"];
    //    }

    //    public HttpClient CreateClient()
    //    {
    //        var client = new HttpClient();
    //        client.BaseAddress = new Uri(_baseAddress);
    //        return client;
    //    }
    //}


    //-------------------------   Login Page Properites
    public class LoginModel : CommonClass
    {
        public bool RememberMe { get; set; }
        [Required]
        public string Username { get; set; }
        public string ThemeName { get; set; }
        public string Quote { get; set; }
        public string UserStatus { get; set; }
        public string Photo { get; set; }

        [Required]
        public string Password { get; set; }
        public string SubDomineName { get; set; }
        public string CHK { get; set; }
        public string IPAddress { get; set; }
        public string URL { get; set; }
        public int LoginAttempt { get; set; }
        public int LoginStatus { get; set; }
        public int InstanceMenuId { get; set; }
        public string ParentMenuId { get; set; }
        public int StudentUserid { get; set; }
        public string DisplayOrder { get; set; }
        public string MenuName { get; set; }
        public string ImageUrl { get; set; }
        public string MenuUrl { get; set; }
        public string DoubleLogin { get; set; }
        public int ThemeId { get; set; }
        public string RoleName { get; set; }

    }


    public class SidebarViewModel
    {
        public List<string> SidebarItems { get; set; }
        public string Username { get; set; }
    }

    public class LoginDetailsListModel
    {
        public List<LoginModel> pageorsubdomainList_Data { get; set; }
        public List<LoginModel> UserDetailsList { get; set; }
        public List<LoginModel> LoginUser { get; set; }
        public List<LoginModel> RoleMenuByRoleId { get; set; }
        public List<LoginModel> ThemesList { get; set; }

    }
}
