using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Angular.SecureStarter.Models;
using System.Data.Entity;

namespace Angular.SecureStarter
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    public class ApplicationUserManager : UserManager<ApplicationUser>
    {
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<ApplicationDbContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }

        // Microsoft.AspNet.Identity.UserManager<TUser, TKey>
        /// <summary>
        ///     Return a user with the specified  id (username or password) or null if there is no match.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public override async Task<ApplicationUser> FindAsync(string id, string password)
        {
            ApplicationUser user = await this.Users.FirstOrDefaultAsync(au => au.Email == id || au.UserName == id);

            ApplicationUser result;

            if (user == null)
            {
                result = default(ApplicationUser);
            }
            else
            {
                result = ((await this.CheckPasswordAsync(user, password).ConfigureAwait(false)) ? user : default(ApplicationUser));
            }

            return result;
        }

    }
}
