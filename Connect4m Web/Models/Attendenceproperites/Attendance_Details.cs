
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
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        
        [Required(ErrorMessage = "Department is required")]
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }
       
        [Required(ErrorMessage = "Class is required")]
        public int InstanceSubclassificaitionId { get; set; }
        public string SubClassificationName { get; set; }
        public string UserId { get; set; }
        [Required(ErrorMessage = "Student is required")]
        public int Studentuserid { get; set; }
        public string FirstName { get; set; }
        
        [Required(ErrorMessage = "Slots is required")]
        public int SubjectSlotID { get; set; }
        public string SubjectName { get; set; }
        [Required(ErrorMessage = "Display only for is required")]
        public string bFlagForDisplay { get; set; } 
        public int InstanceSubjectId { get; set; }
        public string[] SlotSubjectsNames { get; set; }
        public string SubjectSlotName { get; set; }
        public string Mentors { get; set; }
        public string IsPresent { get; set; }
        public string CreatedDate { get; set; }
        public string Present { get; set; }
        public string AttendanceRequired { get; set; }
        public string PeriodId { get; set; }
    }
   
    public class detailsattendance:InstanceCommonproperties
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


   public class Studentattendancedetails:InstanceCommonproperties
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; } 
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
