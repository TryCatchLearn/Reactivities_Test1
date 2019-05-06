using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedDataAsync(DataContext context)
        {
            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Id = Guid.NewGuid(),
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                    },
                    new Activity
                    {
                        Id = Guid.NewGuid(),
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "Culture",
                        City = "Paris",
                        Venue = "The Louvre",
                    },
                    new Activity
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Category = "Music",
                        City = "London",
                        Venue = "Wembly Stadium",
                    },
                    new Activity
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "Food",
                        City = "London",
                        Venue = "Jamies Italian",
                    },
                    new Activity
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                    },
                    new Activity
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Category = "Culture",
                        City = "London",
                        Venue = "British Museum",
                    },
                    new Activity
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Punch and Judy",
                    },
                    new Activity
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "Music",
                        City = "London",
                        Venue = "O2 Arena",
                    },
                    new Activity
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 7 months in future",
                        Category = "Travel",
                        City = "Berlin",
                        Venue = "All",
                    },
                    new Activity
                    {
                        Id = Guid.NewGuid(),
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "Drinks",
                        City = "London",
                        Venue = "Pub",
                    }
                };

                context.Activities.AddRange(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}