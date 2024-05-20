import { Text } from '@asyncapi/generator-react-sdk';

/**
 * @param {{ dependencies: string[] }} ctx
 */
export default function Usings({ dependencies }) {
  if (!dependencies.length) {
    return '';
  }

  return (
    <Text>
      {dependencies.map(dependency => (
        <Text>using {dependency};</Text>
      ))}
    </Text>
  );
}
