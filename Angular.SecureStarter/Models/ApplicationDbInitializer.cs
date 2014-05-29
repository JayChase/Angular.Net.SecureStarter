using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Helpers;

namespace Angular.SecureStarter.Models
{
    public class ApplicationDbInitializer: CreateDatabaseIfNotExists<ApplicationDbContext>
    {
        protected override void Seed(ApplicationDbContext context)
        {
            var adminRole = new IdentityRole { Name = "administrator" };
            var userRole = new IdentityRole { Name = "user" };

            context.Roles.Add(adminRole);
            context.Roles.Add(userRole);

            var hash = Crypto.HashPassword("Administrator");

            var adminUser = new ApplicationUser { UserName = "Administrator", PasswordHash = hash };

            context.Users.Add(adminUser);

            context.SaveChanges();

            adminUser.Roles.Add(new IdentityUserRole { UserId = adminUser.Id, RoleId = adminRole.Id  });
            adminUser.Roles.Add(new IdentityUserRole { UserId = adminUser.Id, RoleId = userRole.Id });
        }
    }
}