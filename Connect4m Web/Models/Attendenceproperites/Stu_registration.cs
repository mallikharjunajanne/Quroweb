using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class Stu_registration
    {

        [DisplayName("Registration Number")]
        public int Reg_No { get; set; }
        [Required]
        [DisplayName("Name")]
        public string Stu_Name { get; set; }
        [DisplayName("Date Of Birth")]
        [Required]
        public DateTime DOB { get; set; }
        [Required]
        public string Religion { get; set; }
        [Required]
        public string Category { get; set; }
        public string Mobile { get; set; }
    }
}
