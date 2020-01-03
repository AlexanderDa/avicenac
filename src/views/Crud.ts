export default interface Crud<E>{

  /********************************************************
  *                     Initializable                     *
  ********************************************************/
  created (): void

  /********************************************************
  *                    API Services                       *
  ********************************************************/
  createElement():void
  findElements (): void
  updateElement (): void
  deleteElement (element: E): void

  /********************************************************
  *                       Methods                         *
  ********************************************************/
  toEditElement (element: E): void
  submit (): void
  reset(): void
}
