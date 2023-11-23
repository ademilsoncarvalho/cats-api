import { Cat } from 'src/domain/entities/cat';
import { FindAllCatService } from './findAll.cat.service';

describe('FindAllCatService', () => {
  let findAllCatService: FindAllCatService;
  let mockLogger: any;
  let mockCatRepository: any;

  beforeEach(() => {
    mockLogger = {
      error: jest.fn(),
    };

    mockCatRepository = {
      getCats: jest.fn(),
    };

    findAllCatService = new FindAllCatService(mockLogger, mockCatRepository);
  });

  it('should return cats from repository', async () => {
    const mockCats: Cat[] = [{ name: 'Fluffy', age: 3, color: 'white' }];
    mockCatRepository.getCats.mockResolvedValue(mockCats);

    const result = await findAllCatService.execute();

    expect(result).toEqual(mockCats);
    expect(mockCatRepository.getCats).toHaveBeenCalled();
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('should log error when repository throws an error', async () => {
    const errorMessage = 'Database error';
    mockCatRepository.getCats.mockRejectedValue(new Error(errorMessage));
    await findAllCatService.execute();
    expect(mockLogger.error).toHaveBeenCalled();
  });

  it('should return an empty array if getCats fails', async () => {
    mockCatRepository.getCats.mockRejectedValue(new Error('Database error'));
    const result = await findAllCatService.execute();
    expect(result).toEqual([]);
  });
});
