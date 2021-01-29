import {render, screen} from '@testing-library/react';
import App from './App';

test('renders back button', () => {
    render(<App/>);
    const backButtonElement = screen.getByText(/Back/i);
    expect(backButtonElement).toBeInTheDocument();
});
