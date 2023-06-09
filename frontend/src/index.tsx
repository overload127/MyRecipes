import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUserFromLocalStorage } from 'store/reducers/auth/ActionCreators';
import { ThemeProvider } from 'context/Theme';
import MainApp from './MainApp/MainApp';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/typography.css';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <Routes>
          <Route path="/*" element={<MainApp />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);

store.dispatch(loadUserFromLocalStorage());

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
