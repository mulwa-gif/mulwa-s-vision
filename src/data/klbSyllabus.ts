// KLB Kenya Secondary School Syllabus for Physics and Chemistry

export interface Topic {
  title: string;
  subtopics: string[];
}

export interface FormSyllabus {
  form: string;
  topics: Topic[];
}

export const klbChemistrySyllabus: FormSyllabus[] = [
  {
    form: "Form 1",
    topics: [
      {
        title: "Introduction to Chemistry",
        subtopics: [
          "What is Chemistry?",
          "Importance of Chemistry in everyday life",
          "Careers in Chemistry",
          "Laboratory rules and safety",
          "Laboratory apparatus and their uses",
          "Warning signs and hazard symbols"
        ]
      },
      {
        title: "Simple Classification of Substances",
        subtopics: [
          "Elements, compounds and mixtures",
          "Metals and non-metals",
          "Physical and chemical properties",
          "Separation of mixtures (filtration, evaporation, distillation, chromatography, sublimation, magnetism)",
          "Pure substances and impurities"
        ]
      },
      {
        title: "Water and Hydrogen",
        subtopics: [
          "Sources and importance of water",
          "Properties of water",
          "Water treatment and purification",
          "Hardness of water (temporary and permanent)",
          "Softening of hard water",
          "Preparation and properties of hydrogen",
          "Uses of hydrogen"
        ]
      },
      {
        title: "Air and Combustion",
        subtopics: [
          "Composition of air",
          "Oxygen: preparation, properties and uses",
          "Nitrogen: preparation, properties and uses",
          "Carbon dioxide: preparation, properties and uses",
          "Noble gases and their uses",
          "Combustion and burning",
          "Rusting and its prevention",
          "Fire fighting"
        ]
      },
      {
        title: "Acids, Bases and Indicators",
        subtopics: [
          "Properties of acids",
          "Properties of bases and alkalis",
          "Natural and synthetic indicators",
          "pH scale and its applications",
          "Neutralization reactions",
          "Salts: preparation and uses",
          "Applications of acids and bases"
        ]
      }
    ]
  },
  {
    form: "Form 2",
    topics: [
      {
        title: "Structure of the Atom",
        subtopics: [
          "Historical development of atomic theory",
          "Sub-atomic particles",
          "Atomic number and mass number",
          "Isotopes and their applications",
          "Electronic configuration",
          "Energy levels and shells",
          "The periodic table arrangement"
        ]
      },
      {
        title: "The Periodic Table",
        subtopics: [
          "Arrangement of elements",
          "Groups and periods",
          "Metals, non-metals and metalloids",
          "Trends in the periodic table",
          "Alkali metals (Group I)",
          "Alkaline earth metals (Group II)",
          "Halogens (Group VII)",
          "Noble gases (Group VIII/0)"
        ]
      },
      {
        title: "Chemical Bonding",
        subtopics: [
          "Why atoms bond",
          "Ionic bonding",
          "Covalent bonding",
          "Metallic bonding",
          "Properties of ionic and covalent compounds",
          "Dative (coordinate) bonding",
          "Intermolecular forces"
        ]
      },
      {
        title: "Salts",
        subtopics: [
          "Types of salts (normal, acidic, basic, double, complex)",
          "Preparation of salts",
          "Solubility of salts",
          "Crystallization",
          "Water of crystallization",
          "Qualitative analysis of salts"
        ]
      },
      {
        title: "Carbon and its Compounds",
        subtopics: [
          "Allotropes of carbon",
          "Properties of carbon",
          "Carbon monoxide: preparation, properties and dangers",
          "Carbon dioxide: preparation and properties",
          "Carbonates and hydrogen carbonates",
          "The carbon cycle",
          "Fuels and energy"
        ]
      },
      {
        title: "The Mole Concept",
        subtopics: [
          "Relative atomic and molecular masses",
          "The mole and Avogadro's number",
          "Molar mass",
          "Percentage composition",
          "Empirical and molecular formulae",
          "Reacting masses",
          "Gay-Lussac's law and Avogadro's law"
        ]
      }
    ]
  },
  {
    form: "Form 3",
    topics: [
      {
        title: "Energy Changes in Chemical Reactions",
        subtopics: [
          "Exothermic and endothermic reactions",
          "Enthalpy changes",
          "Bond energy and enthalpy calculations",
          "Hess's Law",
          "Energy level diagrams",
          "Calorimetry and heat calculations",
          "Standard enthalpy changes"
        ]
      },
      {
        title: "Reaction Rates",
        subtopics: [
          "Rate of reaction",
          "Factors affecting rate of reaction",
          "Collision theory",
          "Activation energy",
          "Catalysts and their mechanism",
          "Rate equations and graphs",
          "Industrial applications"
        ]
      },
      {
        title: "Chemical Equilibrium",
        subtopics: [
          "Reversible reactions",
          "Dynamic equilibrium",
          "Le Chatelier's principle",
          "Factors affecting equilibrium position",
          "Equilibrium constants",
          "Industrial applications (Haber and Contact processes)"
        ]
      },
      {
        title: "Organic Chemistry I",
        subtopics: [
          "Introduction to organic chemistry",
          "Hydrocarbons: alkanes, alkenes, alkynes",
          "Nomenclature (IUPAC naming)",
          "Isomerism",
          "Reactions of hydrocarbons",
          "Petroleum and its products",
          "Cracking and reforming"
        ]
      },
      {
        title: "Sulphur and its Compounds",
        subtopics: [
          "Occurrence and extraction of sulphur",
          "Allotropes of sulphur",
          "Properties and uses of sulphur",
          "Sulphur dioxide: preparation and properties",
          "Sulphuric acid: manufacture and properties",
          "Uses of sulphuric acid",
          "Environmental impact of sulphur compounds"
        ]
      },
      {
        title: "Chlorine and its Compounds",
        subtopics: [
          "Laboratory preparation of chlorine",
          "Properties of chlorine",
          "Uses of chlorine",
          "Hydrogen chloride and hydrochloric acid",
          "Bleaching action",
          "Sodium hypochlorite"
        ]
      }
    ]
  },
  {
    form: "Form 4",
    topics: [
      {
        title: "Organic Chemistry II",
        subtopics: [
          "Alcohols: classification, preparation and properties",
          "Aldehydes and ketones",
          "Carboxylic acids",
          "Esters and esterification",
          "Amines and amides",
          "Polymers (addition and condensation)",
          "Detergents and soaps"
        ]
      },
      {
        title: "Metals",
        subtopics: [
          "Physical properties of metals",
          "Reactivity series",
          "Extraction of metals",
          "Iron: extraction and uses",
          "Aluminium: extraction and uses",
          "Copper: extraction and uses",
          "Alloys and their applications",
          "Corrosion and its prevention"
        ]
      },
      {
        title: "Electrochemistry",
        subtopics: [
          "Electrolysis",
          "Electrolytes and non-electrolytes",
          "Products of electrolysis",
          "Faraday's laws of electrolysis",
          "Applications of electrolysis",
          "Electrochemical cells",
          "Standard electrode potentials",
          "Batteries and fuel cells"
        ]
      },
      {
        title: "Radioactivity",
        subtopics: [
          "Nuclear structure",
          "Types of radiation (alpha, beta, gamma)",
          "Properties of radiation",
          "Radioactive decay",
          "Half-life calculations",
          "Nuclear reactions",
          "Applications of radioactivity",
          "Nuclear hazards and safety"
        ]
      },
      {
        title: "Qualitative Analysis",
        subtopics: [
          "Identification of cations",
          "Identification of anions",
          "Flame tests",
          "Confirmatory tests",
          "Analysis of unknown substances",
          "Systematic analysis procedures"
        ]
      }
    ]
  }
];

