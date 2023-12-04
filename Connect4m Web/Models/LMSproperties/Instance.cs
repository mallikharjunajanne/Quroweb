using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Net.Http;
using Microsoft.Extensions.Configuration;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;

namespace Connect4m_Web.Models.LMSproperties
{
    public class Instance
    {
        public int InstanceId { get; set; }
        public int UserId { get; set; }
        [Display(Name = "Role")]
        [Required]
        public int RoleId { get; set; }
        public int CreatedBy { get; set; }
    }
    public class CommonDropdown
    {
        public string[]  Parameters { get; set; }
        public string procedurename { get; set; }
        public string text { get; set; }
        public string value { get; set; }
    }
    public class CommonDropdown2:CommonDropdown
    {
        public List<string> Extraparameters { get; set; }
    }
        public class SubClassifications
    {
        public int InstanceClassificationId { get; set; }
        public string ClassificationName { get; set; }
        public int ProgramType { get; set; }

        public int InstanceSubClassificationId { get; set; }
        public string SubClassificationName { get; set; }
        public string DisplayOrder { get; set; }
        public string Startdate { get; set; }
        public string EndDate { get; set; }
    }
    public class Mentors
    {
        public string MentorName { get; set; }
        public string Qulification { get; set; }

    }
    public class Subclassfications_MS
    {
        public List<SubClassifications> subclassfication { get; set; }
        public List<Mentors> mentors { get; set; }
    }
    public class ChangeActivity
    {
        public int AuditTrailId { get; set; }
        public string AuditKey { get; set; }
       
        [Display(Name = "Current Value")]
        public string CurrentValue { get; set; }
        [Display(Name = "Previous Value")]
        public string PreviousValue { get; set; }
        [Display(Name = "Previous Value CreateBy")]
        public string PreviousValueCreateBy { get; set; }
        [Display(Name = "Current Value CreateBy")]
        public string CurrentValueCreateBy { get; set; }
        [Display(Name = "Current Value CreateDate")]
        public string CurrentValueCreateDate { get; set; }
    }


    public static class FileHelper
    {
        public static string GetFileExtension(string fileName)
        {
            return Path.GetExtension(fileName);
        }
    }

    //----------------------------------------   Creating Class For CommonMethods of all

    public class HttpClientFactory
    {
        private readonly string _baseAddress;

        public HttpClientFactory(IConfiguration configuration)
        {
            _baseAddress = configuration["AppSettings:ApiBaseAddress"];
        }

        public HttpClient CreateClient()
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(_baseAddress);
            return client;
        }
    }
    public class AppSettings
    {
        public string ApiBaseAddress { get; set; }
    }





    //----------------------------------------   Creating Class For CommonMethods of all
    public class Commonclass
    {
        public List<SelectListItem> GetYears()
        {
            int currentYear = DateTime.Now.Year+1;
            List<SelectListItem> yearItems = new List<SelectListItem>();

            for (int year = 2010; year <= currentYear; year++)
            {
                yearItems.Add(new SelectListItem
                {
                    Text = year.ToString(),
                    Value = year.ToString()
                });
            }

            return yearItems;
        }
        //================================================================   Number To Word

        public string NumberToWords(int number)
        {
            if (number == 0)
            {
                return "Zero";
            }

            string[] units = { "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine" };
            string[] teens = { "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
            string[] tens = { "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };
            string[] thousands = { "", "Thousand", "Million", "Billion" };

            int group = 0;
            string result = "";

            while (number > 0)
            {
                int chunk = number % 1000;
                if (chunk != 0)
                {
                    if (result != "")
                    {
                        result = " and " + result;
                    }

                    result = ConvertChunkToWords(chunk, units, teens, tens) + " " + thousands[group] + " " + result;
                }

                number /= 1000;
                group++;
            }

            return result + " Only";
        }

        private string ConvertChunkToWords(int number, string[] units, string[] teens, string[] tens)
        {
            string words = "";

            if (number >= 100)
            {
                words += units[number / 100] + " Hundred";
                number %= 100;
                if (number != 0)
                {
                    words += " and ";
                }
            }

            if (number >= 20)
            {
                words += tens[number / 10 - 1];
                number %= 10;
                if (number != 0)
                {
                    words += "-";
                }
            }

            if (number > 0)
            {
                if (number < 10)
                {
                    words += units[number];
                }
                else
                {
                    words += teens[number - 11];
                }
            }

            return words;
        }

       

    }
    //for convert Password Into hashtab like a92a3c59e86c6143e88d412ebb8cc4a7970530e6397e5e12af2f57281fdc522b ==>
    public class HashUtility
    {
        public static string HashData(string data)
        {
            using (SHA256 hasher = SHA256Managed.Create())
            {
                byte[] hashedData = hasher.ComputeHash(Encoding.Unicode.GetBytes(data));

                // Now we'll make it into a hexadecimal string for saving
                StringBuilder sb = new StringBuilder(hashedData.Length * 2);
                foreach (byte b in hashedData)
                {
                    sb.AppendFormat("{0:x2}", b);
                }
                return sb.ToString();
            }
        }
    }




}
