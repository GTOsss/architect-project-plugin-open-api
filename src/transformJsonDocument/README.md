# Терминология

| Термин                     | Значение                                                                                             |
|----------------------------|------------------------------------------------------------------------------------------------------|
| `Документ OpenAPI`         | OpenAPI (Swagger) `yaml`\|`json` файл.                                                               |
| `Раздел OpenAPI документа` | Верхне-уровневые разделы `Документа OpenAPI` <br/> Примеры: `path` \| `components`  \| `info` и т.д. |
| `Schema Object`            | Объект описывающий тип данных, может описывать: <br/> примитивы, объекты и массивы.                  |

Cм. [Пример OpenAPI документа в формате yaml](#open-api-document-example)

### <a id="open-api-document-example"></a> Пример Open API документа в формате `yaml`

```yaml
# Пример Документа OpenAPI
openapi: 3.0.0

info: # ← Раздел info
  title: Responses
  version: 0.0.0

paths: # ← Раздел paths
  /users/me:
    get:
      responses:
        200:
          description: Get current user
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
  /users:
    # <...>
    
components: # ← Раздел components
  schemas:
    User: # ← Schema Object
      type: object
      required:
        - id
        - email
      properties:
        id:
          type: integer
          format: int64
      # <...>
```

# Schema в openAPI
[Официальная документация.](https://spec.openapis.org/oas/v3.1.0.html#schema-object)

В документе OpenAPI (yaml/json), разделе: `components/schemes` описываются `Schema Object`'ы которые используются в:
- `Parameters` для `query`|`path`|`header` 
- `RequestBody` 
- `Response`

Npm модуль `openapi-types` хранит типы всей структуры `OpenAPI документа`.`Object Schema` описан в
`namespace OpenAPIV3` следующим образом:

```ts
SchemaObject | ReferenceObject
```

Подробнее про ReferenceObject написано в файле:
`swaggerV2/transformJsonDocument/utils/ref/README.md`

Типы `Schema Object` из модуля `openapi-types`:
```ts
type ArraySchemaObjectType = 'array';
type NonArraySchemaObjectType = 'boolean' | 'object' | 'number' | 'string' | 'integer';

/**
 * Schema Object
 * */
type SchemaObject = ArraySchemaObject | NonArraySchemaObject;

interface ArraySchemaObject extends BaseSchemaObject {
  type: ArraySchemaObjectType;
  items: ReferenceObject | SchemaObject;
}

interface NonArraySchemaObject extends BaseSchemaObject {
  type?: NonArraySchemaObjectType;
}

interface BaseSchemaObject {
  /* ↓ Основные поля задействованные в кодогенерации ↓ */
  
  title?: string;
  description?: string;
  
  properties?: {
    [name: string]: ReferenceObject | SchemaObject;
  };

  required?: string[];
  nullable?: boolean;
   
  enum?: any[];

  allOf?: (ReferenceObject | SchemaObject)[];
  oneOf?: (ReferenceObject | SchemaObject)[];
  anyOf?: (ReferenceObject | SchemaObject)[];
  not?: ReferenceObject | SchemaObject;

  /* ↓ Прочие поля OpenAPI ↓ */

  format?: string;
  default?: any;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  additionalProperties?: boolean | ReferenceObject | SchemaObject;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  discriminator?: DiscriminatorObject;
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: XMLObject;
  externalDocs?: ExternalDocumentationObject;
  example?: any;
  deprecated?: boolean;
}

interface DiscriminatorObject {
  propertyName: string;
  mapping?: {
    [value: string]: string;
  };
}
```

