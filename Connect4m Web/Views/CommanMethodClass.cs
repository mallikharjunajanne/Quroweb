using Newtonsoft.Json;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Connect4m_Web.Views
{
    public class CommanMethodClass
    {
        //public List<T> CommonListMethod<T>(T obj, string WebApiMethodname, HttpClient client)
        //{
        //    //  string className = obj.GetType().Name;
        //    //  List<T> Values = new List<T>();

        //    string data = JsonConvert.SerializeObject(obj);
        //    StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
        //    HttpResponseMessage response = client.PostAsync(client.BaseAddress + WebApiMethodname, content).Result;
        //    if (response.IsSuccessStatusCode)
        //    {
        //        string data1 = response.Content.ReadAsStringAsync().Result;
        //        return JsonConvert.DeserializeObject<List<T>>(data1);
        //    }
        //    return new List<T>();
        //}

        //caling function
        //   List<DropdownClass> list = CommonMethodobj.CommonListMethod<DropdownClass, DropdownClass>(obj, "/DdlExams_Callingfunction", client);

        public List<TOutput> CommonListMethod<TInput, TOutput>(TInput obj, string WebApiMethodname, HttpClient client)
        {
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + WebApiMethodname, content).Result;
            
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject<List<TOutput>>(data1);
            }
            //  below is to find error
              var errorContent = response.Content.ReadAsStringAsync().Result;
            return new List<TOutput>();
        }

        public string CommonSaveMethod<T>(T obj, string WebApiMethodname, HttpClient client)
        {
            //return "0";
            string returnval = "";
            //  string className = obj.GetType().Name;
            //  List<T> Values = new List<T>();
            string data = JsonConvert.SerializeObject(obj);
            StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
            HttpResponseMessage response = client.PostAsync(client.BaseAddress + WebApiMethodname, content).Result;
            if (response.IsSuccessStatusCode)
            {
                return returnval = response.Content.ReadAsStringAsync().Result;
            }
            //This is to find error
            var errorContent = response.Content.ReadAsStringAsync().Result;
            return "0";
        }


        public List<T> CommonDropDownMethod(HttpClient client, string controllerName, string WebApiMethodname)
        {
            //  string className = obj.GetType().Name;
            //  List<T> Values = new List<T>();
            string endpoint;
            if (controllerName != null)
            {
                endpoint = $"{client.BaseAddress}{controllerName}{WebApiMethodname}";
            }
            else
            {
                endpoint = $"{client.BaseAddress}/{WebApiMethodname}";
            }

            //HttpResponseMessage response = client.GetAsync(client.BaseAddress + WebApiMethodname).Result;

              HttpResponseMessage response = client.GetAsync(endpoint).Result;

            //HttpResponseMessage response = client.GetAsync($"{client.BaseAddress}{controllerName}/" + WebApiMethodname).Result;
            // HttpResponseMessage response = client.GetAsync(client.BaseAddress + "/GetShort_Description_for_Leave_Reason2?CodeName=" + CodeName).Result;
            if (response.IsSuccessStatusCode)
            {
                string data1 = response.Content.ReadAsStringAsync().Result;
                return JsonConvert.DeserializeObject<List<T>>(data1);
            }
            return new List<T>();
        }

    }
}
