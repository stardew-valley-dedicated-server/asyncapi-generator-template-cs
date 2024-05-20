using Microsoft.VisualStudio.TestPlatform.CommunicationUtilities;
using Moq;
using Newtonsoft.Json;
using NUnit.Framework;
using System;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Threading.Tasks;
using Websocket.Client;
using StardewServer.WebSocket;
using StardewServer.WebSocket.Messages;

namespace Test
{
  internal class WebSocketclientMock : Mock<IWebsocketClient>
  {
    /// <summary>
    /// Mock response, used to simulate incoming messages
    /// </summary>
    public Subject<ResponseMessage> Response { get; }

    public WebSocketclientMock()
    {
      // Mock response, set value during test to emulate receiving a message
      Response = new Subject<ResponseMessage>();

      // Mock websocket client methods
      Setup(ws => ws.MessageReceived).Returns(Response.AsObservable());
    }

    public void TriggerIncomingMessage<T>(T messageInstance) where T : MessageBase
    {
      messageInstance.Type = messageInstance.GetType().Name;
      string message = JsonConvert.SerializeObject(messageInstance);

      TestHelper.Log($"Trigger incoming message: {message}");

      // Create a test response message with the serialized JSON
      Response.OnNext(ResponseMessage.TextMessage(message));
    }

    public void AssertCalledStart()
    {
      Verify(ws => ws.Start(), Times.Once);
    }

    public void AssertCalledSend(string expected)
    {
      var AssertAreEqualExpression = (string expected, string actual) =>
      {
        Assert.AreEqual(expected, actual);
        return true;
      };

      Verify(ws =>
          ws.Send(It.Is<string>(message =>
              AssertAreEqualExpression(expected, message)
          )
      ), Times.Once);
    }
  }

  [TestFixture]
  public class WebSocketClientTests
  {
    private WebSocketclientMock _webSocketMock;
    private WebSocketClient _client;

    [SetUp]
    public void SetUp()
    {
      TestHelper.Log("Setting up tests...");

      // Mock websocket
      _webSocketMock = new WebSocketclientMock();

      // Creating an instance of WebSocketClient with the mocked WebSocket
      _client = new WebSocketClient(_webSocketMock.Object);

      TestHelper.Log("Test setup completed.");
      TestHelper.Log("---------------------");
    }

    [Test, Description("Test that client instance can be created")]
    public void TestClientInstanceCreation()
    {
      // Assert
      Assert.IsNotNull(_client);
    }

    [Test]
    public async Task TestConnect()
    {
      // Act
      await _client.Connect();

      // Assert
      _webSocketMock.AssertCalledStart();
    }

    [Test, Description("Test that sending a message correctly invokes the internal websocket client send method")]
    public void TestSendMessage()
    {
      // Prepare
      var message = TestHelper.CreateMessage();
      var messageJson = JsonConvert.SerializeObject(message);

      // Act
      _client.Send(message);

      // Assert
      _webSocketMock.AssertCalledSend(messageJson);
    }

    [Test, Description("Test that messages are correctly received")]
    public void TestOnMessageReceived()
    {
      // Prepare
      var handlerInvoked = false;

      _client.On<ConnectedMessage>(msg =>
      {
        handlerInvoked = true;
      });

      // Act
      _webSocketMock.TriggerIncomingMessage(TestHelper.CreateMessage());

      // Assert
      Assert.IsTrue(handlerInvoked, "Handler was not invoked.");
    }
  }
}
