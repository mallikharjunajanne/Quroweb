using System;
using System.Security.Cryptography;
using System.IO;
using System.Text;

namespace Connect4m_Web.Models
{
    public class Encrypt_Decrypt
    {
	
	private static string key = "18pc1a0313nngps7128hads2023adsso";
	
		public static string EncryptString(string plainInput)
	{
			
			byte[] iv = new byte[16];
		byte[] array;
		using (Aes aes = Aes.Create())
		{
			aes.Key = Encoding.UTF8.GetBytes(key);
			aes.IV = iv;
			ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
			using (MemoryStream memoryStream = new MemoryStream())
			{
				using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
				{
					using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
					{
						streamWriter.Write(plainInput);
					}

					array = memoryStream.ToArray();
				}
			}
		}

		return Convert.ToBase64String(array);
	}

	public static string DecryptString(string cipherText)
	{
		byte[] iv = new byte[16];
		byte[] buffer = Convert.FromBase64String(cipherText);
		using (Aes aes = Aes.Create())
		{
			aes.Key = Encoding.UTF8.GetBytes(key);
			aes.IV = iv;
			ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
			using (MemoryStream memoryStream = new MemoryStream(buffer))
			{
				using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, decryptor, CryptoStreamMode.Read))
				{
					using (StreamReader streamReader = new StreamReader((Stream)cryptoStream))
					{
						return streamReader.ReadToEnd();
					}
				}
			}
		}
	}

	}
}
//public static void Main()
//{
//	// declaring key


//	// encrypt parameters
//	var input = string.Concat("https://myDomain.in/", "Encrypt.aspx?query=", EncryptString(string.Format("emailID={0}", "myemail@gmail.com")));

//	Console.WriteLine("Encrypted Input: " + input);

//	// decrypt parameters
//	var decrptedInput = DecryptString(input.Substring(input.IndexOf("=") + 1));
//	Console.WriteLine("Decrypted Input: " + decrptedInput);
//}