export const klbPhysicsSyllabus: FormSyllabus[] = [
  {
    form: "Form 1",
    topics: [
      {
        title: "Introduction to Physics",
        subtopics: [
          "What is Physics?",
          "Branches of Physics",
          "Relationship between Physics and other subjects",
          "Career opportunities in Physics",
          "Laboratory rules and safety",
          "Scientific method"
        ]
      },
      {
        title: "Measurement I",
        subtopics: [
          "Length and its units",
          "Measuring instruments (rulers, vernier calipers, micrometer screw gauge)",
          "Area and volume measurement",
          "Time and its units",
          "Stopwatches and timing devices",
          "Significant figures and errors"
        ]
      },
      {
        title: "Measurement II",
        subtopics: [
          "Mass and weight",
          "Beam balance and spring balance",
          "Density and relative density",
          "Floating and sinking",
          "Determination of density"
        ]
      },
      {
        title: "Force",
        subtopics: [
          "Types of forces",
          "Effects of forces",
          "Scalar and vector quantities",
          "Resultant force",
          "Equilibrium of forces",
          "Centre of gravity",
          "Stability and its applications"
        ]
      },
      {
        title: "Pressure",
        subtopics: [
          "Definition and units of pressure",
          "Pressure in solids",
          "Pressure in liquids",
          "Atmospheric pressure",
          "Simple barometer",
          "Manometers",
          "Applications of pressure"
        ]
      },
      {
        title: "Particulate Nature of Matter",
        subtopics: [
          "States of matter",
          "Kinetic theory of matter",
          "Brownian motion",
          "Diffusion",
          "Evidence for particles",
          "Changes of state"
        ]
      },
      {
        title: "Thermal Expansion",
        subtopics: [
          "Expansion of solids",
          "Expansion of liquids",
          "Expansion of gases",
          "Applications of thermal expansion",
          "Anomalous expansion of water",
          "Thermometers"
        ]
      }
    ]
  },
  {
    form: "Form 2",
    topics: [
      {
        title: "Magnetism",
        subtopics: [
          "Properties of magnets",
          "Magnetic materials",
          "Making magnets",
          "Demagnetization",
          "Magnetic field patterns",
          "Earth's magnetic field",
          "Domain theory of magnetism"
        ]
      },
      {
        title: "Electrostatics I",
        subtopics: [
          "Static electricity",
          "Charging by friction",
          "Types of charges",
          "Distribution of charge",
          "Electroscope",
          "Charging by induction",
          "Applications of electrostatics"
        ]
      },
      {
        title: "Electrostatics II",
        subtopics: [
          "Capacitors",
          "Capacitance",
          "Factors affecting capacitance",
          "Capacitor combinations",
          "Energy stored in capacitors",
          "Applications of capacitors"
        ]
      },
      {
        title: "Current Electricity I",
        subtopics: [
          "Simple electric circuits",
          "Electric current",
          "Potential difference",
          "Resistance",
          "Ohm's law",
          "Resistor combinations",
          "Electrical energy and power"
        ]
      },
      {
        title: "Current Electricity II",
        subtopics: [
          "Cells and batteries",
          "EMF and internal resistance",
          "Heating effect of current",
          "Electrical safety",
          "Fuses and circuit breakers",
          "Domestic wiring"
        ]
      },
      {
        title: "Waves",
        subtopics: [
          "Wave motion",
          "Types of waves",
          "Properties of waves",
          "Wave equation",
          "Reflection of waves",
          "Refraction of waves",
          "Diffraction and interference"
        ]
      },
      {
        title: "Sound",
        subtopics: [
          "Production of sound",
          "Transmission of sound",
          "Properties of sound waves",
          "Speed of sound",
          "Musical notes",
          "Resonance",
          "Applications of sound"
        ]
      }
    ]
  },
  {
    form: "Form 3",
    topics: [
      {
        title: "Linear Motion",
        subtopics: [
          "Distance and displacement",
          "Speed and velocity",
          "Acceleration",
          "Equations of motion",
          "Motion graphs",
          "Free fall",
          "Projectile motion"
        ]
      },
      {
        title: "Refraction of Light",
        subtopics: [
          "Laws of refraction",
          "Refractive index",
          "Total internal reflection",
          "Critical angle",
          "Applications (optical fibres, prisms)",
          "Dispersion of light",
          "The spectrum"
        ]
      },
      {
        title: "Lenses",
        subtopics: [
          "Types of lenses",
          "Ray diagrams for lenses",
          "Lens formula",
          "Magnification",
          "Power of a lens",
          "Defects of lenses",
          "Optical instruments (microscope, telescope, camera)"
        ]
      },
      {
        title: "Newton's Laws of Motion",
        subtopics: [
          "Newton's first law",
          "Newton's second law (F=ma)",
          "Newton's third law",
          "Momentum",
          "Impulse",
          "Conservation of momentum",
          "Collisions (elastic and inelastic)"
        ]
      },
      {
        title: "Work, Energy and Power",
        subtopics: [
          "Work done by a force",
          "Energy and its forms",
          "Kinetic and potential energy",
          "Conservation of energy",
          "Power",
          "Efficiency",
          "Machines and mechanical advantage"
        ]
      },
      {
        title: "Turning Effect of a Force",
        subtopics: [
          "Moments of a force",
          "Principle of moments",
          "Centre of mass",
          "Equilibrium conditions",
          "Levers and their applications",
          "Pulleys and gears"
        ]
      }
    ]
  },
  {
    form: "Form 4",
    topics: [
      {
        title: "Electromagnetic Induction",
        subtopics: [
          "Faraday's law",
          "Lenz's law",
          "Induced EMF",
          "AC and DC generators",
          "Transformers",
          "Power transmission",
          "Eddy currents"
        ]
      },
      {
        title: "Mains Electricity",
        subtopics: [
          "AC and DC comparison",
          "Power in AC circuits",
          "Rectification",
          "Domestic wiring systems",
          "Electrical safety",
          "Cost of electricity",
          "Energy saving"
        ]
      },
      {
        title: "Electromagnetic Spectrum",
        subtopics: [
          "Types of electromagnetic waves",
          "Properties of EM waves",
          "Radio waves",
          "Microwaves",
          "Infrared radiation",
          "Visible light",
          "Ultraviolet, X-rays, Gamma rays",
          "Applications of EM waves"
        ]
      },
      {
        title: "Cathode Rays and Electronics",
        subtopics: [
          "Production of cathode rays",
          "Properties of cathode rays",
          "Cathode ray oscilloscope",
          "Thermionic emission",
          "Semiconductors",
          "Diodes and transistors",
          "Logic gates"
        ]
      },
      {
        title: "Photoelectric Effect",
        subtopics: [
          "Emission and absorption spectra",
          "Photoelectric effect",
          "Einstein's photoelectric equation",
          "Threshold frequency",
          "Applications of photoelectric effect",
          "X-ray production"
        ]
      },
      {
        title: "Radioactivity",
        subtopics: [
          "Structure of the atom",
          "Radioactive emissions",
          "Nuclear equations",
          "Half-life",
          "Detection of radiation",
          "Nuclear fission and fusion",
          "Applications of radioactivity",
          "Radiation hazards and safety"
        ]
      }
    ]
  }
];
