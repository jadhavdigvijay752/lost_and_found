// Functionality imports
import { Provider } from 'react-redux';
import store from './redux/store';
// UI imports
import RouteConfig from './routes/RouteConfig';

/**
 * Main application component that sets up the Redux provider and route configuration.
 * 
 * @component
 * @returns {JSX.Element} The rendered application component.
 */
function App() {
	return (
		<>
			<Provider store={store}>
				<RouteConfig />
			</Provider>
		</>
	);
}

export default App;
