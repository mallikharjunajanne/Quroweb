using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models
{
    public class ManageUsersModel : CommonClass
    {
        public string UserName { get; set; }

        public string Class { get; set; }
        [Display(Name = "Reg. No./Emp ID")]
        public string InstanceUserCode { get; set; }
        [Display(Name = "Email ID ")]
        public string PortalEmail { get; set; }
        public int TcTaken { get; set; }
        [Display(Name = "Pick Up Route ")]
        public int RouteId { get; set; }
        [Display(Name = "Pick Up Stop")]
        public int StopId { get; set; }
        [Display(Name = "School Code")]
        public string CollegeCode { get; set; }
        public int StudentQuota { get; set; }
        public string Gender { get; set; }

        public string CollegeHostel { get; set; }

        public string Transport { get; set; }
        [Display(Name = "Allow Login")]
        public int IsActive { get; set; }
        public string RoleName { get; set; }
        [Display(Name = "Designation")]
        public int DesignationId { get; set; }
        public int LabBatchId { get; set; }
        [Display(Name = "Mobile Number")]
        public string MobilePhone { get; set; }
        public string FatherFirstName { get; set; }
        public string FatherLastName { get; set; }
        public string MotherFirstName { get; set; }
        public string MotherLastName { get; set; }
        [Display(Name = "Start Date")]
        public DateTime SearchStartDate { get; set; }
        [Display(Name = "End Date")]
        public DateTime SearchEndDate { get; set; }
        public string SearchDateType { get; set; }
    }

}
