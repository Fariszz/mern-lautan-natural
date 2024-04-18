export type BaseResponse<T> = {
  code: number;
  data?: T;
  message?: string;
  meta?: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: null | string;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
  links?: {
    first: string;
    last: string;
    next: string;
    prev: string;
  };
};

export type payloadType = {
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  prv: string;
  role: string;
  sub: string;
};

export type BaseResponseInfinitePages<T> = {
  data: {
    status: number;
    data: T;
  }[];
  status: 200;
  statusText: "OK";
};

export type BaseResponseInfinite<T> = {
  pages: BaseResponseInfinitePages<T>[];
  pageParams: object;
};
