using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class Managesubjecttools
    {
        public int InstanceId { get; set; }
        public int UserId { get; set; }
        [Required]
        public int InstanceSubjectToolId { get; set; }


        [Display(Name = "Subject Tool Name")]
        [Required]
        public string SubjectToolName { get; set; }

       

        [Display(Name = "Subjects Display Order")]
   
        public int? SubjectsDisplayOrder { get; set; }

        [Display(Name = "Subject Type Name")]
       
        public string SubjectTypeName { get; set; }

        [Display(Name = "Comments")]
      
        public string Comments { get; set; }

      
    }
}
