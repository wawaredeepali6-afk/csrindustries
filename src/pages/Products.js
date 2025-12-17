import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaDownload, FaArrowRight, FaCheckCircle, FaCog, FaIndustry, FaTruck, FaTools } from 'react-icons/fa';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import './Products.css';

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef(null);

  // Helper function to generate ID from product name
  const generateId = (name) => {
    return name.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()&]/g, '')
      .replace(/–/g, '-')
      .replace(/,/g, '')
      .replace(/--+/g, '-');
  };

  // Update category when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category') || 'all';
    setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  // Helper function to normalize category names from admin dashboard
  const normalizeCategoryName = (category) => {
    if (!category) return 'other';
    
    const categoryMap = {
      'boiling house equipment': 'boiling',
      'boiling house': 'boiling',
      'boiling': 'boiling',
      'material handling equipment': 'material',
      'material handling': 'material',
      'material': 'material',
      'process & storage equipment': 'process',
      'process & storage': 'process',
      'process': 'process',
      'mill house equipment': 'mill',
      'mill house': 'mill',
      'mill': 'mill',
      'spares & services': 'spares',
      'spares': 'spares',
      'turnkey projects': 'turnkey',
      'turnkey erection work': 'turnkey',
      'turnkey': 'turnkey'
    };
    
    const normalized = category.toLowerCase().trim();
    return categoryMap[normalized] || normalized;
  };

  // Helper function to convert string to array if needed
  const ensureArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      // Split by comma, newline, or semicolon
      return value.split(/[,;\n]/).map(item => item.trim()).filter(item => item);
    }
    return [];
  };

  // Fetch products from Firebase
  useEffect(() => {
    const productsRef = ref(database, 'products');
    
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productList = Object.keys(data).map(key => {
          const product = data[key];
          return {
            id: key,
            ...product,
            // Normalize category for consistent filtering
            category: normalizeCategoryName(product.category),
            // Ensure arrays are properly formatted
            specs: ensureArray(product.specs || product.features),
            features: ensureArray(product.features),
            specifications: ensureArray(product.specifications),
            applications: ensureArray(product.applications)
          };
        });
        setProducts(productList);
      } else {
        setProducts([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selectedCategory, products]);

  // Static products array (backup - will be replaced by Firebase data)
  /* const products = [
    // Boiling House Equipment (13 products)
    {
      id: 'crystallizer',
      category: 'boiling',
      name: 'Crystallizer (Air Cooled / Vacuum Cooled)',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'High-efficiency crystallization systems for superior sugar crystal formation with precise temperature control.',
      specs: ['Air cooled and vacuum cooled variants', 'Energy-efficient operation', 'Consistent crystal quality']
    },
    {
      id: 'juice-heater',
      category: 'boiling',
      name: 'Juice Heater',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      description: 'Robust heating systems designed for optimal juice temperature management in sugar processing.',
      specs: ['Uniform heat distribution', 'Corrosion-resistant construction', 'Easy maintenance design']
    },
    {
      id: 'evaporator-body',
      category: 'boiling',
      name: 'Evaporator Body',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      description: 'Heavy-duty evaporator bodies engineered for efficient juice concentration and maximum throughput.',
      specs: ['High thermal efficiency', 'Durable fabrication', 'Optimized for continuous operation']
    },
    {
      id: 'magma-mixer',
      category: 'boiling',
      name: 'Magma Mixer',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop',
      description: 'Precision mixing equipment for consistent magma preparation and uniform crystal distribution.',
      specs: ['Uniform mixing action', 'Variable speed control', 'Low maintenance design']
    },
    {
      id: 'pug-mill',
      category: 'boiling',
      name: 'Pug Mill',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=400&h=300&fit=crop',
      description: 'Industrial-grade pug mills for efficient bagasse processing and moisture control.',
      specs: ['Heavy-duty construction', 'Efficient moisture removal', 'Continuous operation capability']
    },
    {
      id: 'condensate-tank',
      category: 'boiling',
      name: 'Condensate Tank',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop',
      description: 'Reliable storage solutions for condensate collection with corrosion-resistant materials.',
      specs: ['Large capacity options', 'Leak-proof design', 'Easy inspection access']
    },
    {
      id: 'juice-sulphitor',
      category: 'boiling',
      name: 'Juice Sulphitor',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'Specialized equipment for juice clarification through controlled sulphitation process.',
      specs: ['Precise SO2 dosing', 'Efficient gas-liquid contact', 'Automated control systems']
    },
    {
      id: 'syrup-sulphitor',
      category: 'boiling',
      name: 'Syrup Sulphitor',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      description: 'Advanced sulphitation systems for syrup purification and color improvement.',
      specs: ['Optimal syrup treatment', 'Consistent quality output', 'Compact design']
    },
    {
      id: 'molasses-tank',
      category: 'boiling',
      name: 'Molasses Tank',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      description: 'Heavy-duty storage tanks designed for safe molasses handling and long-term storage.',
      specs: ['Corrosion-resistant coating', 'Temperature monitoring', 'Multiple capacity options']
    },
    {
      id: 'water-tank',
      category: 'boiling',
      name: 'Water Tank',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop',
      description: 'Industrial water storage solutions with hygienic design for process water management.',
      specs: ['Food-grade materials', 'Easy cleaning access', 'Overflow protection']
    },
    {
      id: 'sugar-melter',
      category: 'boiling',
      name: 'Sugar Melter',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=400&h=300&fit=crop',
      description: 'Efficient melting systems for sugar dissolution with precise temperature and flow control.',
      specs: ['Rapid dissolution', 'Temperature control', 'Minimal sugar loss']
    },
    {
      id: 'fiberizor-hammer',
      category: 'boiling',
      name: 'Fiberizor Hammer',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop',
      description: 'High-performance hammers for bagasse fiberization and efficient fiber separation.',
      specs: ['Wear-resistant materials', 'Extended service life', 'Easy replacement']
    },
    {
      id: 'cane-cutting-knives',
      category: 'boiling',
      name: 'Cane Cutting Knives',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'Precision-engineered cutting knives for efficient cane preparation and processing.',
      specs: ['High-grade steel construction', 'Sharp cutting edges', 'Long operational life']
    },
    // Material Handling Equipment (12 products)
    {
      id: 'bagasse-handling',
      category: 'material',
      name: 'Bagasse Handling Systems',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      description: 'Complete automated systems for efficient bagasse transport from mills to boilers.',
      specs: ['Automated operation', 'Dust suppression systems', 'High capacity handling']
    },
    {
      id: 'ash-handling',
      category: 'material',
      name: 'Ash Handling Systems',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      description: 'Reliable ash removal and disposal systems for clean and efficient boiler operations.',
      specs: ['Continuous ash removal', 'Minimal manual intervention', 'Environmentally compliant']
    },
    {
      id: 'sugar-grass-hopper',
      category: 'material',
      name: 'Sugar Grass Hopper',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop',
      description: 'Robust hoppers designed for temporary sugar storage and controlled discharge.',
      specs: ['Large storage capacity', 'Smooth discharge flow', 'Corrosion-resistant finish']
    },
    {
      id: 'submerge-belt-conveyors',
      category: 'material',
      name: 'Submerge Belt Conveyors',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=400&h=300&fit=crop',
      description: 'Specialized conveyor systems for material transport in wet or submerged conditions.',
      specs: ['Water-resistant design', 'Durable belt materials', 'Low maintenance']
    },
    {
      id: 'bag-stackers',
      category: 'material',
      name: 'Bag Stackers',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop',
      description: 'Automated stacking solutions for efficient sugar bag handling and warehouse organization.',
      specs: ['Automated stacking', 'Adjustable height', 'Reduced manual labor']
    },
    {
      id: 'truck-loaders-unloaders',
      category: 'material',
      name: 'Truck Loaders–Unloaders',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'High-speed loading and unloading systems for rapid truck turnaround times.',
      specs: ['Fast loading/unloading', 'Dust control systems', 'Safety interlocks']
    },
    {
      id: 'overhead-bag-handling',
      category: 'material',
      name: 'Overhead Bag Handling System',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      description: 'Space-saving overhead conveyor systems for efficient bag transport throughout the facility.',
      specs: ['Space optimization', 'Continuous flow operation', 'Flexible routing']
    },
    {
      id: 'sugar-elevators',
      category: 'material',
      name: 'Sugar Elevators',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      description: 'Vertical transport solutions for moving sugar between different processing levels.',
      specs: ['High lifting capacity', 'Smooth operation', 'Minimal product damage']
    },
    {
      id: 'screw-conveyors',
      category: 'material',
      name: 'Screw Conveyors',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop',
      description: 'Enclosed conveying systems for dust-free transport of bulk materials.',
      specs: ['Enclosed design', 'Variable speed control', 'Multiple inlet/outlet options']
    },
    {
      id: 'slat-chain-conveyors',
      category: 'material',
      name: 'Slat Type Chain Conveyors',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=400&h=300&fit=crop',
      description: 'Heavy-duty chain conveyors for transporting bagasse and other bulk materials.',
      specs: ['High load capacity', 'Wear-resistant slats', 'Reliable operation']
    },
    {
      id: 'roller-conveyors',
      category: 'material',
      name: 'Roller Conveyors',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop',
      description: 'Smooth-rolling conveyor systems for bag and package handling applications.',
      specs: ['Low friction movement', 'Modular design', 'Easy installation']
    },
    {
      id: 'spiral-chutes',
      category: 'material',
      name: 'Spiral Chutes',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'Gravity-fed spiral chutes for controlled downward material flow between levels.',
      specs: ['Gravity-powered', 'Controlled descent speed', 'Space-efficient design']
    },
    // Process & Storage Equipment (2 products)
    {
      id: 'fabricated-process',
      category: 'process',
      name: 'Fabricated Process Equipment',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      description: 'Custom-engineered process equipment tailored to your specific manufacturing requirements.',
      specs: ['Custom design capabilities', 'Quality fabrication standards', 'ISO certified manufacturing']
    },
    {
      id: 'silo-bunker-hopper',
      category: 'process',
      name: 'Silo, Bunker & Hoppers',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
      description: 'Large-capacity storage solutions for sugar, bagasse, and other bulk materials.',
      specs: ['Multiple capacity options', 'Weather-resistant construction', 'Efficient discharge systems']
    },
    // Mill House Equipment (1 product)
    {
      id: 'rakes-slats',
      category: 'mill',
      name: 'Fabricated Rakes & Slats',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=300&fit=crop',
      description: 'Precision-manufactured rakes and slats for optimal cane feeding and juice extraction.',
      specs: ['High-strength materials', 'Precision fabrication', 'Extended wear life']
    },
    // Spares & Services (3 products)
    {
      id: 'elevator-buckets',
      category: 'spares',
      name: 'Elevator Pressed & PVC Buckets',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=400&h=300&fit=crop',
      description: 'Durable elevator buckets in pressed steel and PVC for reliable material handling.',
      specs: ['Multiple material options', 'Various sizes available', 'Long service life']
    },
    {
      id: 'rubber-belting',
      category: 'spares',
      name: 'Rubber Conveyor Belting',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=400&h=300&fit=crop',
      description: 'High-quality conveyor belts in all grades for diverse industrial applications.',
      specs: ['All grade options', 'Heat and oil resistant', 'Custom lengths available']
    },
    {
      id: 'conveyor-components',
      category: 'spares',
      name: 'Conveyor Idlers, Rollers & Pulleys',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
      description: 'Complete range of conveyor components for smooth and efficient belt operation.',
      specs: ['Precision-balanced rollers', 'Low friction bearings', 'Easy installation']
    },
    // Turnkey Erection Work (1 product)
    {
      id: 'turnkey-projects',
      category: 'turnkey',
      name: 'Complete Turnkey Solutions',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      description: 'Full-service project execution from design to commissioning for sugar industry installations.',
      specs: ['Complete project management', 'Experienced installation team', 'On-time delivery commitment']
    }
  ]; */

  const categories = [
    { id: 'all', name: 'All Products', icon: <FaCog /> },
    { id: 'boiling', name: 'Boiling House', icon: <FaIndustry /> },
    { id: 'material', name: 'Material Handling', icon: <FaTruck /> },
    { id: 'process', name: 'Process & Storage', icon: <FaCog /> },
    { id: 'mill', name: 'Mill House', icon: <FaTools /> },
    { id: 'spares', name: 'Spares & Services', icon: <FaTools /> },
    { id: 'turnkey', name: 'Turnkey Projects', icon: <FaIndustry /> }
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const turnkeyFeatures = [
    { title: 'Design & Engineering', desc: 'Custom solutions tailored to your requirements', icon: <FaCog /> },
    { title: 'Manufacturing', desc: 'In-house fabrication with quality control', icon: <FaIndustry /> },
    { title: 'Installation', desc: 'Professional erection and commissioning', icon: <FaTools /> },
    { title: 'After Sales', desc: 'Maintenance and spare parts support', icon: <FaCheckCircle /> }
  ];

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="products-hero-background"></div>
        <div className="container">
          <div className="products-hero-content animate-fadeInUp">
            <h1>Our Products & Services</h1>
            <p className="hero-subtitle">Quality Equipment for Sugar Industry Excellence</p>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section className="section products-main">
        <div className="container">
          {/* Category Filter */}
          <div className="category-filter scroll-reveal">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="filter-icon">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found in this category.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="product-card scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  {product.specs && product.specs.length > 0 && (
                    <ul className="specs-list">
                      {product.specs.slice(0, 3).map((spec, i) => (
                        <li key={i}>
                          <FaCheckCircle /> {spec}
                        </li>
                      ))}
                    </ul>
                  )}
                  {product.features && product.features.length > 0 && !product.specs && (
                    <ul className="specs-list">
                      {product.features.slice(0, 3).map((feature, i) => (
                        <li key={i}>
                          <FaCheckCircle /> {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link 
                    to={`/products/${product.id || generateId(product.name)}`} 
                    className="btn-view-details"
                  >
                    View Details <FaArrowRight />
                  </Link>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Turnkey Projects */}
      <section className="section turnkey-section">
        <div className="container">
          <h2 className="section-title scroll-reveal">Turnkey Projects</h2>
          <p className="section-subtitle scroll-reveal">
            Complete end-to-end solutions for your sugar plant
          </p>
          <div className="turnkey-content scroll-reveal">
            <p className="turnkey-intro">
              We offer complete turnkey solutions for sugar plants including design, manufacturing,
              supply, erection, and commissioning of equipment. Our experienced team ensures seamless
              project execution from concept to completion.
            </p>
          </div>
          <div className="turnkey-features">
            {turnkeyFeatures.map((feature, index) => (
              <div
                key={index}
                className="turnkey-feature-card scroll-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="turnkey-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section products-cta">
        <div className="cta-background"></div>
        <div className="container">
          <div className="cta-content scroll-reveal">
            <h2>Need a Custom Solution?</h2>
            <p>Contact us for tailored equipment and turnkey project solutions</p>
            <button className="btn btn-primary btn-large">
              Get Quote <FaArrowRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
