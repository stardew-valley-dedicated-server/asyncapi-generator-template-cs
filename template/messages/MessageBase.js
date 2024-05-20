import { File, Text } from '@asyncapi/generator-react-sdk';
import CodegenComment from '../../components/CodegenComment';
import { logStatus, readFile } from '../../utils/util';

/** @param {RenderArgument} ctx */
export default function ({ asyncapi, params }) {
  const fileName = 'MessageBase.cs';

  logStatus(`Generating '${fileName}'...`);

  return (
    <File name={fileName}>
      <CodegenComment />
      <Text>{readFile('components/src/MessageBase.cs')}</Text>
    </File>
  );
}
