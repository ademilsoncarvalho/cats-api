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
    const errorMesaage = 'Invalid cat data';
    createCatService.execute(mockCatData);
    expect(mockCatRepository.createCat).not.toHaveBeenCalled();
    expect(mockLogger.error).toHaveBeenCalledWith(
      'CreateCatService',
      errorMesaage,
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
