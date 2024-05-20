/**
 * @param {{
 *  property: {
 *    typeFinal: string,
 *    isArray: boolean,
 *    propName: string
 *  }
 * }} ctx
 */
export default function Property({ property }) {
  return `public ${property.typeFinal}${property.isArray ? '[]' : ''} ${property.propName} { get; set; }`;
}
