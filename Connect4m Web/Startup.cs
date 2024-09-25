//using Microsoft.AspNetCore.Builder;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.HttpsPolicy;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation;

//using Connect4m_Web.Models.LMSproperties;
//using DinkToPdf.Contracts;
//using DinkToPdf;
//using Microsoft.AspNetCore.Http.Features;
//using System.IO;
//using Microsoft.AspNetCore.Authentication.Cookies;
//using OfficeOpenXml;

//using Microsoft.AspNetCore.Http;



//namespace LMS_Module
//{
//    public class Startup
//    {
//        ////OLD CODE START HERE
//        //public Startup(IConfiguration configuration)
//        //{
//        //    Configuration = configuration;
//        //}

//        //public IConfiguration Configuration { get; }

//        //// This method gets called by the runtime. Use this method to add services to the container.
//        //public void ConfigureServices(IServiceCollection services)
//        //{

//        //    //OLD CODE START HERE 
//        //    services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
//        //    //services.Configure<FormOptions>(options =>
//        //    //{
//        //    //    //options.MultipartBodyLengthLimit = 512 * 1024 * 1024; // Set the limit in bytes
//        //    //    options.MultipartBodyLengthLimit = 3221225472;
//        //    //});

//        //    //--------------------------------------------------------   App setting .json -start
//        //    //IConfiguration configuration = new ConfigurationBuilder()
//        //    //.SetBasePath(Directory.GetCurrentDirectory())
//        //    //.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
//        //    //.Build();

//        //    // services.Configure<AppSettings>(configuration.GetSection("AppSettings"));


//        //    services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//        //       .AddCookie(options =>
//        //       {
//        //           //options.Cookie.Name = "MyAppAuthCookie"; // Custom cookie name
//        //           //  options.Cookie.HttpOnly = true; // Ensure cookies are not accessible via JavaScript
//        //           //  options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Only send cookies over HTTPS
//        //           //  options.Cookie.SameSite = SameSiteMode.Strict; // Configure SameSite attribute
//        //             options.LoginPath = "/Attendance/AccessDenied";
//        //           options.AccessDeniedPath = "/Attendance/AccessDenied"; // Specify the access denied page
//        //         });

//        //    services.AddAuthorization(options =>
//        //    {
//        //        options.AddPolicy("AdminOnly", policy =>
//        //        policy.RequireRole("Admin"));

//        //        //options.AddPolicy("AdsManager", policy =>
//        //        //policy.RequireRole("AdsManager"));  // Or any other policy you define

//        //    });

//        //    services.AddSingleton<HttpClientFactory>();
//        //    services.AddHttpContextAccessor();

//        //    //------------------End
//        //    services.AddScoped<IUserService, UserService>();
//        //    services.AddScoped<PdfGenerator>();

//        //    //services.AddControllersWithViews().AddRazorRuntimeCompilation(); /*services.AddMvc().AddRazorRuntimeCompilation();*/
//        //    services.AddMvc().AddRazorRuntimeCompilation(); // Adds MVC services and Razor runtime compilation
//        //                                                    //OLD CODE END HERE 
//        //}

//        //// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//        //public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//        //{
//        //    //NEW CODE START HERE 
//        //    if (env.IsDevelopment())
//        //    {
//        //        app.UseDeveloperExceptionPage();
//        //    }
//        //    else
//        //    {
//        //        app.UseExceptionHandler("/Home/Error");
//        //        app.UseHsts();
//        //    }

//        //    app.UseHttpsRedirection();
//        //    app.UseStaticFiles();

//        //    app.UseRouting();

//        //    app.UseAuthentication(); // Ensure this is called before UseAuthorization
//        //    app.UseAuthorization();

//        //    app.UseEndpoints(endpoints =>
//        //    {
//        //        endpoints.MapControllerRoute(
//        //            name: "default",
//        //            pattern: "{controller=Attendance}/{action=LoginPage}/{id?}");
//        //    });
//        //    //NEW CODE END HERE 


//        //    ////OLD CODE START HERE

//        //    //if (env.IsDevelopment())
//        //    //{
//        //    //    app.UseDeveloperExceptionPage();
//        //    //}
//        //    //else
//        //    //{
//        //    //    app.UseExceptionHandler("/Home/Error");
//        //    //    // The default HSTS value is 30 days. You may want to change this for production scenarios.
//        //    //    app.UseHsts();
//        //    //}

