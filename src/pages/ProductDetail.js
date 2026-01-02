import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaDownload, FaIndustry, FaCog } from 'react-icons/fa';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('advantages');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Helper function to convert string or object to array
  const ensureArray = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'object') return Object.values(value);
    if (typeof value === 'string') {
      return value.split(/[,;\n]/).map(item => item.trim()).filter(item => item);
    }
    return [];
  };

  // Fetch product from Firebase
  useEffect(() => {
    const productRef = ref(database, `products/${id}`);

    const unsubscribe = onValue(productRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // 1. Parse Description to extract hidden Advantages/Disadvantages
        let cleanedDescription = data.fullDescription || data.description || "";
        let extractedAdvantages = [];
        let extractedDisadvantages = [];

        if (cleanedDescription) {
          const parts = cleanedDescription.split('#');
          const keptParts = [];

          parts.forEach(part => {
            const trimmed = part.trim();
            if (!trimmed) return;

            const lower = trimmed.toLowerCase();
            if (lower.startsWith('advantages') || lower.startsWith('advantage')) {
              // Extract points (often separated by * or just text)
              const content = trimmed.replace(/^advantages?/i, '').trim();
              const points = content.split('*').map(p => p.trim()).filter(p => p);
              if (points.length > 0) extractedAdvantages.push(...points);
              else extractedAdvantages.push(content); // Fallback if no stars
            }
            else if (lower.startsWith('disadvantages') || lower.startsWith('disadvantage')) {
              const content = trimmed.replace(/^disadvantages?/i, '').trim();
              const points = content.split('*').map(p => p.trim()).filter(p => p);
              if (points.length > 0) extractedDisadvantages.push(...points);
              else extractedDisadvantages.push(content);
            }
            else {
              keptParts.push(part);
            }
          });

          // Reassemble description without the extracted parts
          cleanedDescription = keptParts.join('#');
        }

        // 2. Merge with explicit DB arrays
        const rawAdvantages = ensureArray(data.advantages);
        const rawDisadvantages = ensureArray(data.disadvantages);

        const finalAdvantages = [...rawAdvantages, ...extractedAdvantages];
        const finalDisadvantages = [...rawDisadvantages, ...extractedDisadvantages];

        // 3. Set Defaults if still empty
        const displayAdvantages = finalAdvantages.length > 0 ? finalAdvantages : [
          "High-efficiency operation significantly reduces power consumption overheads",
          "Automated control systems ensure consistent output quality",
          "Robotic welded construction enhances structural integrity and service life",
          "Low maintenance design with easily accessible components minimizes downtime",
          "Optimized for varying load conditions to maintain peak performance",
          "Enhanced operational safety features for operator protection",
          "Modular component design allows for easy upgrades",
          "Integrated vibration damping system reduces noise levels",
          "Weather-resistant coating suitable for challenging outdoor environments"
        ];

        const displayDisadvantages = finalDisadvantages.length > 0 ? finalDisadvantages : [
          "Requires regular monitoring of operating parameters for optimal efficiency",
          "Initial installation requires specialized technical support and calibration",
          "Periodic maintenance checks recommended for rotating components"
        ];

        setProduct({
          id,
          ...data,
          description: cleanedDescription, // Use cleaned version
          fullDescription: cleanedDescription, // Use cleaned version
          features: ensureArray(data.features),
          specifications: ensureArray(data.specifications),
          applications: ensureArray(data.applications),
          advantages: displayAdvantages,
          disadvantages: displayDisadvantages
        });
      } else {
        setProduct(null);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching product:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id]);

  // Static products array (backup) - commented out, using Firebase data
  /* const allProducts = [
    // Boiling House Equipment
    {
      id: 'crystallizer',
      category: 'Boiling House Equipment',
      name: 'Crystallizer (Air Cooled / Vacuum Cooled)',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      shortDescription: 'High-efficiency crystallization systems for superior sugar crystal formation with precise temperature control.',
      fullDescription: 'Our crystallizers are engineered to deliver optimal performance in sugar crystallization processes. Available in both air-cooled and vacuum-cooled variants, these systems ensure consistent crystal quality while maintaining energy efficiency. The advanced design incorporates precise temperature control mechanisms and automated monitoring systems for reliable operation.',
      features: ['Air cooled and vacuum cooled variants', 'Energy-efficient operation', 'Consistent crystal quality', 'Automated temperature control', 'Easy maintenance access', 'Durable construction'],
      specifications: ['Capacity: 50-500 TPD', 'Material: SS304/316', 'Temperature Range: 40-80Â°C', 'Power Supply: 415V, 3 Phase'],
      applications: ['Sugar crystallization', 'Crystal formation', 'Syrup processing', 'Industrial sugar production']
    },
    {
      id: 'juice-heater',
      category: 'Boiling House Equipment',
      name: 'Juice Heater',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
      shortDescription: 'Robust heating systems designed for optimal juice temperature management in sugar processing.',
      fullDescription: 'Multi-stage juice heaters designed for efficient heating and energy conservation in sugar mills. These heaters ensure uniform heat distribution and are built with corrosion-resistant materials for long-lasting performance.',
      features: ['Uniform heat distribution', 'Corrosion-resistant construction', 'Easy maintenance design', 'Multi-stage heating', 'Energy efficient', 'Compact footprint'],
      specifications: ['Capacity: 100-1000 TPD', 'Material: SS316L', 'Heating Surface: 500-5000 sq.m', 'Working Pressure: 2-4 kg/cmÂ²'],
      applications: ['Juice heating', 'Pre-evaporation heating', 'Temperature management', 'Sugar mill operations']
    },
    {
      id: 'evaporator-body',
      category: 'Boiling House Equipment',
      name: 'Evaporator Body',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
      shortDescription: 'Heavy-duty evaporator bodies engineered for efficient juice concentration and maximum throughput.',
      fullDescription: 'Robust evaporator bodies designed for continuous operation in sugar processing. High thermal efficiency and durable fabrication ensure optimal juice concentration with minimal energy consumption.',
      features: ['High thermal efficiency', 'Durable fabrication', 'Optimized for continuous operation', 'Corrosion resistant', 'Easy cleaning', 'Long service life'],
      specifications: ['Capacity: 200-2000 TPD', 'Material: Carbon Steel/SS', 'Heating Surface: 1000-10000 sq.m', 'Vacuum: 600-700 mmHg'],
      applications: ['Juice concentration', 'Evaporation process', 'Syrup production', 'Multi-effect evaporation']
    },
    {
      id: 'magma-mixer',
      category: 'Boiling House Equipment',
      name: 'Magma Mixer',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop',
      shortDescription: 'Precision mixing equipment for consistent magma preparation and uniform crystal distribution.',
      fullDescription: 'Precision-engineered magma mixers for consistent mixing and uniform crystal distribution. Variable speed control and low maintenance design ensure reliable operation.',
      features: ['Uniform mixing action', 'Variable speed control', 'Low maintenance design', 'Robust construction', 'Easy operation', 'Consistent output'],
      specifications: ['Capacity: 10-100 mÂ³', 'Material: MS/SS', 'Motor: 5-20 HP', 'Speed: Variable'],
      applications: ['Magma preparation', 'Crystal mixing', 'Seed preparation', 'Sugar processing']
    },
    {
      id: 'pug-mill',
      category: 'Boiling House Equipment',
      name: 'Pug Mill',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&h=600&fit=crop',
      shortDescription: 'Industrial-grade pug mills for efficient bagasse processing and moisture control.',
      fullDescription: 'Heavy-duty pug mills designed for efficient bagasse processing. Continuous operation capability with efficient moisture removal ensures optimal performance.',
      features: ['Heavy-duty construction', 'Efficient moisture removal', 'Continuous operation capability', 'Low power consumption', 'Easy maintenance', 'Durable design'],
      specifications: ['Capacity: 50-500 TPH', 'Material: Cast Iron/Steel', 'Motor: 50-200 HP', 'Moisture Reduction: 5-10%'],
      applications: ['Bagasse processing', 'Moisture control', 'Fiber preparation', 'Boiler feed preparation']
    },
    {
      id: 'condensate-tank',
      category: 'Boiling House Equipment',
      name: 'Condensate Tank',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=600&fit=crop',
      shortDescription: 'Reliable storage solutions for condensate collection with corrosion-resistant materials.',
      fullDescription: 'Large capacity condensate tanks with leak-proof design and easy inspection access. Built with corrosion-resistant materials for long-term reliability.',
      features: ['Large capacity options', 'Leak-proof design', 'Easy inspection access', 'Corrosion resistant', 'Level indicators', 'Overflow protection'],
      specifications: ['Capacity: 5000-50000 Liters', 'Material: MS/SS', 'Design: Horizontal/Vertical', 'Pressure: Atmospheric'],
      applications: ['Condensate storage', 'Water recovery', 'Process water management', 'Boiler feed water']
    },
    {
      id: 'juice-sulphitor',
      category: 'Boiling House Equipment',
      name: 'Juice Sulphitor',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      shortDescription: 'Specialized equipment for juice clarification through controlled sulphitation process.',
      fullDescription: 'Advanced juice sulphitation systems with precise SO2 dosing and efficient gas-liquid contact. Automated control systems ensure consistent juice quality.',
      features: ['Precise SO2 dosing', 'Efficient gas-liquid contact', 'Automated control systems', 'Corrosion resistant', 'Easy operation', 'Safety features'],
      specifications: ['Capacity: 100-1000 TPD', 'Material: SS304/316', 'SO2 Dosing: Automated', 'pH Control: 6.8-7.2'],
      applications: ['Juice clarification', 'Color improvement', 'pH adjustment', 'Sugar refining']
    },
    {
      id: 'syrup-sulphitor',
      category: 'Boiling House Equipment',
      name: 'Syrup Sulphitor',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
      shortDescription: 'Advanced sulphitation systems for syrup purification and color improvement.',
      fullDescription: 'Compact syrup sulphitation systems for optimal syrup treatment and consistent quality output. Designed for efficient color removal and purification.',
      features: ['Optimal syrup treatment', 'Consistent quality output', 'Compact design', 'Automated dosing', 'Easy maintenance', 'Energy efficient'],
      specifications: ['Capacity: 50-500 TPD', 'Material: SS316', 'Treatment Time: 15-30 min', 'Temperature: 60-80Â°C'],
      applications: ['Syrup purification', 'Color removal', 'Quality improvement', 'Refinery operations']
    },
    {
      id: 'molasses-tank',
      category: 'Boiling House Equipment',
      name: 'Molasses Tank',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
      shortDescription: 'Heavy-duty storage tanks designed for safe molasses handling and long-term storage.',
      fullDescription: 'Large capacity molasses storage tanks with corrosion-resistant coating and temperature monitoring. Multiple capacity options available for different plant sizes.',
      features: ['Corrosion-resistant coating', 'Temperature monitoring', 'Multiple capacity options', 'Heating coils', 'Level indicators', 'Safe discharge system'],
      specifications: ['Capacity: 100-5000 KL', 'Material: MS with coating', 'Design: Cylindrical', 'Heating: Steam coils'],
      applications: ['Molasses storage', 'Final molasses handling', 'Distillery feed', 'Long-term storage']
    },
    {
      id: 'water-tank',
      category: 'Boiling House Equipment',
      name: 'Water Tank',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop',
      shortDescription: 'Industrial water storage solutions with hygienic design for process water management.',
      fullDescription: 'Food-grade water storage tanks with easy cleaning access and overflow protection. Designed for hygienic storage of process water.',
      features: ['Food-grade materials', 'Easy cleaning access', 'Overflow protection', 'Level indicators', 'Insulation options', 'Hygienic design'],
      specifications: ['Capacity: 10000-100000 Liters', 'Material: SS304/316', 'Design: Vertical/Horizontal', 'Insulation: Optional'],
      applications: ['Process water storage', 'Potable water', 'Boiler feed water', 'Cooling water']
    },
    {
      id: 'sugar-melter',
      category: 'Boiling House Equipment',
      name: 'Sugar Melter',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&h=600&fit=crop',
      shortDescription: 'Efficient melting systems for sugar dissolution with precise temperature and flow control.',
      fullDescription: 'High-efficiency sugar melting systems with rapid dissolution and temperature control. Minimal sugar loss and consistent output quality.',
      features: ['Rapid dissolution', 'Temperature control', 'Minimal sugar loss', 'Automated operation', 'Easy cleaning', 'Consistent output'],
      specifications: ['Capacity: 10-100 TPH', 'Material: SS304', 'Temperature: 60-90Â°C', 'Dissolution Time: 5-15 min'],
      applications: ['Sugar dissolution', 'Syrup preparation', 'Rework processing', 'Refinery operations']
    },
    {
      id: 'fiberizor-hammer',
      category: 'Boiling House Equipment',
      name: 'Fiberizor Hammer',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=600&fit=crop',
      shortDescription: 'High-performance hammers for bagasse fiberization and efficient fiber separation.',
      fullDescription: 'Wear-resistant fiberizor hammers with extended service life and easy replacement. Designed for efficient bagasse fiberization.',
      features: ['Wear-resistant materials', 'Extended service life', 'Easy replacement', 'High impact strength', 'Balanced design', 'Cost-effective'],
      specifications: ['Material: Hardened Steel', 'Weight: 5-20 kg', 'Hardness: 55-60 HRC', 'Life: 2000-5000 hours'],
      applications: ['Bagasse fiberization', 'Fiber separation', 'Depithing', 'Boiler feed preparation']
    },
    {
      id: 'cane-cutting-knives',
      category: 'Boiling House Equipment',
      name: 'Cane Cutting Knives',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      shortDescription: 'Precision-engineered cutting knives for efficient cane preparation and processing.',
      fullDescription: 'High-grade steel cane cutting knives with sharp cutting edges and long operational life. Precision-engineered for efficient cane preparation.',
      features: ['High-grade steel construction', 'Sharp cutting edges', 'Long operational life', 'Easy installation', 'Balanced design', 'Cost-effective'],
      specifications: ['Material: High Carbon Steel', 'Hardness: 50-55 HRC', 'Length: 300-600 mm', 'Thickness: 10-20 mm'],
      applications: ['Cane cutting', 'Cane preparation', 'Shredding', 'Mill feeding']
    },
    // Material Handling Equipment
    {
      id: 'bagasse-handling',
      category: 'Material Handling Equipment',
      name: 'Bagasse Handling Systems',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
      shortDescription: 'Complete automated systems for efficient bagasse transport from mills to boilers.',
      fullDescription: 'Fully automated bagasse handling systems with dust suppression and high capacity handling. Designed for reliable transport from mills to boilers.',
      features: ['Automated operation', 'Dust suppression systems', 'High capacity handling', 'Low maintenance', 'Energy efficient', 'Safety features'],
      specifications: ['Capacity: 100-1000 TPH', 'Conveyor Type: Belt/Chain', 'Length: Customized', 'Power: Variable'],
      applications: ['Bagasse transport', 'Mill to boiler', 'Fuel handling', 'Waste management']
    },
    {
      id: 'ash-handling',
      category: 'Material Handling Equipment',
      name: 'Ash Handling Systems',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
      shortDescription: 'Reliable ash removal and disposal systems for clean and efficient boiler operations.',
      fullDescription: 'Continuous ash removal systems with minimal manual intervention. Environmentally compliant and low maintenance design.',
      features: ['Continuous ash removal', 'Minimal manual intervention', 'Environmentally compliant', 'Dust control', 'Automated operation', 'Safe disposal'],
      specifications: ['Capacity: 10-100 TPH', 'Type: Pneumatic/Mechanical', 'Distance: Up to 500m', 'Power: Variable'],
      applications: ['Ash removal', 'Boiler cleaning', 'Waste disposal', 'Environmental compliance']
    },
    {
      id: 'sugar-grass-hopper',
      category: 'Material Handling Equipment',
      name: 'Sugar Grass Hopper',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop',
      shortDescription: 'Robust hoppers designed for temporary sugar storage and controlled discharge.',
      fullDescription: 'Large capacity hoppers with smooth discharge flow and corrosion-resistant finish. Designed for temporary sugar storage.',
      features: ['Large storage capacity', 'Smooth discharge flow', 'Corrosion-resistant finish', 'Easy cleaning', 'Level indicators', 'Dust-tight design'],
      specifications: ['Capacity: 10-100 mÂ³', 'Material: MS/SS', 'Discharge: Gravity/Screw', 'Angle: 60-70Â°'],
      applications: ['Sugar storage', 'Temporary holding', 'Bagging operations', 'Process buffer']
    },
    {
      id: 'submerge-belt-conveyors',
      category: 'Material Handling Equipment',
      name: 'Submerge Belt Conveyors',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&h=600&fit=crop',
      shortDescription: 'Specialized conveyor systems for material transport in wet or submerged conditions.',
      fullDescription: 'Water-resistant conveyor systems with durable belt materials and low maintenance requirements. Designed for wet conditions.',
      features: ['Water-resistant design', 'Durable belt materials', 'Low maintenance', 'Corrosion resistant', 'High capacity', 'Reliable operation'],
      specifications: ['Capacity: 50-500 TPH', 'Belt Width: 600-1200 mm', 'Length: Customized', 'Material: Rubber/PVC'],
      applications: ['Wet material transport', 'Washing operations', 'Submerged conveying', 'Process applications']
    },
    {
      id: 'bag-stackers',
      category: 'Material Handling Equipment',
      name: 'Bag Stackers',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=600&fit=crop',
      shortDescription: 'Automated stacking solutions for efficient sugar bag handling and warehouse organization.',
      fullDescription: 'Automated bag stacking systems with adjustable height and reduced manual labor requirements. Efficient warehouse organization.',
      features: ['Automated stacking', 'Adjustable height', 'Reduced manual labor', 'Safety features', 'High speed', 'Easy operation'],
      specifications: ['Capacity: 300-600 bags/hour', 'Height: Up to 6m', 'Bag Weight: 25-50 kg', 'Power: 5-10 HP'],
      applications: ['Bag stacking', 'Warehouse operations', 'Automated storage', 'Loading operations']
    },
    {
      id: 'truck-loaders-unloaders',
      category: 'Material Handling Equipment',
      name: 'Truck Loadersâ€“Unloaders',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=300&fit=crop',
      shortDescription: 'High-speed loading and unloading systems for rapid truck turnaround times.',
      fullDescription: 'Fast loading and unloading systems with dust control and safety interlocks. Designed for rapid truck turnaround.',
      features: ['Fast loading/unloading', 'Dust control systems', 'Safety interlocks', 'Automated operation', 'High capacity', 'Weather protection'],
      specifications: ['Capacity: 100-500 TPH', 'Height: Adjustable', 'Type: Belt/Screw', 'Power: Variable'],
      applications: ['Truck loading', 'Bulk unloading', 'Logistics operations', 'Material dispatch']
    },
    {
      id: 'overhead-bag-handling',
      category: 'Material Handling Equipment',
      name: 'Overhead Bag Handling System',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
      shortDescription: 'Space-saving overhead conveyor systems for efficient bag transport throughout the facility.',
      fullDescription: 'Overhead conveyor systems for space optimization and continuous flow operation. Flexible routing throughout the facility.',
      features: ['Space optimization', 'Continuous flow operation', 'Flexible routing', 'Low maintenance', 'High capacity', 'Safe operation'],
      specifications: ['Capacity: 200-500 bags/hour', 'Height: 4-8m', 'Track: Customized', 'Bag Weight: 25-50 kg'],
      applications: ['Bag transport', 'Warehouse distribution', 'Process integration', 'Automated handling']
    },
    {
      id: 'sugar-elevators',
      category: 'Material Handling Equipment',
      name: 'Sugar Elevators',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
      shortDescription: 'Vertical transport solutions for moving sugar between different processing levels.',
      fullDescription: 'High lifting capacity elevators with smooth operation and minimal product damage. Designed for vertical sugar transport.',
      features: ['High lifting capacity', 'Smooth operation', 'Minimal product damage', 'Dust-tight design', 'Easy maintenance', 'Reliable performance'],
      specifications: ['Capacity: 10-100 TPH', 'Height: Up to 50m', 'Bucket Type: Steel/PVC', 'Speed: Variable'],
      applications: ['Vertical transport', 'Level changes', 'Silo filling', 'Process elevation']
    },
    {
      id: 'screw-conveyors',
      category: 'Material Handling Equipment',
      name: 'Screw Conveyors',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop',
      shortDescription: 'Enclosed conveying systems for dust-free transport of bulk materials.',
      fullDescription: 'Enclosed screw conveyors with variable speed control and multiple inlet/outlet options. Dust-free bulk material transport.',
      features: ['Enclosed design', 'Variable speed control', 'Multiple inlet/outlet options', 'Dust-free operation', 'Low maintenance', 'Compact design'],
      specifications: ['Capacity: 5-50 TPH', 'Diameter: 150-600 mm', 'Length: Up to 30m', 'Material: MS/SS'],
      applications: ['Bulk transport', 'Powder handling', 'Process feeding', 'Enclosed conveying']
    },
    {
      id: 'slat-chain-conveyors',
      category: 'Material Handling Equipment',
      name: 'Slat Type Chain Conveyors',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&h=600&fit=crop',
      shortDescription: 'Heavy-duty chain conveyors for transporting bagasse and other bulk materials.',
      fullDescription: 'High load capacity chain conveyors with wear-resistant slats and reliable operation. Designed for heavy-duty applications.',
      features: ['High load capacity', 'Wear-resistant slats', 'Reliable operation', 'Heavy-duty construction', 'Low maintenance', 'Long service life'],
      specifications: ['Capacity: 100-500 TPH', 'Width: 600-1500 mm', 'Length: Customized', 'Chain: Hardened steel'],
      applications: ['Bagasse transport', 'Heavy material handling', 'Inclined conveying', 'Bulk transport']
    },
    {
      id: 'roller-conveyors',
      category: 'Material Handling Equipment',
      name: 'Roller Conveyors',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=600&fit=crop',
      shortDescription: 'Smooth-rolling conveyor systems for bag and package handling applications.',
      fullDescription: 'Low friction roller conveyors with modular design and easy installation. Ideal for bag and package handling.',
      features: ['Low friction movement', 'Modular design', 'Easy installation', 'Smooth operation', 'Durable rollers', 'Flexible layout'],
      specifications: ['Roller Diameter: 50-100 mm', 'Width: 400-1000 mm', 'Length: Modular', 'Load: 50-200 kg/m'],
      applications: ['Bag handling', 'Package transport', 'Warehouse operations', 'Loading areas']
    },
    {
      id: 'spiral-chutes',
      category: 'Material Handling Equipment',
      name: 'Spiral Chutes',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      shortDescription: 'Gravity-fed spiral chutes for controlled downward material flow between levels.',
      fullDescription: 'Gravity-powered spiral chutes with controlled descent speed and space-efficient design. No power required.',
      features: ['Gravity-powered', 'Controlled descent speed', 'Space-efficient design', 'No power required', 'Low maintenance', 'Safe operation'],
      specifications: ['Height: Up to 20m', 'Diameter: 600-1200 mm', 'Material: MS/SS', 'Capacity: Variable'],
      applications: ['Level changes', 'Gravity transport', 'Space-saving solutions', 'Bag descent']
    },
    // Process & Storage Equipment
    {
      id: 'fabricated-process',
      category: 'Process & Storage Equipment',
      name: 'Fabricated Process Equipment',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
      shortDescription: 'Custom-engineered process equipment tailored to your specific manufacturing requirements.',
      fullDescription: 'Custom-designed process equipment with quality fabrication standards and ISO certified manufacturing. Tailored to specific requirements.',
      features: ['Custom design capabilities', 'Quality fabrication standards', 'ISO certified manufacturing', 'Expert engineering', 'Quality materials', 'Comprehensive testing'],
      specifications: ['Design: Custom', 'Material: As per requirement', 'Capacity: As per design', 'Standards: ISO/IBR'],
      applications: ['Custom processing', 'Special applications', 'Unique requirements', 'Tailored solutions']
    },
    {
      id: 'silo-bunker-hopper',
      category: 'Process & Storage Equipment',
      name: 'Silo, Bunker & Hoppers',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
      shortDescription: 'Large-capacity storage solutions for sugar, bagasse, and other bulk materials.',
      fullDescription: 'Large capacity storage silos with weather-resistant construction and efficient discharge systems. Multiple capacity options available.',
      features: ['Multiple capacity options', 'Weather-resistant construction', 'Efficient discharge systems', 'Level monitoring', 'Dust control', 'Safe access'],
      specifications: ['Capacity: 100-10000 mÂ³', 'Material: MS/SS', 'Design: Cylindrical/Rectangular', 'Discharge: Gravity/Mechanical'],
      applications: ['Bulk storage', 'Sugar storage', 'Bagasse storage', 'Material buffering']
    },
    // Mill House Equipment
    {
      id: 'rakes-slats',
      category: 'Mill House Equipment',
      name: 'Fabricated Rakes & Slats',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop',
      shortDescription: 'Precision-manufactured rakes and slats for optimal cane feeding and juice extraction.',
      fullDescription: 'High-strength rakes and slats with precision fabrication and extended wear life. Designed for optimal mill performance.',
      features: ['High-strength materials', 'Precision fabrication', 'Extended wear life', 'Easy replacement', 'Corrosion resistant', 'Cost-effective'],
      specifications: ['Material: High Carbon Steel', 'Hardness: 45-50 HRC', 'Length: Customized', 'Thickness: 10-25 mm'],
      applications: ['Cane feeding', 'Mill operations', 'Juice extraction', 'Cane preparation']
    },
    // Spares & Services
    {
      id: 'elevator-buckets',
      category: 'Spares & Services',
      name: 'Elevator Pressed & PVC Buckets',
      image: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&h=600&fit=crop',
      shortDescription: 'Durable elevator buckets in pressed steel and PVC for reliable material handling.',
      fullDescription: 'High-quality elevator buckets available in pressed steel and PVC materials. Multiple sizes for various applications with long service life.',
      features: ['Multiple material options', 'Various sizes available', 'Long service life', 'Easy installation', 'Wear resistant', 'Cost-effective'],
      specifications: ['Material: Steel/PVC', 'Capacity: 1-10 liters', 'Mounting: Bolt-on', 'Temperature: -20 to 80Â°C'],
      applications: ['Elevator operations', 'Vertical transport', 'Bulk handling', 'Material lifting']
    },
    {
      id: 'rubber-belting',
      category: 'Spares & Services',
      name: 'Rubber Conveyor Belting',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&h=600&fit=crop',
      shortDescription: 'High-quality conveyor belts in all grades for diverse industrial applications.',
      fullDescription: 'Premium quality rubber conveyor belts in all grades. Heat and oil resistant with custom lengths available for various applications.',
      features: ['All grade options', 'Heat and oil resistant', 'Custom lengths available', 'High tensile strength', 'Long service life', 'Quality assured'],
      specifications: ['Width: 300-2000 mm', 'Thickness: 6-25 mm', 'Ply: 2-8 ply', 'Temperature: Up to 150Â°C'],
      applications: ['Conveyor systems', 'Material transport', 'Industrial applications', 'Heavy-duty operations']
    },
    {
      id: 'conveyor-components',
      category: 'Spares & Services',
      name: 'Conveyor Idlers, Rollers & Pulleys',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      shortDescription: 'Complete range of conveyor components for smooth and efficient belt operation.',
      fullDescription: 'Precision-balanced rollers with low friction bearings and easy installation. Complete range of conveyor components for optimal performance.',
      features: ['Precision-balanced rollers', 'Low friction bearings', 'Easy installation', 'Durable construction', 'Various sizes', 'Quality materials'],
      specifications: ['Diameter: 89-219 mm', 'Length: Customized', 'Bearing: Sealed', 'Material: MS/SS'],
      applications: ['Conveyor support', 'Belt guidance', 'Material transport', 'System maintenance']
    },
    // Turnkey Erection Work
    {
      id: 'turnkey-projects',
      category: 'Turnkey Projects',
      name: 'Complete Turnkey Solutions',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop',
      shortDescription: 'Full-service project execution from design to commissioning for sugar industry installations.',
      fullDescription: 'Comprehensive turnkey solutions covering complete project management from concept to commissioning. Experienced installation team with on-time delivery commitment.',
      features: ['Complete project management', 'Experienced installation team', 'On-time delivery commitment', 'Quality assurance', 'After-sales support', 'Comprehensive documentation'],
      specifications: ['Scope: Design to Commissioning', 'Team: Experienced Engineers', 'Timeline: Project-based', 'Support: Comprehensive'],
      applications: ['New plant setup', 'Plant expansion', 'Modernization projects', 'Complete installations']
    }
  ]; */


  // Scroll Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.fade-start');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, [product]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Product Components...</p>
        </div>
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail-page">
      <section className="product-detail-hero">
        <div className="container">
          <button onClick={() => navigate('/products')} className="back-btn">
            <FaArrowLeft /> Back to Products
          </button>

          <div className="product-content-wrapper modern-design">
            {/* Image Background Section */}
            <div className="product-hero-section">
              <div className="background-image-layer">
                <img src={product.image} alt={product.name} className="hero-background" />
                <div className="gradient-overlay"></div>
              </div>
              <div className="hero-content">
                <span className="product-category-badge">{product.category}</span>
                <h1 className="product-title">{product.name}</h1>

                {/* Quick Stats - using specs if suitable or static placeholders/features */}
                <div className="quick-stats">
                  {(product.features && product.features.length >= 1) && (
                    <div className="stat">
                      <span className="stat-label">{product.features[0].length > 20 ? 'Feature' : product.features[0]}</span>
                    </div>
                  )}
                  <div className="stat">
                    <span className="stat-value">High</span>
                    <span className="stat-label">Efficiency</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">24/7</span>
                    <span className="stat-label">Operation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="content-grid">
              {/* Left Column - Description & Details */}
              <div className="content-left">
                <div className="description-card glass-card">
                  <h3><FaCog /> Product Overview</h3>
                  <div className="description-content">
                    {/* Dynamic Description Parsing */}
                    <div className="product-text-flow">
                      {(product.fullDescription || product.description).split('#').map((part, index) => {
                        const trimmedPart = part.trim();
                        if (!trimmedPart) return null;
                        if (trimmedPart.toLowerCase() === product.name.toLowerCase()) return null;

                        // Logic to detect "Working" or standard paragraphs
                        const lower = trimmedPart.toLowerCase();
                        let displayContent = trimmedPart;
                        let heading = "";

                        if (lower.startsWith('working')) {
                          heading = "Working Principle";
                          displayContent = trimmedPart.replace(/^working[:\s-]*/i, '').trim();
                        } else if (index === 0) {
                          // First paragraph usually introduction
                        } else {
                          // Try to guess a heading if the sentence is short? Or just render as p
                        }

                        return (
                          <div key={index} className="text-section">
                            {heading && <h4>{heading}</h4>}
                            <p>{displayContent}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Features Grid */}
                    {product.features && product.features.length > 0 && (
                      <div className="features-grid">
                        {product.features.slice(0, 4).map((feature, idx) => (
                          <div className="feature" key={idx}>
                            <FaCheckCircle className="feature-icon" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons - Moved here */}
                    <div className="action-buttons-container" style={{ marginTop: '2rem' }}>
                      <div className="action-buttons">
                        <button className="action-btn primary-btn" onClick={() => navigate('/contact')}>
                          <FaDownload /> Get Quote
                        </button>
                        <button className="action-btn secondary-btn" onClick={() => navigate('/products')}>
                          <FaArrowLeft /> All Products
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Right Column - Advantages & Actions */}
              <div className="content-right">
                <div className="comparison-card glass-card">
                  <div className="comparison-header">
                    <h3>Key Features Analysis</h3>
                    <div className="comparison-tabs">
                      <button
                        className={`tab-btn ${activeTab === 'advantages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('advantages')}
                      >
                        Advantages
                      </button>
                      <button
                        className={`tab-btn ${activeTab === 'considerations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('considerations')}
                      >
                        Considerations
                      </button>
                    </div>
                  </div>

                  <div className="comparison-content">
                    {/* Advantages Tab */}
                    {activeTab === 'advantages' && (
                      <div className="tab-pane active fade-in">
                        {product.advantages && product.advantages.length > 0 ? (
                          product.advantages.map((item, idx) => (
                            <div className="advantage-item" key={idx}>
                              <div className="advantage-icon">
                                <FaCheckCircle />
                              </div>
                              <div className="advantage-text">
                                <p>{item}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No specific advantages listed.</p>
                        )}
                      </div>
                    )}

                    {/* Considerations Tab */}
                    {activeTab === 'considerations' && (
                      <div className="tab-pane active fade-in">
                        {product.disadvantages && product.disadvantages.length > 0 ? (
                          product.disadvantages.map((item, idx) => (
                            <div className="consideration-item" key={idx}>
                              <div className="consideration-icon">
                                <FaIndustry />
                              </div>
                              <div className="consideration-text">
                                <p>{item}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>No specific considerations listed.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div >
        </div >
      </section >

      <section className="product-cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Optimize Your Production?</h2>
            <p>Contact our engineering team for a customized solution tailored to your plant's specific requirements.</p>
            <br />
            <button className="btn" onClick={() => navigate('/contact')}>Get a Quote</button>
          </div>
        </div>
      </section>
    </div >
  );
};

export default ProductDetail;
