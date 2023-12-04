using Newtonsoft.Json;
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
            //  var errorContent = response.Content.ReadAsStringAsync().Result;
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
            //var errorContent = response.Content.ReadAsStringAsync().Result;
            return "0";
        }
    }
}
