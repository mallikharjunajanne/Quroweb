using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class FastAttendance:Commonproperties
    {
        [Required(ErrorMessage = "StartDate is required")]
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string ColumnString { get; set; }
        public string ClassificationName { get; set; }

        [Required(ErrorMessage = "Department is required")]
        public string InstanceClassificationId { get; set; }

        [Required(ErrorMessage = "Class is required")]
        public string InstanceSubClassificationId { get; set; }
        public List<string> InstanceSubClassificationIds { get;set; }
        public string SubClassificationName{ get; set; }

        [Required(ErrorMessage = "SlotName is required")]
        public string SlotId { get; set; }
        public string SlotName { get; set; }
        public string MasterSlotId { get; set; }
        public string Returnmessage { get; set; }

        public List<Dictionary<string, string>> FormData { get; set; }
        public List<string> Userids { get; set; }
        public string Subclassids { get; set; }
        public bool Studentsms { get; set; }
        public bool Parentsms { get; set; }
        public string Usersids { get; set; }
        
    }
}
