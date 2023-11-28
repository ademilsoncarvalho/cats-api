import { Test, TestingModule } from '@nestjs/testing';
import { CatController } from './cat.controller';
import { HttpStatus } from '@nestjs/common';
import { Cat } from 'src/domain/entities/cat';

describe('CatController', () => {
  let catController: CatController;
  const findAllCatServiceMock = {
    execute: jest.fn(),
  };
  const createCatServiceMock = {
    execute: jest.fn(),
  };
  const updateCatServiceMock = {
    execute: jest.fn(),
  };
  const deleteCatServiceMock = {
    execute: jest.fn(),
  };
  const findByIdCatService = {
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
        {
          provide: 'CreateCatService',
          useValue: createCatServiceMock,
        },
        {
          provide: 'UpdateCatService',
          useValue: updateCatServiceMock,
        },
        {
          provide: 'DeleteCatService',
          useValue: deleteCatServiceMock,
        },
        {
          provide: 'FindByIdCatService',
          useValue: findByIdCatService,
        },
        { provide: 'ILogger', useValue: logger },
      ],
    }).compile();

    catController = app.get<CatController>(CatController);
  });

  describe('getAllCats', () => {
    it('should return the result of findAllCatService.execute', async () => {
      const result: Cat[] = [{ id: 1, name: 'Fluffy', age: 3, color: 'white' }];
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
  describe('createCat', () => {
    it('should return the result of createCatService.execute', async () => {
      const result: Cat = { id: 1, name: 'Fluffy', age: 3, color: 'white' };
      createCatServiceMock.execute.mockResolvedValue(result);
      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      await catController.createCat(response, result);
      expect(response.json).toHaveBeenCalledWith(result);
    });

    it('should log an error and return a bad request status if an error is thrown', async () => {
      const error = new Error('Test error');
      createCatServiceMock.execute.mockRejectedValue(error);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const result: Cat = { id: 1, name: 'Fluffy', age: 3, color: 'white' };

      await catController.createCat(response, result);

      expect(logger.error).toHaveBeenCalledWith(error.message, error.stack);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getCat', () => {
    it('should return a cat when findByIdCatService.execute is successful', async () => {
      const catId = '1';
      const cat: Cat = { id: 1, name: 'Fluffy', age: 3, color: 'white' };
      findByIdCatService.execute.mockResolvedValue(cat);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await catController.getCat(response, catId);

      expect(response.json).toHaveBeenCalledWith(cat);
    });

    it('should log an error and return a not found status if no cat is found', async () => {
      const catId = '1';
      findByIdCatService.execute.mockResolvedValue(null);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await catController.getCat(response, catId);

      expect(logger.error).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(response.json).toHaveBeenCalledWith({
        message: 'Cat not found teste',
      });
    });

    it('should log an error and return a bad request status if an error is thrown', async () => {
      const catId = '1';
      const error = new Error('Test error');
      findByIdCatService.execute.mockRejectedValue(error);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await catController.getCat(response, catId);

      expect(logger.error).toHaveBeenCalledWith(error.message, error.stack);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('updateCat', () => {
    it('should return the updated cat when updateCatService.execute is successful', async () => {
      const catId = '1';
      const updatedCat: Cat = {
        id: 1,
        name: 'Updated',
        age: 4,
        color: 'gray',
      };
      findByIdCatService.execute.mockResolvedValue({ id: 1 });
      updateCatServiceMock.execute.mockResolvedValue(updatedCat);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await catController.updateCat(response, catId, updatedCat);

      expect(response.json).toHaveBeenCalledWith(updatedCat);
    });

    it('should log an error and return a not found status if no cat is found for update', async () => {
      const catId = '1';
      findByIdCatService.execute.mockResolvedValue(null);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await catController.updateCat(response, catId, {
        name: 'Updated',
        age: 4,
        color: 'gray',
      });

      expect(logger.error).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(response.json).toHaveBeenCalledWith({
        message: 'Cat not found',
      });
    });

    it('should log an error and return a bad request status if an error is thrown', async () => {
      const catId = '1';
      const error = new Error('Test error');
      findByIdCatService.execute.mockResolvedValue({ id: 1 });
      updateCatServiceMock.execute.mockRejectedValue(error);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await catController.updateCat(response, catId, {
        name: 'Updated',
        age: 4,
        color: 'gray',
      });

      expect(logger.error).toHaveBeenCalledWith(error.message, error.stack);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('deleteCat', () => {
    it('should return no content when deleteCatService.execute is successful', async () => {
      const catId = '1';
      deleteCatServiceMock.execute.mockResolvedValue(true);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await catController.deleteCat(response, catId);

      expect(response.status).toHaveBeenCalledWith(HttpStatus.NO_CONTENT);
      expect(response.json).toHaveBeenCalled();
    });

    it('should log an error and return a not found status if no cat is found for deletion', async () => {
      const catId = '1';
      deleteCatServiceMock.execute.mockResolvedValue(false);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await catController.deleteCat(response, catId);

      expect(logger.error).toHaveBeenCalled();
      expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(response.json).toHaveBeenCalledWith({
        message: 'Cat not found',
      });
    });

    it('should log an error and return a bad request status if an error is thrown', async () => {
      const catId = '1';
      const error = new Error('Test error');
      deleteCatServiceMock.execute.mockRejectedValue(error);

      const response = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await catController.deleteCat(response, catId);

      expect(logger.error).toHaveBeenCalledWith(error.message, error.stack);
      expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(response.json).toHaveBeenCalledWith({ message: error.message });
    });
  });
});
