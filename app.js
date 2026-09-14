// MAYURA DESIGNS - MAIN REACT APPLICATION CORE (WHATSAPP STOREFRONT)

const { useState, useEffect, useMemo } = React;
const store = window.mayuraStore;

function App() {
  // App Navigation & Modal States
  const [currentView, setCurrentView] = useState('home'); // 'home', 'shop', 'product-detail', 'cart', 'about', 'collections', 'contact', 'policy', 'admin'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeFilter, setActiveFilter] = useState('all'); // 'under-999', 'under-1499', 'new', 'bestseller', 'sale'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  
  // Data state
  const [products, setProducts] = useState(store.getProducts());
  const [cart, setCart] = useState(store.getCart());
  const [lang, setLang] = useState(store.getLang());

  // Admin Auth & Portal State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState('');
  const [adminTab, setAdminTab] = useState('products'); // 'products', 'categories', 'districts'
  const [adminProductModalOpen, setAdminProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [adminProductForm, setAdminProductForm] = useState({
    code: '', name: '', nameMl: '', category: 'Kasavu', mrp: 2499, price: 1799, discount: 28, stock: 10,
    fabric: 'Pure Cotton Kasavu', length: '6.3 Meters', care: 'Dry Clean Only', description: '', image: './assets/images/kasavu_1.jpg'
  });

  // Guest Order Details Form for WhatsApp Checkout
  const [customerForm, setCustomerForm] = useState({
    name: '',
    phone: '',
    house: '',
    locality: '',
    district: 'Ernakulam (Kochi)',
    pincode: '682036',
    notes: ''
  });

  // Direct Single Product WhatsApp Modal
  const [directWhatsAppProduct, setDirectWhatsAppProduct] = useState(null);

  // Subscribe to store updates
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setProducts(store.getProducts());
      setCart(store.getCart());
      setLang(store.getLang());
    });
    return unsubscribe;
  }, []);

  // Filtered Products Logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (selectedCategory !== 'all') {
        const catMatch = product.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory.toLowerCase();
        if (!catMatch && selectedCategory !== product.category.toLowerCase()) return false;
      }
      
      if (activeFilter === 'under-999' && product.price >= 999) return false;
      if (activeFilter === 'under-1499' && product.price >= 1499) return false;
      if (activeFilter === 'new' && !product.isNewArrival) return false;
      if (activeFilter === 'bestseller' && !product.isBestSeller) return false;
      if (activeFilter === 'sale' && !product.isSale) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(q) || (product.nameMl && product.nameMl.includes(q)) || (product.code && product.code.toLowerCase().includes(q));
        const catMatch = product.category.toLowerCase().includes(q);
        const fabMatch = product.fabric.toLowerCase().includes(q);
        if (!nameMatch && !catMatch && !fabMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'discount') return b.discount - a.discount;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [products, selectedCategory, activeFilter, searchQuery, sortBy]);

  // Cart Totals
  const cartTotals = useMemo(() => {
    return store.getCartTotals(customerForm.district, customerForm.pincode);
  }, [cart, customerForm.district, customerForm.pincode]);

  const cartDetailed = useMemo(() => store.getCartDetailed(), [cart, products]);

  // Handlers
  const handleOpenProduct = (id) => {
    setSelectedProductId(id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (productId, qty = 1, openCart = true) => {
    store.addToCart(productId, qty);
    if (openCart) setIsCartOpen(true);
  };

  const handleBuyViaWhatsAppDirect = (product) => {
    setDirectWhatsAppProduct(product);
  };

  const handleSendWhatsAppCartOrder = (e) => {
    if (e) e.preventDefault();
    if (!customerForm.name || !customerForm.phone || !customerForm.house || !customerForm.locality || !customerForm.pincode) {
      alert('Please fill in your Full Name, Mobile Number, House, Locality, and PIN Code before ordering on WhatsApp.');
      return;
    }
    const url = store.buildWhatsAppUrl(cartDetailed, customerForm);
    window.open(url, '_blank');
  };

  const handleSendWhatsAppDirectOrder = (e) => {
    if (e) e.preventDefault();
    if (!customerForm.name || !customerForm.phone || !customerForm.house || !customerForm.locality || !customerForm.pincode) {
      alert('Please fill in your Full Name, Mobile Number, House, Locality, and PIN Code before ordering on WhatsApp.');
      return;
    }
    const url = store.buildWhatsAppUrl([{ product: directWhatsAppProduct, quantity: 1 }], customerForm);
    setDirectWhatsAppProduct(null);
    window.open(url, '_blank');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasscode === 'mayura2026' || adminPasscode === 'admin') {
      setIsAdminAuthenticated(true);
    } else {
      alert('Invalid Admin Passcode! Use "mayura2026"');
    }
  };

  const handleSaveAdminProduct = (e) => {
    e.preventDefault();
    if (editingProduct) {
      store.updateProduct({
        ...editingProduct,
        ...adminProductForm
      });
    } else {
      store.addProduct({
        ...adminProductForm,
        images: [adminProductForm.image || './assets/images/kasavu_1.jpg']
      });
    }
    setAdminProductModalOpen(false);
    setEditingProduct(null);
  };

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E293B] selection:bg-[#C5A059] selection:text-white">
      
      {/* 1. ANNOUNCEMENT BAR */}
      <div className="bg-[#0A1128] text-[#F4E8C1] text-xs py-2 px-4 text-center font-medium flex justify-between items-center border-b border-[#C5A059]/30">
        <div className="hidden sm:block text-[#C5A059]">✨ MAYURA DESIGNS - Timeless Kerala Sarees</div>
        <div className="mx-auto sm:mx-0 flex items-center gap-2">
          <span>{store.t('keralaOnlyDelivery')}</span>
          <span className="text-[#C5A059]">•</span>
          <span className="hidden md:inline">WhatsApp Order: +91 95674 77246</span>
        </div>
        <div className="flex items-center gap-2 font-semibold">
          <button 
            onClick={() => store.setLang('en')} 
            className={`px-1.5 py-0.5 rounded transition ${lang === 'en' ? 'bg-[#C5A059] text-[#0A1128]' : 'hover:text-white'}`}
          >
            EN
          </button>
          <span>|</span>
          <button 
            onClick={() => store.setLang('ml')} 
            className={`px-1.5 py-0.5 rounded transition ${lang === 'ml' ? 'bg-[#C5A059] text-[#0A1128]' : 'hover:text-white'}`}
          >
            മലയാളം
          </button>
        </div>
      </div>

      {/* 2. HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#C5A059]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="lg:hidden p-2 text-[#0A1128] hover:text-[#C5A059]"
            aria-label="Toggle Mobile Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* BRAND LOGO */}
          <div 
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
            className="cursor-pointer flex flex-col items-center group"
          >
            <div className="flex items-center gap-2">
              <svg className="w-7 h-7 text-[#C5A059] transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.5 8.5L21 9.5L16 14L17.5 20.5L12 17L6.5 20.5L8 14L3 9.5L9.5 8.5L12 2Z" />
              </svg>
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0A1128]">
                MAYURA <span className="text-[#C5A059] font-light">DESIGNS</span>
              </span>
            </div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#64748B] font-medium -mt-1">
              {store.t('tagline')}
            </span>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <button 
              onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#C5A059] transition ${currentView === 'home' ? 'text-[#C5A059] font-semibold border-b-2 border-[#C5A059] pb-1' : 'text-[#0A1128]'}`}
            >
              {store.t('navHome')}
            </button>
            <button 
              onClick={() => { setSelectedCategory('all'); setActiveFilter('all'); setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#C5A059] transition ${currentView === 'shop' && selectedCategory === 'all' && activeFilter === 'all' ? 'text-[#C5A059] font-semibold border-b-2 border-[#C5A059] pb-1' : 'text-[#0A1128]'}`}
            >
              {store.t('navShop')}
            </button>
            <button 
              onClick={() => { setCurrentView('collections'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#C5A059] transition ${currentView === 'collections' ? 'text-[#C5A059] font-semibold border-b-2 border-[#C5A059] pb-1' : 'text-[#0A1128]'}`}
            >
              {store.t('navCollections')}
            </button>
            <button 
              onClick={() => { setSelectedCategory('all'); setActiveFilter('new'); setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#C5A059] transition ${activeFilter === 'new' ? 'text-[#C5A059] font-semibold border-b-2 border-[#C5A059] pb-1' : 'text-[#0A1128]'}`}
            >
              {store.t('navNewArrivals')}
            </button>
            <button 
              onClick={() => { setSelectedCategory('all'); setActiveFilter('bestseller'); setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#C5A059] transition ${activeFilter === 'bestseller' ? 'text-[#C5A059] font-semibold border-b-2 border-[#C5A059] pb-1' : 'text-[#0A1128]'}`}
            >
              {store.t('navBestSellers')}
            </button>
            <button 
              onClick={() => { setCurrentView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#C5A059] transition ${currentView === 'about' ? 'text-[#C5A059] font-semibold border-b-2 border-[#C5A059] pb-1' : 'text-[#0A1128]'}`}
            >
              {store.t('navAbout')}
            </button>
            <button 
              onClick={() => { setCurrentView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`hover:text-[#C5A059] transition ${currentView === 'contact' ? 'text-[#C5A059] font-semibold border-b-2 border-[#C5A059] pb-1' : 'text-[#0A1128]'}`}
            >
              {store.t('navContact')}
            </button>
          </nav>

          {/* RIGHT SIDE ICONS */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#0A1128] hover:text-[#C5A059] transition"
              title="Search Sarees"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 bg-[#0A1128] text-white hover:bg-[#C5A059] transition rounded-full relative"
              title="Shopping Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartTotals.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-[#0A1128] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartTotals.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative bg-[#0A1128] text-white w-4/5 max-w-sm p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#C5A059]/30">
                <span className="font-serif text-xl font-bold text-[#C5A059]">MAYURA DESIGNS</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>
              <div className="mt-6 flex flex-col space-y-4 font-medium">
                <button onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#C5A059]">{store.t('navHome')}</button>
                <button onClick={() => { setSelectedCategory('all'); setCurrentView('shop'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#C5A059]">{store.t('navShop')}</button>
                <button onClick={() => { setCurrentView('collections'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#C5A059]">{store.t('navCollections')}</button>
                <button onClick={() => { setSelectedCategory('all'); setActiveFilter('new'); setCurrentView('shop'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#C5A059]">{store.t('navNewArrivals')}</button>
                <button onClick={() => { setSelectedCategory('all'); setActiveFilter('bestseller'); setCurrentView('shop'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#C5A059]">{store.t('navBestSellers')}</button>
                <button onClick={() => { setCurrentView('about'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#C5A059]">{store.t('navAbout')}</button>
                <button onClick={() => { setCurrentView('contact'); setIsMobileMenuOpen(false); }} className="text-left py-2 hover:text-[#C5A059]">{store.t('navContact')}</button>
              </div>
            </div>
            <div className="pt-6 border-t border-[#C5A059]/30 text-xs text-gray-400">
              <p>WhatsApp: +91 95674 77246</p>
              <p>Instagram: @mayura.designss</p>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH OVERLAY MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div className="bg-[#FAF8F5] rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#C5A059]/30 relative animate-fade-in">
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black">✕</button>
            <h3 className="font-serif text-2xl text-[#0A1128] font-bold mb-4">Search Mayura Sarees</h3>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={store.t('searchPlaceholder')}
              autoFocus
              className="w-full px-4 py-3 rounded-xl border-2 border-[#C5A059] bg-white text-lg focus:outline-none shadow-sm mb-4"
            />
            {searchQuery && (
              <div className="max-h-80 overflow-y-auto space-y-3">
                {filteredProducts.length === 0 ? (
                  <p className="text-gray-500 py-4 text-center">No sarees found matching "{searchQuery}".</p>
                ) : (
                  filteredProducts.map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => { handleOpenProduct(p.id); setIsSearchOpen(false); }}
                      className="flex items-center gap-4 p-2 hover:bg-[#F3EFEA] rounded-xl cursor-pointer transition"
                    >
                      <img src={p.images[0]} alt={p.name} className="w-16 h-20 object-cover rounded-lg" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#C5A059] bg-[#0A1128] px-1.5 py-0.5 rounded">{p.code || 'MD001'}</span>
                          <h4 className="font-serif font-bold text-[#0A1128]">{lang === 'ml' ? p.nameMl : p.name}</h4>
                        </div>
                        <p className="text-xs text-gray-500">{p.category} • ₹{p.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {isQuickViewOpen && quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in border border-[#C5A059]/30">
            <button onClick={() => setIsQuickViewOpen(false)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200">✕</button>
            <div className="rounded-2xl overflow-hidden bg-gray-50 h-72 md:h-full">
              <img src={quickViewProduct.images[0]} alt={quickViewProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#C5A059] uppercase">{quickViewProduct.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-xs font-mono font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-700">ID: {quickViewProduct.code || 'MD001'}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] mt-1">{lang === 'ml' ? quickViewProduct.nameMl : quickViewProduct.name}</h3>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-2xl font-bold text-[#0A1128]">₹{quickViewProduct.price.toLocaleString('en-IN')}</span>
                  <span className="text-sm text-gray-400 line-through">₹{quickViewProduct.mrp.toLocaleString('en-IN')}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{quickViewProduct.discount}% OFF</span>
                </div>
                <p className="text-xs text-gray-600 mt-4 line-clamp-3">{lang === 'ml' ? quickViewProduct.descriptionMl : quickViewProduct.description}</p>
              </div>
              <div className="mt-6 space-y-3">
                <button 
                  onClick={() => { handleBuyViaWhatsAppDirect(quickViewProduct); setIsQuickViewOpen(false); }}
                  className="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-sm shadow-md"
                >
                  <span>💬</span>
                  <span>{store.t('buyViaWhatsApp')}</span>
                </button>
                <button 
                  onClick={() => { handleAddToCart(quickViewProduct.id); setIsQuickViewOpen(false); }}
                  className="w-full py-2.5 bg-[#0A1128] text-white font-bold rounded-xl hover:bg-[#C5A059] hover:text-[#0A1128] transition text-xs"
                >
                  {store.t('addToCart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DIRECT WHATSAPP ORDER MODAL (COLLECTS ADDRESS BEFORE OPENING WHATSAPP) */}
      {directWhatsAppProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-[#C5A059]/40 animate-fade-in">
            <button onClick={() => setDirectWhatsAppProduct(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black">✕</button>
            
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <img src={directWhatsAppProduct.images[0]} alt={directWhatsAppProduct.name} className="w-16 h-20 object-cover rounded-xl" />
              <div>
                <span className="text-[10px] font-bold text-[#C5A059] uppercase">{directWhatsAppProduct.category} • ID: {directWhatsAppProduct.code || 'MD001'}</span>
                <h3 className="font-serif font-bold text-lg text-[#0A1128]">{directWhatsAppProduct.name}</h3>
                <span className="font-bold text-[#0A1128] text-base">₹{directWhatsAppProduct.price.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <form onSubmit={handleSendWhatsAppDirectOrder} className="mt-4 space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#0A1128]">Enter Delivery Details for WhatsApp Order</h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-0.5">Full Name *</label>
                  <input type="text" required value={customerForm.name} onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })} placeholder="e.g. Parvathy Nair" className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-0.5">Mobile Phone *</label>
                  <input type="tel" required value={customerForm.phone} onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })} placeholder="e.g. 9567477246" className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-0.5">House / Building *</label>
                <input type="text" required value={customerForm.house} onChange={(e) => setCustomerForm({ ...customerForm, house: e.target.value })} placeholder="e.g. Flat 4B, Lotus Villa" className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-0.5">Locality / Place *</label>
                  <input type="text" required value={customerForm.locality} onChange={(e) => setCustomerForm({ ...customerForm, locality: e.target.value })} placeholder="e.g. MG Road" className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-0.5">PIN Code *</label>
                  <input type="text" required value={customerForm.pincode} onChange={(e) => setCustomerForm({ ...customerForm, pincode: e.target.value })} placeholder="682036" className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-0.5">District *</label>
                <select value={customerForm.district} onChange={(e) => setCustomerForm({ ...customerForm, district: e.target.value })} className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none bg-white">
                  {KERALA_DISTRICTS.map(d => (
                    <option key={d.code} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="w-full py-3.5 bg-emerald-600 text-white font-bold text-sm rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-lg mt-4">
                <span>💬</span>
                <span>Send Order to WhatsApp (+91 95674 77246) →</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. DYNAMIC PAGE ROUTING VIEWS */}
      <main className="flex-1">

        {/* HOMEPAGE VIEW */}
        {currentView === 'home' && (
          <div>
            <section className="relative min-h-[85vh] bg-[#0A1128] text-white overflow-hidden flex items-center">
              <div className="absolute inset-0 z-0 opacity-40">
                <img src="./assets/images/hero.jpg" alt="Mayura Designs Hero Saree" className="w-full h-full object-cover scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1128] via-[#0A1128]/80 to-transparent z-10"></div>
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-20">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 text-[#F4E8C1] text-xs font-semibold uppercase tracking-widest mb-6">
                    <span>👑 Authentic Kerala Heritage</span>
                  </div>
                  
                  <h1 className="font-serif hero-title text-4xl sm:text-6xl font-bold leading-tight text-white mb-6 whitespace-pre-line">
                    {store.t('heroHeadline')}
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-gray-300 font-light mb-8 leading-relaxed">
                    {store.t('heroSub')}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => { setSelectedCategory('all'); setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-8 py-4 bg-[#C5A059] text-[#0A1128] font-bold rounded-xl text-base hover:bg-[#D4AF37] transition shadow-lg shadow-[#C5A059]/20"
                    >
                      {store.t('shopCollection')} →
                    </button>
                    
                    <button 
                      onClick={() => { setSelectedCategory('all'); setActiveFilter('new'); setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/30 font-semibold rounded-xl text-base hover:bg-white/20 transition"
                    >
                      {store.t('exploreNewArrivals')}
                    </button>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center sm:text-left">
                    <div>
                      <span className="font-serif text-2xl font-bold text-[#C5A059]">100%</span>
                      <p className="text-xs text-gray-400">Pure Handloom</p>
                    </div>
                    <div>
                      <span className="font-serif text-2xl font-bold text-[#C5A059]">Kerala</span>
                      <p className="text-xs text-gray-400">Fast Delivery</p>
                    </div>
                    <div>
                      <span className="font-serif text-2xl font-bold text-[#C5A059]">Direct</span>
                      <p className="text-xs text-gray-400">WhatsApp Orders</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SHOP BY CATEGORY SECTION */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">{store.t('shopByCategory')}</span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mt-2">Curated Kerala Weaves</h2>
                <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-4 rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {CATEGORIES.map(cat => (
                  <div 
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.name); setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md border border-[#C5A059]/20 aspect-[3/4] flex flex-col justify-end p-6"
                  >
                    <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover img-zoom" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/40 to-transparent"></div>
                    <div className="relative z-10 text-white">
                      <span className="text-xs font-bold text-[#C5A059] tracking-widest uppercase">{cat.count} Designs</span>
                      <h3 className="font-serif text-2xl font-bold mt-1">{lang === 'ml' ? cat.nameMl : cat.name}</h3>
                      <p className="text-xs text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">{cat.desc}</p>
                      <span className="inline-block text-xs font-semibold text-[#C5A059] mt-3">Explore Collection →</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* NEW ARRIVALS */}
            <section className="py-16 bg-[#F3EFEA] border-y border-[#C5A059]/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Fresh Off The Loom</span>
                    <h2 className="font-serif text-3xl font-bold text-[#0A1128] mt-1">{store.t('navNewArrivals')}</h2>
                  </div>
                  <button onClick={() => { setSelectedCategory('all'); setActiveFilter('new'); setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-sm font-bold text-[#C5A059] hover:underline">
                    View All →
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {products.filter(p => p.isNewArrival).slice(0, 4).map(p => (
                    <ProductCard key={p.id} product={p} lang={lang} onOpen={handleOpenProduct} onAddToCart={handleAddToCart} onBuyDirect={handleBuyViaWhatsAppDirect} onQuickView={(prod) => { setQuickViewProduct(prod); setIsQuickViewOpen(true); }} />
                  ))}
                </div>
              </div>
            </section>

            {/* EDITORIAL FEATURED COLLECTION */}
            <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-[#0A1128] rounded-3xl text-white overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase mb-2">Exclusive Edition</span>
                  <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight mb-4">The Kasavu Tissue Collection</h2>
                  <p className="text-gray-300 text-sm sm:text-base font-light mb-8 leading-relaxed">
                    Woven with micro-fine metallic gold threads and authentic Kerala cotton yarns. Experience unmatched radiance and luxury on your wedding day.
                  </p>
                  <div>
                    <button onClick={() => { setSelectedCategory('Kasavu'); setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-8 py-4 bg-[#C5A059] text-[#0A1128] font-bold rounded-xl hover:bg-[#D4AF37] transition shadow-lg">
                      Shop Featured Collection →
                    </button>
                  </div>
                </div>
                <div className="relative min-h-[350px]">
                  <img src="./assets/images/kasavu_1.jpg" alt="Kasavu Collection" className="w-full h-full object-cover" />
                </div>
              </div>
            </section>

            {/* BEST SELLERS */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Most Loved Sarees</span>
                  <h2 className="font-serif text-3xl font-bold text-[#0A1128] mt-1">{store.t('navBestSellers')}</h2>
                </div>
                <button onClick={() => { setSelectedCategory('all'); setActiveFilter('bestseller'); setCurrentView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-sm font-bold text-[#C5A059] hover:underline">
                  View All →
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.filter(p => p.isBestSeller).slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} lang={lang} onOpen={handleOpenProduct} onAddToCart={handleAddToCart} onBuyDirect={handleBuyViaWhatsAppDirect} onQuickView={(prod) => { setQuickViewProduct(prod); setIsQuickViewOpen(true); }} />
                ))}
              </div>
            </section>

            {/* INSTAGRAM FEED */}
            <section className="py-20 bg-white border-t border-[#C5A059]/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12">
                  <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Instagram @mayura.designss</span>
                  <h2 className="font-serif text-3xl font-bold text-[#0A1128] mt-1">{store.t('instagramTitle')}</h2>
                  <p className="text-xs text-gray-500 mt-2">Tag us on Instagram to get featured on our official storefront!</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {INSTAGRAM_POSTS.map(post => (
                    <div key={post.id} onClick={() => handleOpenProduct(post.productId)} className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square shadow">
                      <img src={post.image} alt={post.caption} className="w-full h-full object-cover img-zoom" />
                      <div className="absolute inset-0 bg-[#0A1128]/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                        <span className="text-xs font-bold text-[#C5A059]">📸 Instagram</span>
                        <p className="text-xs text-gray-200 line-clamp-3">{post.caption}</p>
                        <span className="text-xs font-bold bg-[#C5A059] text-[#0A1128] py-1 px-3 rounded-full text-center">Shop Product →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CUSTOMER REVIEWS */}
            <section className="py-20 bg-[#FAF8F5]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-14">
                  <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Verified Buyer Love</span>
                  <h2 className="font-serif text-3xl font-bold text-[#0A1128] mt-1">{store.t('customerReviews')}</h2>
                  <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {REVIEWS.map(rev => (
                    <div key={rev.id} className="bg-white p-8 rounded-2xl border border-[#C5A059]/20 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex text-amber-400 mb-4">{"★".repeat(rev.rating)}</div>
                        <p className="text-sm text-gray-700 italic font-serif mb-6">"{rev.comment}"</p>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="font-bold text-[#0A1128] text-sm">{rev.name}</h4>
                        <p className="text-xs text-[#C5A059]">{rev.location} • Verified Buyer</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SHOP / CATALOG VIEW */}
        {currentView === 'shop' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 border-b border-[#C5A059]/20 pb-6">
              <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Full Catalog</span>
              <h1 className="font-serif text-4xl font-bold text-[#0A1128] mt-1">
                {selectedCategory === 'all' ? 'All Handcrafted Sarees' : `${selectedCategory} Sarees`}
              </h1>
              <p className="text-sm text-gray-500 mt-2">Showing {filteredProducts.length} items</p>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setSelectedCategory('all')} className={`px-4 py-2 text-xs font-bold rounded-full transition ${selectedCategory === 'all' ? 'bg-[#0A1128] text-[#C5A059]' : 'bg-white text-gray-700 hover:bg-[#F3EFEA]'}`}>
                  {store.t('allCategories')}
                </button>
                {CATEGORIES.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.name)} className={`px-4 py-2 text-xs font-bold rounded-full transition ${selectedCategory.toLowerCase() === cat.name.toLowerCase() ? 'bg-[#0A1128] text-[#C5A059]' : 'bg-white text-gray-700 hover:bg-[#F3EFEA]'}`}>
                    {lang === 'ml' ? cat.nameMl : cat.name}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full lg:w-auto">
                <select value={activeFilter} onChange={(e) => setActiveFilter(e.target.value)} className="px-3 py-2 bg-white text-xs font-semibold rounded-xl border border-[#C5A059]/30 focus:outline-none">
                  <option value="all">All Items</option>
                  <option value="under-999">Under ₹999</option>
                  <option value="under-1499">Under ₹1,499</option>
                  <option value="new">New Arrivals</option>
                  <option value="bestseller">Best Sellers</option>
                  <option value="sale">Sale Products</option>
                </select>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 bg-white text-xs font-semibold rounded-xl border border-[#C5A059]/30 focus:outline-none">
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#C5A059]/20">
                <span className="text-4xl">🧵</span>
                <h3 className="font-serif text-2xl font-bold text-[#0A1128] mt-4">No Sarees Found</h3>
                <button onClick={() => { setSelectedCategory('all'); setActiveFilter('all'); setSearchQuery(''); }} className="mt-6 px-6 py-2.5 bg-[#C5A059] text-[#0A1128] font-bold text-xs rounded-xl">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} lang={lang} onOpen={handleOpenProduct} onAddToCart={handleAddToCart} onBuyDirect={handleBuyViaWhatsAppDirect} onQuickView={(prod) => { setQuickViewProduct(prod); setIsQuickViewOpen(true); }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* PRODUCT DETAIL PAGE (PDP) */}
        {currentView === 'product-detail' && selectedProduct && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <nav className="text-xs text-gray-500 mb-8 flex items-center gap-2">
              <span className="cursor-pointer hover:underline" onClick={() => setCurrentView('home')}>Home</span>
              <span>/</span>
              <span className="cursor-pointer hover:underline" onClick={() => setCurrentView('shop')}>Shop</span>
              <span>/</span>
              <span className="text-[#0A1128] font-semibold">{selectedProduct.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ProductGallery images={selectedProduct.images} name={selectedProduct.name} />

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">{selectedProduct.category}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-mono font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-700">Product ID: {selectedProduct.code || 'MD001'}</span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A1128] mt-2 leading-tight">
                    {lang === 'ml' ? selectedProduct.nameMl : selectedProduct.name}
                  </h1>

                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-3xl font-bold text-[#0A1128]">₹{selectedProduct.price.toLocaleString('en-IN')}</span>
                    <span className="text-[#64748B] line-through text-lg">₹{selectedProduct.mrp.toLocaleString('en-IN')}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                      {selectedProduct.discount}% OFF
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${selectedProduct.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                    <span className="text-xs font-semibold text-gray-700">
                      {selectedProduct.stock > 0 ? `In Stock (${selectedProduct.stock} items remaining)` : 'Out of Stock'}
                    </span>
                  </div>

                  <p className="mt-6 text-sm text-gray-600 leading-relaxed">
                    {lang === 'ml' ? selectedProduct.descriptionMl : selectedProduct.description}
                  </p>

                  <div className="mt-6 py-4 border-y border-[#C5A059]/20 grid grid-cols-2 gap-4 text-xs">
                    <div><span className="text-gray-400 block">Fabric</span><span className="font-semibold text-[#0A1128]">{selectedProduct.fabric}</span></div>
                    <div><span className="text-gray-400 block">Length</span><span className="font-semibold text-[#0A1128]">{selectedProduct.length}</span></div>
                    <div><span className="text-gray-400 block">Care Instructions</span><span className="font-semibold text-[#0A1128]">{selectedProduct.care}</span></div>
                    <div><span className="text-gray-400 block">Est. Delivery</span><span className="font-semibold text-emerald-700">2-4 Days across Kerala</span></div>
                  </div>
                </div>

                {/* PRIMARY ACTION BUTTONS (NO ONLINE PAY NOW) */}
                <div className="mt-8 space-y-3">
                  <button 
                    onClick={() => handleBuyViaWhatsAppDirect(selectedProduct)}
                    className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-base shadow-lg"
                  >
                    <span>💬</span>
                    <span>{store.t('buyViaWhatsApp')} (+91 95674 77246)</span>
                  </button>

                  <button 
                    onClick={() => handleAddToCart(selectedProduct.id)}
                    className="w-full py-3.5 bg-[#0A1128] text-white font-bold rounded-xl hover:bg-[#121E3D] transition text-sm shadow-md"
                  >
                    {store.t('addToCart')}
                  </button>

                  <p className="text-[11px] text-center text-gray-500 pt-2">
                    🔒 {store.t('noReturnPolicy')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {currentView === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!isAdminAuthenticated ? (
              <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-[#C5A059]/40 shadow-2xl text-center">
                <div className="w-12 h-12 rounded-full bg-[#0A1128] text-[#C5A059] flex items-center justify-center mx-auto mb-4 text-xl">🔒</div>
                <h2 className="font-serif text-2xl font-bold text-[#0A1128]">Admin Authorization</h2>
                <p className="text-xs text-gray-500 mt-1 mb-6">Enter passcode to access Mayura store management</p>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <input type="password" value={adminPasscode} onChange={(e) => setAdminPasscode(e.target.value)} placeholder="Enter Admin Passcode (mayura2026)" className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-[#C5A059]" autoFocus />
                  <button type="submit" className="w-full py-3 bg-[#0A1128] text-white font-bold rounded-xl hover:bg-[#C5A059] hover:text-[#0A1128] transition">
                    Unlock Dashboard →
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-[#C5A059]/30">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Store Management Portal</span>
                    <h1 className="font-serif text-3xl font-bold text-[#0A1128] mt-1">{store.t('adminTitle')}</h1>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingProduct(null); setAdminProductModalOpen(true); }} className="px-4 py-2 bg-[#C5A059] text-[#0A1128] font-bold text-xs rounded-xl shadow hover:bg-[#D4AF37] transition">
                      + Add New Saree
                    </button>
                    <button onClick={() => setIsAdminAuthenticated(false)} className="px-4 py-2 bg-gray-200 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-300 transition">
                      Lock Portal
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white p-5 rounded-2xl border border-[#C5A059]/20 shadow-sm"><span className="text-xs text-gray-400 block">Total Saree Products</span><span className="font-serif text-2xl font-bold text-[#0A1128]">{products.length}</span></div>
                  <div className="bg-white p-5 rounded-2xl border border-[#C5A059]/20 shadow-sm"><span className="text-xs text-gray-400 block">Categories</span><span className="font-serif text-2xl font-bold text-[#0A1128]">{CATEGORIES.length}</span></div>
                  <div className="bg-white p-5 rounded-2xl border border-[#C5A059]/20 shadow-sm"><span className="text-xs text-gray-400 block">Low Stock Items</span><span className="font-serif text-2xl font-bold text-amber-600">{store.getAdminStats().lowStockCount}</span></div>
                </div>

                <div className="bg-white rounded-3xl border border-[#C5A059]/20 shadow-sm overflow-hidden">
                  <div className="p-6 border-b flex justify-between items-center"><h3 className="font-serif font-bold text-lg text-[#0A1128]">Sarees Inventory ({products.length})</h3></div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#FAF8F5] text-gray-600 border-b">
                        <tr>
                          <th className="p-4">Product ID</th>
                          <th className="p-4">Saree Name</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Selling Price</th>
                          <th className="p-4">Stock</th>
                          <th className="p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-gray-50">
                            <td className="p-4 font-mono font-bold text-[#C5A059]">{p.code || 'MD001'}</td>
                            <td className="p-4 font-bold flex items-center gap-3">
                              <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded" />
                              <span>{p.name}</span>
                            </td>
                            <td className="p-4">{p.category}</td>
                            <td className="p-4 font-bold text-[#0A1128]">₹{p.price}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded font-bold ${p.stock <= 5 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {p.stock} left
                              </span>
                            </td>
                            <td className="p-4 space-x-2">
                              <button onClick={() => { setEditingProduct(p); setAdminProductForm(p); setAdminProductModalOpen(true); }} className="text-blue-600 hover:underline font-bold">Edit</button>
                              <button onClick={() => { if(confirm('Delete product?')) store.deleteProduct(p.id); }} className="text-red-600 hover:underline font-bold">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ADMIN PRODUCT EDIT/ADD MODAL */}
        {adminProductModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
              <button onClick={() => setAdminProductModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">✕</button>
              <h3 className="font-serif text-2xl font-bold text-[#0A1128] mb-4">{editingProduct ? 'Edit Saree' : 'Add New Saree'}</h3>
              
              <form onSubmit={handleSaveAdminProduct} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Product ID (Code)</label>
                    <input type="text" required value={adminProductForm.code} onChange={(e) => setAdminProductForm({ ...adminProductForm, code: e.target.value })} placeholder="e.g. MD009" className="w-full p-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Category</label>
                    <select value={adminProductForm.category} onChange={(e) => setAdminProductForm({ ...adminProductForm, category: e.target.value })} className="w-full p-2 border rounded-xl">
                      {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Product Name</label>
                  <input type="text" required value={adminProductForm.name} onChange={(e) => setAdminProductForm({ ...adminProductForm, name: e.target.value })} placeholder="Saree name" className="w-full p-2 border rounded-xl" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold block mb-1">MRP (₹)</label>
                    <input type="number" required value={adminProductForm.mrp} onChange={(e) => setAdminProductForm({ ...adminProductForm, mrp: Number(e.target.value) })} className="w-full p-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Selling Price (₹)</label>
                    <input type="number" required value={adminProductForm.price} onChange={(e) => setAdminProductForm({ ...adminProductForm, price: Number(e.target.value) })} className="w-full p-2 border rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Stock</label>
                    <input type="number" required value={adminProductForm.stock} onChange={(e) => setAdminProductForm({ ...adminProductForm, stock: Number(e.target.value) })} className="w-full p-2 border rounded-xl" />
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Description</label>
                  <textarea rows="2" value={adminProductForm.description} onChange={(e) => setAdminProductForm({ ...adminProductForm, description: e.target.value })} className="w-full p-2 border rounded-xl"></textarea>
                </div>

                <button type="submit" className="w-full py-3 bg-[#0A1128] text-white font-bold rounded-xl hover:bg-[#C5A059] hover:text-[#0A1128] transition mt-2">
                  Save Saree Details ✓
                </button>
              </form>
            </div>
          </div>
        )}

        {currentView === 'about' && <AboutView t={store.t} />}
        {currentView === 'collections' && <CollectionsView onSelectCategory={(cat) => { setSelectedCategory(cat); setCurrentView('shop'); }} />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'policy' && <PolicyView />}

      </main>

      {/* SHOPPING CART DRAWER (WITH CUSTOMER ADDRESS & WHATSAPP REDIRECT) */}
      {isCartOpen && (
        <CartDrawer 
          cartDetailed={cartDetailed} 
          cartTotals={cartTotals} 
          onClose={() => setIsCartOpen(false)} 
          onUpdateQty={store.updateCartQty.bind(store)} 
          onRemove={store.removeFromCart.bind(store)}
          customerForm={customerForm}
          setCustomerForm={setCustomerForm}
          onSendWhatsApp={handleSendWhatsAppCartOrder}
          onContinue={() => { setIsCartOpen(false); setCurrentView('shop'); }}
        />
      )}

      {/* FOOTER */}
      <Footer onNavigate={(view) => { setCurrentView(view); window.scrollTo({ top: 0, behavior: 'smooth' }); }} t={store.t} lang={lang} setLang={store.setLang.bind(store)} />
    </div>
  );
}

// HELPER COMPONENTS
function ProductCard({ product, lang, onOpen, onAddToCart, onBuyDirect, onQuickView }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#C5A059]/20 saree-card flex flex-col justify-between">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer" onClick={() => onOpen(product.id)}>
        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover img-zoom" />
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-[#0A1128] text-[#C5A059] text-[10px] font-bold px-2 py-1 rounded-md border border-[#C5A059]/40">
            {product.discount}% OFF
          </span>
        )}
        <button onClick={(e) => { e.stopPropagation(); onQuickView(product); }} className="absolute bottom-3 left-3 right-3 py-2 bg-white/90 backdrop-blur-md text-[#0A1128] font-bold text-xs rounded-xl hover:bg-[#C5A059] transition text-center shadow">
          Quick View 👁️
        </button>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase">{product.category}</span>
            <span className="text-[10px] font-mono font-bold text-gray-400">ID: {product.code || 'MD001'}</span>
          </div>
          <h3 onClick={() => onOpen(product.id)} className="font-serif font-bold text-[#0A1128] text-sm sm:text-base cursor-pointer hover:text-[#C5A059] transition line-clamp-1 mt-0.5">
            {lang === 'ml' ? product.nameMl : product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-[#0A1128] text-base">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button onClick={() => onBuyDirect(product)} className="w-full py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-1 shadow-sm">
            <span>💬</span><span>Buy via WhatsApp</span>
          </button>
          <button onClick={() => onAddToCart(product.id)} className="w-full py-2 bg-[#0A1128] text-white font-bold text-xs rounded-xl hover:bg-[#C5A059] hover:text-[#0A1128] transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductGallery({ images, name }) {
  const [selectedImg, setSelectedImg] = useState(images[0]);
  useEffect(() => setSelectedImg(images[0]), [images]);

  return (
    <div className="space-y-4">
      <div className="rounded-3xl overflow-hidden bg-gray-100 aspect-[3/4] border border-[#C5A059]/20 shadow-lg">
        <img src={selectedImg} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <button key={idx} onClick={() => setSelectedImg(img)} className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition ${selectedImg === img ? 'border-[#C5A059] scale-105' : 'border-transparent opacity-70'}`}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function CartDrawer({ cartDetailed, cartTotals, onClose, onUpdateQty, onRemove, customerForm, setCustomerForm, onSendWhatsApp, onContinue }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-lg h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto animate-fade-in border-l border-[#C5A059]/30">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-serif text-xl font-bold text-[#0A1128]">Your Shopping Cart ({cartTotals.itemCount})</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-black">✕</button>
          </div>

          {cartDetailed.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p>Your shopping cart is currently empty.</p>
              <button onClick={onContinue} className="mt-6 px-6 py-2.5 bg-[#C5A059] text-[#0A1128] font-bold text-xs rounded-xl">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div>
              <div className="divide-y my-4 max-h-[35vh] overflow-y-auto pr-1">
                {cartDetailed.map(i => (
                  <div key={i.product.id} className="py-3 flex gap-4">
                    <img src={i.product.images[0]} alt={i.product.name} className="w-14 h-16 object-cover rounded-xl" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-xs text-[#0A1128] line-clamp-1">{i.product.name}</h4>
                          <span className="text-[10px] font-mono text-gray-400 font-bold">ID: {i.product.code || 'MD001'}</span>
                        </div>
                        <span className="text-xs text-[#C5A059] font-bold">₹{i.product.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center border rounded-lg overflow-hidden text-xs">
                          <button onClick={() => onUpdateQty(i.product.id, i.quantity - 1)} className="px-2 py-0.5 bg-gray-100">-</button>
                          <span className="px-3 font-bold">{i.quantity}</span>
                          <button onClick={() => onUpdateQty(i.product.id, i.quantity + 1)} className="px-2 py-0.5 bg-gray-100">+</button>
                        </div>
                        <button onClick={() => onRemove(i.product.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Address Fields Before WhatsApp Redirect */}
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C5A059]/20 my-4 space-y-2 text-xs">
                <h4 className="font-serif font-bold text-[#0A1128]">Delivery Address Details</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required value={customerForm.name} onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })} placeholder="Full Name *" className="p-2 border rounded-xl bg-white" />
                  <input type="tel" required value={customerForm.phone} onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })} placeholder="Mobile Number *" className="p-2 border rounded-xl bg-white" />
                </div>
                <input type="text" required value={customerForm.house} onChange={(e) => setCustomerForm({ ...customerForm, house: e.target.value })} placeholder="House / Building Name *" className="w-full p-2 border rounded-xl bg-white" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required value={customerForm.locality} onChange={(e) => setCustomerForm({ ...customerForm, locality: e.target.value })} placeholder="Locality / Place *" className="p-2 border rounded-xl bg-white" />
                  <input type="text" required value={customerForm.pincode} onChange={(e) => setCustomerForm({ ...customerForm, pincode: e.target.value })} placeholder="PIN Code *" className="p-2 border rounded-xl bg-white" />
                </div>
                <select value={customerForm.district} onChange={(e) => setCustomerForm({ ...customerForm, district: e.target.value })} className="w-full p-2 border rounded-xl bg-white">
                  {KERALA_DISTRICTS.map(d => (
                    <option key={d.code} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {cartDetailed.length > 0 && (
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between"><span>Subtotal:</span><span className="font-bold text-[#0A1128]">₹{cartTotals.subtotal.toLocaleString('en-IN')}</span></div>
              <div className="flex justify-between"><span>Est. Delivery Charge:</span><span className="font-bold text-[#0A1128]">{cartTotals.isFreeDelivery ? 'FREE' : '₹' + cartTotals.deliveryFee}</span></div>
              <div className="flex justify-between text-sm font-bold text-[#0A1128] pt-1 border-t"><span>Total Amount:</span><span className="text-[#C5A059]">₹{cartTotals.total.toLocaleString('en-IN')}</span></div>
            </div>
            
            <button onClick={onSendWhatsApp} className="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition flex items-center justify-center gap-2 text-sm shadow-md">
              <span>💬</span><span>Order via WhatsApp (+91 95674 77246)</span>
            </button>
            <button onClick={onContinue} className="w-full py-2.5 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl hover:bg-gray-200 transition">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AboutView({ t }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-[#0A1128]">
      <div className="text-center mb-12">
        <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Brand Heritage</span>
        <h1 className="font-serif text-4xl font-bold mt-1">Mayura Designs Story</h1>
        <div className="w-16 h-1 bg-[#C5A059] mx-auto mt-4 rounded-full"></div>
      </div>
      <div className="prose max-w-none space-y-6 text-gray-700 leading-relaxed font-serif text-lg">
        <p>Founded in Kerala, <strong>Mayura Designs</strong> (“Timeless Sarees, Beautifully Woven”) was born out of a deep reverence for authentic Kerala handlooms and traditional weaves.</p>
        <p>Each saree in our boutique is individually handpicked from master weavers across Balaramapuram, Kanchipuram, and Chendamangalam.</p>
      </div>
    </div>
  );
}

function CollectionsView({ onSelectCategory }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Curated Editions</span>
        <h1 className="font-serif text-4xl font-bold text-[#0A1128] mt-1">Signature Collections</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATEGORIES.map(c => (
          <div key={c.id} onClick={() => onSelectCategory(c.name)} className="bg-white rounded-3xl overflow-hidden border border-[#C5A059]/20 shadow-md cursor-pointer group">
            <div className="h-64 overflow-hidden relative">
              <img src={c.image} alt={c.name} className="w-full h-full object-cover img-zoom" />
            </div>
            <div className="p-6">
              <h3 className="font-serif font-bold text-2xl text-[#0A1128]">{c.name}</h3>
              <p className="text-xs text-gray-500 mt-2">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactView() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-[#0A1128]">
      <div className="text-center mb-10">
        <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">Get In Touch</span>
        <h1 className="font-serif text-4xl font-bold mt-1">Contact Mayura Designs</h1>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-[#C5A059]/30 shadow-md space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">💬</div>
          <div><h4 className="font-bold text-[#0A1128]">Official WhatsApp Support</h4><p className="text-sm text-gray-500">+91 95674 77246</p></div>
        </div>
        <div className="flex items-center gap-4 pt-4 border-t">
          <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xl">📸</div>
          <div><h4 className="font-bold text-[#0A1128]">Instagram DM</h4><p className="text-sm text-gray-500">@mayura.designss</p></div>
        </div>
      </div>
    </div>
  );
}

function PolicyView() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-[#0A1128]">
      <h1 className="font-serif text-3xl font-bold mb-6">Shipping & Returns Policy</h1>
      <div className="bg-white p-8 rounded-3xl border border-[#C5A059]/30 space-y-4 text-sm text-gray-700">
        <h3 className="font-bold text-lg text-[#0A1128]">Returns & Exchange Policy</h3>
        <p><strong>NO RETURNS OR EXCHANGES.</strong> Because our sarees are delicate handlooms inspected individually prior to dispatch, we do not accept returns.</p>
        <p className="text-emerald-700 font-bold">Exception: In the rare event of a damaged or incorrect product received, please notify us on WhatsApp (+91 95674 77246) within 24 hours of delivery with an unboxing video.</p>
      </div>
    </div>
  );
}

function Footer({ onNavigate, t, lang, setLang }) {
  return (
    <footer className="bg-[#0A1128] text-white pt-16 pb-8 border-t border-[#C5A059]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#C5A059]">MAYURA DESIGNS</h3>
          <p className="text-xs text-gray-400 mt-2">“{t('tagline')}”</p>
          <p className="text-xs text-gray-400 mt-4">Delivering handcrafted luxury across Kerala.</p>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#C5A059] mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs text-gray-300">
            <li><button onClick={() => onNavigate('home')} className="hover:text-[#C5A059]">{t('navHome')}</button></li>
            <li><button onClick={() => onNavigate('shop')} className="hover:text-[#C5A059]">{t('navShop')}</button></li>
            <li><button onClick={() => onNavigate('collections')} className="hover:text-[#C5A059]">{t('navCollections')}</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#C5A059] mb-4">Customer Care</h4>
          <ul className="space-y-2 text-xs text-gray-300">
            <li><button onClick={() => onNavigate('policy')} className="hover:text-[#C5A059]">Returns Policy</button></li>
            <li><button onClick={() => onNavigate('about')} className="hover:text-[#C5A059]">About Brand</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-[#C5A059]">Contact Us</button></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-xs uppercase tracking-widest text-[#C5A059] mb-4">Connect</h4>
          <p className="text-xs text-gray-300">WhatsApp: +91 95674 77246</p>
          <p className="text-xs text-gray-300 mt-1">Instagram: @mayura.designss</p>
          <div className="mt-6">
            <button onClick={() => onNavigate('admin')} className="text-[11px] text-gray-500 hover:text-[#C5A059] underline">
              Admin Portal Access 🔑
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2026 Mayura Designs. All Rights Reserved.</p>
        <p className="mt-2 sm:mt-0">Designed for Kerala Fashion Heritage</p>
      </div>
    </footer>
  );
}

// MOUNT TO DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
