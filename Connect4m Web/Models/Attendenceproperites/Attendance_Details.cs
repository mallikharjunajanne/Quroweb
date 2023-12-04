
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class Attendance_Details
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        [DisplayName("Department")]
        [Required(ErrorMessage = "Please Select Department")]
        public string ClassificationName { get; set; }


        [DisplayName("Class")]
        [Required(ErrorMessage = "Please Select Class")]
        public string SubClassificationName { get; set; }
        public string UserId { get; set; }
        public string FirstName { get; set; }

        [DisplayName("Slot")]
        [Required(ErrorMessage = "Please Select Slot Name")]
        public string SubjectName { get; set; }


        public string[] SlotSubjectsNames { get; set; }
        public string SubjectSlotName { get; set; }
        public string Mentors { get; set; }
        public string IsPresent { get; set; }
        public string CreatedDate { get; set; }
        public string Present { get; set; }
        public string AttendanceRequired { get; set; }
        public string PeriodId { get; set; }
        public int InstanceID { get; set; }
        public string SubjectSlotID { get; set; }
        public string bFlagForDisplay { get; set; }





        //[DateGreaterThan("From_date", ErrorMessage = "To Date must be greater than From Date.")]
        //public class DateGreaterThanAttribute : ValidationAttribute, IClientModelValidator
        //{
        //    private readonly string _comparisonProperty;

        //    public DateGreaterThanAttribute(string comparisonProperty)
        //    {
        //        _comparisonProperty = comparisonProperty;
        //    }

        //    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        //    {
        //        var property = validationContext.ObjectType.GetProperty(_comparisonProperty);

        //        if (property == null)
        //        {
        //            return new ValidationResult($"Unknown property: {_comparisonProperty}");
        //        }

        //        var comparisonValue = property.GetValue(validationContext.ObjectInstance);

        //        if (value is DateTime toDate && comparisonValue is DateTime fromDate)
        //        {
        //            if (toDate <= fromDate)
        //            {
        //                return new ValidationResult(ErrorMessage);
        //            }
        //        }

        //        return ValidationResult.Success;
        //    }
        //}

       //Student Login Attedance details properts
        public int InstanceSubjectId { get; set; }
        //public string SubjectSlotName { get; set; }
        //Student Login Attedance details properts
        public Student_Attendance_Details StudentAttendanceDetails { get; set; }
    }

    public class Student_Attendance_Details
    {
       

    }
}
