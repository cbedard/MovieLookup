using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace MovieLookup
{
    public class Program
    {
        public static void Main(string[] args)
        {
            initData();
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        public static void initData()
        {
            string[] rawData = System.IO.File.ReadAllLines("./movieData/moviesOMDB.txt");

            Media[] objectData = new Media[rawData.Length];
            
            for(int i = 0; i < rawData.Length; i++)
            {
                objectData[i] = new Media(rawData[i]);
            }

            Database.initialize(objectData);
        }
    }
}

