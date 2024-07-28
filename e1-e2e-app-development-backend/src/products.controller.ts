import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AddProductRequestDto } from './dto/add-product/add-product-request.dto';
import { UpdateProductRequestDto } from './dto/update-product/update-product-request.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('store/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Get all products',
    description: 'Endpoint to retrieve all products from the database',
  })
  @HttpCode(HttpStatus.OK)
  @Get() // to retrieve a list of products from the DB
  async getProducts() {
    console.log('getProducts');
    return this.productsService.getProducts();
  }

  @ApiOperation({
    summary: 'Get product',
    description:
      "Endpoint to retrieve a product from the database using the product's ID",
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id') // to query & retrieve a specific product from the DB
  async getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiOperation({
    summary: 'Add product',
    description: 'Endpoint to add a product to the database',
  })
  @HttpCode(HttpStatus.OK)
  @Post() //to add a new product to the DB
  async addProduct(@Body() addProductRequest: AddProductRequestDto) {
    console.log("calling add with: ", addProductRequest)
    return this.productsService.addProduct(addProductRequest);
  }

  @ApiOperation({
    summary: 'Update product',
    description: 'Endpoint to update a product in the database',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id') // to update an existing product in the DB
  async updateProduct(
    @Body() updateProductRequest: UpdateProductRequestDto,
    @Param('id') id: string,
  ) {
    console.log("calling update with: ", updateProductRequest, "and id: ", id)
    return this.productsService.updateProduct(updateProductRequest, id);
  }

  @ApiOperation({
    summary: 'Delete product',
    description: 'Endpoint to delete a product from the database',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id') // to delete an existing product from the DB
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
