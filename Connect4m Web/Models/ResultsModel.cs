using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models
{
    public class DropdownClass
    {
        //This Is for Drop Downs
        public int Value { get; set; }
        public string Text { get; set; }
    }
    public class MultiplelistValues
    {
        //This Is for Drop Downs
        public List<ResultsModel> ExamSubjectsList { get; set; }
        public List<ResultsModel> ResultsModeList { get; set; }
        public List<ResultsModel> StudentNamesList { get; set; }

        public List<UsermarksModel> UsermarksList { get; set; }
    }
    public class ResultsModel : CommonClass
        {//New
        public IFormFile File { get; set; }
        public string Status { get; set; }
        public string RatingType { get; set; }
        public int ResultsModeID { get; set; }
        public string SMSTextInXML { get; set; }
        public string SMSFromText { get; set; }
        public string Action { get; set; }
        public List<int> SubjectIdList { get; set; }
       // public List<int> ExamIdList { get; set; }
        public List<Double> PassMarksList { get; set; }
        public List<Double> MaxMarksList { get; set; }
        public List<DateTime> DateConductedList { get; set; }

        public int ExamSubjectId { get; set; }
        public string IncludeInTotal { get; set; }
        public string PassMarks { get; set; }
        public string MaxMarks { get; set; }
        public string DateConducted { get; set; }
        public string ActualDateConducted { get; set; }

        [Required(ErrorMessage ="The subject is required")]
        public List<int> SubjectsIdString { get; set; }
        public string SubjectsName { get; set; }
        public string ExamName { get; set; }
        public string ExamModeName { get; set; }
        [Required(ErrorMessage = "The Exam Type is required")]
        public int ExamtypeId { get; set; }
        [Required(ErrorMessage = "The Exam is required")]
        public int ExamId { get; set; }
        public int SubjectId { get; set; }
        [Required(ErrorMessage = "The Exam Mode is required")]
        public int ExamModeId { get; set; }
        public int SortBy { get; set; }
    }


    public class UsermarksModel : CommonClass
    {
        public List<string> Columns { get; set; }
        public List<string> IsPublished { get; set; }
        public List<string> DisplayIcon { get; set; }
        public List<string> SubjectMarks { get; set; }
        public List<string> IncludeInTotal { get; set; }
        public List<string> OptionalSubject { get; set; }


        public string InstanceUserCode { get; set; }
        public string column1 { get; set; }
        public string column2 { get; set; }
        public string column3 { get; set; }
        public string column4 { get; set; }
        public string column5 { get; set; }
        public string column6 { get; set; }
        public string column7 { get; set; }
        public string column8 { get; set; }
        public string column9 { get; set; }
        public string column10 { get; set; }
        public string column11 { get; set; }
        public string column12 { get; set; }
        public string column13 { get; set; }
        public string column14 { get; set; }
        public string column15 { get; set; }
        //public int InstanceUserCode { get; set; }
        //public int UserId { get; set; }
    }
}
