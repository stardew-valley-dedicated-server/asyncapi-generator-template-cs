import { Text } from '@asyncapi/generator-react-sdk';

export default function NullableDirective({ children }) {
  // Enable nullable preprocessor directive when used as self-closing element
  if (!children?.length) {
    return (
      <Text>#nullable enable</Text>
    );
  }

  // Wrap child elements in nullable preprocessor directive
  return (
    <Text newLines={0}>
      <Text>#nullable enable</Text>
      <Text>{children}</Text>
      <Text newLines={0}>#nullable disable</Text>
    </Text>
  );
}
