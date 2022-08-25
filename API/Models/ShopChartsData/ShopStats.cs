

namespace API.Models.ShopChartsData
{
    public class ShopStats
    {
        public StatsElement Annual { get; set; } = new StatsElement { Title = "Annual" };
        public StatsElement Monthly { get; set; } = new StatsElement { Title = "Monthly" };
        public StatsElement Weekly { get; set; } = new StatsElement { Title = "Weekly" };
        public StatsElement Daily { get; set; } = new StatsElement { Title = "Daily" };
    }
}