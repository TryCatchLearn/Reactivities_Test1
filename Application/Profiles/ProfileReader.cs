using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        private readonly IMapper _mapper;

        public ProfileReader(DataContext context, IUserAccessor userAccessor, IMapper mapper)
        {
            _context = context;
            _userAccessor = userAccessor;
            _mapper = mapper;
        }
        
        public async Task<Profile> ReadProfile(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                throw new RestException(HttpStatusCode.BadRequest, new {User = "Not found"});

            var currentUser =
                await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

            var profile = _mapper.Map<AppUser, Profile>(user);

            if (currentUser.Following.Any(x => x.TargetId == user.Id))
                profile.IsFollowed = true;

            profile.FollowersCount = user.Followers.Count();
            profile.FollowingCount = user.Following.Count();

            return profile;
        }
    }
}