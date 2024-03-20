using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.Attendenceproperites
{
    public class AttendanceReportData
    {
        [JsonProperty("attendanceList")]
        public List<StudentAttendanceRegister> AttendanceList { get; set; }

        [JsonProperty("attendanceAverage")]
        public Average_attendance AttendanceAverage { get; set; }

        [JsonProperty("Stu_wise")]
        public Total_Enrollment Stu_wise { get; set; }

        [JsonProperty("TE_Muslims_cl")]
        public Total_Enrollment TE_Muslims_cl { get; set; }

        [JsonProperty("St_tbl4_cl")]
        public Total_Enrollment St_tbl4_cl { get; set; }

        [JsonProperty("St_tbl6_cl")]
        public Total_Enrollment St_tbl6_cl { get; set; }

        [JsonProperty("St_tbl8_cl")]
        public Total_Enrollment St_tbl8_cl { get; set; }

        [JsonProperty("M_Stuabs")]
        public List<Student_Attendance_Tbl2> M_Stuabs { get; set; }

        [JsonProperty("Stu_Atd_tbl2")]
        public List<Student_Attendance_Tbl2> Stu_Atd_tbl2 { get; set; }

        public string retunmessage{ get; set; }

        public string ErrorMessage { get; set; }
    }


    public class Student_Attendance_Tbl2
    {
        public string TotalPresentsinDay { get; set; }
        public string TotalAbsentsinDay { get; set; }
    }

    public class Total_Enrollment
    {
        public string currentmonth { get; set; }
        public string M_total { get; set; }

    }

    public class Average_attendance {
        public string AllAvg { get; set; }
        public string SC { get; set; }
        public string ST { get; set; }
        public string OBC { get; set; }
        public string Muslim { get; set; }
        public string Girls { get; set; }
    }


    public class Attendanceregisterreport 
    {
        [Required(ErrorMessage = "Department is required")]
        public string InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }

        [Required(ErrorMessage = "Class is required")]
        public string InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }

        [Required(ErrorMessage = "Month is required")]
        public string Month { get; set; }

        [Required(ErrorMessage = "Year is required")]
        public string Year { get; set; }
    }



    public class StudentAttendanceRegister
    {   
        //Report Get Properties
        public string UserID { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public string DOB { get; set; }
        public string ReligionName { get; set; }
        public string CastName { get; set; }
        public string EWS         { get; set; }
        public string Repeater    { get; set; }
        public string Dropout    { get; set; }


        public List<string> DynamicColumns { get; set; }

        public StudentAttendanceRegister()
        {
            DynamicColumns = new List<string>();
        }




        public string Column1  { get; set; }
        public string Column2  { get; set; }
        public string Column3  { get; set; }
        public string Column4  { get; set; }
        public string Column5  { get; set; }
        public string Column6  { get; set; }
        public string Column7  { get; set; }
        public string Column8   { get; set; }
        public string Column9   { get; set; }
        public string Column10 { get; set; }
        public string Column11 { get; set; }
        public string Column12 { get; set; }
        public string Column13 { get; set; }
        public string Column14 { get; set; }
        public string Column15 { get; set; }
        public string Column16 { get; set; }
        public string Column17 { get; set; }
        public string Column18 { get; set; }
        public string Column19 { get; set; }
        public string Column20 { get; set; }
        public string Column21 { get; set; }
        public string Column22 { get; set; }
        public string Column23 { get; set; }
        public string Column24 { get; set; }
        public string Column25 { get; set; }
        public string Column26 { get; set; }
        public string Column27 { get; set; }
        public string Column28 { get; set; }
        public string Column29 { get; set; }
        public string Column30 { get; set; }

        public string Sep { get; set; }
        public string Sep_ { get; set; }
        public string TotalAbsents { get; set; }
        public string Carry_Fwd { get; set; }
        public string Total { get; set; }
        public string TotaExracuracitivities { get; set; }
      
        public string Till_Date { get; set; }




        //Day_wise count
        //public string total { get; set; }
        //public string TotalPresentsinDay { get; set; }
        //public string TotalAbsentsinDay { get; set; }

    }
    
   

}
