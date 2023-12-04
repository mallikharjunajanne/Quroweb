using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class Managesubjects:Instance
    {
       
     
        public int InstanceSubjectId { get; set; }


        [Display(Name = "Subject Name")]
        
        public string SubjectName { get; set; }



        [Display(Name = "Subject Code")]

        public string SubjectCode { get; set; }

        [Display(Name = "Department")]

        public string ClassificationId { get; set; }

        [Display(Name = "Class ")]

        public string SubClassificationId { get; set; }
        public string SubjectTypeName { get; set; }
        public int? InstanceClassificationId { get; set; }
       
        public string ClassificationName { get; set; }
        public int? ProgramType { get; set; }

    }
}
