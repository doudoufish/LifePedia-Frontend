import { Provider } from 'pkg/component/provider'
import 'pkg/style'
import ReactDOM from 'react-dom/client'
import 'regenerator-runtime/runtime'
import { Router } from './router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider>
		<Router />
	</Provider>
)
