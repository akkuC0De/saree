// MAYURA DESIGNS - COMPLETE BUNDLED APPLICATION CORE (WHATSAPP STOREFRONT)

// 1. DATA DEFINITIONS
const INITIAL_PRODUCTS = [
  {
    id: "saree-001",
    code: "MD001",
    name: "Kasavu Elegance Tissue Saree",
    nameMl: "കസവ് എലഗൻസ് ടിഷ്യൂ സാരി",
    category: "Kasavu",
    mrp: 2499,
    price: 1799,
    discount: 28,
    stock: 12,
    rating: 4.9,
    reviewCount: 38,
    isNewArrival: true,
    isBestSeller: true,
    isSale: true,
    description: "Handcrafted authentic Kerala Kasavu tissue saree featuring ornate golden zari pallu and delicate floral body motifs. Perfect for weddings, Vishu, and grand traditional occasions.",
    descriptionMl: "പരമ്പരാഗത കേരള കസവ് ടിഷ്യൂ സാരി. മനോഹരമായ സ്വർണ്ണ സരി അഞ്ചലുകളും പൂക്കളുടെ ഡിസൈനും ഉള്ളത്. വിവാഹങ്ങൾക്കും വിശേഷാവസരങ്ങൾക്കും അനുയോജ്യം.",
    fabric: "Tissue Kasavu Cotton-Silk",
    length: "6.3 Meters (With Unstitched Blouse Piece)",
    care: "Dry Clean Only",
    images: [
      "./assets/images/kasavu_1.jpg",
      "./assets/images/hero.jpg",
      "./assets/images/soft_silk_1.jpg"
    ]
  },
  {
    id: "saree-002",
    code: "MD002",
    name: "Royal Kanchipuram Silk Saree",
    nameMl: "റോയൽ കാഞ്ചീപുരം സിൽക്ക് സാരി",
    category: "Silk",
    mrp: 4999,
    price: 3999,
    discount: 20,
    stock: 7,
    rating: 5.0,
    reviewCount: 52,
    isNewArrival: false,
    isBestSeller: true,
    isSale: true,
    description: "Regal deep royal blue silk saree featuring rich gold zari peacock weaves and a contrasting crimson red pallu. Woven by master weavers with heavy pure silk threads.",
    descriptionMl: "മനോഹരമായ റോയൽ ബ്ലൂ കാഞ്ചീപുരം സിൽക്ക് സാരി. സ്വർണ്ണ സരി മയിൽ ഡിസൈനുകളും റെഡ് അഞ്ചലും അടങ്ങിയ തനത് നിർമ്മിതി.",
    fabric: "Pure Kanchipuram Silk",
    length: "6.3 Meters (With Contrast Blouse)",
    care: "Dry Clean Only",
    images: [
      "./assets/images/silk_1.jpg",
      "./assets/images/kasavu_1.jpg",
      "./assets/images/designer_1.jpg"
    ]
  },
  {
    id: "saree-003",
    code: "MD003",
    name: "Emerald Luxury Designer Saree",
    nameMl: "എമറാൾഡ് ലക്ഷ്വറി ഡിസൈനർ സാരി",
    category: "Designer",
    mrp: 3899,
    price: 2999,
    discount: 23,
    stock: 5,
    rating: 4.8,
    reviewCount: 24,
    isNewArrival: true,
    isBestSeller: false,
    isSale: true,
    description: "Breathtaking emerald green organza designer saree adorned with meticulous gold zardozi embroidery and subtle sequin highlights. Designed for modern festive evenings.",
    descriptionMl: "എമറാൾഡ് ഗ്രീൻ ഓർഗൻസ ഡിസൈനർ സാരി. സ്വർണ്ണ സരി എംബ്രോയ്ഡറിയും തിളങ്ങുന്ന സീക്വിൻ വർക്കുകളും ചേർന്ന അത്യാധുനിക ഡിസൈൻ.",
    fabric: "Sheer Premium Organza Silk",
    length: "6.3 Meters (With Embroidered Blouse)",
    care: "Dry Clean Only",
    images: [
      "./assets/images/designer_1.jpg",
      "./assets/images/soft_silk_1.jpg",
      "./assets/images/silk_1.jpg"
    ]
  },
  {
    id: "saree-004",
    code: "MD004",
    name: "Everyday Cotton Grace Saree",
    nameMl: "എവരിഡേ കോട്ടൺ ഗ്രേസ് സാരി",
    category: "Cotton",
    mrp: 1499,
    price: 999,
    discount: 33,
    stock: 18,
    rating: 4.7,
    reviewCount: 41,
    isNewArrival: false,
    isBestSeller: true,
    isSale: true,
    description: "Ultra-breathable handloom yellow cotton saree with maroon woven selvedge borders. Lightweight, skin-friendly, and effortlessly stylish for daily wear or office.",
    descriptionMl: "അതീവ സുഖകരമായ യെല്ലോ ഹാൻഡ്‌ലൂം കോട്ടൺ സാരി. ദിവസേനയുള്ള ഉപയോഗത്തിനും ഓഫീസിലേക്കും ഏറ്റവും അനുയോജ്യം.",
    fabric: "100% Breathable Pure Handloom Cotton",
    length: "6.3 Meters (With Matching Blouse)",
    care: "Gentle Hand Wash",
    images: [
      "./assets/images/cotton_1.jpg",
      "./assets/images/kasavu_1.jpg",
      "./assets/images/hero.jpg"
    ]
  },
  {
    id: "saree-005",
    code: "MD005",
    name: "Soft Silk Pastel Grace Saree",
    nameMl: "സോഫ്റ്റ് സിൽക്ക് പാസ്റ്റൽ സാരി",
    category: "Soft Silk",
    mrp: 3299,
    price: 2499,
    discount: 24,
    stock: 9,
    rating: 4.9,
    reviewCount: 31,
    isNewArrival: true,
    isBestSeller: true,
    isSale: false,
    description: "Dreamy lavender-pink soft silk saree woven with subtle metallic silver threads and ornate temple motif border. Featherlight texture with effortless drape.",
    descriptionMl: "മൃദുവായ ലാവെൻഡർ-പിങ്ക് സോഫ്റ്റ് സിൽക്ക് സാരി. വെള്ളി സരി ഡിസൈനുകളും അമ്പല തറ വക്കുകളും ഉള്ളത്.",
    fabric: "Lightweight Soft Silk Blend",
    length: "6.3 Meters (With Running Blouse)",
    care: "Dry Clean Preferred",
    images: [
      "./assets/images/soft_silk_1.jpg",
      "./assets/images/designer_1.jpg",
      "./assets/images/silk_1.jpg"
    ]
  },
  {
    id: "saree-006",
    code: "MD006",
    name: "Kerala Handloom Heritage Kasavu",
    nameMl: "കേരള ഹാൻഡ്‌ലൂം ഹെറിറ്റേജ് കസവ്",
    category: "Kasavu",
    mrp: 1999,
    price: 1399,
    discount: 30,
    stock: 15,
    rating: 4.8,
    reviewCount: 29,
    isNewArrival: true,
    isBestSeller: false,
    isSale: true,
    description: "Traditional off-white Kerala cotton saree with pure golden zari border woven by traditional weavers of Balaramapuram. Classic simplicity at its finest.",
    descriptionMl: "ബലരാമപുരം കൈത്തറി പരമ്പരാഗത ഓഫ്-വൈറ്റ് കസവ് സാരി. തനത് കേരളീയ ശൈലിയിൽ തികഞ്ഞ ചാരുത.",
    fabric: "Pure Balaramapuram Cotton Kasavu",
    length: "6.2 Meters (With Blouse Piece)",
    care: "Gentle Hand Wash",
    images: [
      "./assets/images/hero.jpg",
      "./assets/images/kasavu_1.jpg",
      "./assets/images/cotton_1.jpg"
    ]
  },
  {
    id: "saree-007",
    code: "MD007",
    name: "Terracotta Daily Linen Saree",
    nameMl: "ടെറാകോട്ട ഡെയ്‌ലി ലിനൻ സാരി",
    category: "Daily Wear",
    mrp: 1299,
    price: 899,
    discount: 30,
    stock: 22,
    rating: 4.6,
    reviewCount: 19,
    isNewArrival: false,
    isBestSeller: false,
    isSale: true,
    description: "Organic earthy terracotta linen-cotton blend saree with sleek silver stripe border. Crisp, comfortable, and low-maintenance.",
    descriptionMl: "ലിനൻ-കോട്ടൺ മിശ്രിതത്തിൽ തീർത്ത ടെറാകോട്ട സാരി. ലളിതമായ ഡിസൈനും അതീവ സുഖകരവുമായ അനുഭവം.",
    fabric: "Organic Linen Cotton",
    length: "6.2 Meters (With Blouse)",
    care: "Machine / Hand Wash",
    images: [
      "./assets/images/cotton_1.jpg",
      "./assets/images/soft_silk_1.jpg",
      "./assets/images/kasavu_1.jpg"
    ]
  },
  {
    id: "saree-008",
    code: "MD008",
    name: "Budget Blossom Printed Saree",
    nameMl: "ബജറ്റ് ബ്ലോസം പ്രിന്റഡ് സാരി",
    category: "Budget Sarees",
    mrp: 1199,
    price: 749,
    discount: 37,
    stock: 30,
    rating: 4.5,
    reviewCount: 56,
    isNewArrival: false,
    isBestSeller: true,
    isSale: true,
    description: "Vibrant floral print saree on smooth mul-mul cotton fabric. Premium feel at an unmatched budget price under ₹999.",
    descriptionMl: "സുന്ദരമായ ഫ്ലോറൽ പ്രിന്റുകൾ ഉള്ള മൽ-മൽ കോട്ടൺ സാരി. ₹999-ന് താഴെയുള്ള ഏറ്റവും മികച്ച ചോയ്സ്.",
    fabric: "Mulmul Soft Cotton",
    length: "6.2 Meters (With Blouse Piece)",
    care: "Normal Hand Wash",
    images: [
      "./assets/images/soft_silk_1.jpg",
      "./assets/images/cotton_1.jpg",
      "./assets/images/designer_1.jpg"
    ]
  }
];

