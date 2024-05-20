import { File } from '@asyncapi/generator-react-sdk';
import CodegenComment from '../../components/CodegenComment';
import Message from '../../components/Message';
import { logStatus, getMessageName } from '../../utils/util';

/** @param {RenderArgument & { message: parser.Message, messageName: string }} ctx */
export default function ({ asyncapi, params, message }) {
  const fileName = getMessageName(message);

  logStatus(`Generating message '${fileName}.cs'...`);

  return (
    <File name={`${fileName}.cs`}>
      <CodegenComment />
      <Message name={fileName} message={message} />
    </File>
  );
}
