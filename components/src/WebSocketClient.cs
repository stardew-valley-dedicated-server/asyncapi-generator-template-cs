using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Websocket.Client;
using StardewServer.WebSocket.Messages;

namespace StardewServer.WebSocket
{
  public class WebSocketClient : IDisposable
  {
    private readonly IWebsocketClient _webSocket;
    private readonly Dictionary<string, List<Action<MessageBase>>> _handlers = new();
    private readonly Dictionary<string, Type> _messageTypeMap = new();

    public WebSocketClient(IWebsocketClient webSocket)
    {
      _webSocket = webSocket ?? throw new ArgumentNullException(nameof(webSocket));
      _webSocket.MessageReceived.Subscribe(msg => OnMessageReceived(msg.Text));

      // Discover all MessageBase implementations in the current assembly
      var messageTypes = Assembly
        .GetExecutingAssembly()
        .GetTypes()
        .Where(t => typeof(MessageBase).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract);

      foreach (var type in messageTypes)
      {
        _messageTypeMap[type.Name] = type;
      }

      Console.WriteLine("WebSocketClient initialized.");
    }

    public async Task Connect()
    {
      await _webSocket.Start();
      Console.WriteLine("WebSocket connected.");
    }

    public void Send<T>(T message) where T : MessageBase
    {
      var messageJson = Serialize(message);
      Console.WriteLine($"Sending message: {messageJson}");
      _webSocket.Send(messageJson);
    }

    public void On<T>(Action<T> handler) where T : MessageBase
    {
      var messageType = typeof(T).Name;
      Console.WriteLine($"Registering handler for message type: {messageType}");

      if (!_handlers.ContainsKey(messageType))
      {
        _handlers[messageType] = new List<Action<MessageBase>>();
      }

      _handlers[messageType].Add((msg) => handler((T)msg));
    }

    public string Serialize<T>(T message) where T : MessageBase
    {
      return JsonConvert.SerializeObject(message);
    }

    public T Deserialize<T>(string message) where T : MessageBase
    {
      return JsonConvert.DeserializeObject<T>(message);
    }

    private void OnMessageReceived(string messageJson)
    {
      Console.WriteLine($"Received message: {messageJson}");

      try
      {
        var messageDictionary = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, object>>(messageJson);
        if (messageDictionary == null || !messageDictionary.ContainsKey("Type"))
        {
          Console.Error.WriteLine("Invalid message received.", messageJson);
          return;
        }

        var messageType = messageDictionary["Type"].ToString();
        if (!_messageTypeMap.ContainsKey(messageType))
        {
          Console.Error.WriteLine("No known type for received message.");
          return;
        }

        var messageTypeObject = System.Text.Json.JsonSerializer.Deserialize(messageJson, _messageTypeMap[messageType]);
        if (messageTypeObject is MessageBase typedMessage)
        {
          if (_handlers.ContainsKey(messageType))
          {
            foreach (var handler in _handlers[messageType])
            {
              handler(typedMessage);
            }
          }
        }
      }
      catch (System.Text.Json.JsonException)
      {
        Console.Error.WriteLine("Failed to deserialize message.");
      }
    }

    public void Dispose()
    {
      _webSocket.Dispose();
      GC.SuppressFinalize(this);
      Console.WriteLine("WebSocketClient disposed.");
    }
  }
}
