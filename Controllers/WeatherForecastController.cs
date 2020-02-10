using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace MovieLookup.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<Media> Get()
        {
            List<Media> starterData = new List<Media>();
            for(int i = 0; i < 50; i++)
            {
                starterData.Add(Database.data[i]);
            }

            return starterData;
        }


        [Route("{query}")]
        public List<Media> Get(string query) 
        {
            List<Media> starterData = Database.query(query);

            return starterData;
        }
    }
}
