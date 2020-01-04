export default interface Service<E> {
  create(element: E): Promise<E>;
  count(): Promise<number>;
  find(): Promise<E[]>;
  findById(id: number): Promise<E>;
  updateById(element: E): Promise<boolean>;
  deleteById(id: number): Promise<boolean>;
  formBody(element: E): E;
}