const CATEGORIES = [
  { id: "kasavu", name: "Kasavu", nameMl: "കസവ് സാരികൾ", image: "./assets/images/kasavu_1.jpg", desc: "Traditional Kerala handloom sarees with pure gold zari borders.", count: 3 },
  { id: "cotton", name: "Cotton", nameMl: "കോട്ടൺ സാരികൾ", image: "./assets/images/cotton_1.jpg", desc: "Breathable, comfortable pure handloom daily wear cottons.", count: 2 },
  { id: "silk", name: "Silk", nameMl: "പട്ട് സാരികൾ", image: "./assets/images/silk_1.jpg", desc: "Royal Kanchipuram and rich silk weaves for grand celebrations.", count: 2 },
  { id: "designer", name: "Designer", nameMl: "ഡിസൈനർ സാരികൾ", image: "./assets/images/designer_1.jpg", desc: "Modern organza and embellished contemporary festive drapes.", count: 2 },
  { id: "daily-wear", name: "Daily Wear", nameMl: "ഡെയ്‌ലി വെയർ", image: "./assets/images/cotton_1.jpg", desc: "Lightweight linen and printed drapes for work and casual elegance.", count: 2 },
  { id: "budget-sarees", name: "Budget Sarees", nameMl: "ബജറ്റ് സാരികൾ", image: "./assets/images/soft_silk_1.jpg", desc: "Exquisite handpicked sarees priced under ₹999.", count: 1 }
];

