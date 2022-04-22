import { Dispatch } from '@reduxjs/toolkit';

import { Provider } from 'react-redux';
import { act, renderHook } from '@testing-library/react-hooks';
import * as appStatehooks from '../state/appStateHook';
import * as userSettingshooks from '../userSettings/userSettingsHook';
import { createTestStore } from '../../utils/testsUtils/createTestStore.util';
import { useApp } from './appHook';
import { useUserSettingsMock } from '../userSettings/userSettingsHook.mock';
import { setUserSettingsAction, unsetUserAction } from '../../state/user/user.actions';
import { FirebaseUserSettingsDto } from '../../models/dtos/firebaseStore/firebaseUserSettings.model';
import { createJsDomUnsupportedMethods } from '../../utils/testsUtils/jsDomUnsupportedMethods.util';
import { Theme } from '../../models/internal/types/ThemeEnum.model';
import { Language } from '../../models/internal/types/LanguageEnum.model';

describe('<useApp />', () => {
  let useAppStore: any;
  let wrapper: any;

  let browserLanguageSpy: any;
  let browserThemeSpy: any;
  const useAppDispatchMockResponse = jest.fn((action) => {}) as Dispatch<any>;

  beforeEach(() => {
    useAppStore = createTestStore();
    createJsDomUnsupportedMethods();
    wrapper = function ({ children }: { children: any }) {
      return <Provider store={useAppStore}>{children}</Provider>;
    };

    browserLanguageSpy = jest.spyOn(window.navigator, 'language', 'get');
    browserThemeSpy = jest.spyOn(window, 'matchMedia');

    jest.spyOn(appStatehooks, 'useAppDispatch')
      .mockReturnValue(useAppDispatchMockResponse);

    jest.spyOn(userSettingshooks, 'useUserSettings')
      .mockImplementation(useUserSettingsMock);
  });

  it('should create', async () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result).toBeDefined();
  });

  it('should set userSettings if redux userSettings change to defined value', async () => {
    const inputUserSettings = { darkMode: true, lang: Language.French } as FirebaseUserSettingsDto;
    const { result } = renderHook(() => useApp(), { wrapper });

    await act(async () => {
      useAppStore.dispatch(setUserSettingsAction(inputUserSettings));
    });

    expect(result.current.language).toEqual(inputUserSettings.lang);
    expect(result.current.theme).toEqual(Theme.Dark);
  });

  it('should set userSettings if redux userSettings change to undefined value', async () => {
    // mocking browserSettings
    const browserLanguage = Language.Spanish;
    const browserTheme = Theme.Light;

    await act(async () => {
      browserLanguageSpy.mockReturnValue(browserLanguage);
      browserThemeSpy.mockReturnValue({
        matches: false,
      });
    });

    const { result } = renderHook(() => useApp(), { wrapper });

    await act(async () => {
      useAppStore.dispatch(unsetUserAction());
    });

    expect(result.current.language).toEqual(browserLanguage);
    expect(result.current.theme).toEqual(browserTheme);
  });
});
