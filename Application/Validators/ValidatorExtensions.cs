using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> 
            ruleBuilder, int minimumLength = 6)
        {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(minimumLength).WithMessage("Password must be at least 6 characters")
                .Matches("[A-Z]").WithMessage("Password must contain 1 uppercase letter")
                .Matches("[a-b]").WithMessage("Password must contain 1 lowercase letter")
                .Matches("[0-9]").WithMessage("Password must contain 1 number character")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain 1 non alphanumeric character");
            return options;
        }
    }
}