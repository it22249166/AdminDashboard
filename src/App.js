import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import Settings from 'pages/SettingsPage';
import Maps from 'pages/Maps';
import Footer from 'components/Footer';
import Product from 'pages/Product';
import Order from 'pages/Order';
import Customer from 'pages/Customer';
import Profile from 'pages/Profile';
// Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

function App() {
    return (
        <>
            <Sidebar />
            <div className="md:ml-64">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/product" component={Product} />
                    <Route exact path="/maps" component={Maps} />
                    <Route exact path="/order" component={Order} />
                    <Route path="/customer" component={Customer} />
                    <Route path="/profile" component={Profile} />
                    <Redirect from="*" to="/" />
                </Switch>
                <Footer />
            </div>
        </>
    );
}

export default App;