const KERALA_DISTRICTS = [
  { name: "Thiruvananthapuram", code: "TVM", rate: 50 },
  { name: "Kollam", code: "KLM", rate: 50 },
  { name: "Pathanamthitta", code: "PTA", rate: 60 },
  { name: "Alappuzha", code: "ALP", rate: 60 },
  { name: "Kottayam", code: "KTM", rate: 60 },
  { name: "Idukki", code: "IDK", rate: 70 },
  { name: "Ernakulam (Kochi)", code: "EKM", rate: 50 },
  { name: "Thrissur", code: "TCR", rate: 50 },
  { name: "Palakkad", code: "PKD", rate: 60 },
  { name: "Malappuram", code: "MLP", rate: 60 },
  { name: "Kozhikode", code: "KKD", rate: 50 },
  { name: "Wayanad", code: "WYD", rate: 70 },
  { name: "Kannur", code: "KNR", rate: 60 },
  { name: "Kasaragod", code: "KSG", rate: 70 }
];

const INSTAGRAM_POSTS = [
  { id: "ig-1", handle: "@mayura.designss", image: "./assets/images/kasavu_1.jpg", caption: "Timeless Kerala Kasavu for wedding mornings ✨ Pure gold zari woven to perfection.", productId: "saree-001" },
  { id: "ig-2", handle: "@mayura.designss", image: "./assets/images/silk_1.jpg", caption: "Grand Kanchipuram silk drapes in deep royal blue 💙 DM or visit website to order!", productId: "saree-002" },
  { id: "ig-3", handle: "@mayura.designss", image: "./assets/images/designer_1.jpg", caption: "Emerald organza elegance for your evening celebrations 🌿 Link in bio to shop.", productId: "saree-003" },
  { id: "ig-4", handle: "@mayura.designss", image: "./assets/images/soft_silk_1.jpg", caption: "Soft silk dreams in pastel lavender-pink 💕 Featherlight comfort.", productId: "saree-005" }
];

