import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { AddProductRequestDto } from 'src/dto/add-product/add-product-request.dto';
import { UpdateProductRequestDto } from 'src/dto/update-product/update-product-request.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MongoDBService {
  constructor(private prisma: PrismaService) {}

  async getProductsFromDb() {
    try {
      const products = await this.prisma.product.findMany();
      console.log(products);
      return products;
    } catch (error) {
      throw new NotFoundException('Failed to find products in DB');
    }
  }

  async getProductByIdFromDb(id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: id },
      });
      return product;
    } catch (error) {
      throw new NotFoundException('Failed to find product in DB');
    }
  }

  async addProductToDb(addProductRequest: AddProductRequestDto) {
    try {
      const addProduct = await this.prisma.product.create({
        data: addProductRequest,
      });
      return addProduct;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Failed to add product to DB');
    }
  }

  async updateProductFromDb(
    updateProductRequest: UpdateProductRequestDto,
    id: string,
  ) {
    try {
      const updateProduct = await this.prisma.product.update({
        where: { id: id },
        data: updateProductRequest,
      });
      return updateProduct;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  async deleteProductFromDb(id: string) {
    try {
      const deleteProduct = await this.prisma.product.delete({
        where: { id: id },
      });
      return deleteProduct;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete product');
    }
  }
}
