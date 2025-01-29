import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let spinnerService: SpinnerService;

  beforeEach(() => {
    spinnerService = new SpinnerService();
  });

  describe('#incrementRequestCounter', () => {
    it('should increase `httpRequestCounter` by one', () => {
      (spinnerService as any).httpRequestCounter = 2;
      spinnerService.incrementRequestCounter();
      expect((spinnerService as any).httpRequestCounter).toBe(3);
    });

    it('should set `showSpinner` to TRUE if the httpRequestCounter is  one', () => {
      (spinnerService as any).showSpinner = false;
      (spinnerService as any).httpRequestCounter = 0;
      spinnerService.incrementRequestCounter();
      expect((spinnerService as any).showSpinner).toBe(true);
    });
  });

  describe('#decrementRequestCounter', () => {
    it('should decrease `httpRequestCounter` by one', () => {
      (spinnerService as any).httpRequestCounter = 2;
      spinnerService.decrementRequestCounter();
      expect((spinnerService as any).httpRequestCounter).toBe(1);
    });

    it('should set `showSpinner` to false if the httpRequestCounter is less than one', () => {
      (spinnerService as any).httpRequestCounter = 1;
      spinnerService.decrementRequestCounter();
      expect((spinnerService as any).showSpinner).toBe(false);
    });

    it('should NOT set `showSpinner` to false if the httpRequestCounter is greater than zero', () => {
      (spinnerService as any).showSpinner = true;
      (spinnerService as any).httpRequestCounter = 2;
      spinnerService.decrementRequestCounter();
      expect((spinnerService as any).showSpinner).toBe(true);
    });
  });
});
