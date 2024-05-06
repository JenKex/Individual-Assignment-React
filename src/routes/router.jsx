import { createHashRouter } from 'react-router-dom'
import Root from './root.jsx'
import LandingPage from './LandingPage.jsx';
import ShoppingCart from './ShoppingCart.jsx';
import LoginPage from './LoginPage.jsx';
import EditPage from './EditPage.jsx';

const router = createHashRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
                path: '/',
                element: <LandingPage />
            },
			{
				path: '/Kundvagn',
				element: <ShoppingCart />
			},
			{
				path: '/Logga-in',
				element: <LoginPage />
			},
            {
                path: '/Administration',
                element: <EditPage />
            }
		]
	},
	
]);

export { router }