const REVIEWS = [
  { id: "rev-1", name: "Dr. Lakshmi Menon", location: "Kochi, Kerala", rating: 5, comment: "The Kasavu tissue saree I bought for my sister's wedding was stunning! WhatsApp ordering was smooth and reached Ernakulam in 2 days.", saree: "Kasavu Elegance Tissue Saree" },
  { id: "rev-2", name: "Anjali Nair", location: "Trivandrum, Kerala", rating: 5, comment: "Ordered via WhatsApp and the response was so fast! The cotton handloom saree is extremely soft and ideal for Kerala weather.", saree: "Everyday Cotton Grace Saree" },
  { id: "rev-3", name: "Reshma Pillai", location: "Kozhikode, Kerala", rating: 5, comment: "Mayura Designs never disappoints. The Kanchipuram silk quality exceeds sarees costing double the price elsewhere. Truly premium!", saree: "Royal Kanchipuram Silk Saree" }
];

const TRANSLATIONS = {
  en: {
    brandName: "Mayura Designs", tagline: "Timeless Sarees, Beautifully Woven", navHome: "Home", navShop: "Shop", navCollections: "Collections", navNewArrivals: "New Arrivals", navBestSellers: "Best Sellers", navAbout: "About", navContact: "Contact",
    heroHeadline: "Timeless Sarees,\nBeautifully Woven", heroSub: "Discover handpicked sarees crafted for every beautiful occasion.", shopCollection: "Shop Collection", exploreNewArrivals: "Explore New Arrivals", shopByCategory: "Shop by Category", specialOffers: "Special Offers", featuredCollection: "Featured Collection", instagramTitle: "Follow @mayura.designss", customerReviews: "Customer Reviews", brandStoryTitle: "Kerala Heritage & Craftsmanship", addToCart: "Add to Cart", buyViaWhatsApp: "Buy via WhatsApp", orderViaWhatsApp: "Order via WhatsApp", continueShopping: "Continue Shopping", searchPlaceholder: "Search sarees by name, silk, cotton, kasavu...", quickFilters: "Quick Filters", filterUnder999: "Under ₹999", filterUnder1499: "Under ₹1,499", filterNew: "New Arrivals", filterBest: "Best Sellers", filterSale: "Sale", allCategories: "All Categories", cartTitle: "Your Shopping Cart", cartEmpty: "Your shopping cart is currently empty.", subtotal: "Subtotal", deliveryCharge: "Estimated Delivery Charge", totalAmount: "Total Amount", adminTitle: "Mayura Admin Portal", noReturnPolicy: "Policy: No Returns or Exchanges except for damaged or incorrect item received.", keralaOnlyDelivery: "Delivering across Kerala (WhatsApp Direct Order)"
  },
  ml: {
    brandName: "മയൂര ഡിസൈൻസ്", tagline: "പരമ്പരാഗത ശൈലിയിൽ നെയ്തെടുത്ത സുന്ദര സാരികൾ", navHome: "ഹോം", navShop: "ഷോപ്പ്", navCollections: "കളക്ഷനുകൾ", navNewArrivals: "പുതിയ വരവുകൾ", navBestSellers: "ബെസ്റ്റ് സെല്ലറുകൾ", navAbout: "ഞങ്ങളെക്കുറിച്ച്", navContact: "ബന്ധപ്പെടുക",
    heroHeadline: "മനോഹരമായ സാരികൾ,\nതനത് കേരളീയ ഭംഗിയിൽ", heroSub: "നിങ്ങളുടെ ഓരോ വിശേഷാവസരങ്ങൾക്കും അനിയോജ്യമായ സാരികൾ തിരഞ്ഞെടുക്കൂ.", shopCollection: "സാരികൾ കാണുക", exploreNewArrivals: "പുതിയ കളക്ഷൻ", shopByCategory: "വിഭാഗങ്ങൾ തിരിച്ച് കാണുക", specialOffers: "പ്രത്യേക ഓഫറുകൾ", featuredCollection: "പ്രത്യേക കളക്ഷൻ", instagramTitle: "ഇൻസ്റ്റാഗ്രാം ഫോളോ ചെയ്യൂ @mayura.designss", customerReviews: "ഉപഭോക്താക്കളുടെ അഭിപ്രായങ്ങൾ", brandStoryTitle: "കേരളീയ പരമ്പരാഗത പൈതൃകം", addToCart: "കാർട്ടിലേക്ക് ചേർക്കൂ", buyViaWhatsApp: "വാട്സാപ്പ് വഴി വാങ്ങൂ", orderViaWhatsApp: "വാട്സാപ്പ് വഴി ഓർഡർ ചെയ്യൂ", continueShopping: "വീണ്ടും തിരയൂ", searchPlaceholder: "സാരികൾ തിരയൂ...", quickFilters: "ഫിൽട്ടറുകൾ", filterUnder999: "₹999-ൽ താഴെ", filterUnder1499: "₹1,499-ൽ താഴെ", filterNew: "പുതിയവ", filterBest: "ബെസ്റ്റ് സെല്ലർ", filterSale: "ഓഫറുകൾ", allCategories: "എല്ലാ വിഭാഗങ്ങളും", cartTitle: "നിങ്ങളുടെ ഷോപ്പിംഗ് കാർട്ട്", cartEmpty: "നിങ്ങളുടെ കാർട്ട് നിലവിൽ ശൂന്യമാണ്.", subtotal: "ആകെ തുക", deliveryCharge: "ഡെലിവറി ചാർജ്ജ്", totalAmount: "മൊത്തം തുക", adminTitle: "മയൂര അഡ്മിൻ പാനൽ", noReturnPolicy: "പോളിസി: കേടുപാടുകൾ ഉള്ളവയ്ക്ക് മാത്രമായി റിട്ടേൺ അനുവദിക്കും.", keralaOnlyDelivery: "കേരളത്തിലുടനീളം വിതരണം ചെയ്യുന്നു"
  }
};

