using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class AttendancePosting   //Admin_Attendance_Posting
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
