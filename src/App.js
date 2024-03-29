import './App.css';
import Layout from './component/Layout/Layout';
import { Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import RawMaterialPurchaseList from './container/RawMaterialPurchase/RawMaterialPurchaseList';
import RawMaterialPurchase from './container/RawMaterialPurchase/RawMaterialPurchase';
import OrderList from './container/Order/OrderList';
import Order from './container/Order/Order';
import InventoryList from './container/Inventory/InventoryList';
import Inventory from './container/Inventory/Inventory';
import Home from './container/Home/Home';

function App() {
  const navigate = useNavigate();
  const location =useLocation();
  return (
    <div className="App">
      <Layout>
         <Routes>
           <Route path='/' exact element={<Home/>}/>
            <Route path="/raw-material/purchase"  exact element={<RawMaterialPurchaseList navigate={navigate} location={location}/>}/>
            <Route path='/raw-material/add' exact element={<RawMaterialPurchase navigate={navigate}/>}/>
            <Route path="/order" exact element={<OrderList navigate={navigate}/>}/>
            <Route path='/order/add' exact element={<Order navigate={navigate}/>}/>
            <Route path="/inventory" exact element={<InventoryList navigate={navigate}/>}/>
            <Route path='/inventory/add' exact element={<Inventory navigate={navigate}/>}/>
         </Routes>
      </Layout>
    </div>
  );
}

export default App;
