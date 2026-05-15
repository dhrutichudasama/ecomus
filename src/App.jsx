import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Herosection from './components/Herosection'
import CategorySection from './components/CategorySection'
import BestSeller from './components/BestSeller'
import ShopTheLook from './components/ShopTheLook'
import ReviewSection from './components/ReviewSection'
import GallerySection from './components/GallerySection'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'
import CollectionSection from './components/CollectionSection';
import Blog from './components/Blog';
import Wishlist from './components/Wishlist';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { QuickViewProvider } from './context/QuickViewContext';
import { CompareProvider } from './context/CompareContext';
import { ModalProvider } from './context/ModalContext';
import QuickViewModal from './components/QuickViewModal';
import CompareBar from './components/CompareBar';
import MobileBottomNav from './components/MobileBottomNav';
import MobileSidebar from './components/MobileSidebar';
import SearchDrawer from './components/SearchDrawer';
import AuthModal from './components/AuthModal';

const Home = ({ currentSlide, setCurrentSlide }) => (
  <>
    <Herosection currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
    <CategorySection />
    <BestSeller />
    <ShopTheLook />
    <ReviewSection />
    <GallerySection />
  </>
);

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <ModalProvider>
      <CompareProvider>
        <QuickViewProvider>
          <CartProvider>
            <WishlistProvider>
              <Router>
                <div className="flex flex-col min-h-screen">
                  <Header currentSlide={currentSlide} />
                  <MobileSidebar />
                  <CartDrawer />
                  <SearchDrawer />
                  <AuthModal />
                  <QuickViewModal />
                  <CompareBar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/product" element={<ProductDetail />} />
                      <Route path="/shop" element={<CollectionSection />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                  </main>
                  <MobileBottomNav />
                  <Footer />
                </div>
              </Router>
              
            </WishlistProvider>
          </CartProvider>
        </QuickViewProvider>
      </CompareProvider>
    </ModalProvider>
  )
}

export default App
