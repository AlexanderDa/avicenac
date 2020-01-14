export interface ListRouterItem {
  icon: string;
  title: string;
  page: string;
}

export interface Filter<E> {
  where?: E,
  offset?: number,
  limit?: number,
  skip?: number,
  order?: string[]
}

export function encodeFilter (filter?: Filter<any>): string {
  let str:string = JSON.stringify(filter)
  str = (filter) ? '?filter=' + str : ''
  return encodeURI(str)
}
