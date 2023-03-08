export interface Order {
    id: number;
    description: string;
    status: string;
    _links: {
      self: { href: string };
      orders: { href: string };
      cancel?: { href: string };
      complete?: { href: string };
    };
  }