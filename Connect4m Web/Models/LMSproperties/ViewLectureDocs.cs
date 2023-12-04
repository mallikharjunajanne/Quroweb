using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class ViewLectureDocs
    {
        public string ClassificationName { get; set; }
        public int InstanceClassificationId { get; set; }
        public string ClassificationDescription { get; set; }
        public int InstanceSubClassificationId { get; set; }
        public int TotalPoints { get; set; }
        public int viewPoints { get; set; }
        public string SubClassificationName { get; set; }
        public string ClassTeacherName { get; set; }
        public string SubjectName { get; set; }
        public int SubjectId { get; set; }
        public int UserId { get; set; }

    }


    public class ViewLectureDocs2
    {
        public string ClassificationName { get; set; }
        public int InstanceClassificationId { get; set; }
        public string ClassificationDescription { get; set; }
        public int InstanceSubClassificationId { get; set; }
        public int TotalPoints { get; set; }
        public int viewPoints { get; set; }
        public string SubClassificationName { get; set; }
        public string ClassTeacherName { get; set; }
        public string SubjectName { get; set; }
        public int SubjectId { get; set; }
        public int UserId { get; set; }

    }


    public class ViewLectureDocsMain
    {
        public List<ViewLectureDocs> ViewLectureDocs { get; set; }
        public List<ViewLectureDocs2> ViewLectureDocs2 { get; set; }
    }
    public class ViewLectureDocsMainsub
    {
        public List<ViewLectureDocs3> ViewLectureDocs3 { get; set; }
        public List<Uploaddocs> uploadlecturedocs { get; set; }
    }

    public class ViewLectureDocs3
    {
        public string ClassificationName { get; set; }
        public int InstanceSubjectToolId { get; set; }
        public string SubClassificationName { get; set; }
        public string SubjectName { get; set; }
        public string SubjectToolName { get; set; }

    }
    public class WriteaNotes
    {
        public int NotesId { get; set; }
        public int InstanceId { get; set; }
        public int UserId { get; set; }
        public int InstanceClassificationId { get; set; }
        public int InstanceSubClassificationId { get; set; }
        public int SubjectId { get; set; }
        public int SubjectVideoId { get; set; }
        public int TimeHours { get; set; }
        public int TimeMinutes { get; set; }
        public int TimeSeconds { get; set; }
        public string NotesDescription { get; set; }
        public int StudentUserId { get; set; }

    }


    public class WriteaNotesInsering
    {
       
        public int NotesId { get; set; }
     
     
        public int subjectvideoid { get; set; }
        public int TimeHours { get; set; }
        public int TimeMinutes { get; set; }
        public int TimeSeconds { get; set; }
        public string NotesDescription { get; set; }
      

    }

}
