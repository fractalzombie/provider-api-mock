import { VisaMockExceptionFilter } from 'src/visa-mock/visa-mock.exception.filter';

describe('VisaMockFilter', () => {
  it('should be defined', () => {
    expect(new VisaMockExceptionFilter()).toBeDefined();
  });
});
