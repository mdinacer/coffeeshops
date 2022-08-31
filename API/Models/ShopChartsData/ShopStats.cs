namespace API.Models.ShopChartsData;

public class ShopStats
{
    public StatsElement Annual { get; set; } = new() {Title = "Annual"};
    public StatsElement Monthly { get; set; } = new() {Title = "Monthly"};
    public StatsElement Weekly { get; set; } = new() {Title = "Weekly"};
    public StatsElement Daily { get; set; } = new() {Title = "Daily"};
}