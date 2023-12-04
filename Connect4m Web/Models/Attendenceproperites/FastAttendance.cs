using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class FastAttendance
    {
        public DateTime StartDate { get; set; }
        public string Instanceid { get; set; }


        [DisplayName("Department")]
        [Required(ErrorMessage = "Please Select Department")]
        public string ClassificationName { get; set; }
        public string InstanceClassificationId { get; set; }
        public string InstanceSubClassificationId   { get; set; }
        public string SubClassificationName      { get; set; }
        public string SlotId { get; set; }
        public string SlotName { get; set; }
        public string MasterSlotId { get; set; }
    }
}
