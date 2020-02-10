using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieLookup
{
    public class Media
    {
        public string imdbID { get; set; }
        public string title { get; set; }
        public string type { get; set; }
        public string year { get; set; }
        public string releaseDate { get; set; }
        public string director { get; set; }
        public string runtime { get; set; }
        public string plot { get; set; }
        public string poster { get; set; }
        public string actors { get; set; }
        public string metascore { get; set; }
        public string imdbRating { get; set; }
        public int imdbVotes { get; set; }
        public string boxOffice { get; set; }
        public string country { get; set; }
        public string language { get; set; }
        public string genre { get; set; }
        public string rated { get; set; }
        public string writer { get; set; }

        public Media(String inputLine)
        {
            int delimeter = 9;
            // 9  ==> \t 
            char _delimeter = Convert.ToChar(delimeter);
            string[] lineData = inputLine.Split(_delimeter);

            imdbID = lineData[0];
            title = lineData[1];
            type = lineData[2];
            year = lineData[3];
            releaseDate = lineData[4];
            director = lineData[5];
            runtime = lineData[6];
            plot = lineData[7];
            poster = lineData[8];
            actors = lineData[9];
            metascore = lineData[10];
            imdbRating = lineData[11];

            int result;
            lineData[12] = lineData[12].Replace(",", "");
            Int32.TryParse(lineData[12], out result);
            imdbVotes = result;

            boxOffice = lineData[13];
            country = lineData[14];
            language = lineData[15];
            genre = lineData[16];
            rated = lineData[17];
            writer = lineData[18];
        }

        /*
         * string s1 = 
        mov1.imdbID + 
        mov1.Title + "\t" +
        mov1.Type + "\t" + 
        mov1.Year + "\t" + 
        mov1.Date + "\t" +
        mov1.Director + "\t" + 
        mov1.Runtime + "\t" + 
        mov1.Plot + "\t" + 
        mov1.Poster + "\t" + 
        mov1.Actors + "\t" +
        mov1.Metascore + "\t" + 
        mov1.imdbRating + "\t" + 
        mov1.imdbVotes + "\t" + 
        mov1.BoxOffice + "\t" +
        mov1.Country + "\t" + 
        mov1.Language;
         * 
         */
    }
}
