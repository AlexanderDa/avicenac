import { Filter } from '@/util'

export default interface Service<E, F> {
  create(element: E): Promise<E>;
  count(): Promise<number>;
  find(filter?: Filter<F>): Promise<E[]>;
  findById(id: number): Promise<E>;
  updateById(element: E): Promise<boolean>;
  deleteById(id: number): Promise<boolean>;
  formBody(element: E): E;
}

export const API_URL: string = '/api'
