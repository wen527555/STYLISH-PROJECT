import { GlobalStyles } from "./styles/GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Member from "./pages/member";
import Thankyou from "./pages/ThankYou";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { MainContent } from "./styles/App.styled";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Header />
      <MainContent>
        <Routes>
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/member" element={<Member />} />
          <Route path="/thankyou" element={<Thankyou />} />
        </Routes>
      </MainContent>
      <Footer />
    </Router>
  );
}

export default App;
