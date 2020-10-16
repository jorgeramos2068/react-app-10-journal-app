import { setError, removeError, startLoading, finishLoading } from '../../actions/ui';
import types from '../../types/types';

describe('Tests for ui actions', () => {
  test('Should work for setError action', () => {
    const err = 'error_type';
    const action = setError(err);
    expect(action).toEqual({
      type: types.uiSetError,
      payload: err
    });
  });

  test('Should work for removeError action', () => {
    const action = removeError();
    expect(action).toEqual({
      type: types.uiRemoveError
    });
  });

  test('Should work for startLoading action', () => {
    const action = startLoading();
    expect(action).toEqual({
      type: types.uiStartLoading
    });
  });

  test('Should work for finishLoading action', () => {
    const action = finishLoading();
    expect(action).toEqual({
      type: types.uiFinishLoading
    });
  });
});
