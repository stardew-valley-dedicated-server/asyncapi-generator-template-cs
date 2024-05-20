import { ConstrainedDictionaryModel } from '@asyncapi/modelina';
import { Text } from '@asyncapi/generator-react-sdk';
import Namespace from './Namespace';
import NullableDirective from './NullableDirective';
import Usings from './Usings';

/**
 * @param schema
 * @returns {string[]}
 */
function getDependencies(schema) {
  let imports = [];

  if (schema.model.containsPropertyType(ConstrainedDictionaryModel)) {
    imports.push('System.Collections.Generic');
  }

  return imports;
}

export default function Model({ schema }) {
  // We want strongly typed code, so deleting this to completely
  // eliminate all possible side effects like DictionaryModel imports
  delete schema.model.properties.additionalProperties;

  const dependencies = getDependencies(schema);

  return (
    <Text newLines={0}>
      <Usings dependencies={dependencies} />

      <Namespace name={'StardewServer.WebSocket.Models'}>
        <NullableDirective>
          {schema.result}
        </NullableDirective>
      </Namespace>
    </Text>
  );
}
