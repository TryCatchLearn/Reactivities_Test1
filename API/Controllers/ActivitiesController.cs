using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<List<Activity>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}", Name = "GetDetails")]
        public async Task<Activity> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> Create(Create.Command command)
        {
            var result = await _mediator.Send(command);
            return CreatedAtRoute("GetDetails", new {id = command.Id}, null);
        }

        [HttpPut("{id}")]
        public async Task<Unit> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<Unit> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command{Id = id});
        }
    }
}