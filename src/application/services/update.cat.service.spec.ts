import { UpdateCatService } from './update.cat.service';
import { Cat } from 'src/domain/entities/cat';

describe('UpdateCatService', () => {
  let updateCatService: UpdateCatService;
  let mockLogger: any;
  let mockCatRepository: any;

  beforeEach(() => {
    mockLogger = {
      error: jest.fn(),
    };

    mockCatRepository = {
      getCatById: jest.fn(),
      updateCat: jest.fn(),
    };

    updateCatService = new UpdateCatService(mockLogger, mockCatRepository);
  });

  it('should update the cat and return it', async () => {
    const mockCat: Cat = { id: 1, name: 'Fluffy', age: 3, color: 'white' };
    const updatedCatData = { id: 1, name: 'Whiskers', age: 4, color: 'gray' };
    mockCatRepository.getCatById.mockResolvedValue(mockCat);

    const result = await updateCatService.execute(1, updatedCatData);

    expect(result).toEqual(updatedCatData);
    expect(mockCatRepository.getCatById).toHaveBeenCalledWith(1);
    expect(mockCatRepository.updateCat).toHaveBeenCalledWith(1, updatedCatData);
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('should throw an error if the cat is not found', async () => {
    const updatedCatData = { name: 'Whiskers', age: 4, color: 'gray' };
    mockCatRepository.getCatById.mockResolvedValue(null);
    const errorMesaage = 'Cat not found';
    await updateCatService.execute(1, updatedCatData);
    expect(mockCatRepository.getCatById).toHaveBeenCalledWith(1);
    expect(mockCatRepository.updateCat).not.toHaveBeenCalled();
    expect(mockLogger.error).toHaveBeenCalledWith(
      'UpdateCatService',
      errorMesaage,
      expect.any(String),
    );
  });

  it('should log error when an error occurs during update', async () => {
    const errorMessage = 'Database error';
    const updatedCatData = { name: 'Whiskers', age: 4, color: 'gray' };
    mockCatRepository.getCatById.mockResolvedValue({
      id: 1,
      name: 'Fluffy',
      age: 3,
      color: 'white',
    });
    mockCatRepository.updateCat.mockRejectedValue(new Error(errorMessage));

    await updateCatService.execute(1, updatedCatData);

    expect(mockLogger.error).toHaveBeenCalledWith(
      'UpdateCatService',
      errorMessage,
      expect.any(String),
    );
  });

  it('should return null if an error occurs during update', async () => {
    const errorMessage = 'Database error';
    const updatedCatData = { name: 'Whiskers', age: 4, color: 'gray' };
    mockCatRepository.getCatById.mockResolvedValue({
      id: 1,
      name: 'Fluffy',
      age: 3,
      color: 'white',
    });
    mockCatRepository.updateCat.mockRejectedValue(new Error(errorMessage));

    const result = await updateCatService.execute(1, updatedCatData);

    expect(result).toBeNull();
  });
});
