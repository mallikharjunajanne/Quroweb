using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class Attendance_Summary
    {
        public string InstanceId { get; set; }
        [DisplayName("Department")]
        [Required(ErrorMessage = "Please Select Department")]
        public string ClassificationName { get; set; }


        [DisplayName("Class")]
        [Required(ErrorMessage = "Please Select Class")]
        public string SubClassificationName { get; set; }
        public string UserId { get; set; }
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
