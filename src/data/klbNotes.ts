// Comprehensive KLB Notes for Chemistry and Physics Form 1-4

export interface SubtopicNote {
  title: string;
  content: string;
  keyPoints: string[];
  formulas?: string[];
  examples?: string[];
  diagrams?: string;
}

export interface TopicNotes {
  title: string;
  introduction: string;
  subtopics: SubtopicNote[];
  summary: string;
  practicalActivities?: string[];
  examTips?: string[];
}

export interface FormNotes {
  form: string;
  subject: "Chemistry" | "Physics";
  topics: TopicNotes[];
}

// Chemistry Form 1 Notes
export const chemistryForm1Notes: FormNotes = {
  form: "Form 1",
  subject: "Chemistry",
  topics: [
    {
      title: "Introduction to Chemistry",
      introduction: "Chemistry is the branch of science that deals with the study of composition, structure, properties, and changes of matter. It is often called the 'central science' because it connects physics with other natural sciences.",
      subtopics: [
        {
          title: "What is Chemistry?",
          content: "Chemistry is the scientific study of matter, its properties, composition, structure, and the changes it undergoes during chemical reactions. It helps us understand the world around us, from the air we breathe to the medicines we take.",
          keyPoints: [
            "Chemistry studies matter and its changes",
            "Matter is anything that has mass and occupies space",
            "Chemistry is related to other sciences like physics and biology",
            "It helps solve real-world problems"
          ]
        },
        {
          title: "Importance of Chemistry in Everyday Life",
          content: "Chemistry plays a crucial role in our daily lives. From the food we eat to the clothes we wear, chemistry is involved in almost everything.",
          keyPoints: [
            "Medicine: Development of drugs and treatments",
            "Agriculture: Fertilizers, pesticides, and soil analysis",
            "Food industry: Preservation, flavoring, and nutrition",
            "Energy: Fuels, batteries, and solar cells",
            "Environment: Pollution control and water treatment",
            "Materials: Plastics, metals, and textiles"
          ],
          examples: [
            "Cooking involves chemical reactions like caramelization",
            "Soap cleaning is a chemical process",
            "Medicines work through chemical reactions in the body"
          ]
        },
        {
          title: "Laboratory Rules and Safety",
          content: "A chemistry laboratory is a place where experiments are conducted. Safety is paramount in any laboratory setting.",
          keyPoints: [
            "Always wear protective equipment (lab coat, goggles, gloves)",
            "Never eat or drink in the laboratory",
            "Report all accidents immediately",
            "Know the location of safety equipment",
            "Handle chemicals with care",
            "Follow all instructions carefully",
            "Keep work areas clean and organized"
          ]
        },
        {
          title: "Laboratory Apparatus and Their Uses",
          content: "Various apparatus are used in chemistry laboratories for different purposes.",
          keyPoints: [
            "Beaker: Holding and mixing liquids",
            "Test tube: Holding small amounts of liquids for reactions",
            "Burette: Measuring accurate volumes of liquids",
            "Pipette: Transferring specific volumes of liquids",
            "Bunsen burner: Providing heat source",
            "Tripod stand: Supporting apparatus during heating",
            "Wire gauze: Spreading heat evenly",
            "Measuring cylinder: Measuring liquid volumes"
          ]
        },
        {
          title: "Warning Signs and Hazard Symbols",
          content: "Hazard symbols are used to warn about dangerous chemicals and substances.",
          keyPoints: [
            "Flammable: Catches fire easily",
            "Toxic: Poisonous if inhaled or swallowed",
            "Corrosive: Burns skin and damages materials",
            "Oxidizing: Helps other substances burn",
            "Irritant: Causes irritation to skin or eyes",
            "Explosive: Can explode under certain conditions",
            "Environmental hazard: Harmful to the environment"
          ]
        }
      ],
      summary: "Chemistry is the study of matter and its changes. It is essential in everyday life, from medicine to food. Safety in the laboratory is crucial, and understanding apparatus and hazard symbols is fundamental for any chemist.",
      examTips: [
        "Memorize common laboratory apparatus and their uses",
        "Know all hazard symbols and what they mean",
        "Understand why safety rules exist"
      ]
    },
    {
      title: "Simple Classification of Substances",
      introduction: "Matter can be classified into different categories based on composition and properties. Understanding these classifications helps us predict how substances will behave.",
      subtopics: [
        {
          title: "Elements, Compounds and Mixtures",
          content: "All matter can be classified as elements, compounds, or mixtures based on their composition.",
          keyPoints: [
            "Element: Pure substance made of one type of atom (e.g., oxygen, gold)",
            "Compound: Pure substance made of two or more elements chemically combined (e.g., water, salt)",
            "Mixture: Two or more substances physically combined (e.g., air, salt solution)",
            "Elements cannot be broken down by chemical means",
            "Compounds have fixed proportions of elements",
            "Mixtures can be separated by physical methods"
          ],
          examples: [
            "Iron (Fe) is an element",
            "Water (H₂O) is a compound of hydrogen and oxygen",
            "Air is a mixture of nitrogen, oxygen, and other gases"
          ]
        },
        {
          title: "Metals and Non-metals",
          content: "Elements are classified as metals or non-metals based on their properties.",
          keyPoints: [
            "Metals: Good conductors, shiny, malleable, ductile",
            "Non-metals: Poor conductors, dull, brittle",
            "Metals are found on the left side of the periodic table",
            "Non-metals are found on the right side",
            "Metalloids have properties of both"
          ]
        },
        {
          title: "Separation of Mixtures",
          content: "Mixtures can be separated using various physical methods depending on the properties of the components.",
          keyPoints: [
            "Filtration: Separates insoluble solid from liquid",
            "Evaporation: Separates dissolved solid from solution",
            "Distillation: Separates liquids with different boiling points",
            "Chromatography: Separates colored substances",
            "Sublimation: Separates subliming solid from mixture",
            "Magnetism: Separates magnetic from non-magnetic substances",
            "Decantation: Separates immiscible liquids"
          ],
          examples: [
            "Filtering sand from water",
            "Evaporating water to get salt",
            "Distilling alcohol from water"
          ]
        }
      ],
      summary: "Matter is classified into elements, compounds, and mixtures. Elements are further classified as metals or non-metals. Mixtures can be separated using physical methods like filtration, evaporation, and distillation.",
      practicalActivities: [
        "Separating iron filings from sand using a magnet",
        "Filtering muddy water",
        "Chromatography of ink"
      ]
    },
    {
      title: "Water and Hydrogen",
      introduction: "Water is essential for life and has unique properties. Hydrogen, the simplest element, is also found in water and has many important uses.",
      subtopics: [
        {
          title: "Properties of Water",
          content: "Water has unique physical and chemical properties that make it essential for life.",
          keyPoints: [
            "Colorless, odorless, and tasteless",
            "Boiling point: 100°C at standard pressure",
            "Freezing point: 0°C",
            "Maximum density at 4°C",
            "Universal solvent - dissolves many substances",
            "High specific heat capacity",
            "High surface tension"
          ],
          formulas: [
            "Chemical formula: H₂O",
            "Molar mass: 18 g/mol"
          ]
        },
        {
          title: "Hardness of Water",
          content: "Hard water contains dissolved calcium and magnesium ions and does not lather easily with soap.",
          keyPoints: [
            "Temporary hardness: Caused by Ca(HCO₃)₂ or Mg(HCO₃)₂",
            "Permanent hardness: Caused by CaSO₄, MgSO₄, CaCl₂, MgCl₂",
            "Temporary hardness removed by boiling",
            "Permanent hardness removed by adding Na₂CO₃ or ion exchange"
          ],
          formulas: [
            "Ca(HCO₃)₂ → CaCO₃ + H₂O + CO₂ (on heating)"
          ]
        },
        {
          title: "Preparation and Properties of Hydrogen",
          content: "Hydrogen is the lightest element and can be prepared in the laboratory through various methods.",
          keyPoints: [
            "Laboratory preparation: React dilute acid with zinc",
            "Hydrogen is colorless, odorless gas",
            "Lightest gas known",
            "Burns with a 'pop' sound",
            "Used as a reducing agent"
          ],
          formulas: [
            "Zn + H₂SO₄ → ZnSO₄ + H₂↑",
            "Zn + 2HCl → ZnCl₂ + H₂↑"
          ]
        }
      ],
      summary: "Water is a unique compound with important properties. Hard water contains dissolved calcium and magnesium salts. Hydrogen is prepared by reacting metals with acids.",
      practicalActivities: [
        "Testing water hardness with soap solution",
        "Preparing hydrogen in the laboratory",
        "Testing hydrogen with a burning splint"
      ]
    },
    {
      title: "Air and Combustion",
      introduction: "Air is a mixture of gases essential for life and combustion. Understanding the composition of air and the process of combustion is fundamental to chemistry.",
      subtopics: [
        {
          title: "Composition of Air",
          content: "Air is a mixture of gases with nitrogen and oxygen being the main components.",
          keyPoints: [
            "Nitrogen: 78%",
            "Oxygen: 21%",
            "Argon: 0.93%",
            "Carbon dioxide: 0.04%",
            "Water vapor: Variable",
            "Noble gases and other gases: Trace amounts"
          ]
        },
        {
          title: "Oxygen: Preparation and Properties",
          content: "Oxygen is essential for respiration and combustion. It can be prepared in the laboratory.",
          keyPoints: [
            "Prepared by decomposing hydrogen peroxide",
            "Colorless, odorless gas",
            "Supports combustion",
            "Slightly soluble in water",
            "Relights a glowing splint (test)"
          ],
          formulas: [
            "2H₂O₂ → 2H₂O + O₂ (using MnO₂ catalyst)"
          ]
        },
        {
          title: "Combustion and Rusting",
          content: "Combustion is a chemical reaction involving oxygen that releases heat and light. Rusting is slow oxidation of iron.",
          keyPoints: [
            "Combustion requires fuel, oxygen, and heat (fire triangle)",
            "Complete combustion produces CO₂ and H₂O",
            "Incomplete combustion produces CO and soot",
            "Rusting requires iron, oxygen, and water",
            "Rust is hydrated iron(III) oxide"
          ],
          formulas: [
            "C + O₂ → CO₂ (complete combustion)",
            "2C + O₂ → 2CO (incomplete combustion)",
            "4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ (rusting)"
          ]
        }
      ],
      summary: "Air is composed mainly of nitrogen (78%) and oxygen (21%). Oxygen supports combustion and can be prepared from hydrogen peroxide. Rusting is the slow oxidation of iron in the presence of oxygen and water.",
      examTips: [
        "Remember the composition of air percentages",
        "Know the fire triangle components",
        "Understand conditions for rusting"
      ]
    },
    {
      title: "Acids, Bases and Indicators",
      introduction: "Acids and bases are important classes of compounds with distinct properties. Indicators help us identify whether a substance is acidic or basic.",
      subtopics: [
        {
          title: "Properties of Acids",
          content: "Acids are substances that produce hydrogen ions (H⁺) when dissolved in water.",
          keyPoints: [
            "Sour taste (do not taste in lab!)",
            "Turn blue litmus red",
            "pH less than 7",
            "React with metals to produce hydrogen",
            "React with carbonates to produce CO₂",
            "React with bases to form salt and water"
          ],
          examples: [
            "Hydrochloric acid (HCl)",
            "Sulphuric acid (H₂SO₄)",
            "Nitric acid (HNO₃)",
            "Citric acid (in citrus fruits)"
          ]
        },
        {
          title: "Properties of Bases and Alkalis",
          content: "Bases are substances that react with acids. Alkalis are soluble bases that produce hydroxide ions (OH⁻) in water.",
          keyPoints: [
            "Bitter taste and slippery feel",
            "Turn red litmus blue",
            "pH greater than 7",
            "React with acids to form salt and water",
            "React with ammonium salts to release ammonia"
          ],
          examples: [
            "Sodium hydroxide (NaOH)",
            "Potassium hydroxide (KOH)",
            "Calcium hydroxide (Ca(OH)₂)",
            "Ammonia solution (NH₃)"
          ]
        },
        {
          title: "pH Scale and Indicators",
          content: "The pH scale measures acidity or alkalinity from 0 to 14. Indicators change color based on pH.",
          keyPoints: [
            "pH 0-6: Acidic",
            "pH 7: Neutral",
            "pH 8-14: Alkaline",
            "Litmus: Red in acid, blue in alkali",
            "Phenolphthalein: Colorless in acid, pink in alkali",
            "Methyl orange: Red in acid, yellow in alkali",
            "Universal indicator: Shows range of colors"
          ]
        },
        {
          title: "Neutralization Reactions",
          content: "When an acid reacts with a base, they neutralize each other to form salt and water.",
          keyPoints: [
            "Acid + Base → Salt + Water",
            "This is called neutralization",
            "The pH moves toward 7",
            "Heat is released (exothermic)"
          ],
          formulas: [
            "HCl + NaOH → NaCl + H₂O",
            "H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O",
            "HNO₃ + KOH → KNO₃ + H₂O"
          ]
        }
      ],
      summary: "Acids produce H⁺ ions and have pH < 7. Bases/alkalis produce OH⁻ ions and have pH > 7. Indicators change color to show pH. Neutralization produces salt and water.",
      practicalActivities: [
        "Testing solutions with universal indicator",
        "Titration of acid with base",
        "Making salts by neutralization"
      ]
    }
  ]
};

