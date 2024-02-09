using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class SummaryCommonproperties
    {
        public int InstanceId { get; set; }
        public int UserId { get; set; }
        public int CreatedBy { get; set; }
    }
    public class Attendance_Summary: SummaryCommonproperties
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
}
