import { Test, TestingModule } from '@nestjs/testing';
import { ExceptionFiltersController } from './exception-filters.controller';

describe('ExceptionFiltersController', () => {
  let controller: ExceptionFiltersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExceptionFiltersController],
    }).compile();

    controller = module.get<ExceptionFiltersController>(ExceptionFiltersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
