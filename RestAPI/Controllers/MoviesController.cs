using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json;
using System.Data;
using System.Net;

namespace RestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        public MoviesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }




        [Authorize]
        [HttpGet]
        [Route("searchMovies")]
        public string searchMovies(string? searchText="", int? resultsPerPage=10, string? filterTitle="", string? filterActors="", string? sortBy="title", int? pageNumber=1,string? SelectedGenres= "")
        {
            using (SqlConnection _con = new SqlConnection(_configuration.GetConnectionString("MovieCon").ToString()))
            {
                using (SqlCommand _cmd = new SqlCommand("usp_GetMovies", _con))
                {
                    _cmd.CommandType = CommandType.StoredProcedure;
                    _cmd.Parameters.Add("@searchText", SqlDbType.VarChar).Value = searchText;
                    _cmd.Parameters.Add("@resultsPerPage", SqlDbType.Int).Value = resultsPerPage;
                    _cmd.Parameters.Add("@filterTitle", SqlDbType.VarChar).Value = filterTitle;
                    _cmd.Parameters.Add("@filterActors", SqlDbType.VarChar).Value = filterActors;
                    _cmd.Parameters.Add("@sortBy", SqlDbType.VarChar).Value = sortBy;
                    _cmd.Parameters.Add("@SelectedGenres", SqlDbType.VarChar).Value = SelectedGenres;
                    _cmd.Parameters.Add("@pageNumber", SqlDbType.Int).Value = pageNumber;
                    _con.Open();
                    _cmd.ExecuteNonQuery();
                    SqlDataAdapter _dap = new SqlDataAdapter(_cmd);
                    DataSet ds = new DataSet();
                    _dap.Fill(ds,"dsData");
                    _con.Close();

                    return JsonConvert.SerializeObject(ds);

                }
            }
        }


        [Authorize]
        [HttpGet]
        [Route("getGenres")]
        public string getGenres()
        {
            using (SqlConnection _con = new SqlConnection(_configuration.GetConnectionString("MovieCon").ToString()))
            {
                using (SqlCommand _cmd = new SqlCommand("usp_GetGenres", _con))
                {
                    _cmd.CommandType = CommandType.StoredProcedure;
                    _con.Open();
                    _cmd.ExecuteNonQuery();
                    DataTable dt = new DataTable();
                    SqlDataAdapter _dap = new SqlDataAdapter(_cmd);
                    _dap.Fill(dt);
                    _con.Close();
                    if (dt.Rows.Count > 0)
                    {
                        return JsonConvert.SerializeObject(dt);
                    }
                }
            }
            return "No Records";
        }

    }
}
