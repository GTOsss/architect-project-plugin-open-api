export type GeneratedType = {
  /** Имя типа */
  typeName: string;
  /** Значение типа. То что пишется после знака "="
   * @example
   * type TypeName = { a: string } // typeValue → "{ a: string }"  */
  typeValue: string;
};
