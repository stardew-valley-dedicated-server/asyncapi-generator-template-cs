import { FormatHelpers } from '@asyncapi/modelina';
import * as path from 'node:path';
import fs from 'node:fs';

const templateDir = path.join(__dirname, '..');

// TODO: See typeMapping generator option?
const asyncapiToJsTypes = {
  integer: 'int',
};

export function isModelType(type) {
  return type === 'object' || isModelTypeArray(type);
}

export function isModelTypeArray(type) {
  return type === 'array';
}

// Colors
export const magenta = text => `\x1b[35m${text}\x1b[0m`;

export function getTemplateDir(dir = '') {
  return path.join(templateDir, dir);
}

export function isNativeType(type) {
  return type in asyncapiToJsTypes;
}

export function getNativeType(type) {
  return asyncapiToJsTypes[type];
}

export function logStatus(value) {
  console.log(`\x1b[1;35m•\x1b[1;0m ${value}`);
}

export function processMessage(name, props) {
  let imports = [];
  let properties = [];

  for (const propName of Object.keys(props)) {
    if (propName === 'type') {
      // TODO: Use error map
      throw new Error('Can not use the property \'type\', it is used for internal purposes. Please rename the property.');
    }

    const type = props[propName].type();
    let typeFinal;
    let isArray = false;

    if (isModelType(type)) {
      if (isModelTypeArray(type)) {
        typeFinal = FormatHelpers.toPascalCase(props[propName].items().id());
        isArray = true;
      } else {
        typeFinal = FormatHelpers.toPascalCase(propName);
      }

      // Auto import generation is disabled because the generator doesn't handle
      // type-only imports too well, here we collect and handle them manually
      // TODO: I think this is not used at all, imports/usings are handled.. differently
      imports.push(typeFinal);

    } else if (isNativeType(type)) {
      typeFinal = getNativeType(type);
    } else {
      typeFinal = type;
    }

    properties.push({ propName: FormatHelpers.toCamelCase(propName), typeFinal, isArray });
  }

  return {
    imports,
    properties,
  };
}

export function getMessageNameRaw(message) {
  return message.payload().id();
}

export function getMessageName(message) {
  return FormatHelpers.toPascalCase(`${getMessageNameRaw(message)}Message`);
}

/** @param {RenderArgument} ctx */
export function getMessageNames({ asyncapi }) {
  const names = [];

  for (const message of asyncapi.allMessages()) {
    names.push(getMessageName(message));
  }

  return names;
}

export function readFile(path) {
  return fs.readFileSync(path, { encoding: 'utf8' });
}