// 2. STORE SERVICE CLASS
class StoreService {
  constructor() {
    this.listeners = new Set();
    this.initStorage();
    this.t = this.t.bind(this);
    this.setLang = this.setLang.bind(this);
    this.getLang = this.getLang.bind(this);
  }

  initStorage() {
    if (!localStorage.getItem('mayura_products')) localStorage.setItem('mayura_products', JSON.stringify(INITIAL_PRODUCTS));
    if (!localStorage.getItem('mayura_cart')) localStorage.setItem('mayura_cart', JSON.stringify([]));
    if (!localStorage.getItem('mayura_districts')) localStorage.setItem('mayura_districts', JSON.stringify(KERALA_DISTRICTS));
    if (!localStorage.getItem('mayura_categories')) localStorage.setItem('mayura_categories', JSON.stringify(CATEGORIES));
    if (!localStorage.getItem('mayura_homepage')) localStorage.setItem('mayura_homepage', JSON.stringify({
      heroHeadline: "Timeless Sarees,\nBeautifully Woven",
      heroHeadlineMl: "മനോഹരമായ സാരികൾ,\nതനത് കേരളീയ ഭംഗിയിൽ",
      heroSub: "Discover handpicked sarees crafted for every beautiful occasion.",
      heroSubMl: "നിങ്ങളുടെ ഓരോ വിശേഷാവസരങ്ങൾക്കും അനിയോജ്യമായ സാരികൾ തിരഞ്ഞെടുക്കൂ.",
      heroImage: "./assets/images/hero.jpg"
    }));
    if (!localStorage.getItem('mayura_reviews')) localStorage.setItem('mayura_reviews', JSON.stringify(REVIEWS));
    if (!localStorage.getItem('mayura_instagram')) localStorage.setItem('mayura_instagram', JSON.stringify(INSTAGRAM_POSTS));
    if (!localStorage.getItem('mayura_lang')) localStorage.setItem('mayura_lang', 'en');
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach(fn => fn());
  }

