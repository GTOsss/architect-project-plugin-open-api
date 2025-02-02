Рассмотрим пример описания OpenAPI методов и того как их будет обрабатывать `toArrayMethods()`. 

Пример целого Open API документа:
```yaml
paths:
  /products:
    get:
      summary: Получить список продуктов
      description: Возвращает список продуктов, отфильтрованных и отсортированных по заданным параметрам.
      tags:
        - Products
      parameters:
        - name: Authorization
          in: header
          description: Токен авторизации для доступа к API.
          required: true
          schema:
            type: string
        - name: category
          in: query
          description: Категория продуктов для фильтрации.
          required: false
          schema:
            type: string
        - name: sortBy
          in: query
          description: Поле для сортировки результатов.
          required: false
          schema:
            type: string
            enum: [name, price, date]
        - name: sortOrder
          in: query
          description: Порядок сортировки (asc или desc).
          required: false
          schema:
            type: string
            enum: [asc, desc]
      responses:
        '200':
          description: Успешный запрос. Возвращает список продуктов.
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: integer
                    name:
                      type: string
                    description:
                      type: string
                    price:
                      type: number
                      format: float
                    category:
                      type: string
                    imageUrl:
                      type: string
        '401':
          description: Не авторизован. Требуется токен авторизации.
        '500':
          description: Внутренняя ошибка сервера.
  /product/{id}:
    get:
  # ...
```

Отметим верхне-уровневые поля по которым нужно осуществить проход.   

```yaml
paths: # мап-объект 
  /products: # мап-объект
    get:
      parameters: # массив
        # ...
      responses: # мап-объект
        '200':
          # ...
        '401':
          # ...
        '500':
          # ...
    post:
      parameters: 
        # ...
      responses: 
        '200': 
          # ...
  /product/{id}:
    get:
      parameters:
        # ...
      responses:
        # ...
  # ...
```

Для обхода по всем URL используется такая конструкция кода:
```ts
const methods = Object.entries(jsonDocument.paths).reduce((acc, [path, pathData]) => { /* ... */ })
```
Где:
```yaml
paths:  
  /products: # ← path: '/products'
    # ↓ pathData: { get: {}, post: {}, ... }
    get: 
      parameters: 
        # ...
      responses: 
        '200':
    post:
      parameters:
        # ...
      responses:
        '200': 
    # ↑ pathData ↑
          # ...
```

Для прохода по полям `get/post/post/...` заготовлен заранее определенный массив:
```ts
const httpMethodsArray = [
  OpenAPIV3.HttpMethods.POST,
  OpenAPIV3.HttpMethods.PUT,
  OpenAPIV3.HttpMethods.PATCH,
  OpenAPIV3.HttpMethods.GET,
  OpenAPIV3.HttpMethods.DELETE,
];
```

В коде выглядит так: 
```ts
httpMethodsArray.forEach((method) => {
  const currentMethodData = pathData[method];
  /* ... */ 
})
```

Где `currentMethodData` это часть yaml:
```yaml
paths: 
  /products:
    # для текущего URL могут быть описаны parameters которые будут общими для всех методов  
    post: 
    # ↓ currentMethodData ↓
      parameters: # массив
        # ...
      requestBody: # объект
        # ...
      responses: # мап-объект
        '200':
          # ...
        '401':
          # ...
        '500':
          # ...
    # ↑ currentMethodData ↑
    get:
      # ...
```

### Поле `parameters` и метод `parametersToMap()` 
`parametersToMap()` создает мап-объект такого вида:
```ts
/**
 * // {
 * //   header: [ParameterObject, ...],
 * //   query: [ParameterObject, ...],
 * //   path: [ParameterObject, ...],
 * // }
 * */
const parametersMap = {
  header: [
    {
      in: 'header',
      name: 'Authorization',
      required: true,
      type: 'string', // готовый тип для кодогенерации
    },
  ],
  path: [],
  query: [
    {
      in: 'query',
      name: 'page',
      required: false,
      type: 'number', // готовый тип для кодогенерации
    },
    {
      in: 'query',
      name: 'role',
      type: "'admin' | 'user' | 'guest'", // готовый тип для кодогенерации
    },
  ],
};


```

### Поле `requestBody`

### Поле `responses`

