using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace Connect4m_Web.Models.Attendenceproperites
{
    public class PostAttendance
    {
        public string InstanceId { get; set; }

        [DisplayName("Start Date")]
        [DefaultValue(typeof(DateTime), "2023-01-01")]
        [Required(ErrorMessage = "Please Select Start Date")]
        public DateTime StartDate { get; set; }


        [DisplayName("End Date")]
        [Required(ErrorMessage = "Please Select End Date")]
        public DateTime EndDate { get; set; }

        public string InstanceClassificationId { get; set; }


        [DisplayName("Department")]
        [Required(ErrorMessage = "Please Select Department")]
        public string ClassificationName { get; set; }



        [DisplayName("Class")]
        [Required(ErrorMessage = "Please Select Class")]
        public string SubClassificationName { get; set; }

        public string InstancesubjectId { get; set; }

        [DisplayName("Slot")]
        [Required(ErrorMessage = "Please Select Slot Name")]
        public string SubjectName { get; set; }
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
        public string ParentEmail { get;  set; }
        public string  StudEmail { get;  set; }
        public string ParentExists { get; set; }
        public string LastDateofAttendance { get; set; }

        public string SlotName { get; set; }
        public string SlotId { get; set; }
        public string AttendanceId1 { get; set; }
        public string UserId { get; set; }
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



        public string ErrorMessages { get; set; }



        public string CreatedBy { get; set; }


        //Teacher Login 
        public int INSTANCECLASSIFICATIONID { get; set; }
        public string CLASSIFICATIONNAME { get; set; }
        //public int InstanceSubClassificationId { get; set; }
        //public string SubClassificationName { get; set; }



        public string Ispresent { get; set; }
        public string Name { get; set; }
        public string dateValue { get; set; }
        public string Dropdownvalue { get; set; }
        public string comment { get; set; }
        public string SubjectSlotID { get; set; }

    }

    public class T_PostAttendance
    {
        //Teacher Login 
        public int INSTANCECLASSIFICATIONID { get; set; }
        public string CLASSIFICATIONNAME { get; set; }
        public int InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }
    }
}
