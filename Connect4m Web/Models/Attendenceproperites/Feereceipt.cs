using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class Feereceipt
    {
        //public int InstanceId { get; set; }
        //public int UserId { get; set; }
        //public int InstanceClassificationId { get; set; }
        //public string ClassificationName { get; set; }
        //public int InstanceSubClassificationId { get; set; }
        //public string SubClassificationName { get; set; }
        //public string FirstName { get; set; }

        //public int FeeTermId { get; set; }
        //public int AcademicYearId { get; set; }
        //public string TermName { get; set; }
        //public int FeeTypeId { get; set; }
        //public int FeeTypeIds { get; set; }
        //public string FeeType { get; set; }


        //public decimal FeeAmount { get; set; }
        //public decimal totalAmount { get; set; }
        //public decimal Amount { get; set; }



        public int InstanceId { get; set; }
        public string UserId { get; set; }
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }
        public int InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }
        public string FirstName { get; set; }


        public string FeeTermId { get; set; }
        public int AcademicYearId { get; set; }
        public string TermName { get; set; }
        public string FeeTypeId { get; set; }
        public int FeeTypeIds { get; set; }
        public string FeeType { get; set; }


        public string FeeAmount { get; set; }
        public string totalAmount { get; set; }
        public string Amount { get; set; }
        public int UserReceiptGenerationID { get; set; }
    }

    public class New_GenerateFeeReceipt
    {
        public int InstanceId { get; set; }
        public string UserId { get; set; }
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }
        public int InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }
        public string FirstName { get; set; }


        public string FeeTermId { get; set; }
        public int AcademicYearId { get; set; }
        public string TermName { get; set; }
        public string FeeTypeId { get; set; }
        public int FeeTypeIds { get; set; }
        public string FeeType { get; set; }


        public string FeeAmount { get; set; }
        public string totalAmount { get; set; }
        public string Amount { get; set; }
        public int UserReceiptGenerationID { get; set; }
    }

    public class TransferChallan
    {
        public string Amount { get; set; }
        public decimal Amounts { get; set; }
        [Required(ErrorMessage = "Challan No Required")]
        public int UserReceiptGenerationID { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
        public string ReceiptStatus { get; set; }
        public int InstanceId { get; set; }
        public int PaidChallanNo { get; set; }
        public int TransferChallanNo { get; set; }
        public int CreatedBy { get; set; }
        public int ErrorMessage { get; set; }

    }


}