//        //    //app.UseHttpsRedirection();
//        //    //app.UseStaticFiles();

//        //    ////If you need custom static files configuration, uncomment and adjust as needed
//        //    // //app.UseStaticFiles(new StaticFileOptions
//        //    // //{
//        //    // //    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "CustomStatic")),
//        //    // //    RequestPath = "/CustomStatic"
//        //    // //});

//        //    //app.UseRouting();

//        //    //// Ensure authentication comes before authorization
//        //    //app.UseAuthentication();
//        //    //app.UseAuthorization();

//        //    //app.UseEndpoints(endpoints =>
//        //    //{
//        //    //    endpoints.MapControllerRoute(
//        //    //        name: "default",
//        //    //        pattern: "{controller=Attendance}/{action=LoginPage}/{id?}");
//        //    //});


//        //    //if (env.IsDevelopment())
//        //    //{
//        //    //    app.UseDeveloperExceptionPage();
//        //    //}
//        //    //else
//        //    //{
//        //    //    app.UseExceptionHandler("/Home/Error");
//        //    //    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//        //    //    app.UseHsts();
//        //    //}
//        //    //app.UseHttpsRedirection();
//        //    //app.UseStaticFiles();

//        //    ////app.UseStaticFiles(new StaticFileOptions
//        //    ////{
//        //    ////    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "CustomStatic")),
//        //    ////    RequestPath = "/CustomStatic"

//        //    ////    //FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "CustomStatic")),
//        //    ////    //RequestPath = ""
//        //    ////});



//        //    //app.UseRouting();
//        //    //app.UseAuthentication();
//        //    //app.UseAuthorization();
//        //    //// ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

//        //    //app.UseEndpoints(endpoints =>
//        //    //{
//        //    //    endpoints.MapControllerRoute(
//        //    //        name: "default",
//        //    ////  pattern: "{controller=Videos}/{action=Chapter_wise_Video_playing}/{id?}");
//        //    //// pattern: "{controller=Videos}/{action=SimpleExpenseManagement}/{id?}");//SimpleExpenseManagement
//        //    //// pattern: "{controller=Videos}/{action=ExpensiveReport}/{id?}");//SimpleExpenseManagement
//        //    ////   pattern: "{controller=Home}/{action=Trail3}/{id?}");//SearchUploadlecturedocs
//        //    ////pattern: "/PayRoll/StepsControl?url=SearchEmployeeDetails");


//        //    //pattern: "{controller=Attendance}/{action=LoginPage}/{id?}");//Recently Comment
//        //    //                                                             // pattern: "{controller=Users}/{action=LoginPage}/{id?}");//Recently Comment

//        //    //     //pattern: "Users/{action=LoginPage}/{id?}",
//        //    //     //defaults: new { controller = "Attendance" });
//        //    // });


//        //    ////var licenseManagerType = typeof(System.ComponentModel.LicenseManager);
//        //    ////var usageModeProperty = licenseManagerType.GetProperty("UsageMode");
//        //    ////usageModeProperty?.SetValue(null, System.ComponentModel.LicenseUsageMode.Runtime, null);
//        //    ////OLD CODE END HERE


//        //}

//        ////OLD CODE END HERE

//        ////NEW CODE START HERE 
//        //public Startup(IConfiguration configuration)
//        //{
//        //    Configuration = configuration;
//        //}

//        //public IConfiguration Configuration { get; }

//        //public void ConfigureServices(IServiceCollection services)
//        //{
//        //    // Configure services
//        //    services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

//        //    // Configure form options if needed
//        //    // services.Configure<FormOptions>(options =>
//        //    // {
//        //    //     options.MultipartBodyLengthLimit = 3221225472; // 3 GB limit
//        //    // });

//        //    // Add authentication and authorization
//        //    services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//        //        .AddCookie(options =>
//        //        {
//        //            options.LoginPath = "/Attendance/AccessDenied";
//        //            options.AccessDeniedPath = "/Attendance/AccessDenied";
//        //        });

//        //    //services.AddAuthorization(options =>
//        //    //{
//        //    //    options.AddPolicy("AdminOnly", policy =>
//        //    //        policy.RequireRole("Admin"));
//        //    //});

