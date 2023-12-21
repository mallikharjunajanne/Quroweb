using Connect4m_Web.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models
{
    public class DropdownClass:CommonClass
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

        public List<ResultsModel> PostResult_CheckCountList { get; set; }
    }
    public class ResultsModel : CommonClass
    {//New

        public string SMStoStudent { get; set; }
        public string SMStoParent { get; set; }
        public string EMAILtoStudents { get; set; }
        public string EMAILtoParents { get; set; }
        public string IncludeClass { get; set; }



        public List<int> UseridList { get; set; }
        public List<string> SecureMarksList { get; set; }
        public List<string> GradeList { get; set; }
        public string InstanceUserCode { get; set; }
      //  [Required(ErrorMessage = "The file is Required")]
        public IFormFile File { get; set; }
       // [Required(ErrorMessage = "The Sheet Name is Required")]
        public string SheetName { get; set; }
        public string Status { get; set; }
        public string RatingType { get; set; }
        public int ResultsModeID { get; set; }
        public string SMSTextInXML { get; set; }
        public string SMSFromText { get; set; }
        public string Action { get; set; }
        public List<int> SubjectIdList { get; set; }
         public List<int>ExamSubjectIdList { get; set; }
        public List<Double> PassMarksList { get; set; }
        public List<Double> MaxMarksList { get; set; }
        public List<DateTime> DateConductedList { get; set; }

        public int ExamSubjectId { get; set; }
        public string IncludeInTotal { get; set; }
        public string PassMarks { get; set; }
        public string MaxMarks { get; set; }
        public string DateConducted { get; set; }
        public string ActualDateConducted { get; set; }

        [Required(ErrorMessage = "The subject is required")]
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


        public string OptionalStrenth { get; set; }
        public string TotalStrength { get; set; }
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
       
    }
}
