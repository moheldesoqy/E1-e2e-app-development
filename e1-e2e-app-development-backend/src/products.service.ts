import { Injectable } from '@nestjs/common';
import { AddProductRequestDto } from './dto/add-product/add-product-request.dto';
import { UpdateProductRequestDto } from './dto/update-product/update-product-request.dto';
import { MongoDBService } from './db/mongo-database';

@Injectable()
export class ProductsService {
  constructor(private readonly mongoDbService: MongoDBService) {}
  async getProducts() {
    return await this.mongoDbService.getProductsFromDb();
  }

  async getProductById(id: string) {
    return this.mongoDbService.getProductByIdFromDb(id);
  }

  async addProduct(addProductRequest: AddProductRequestDto) {
    return this.mongoDbService.addProductToDb(addProductRequest);
  }

  async updateProduct(
    updateProductRequest: UpdateProductRequestDto,
    id: string,
  ) {
    return this.mongoDbService.updateProductFromDb(updateProductRequest, id);
  }

  async deleteProduct(id: string) {
    return this.mongoDbService.deleteProductFromDb(id);
  }
}
