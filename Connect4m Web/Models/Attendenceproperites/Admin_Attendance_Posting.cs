using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class Facultynames
    {
        public string MentorName { get; set; }
        public string Qualification { get; set; }
        public string MobilePhone { get; set; }
        public string PortalEmail { get; set; }
        public string RoleName { get; set; }
        public string MentorUserid { get; set; }
        public string InstanceUserCode { get; set; }
    }
    public class AttendancePost:Commonproperties
    {
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Department is required")]
        public int InstanceClassificationId { get; set; }

        public string ClassificationName { get; set; }
        [Required(ErrorMessage = "Class is required")]
        public int InstanceSubClassificationId { get; set; }

        public string SubClassificationName { get; set; }

        [Required(ErrorMessage = "Slot is required")]
        public int SubjectSlotID { get; set; }
        public string SubjectSlotName { get; set; }
        
        [Required(ErrorMessage = "Period is required")]
        public int Period { get; set; }
        
        [Required(ErrorMessage = "Faculty is required")]
        public int MentorUserid { get; set; }
        public int FilterTeachingSubjects { get; set; }
        public string Radiovalue { get; set; }
        public string Checkboxvalue { get; set; }
        public string HolidayName { get; set; }
        public string RoleName { get; set; }
    }
    public class PostPeriodattendance :Commonproperties
    {
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Mentors is required")]
        public int MentorUserid { get; set; }

        [Display(Name = "Faculty")]
        public string Mentors { get; set; }

        [Required(ErrorMessage = "Periods is required")]
        public int Periods { get; set; }
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }
        public string Subject { get; set; }

        public string PeriodId { get; set; }
        public string PeriodName { get; set; }
        public string Returnvalue { get; set; }

        public int SubjectId { get; set; }
        public string SubjectTypeName { get; set; }
        public string InstanceSubclassificationId { get; set; }
        public string SubclassificationName { get; set; }
        public int bFlagForLab { get; set; }
        public string HolidayName { get; set; }

    }



    public class AttendancePosting
    {
        public DateTime StartDate { get; set; }

        [Required(ErrorMessage = "Department is required")]
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }        
        [Required(ErrorMessage = "Class is required")]
        public int InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }

        [Required(ErrorMessage = "Slot is required")]
        public int SubjectSlotID { get; set; }
        public string SubjectSlotName { get; set; }
        [Required(ErrorMessage = "Period is required")]
        public int Period { get; set; }
        [Required(ErrorMessage = "Faculty is required")]
        public int Faculty { get; set; }

        public String MentorName { get; set; }
        public String Qualification { get; set; }
        public String MobilePhone { get; set; }
        public String PortalEmail { get; set; }
        public String RoleName { get; set; }
        public String UserId { get; set; }
        public String InstanceUserCode { get; set; }


    }
    public class Facultydropdown 
    {
        public  string MentorUserid { get; set; }
        public  string MentorName{ get; set; }
    }

}
