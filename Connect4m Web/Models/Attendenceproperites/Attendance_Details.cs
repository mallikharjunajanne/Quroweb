
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class InstanceCommonproperties
    {
        public int InstanceId { get; set; }
        public int UserId { get; set; }
        public int CreatedBy { get; set; }
    }

    public class Attendance_Details
    {

    }

   //public class Studentattendancedetails:InstanceCommonproperties
    public class Studentattendancedetails: Commonproperties
    {
        [Required(ErrorMessage = "Start Date is required")]
        public DateTime? StartDate { get; set; }

        [Required(ErrorMessage = "End Date is required")]
        public DateTime? EndDate { get; set; } 
        public int Month { get; set; }  
        public int SubjectSlotID { get; set; }
        public string SubjectName { get; set; }         
    }
    public class StudentDetailsforattedance : Commonproperties
    {
        public string[] SlotSubjectsNames { get; set; }       
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public string SubjectSlotName { get; set; }
        public string Mentors { get; set; }
        public string IsPresent { get; set; }
        public string CreatedDate { get; set; }
        public string Present { get; set; }
        public string AttendanceRequired { get; set; }
        public string PeriodId { get; set; }
    }

    public class studentsummary : InstanceCommonproperties
    {
        public int AcademicYear { get; set; }
       
    }
}
