import { CSharpGenerator } from '@asyncapi/modelina';
import Model from '../../components/Model';
import CodegenComment from '../../components/CodegenComment';
import Parenthesis from '../../components/Parenthesis';
import { logStatus } from '../../utils/util';

async function generateModels({ asyncapi }) {
  return new CSharpGenerator({
    modelType: 'class',
    collectionType: 'List',
    presets: [
      {
        class: {
          // Render class
          self: async ({ renderer, options, model }) => {
            const content = [
              await renderer.renderAccessors(),
            ];

            return `public class ${model.name}
{
${renderer.indent(renderer.renderBlock(content))}
}`;
          },

          // Render simple accessors without backing fields
          accessor: async ({ renderer, options, model, property }) => {
            if (property.propertyName == 'additionalProperties') {
              return '';
            }

            return `public ${property.property.type} ${property.propertyName} { get; set; }`;
          },
        },
      },
    ],
  }).generate(asyncapi);
}

/** @param {RenderArgument} ctx */
export default async function ({ asyncapi, params }) {
  const models = await generateModels({ asyncapi });

  return models.map((schema) => {
    const fileName = `${schema.modelName}.cs`;

    logStatus(`Generating model '${fileName}'... `);

    return (
      <File name={fileName}>
        <CodegenComment />
        <Model schema={schema} />
      </File>
    );
  });
}
