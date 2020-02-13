import React from 'react';
import Button, {ReactiveButton} from './Button';
import * as renderer from 'react-test-renderer';
import {fireEvent, render, act} from '@testing-library/react';
import {VariantNames} from '../Theming';

test('Button style changes depending on props', () => {
    const renderedSnapshot = renderer.create(
        <>
            <Button variant="info">info</Button>
            {VariantNames.map(name => (
                <div key={name}>
                    <h3>{name}</h3>
                    <Button variant={name}>Submit</Button>
                    <Button variant={name} disabled>Submit</Button>
                    <Button variant={name} outline>Submit</Button>
                    <Button variant={name} outline disabled>Submit</Button>
                    <ReactiveButton variant={name}>Submit</ReactiveButton>
                    <ReactiveButton variant={name} disabled>Submit</ReactiveButton>
                    <ReactiveButton variant={name} outline>Submit</ReactiveButton>
                    <ReactiveButton variant={name} outline disabled>Submit</ReactiveButton>
                </div>
            ))}
        </>
    ).toJSON()
    expect(renderedSnapshot).toMatchSnapshot();
});

test('Button children are rendered', () => {
    const TestComponent = ({children, ...props}: any) => (
        <>TestComponent: {children}</>
    );
    const {getByText} = render(<ReactiveButton><TestComponent>This is a test</TestComponent></ReactiveButton>);
    expect(getByText(/TestComponent: This is a test/i)).toHaveTextContent('TestComponent: This is a test');
});

test('Reactive button changes state when hovered', async () => {
    const {getByText} = render(<ReactiveButton>Button</ReactiveButton>);
    expect(getByText(/Button/i).className).toMatchSnapshot('before');
    await act(async () => {
        fireEvent.click(getByText(/Button/i));
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    act(() => {
                        expect(getByText(/Button/i).className).toMatchSnapshot('during');
                    })
                    resolve();
                } catch(err) {
                    reject(err);
                }
            }, 50)
        })
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    act(() => {
                        expect(getByText(/Button/i).className).toMatchSnapshot('after');
                    })
                    resolve();
                } catch(err) {
                    reject(err);
                }
            }, 200)
        });
    });
})
