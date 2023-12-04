using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Connect4m_Web.Models.LMSproperties
{
    public class PayRollproperties:Instance
    {
        public int InstanceSalaryAttributeId { get; set; }

        [Display(Name = "Attribute")]
        [Required]

        public int SalaryAttributeMasterId { get; set; }
        [Display(Name = "Type")]
        [Required]
        public string SalaryAttributeType { get; set; }
        [Display(Name = "Name")]
        [Required]
        public string SalaryAttributeName { get; set; }
        [Display(Name = "Start Date")]
        [Required]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [Display(Name = "End Date")]
        [Required]
        [DataType(DataType.Date)]


        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
        [Display(Name = "Is LossOfPay")]
        public bool isLossofpaydedication { get; set; }
        [Required]
        [Display(Name = " Depends On")]
        public int SalDependsOn { get; set; }
        public int IsAgainstAdvance { get; set; }
        public int EligibilityAmount { get; set; }
        public int DISPLAYICON_ATTRIBUTENAME { get; set; }
        public int DISPLAYICON_ATTRIBUTETYPE { get; set; }
        public int DISPLAYICON_ISACTIVE { get; set; }
        public int DISPLAYICON_SALARYDEPENDSON { get; set; }
        public int DISPLAYICON_ISLOSSOFPAY { get; set; }
        public int DISPLAYICON_STARTDATE { get; set; }
        public int DISPLAYICON_ENDDATE { get; set; }
        public int DISPLAYICON_ELIGIBLEAMOUNT { get; set; }


    }
    public class SalaryAttributesforRoles:Instance
    {
        public int InstanceRoleId { get; set; }

        [Display(Name = "Role Name")]
        public string RoleName { get; set; }
        [Display(Name = "Description")]
        public string RoleDescription { get; set; }
        [Display(Name = "Name")]
       
        public string SalaryAttributeName { get; set; }
        public int AuthId { get; set; }
        [Display(Name = "Amount")]
        [Required]
        public double? Salary { get; set; }
        [Display(Name = "Percentage")]
        [Required]
        public double?    Percentage { get; set; }
        [Display(Name = "Select")]
        [Required]
        public string IsSalaryPercentage { get; set; }
        [Display(Name = "Salary Attribute")]
        [Required]
        public int InstanceSalaryAttributeId { get; set; }
        [Display(Name = "Start Date")]
        [Required]
        [DataType(DataType.Date)]
        public DateTime StartDate { get; set; }
        [Display(Name = "End Date")]
        [Required]
        [DataType(DataType.Date)]
        public DateTime EndDate { get; set; }
        [Display(Name = "Is Active")]
        public bool IsActive { get; set; }
        public int SalaryAttributeId { get; set; }
      
        public string DISPLAYICON_STARTDATE { get; set; }
        public string DISPLAYICON_ENDDATE { get; set; }
        public string DISPLAYICON_ISSALARYPERCENTAGE { get; set; }
        public string DISPLAYICON_ISACTIVE { get; set; }
        public string DISPLAYICON_PERCENTAGE { get; set; }
        public string DISPLAYICON_AMOUNT { get; set; }
    }
    public class ManageCategory : Instance
    {
      [Required(ErrorMessage ="Category Name Field Is Required")]
        public int PayrollCategoryId { get; set; }
        [Display(Name = "Category Name")]
        [Required]
        public string PayrollCategoryName { get; set; }
        public int isPayrollApplicable { get; set; }
        [Display(Name = "Applicable")]
        public int isLeaveApplicable { get; set; }
        [Display(Name = "Category Description ")]
        public string PayrollCategoryDescription { get; set; }
    }
    public class ManageSubCategory:ManageCategory
    {
        public int PayrollSubCategoryId { get; set; }
        [Display(Name = "Sub Category Name")]
        [Required]
        public string PayrollSubCategoryName { get; set; }
    }
    public class ManageEmployeessearch
    {
        public int RoleId { get; set; }
        public int DesignationId { get; set; }
        public int Category { get; set; }
        public int SubCategory { get; set; }
        public int Department { get; set; }
    }
    public class ManageEmployees : Instance
    {
        [Display(Name = "User Name")]
        public string UserName { get; set; }
        [Display(Name = "Last Name")]
        [Required]
        //  [DataType(DataType.Text)]
         [RegularExpression(@"^[a-z A-Z]+$", ErrorMessage = "Invalid Last Name")]
        public string LastName { get; set; }
        [Display(Name = "First Name")]
        [Required]
        //   [DataType(DataType.Text)]
        [RegularExpression(@"^[a-z A-Z]+$", ErrorMessage = "Invalid First Name")]

        public string FirstName { get; set; }
        public string FullName { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DateOfJoining { get; set; }
        public string ClassificationName { get; set; }
      
        [Display(Name = "Category")]
        [Required]
        public string Category { get; set; }
        [Display(Name = "Sub Category")]
        [Required]
        public string SubCategory { get; set; }
        public string NonConsiderBasic { get; set; }
        public string LevelName { get; set; }
        public string NoofChildrens { get; set; }
        [Required]
        public string Gender { get; set; }
        [Display(Name = "Employee.No")]
        [Required]
        public string AdmissionNumber { get; set; }

        public string InstanceUserCode { get; set; }

        public int InstanceClassificationId { get; set; }
        [Display(Name = "Designation")]
       // [Required]
        public string DesignationId { get; set; }
       
        [Display(Name = "Department")]
        [Required]
        public string Department { get; set; } 
        [Display(Name = "Password")]
        [Required]
       // [DataType(DataType.Password)]
       // [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,10}$", ErrorMessage = "Password must have at least 8-10 characters, must contain at least one lower case letter, one upper case letter, one digit and one special")]
        public  string Password { get; set; }
      //  [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        [Required]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConPassword { get; set; }
        [Display(Name = "Security Question")]
        [Required]
        public string SecurityQuestionId { get; set; }
        [Display(Name = "Answer")]
        [Required]
        public string Answer { get; set; } 
        [Display(Name = "Date of Birth")]
        [DataType(DataType.Date)]
        public DateTime? DOB { get; set; }
        [Display(Name = "Mobile Phone")]
        [Required]
        //[DataType(DataType.)]
        [RegularExpression(@"^[6-9]{1}[0-9]{9}$", ErrorMessage = "Invalid mobile phone number.")]

        public string MobilePhone { get; set; }
        [Display(Name = "Home Phone")]
        //  [DataType(DataType.PhoneNumber)]
      //  [RegularExpression(@"^[6-9]{1}[0-9]{9}$", ErrorMessage = "Invalid Home phone number.")]

        public string HomePhone { get; set; } 
        [Display(Name = "Nationality")]
        public string Nationality { get; set; }
        [Display(Name = "Religion")]
        public string ReligionId { get; set; } 
        [Display(Name = "CasteId")]
        public string CasteId { get; set; }
        [Display(Name = "Blood Group")]
        public string BloodGroup { get; set; } 
        [Display(Name = "Father Name")]
        //  [DataType(DataType.Text)]
        [RegularExpression(@"^[a-z A-Z]+$", ErrorMessage = "Invalid Fater Name")]
        public string FatherName { get; set; }
        [Display(Name = "Mother Name")]
        // [DataType(DataType.Text)]
        [RegularExpression(@"^[a-z A-Z]+$", ErrorMessage = "Invalid Mother Name")]
        public string MotherName { get; set; } 
        [Display(Name = "IsEsi")]
        public string IsEsi { get; set; }
        [Display(Name = "PF NO")]
        public string IsPF { get; set; } 
        [Display(Name = "Marital Status")]
        public string MaritalStatus { get; set; } 
        [Display(Name = "Teaching Type")]
        public string TeachingType { get; set; }
        [Display(Name = "Employee Replace With")]
        public string EmployeeReplacewith { get; set; }
        [Display(Name = "Employee Type")]
        public string EmployeeType { get; set; } 
        [Display(Name = "Employee TypeId")]
        public string EmployeeTypeId { get; set; }
        [Display(Name = "Bank")]
        public string Bank { get; set; }
        [Display(Name = "Account No")]
        public string AccountNo { get; set; }
        [Display(Name = "Gross Salary")]
        [Required]
        [RegularExpression(@"^[\d]+$", ErrorMessage = "Invalid Gross Salary")]
        public string GrossSalary { get; set; }
        [Display(Name = "Shift Code")]
        public string ShiftCode { get; set; }
        [Display(Name = "IFSC Code")]
        public string IFSCode { get; set; } 
        [Display(Name = "withdrawal Date")]
        [DataType(DataType.Date)]
        public DateTime? withdrawaldate { get; set; }
        [Display(Name = "Increment Date")]
        [DataType(DataType.Date)]
        public DateTime? Incrementdate { get; set; }
        [Display(Name = "PF NO")]
        public string PFNO { get; set; }   
        [Display(Name = "PAN NO")]
        public string PANNO { get; set; }
        [Display(Name = "Cost Center")]
        public string CostCenter { get; set; }
        [Display(Name = "Effective Date of Position")]
        [DataType(DataType.Date)]
        public DateTime? DoEffectivePos { get; set; }
        [Display(Name = "Sub Category Text")]
        public string SubCategoryText { get; set; }
        [Display(Name = "LMS Category")]
        public string LMSCategory { get; set; }
        [Display(Name = "LMS Sub Category")]
        public string LMSSubCategory { get; set; }
        public int? DISPLAYICON_GROSSSALARY { get; set; }
        public int? DISPLAYICONEFFECTIVEDATEOFPOSITION { get; set; }
        public int? DISPLAYICONEMPLOYEETYPE { get; set; }
        public string? update { get; set; }
        public string Amount { get; set; }



    }
    public class ManageEmployeeAttendence : Instance
    {

        [Required]
        [Display(Name = "Department")]
        public string InstanceClassificationId { get; set; }
        [Display(Name = "Sub Department")]
        [Required]
        public string InstanceSubClassificationId { get; set; }
        [Display(Name = "Month")]
        [Required]
        public string Month { get; set; }
        [Display(Name = "Year")]
        [Required]
        public string year { get; set; }
        [Display(Name = "Category Description ")]
        public string BioKey { get; set; }
        [Display(Name = "Category Description ")]
        public string LMSKey { get; set; }
        [Display(Name = "Category Description ")]
        public string CategoryId { get; set; }
        [Display(Name = "Category Description ")]
        public string SubCategoryID { get; set; }
        public string DaysDrop { get; set; }
        //-----------------------------------------------------------------
        public int Display1 { get; set; }
        public int Display2 { get; set; }
        public int Display3 { get; set; }
        public int Display4 { get; set; }
        public int Display5 { get; set; }
        public int Display6 { get; set; }
        public int Display7 { get; set; }
        public int Display8 { get; set; }
        public string AttendanceMonthly { get; set; }
        public string FirstName { get; set; }
        public string AdmissionNumber { get; set; }
        public string MobileNumber { get; set; }
        public string PortalEmail { get; set; }
        public string FullName { get; set; }
        public string Department { get; set; }
        public string WorkingDays { get; set; }
        public string PresentDays { get; set; }
        public string NumberofLeaves { get; set; }
        public string LossPayDays { get; set; }
        public string LateCominng { get; set; }
        public string EarlyGoing { get; set; }
        public double CL { get; set; }
        public double OD { get; set; }
        public int SmsFlag { get; set; }

    }
    public class ManageEmployeeAttendenceList : Instance
    {
        public int monthNo { get; set; }
        public int yearNo { get; set; }
        public int AttendanceMonthly { get; set; }

        public List<int> AdmissionNumber { get; set; }
        public List<int> Workingdays { get; set; }
        public List<int> Presentdays { get; set; }
        public List<int> NumberOfLeaves { get; set; }
        public List<int> LossOfPayDays { get; set; }
        public List<int> CL { get; set; }
        public List<int> OD { get; set; }
     
    }
    public class InsertPayslip : ManageEmployeeAttendenceList
    {
        public List<int> SalaryAttributesDetailsId { get; set; }
        public List<double> SalaryAmount { get; set; }
    }
    public class PGEsearch:Instance
    {
        [Required]
        public int Months { get; set; }
        [Required]
        public int Years { get; set; }

        [Required]
        public int DesignationId { get; set; }
        [Required]
        public int Category { get; set; }
        [Required]
        public int SubCategory { get; set; }
            public int Department { get; set; }
        
    }

    public class GeneratePaySlip : Instance
    {
        //public  List<ManageEmployeeAttendence> Information { get; set; }
        //public  List<ManageCategory> Deductions { get; set; }
        //public  List<ManageSubCategory> Earnings { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string InstanceUserCode { get; set; }
        public string AdmissionNumber { get; set; }
        public string DateofJoining { get; set; }
        public string Bank { get; set; }
        public string AccountNo { get; set; }
        public string BaseSalary { get; set; }
        public string GrassSalary { get; set; }
        public string AnnualSalary { get; set; }
        public string ClassificationName { get; set; }
        public string WorkingDays { get; set; }
        public string PresentDays { get; set; }
        public string LossofPayDays { get; set; }
        public string AbsentDays { get; set; }
        public string LA { get; set; }
        public string LE { get; set; }
        public string InstanceName { get; set; }
        public string Address { get; set; }
        public string SubDomineName { get; set; }
        public string PanNo { get; set; }
        public string Designation { get; set; }
        public string PfNo { get; set; }
        public string FatherName { get; set; }
        public string ConfirmedWorkingDays { get; set; }
        public string ConfirmedPresentDays { get; set; }
        public string ConfirmedLossPayDays { get; set; }
        public string ConfirmedNumberofLeaves { get; set; }
        public string Gender { get; set; }
        public string PayRollCategoryName { get; set; }
        public string CL { get; set; }
        public string OD { get; set; }
        public string ConfirmedCL { get; set; }
        public string ConfirmedOD { get; set; }
        public string SubClassficationName { get; set; }
        public string PaySlipDepartment { get; set; }
        public string BankName { get; set; }
        public string PortailEmail { get; set; }
        public string EmpId { get; set; }
        public string APGLINo { get; set; }
        //------------------------------------------------------
        public string SalaryAttributeMasterName { get; set; }
        public string SaleDependsOn { get; set; }
        public string Salary { get; set; }

    }
    public class GeneratePaySliplList
    {
        public List<GeneratePaySlip> generatepayslip { get; set; }
        public string AlreadyExists { get; set; }
        //  public List<ManageSubCategory> subcategory { get; set; }

    }


}
