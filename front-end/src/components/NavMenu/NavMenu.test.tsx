import React from 'react';
import * as renderer from 'react-test-renderer';
import { fireEvent, render, act } from '@testing-library/react';
import NavMenu from './NavMenu';
import { navItems } from './NavItemHolder/NavItemHolder';

test('Nav menu contains all items', () => {
    const { getByText } = render(<NavMenu>Button</NavMenu>);
    navItems.forEach(({ name }) => expect(getByText(name)).toBeVisible());
});
