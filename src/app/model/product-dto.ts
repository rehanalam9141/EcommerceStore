export class GetProductDto {
  message!: string;
  result!: boolean;
  data!: ProductDto[];
}

export class ProductDto {
  productId!: number;
  productSku!: string;
  productName!: string;
  productPrice!: number;
  productShortName!: string;
  productDescription!: string;
  createdDate!: string;
  deliveryTimeSpan!: string;
  categoryId!: number;
  productImageUrl!: string;
  categoryName!: string;
}

// Category Dto

export class CategoryResponse {
    message!: string
    result!: boolean
    data!: CategoryDto[]
  }
  
  export class CategoryDto {
    categoryId!: number
    categoryName!: string
    parentCategoryId!: number
  }
  
