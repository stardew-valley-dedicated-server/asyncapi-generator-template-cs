import { processMessage } from '../utils/util';
import { Text } from '@asyncapi/generator-react-sdk';
import Namespace from './Namespace';
import Parenthesis from './Parenthesis';
import Property from './Property';
import Usings from './Usings';

function Properties({ properties }) {
  const count = properties.length;
  let i = 0;

  // TODO: Lazytooown, implement this weirdo loop properly
  return properties.map(prop => {
    // Adds additional linebreak, skipping for last property in block
    const newLines = i < count - 1
      ? 2
      : 1;

    // Render
    const content = (
      <Text indent={1} newLines={newLines}>
        <Property property={prop} />
      </Text>
    );

    // Increment
    i++;

    // Next
    return content;
  });
}

export default function Message({ name, message }) {
  const messagePayload = message.payload();
  const messageProperties = messagePayload.properties();
  const messageProcessed = processMessage(name, messageProperties);

  // TODO: Check if messageProperties references one of the models and add usings conditionally
  // console.log('messageProperties', messageProperties);

  return (
    <Text>
      <Usings dependencies={['StardewServer.WebSocket.Models']} />

      <Namespace name={'StardewServer.WebSocket.Messages'}>
        <Text>{`public class ${name} : MessageBase`}</Text>
        <Parenthesis>
          <Properties properties={messageProcessed.properties} />
        </Parenthesis>
      </Namespace>
    </Text>
  );
}
