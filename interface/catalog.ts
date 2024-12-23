export interface Category {
    id: number;
    name: string;
  }
  
  export interface Measurement {
    id: number;
    name: string;
    symbol: string;
  }
  
  export interface Type {
    id: number;
    name: string;
  }
  
  export interface Tax {
    id: number;
    name: string;
    percent: number;
  }
  
  export interface Product {
    id: number;
    category?: {
      id: number;
      name: string;
    };
    name: string;
    sku: string;
    barcode: string;
    cost: number;
    price: number;
    stock: number;
    measurement: {
      id: number;
      name: string;
      symbol: string;
    };
    type: {
      id: number;
      name: string;
    };
    tax: {
      id: number;
      name: string;
      percent: number;
    };
    is_active: boolean;
  }
  
  export interface AddProductData {
    organization: number;
    name: string;
    sku?: string;
    barcode?: string;
    category_id: number;
    category?: number;
    type?: number;
    type_id: number;
    measurement?: number;
    measurement_id: number;
    tax?: number;
    tax_id: number;
  }
  
  export interface EditProductData {
    id: number;
    organization: number;
    name: string;
    sku?: string;
    barcode?: string;
    category_id: number;
    type_id: number;
    measurement_id: number;
    tax_id: number;
    cost?: number;
    price?: number;
    brand_id?: number;
    is_active?: boolean;
  }