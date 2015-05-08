using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Secured.Controllers
{
    [Authorize]
    public class SecuredController : ApiController
    {
        // GET: api/Secured
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Secured/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Secured
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Secured/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Secured/5
        public void Delete(int id)
        {
        }
    }
}
