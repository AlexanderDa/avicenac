export default interface Crud<E>{

  /********************************************************
  *                     Initializable                     *
  ********************************************************/

  beforeMount(): void
  created (): void

  /********************************************************
  *                    API Services                       *
  ********************************************************/
  createElement():Promise<void>
  findElements (): Promise<void>
  updateElement (): Promise<void>
  deleteElement (element: E): Promise<void>
  submit (): Promise<void>

  /********************************************************
  *                       Methods                         *
  ********************************************************/
  toEditElement (element: E): void
  reset(): void
}
