import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { HttpStatus } from '@nestjs/common';
import { Cat } from 'src/domain/entities/cat';

describe('CatController', () => {
  let catController: CatController;
  const findAllCatServiceMock = {
    execute: jest.fn(),
  };
  const logger = {
    error: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        {
          provide: 'FindAllCatService',
          useValue: findAllCatServiceMock,
        },
        { provide: 'ILogger', useValue: logger },
      ],
    }).compile();

    catController = app.get<CatController>(CatController);
  });

  describe('getAllCats', () => {
    it('should return the result of findAllCatService.execute', async () => {
      const result: Cat[] = [{ name: 'Fluffy', age: 3, color: 'white' }];
      findAllCatServiceMock.execute.mockResolvedValue(result);
      const response = { json: jest.fn() };
      await catController.getAllCats(response);
      expect(response.json).toHaveBeenCalledWith(result);
    });

    it('should log an error and return a bad request status if an error is thrown', async () => {
      const error = new Error('Test error');
      findAllCatServiceMock.execute.mockRejectedValue(error);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await catController.getAllCats(response);

      expect(logger.error).toHaveBeenCalledWith(error.message, error.stack);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});
