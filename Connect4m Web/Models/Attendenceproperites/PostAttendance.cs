using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace Connect4m_Web.Models.Attendenceproperites
{
    public class Commonproperties
    {
        public int InstanceId { get; set; }
        public int UserId { get; set; }
        public int CreatedBy { get; set; }
    }

    public class PostAttendance : Commonproperties
    {

        [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; }


        [Required(ErrorMessage = "End date is required")]
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "Department is required")]
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }

        [Required(ErrorMessage = "Class is required")]
        public int InstanceSubclassificaitionId { get; set; }

        public string SubClassificationName { get; set; }

        [Required(ErrorMessage = "Subject is required")]
        public int InstancesubjectId { get; set; }
        public string SubjectName { get; set; }
        public int FilterTeachingSubjects { get; set; }
        public string FirstName { get; set; }
        public string AdmissionNumber { get; set; }
        public string StudentSMS { get; set; }
        public string ParentSMS { get; set; }
        public string ParentPhNo { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
        public string InstanceUserCode { get; set; }
        public string IS_UserJoined { get; set; }
        public string CollegeHostel { get; set; }
        public string UserName { get; set; }
        public string ParentName { get; set; }
        public string ParentEmail { get; set; }
        public string StudEmail { get; set; }
        public string ParentExists { get; set; }
        public string LastDateofAttendance { get; set; }
        public string SlotName { get; set; }
        public string SlotId { get; set; }
        public string AttendanceId1 { get; set; }
        public int AttendanceTypeId { get; set; }
        public string AttendanceTypeDescription { get; set; }
        public string column1 { get; set; }
        public string DisplayIcon1 { get; set; }
        public string SplAttenanceComments1 { get; set; }
        public string LastDateofAttendance1 { get; set; }
        public string column2 { get; set; }
        public string DisplayIcon2 { get; set; }
        public string SplAttenanceComments2 { get; set; }
        public string LastDateofAttendance2 { get; set; }
        public string column3 { get; set; }
        public string DisplayIcon3 { get; set; }
        public string SplAttenanceComments3 { get; set; }
        public string LastDateofAttendance3 { get; set; }
        public string column4 { get; set; }
        public string DisplayIcon4 { get; set; }
        public string SplAttenanceComments4 { get; set; }
        public string LastDateofAttendance4 { get; set; }
        public string column5 { get; set; }
        public string DisplayIcon5 { get; set; }
        public string SplAttenanceComments5 { get; set; }
        public string LastDateofAttendance5 { get; set; }
        public string column6 { get; set; }
        public string DisplayIcon6 { get; set; }
        public string SplAttenanceComments6 { get; set; }
        public string LastDateofAttendance6 { get; set; }
        public string column7 { get; set; }
        public string DisplayIcon7 { get; set; }
        public string SplAttenanceComments7 { get; set; }
        public string LastDateofAttendance7 { get; set; }
        public string Ispresent { get; set; }
        public string Name { get; set; }
        public string dateValue { get; set; }
        public string Dropdownvalue { get; set; }
        public string comment { get; set; }
        public string SubjectSlotID { get; set; }
        public string ErrorMessages { get; set; }

        public string ParentId { get; set; }
    }



    #region
    public class Attendanceposting
    {
        //public int Studentuserid { get; set; }
        //public string ParentPhNo { get; set; }
        //public string studentName { get; set; }
        //public string InstanceUserCode { get; set; }
        //public string StudentSMS { get; set; }
        //public string ParentSMS { get; set; }
        //public int SubjectSlotID { get; set; }
        //public string attendancedate { get; set; }
        //public string isPresentValue { get; set; }
        //public string dropdownValue { get; set; }
        //public string dropdowntext { get; set; }
        //public string Comments { get; set; }
        //public string ParentId { get; set; }
        //public string ParentName { get; set; }
        //public string NotificationSubject { get; set; }
        //public string StudEmail { get; set; }
        //public string ParentEmail { get; set; }
        //public int NoticeTypeId { get; set; }
        // public List<string> attendancedetails { get; set; }
        public string Studentuserid { get; set; }
        public string ParentPhNo { get; set; }
        public string studentName { get; set; }
        public string InstanceUserCode { get; set; }
        public string StudentSMS { get; set; }
        public string ParentSMS { get; set; }
        public int InstanceId { get; set; }
        public int CreatedBy { get; set; }
        public int SubjectSlotID { get; set; }
        public List<AttendanceDetail> attendancedetails { get; set; }

        public int NoticeTypeId { get; set; }
        public string NotificationSubject { get; set; }
        public string  StudEmail{ get; set; }
        public string ParentEmail { get; set; }
        public string DataList { get; set; }

    }
    public class AttendanceDetail
    {
        public string attendancedate { get; set; }
        public string isPresentValue { get; set; }
        public string dropdownValue { get; set; }
        public string textareaValue { get; set; }
        public string ParentId { get; set; }
        public string ParentName { get; set; }
        public string Comments { get; set; }
        public string dropdowntext { get; set; }
        public string Lastdayofattendace { get; set; }
    }

    #endregion

    public class Attendancepost:Commonproperties
    {
        [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; }


        [Required(ErrorMessage = "End date is required")]
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "Department is required")]
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }

        [Required(ErrorMessage = "Class is required")]
        public int InstanceSubclassificaitionId { get; set; }
        public string SubClassificationName { get; set; }

        [Required(ErrorMessage = "Subject is required")]
        public int InstancesubjectId { get; set; }
        public string SubjectName { get; set; }
        public string ColumnString { get; set; }
        public string DateString { get; set; }
        public int SunHolidy { get; set; }
        public int SatHolidy { get; set; }
        public bool ShowChangeActivity { get; set; }
    }
    public class GetAttendancelist
    {
        public string AttendanceValidateornotretunmessage { get; set; }
        public List<Getattendancedetails> getattendancedetails { get; set; }
        public List<GetholidaystoStopPostingAttenance> holidaysnames { get; set; }
        public List<DateTime> Dates { get; set; }
        public GetAttendancelist()
        {
            Dates = new List<DateTime>();
        }
    }
    public class Getattendancedetails
    {

        public int Studentuserid { get; set; }
        public string FirstName { get; set; }
        public string StudentPhNo { get; set; }
        public string InstanceUserCode { get; set; }
        public string AdmissionNumber { get; set; }
        public string IS_UserJoined { get; set; }

        public string StudentSMS { get; set; }
        public string StudEmail { get; set; }
        public string CollegeHostel { get; set; }
        public string ParentName { get; set; }
        public string ParentPhNo { get; set; }
        public string ParentEmail { get; set; }
        public string UserName { get; set; }
        public string ParentSMS { get; set; }
        public string ParentExists { get; set; }
        public string InstanceUserCodeSorting { get; set; }
        public string AdmissionNumberSorting { get; set; }
        public string LastDateofAttendance { get; set; }
        public string column1 { get; set; }
        public string DisplayIcon1 { get; set; }
        public string AttendanceId1 { get; set; }
        public string SplAttenanceComments1 { get; set; }
        public string LastDateofAttendance1 { get; set; }

        public string column2 { get; set; }
        public string DisplayIcon2 { get; set; }
        public string AttendanceId2 { get; set; }
        public string SplAttenanceComments2 { get; set; }
        public string LastDateofAttendance2 { get; set; }
        public string column3 { get; set; }
        public string DisplayIcon3 { get; set; }
        public string AttendanceId3 { get; set; }
        public string SplAttenanceComments3 { get; set; }
        public string LastDateofAttendance3 { get; set; }
        public string column4 { get; set; }
        public string DisplayIcon4 { get; set; }
        public string AttendanceId4 { get; set; }
        public string SplAttenanceComments4 { get; set; }
        public string LastDateofAttendance4 { get; set; }
        public string column5 { get; set; }
        public string DisplayIcon5 { get; set; }
        public string AttendanceId5 { get; set; }
        public string SplAttenanceComments5 { get; set; }
        public string LastDateofAttendance5 { get; set; }
        public string column6 { get; set; }
        public string DisplayIcon6 { get; set; }
        public string AttendanceId6 { get; set; }
        public string SplAttenanceComments6 { get; set; }
        public string LastDateofAttendance6 { get; set; }
        public string column7 { get; set; }
        public string DisplayIcon7 { get; set; }
        public string AttendanceId7 { get; set; }
        public string SplAttenanceComments7 { get; set; }
        public string LastDateofAttendance7 { get; set; }

        public string TooltipString { get; set; }
        public string Transport { get; set; }
        public string RouteId { get; set; }
        public string StopId { get; set; }
        public string DropRouteId { get; set; }
        public string DropStopId { get; set; }
        public string ParentId { get; set; }
        //public int Studentuserid { get; set; }
        //public int InstanceSubclassificaitionId { get; set; }
        //public int InstancesubjectId { get; set; }
        //public string SubjectName { get; set; }
        //public int AttendanceTypeId { get; set; }
        //public string AttendanceTypeDescription { get; set; }
        //public DateTime StartDate { get; set; }
        //public DateTime EndDate { get; set; }
        ////public string InstanceClassificationId { get; set; }
        //public int InstanceClassificationId { get; set; }

        //public string ClassificationName { get; set; }
        //public int InstanceSubClassificationId { get; set; }
        ////public string InstanceSubClassificationId { get; set; }

        //public string SubClassificationName { get; set; }
        //public string FilterTeachingSubjects { get; set; }
        //public string ColumnString { get; set; }
        //public string DateString { get; set; }
        //public string SubjectSlotID { get; set; }
        //public string Text { get; set; }
        //public string Value { get; set; }


        //public string SlotName { get; set; }
        //public string SlotId { get; set; }
        //public string AttendanceId1 { get; set; }
        //public string FirstName { get; internal set; }
        //public string AdmissionNumber { get; internal set; }
        //public string StudentSMS { get; internal set; }
        //public string ParentSMS { get; internal set; }
        //public string ParentPhNo { get; internal set; }
        //public string ParentEmail { get; internal set; }
        //public string StudEmail { get; internal set; }
        //public string StudentPhNo { get; internal set; }
        //public string InstanceUserCode { get; internal set; }
        //public string IS_UserJoined { get; internal set; }
        //public string CollegeHostel { get; internal set; }
        //public string UserName { get; internal set; }
        //public string ParentName { get; internal set; }
        //public string ParentExists { get; internal set; }
        //public string LastDateofAttendance { get; internal set; }
        //public string IsParent { get; set; }
        //public DateTime NotifcationDate { get; set; }
        //public string NotificationSubject { get; set; }
        //public int NoticeCategoryId { get; set; }

        //public string NoticeCategoryName { get; set; }
        //public string NotificationMessage { get; set; }
        //public string ErrorMessages { get; set; }
        //public string column1 { get; set; }
        //public string DisplayIcon1 { get; set; }
        //public string SplAttenanceComments1 { get; set; }
        //public string LastDateofAttendance1 { get; set; }
        //public string column2 { get; set; }
        //public string DisplayIcon2 { get; set; }
        //public string SplAttenanceComments2 { get; set; }
        //public string LastDateofAttendance2 { get; set; }
        //public string column3 { get; set; }
        //public string DisplayIcon3 { get; set; }
        //public string SplAttenanceComments3 { get; set; }
        //public string LastDateofAttendance3 { get; set; }
        //public string column4 { get; set; }
        //public string DisplayIcon4 { get; set; }
        //public string SplAttenanceComments4 { get; set; }
        //public string LastDateofAttendance4 { get; set; }
        //public string column5 { get; set; }
        //public string DisplayIcon5 { get; set; }
        //public string SplAttenanceComments5 { get; set; }
        //public string LastDateofAttendance5 { get; set; }
        //public string column6 { get; set; }
        //public string DisplayIcon6 { get; set; }
        //public string SplAttenanceComments6 { get; set; }
        //public string LastDateofAttendance6 { get; set; }
        //public string column7 { get; set; }
        //public string DisplayIcon7 { get; set; }
        //public string SplAttenanceComments7 { get; set; }
        //public string LastDateofAttendance7 { get; set; }
    }
    public class Teacherportalattendanceclassification //T_PostAttendance
    {
        public int INSTANCECLASSIFICATIONID { get; set; }
        public string CLASSIFICATIONNAME { get; set; }
        public int InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }
    }
    public class GetholidaystoStopPostingAttenance
    {
        public string HolidayName { get; set; }
        public DateTime HolidayDate { get; set; }
    }
    public class Changeactivity
    {
        public string AuditKey { get; set; }
        public int SourceId { get; set; }
        public string TableName { get; set; }
    }
    public class Changeactivitytbl 
    {
        public string AuditTrailId { get; set; }
        public string AuditKey { get; set; }
        public string CurrentValue { get; set; }
        public string PreviousValue { get; set; }
        public string PreviousValueCreatedBy { get; set; }
        public string CurrentValueCreatedBy { get; set; }
        public string CurrentValuecreateddate { get; set; }
        public string Errormessage { get; set; }
    }


    #region   ATTENDANCE DETAILS 
    public class detailsattendance:Commonproperties
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "Department is required")]
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }

        [Required(ErrorMessage = "Class is required")]
        public int InstanceSubclassificaitionId { get; set; }
        public string SubClassificationName { get; set; }
        [Required(ErrorMessage = "Student is required")]
        public int Studentuserid { get; set; }
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Slots is required")]
        public int SubjectSlotID { get; set; }
        public string SubjectName { get; set; }
        [Required(ErrorMessage = "Display only for is required")]
        public int bFlagForDisplay { get; set; }
    }
    public class Detailsforattedance:Commonproperties
    {
        public string[] SlotSubjectsNames { get; set; }
        public string SubjectSlotName { get; set; }
        public string Mentors { get; set; }
        public string IsPresent { get; set; }
        public string CreatedDate { get; set; }
        public string Present { get; set; }
        public string AttendanceRequired { get; set; }
        public string PeriodId { get; set; }
    }
    #endregion

    #region ATTENDANCE SUMMARY
    public class Attendance_Summary:Commonproperties
    {
        [Required(ErrorMessage = "Department is required")]
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }

        [Required(ErrorMessage = "Class is required")]
        public int InstanceSubclassificaitionId { get; set; }
        public string SubClassificationName { get; set; }

        [Required(ErrorMessage = "Student is required")]
        public int Studentuserid { get; set; }
        public string FirstName { get; set; }
        public string InstanceUserCode { get; set; }
        public DateTime AttendanceEffectiveDate { get; set; }
        public DateTime DateofJoining { get; set; }
        public string UserJoined { get; set; }
        public string AdmissionNumber { get; set; }
        public string SubjectSlotName { get; set; }
        public string Mentors { get; set; }
        public string TotalClasses { get; set; }
        public string TotalPresent { get; set; }
        public string AttendancePercentage { get; set; }
        public string AttendanceRequiredPercent { get; set; }
        public string TotalAbsent { get; set; }
        public string OnDuty { get; set; }
        public string LastName { get; set; }
    }
    #endregion

}
