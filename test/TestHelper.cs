using StardewServer.WebSocket.Messages;
using System;

namespace Test
{
  public static class TestHelper
  {
    public static void Log(string value)
    {
      // Assert that the client is not null, indicating it was created successfully
      Console.WriteLine($"[Test] {value}");
    }

    public static ConnectedMessage CreateMessage()
    {
      return new ConnectedMessage
      {
        msg = "Hello, this is a message"
      };
    }
  }
}