  getLang() { return localStorage.getItem('mayura_lang') || 'en'; }
  setLang(lang) { localStorage.setItem('mayura_lang', lang); this.notify(); }
  t(key) { const lang = this.getLang(); return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['en']?.[key] || key; }

  // 1. PRODUCTS MANAGEMENT
  getProducts() { return JSON.parse(localStorage.getItem('mayura_products') || '[]'); }
  getProductById(id) { return this.getProducts().find(p => p.id === id); }

  addProduct(product) {
    const products = this.getProducts();
    const count = products.length + 1;
    const formattedCode = product.code && product.code.trim() !== '' 
      ? product.code.toUpperCase() 
      : `MD${String(count).padStart(3, '0')}`;
    const mrp = Number(product.mrp || product.price || 0);
    const price = Number(product.price || 0);
    const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : Number(product.discount || 0);

    const newProd = {
      ...product,
      id: `saree-${Date.now()}`,
      code: formattedCode,
      nameMl: product.nameMl || product.name,
      mrp,
      price,
      discount,
      stock: Number(product.stock ?? 10),
      fabric: product.fabric || 'Pure Kerala Handloom',
      length: product.length || '6.3 Meters with Blouse Piece',
      care: product.care || 'Dry Clean Only',
      description: product.description || 'Authentic handcrafted Kerala saree draped in luxury.',
      images: Array.isArray(product.images) && product.images.length > 0 ? product.images : [product.image || './assets/images/kasavu_1.jpg'],
      isNew: Boolean(product.isNew),
      isBestSeller: Boolean(product.isBestSeller),
      isSale: Boolean(product.isSale),
      isFeatured: Boolean(product.isFeatured),
      rating: 5.0,
      reviewCount: 0
    };
    products.unshift(newProd);
    localStorage.setItem('mayura_products', JSON.stringify(products));
    this.notify();
    return newProd;
  }

  updateProduct(product) {
    let products = this.getProducts().map(p => {
      if (p.id === product.id) {
        const mrp = Number(product.mrp || product.price || 0);
        const price = Number(product.price || 0);
        const discount = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : Number(product.discount || 0);
        const imgs = Array.isArray(product.images) && product.images.length > 0 
          ? product.images 
          : [product.image || p.images[0] || './assets/images/kasavu_1.jpg'];
        return {
          ...p,
          ...product,
          code: (product.code || p.code || 'MD001').toUpperCase(),
          mrp,
          price,
          discount,
          stock: Number(product.stock ?? p.stock),
          images: imgs,
          isNew: Boolean(product.isNew),
          isBestSeller: Boolean(product.isBestSeller),
          isSale: Boolean(product.isSale),
          isFeatured: Boolean(product.isFeatured)
        };
      }
      return p;
    });
    localStorage.setItem('mayura_products', JSON.stringify(products));
    this.notify();
  }

  deleteProduct(id) {
    let products = this.getProducts().filter(p => p.id !== id);
    localStorage.setItem('mayura_products', JSON.stringify(products));
    this.notify();
  }

  // 2. CATEGORIES MANAGEMENT
  getCategories() { return JSON.parse(localStorage.getItem('mayura_categories') || JSON.stringify(CATEGORIES)); }
  addCategory(name) {
    if (!name || !name.trim()) return;
    const cats = this.getCategories();
    const cleanName = name.trim();
    if (!cats.includes(cleanName)) {
      cats.push(cleanName);
      localStorage.setItem('mayura_categories', JSON.stringify(cats));
      this.notify();
    }
  }
  deleteCategory(name) {
    let cats = this.getCategories().filter(c => c !== name);
    localStorage.setItem('mayura_categories', JSON.stringify(cats));
    this.notify();
  }

