using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieLookup
{
    public class Database
    {
        public static Media[] data;

        public static List<Media> query(string queryStr)
        {
            //search, type, genre, year, sortBy
            string[] queryVals = queryStr.Split('&');

            List<Media> resultList = new List<Media>(data);

            //missing sortBY so far
            resultList = typeQ(queryVals[1], resultList);
            resultList = genreQ(queryVals[2], resultList);
            resultList = yearQ(queryVals[3], resultList);
            resultList = searchQ(queryVals[0], resultList);
            resultList = sortByQ(queryVals[4], resultList);

            if (resultList.Count <= 50) return resultList;
            else
            {
                List<Media> trimmedResult = new List<Media>();
                for (int i = 0; i < 50; i++) trimmedResult.Add(resultList[i]);

                return trimmedResult;
            }
        }

        public static List<Media> searchQ(string queryStr, List<Media> entries)
        {
            if (queryStr.Equals("")) return entries;

            List<Media> resultList = new List<Media>();

            foreach(Media entry in entries)
            {
                if(entry.title.Contains(queryStr) || entry.actors.Contains(queryStr) || entry.director.Contains(queryStr))
                {
                    resultList.Add(entry);
                }
            }    

            return resultList;
        }

        public static List<Media> typeQ(string queryStr, List<Media> entries)
        {
            if (queryStr.Equals("Any")) return entries;

            List<Media> resultList = new List<Media>();

            foreach (Media entry in entries)
            {
                if (entry.type.Equals(queryStr)) resultList.Add(entry);
            }

            return resultList;
        }

        public static List<Media> genreQ(string queryStr, List<Media> entries)
        {
            if (queryStr.Equals("Any")) return entries;

            List<Media> resultList = new List<Media>();

            foreach (Media entry in entries)
            {
                if (entry.genre.Contains(queryStr))
                {
                    resultList.Add(entry);
                }
            }

            return resultList;
        }

        //currently taking any year above query Var, change to inRange
        public static List<Media> yearQ(string queryStr, List<Media> entries)
        {
            if (queryStr.Equals("Any:Any")) return entries;
            int minYear = 1894, maxYear = 2023;

            string[] yearVals = queryStr.Split(':');

            bool first = Int32.TryParse(yearVals[0], out minYear);
            bool second = Int32.TryParse(yearVals[1], out maxYear);

            if (!first) minYear = 1894;
            if (!second) maxYear = 2023;

            if (minYear > maxYear)
            {
                int temp = minYear;
                minYear = maxYear;
                maxYear = temp;
            }

            List<Media> resultList = new List<Media>();

            foreach (Media entry in entries)
            {
                String[] vals = entry.year.Split('-');
                int firstEntry = 0;

                bool status = Int32.TryParse(vals[0], out firstEntry);
                if (status)
                {
                    if(firstEntry >= minYear && firstEntry <= maxYear)
                    {
                        resultList.Add(entry);
                        continue;
                    }
                }
            }

            return resultList;
        }

        /*
         *  <option value="ImdbA">IMDB Score (Best)</option>
            <option value="ImdbD">IMDB Score (Worst)</option>
            <option value="MetascoreA">MetaScore (Best)</option>
            <option value="MetascoreD">MetaScore (Worst)</option>
            <option value="YearA">Year (New)</option>
            <option value="YearD">Year (Old)</option>
         */
        public static List<Media> sortByQ(string queryStr, List<Media> entries)
        {
            if (queryStr.Equals("Default")) return entries;
            else if (queryStr.Equals("ImdbA"))
            {
                IEnumerable<Media> temp = entries.OrderBy(a => a, new imdbRatingCompare());
                return temp.ToList();
            }
            else if (queryStr.Equals("MetascoreA"))
            {
                IEnumerable<Media> temp = entries.OrderBy(a => a, new MetaRatingCompare());
                return temp.ToList();
            }
            else if (queryStr.Equals("A2Z"))
            {
                IEnumerable<Media> temp = entries.OrderBy(a => a, new titleCompare());
                return temp.ToList();
            }
            else
            {
                //Z2A
                IEnumerable<Media> temp = entries.OrderByDescending(a => a, new titleCompare());
                return temp.ToList();
            }
        }

        public static void initialize(Media[] d)
        {
            data = d;
            sortByVotes();
        }
        
        public static void sortByVotes()
        {
            Array.Sort(data, new VoteCompare());
        }

    }

    public class VoteCompare : IComparer<Media>
    {
        public int Compare(Media x, Media y)
        {
            return (y.imdbVotes - x.imdbVotes);
        }
    }

    public class imdbRatingCompare : IComparer<Media>
    {
        // reverse sort highest to lowest
        public int Compare(Media x, Media y)
        {
            float xRate = 0, yRate = 0;

            if (!float.TryParse(x.imdbRating, out xRate)) xRate = 0;
            if (!float.TryParse(y.imdbRating, out yRate)) yRate = 0;
                

            return (int) Math.Round((yRate - xRate)*100);
        }
    }

    public class MetaRatingCompare : IComparer<Media>
    {
        // reverse sort highest to lowest
        public int Compare(Media x, Media y)
        {
            int xRate = 0, yRate = 0;

            if (!int.TryParse(x.metascore, out xRate)) xRate = 0;
            if (!int.TryParse(y.metascore, out yRate)) yRate = 0;


            return yRate - xRate;
        }
    }

    public class titleCompare : IComparer<Media>
    {
        //sort a to z
        public int Compare(Media x, Media y)
        {
            return x.title.CompareTo(y.title);
        }
    }

    public class yearCompare : IComparer<Media>
    {
        // reverse sort newest to oldest
        public int Compare(Media x, Media y)
        {
            int xYear = 0, yYear = 0;
            
            bool isValidX = int.TryParse(x.year.Split("-")[0], out xYear);
            bool isValidY = int.TryParse(y.year.Split("-")[0], out yYear);

            if (!isValidX && !isValidY) return y.imdbVotes.CompareTo(x.imdbVotes);
            else if (!isValidX) return -1;
            else if (!isValidY) return 1;
            else
            {
                return yYear - xYear;
            }
        }
    }

}
