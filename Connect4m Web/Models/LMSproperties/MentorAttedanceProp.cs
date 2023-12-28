using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class MentorAttedanceProp:Instance

    {
        
            public int InstanceRoleId { get; set; }
          //  public int InstanceId { get; set; }

            [Display(Name = "Start Date")]
            [Required]
           [DataType(DataType.Date)]
           public DateTime  StartDate { get; set; }
          [Display(Name = "End Date")]
            [Required]
           [DataType(DataType.Date)]
            public DateTime EndDate { get; set; }

         [Display(Name = "Department")]
            [Required]
            public string Department { get; set; }
            [Display(Name = "Slots")]
            [Required]

            public string Slots { get; set; }
          
            [Display(Name = "Mentors ")]
            public List<string> Mentors { get; set; }
        public string RoleName { get; set; }




    }


    public class MentorAttedancePropList
    {
        public List<string> UserIdlist { get; set; }
        public List<string> Firstname { get; set; }
        public List<string> StudentPhno { get; set; }
        public List<string> InstanceUserId { get; set; }
        public List<string> UserName { get; set; }
        public List<string> StudentSMS { get; set; }
        public List<string> StudentEmail { get; set; }


        public List<string> Columns { get; set; }
        public List<string> DisplayIcons { get; set; }
        public List<string> AttendanceIds { get; set; }
        public List<string> LatebyMinss { get; set; }
        public List<string> CheckinTimes { get; set; }
        public List<string> EveryLeavingbyMinss { get; set; }
        public List<string> CheckOutTimes { get; set; }



    }

    public class MentorAttendancePosting : Instance
    {
     
        public string SubjectSlotID { get; set; }
        public List<int> Ispresent { get; set; }
        public int SlotIds { get; set; }
        public DateTime startdate { get; set; }
    }
    public class AttendanceData:Instance
    {
        public string AttendUserId { get; set; }
        public List<string> Ispresent { get; set; }
        public string SubjectSlotID { get; set; }
        public DateTime startdate { get; set; }



    }
    public class AttendanceDelete : Instance
    {
        public int SubjectSlotID { get; set; }
        public int InstanceClassificationId { get; set; }

        public string RoleName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

}