  // 3. DELIVERY DISTRICTS MANAGEMENT
  getDistricts() { return JSON.parse(localStorage.getItem('mayura_districts') || JSON.stringify(KERALA_DISTRICTS)); }
  updateDistrictRate(name, rate) {
    let districts = this.getDistricts().map(d => d.name === name ? { ...d, rate: Number(rate) } : d);
    localStorage.setItem('mayura_districts', JSON.stringify(districts));
    this.notify();
  }
  addDistrict(name, rate) {
    if (!name || !name.trim()) return;
    const districts = this.getDistricts();
    districts.push({ name: name.trim(), rate: Number(rate || 50) });
    localStorage.setItem('mayura_districts', JSON.stringify(districts));
    this.notify();
  }
  deleteDistrict(name) {
    let districts = this.getDistricts().filter(d => d.name !== name);
    localStorage.setItem('mayura_districts', JSON.stringify(districts));
    this.notify();
  }

  // 4. HOMEPAGE CONTENT MANAGEMENT
  getHomepageContent() {
    const defaults = {
      heroHeadline: "Timeless Sarees,\nBeautifully Woven",
      heroHeadlineMl: "മനോഹരമായ സാരികൾ,\nതനത് കേരളീയ ഭംഗിയിൽ",
      heroSub: "Discover handpicked sarees crafted for every beautiful occasion.",
      heroSubMl: "നിങ്ങളുടെ ഓരോ വിശേഷാവസരങ്ങൾക്കും അനിയോജ്യമായ സാരികൾ തിരഞ്ഞെടുക്കൂ.",
      heroImage: "./assets/images/hero.jpg"
    };
    return JSON.parse(localStorage.getItem('mayura_homepage') || JSON.stringify(defaults));
  }
  updateHomepageContent(content) {
    const current = this.getHomepageContent();
    const updated = { ...current, ...content };
    localStorage.setItem('mayura_homepage', JSON.stringify(updated));
    this.notify();
  }

  // 5. REVIEWS MANAGEMENT
  getReviews() { return JSON.parse(localStorage.getItem('mayura_reviews') || JSON.stringify(REVIEWS)); }
  addReview(review) {
    const revs = this.getReviews();
    revs.unshift({ id: `rev-${Date.now()}`, ...review });
    localStorage.setItem('mayura_reviews', JSON.stringify(revs));
    this.notify();
  }
  deleteReview(id) {
    let revs = this.getReviews().filter(r => r.id !== id);
    localStorage.setItem('mayura_reviews', JSON.stringify(revs));
    this.notify();
  }

  // 6. INSTAGRAM POSTS MANAGEMENT
  getInstagramPosts() { return JSON.parse(localStorage.getItem('mayura_instagram') || JSON.stringify(INSTAGRAM_POSTS)); }
  addInstagramPost(post) {
    const posts = this.getInstagramPosts();
    posts.unshift({ id: `ig-${Date.now()}`, handle: "@mayura.designss", ...post });
    localStorage.setItem('mayura_instagram', JSON.stringify(posts));
    this.notify();
  }
  deleteInstagramPost(id) {
    let posts = this.getInstagramPosts().filter(p => p.id !== id);
    localStorage.setItem('mayura_instagram', JSON.stringify(posts));
    this.notify();
  }

  getCart() { return JSON.parse(localStorage.getItem('mayura_cart') || '[]'); }

  addToCart(productId, quantity = 1) {
    const cart = this.getCart();
    const existing = cart.find(item => item.productId === productId);
    if (existing) { existing.quantity += quantity; } 
    else { cart.push({ productId, quantity }); }
    localStorage.setItem('mayura_cart', JSON.stringify(cart));
    this.notify();
  }

  updateCartQty(productId, quantity) {
    let cart = this.getCart();
    if (quantity <= 0) cart = cart.filter(i => i.productId !== productId);
    else { const item = cart.find(i => i.productId === productId); if (item) item.quantity = quantity; }
    localStorage.setItem('mayura_cart', JSON.stringify(cart));
    this.notify();
  }

