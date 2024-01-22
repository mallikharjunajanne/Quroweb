using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models
{
    public class ManageUsersModel : CommonClass
    {
        public ManageUsersModel DdlParentDetails { get; set; }
        public ManageUsersModel DdlUsersDetails { get; set; }
        public string Question { get; set; }
        public string ClassTeacherName { get; set; }
        public string BloodGroupName { get; set; }
        public string DisabilityName { get; set; }
        public string CommunityName { get; set; }
        public string ReligionName { get; set; }
        public string PStateName { get; set; }
        public string PCountryName { get; set; }
        public string MothorTongueName { get; set; }


        public string IdentityPassword { get; set; }
      //  public string AnnualIncome { get; set; }
        public string CurrencyType { get; set; }
        public string LacsType { get; set; }
        public string Thousands { get; set; }
        public string IsParent { get; set; }

        [Display(Name= "Company Name")]
        public string CompanyName { get; set; }
        public string Designation { get; set; }
        public string Occupation { get; set; }
        public string StudentId { get; set; }
        public string LoginStatus { get; set; }
        public string IsParentTable { get; set; }
        [Display(Name="Department")]
        public string ClassificationName { get; set; }
        [Display(Name = "Class")]
        public string SubClassificationName { get; set; }
        public string DISPLAYDATEOFJOINING { get; set; }

        public string IS_UserJoineds { get; set; }
        [Required]
        [Display(Name= "Relation")]
        public string Relationship { get; set; }
        public string ParentName { get; set; }
        public string ParentId { get; set; }
        public string SubCategoryText { get; set; }
        



        [Required]
        [Display(Name = "Admission Number")]
        public string AdmissionNumberNew { get; set; }

        // public string SubCategoryText { get; set; }
        [Required]
       // [RegularExpression(@"^[a-z A-Z]+$", ErrorMessage = "Invalid First Name")]
        [RegularExpression(@"^[a-zA-Z. ]+$", ErrorMessage = "Invalid First Name")]

        [Display(Name = "First Name")]
        public string FirstNameInGeneral { get; set; }
        [DataType(DataType.Date)]
        public DateTime? IncrementDate { get; set; }
        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }
        public string Class { get; set; }
        //[Required(ErrorMessage = "The Roll No is Required")]
        [Display(Name = "Roll No ")]
        public string InstanceUserCode { get; set; }
        [RegularExpression(@"^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b", ErrorMessage = "Invalid email address")]

        [Display(Name = "Email Address ")]
        public string PortalEmail { get; set; }
        [Display(Name = "TC issued")]
        public string TcTaken { get; set; }
        public int RouteId { get; set; }
        public int StopId { get; set; }
        [Display(Name = "School Code")]
        public string CollegeCode { get; set; }
        public string StudentQuota { get; set; }
        [Required]
        public string Gender { get; set; }
        public string CollegeHostel { get; set; }
        public string Transport { get; set; }
       // [Required]
        [Display(Name = "Allow Login")]
        public string IsActive { get; set; }
        public string RoleName { get; set; }
        [Display(Name= "Designation")]
        public string DesignationId { get; set; }
        public int LabBatchId { get; set; }
        //[RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Please enter a valid 10-digit mobile number.")]

        [RegularExpression(@"^[6-9]{1}[0-9]{9}$", ErrorMessage = "Invalid mobile phone number.")]
        [Display(Name = "Mobile Phone")]
        public string MobilePhone { get; set; }
        public string FatherFirstName { get; set; }
        public string FatherLastName { get; set; }
        public string MotherFirstName { get; set; }
        public string MotherLastName { get; set; }
        [Required]
        [Display(Name= "Search Start Date")]
        [DataType(DataType.Date)]
        public DateTime? SearchStartDate { get; set; }
        [Required]
        [Display(Name = "Search End Date")]
        [DataType(DataType.Date)]
        public DateTime? SearchEndDate { get; set; }
        public string SearchDateType { get; set; }

        [Display(Name= "Assign To")]
        public string ClassTeacherId { get; set; }
        [Required]
       // [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=]).{8,10}$", ErrorMessage = "Password must be 8 to 10 characters long and include at least one digit, one lowercase letter, one uppercase letter, and one special character.")]
        public string Password { get; set; }

        [Display(Name = "Confirm Password")]
        [Required]
        [Compare("Password", ErrorMessage = "The password and Confirm password do not match.")]
        public string ConfirmPassword { get; set; }
        public bool ChangePwOnLogin { get; set; }
        [Required]
        [Display(Name = "Security Question ")]
        public string SecurityQuestionId { get; set; }
        [Required]
        public string Answer { get; set; }
        [RegularExpression(@"^[a-zA-Z. ]+$", ErrorMessage = "Invalid Middle Name")]
        [Display(Name = "Middle Name")]
        public string MiddleName { get; set; }
        public string NickName { get; set; }
        [Required]
        [Display(Name = "Admission Date  ")]
        [DataType(DataType.Date)]
        public DateTime? AdmissionDate { get; set; }
       // [Required]
        [DataType(DataType.Date)]
        // [DateValidation_NotGreaterThanToday(ErrorMessage = "Date Of Birth should not be greater than today's date.")]
        public DateTime? DOB { get; set; }
        [RegularExpression(@"^\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b", ErrorMessage = "Invalid email address")]
        [Display(Name = "Alternate Email")]
        public string AlternateEmail { get; set; }

        public string WebAddress { get; set; }
        public string Hobbies { get; set; }
        [Display(Name = "Upload Photo ")]
        public IFormFile Photo { get; set; }
        public int PhotoSize { get; set; }
        public string PhotoName { get; set; }
        public string HomePhone { get; set; }
        public string WorkPhone { get; set; }
        public string WorkPhoneExtension { get; set; }
        public string FaxNumber { get; set; }
        public string MailingAddress1 { get; set; }
        public string MailingAddress2 { get; set; }
        [Display(Name = "Line 1")]
        public string PermanentAddress1 { get; set; }
        [Display(Name = "LIne 2")]
        public string PermanentAddress2 { get; set; }
        public string EmergencyContactNumber1 { get; set; }
        public string EmergencyContactNumber2 { get; set; }
        public string Nationality { get; set; }
        [Display(Name = "Religion ")]
        public int ReligionId { get; set; }
        public int CasteId { get; set; }
        [Display(Name = "Blood Group")]
        public string BloodGroup { get; set; }
       // [DateValidation_NotGreaterThanToday(ErrorMessage = "Date Of Joining should not be greater than today's date.")]
       [Required]
        [Display(Name = "Date Of Joining")]
        [DataType(DataType.Date)]

        public DateTime? DateOfJoining { get; set; }
        public int CountryId { get; set; }
        public int StateId { get; set; }
        public string OtherState { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
        [Display(Name = "Country")]
        public string PCountryId { get; set; }
        [Display(Name = "State")]
        public string PStateId { get; set; }
        public string POtherState { get; set; }
        [Display(Name = "City")]
        public string PCity { get; set; }
        [RegularExpression(@"^[0-9]+$", ErrorMessage = "Invalid Pin Code")]

        [Display(Name = "Pin Code")]
        public string PZip { get; set; }
        public int TemplateId { get; set; }
        [Display(Name = "Session")]
        public string Batch { get; set; }
        [Display(Name = "Mother Tongue")]
        public string MotherTongueId { get; set; }
        public string KnownLanguages { get; set; }
        public int InstanceHouseId { get; set; }
        public int InstanceBlockId { get; set; }
        public string FoodOfferingIds { get; set; }
        [Display(Name = "Status")]
        public int StudentStatus { get; set; }
        public string DietaryNeeds { get; set; }
        public string DietaryNeedsDetails { get; set; }
        [Display(Name = "Disability")]
        public string PhysicallyChalenged { get; set; }
        [Display(Name = "Disability Details")]
        public string PhysicallyChallengedDetails { get; set; }
        [RegularExpression(@"^[a-z A-Z]+$", ErrorMessage = "Invalid Place Of Birth")]
        [Display(Name = "Place Of Birth")]
        public string PlaceOfBirth { get; set; }
        [RegularExpression(@"^[a-z A-Z]+$", ErrorMessage = "Invalid Identification Marks")]
        [Display(Name = "Identification Marks")]
        public string StudentIdentificationMarks { get; set; }
        [Display(Name = "Siblings in same School")]
        public string SiblingsInSameCollege { get; set; }
        [Display(Name = "Siblings in Other School")]
        public string SiblingsInSameCollegeDetails { get; set; }
        public string PersonalDoctorDetails { get; set; }
        [Display(Name = "Transfer Details")]
        public string InstanceTransferDetails { get; set; }
        public string Qualification { get; set; }
        [Display(Name = "Do You Want to have SMS Option")]
        public string SendSMS { get; set; }
       // public DateTime CreatedDate { get; set; }
        public string HallTicket { get; set; }
        public string PreviousOrganization { get; set; }
        public string CurrentlyPursuingCourse { get; set; }
        public string AreasOfInterest { get; set; }
        public int NoOfProjectsGuiding { get; set; }
        public string IndustryExperience { get; set; }
        public string HighestQuaAttained { get; set; }
        public int YearOfCompletion { get; set; }
        public string UniversitySpecialization { get; set; }
        public string TeachingExperience { get; set; }
        [Display(Name = "Community")]
        public int CommunityId { get; set; }
        [Display(Name = "TC Number")]
        public string TCNumber { get; set; }
        [DataType(DataType.Date)]
        //  [DateComparison("DateOfJoining", "TC Date should be greater than Date Of Join.")]
        [Display(Name = "Tc Date")]
        public string TCdate { get; set; }
        [Display(Name = "Tc Comments")]
        public string TcComments { get; set; }
        //public string AdmissionDate { get; set; }
        [Display(Name = "Fee Category")]
        public string FeeConcedingTypeId { get; set; }
        public string CabRegNo { get; set; }
        public string DriverId { get; set; }
        [Display(Name = "Is User Joined")]
        public string IsUserJoined { get; set; }
        public int DropRouteId { get; set; }
        public int DropStopId { get; set; }
        [Display(Name = "Siblings In Other School")]
        public string SiblingsOtherCollege { get; set; }
        //[RegularExpression(@"^[a-z A-Z]+$", ErrorMessage = "Invalid Place Of Birth")]
        [RegularExpression(@"^\d{12}$", ErrorMessage = "Please enter a valid Aadhar number with exactly 12 digits.")]
        [Display(Name = "Aadhaar Number")]
        public string ICNumber { get; set; }
        public string PassportNumber { get; set; }
        public string LocalorForeigner { get; set; }
        public string ClubandSociety { get; set; }
        public int UniformUnit { get; set; }

        [Required(ErrorMessage = "The Payroll Category is Required")]
        [Display(Name = "Payroll Category ")]
        public string Category { get; set; }
        [Required(ErrorMessage = "The Payroll Sub Category is Required")]
        [Display(Name = "Payroll Sub Category ")]
        public string SubCategory { get; set; }
        [Required(ErrorMessage = "The  LMS Category is Required")]
        [Display(Name = " LMS Category ")]
        public string LMSCategory { get; set; }
        [Required(ErrorMessage = "The LMS Sub Category is Required")]
        [Display(Name = "LMS Sub Category ")]
        public string LMSSubCategory { get; set; }
        [Display(Name= "Category")]
        public List<string> ADMISSIONCATEGORY { get; set; }
        public string BIOID { get; set; }
        public int IS_ReportingManager { get; set; }
        public int ReportingManagerId { get; set; }
        public string leveluserid { get; set; }
        public string SecondCategory { get; set; }
        public string BPLNum { get; set; }
        public string IncomeCertNum { get; set; }
        public string ProgramTypeIds { get; set; }
        [DataType(DataType.Date)]
        public DateTime? LastWorking { get; set; }
        [DataType(DataType.Date)]
        public DateTime? Relieving { get; set; }


        public int ParentStatusId { get; set; }
        public string IncomeRange { get; set; }
        public string PPPID { get; set; }
    }

    //---this is for Not greater than today date validation
//    public class DateValidation_NotGreaterThanTodayAttribute : ValidationAttribute
//    {
//        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
//        {
//            if (value != null && value is DateTime dob)
//            {
//                // Compare the DOB with today's date
//                if (dob > DateTime.Today)
//                {
//                    return new ValidationResult(ErrorMessage);
//                }
//            }
//            return ValidationResult.Success;
//        }
//    }

//[AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
//    public class DateComparisonAttribute : ValidationAttribute
//    {
//        private readonly string _otherPropertyName;

//        public DateComparisonAttribute(string otherPropertyName, string errorMessage)
//            : base(errorMessage)
//        {
//            _otherPropertyName = otherPropertyName;
//        }

//        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
//        {
//            var otherPropertyInfo = validationContext.ObjectType.GetProperty(_otherPropertyName);

//            if (otherPropertyInfo == null)
//            {
//                return new ValidationResult($"Unknown property: {_otherPropertyName}");
//            }

//            var otherPropertyValue = (DateTime?)otherPropertyInfo.GetValue(validationContext.ObjectInstance);

//            if (value is DateTime? && otherPropertyValue.HasValue)
//            {
//                var currentDate = (DateTime)value;

//                if (currentDate <= otherPropertyValue)
//                {
//                    return new ValidationResult(ErrorMessage);
//                }
//            }

//            return ValidationResult.Success;
//        }
//    }


    public class MultipleDropDownList
    {
        public List<DropdownClass> DdlSessionList { get; set; }
        public List<DropdownClass> DdlBloodGroupList { get; set; }
        public List<DropdownClass> DdlFeeConcedingTypesList { get; set; }
        public List<DropdownClass> DdlPayRoleCategoryList { get; set; }
        public List<DropdownClass> DdlLMSCategoryList { get; set; }
        public List<DropdownClass> DdlReligionList { get; set; }
        public List<DropdownClass> DdlCommunityList { get; set; }
        public List<DropdownClass> DdlMothorTongueList { get; set; }
        public List<DropdownClass> DdlCountryList { get; set; }
        public List<DropdownClass> DdlStateList { get; set; }
        public List<DropdownClass> DdlDisabilityList { get; set; }
        public List<DropdownClass> DdlSecurityQuestionList { get; set; }
        public List<DropdownClass> DdlInstanceClassificationList { get; set; }
        public List<DropdownClass> DdlRelationshipList { get; set; }
        public List<DropdownClass> DdlOccupationList { get; set; }
        public List<DropdownClass> DdlCurrencyList { get; set; }
        public List<DropdownClass> TblParentsDetailsList { get; set; }
    }

}
