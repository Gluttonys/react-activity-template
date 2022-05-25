interface API_WRAPPER<T> {
  code: number;
  message: string;
  data: T;
}

declare namespace API {}
