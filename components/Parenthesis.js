import { Text } from '@asyncapi/generator-react-sdk';

export default function Parenthesis({ children }) {
  return (
    <Text newLines={0}>
      <Text>{'{'}</Text>
      <Text indent={1} newLines={0}>{children}</Text>
      <Text newLines={0}>{'}'}</Text>
    </Text>
  );
}
