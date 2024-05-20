/**
 * AsyncApi Generator Templates only work with plain JavaScript files,
 * but instead of creating typedef comments we add needed types here.
 */

import { AsyncAPIDocument } from '@asyncapi/generator';

export type TemplateParameters = {
  /**
   * Output directory, same as output path to generate command.
   */
  output: boolean | string;
};

export type RenderArgument = {
  /**
   * Received from the generator.
   */
  asyncapi?: AsyncAPIDocument;

  /**
   * Received from the generator.
   */
  params?: TemplateParameters;
};
