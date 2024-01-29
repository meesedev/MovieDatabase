namespace RestAPI.Models
{
    public class MovieInfo
    {
        public DateTime Release_Date { get; set; }
        public string? Title { get; set; }
        public string? Overview { get; set; }
        public decimal Populatiry { get; set; }
        public decimal Vote_Count { get; set; }
        public int Vote_Average { get; set; }
        public string? Original_Language { get; set; }
        public string? Genre { get; set; }
        public string? Poster_Url { get; set; }

    }
}