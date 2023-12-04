using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class LMSQuRsults
    {
        public int ResultId { get; set; }
        public int InstanceId { get; set; }
        public int UserId { get; set; }
        public int StudentUserId { get; set; }
        public int InstanceClassificationId { get; set; }
        public int InstanceSubClassificationId { get; set; }
        public int SubjectId { get; set; }
        public int SubjectVideoId { get; set; }
        public int AnswerId { get; set; }
        public int TotalQuestions { get; set; }
        public int NumberOfAttempts { get; set; }
        public string YourAnswer { get; set; }
        public string ActualAnswer { get; set; }
        public int GainMarks { get; set; }
        public int TestId { get; set; }
        public string createddate { get; set; }
        public string DisplayName { get; set; }
        public string ActualMarks { get; set; }



    }
    public class GeneratedPdfs
    {
        public int PdfId { get; set; }
        public int InstanceId { get; set; }
        public int UserId { get; set; }
        public int InstanceClassificationId { get; set; }
        public int InstanceSubClassificationId { get; set; }
        public int SubjectId { get; set; }
        public int SubjectVideoId { get; set; }
        public string PdfPath { get; set; }
        [DisplayName("PDF Name")]
        public string PdfName { get; set; }

        public int StudentUserId { get; set; }
        [DisplayName("Generated Date")]
        public string GeneratedDate { get; set; }

    }
    public class VideoViewpoints : GeneratedPdfs
    {
        public int PercentageId { get; set; }

        public int Viewspoints { get; set; }
        public int TotalPoins { get; set; }
        public int ChapterId { get; set; }
        public int IsCompleted { get; set; }


    }

}
