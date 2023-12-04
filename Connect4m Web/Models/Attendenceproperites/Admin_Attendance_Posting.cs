using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class Admin_Attendance_Posting
    {
        public DateTime StartDate { get; set; }


        public string InstanceClassificationId { get; set; }

        [DisplayName("Department")]
        [Required(ErrorMessage = "Please Select Department")]
        public string ClassificationName { get; set; }

     
        public string InstanceSubClassificationId { get; set; }

        [DisplayName("Class")]
        [Required(ErrorMessage = "Please Select Class")]
        public string SubClassificationName { get; set; }

        public string SubjectSlotName { get; set; }

        public string SubjectSlotID { get; set; }

        public String MentorName { get; set; }
        public String Qualification { get; set; }
        public String MobilePhone { get; set; }
        public String PortalEmail { get; set; }
        public String RoleName { get; set; }
        public String UserId { get; set; }
        public String InstanceUserCode { get; set; }
        public String Period { get; set; }

    }
}
