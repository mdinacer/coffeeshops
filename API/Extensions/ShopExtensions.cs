using API.Models;
using API.Models.ShopChartsData;

namespace API.Extensions
{
    public static class ShopExtensions
    {
        public static IQueryable<Shop> Sort(this IQueryable<Shop> query, string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "id" => query.OrderBy(p => p.Id),
                _ => query.OrderBy(p => p.Name),
            };
            return query;
        }

        public static IQueryable<Shop> Search(this IQueryable<Shop> query, string? searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return query;

            searchTerm = searchTerm.Trim().ToLower();

            query = query.Where(p => p.Name.ToLower().Contains(searchTerm));
            return query;
        }


        public static ShopStats GetStats(this Shop shop)
        {
            var shopStats = new ShopStats();

            shop.Transactions = GenerateFakeData(shop.Id);


            if (shop.Transactions == null || !shop.Transactions.Any()) return shopStats;

            var currentYear = DateTime.UtcNow.Year;
            var currentMonth = DateTime.UtcNow.Month;
            var currentWeek = DateTime.Now.Date.AddDays(-1 * (Int32)DateTime.Now.DayOfWeek);
            var today = DateTime.UtcNow;

            var items = GetData(shop.Transactions, shop.Id, currentYear);

            var sales = shop.Operations.Where(o => o.Type == ShopOperationType.sale && o.Date.Year == currentYear);
            var purchases = shop.Operations.Where(o => o.Type == ShopOperationType.purchase && o.Date.Year == currentYear);

            shopStats.Annual.ElementData = GroupElements(items, i => i.Date.Month);
            shopStats.Annual.TotalIncoming = shopStats.Annual.ElementData.Sum(e => e.Incoming);
            shopStats.Annual.TotalOutgoing = shopStats.Annual.ElementData.Sum(e => e.Outgoing);
            shopStats.Annual.TotalPurchases = purchases.Sum(p => p.Total);
            shopStats.Annual.TotalPurchasesPaid = purchases.Sum(p => p.Paid);
            shopStats.Annual.TotalSales = sales.Sum(p => p.Total);
            shopStats.Annual.TotalSalesPaid = sales.Sum(p => p.Paid);

            shopStats.Monthly.ElementData = GroupElements(items.Where(i => i.Date.Month == currentMonth && i.Date.Date <= DateTime.Today.Date), i => i.Date.Day);
            shopStats.Monthly.TotalIncoming = shopStats.Monthly.ElementData.Sum(e => e.Incoming);
            shopStats.Monthly.TotalOutgoing = shopStats.Monthly.ElementData.Sum(e => e.Outgoing);
            shopStats.Monthly.TotalPurchases = purchases.Where(o => o.Date.Month == currentMonth).Sum(p => p.Total);
            shopStats.Monthly.TotalPurchasesPaid = purchases.Where(o => o.Date.Month == currentMonth).Sum(p => p.Paid);
            shopStats.Monthly.TotalSales = sales.Where(o => o.Date.Month == currentMonth).Sum(p => p.Total);
            shopStats.Monthly.TotalSalesPaid = sales.Where(o => o.Date.Month == currentMonth).Sum(p => p.Paid);

            shopStats.Weekly.ElementData = GroupElements(items.Where(i => i.Date >= currentWeek && i.Date.Date <= DateTime.Today.Date), i => i.Date.Day);
            shopStats.Weekly.TotalIncoming = shopStats.Weekly.ElementData.Sum(e => e.Incoming);
            shopStats.Weekly.TotalOutgoing = shopStats.Weekly.ElementData.Sum(e => e.Outgoing);
            shopStats.Weekly.TotalPurchases = purchases.Where(o => o.Date.Date >= currentWeek && o.Date.Date <= today).Sum(p => p.Total);
            shopStats.Weekly.TotalPurchasesPaid = purchases.Where(o => o.Date.Date >= currentWeek && o.Date.Date <= today).Sum(p => p.Paid);
            shopStats.Weekly.TotalSales = sales.Where(o => o.Date.Date >= currentWeek && o.Date.Date <= today).Sum(p => p.Total);
            shopStats.Weekly.TotalSalesPaid = sales.Where(o => o.Date.Date >= currentWeek && o.Date.Date <= today).Sum(p => p.Paid);

            shopStats.Daily.ElementData = items.Where(t => t.Date.Date == today.Date).ToList();


            return shopStats;
        }

        private static List<StatElementData> GroupElements(IEnumerable<StatElementData> data, Func<StatElementData, int> keySelector)
        {
            return data.GroupBy(keySelector)
            .Select(group =>
            {
                var date = group.First().Date;
                var item = new StatElementData
                {
                    Date = date,
                    Incoming = group.Sum(i => i.Incoming),
                    Outgoing = group.Sum(i => i.Outgoing),
                };
                return item;
            }).ToList();
        }

        private static List<StatElementData> GetData(List<MoneyTransaction> data, string shopId, int year)
        {
            var list = new List<StatElementData>();
            var transactions = data
            .Where(t => t.ShopId == shopId && t.Date.Year == year)
            .OrderBy(t => t.Date)
            .ToList();

            if (transactions == null || !transactions.Any()) return list;

            var dates = transactions
            .Select(t => t.Date)
            .Distinct()
            .ToList();

            foreach (var date in dates)
            {
                var items = transactions.Where(t => t.Date == date).ToList();
                var elementData = new StatElementData
                {
                    Date = date,
                    Incoming = items
                .Where(i => i.Direction == TransactionDirection.incoming)
                .Sum(i => i.Amount),
                    Outgoing = items
                .Where(i => i.Direction == TransactionDirection.outgoing)
                .Sum(i => i.Amount)
                };
                list.Add(elementData);
            }

            return list;
        }

        private static List<MoneyTransaction> GenerateFakeData(string shopId)
        {
            var list = new List<MoneyTransaction>();
            var rand = new Random();
            var today = DateTime.Today;
            var currentYear = DateTime.UtcNow.Year;
            var currentMonth = DateTime.UtcNow.Month;

            for (int i = 1; i <= currentMonth; i++)
            {
                var days = DateTime.DaysInMonth(currentYear, i);

                for (int j = 1; j <= days; j++)
                {
                    var date = new DateTime(currentYear, i, j);

                    for (int x = 0; x < rand.Next(200); x++)
                    {
                        var direction = (TransactionDirection)rand.Next(2);
                        var amount = direction == TransactionDirection.incoming ? rand.Next(2000, 4000) : rand.Next(1000, 2500);
                        var item = new MoneyTransaction
                        {
                            Id = Guid.NewGuid().ToString(),
                            Amount = amount,
                            Date = date,
                            ShopId = shopId,
                            Type = TransactionType.transaction,
                            Direction = direction
                        };
                        list.Add(item);
                    }
                }
            }
            return list;
        }


    }
}