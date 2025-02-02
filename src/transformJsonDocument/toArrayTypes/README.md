Рассмотрим простой пример описания OpenAPI схемы и того как ее будет обрабатывать функция `toArrayTypes`.
Есть схемы:
```yaml
components:
  schemas:
    User:
      type: object
      properties:
        id:               
          type: integer   
          format: int64   
        tags:             
          type: array     
          items:          
            type: string  
        address:
          $ref: '#/components/schemas/Address'
    AnotherSchema:
      type: object
    # <...>
```
В JSON формате это выглядит так:
```js
const json = {
  "components": {
    "schemas": { // ← Мап-объект по этому нужен:
      /* 
        Object.entries() => [[schemaName, schemaData], ...], где:
          schemaName - Имя Схемы (так же имя будущего Type)
          schemaData - Объект схемы (объект с информацией для создания будущего Type)
      */
      
      "User": { // ← schemaName: "User"
        // ↓ schemaData ↓  
        "type": "object", // 
        "properties": { 
          "id": {
            "type": "integer",
            "format": "int64"
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "address": {
            "$ref": "#/components/schemas/Address"
          }
        }
        // ↑ schemaData ↑ 
      },
      
      "AnotherSchema" : { // ← schemaName: "AnotherSchema"
        // ↓ schemaData ↓
        type: "object"
        /* ... */
      }
    }
  }
}
```

## [toArrayTypes()](toArrayTypes.ts) → [transformSchema()](../utils/transformSchema/transformSchema.ts) 
Метод `toArrayTypes` проходит по мап-объекту `components/schemas` и каждую схему передает в метод 
[transformSchema()](../utils/transformSchema/transformSchema.ts).
```yaml
components:
  schemas:
    # transformSchema(schemaData: { весь объект ↓ } )
    User: 
      type: object
      properties:
        id:               
          type: integer   
          format: int64   
        tags:             
          type: array     
          items:          
            type: string  
        address:
          $ref: '#/components/schemas/Address'
    # transformSchema(schemaData: { весь объект ↓ } )
    AnotherSchema: 
      type: object
    # <...>
``` 

transformSchema()

## [transformSchema()](../utils/transformSchema/transformSchema.ts) → [createTypeObject()](../utils/transformSchema/transformSchema.ts) 

Описание метода: `transformSchema()`. Рассмотрим структуру User схемы и того как ее обрабатывает метод `transformSchema()`.
```yaml
    User:
      type: object
      # Запускается цикл для обхода данного объекта. В коде используется:
      # Object.entries(schema.properties).reduce((acc, [*fieldName*, *fieldSchema*] => {...}, [])
      properties:
        id:               # *fieldName* = 'id'
                          # *fieldSchema* = {
          type: integer   #   type: 'integer',
          format: int64   #   format: 'int64',
                          # }
                        
        tags:             # *fiendName* = 'tags'
                          # *fieldSchema* = {
          type: array     #   type: 'array'
          items:          #   items: {
            type: string  #      type: 'string'
                          #   }
                          # }
        
        address:                                 # *fieldName* = 'address'
                                                 # *fieldSchema* = {
          $ref: '#/components/schemas/Address'   #    $ref: '#/components/schemas/Address'
                                                 # }
```

