import * as React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render, screen, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithLocalization } from '../../test/mock-localization';
import LocalizationSelectComplex from './localization-select-complex';

expect.extend(toHaveNoViolations);

describe('LocalizationSelectComplex', () => {
  it('should render with no accessibility violations', async () => {
    const renderResult: RenderResult = await renderWithLocalization(
      <LocalizationSelectComplex onLocaleChange={() => null} />
    );
    const results = await axe(renderResult.container);
    expect(results).toHaveNoViolations();
  });

  it('should call onLocalChange with a new locale when changed', async () => {
    const onLocalChangeMock = jest.fn();
    await renderWithLocalization(
      <LocalizationSelectComplex onLocaleChange={onLocalChangeMock} />
    );

    // pick an option in the select box
    userEvent.selectOptions(
      screen.getAllByLabelText('Choose language/localization')[1],
      screen.getByRole('option', { name: '臺語' })
    );

    expect(onLocalChangeMock).toBeCalledWith('nan-tw');
    expect(onLocalChangeMock).toBeCalledTimes(1);
  });
});