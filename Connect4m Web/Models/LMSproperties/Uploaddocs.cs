using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class Uploaddocs
    {
        public int SubjectVideoId { get; set; }
        public int InstanceId { get; set; }
        [Display(Name ="Department")]
        [Required]
        public string Department { get; set; }
        [Display(Name = "Class")]
        [Required]

        public string ClassificationIds { get; set; }
        [Display(Name = "Subject")]
        [Required]
        public string InstanceSubClassificationId { get; set; }
        [Display(Name = "Subject Tool ")]
        [Required]
        public string InstanceSubjectsId { get; set; }

        [Display(Name = "Upload Doc's")]
        [Required]
        public string UploadDocs { get; set; }

        [Display(Name = "Upload Video's")]
        [Required]
        public string VideoPath { get; set; }

        [Required]
        [Display(Name = "Docs Display Name")]

        public string DocsDisplayname { get; set; }

        [Display(Name = "Display Order ")]
       
        public string DisplayOrder  { get; set; }

        [Display(Name = "Display Restriction")]
      
        public string IsRestriction { get; set; }

        [Display(Name = "Duration")]
       
        public int? Duration { get; set; }

        [Display(Name = "Points")]
        [Required]
        public int Points { get; set; }
        public int? IsSubjectVideo { get; set; }
        public string OnlineTestID { get; set; }
        // extra
        public string ClassificationName { get; set; }
        public string SubClassificationName { get; set; }
        public string SubjectName { get; set; }
        public int PlayLink { get; set; }
        public int DeleteLink { get; set; }
        public int IsonlineTest { get; set; }
       
        public string SubjectToolName { get; set; }
        public string Ext1 { get; set; }
        public string VideoStatus { get; set; }
        [Display(Name = "Display Name")]
        public string Displayname { get; set; }
        public string SubjectToolId { get; set; }
        public string Extdocs { get; set; }
        public int SubjectToolIdSub { get; set; }



    }
    public class LMSVideoscs
    {
        public int SubjectVideoId { get; set; }
        public int InstanceId { get; set; }
        public int UserId { get; set; }
   
        public string Department { get; set; }
       // public string sreekanth { get; set; }

        public string IsRestrictionidfor { get; set; }
       // public string IsRestriction { get; set; }
        public string ClassificationIds { get; set; }
      
        public string InstanceSubClassificationId { get; set; }
     
        public string InstanceSubjectsId { get; set; }
        public string Duration { get; set; }
        public string Points { get; set; }


        public string DocsDisplayname { get; set; }



        public string DisplayOrder { get; set; }

        public List<int> ChapterIdlist { get; set; }
        public int ChapterId { get; set; }


        public string docspath { get; set; }
        public string VideoPath { get; set; }
        public string displayname { get; set; }
        public List<int> Chhours { get; set; }
        public List<int> Chminutes { get; set; }
        public List<int> Chseconds { get; set; }
        public List<string> chaptername { get; set; }

        //}
        //public class LMSQuestions 
        //{
        public int QuestionId { get; set; }
        public List<int> QuestionIdlist { get; set; }
        public List<string> Question { get; set; }
        public List<int> Quhours { get; set; }
        public List<int> Quminutes { get; set; }
        public List<int> Quseconds { get; set; }

        //}
        //public class LMSAnswers
        //{
        public int AnswerId { get; set; }
        public List<int> AnswerIdlist { get; set; }
        public List<string> Options { get; set; }
        ////public List<string> Option1 { get; set; }
        ////public List<string> Option2 { get; set; }
        ////public List<string> Option3 { get; set; }
        public List<int> answers { get; set; }
        public List<int> Marks { get; set; }


        //-------extra

        public int timehours { get; set; }
        public int timeminutes { get; set; }
        public int timesecomds { get; set; }
        public string headingname { get; set; }
        public string Questionname { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public int Answerofquestion { get; set; }
        public int Marksofquestion { get; set; }
        public string filenameupdate { get; set; }


    }
    //public class Uploaddocssub:LMSAnswers
    //{
    //    //public IFormFile VideoPath { get; set; }
    //    //public LMSChapters chapters { get; set; }
    //    //public LMSQuestions questions { get; set; }
    //    //public LMSAnswers answer { get; set; }
    //    //public string Duration { get; set; }


    //}
    public class Listchaptersquestions
    {
        public List<LMSVideoscs> Listchapters { get; set; }
        public List<LMSVideoscs> ListQuestions { get; set; }
        public List<LMSVideoscs> ListAnswers { get; set; }
    }
}
