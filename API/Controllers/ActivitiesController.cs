using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<List<Activity>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}", Name = "GetDetails")]
        public async Task<Activity> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> Create(Create.Command command)
        {
            var result = await Mediator.Send(command);
            return CreatedAtRoute("GetDetails", new {id = command.Id}, null);
        }

        [HttpPut("{id}")]
        public async Task<Unit> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<Unit> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }
    }
}