using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreSignalR_Broadcast.Hubs
{
    public class BroadcastHub : Hub
    {
        public void BroadcastMessage(string message)
        {
             Clients.All.SendAsync("displaytext",message);
        }
    }
}
