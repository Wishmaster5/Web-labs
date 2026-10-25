using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Task_5.Data;
using Task_5.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddDbContext<Task_5Context>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Task_5Context") ?? throw new InvalidOperationException("Connection string 'Task_5Context' not found.")));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    BookData.Initialize(services);
    TextBookData.Initialize(services);
}


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();