//        //    // Register other services
//        //    services.AddSingleton<HttpClientFactory>();
//        //    services.AddHttpContextAccessor();
//        //    services.AddScoped<IUserService, UserService>();
//        //    services.AddScoped<PdfGenerator>();

//        //    // Add MVC services and Razor runtime compilation
//        //    services.AddMvc().AddRazorRuntimeCompilation();
//        //}

//        //public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//        //{
//        //    if (env.IsDevelopment())
//        //    {
//        //        app.UseDeveloperExceptionPage();
//        //    }
//        //    else
//        //    {
//        //        app.UseExceptionHandler("/Home/Error");
//        //        app.UseHsts();
//        //    }

//        //    app.UseHttpsRedirection();
//        //    app.UseStaticFiles();// Ensure static files middleware is enabled

//        //    app.UseRouting();
//        //    app.UseAuthentication(); // Ensure this is called before UseAuthorization
//        //    app.UseAuthorization();

//        //    app.UseEndpoints(endpoints =>
//        //    {
//        //        endpoints.MapControllerRoute(
//        //            name: "default",
//        //            pattern: "{controller=Attendance}/{action=LoginPage}/{id?}");
//        //    });
//        //}

//        ////NEW CODE START HERE

//    }
//}


using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation;

using Connect4m_Web.Models.LMSproperties;
using DinkToPdf.Contracts;
using DinkToPdf;
using Microsoft.AspNetCore.Http.Features;
using System.IO;
using Microsoft.AspNetCore.Authentication.Cookies;
using OfficeOpenXml;


namespace LMS_Module
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
            //services.Configure<FormOptions>(options =>
            //{
            //    //options.MultipartBodyLengthLimit = 512 * 1024 * 1024; // Set the limit in bytes
            //    options.MultipartBodyLengthLimit = 3221225472;
            //});

            //--------------------------------------------------------   App setting .json -start
            //IConfiguration configuration = new ConfigurationBuilder()
            //.SetBasePath(Directory.GetCurrentDirectory())
            //.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            //.Build();

            // services.Configure<AppSettings>(configuration.GetSection("AppSettings"));


            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
               .AddCookie(options =>
               {
                   options.LoginPath = "/Attendance/AccessDenied";
                   options.AccessDeniedPath = "/Attendance/AccessDenied"; // Specify the access denied page

               });


            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy =>
                    policy.RequireRole("Admin"));
            });

            services.AddSingleton<HttpClientFactory>();
            services.AddHttpContextAccessor();

            //------------------End
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<PdfGenerator>();

            services.AddControllersWithViews().AddRazorRuntimeCompilation(); /*services.AddMvc().AddRazorRuntimeCompilation();*/
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            //If you need custom static files configuration, uncomment and adjust as needed
            //app.UseStaticFiles(new StaticFileOptions
            //{
            //    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "CustomStatic")),
            //    RequestPath = "/CustomStatic"
            //});

            app.UseRouting();

            // Ensure authentication comes before authorization
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Attendance}/{action=LoginPage}/{id?}");
            });


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            //app.UseStaticFiles(new StaticFileOptions
            //{
            //    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "CustomStatic")),
            //    RequestPath = "/CustomStatic"

            //    //FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "CustomStatic")),
            //    //RequestPath = ""
            //});



            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            // ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
            //  pattern: "{controller=Videos}/{action=Chapter_wise_Video_playing}/{id?}");
            // pattern: "{controller=Videos}/{action=SimpleExpenseManagement}/{id?}");//SimpleExpenseManagement
            // pattern: "{controller=Videos}/{action=ExpensiveReport}/{id?}");//SimpleExpenseManagement
            //   pattern: "{controller=Home}/{action=Trail3}/{id?}");//SearchUploadlecturedocs
            //pattern: "/PayRoll/StepsControl?url=SearchEmployeeDetails");


            pattern: "{controller=Attendance}/{action=LoginPage}/{id?}");//Recently Comment
                                                                         // pattern: "{controller=Users}/{action=LoginPage}/{id?}");//Recently Comment

                //pattern: "Users/{action=LoginPage}/{id?}",
                //defaults: new { controller = "Attendance" });
            });


            //var licenseManagerType = typeof(System.ComponentModel.LicenseManager);
            //var usageModeProperty = licenseManagerType.GetProperty("UsageMode");
            //usageModeProperty?.SetValue(null, System.ComponentModel.LicenseUsageMode.Runtime, null);
        }

    }
}
