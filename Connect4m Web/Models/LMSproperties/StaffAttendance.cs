using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class StaffAttendance : Instance
    {
       [Display(Name = "Employee ID")]
        public string InstanceUserCode { get; set; }
        [Display(Name = "Department")]
        public string InstanceClassificationId { get; set; }
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Display(Name = "Last Name")]

        public string LastName { get; set; }
        [Required]
        [Display(Name = "Month")]

        public string Month { get; set; }
        [Required]
        [Display(Name = "Year")]

        public string Year { get; set; }
        [Display(Name = "PayRoll Category")]

        public string PayrollCategory { get; set; }
        [Display(Name = "PayRoll Sub Category")]

        public string PayrollSubCategory { get; set; }
        [Display(Name = "LMS Category")]

        public string LMSCategory { get; set; }
        [Display(Name = "LMS Sub Category")]

        public string LMSSubCategory { get; set; }
    }

    public class StaffMonthAttendance
    {
        public string Name { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public List<string> Columns { get; set; }
    }




    //=======================================       Staff Monthly Report

    public class StaffLeave : Instance
    {
        //  exec STP_GetMonthWiseFullStatusofClassAttendanceReportForHeritage @UserId=178328,@InstanceClassificationId=806,@InstanceSubClassificationId=806,@InstanceID=545,
        //@Year=2023,@Month=1,@EndYear=2023,@EndMonth=1,@ReportType=0,@InstanceUserCode=''
        [Required]
        [Display(Name = "Employee Name")]
        public int UserIdforEmployee { get; set; }
        public string InstanceSubClassificationId { get; set; }
        [Required]
        [Display(Name = "Department")]
        public string InstanceClassificationId { get; set; }
        [Required]
        [Display(Name = "From Month")]
        public string Month { get; set; }
       
        public string Year { get; set; }
        public string EndYear { get; set; }
        [Required]
        [Display(Name = "To Month")]
        public string EndMonth { get; set; }
        [Required]
        [Display(Name = "Report Type")]
        public string ReportType { get; set; }
        public string InstanceUserCode { get; set; }
    }

    public class StaffMonthLeave
    {
        public string UserIds { get; set; }
        public string InstanceUserCode { get; set; }

        public string ClassificationName { get; set; }
        public string FirstName { get; set; }
        public string OrderByMonth { get; set; }
        public string AttendanceMonth { get; set; }
        public string AttendanceYear { get; set; }

        public List<string> Columns { get; set; }
    }
}