// Physics Form 1 Notes
export const physicsForm1Notes: FormNotes = {
  form: "Form 1",
  subject: "Physics",
  topics: [
    {
      title: "Introduction to Physics",
      introduction: "Physics is the study of matter, energy, and their interactions. It is the most fundamental of all natural sciences.",
      subtopics: [
        {
          title: "What is Physics?",
          content: "Physics is the branch of science that studies matter, energy, and their interactions. It seeks to understand how the universe works at the most fundamental level.",
          keyPoints: [
            "Physics studies matter and energy",
            "It explains natural phenomena",
            "Uses mathematics to describe relationships",
            "Forms the basis of other sciences"
          ]
        },
        {
          title: "Branches of Physics",
          content: "Physics is divided into several branches, each focusing on different aspects of matter and energy.",
          keyPoints: [
            "Mechanics: Motion and forces",
            "Thermodynamics: Heat and temperature",
            "Optics: Light and vision",
            "Electricity and Magnetism: Electric and magnetic phenomena",
            "Nuclear Physics: Atomic nucleus and radiation",
            "Acoustics: Sound waves"
          ]
        },
        {
          title: "Scientific Method",
          content: "Physics uses the scientific method to investigate natural phenomena.",
          keyPoints: [
            "Observation: Notice something interesting",
            "Hypothesis: Make an educated guess",
            "Experiment: Test the hypothesis",
            "Analysis: Study the results",
            "Conclusion: Accept or reject hypothesis",
            "Communication: Share findings"
          ]
        }
      ],
      summary: "Physics is the fundamental science studying matter and energy. It has many branches and uses the scientific method for investigation.",
      examTips: [
        "Know the branches of physics",
        "Understand the scientific method steps",
        "Learn career opportunities in physics"
      ]
    },
    {
      title: "Measurement I",
      introduction: "Measurement is fundamental to physics. Accurate measurement of physical quantities is essential for scientific investigation.",
      subtopics: [
        {
          title: "Length and Its Units",
          content: "Length is the distance between two points. The SI unit of length is the metre (m).",
          keyPoints: [
            "SI unit: metre (m)",
            "1 km = 1000 m",
            "1 m = 100 cm = 1000 mm",
            "1 cm = 10 mm",
            "Larger: kilometre, Smaller: millimetre, micrometre"
          ]
        },
        {
          title: "Measuring Instruments",
          content: "Different instruments are used to measure length with varying degrees of accuracy.",
          keyPoints: [
            "Metre rule: Measures to 0.1 cm accuracy",
            "Vernier calipers: Measures to 0.01 cm accuracy",
            "Micrometer screw gauge: Measures to 0.001 cm accuracy",
            "Tape measure: For longer lengths",
            "Ruler: For short lengths"
          ]
        },
        {
          title: "Using Vernier Calipers",
          content: "Vernier calipers can measure internal diameter, external diameter, and depth.",
          keyPoints: [
            "Main scale reads in mm",
            "Vernier scale has 10 divisions = 9 mm",
            "Least count = 0.1 mm = 0.01 cm",
            "Reading = Main scale + (Vernier coincidence × 0.01 cm)",
            "Check for zero error before use"
          ],
          formulas: [
            "Total reading = Main scale reading + (Vernier reading × 0.01) cm"
          ]
        },
        {
          title: "Using Micrometer Screw Gauge",
          content: "The micrometer screw gauge measures very small lengths with high accuracy.",
          keyPoints: [
            "Pitch = 0.5 mm",
            "Thimble has 50 divisions",
            "Least count = 0.5/50 = 0.01 mm",
            "Use ratchet to avoid over-tightening",
            "Reading = Main scale + (Thimble reading × 0.01 mm)"
          ],
          formulas: [
            "Total reading = Sleeve reading + (Thimble reading × 0.01) mm"
          ]
        },
        {
          title: "Significant Figures and Errors",
          content: "All measurements have some degree of uncertainty. Understanding errors is crucial.",
          keyPoints: [
            "Systematic errors: Consistent errors in one direction",
            "Random errors: Vary unpredictably",
            "Parallax error: Reading from an angle",
            "Zero error: Instrument doesn't read zero when it should",
            "Significant figures indicate precision"
          ]
        }
      ],
      summary: "Length is measured in metres. Different instruments (ruler, vernier calipers, micrometer) have different accuracies. Understanding errors is important for accurate measurements.",
      practicalActivities: [
        "Measuring with vernier calipers",
        "Using micrometer screw gauge",
        "Determining zero errors"
      ]
    },
    {
      title: "Measurement II",
      introduction: "Mass and density are fundamental quantities in physics. Understanding how to measure them accurately is essential.",
      subtopics: [
        {
          title: "Mass and Weight",
          content: "Mass is the amount of matter in an object. Weight is the gravitational force on an object.",
          keyPoints: [
            "Mass: Amount of matter (kg)",
            "Weight: Gravitational force (N)",
            "Mass is constant everywhere",
            "Weight varies with gravity",
            "W = mg (Weight = mass × gravity)",
            "g ≈ 10 N/kg on Earth"
          ],
          formulas: [
            "Weight (W) = mass (m) × gravitational field strength (g)",
            "W = mg"
          ]
        },
        {
          title: "Measuring Mass",
          content: "Mass is measured using balances that compare or measure gravitational force.",
          keyPoints: [
            "Beam balance: Compares unknown mass with known mass",
            "Electronic balance: Direct digital reading",
            "Spring balance: Measures weight (then calculate mass)",
            "SI unit is kilogram (kg)",
            "1 kg = 1000 g"
          ]
        },
        {
          title: "Density",
          content: "Density is mass per unit volume. It tells us how compact matter is.",
          keyPoints: [
            "Density = Mass/Volume",
            "SI unit: kg/m³ or g/cm³",
            "Water density: 1 g/cm³ = 1000 kg/m³",
            "Objects float if density < fluid density",
            "Objects sink if density > fluid density"
          ],
          formulas: [
            "Density (ρ) = Mass (m) / Volume (V)",
            "ρ = m/V"
          ],
          examples: [
            "Iron: 7.8 g/cm³",
            "Aluminium: 2.7 g/cm³",
            "Wood: 0.5-0.8 g/cm³",
            "Water: 1.0 g/cm³"
          ]
        },
        {
          title: "Determining Density",
          content: "Density can be determined by measuring mass and volume separately.",
          keyPoints: [
            "Regular solids: Measure dimensions, calculate volume",
            "Irregular solids: Use displacement method",
            "Liquids: Use measuring cylinder for volume",
            "Gases: More complex methods needed"
          ]
        }
      ],
      summary: "Mass is the amount of matter (kg), weight is gravitational force (N). Density is mass per unit volume and determines whether objects float or sink.",
      examTips: [
        "Know the difference between mass and weight",
        "Remember density formula and units",
        "Understand floating and sinking"
      ]
    },
    {
      title: "Force",
      introduction: "A force is a push or pull that can change an object's motion or shape. Understanding forces is fundamental to mechanics.",
      subtopics: [
        {
          title: "Types of Forces",
          content: "Forces can be classified into different types based on their nature and origin.",
          keyPoints: [
            "Contact forces: Friction, tension, normal force",
            "Non-contact forces: Gravity, magnetic, electrostatic",
            "Push and pull forces",
            "Thrust and air resistance",
            "Upthrust in fluids"
          ]
        },
        {
          title: "Effects of Forces",
          content: "Forces can cause various effects on objects.",
          keyPoints: [
            "Change shape (deformation)",
            "Change speed (acceleration/deceleration)",
            "Change direction of motion",
            "Start or stop motion",
            "Cause rotation"
          ]
        },
        {
          title: "Scalar and Vector Quantities",
          content: "Physical quantities are classified as scalars (magnitude only) or vectors (magnitude and direction).",
          keyPoints: [
            "Scalar: Only magnitude (e.g., mass, speed, time)",
            "Vector: Magnitude and direction (e.g., force, velocity)",
            "Vectors represented by arrows",
            "Arrow length = magnitude",
            "Arrow direction = direction of quantity"
          ]
        },
        {
          title: "Resultant Force",
          content: "The resultant force is the single force that has the same effect as all forces acting together.",
          keyPoints: [
            "Forces in same direction: Add",
            "Forces in opposite directions: Subtract",
            "Forces at angles: Use parallelogram law",
            "Resultant force determines motion"
          ],
          formulas: [
            "Same direction: R = F₁ + F₂",
            "Opposite directions: R = F₁ - F₂"
          ]
        },
        {
          title: "Centre of Gravity and Stability",
          content: "The centre of gravity is the point where all weight appears to act. It affects stability.",
          keyPoints: [
            "Centre of gravity (COG) is where weight acts",
            "Low COG = more stable",
            "Wide base = more stable",
            "Object topples if COG moves outside base",
            "Types: stable, unstable, neutral equilibrium"
          ]
        }
      ],
      summary: "Forces are pushes or pulls that cause changes in motion or shape. Vector quantities have direction; scalars don't. Centre of gravity affects stability.",
      practicalActivities: [
        "Finding centre of gravity of irregular lamina",
        "Investigating equilibrium conditions",
        "Vector addition using force boards"
      ]
    },
    {
      title: "Pressure",
      introduction: "Pressure is force per unit area. Understanding pressure helps explain many everyday phenomena.",
      subtopics: [
        {
          title: "Definition and Units of Pressure",
          content: "Pressure is the force acting perpendicularly per unit area.",
          keyPoints: [
            "Pressure = Force / Area",
            "SI unit: Pascal (Pa) = N/m²",
            "Other units: bar, atm, mmHg",
            "1 atm = 101,325 Pa ≈ 100,000 Pa",
            "Same force, smaller area = greater pressure"
          ],
          formulas: [
            "P = F/A",
            "Where P = pressure, F = force, A = area"
          ]
        },
        {
          title: "Pressure in Solids",
          content: "When a solid rests on a surface, it exerts pressure due to its weight.",
          keyPoints: [
            "Pressure depends on weight and contact area",
            "Sharp objects have small area = high pressure",
            "Flat objects spread weight = low pressure",
            "Applications: knives, nails, snowshoes"
          ],
          examples: [
            "Knife blade: Small area, high pressure, cuts easily",
            "Snowshoes: Large area, low pressure, don't sink"
          ]
        },
        {
          title: "Pressure in Liquids",
          content: "Liquid pressure increases with depth and depends on the liquid density.",
          keyPoints: [
            "Pressure increases with depth",
            "Pressure = ρgh",
            "Pressure acts in all directions",
            "Same level = same pressure",
            "Denser liquid = greater pressure"
          ],
          formulas: [
            "P = ρgh",
            "Where ρ = density, g = gravity, h = depth"
          ]
        },
        {
          title: "Atmospheric Pressure",
          content: "The atmosphere exerts pressure due to the weight of air above us.",
          keyPoints: [
            "Caused by weight of air",
            "About 100,000 Pa at sea level",
            "Decreases with altitude",
            "Measured by barometer",
            "Mercury barometer: 760 mmHg = 1 atm"
          ]
        }
      ],
      summary: "Pressure is force per unit area (P = F/A). Liquid pressure depends on depth (P = ρgh). Atmospheric pressure is about 100,000 Pa at sea level.",
      examTips: [
        "Remember both pressure formulas",
        "Understand applications of pressure",
        "Know how barometers work"
      ]
    },
    {
      title: "Particulate Nature of Matter",
      introduction: "All matter is made up of tiny particles. The kinetic theory explains the behavior of matter in different states.",
      subtopics: [
        {
          title: "States of Matter",
          content: "Matter exists in three main states: solid, liquid, and gas.",
          keyPoints: [
            "Solid: Fixed shape and volume, particles vibrate in place",
            "Liquid: Fixed volume, takes container shape, particles slide past each other",
            "Gas: No fixed shape or volume, particles move freely",
            "Particles have spaces between them",
            "Particles are in constant motion"
          ]
        },
        {
          title: "Kinetic Theory of Matter",
          content: "The kinetic theory explains properties of matter based on particle motion.",
          keyPoints: [
            "All matter is made of particles",
            "Particles are in constant random motion",
            "Temperature is related to kinetic energy",
            "Higher temperature = faster particles",
            "Explains gas pressure, diffusion, etc."
          ]
        },
        {
          title: "Brownian Motion",
          content: "Brownian motion is the random movement of particles suspended in a fluid.",
          keyPoints: [
            "First observed by Robert Brown",
            "Smoke particles move randomly in air",
            "Caused by collisions with invisible molecules",
            "Provides evidence for kinetic theory",
            "More vigorous at higher temperatures"
          ]
        },
        {
          title: "Diffusion",
          content: "Diffusion is the movement of particles from high concentration to low concentration.",
          keyPoints: [
            "Occurs in gases and liquids",
            "Faster at higher temperatures",
            "Faster for lighter particles",
            "Does not require external energy",
            "Examples: smell spreading, tea dissolving"
          ]
        },
        {
          title: "Changes of State",
          content: "Matter can change between states when heated or cooled.",
          keyPoints: [
            "Melting: Solid → Liquid",
            "Freezing: Liquid → Solid",
            "Boiling/Evaporation: Liquid → Gas",
            "Condensation: Gas → Liquid",
            "Sublimation: Solid → Gas directly"
          ]
        }
      ],
      summary: "Matter is made of particles in constant motion. The kinetic theory explains state properties. Brownian motion and diffusion provide evidence for particles.",
      practicalActivities: [
        "Observing Brownian motion with smoke cell",
        "Demonstrating diffusion with bromine",
        "Investigating factors affecting diffusion"
      ]
    },
    {
      title: "Thermal Expansion",
      introduction: "Most substances expand when heated and contract when cooled. This has many practical applications.",
      subtopics: [
        {
          title: "Expansion of Solids",
          content: "Solids expand when heated because particles vibrate more and need more space.",
          keyPoints: [
            "Linear expansion: Change in length",
            "Area expansion: Change in area",
            "Volume expansion: Change in volume",
            "Different materials expand differently",
            "Expansion coefficient varies by material"
          ],
          formulas: [
            "ΔL = αL₀ΔT",
            "Where α = linear expansivity, L₀ = original length"
          ]
        },
        {
          title: "Expansion of Liquids",
          content: "Liquids expand more than solids for the same temperature change.",
          keyPoints: [
            "Liquids only have volume expansion",
            "Real vs apparent expansion",
            "Must account for container expansion",
            "Used in thermometers"
          ]
        },
        {
          title: "Expansion of Gases",
          content: "Gases expand the most when heated, much more than solids or liquids.",
          keyPoints: [
            "All gases expand equally for same temperature change",
            "Volume is proportional to absolute temperature",
            "At constant pressure: V/T = constant",
            "Charles's Law describes this"
          ]
        },
        {
          title: "Applications of Thermal Expansion",
          content: "Thermal expansion is used in many practical applications.",
          keyPoints: [
            "Bimetallic strips in thermostats",
            "Expansion gaps in bridges and rails",
            "Riveting of metal plates",
            "Hot water pipes have loops",
            "Fitting wheels on axles"
          ]
        },
        {
          title: "Anomalous Expansion of Water",
          content: "Water has unusual behavior - it expands when cooled from 4°C to 0°C.",
          keyPoints: [
            "Water is densest at 4°C",
            "Below 4°C, water expands",
            "Ice floats because it's less dense",
            "Important for aquatic life survival",
            "Lakes freeze from top down"
          ]
        }
      ],
      summary: "Solids, liquids, and gases expand when heated. Expansion has many applications but can also cause problems. Water uniquely expands below 4°C.",
      examTips: [
        "Know the expansion formula",
        "Understand practical applications",
        "Remember water's anomalous expansion"
      ]
    }
  ]
};

// Export all notes
export const klbNotes = {
  chemistry: {
    form1: chemistryForm1Notes,
  },
  physics: {
    form1: physicsForm1Notes,
  }
};

export default klbNotes;
