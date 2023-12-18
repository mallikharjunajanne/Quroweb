using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models
{
    public class ManageUsersModel : CommonClass
    {
        public string UserName { get; set; }

        public string InstanceUserCode { get; set; }
        public string PortalEmail { get; set; }
        public int TcTaken { get; set; }
        public int RouteId { get; set; }
        public int StopId { get; set; }
        public string CollegeCode { get; set; }
        public string StudentQuota { get; set; }
        public string Gender { get; set; }
        public string CollegeHostel { get; set; }
        public string Transport { get; set; }
        public int IsActive { get; set; }
        public string RoleName { get; set; }
        public int DesignationId { get; set; }
        public int LabBatchId { get; set; }
        public string MobilePhone { get; set; }
        public string FatherFirstName { get; set; }
        public string FatherLastName { get; set; }
        public string MotherFirstName { get; set; }
        public string MotherLastName { get; set; }
        public DateTime SearchStartDate { get; set; }
        public DateTime SearchEndDate { get; set; }
        public string SearchDateType { get; set; }
    }

}
