##### В текущей директории лежат утилиты для обработки ReferenceObject 

### Возможные форматы ссылки в OpenAPI.ReferenceObject (поле $ref)
В OpenAPI (Swagger) формат `$ref: #/components/...` является ссылкой на внутренние компоненты спецификации.

Разберём по частям:
1. `#` - означает ссылку на текущий документ (как якорь в HTML). Это указывает, что ссылка ведёт внутрь того же файла спецификации.

2. Вместо `#` может быть:
    - Относительный путь к другому файлу: `$ref: "./other-file.yaml#/components/..."`
    - Абсолютный URL: `$ref: "https://example.com/specs.yaml#/components/..."`

Примеры использования:
```yaml
# Ссылка внутри текущего документа
$ref: "#/components/schemas/User"
```
```yaml
# Ссылка на другой файл
$ref: "./definitions.yaml#/components/schemas/User"
```

```yaml
# Ссылка на внешний ресурс
$ref: "https://api.example.com/specs.yaml#/components/schemas/User"
```

#### После `#` следует путь к конкретному компоненту внутри документа, обычно это:
- `/components/schemas/`
- `/components/parameters/`
- `/components/responses/`
- `/components/securitySchemes/`
- `/components/requestBodies/`
- `/components/headers/`
- `/components/examples/`
- `/components/links/`
- `/components/callbacks/`
