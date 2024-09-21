import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';

/**
 * We use `react-router-dom` to define the routes for the application.
 */

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route path="/" element={<IndexPage />} />,
        <Route path="add" element={<AddPage />} />,
        <Route path="edit/:id" element={<EditPage />} />,
    ])
)

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
