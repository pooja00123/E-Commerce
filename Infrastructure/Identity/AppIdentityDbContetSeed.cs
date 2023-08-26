﻿using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    internal class AppIdentityDbContetSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Bobbity",
                        Street = "10 The street",
                        City = "New York",
                        State = "NY",
                        Zipcode = "12345"
                    }
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}