  removeFromCart(productId) {
    let cart = this.getCart().filter(i => i.productId !== productId);
    localStorage.setItem('mayura_cart', JSON.stringify(cart));
    this.notify();
  }

  clearCart() { localStorage.setItem('mayura_cart', JSON.stringify([])); this.notify(); }

  getCartDetailed() {
    const rawCart = this.getCart();
    const products = this.getProducts();
    return rawCart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return { ...item, product, subtotal: product ? product.price * item.quantity : 0 };
    }).filter(item => item.product !== undefined);
  }

  getCartTotals(districtName = '', pincode = '') {
    const detailed = this.getCartDetailed();
    const subtotal = detailed.reduce((sum, item) => sum + item.subtotal, 0);

    let deliveryFee = 0;
    if (subtotal > 0 && subtotal < 2999) {
      const districts = JSON.parse(localStorage.getItem('mayura_districts') || '[]');
      const match = districts.find(d => d.name.toLowerCase() === districtName.toLowerCase());
      deliveryFee = match ? match.rate : 60;
    }

    return {
      itemCount: detailed.reduce((sum, i) => sum + i.quantity, 0),
      subtotal, 
      deliveryFee, 
      total: subtotal + deliveryFee, 
      isFreeDelivery: subtotal >= 2999
    };
  }

  // EXACT WHATSAPP MESSAGE GENERATION ENGINE
  buildWhatsAppUrl(customCart = null, customerInfo = null) {
    const items = customCart || this.getCartDetailed();
    const totals = this.getCartTotals(customerInfo?.district || '');

    let msg = `Hello Mayura Designs,\n\nI would like to order the following:\n\n`;

    if (items.length === 1) {
      const item = items[0];
      msg += `Product:\n${item.product.name}\n\n`;
      msg += `Product ID:\n${item.product.code || 'MD001'}\n\n`;
      msg += `Quantity:\n${item.quantity}\n\n`;
      msg += `Price:\n₹${item.product.price.toLocaleString('en-IN')}\n\n`;
    } else {
      items.forEach((item, index) => {
        msg += `Item ${index + 1}:\n`;
        msg += `Product: ${item.product.name}\n`;
        msg += `Product ID: ${item.product.code || 'MD00' + (index + 1)}\n`;
        msg += `Quantity: ${item.quantity}\n`;
        msg += `Price: ₹${item.product.price.toLocaleString('en-IN')}\n\n`;
      });
      msg += `Subtotal: ₹${totals.subtotal.toLocaleString('en-IN')}\n`;
      msg += `Estimated Delivery Fee: ${totals.isFreeDelivery ? 'FREE' : '₹' + totals.deliveryFee}\n`;
      msg += `TOTAL ESTIMATED: ₹${totals.total.toLocaleString('en-IN')}\n\n`;
    }

    if (customerInfo) {
      msg += `Customer Name:\n${customerInfo.name || '[Name]'}\n\n`;
      msg += `Mobile:\n${customerInfo.phone || '[Mobile]'}\n\n`;
      msg += `Address:\n${customerInfo.house || '[House / Building]'}\n${customerInfo.locality || '[Locality / Place]'}\n${customerInfo.district || '[District]'}\n${customerInfo.pincode || '[PIN Code]'}\n\n`;
      if (customerInfo.notes) {
        msg += `Delivery Instructions:\n${customerInfo.notes}\n\n`;
      }
    } else {
      msg += `Customer Name:\n[Name]\n\nMobile:\n[Mobile]\n\nAddress:\n[House / Building]\n[Locality / Place]\n[District]\n[PIN Code]\n\n`;
    }

    msg += `Please confirm availability and order details.\n\nThank you.`;

    return `https://wa.me/919567477246?text=${encodeURIComponent(msg)}`;
  }

  getAdminStats() {
    const products = this.getProducts();
    return {
      totalProducts: products.length,
      lowStockCount: products.filter(p => p.stock <= 5).length,
      categoriesCount: CATEGORIES.length
    };
  }
}

window.mayuraStore = new StoreService();
window.store = window.mayuraStore;
