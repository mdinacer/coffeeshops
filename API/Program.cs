using API.Data;
using API.Extensions;
using API.Middleware;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCustomServices();
builder.Services.AddSwaggerConfig();
builder.Services.AddDatabaseConfig(builder.Configuration);
builder.Services.AddCorsPolicy();
builder.Services.AddIdentityConfig();
builder.Services.AddAuthenticationConfig(builder.Configuration);
builder.Services.AddAuthorizationConfig();
builder.Services.AddResponseCompression(options => { options.EnableForHttps = true; });


// Create and migrate database
await DatabaseMigrator.Migrate(builder);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseResponseCompression();

app.UseRouting();

app.UseDefaultFiles();

app.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = false,
    OnPrepareResponse = ctx =>
    {
        ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=2592000");
        ctx.Context.Response.Headers[HeaderNames.Expires] =
            new[] { DateTime.UtcNow.AddDays(30).ToString("R") }; // Format RFC1123
    }
});

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToController("Index", "Fallback");

app.Run();
