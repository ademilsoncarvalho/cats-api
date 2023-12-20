import { Cat } from 'src/domain/entities/cat';
import { CreateCatService } from './create.cat.service';

describe('CreateCatService', () => {
  let createCatService: CreateCatService;
  let mockLogger: any;
  let mockCatRepository: any;

  beforeEach(() => {
    mockLogger = {
      error: jest.fn(),
    };

    mockCatRepository = {
      createCat: jest.fn(),
    };

    createCatService = new CreateCatService(mockLogger, mockCatRepository);
  });

  it('should create a cat', async () => {
    const mockCatData = { id: null, name: 'Fluffy', age: 3, color: 'white' };
    const mockCat: Cat = { id: 1, ...mockCatData };
    mockCatRepository.createCat.mockResolvedValue(mockCat);

    const result = await createCatService.execute(mockCatData);

    expect(result).toEqual(mockCat);
    expect(mockCatRepository.createCat).toHaveBeenCalledWith(mockCatData);
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('should throw an error if cat data is invalid', async () => {
    const mockCatData = { name: '', age: 3, color: 'white' };
    const errorMessage = 'Invalid cat data';
    createCatService.execute(mockCatData);
    expect(mockCatRepository.createCat).not.toHaveBeenCalled();
    expect(mockLogger.error).toHaveBeenCalledWith(
      'CreateCatService',
      errorMessage,
      expect.any(String),
    );
  });

  it('should log error when repository throws an error', async () => {
    const mockCatData = { name: 'Fluffy', age: 3, color: 'white' };
    const errorMessage = 'Database error';
    mockCatRepository.createCat.mockRejectedValue(new Error(errorMessage));

    await createCatService.execute(mockCatData);

    expect(mockLogger.error).toHaveBeenCalled();
  });
});

// FILEPATH: /home/www/api-nest/src/application/services/delete.cat.service.spec.ts

import { DeleteCatService } from './delete.cat.service';

describe('DeleteCatService', () => {
  let deleteCatService: DeleteCatService;
  let mockLogger: any;
  let mockCatRepository: any;

  beforeEach(() => {
    mockLogger = {
      error: jest.fn(),
    };

    mockCatRepository = {
      getCatById: jest.fn(),
      deleteCat: jest.fn(),
    };

    deleteCatService = new DeleteCatService(mockLogger, mockCatRepository);
  });

  it('should delete a cat', async () => {
    const mockCatId = 1;
    const mockCat = { id: mockCatId, name: 'Fluffy', age: 3, color: 'white' };
    mockCatRepository.getCatById.mockResolvedValue(mockCat);

    const result = await deleteCatService.execute(mockCatId);

    expect(result).toBe(true);
    expect(mockCatRepository.getCatById).toHaveBeenCalledWith(mockCatId);
    expect(mockCatRepository.deleteCat).toHaveBeenCalledWith(mockCatId);
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('should throw an error if cat is not found', async () => {
    const mockCatId = 1;
    const errorMessage = 'Cat not found';
    mockCatRepository.getCatById.mockResolvedValue(null);

    const result = await deleteCatService.execute(mockCatId);

    expect(result).toBe(false);
    expect(mockCatRepository.getCatById).toHaveBeenCalledWith(mockCatId);
    expect(mockCatRepository.deleteCat).not.toHaveBeenCalled();
    expect(mockLogger.error).toHaveBeenCalledWith(
      'DeleteCatService',
      errorMessage,
      expect.any(String),
    );
  });

  it('should log error when repository throws an error', async () => {
    const mockCatId = 1;
    const errorMessage = 'Database error';
    mockCatRepository.getCatById.mockRejectedValue(new Error(errorMessage));

    await deleteCatService.execute(mockCatId);

    expect(mockLogger.error).toHaveBeenCalled();
  });
});
