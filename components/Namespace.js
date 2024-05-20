import { Text } from '@asyncapi/generator-react-sdk';

export default function Namespace({ children, name }) {
  return (
    <Text newLines={0}>
      <Text>namespace {name}</Text>
      <Text>{'{'}</Text>
      <Text indent={2}>{children}</Text>
      <Text newLines={0}>{'}'}</Text>
    </Text>
  );
}
