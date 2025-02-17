using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

public class PaymentHub : Hub
{
    public async Task SendOrderStatusUpdate(string orderId, string newStatus)
    {
        await Clients.All.SendAsync("ReceiveOrderStatusUpdate", orderId, newStatus);
    }
}
