using System.Threading.Tasks;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
 {
     public class ProfilesController : BaseController
     {
         [HttpGet("{username}")]
         public async Task<Profile> Get(string username)
         {
             return await Mediator.Send(new Details.Query{Username = username});
         }
         
         [HttpPut]
         public async Task<Unit> Edit(Edit.Command command)
         {
             return await Mediator.Send(command);
         }
     }
 }