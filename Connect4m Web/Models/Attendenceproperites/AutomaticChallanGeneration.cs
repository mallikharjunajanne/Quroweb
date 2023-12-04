using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class AutomaticChallanGeneration
    {
        public string InstanceId { get; set; }
        public int AcademicYearId { get; set; }
        public string Years { get; set; }
        public int FeeTermId { get; set; }
        public int PrevFeeTermId { get; set; }
   
        
        public string TermName { get; set; }
        public int InstanceClassificationId { get; set; }
        public string SubClassificationName { get; set; }
        public int FeeTypeid { get; set; }
        public string FeeType { get; set; }
        public string Duedate { get; set; }
        public string ChallanDate { get; set; }
        //public List<string> FeeTypeIds { get; set; }
        public string FeeTypeIds { get; set; }
        public string ClassIds { get; set; }
        public int CreatedBy { get; set; }
    }
}
