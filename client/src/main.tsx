import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { store } from './store.ts'
import './index.css'

/**
 * Main entry point for the React application. We use a MUI theme and Redux store provider to wrap the App component.
 * 
 * See:
 *  - https://mui.com/customization/theming/
 *  - https://react-redux.js.org/introduction/quick-start
 */

const theme = createTheme({
    typography: {
        fontFamily: 'Helvetica, Arial, sans-serif',
        h1: {
            color: '#111111'
        },
        h5: {
            color: '#666666'
        }
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </StrictMode>,
)
