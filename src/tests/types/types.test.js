import types from '../../types/types';

describe('Tests in types.js', () => {
  test('Should match types object', () => {
    const testTypes = {
      login: '[Auth] Login',
      logout: '[Auth] Logout',
    
      uiSetError: '[UI] Set error',
      uiRemoveError: '[UI] Remove error',
    
      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',
    
      notesAddNew: '[Notes] New note',
      notesActive: '[Notes] Set active note',
      notesLoad: '[Notes] Load notes',
      notesUpdate: '[Notes] Update node',
      notesImgUrl: '[Notes] Update image url',
      notesDelete: '[Notes] Delete node',
      notesLogoutCleaning: '[Notes] Logout cleaning',
    };
    expect(types).toEqual(testTypes);
  });
});
