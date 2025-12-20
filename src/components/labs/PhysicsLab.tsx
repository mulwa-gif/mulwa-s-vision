import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Ruler,
  Scale,
  Thermometer,
  Zap,
  Waves,
  Eye,
  Move,
  RotateCcw,
  PlayCircle,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Target,
  FileText,
  Lightbulb,
} from "lucide-react";

interface Experiment {
  id: string;
  title: string;
  form: number;
  topic: string;
  aim: string;
  apparatus: string[];
  procedure: string[];
  theory: string;
  expectedResults: string;
  discussion: string;
  conclusion: string;
  precautions: string[];
  terms: { term: string; definition: string }[];
}

// KLB Physics Experiments Database
const physicsExperiments: Experiment[] = [
  // Form 1 Experiments
  {
    id: "vernier-caliper",
    title: "Using Vernier Calipers",
    form: 1,
    topic: "Measurement I",
    aim: "To measure the dimensions of objects accurately using vernier calipers",
    apparatus: [
      "Vernier calipers",
      "Cylindrical object (e.g., test tube)",
      "Rectangular block",
      "Spherical object (marble)",
    ],
    procedure: [
      "Check for zero error by closing the jaws and reading the vernier scale",
      "Place the object between the external jaws for external diameter",
      "Read the main scale at the zero mark of the vernier scale",
      "Find the vernier scale division that aligns with a main scale division",
      "Calculate the total reading: Main scale + (Vernier coincidence × 0.01 cm)",
      "Repeat measurements at different positions and calculate the average",
    ],
    theory: "Vernier calipers use the principle of vernier scale to measure lengths to an accuracy of 0.01 cm. The least count = 1 main scale division - 1 vernier scale division = 0.1 cm - 0.09 cm = 0.01 cm",
    expectedResults: "Measurements accurate to 0.01 cm with consistent readings when measured correctly",
    discussion: "The vernier scale allows us to interpolate between main scale divisions. The precision of measurement depends on careful alignment and proper reading of scales.",
    conclusion: "Vernier calipers provide accurate measurements of length, internal and external diameters with precision of 0.01 cm",
    precautions: [
      "Check and correct for zero error before taking readings",
      "Ensure the object is held firmly but not squeezed",
      "Read the scale at eye level to avoid parallax error",
      "Take multiple readings and calculate the average",
    ],
    terms: [
      { term: "Zero Error", definition: "The reading when jaws are fully closed; may be positive or negative" },
      { term: "Least Count", definition: "The smallest measurement that can be read accurately (0.01 cm for vernier calipers)" },
      { term: "Main Scale", definition: "The fixed scale graduated in centimeters and millimeters" },
      { term: "Vernier Scale", definition: "The sliding scale with 10 or 50 divisions" },
    ],
  },
  {
    id: "micrometer",
    title: "Using Micrometer Screw Gauge",
    form: 1,
    topic: "Measurement I",
    aim: "To measure the diameter of thin wires and thickness of sheets using a micrometer screw gauge",
    apparatus: [
      "Micrometer screw gauge",
      "Thin wire samples (copper, iron)",
      "Metal sheets of different thickness",
      "Tissue paper",
    ],
    procedure: [
      "Check for zero error by bringing the spindle and anvil together using the ratchet",
      "Clean the faces of anvil and spindle with tissue paper",
      "Place the wire between the anvil and spindle",
      "Turn the ratchet until it clicks (not the thimble directly)",
      "Read the main scale on the sleeve (mm)",
      "Read the thimble scale (0.01 mm divisions)",
      "Calculate: Reading = Main scale + (Thimble reading × 0.01 mm)",
    ],
    theory: "The micrometer uses a screw of pitch 0.5 mm with 50 divisions on the thimble. Each division = 0.5/50 = 0.01 mm. This allows measurements accurate to 0.001 cm.",
    expectedResults: "Wire diameters typically range from 0.2 mm to 1.5 mm with precision to 0.01 mm",
    discussion: "The micrometer is more precise than vernier calipers for measuring small dimensions. The ratchet prevents over-tightening which could damage the instrument or deform the object.",
    conclusion: "The micrometer screw gauge provides accurate measurements of small lengths with precision of 0.01 mm",
    precautions: [
      "Always use the ratchet to close on the object, never the thimble",
      "Clean the measuring faces before use",
      "Avoid over-tightening which can give false readings",
      "Allow the instrument to reach thermal equilibrium",
    ],
    terms: [
      { term: "Pitch", definition: "The distance moved by the spindle for one complete rotation (0.5 mm)" },
      { term: "Anvil", definition: "The fixed face against which objects are measured" },
      { term: "Spindle", definition: "The moving face that closes on the object" },
      { term: "Ratchet", definition: "A device that prevents over-tightening" },
    ],
  },
  {
    id: "density-regular",
    title: "Determining Density of Regular Solids",
    form: 1,
    topic: "Measurement II",
    aim: "To determine the density of regular solids using direct measurement method",
    apparatus: [
      "Triple beam balance",
      "Vernier calipers or ruler",
      "Regular solid blocks (metal, wood)",
      "Calculator",
    ],
    procedure: [
      "Measure the mass of the solid block using the triple beam balance",
      "Measure the length, width, and height of the block using vernier calipers",
      "Calculate the volume: V = length × width × height",
      "Calculate density: ρ = mass/volume",
      "Repeat for different materials and compare with standard values",
    ],
    theory: "Density is defined as mass per unit volume (ρ = m/V). Different materials have different densities. Regular solids have geometric shapes whose volumes can be calculated from measured dimensions.",
    expectedResults: "Aluminium: 2.7 g/cm³, Iron: 7.8 g/cm³, Copper: 8.9 g/cm³, Wood: 0.5-0.8 g/cm³",
    discussion: "The density of a material is characteristic and can be used to identify unknown materials. Sources of error include inaccurate measurements and irregular surfaces.",
    conclusion: "The density of a regular solid can be accurately determined by measuring its mass and calculating its volume from dimensions",
    precautions: [
      "Ensure the balance is on a level surface and properly zeroed",
      "Take multiple measurements of dimensions at different positions",
      "Use appropriate significant figures in calculations",
      "Handle materials carefully to avoid deformation",
    ],
    terms: [
      { term: "Density", definition: "Mass per unit volume, measured in kg/m³ or g/cm³" },
      { term: "Mass", definition: "Amount of matter in an object, measured in kg or g" },
      { term: "Volume", definition: "Space occupied by an object, measured in m³ or cm³" },
      { term: "Triple Beam Balance", definition: "A balance that measures mass using sliding weights on three beams" },
    ],
  },
  {
    id: "density-irregular",
    title: "Determining Density of Irregular Solids",
    form: 1,
    topic: "Measurement II",
    aim: "To determine the density of irregular solids using displacement method",
    apparatus: [
      "Measuring cylinder (100 ml)",
      "Triple beam balance",
      "Irregular solid (stone, metal piece)",
      "Thread",
      "Water",
    ],
    procedure: [
      "Measure the mass of the irregular solid using the beam balance",
      "Pour water into the measuring cylinder and record the initial volume (V₁)",
      "Tie thread around the solid and lower it gently into the water",
      "Record the new volume (V₂)",
      "Calculate volume of solid: V = V₂ - V₁",
      "Calculate density: ρ = m/(V₂ - V₁)",
    ],
    theory: "When an object is immersed in water, it displaces a volume of water equal to its own volume. This is Archimedes' principle applied to volume measurement.",
    expectedResults: "The volume equals the volume of water displaced. Density values should match known material densities.",
    discussion: "This method works for objects denser than water. For objects that float, a sinker must be used. Air bubbles on the surface cause errors.",
    conclusion: "The displacement method allows accurate determination of volumes of irregular solids, enabling density calculation",
    precautions: [
      "Ensure the object is completely submerged without touching the sides",
      "Remove air bubbles from the surface of the object",
      "Lower the object gently to avoid splashing",
      "Read the water level at the meniscus bottom",
    ],
    terms: [
      { term: "Displacement", definition: "The volume of fluid pushed aside when an object is immersed" },
      { term: "Meniscus", definition: "The curved surface of water in a tube" },
      { term: "Archimedes' Principle", definition: "An immersed object displaces its own volume of fluid" },
    ],
  },
  {
    id: "centre-of-gravity",
    title: "Finding Centre of Gravity",
    form: 1,
    topic: "Force",
    aim: "To determine the centre of gravity of an irregular lamina using the plumb line method",
    apparatus: [
      "Irregular cardboard lamina",
      "Retort stand with clamp",
      "Plumb line (thread with weight)",
      "Cork or nail",
      "Pencil and ruler",
    ],
    procedure: [
      "Make three small holes near the edge of the lamina",
      "Suspend the lamina from one hole using the cork on the retort stand",
      "Hang the plumb line from the same point",
      "When steady, draw a line along the plumb line on the lamina",
      "Repeat from the other two holes",
      "The intersection of the three lines is the centre of gravity",
    ],
    theory: "The centre of gravity is the point where the total weight of a body appears to act. A freely suspended body always hangs with its centre of gravity directly below the pivot.",
    expectedResults: "All three lines should intersect at a single point (or very close to it)",
    discussion: "Small errors may cause lines not to meet exactly at one point. The method works because torque is zero when COG is below the pivot.",
    conclusion: "The centre of gravity of an irregular lamina can be found as the intersection point of lines drawn using the plumb line method",
    precautions: [
      "Ensure the lamina swings freely without friction",
      "Wait until the plumb line is completely steady before drawing",
      "Make holes close to the edge but not too close",
      "Use a sharp pencil for accurate line drawing",
    ],
    terms: [
      { term: "Centre of Gravity", definition: "The point through which the total weight of a body acts" },
      { term: "Plumb Line", definition: "A weight on a string that hangs vertically due to gravity" },
      { term: "Lamina", definition: "A thin flat sheet of material" },
      { term: "Pivot", definition: "The point about which an object can rotate" },
    ],
  },
  {
    id: "pressure-liquids",
    title: "Pressure in Liquids",
    form: 1,
    topic: "Pressure",
    aim: "To investigate how pressure in liquids varies with depth",
    apparatus: [
      "Tall transparent container",
      "Rubber tubing",
      "Thistle funnel covered with rubber membrane",
      "Metre rule",
      "U-tube manometer",
      "Water",
    ],
    procedure: [
      "Connect the thistle funnel to the U-tube manometer using rubber tubing",
      "Fill the tall container with water",
      "Immerse the funnel at a known depth and record the manometer reading",
      "Repeat at different depths (10 cm, 20 cm, 30 cm, etc.)",
      "Record the pressure difference (manometer height difference)",
      "Plot a graph of pressure vs depth",
    ],
    theory: "Pressure in a liquid increases with depth according to P = ρgh, where ρ is density, g is gravitational acceleration, and h is depth.",
    expectedResults: "A straight line graph passing through the origin, showing pressure is directly proportional to depth",
    discussion: "The experiment confirms that pressure increases linearly with depth. This explains why dams are thicker at the bottom.",
    conclusion: "Pressure in a liquid is directly proportional to depth and depends on the density of the liquid",
    precautions: [
      "Ensure no air bubbles in the rubber tubing",
      "Keep the funnel facing horizontally at each depth",
      "Allow the manometer to stabilize before taking readings",
      "Ensure the container is deep enough for significant readings",
    ],
    terms: [
      { term: "Pressure", definition: "Force per unit area, measured in Pascals (N/m²)" },
      { term: "Manometer", definition: "A device for measuring pressure differences" },
      { term: "Hydrostatic Pressure", definition: "Pressure due to the weight of a fluid above a point" },
    ],
  },
  {
    id: "thermal-expansion-solid",
    title: "Thermal Expansion of Solids",
    form: 1,
    topic: "Thermal Expansion",
    aim: "To demonstrate and measure the linear expansion of metals when heated",
    apparatus: [
      "Metal rod (copper, iron, or brass)",
      "Steam jacket",
      "Dial gauge or spherometer",
      "Bunsen burner",
      "Thermometer",
      "Metre rule",
      "Steam generator",
    ],
    procedure: [
      "Measure the initial length of the metal rod at room temperature",
      "Record the initial temperature using the thermometer",
      "Place the rod in the steam jacket and set up the dial gauge at one end",
      "Pass steam through the jacket and observe the dial gauge reading",
      "Record the final temperature (100°C) and expansion from dial gauge",
      "Calculate the linear expansivity: α = ΔL/(L₀ × ΔT)",
    ],
    theory: "Metals expand when heated because atoms vibrate more and need more space. The expansion is proportional to original length and temperature change: ΔL = αL₀ΔT",
    expectedResults: "Copper α ≈ 17 × 10⁻⁶ /°C, Iron α ≈ 12 × 10⁻⁶ /°C, Brass α ≈ 19 × 10⁻⁶ /°C",
    discussion: "Different metals have different expansivities. This is used in bimetallic strips for thermostats. Expansion gaps are left in railway tracks and bridges.",
    conclusion: "Solids expand linearly when heated, and different materials have different coefficients of linear expansion",
    precautions: [
      "Handle hot apparatus with care using tongs",
      "Ensure the rod is free to expand without restriction",
      "Allow sufficient time for thermal equilibrium",
      "Take readings quickly before heat loss occurs",
    ],
    terms: [
      { term: "Linear Expansivity", definition: "The fractional increase in length per degree temperature rise" },
      { term: "Thermal Equilibrium", definition: "State where all parts are at the same temperature" },
      { term: "Bimetallic Strip", definition: "Two metals bonded together that bend when heated due to different expansivities" },
    ],
  },
  // Form 2 Experiments
  {
    id: "magnetic-field-lines",
    title: "Mapping Magnetic Field Lines",
    form: 2,
    topic: "Magnetism",
    aim: "To investigate and map the magnetic field patterns around magnets",
    apparatus: [
      "Bar magnets (2)",
      "Iron filings",
      "Plotting compass",
      "White cardboard",
      "Horseshoe magnet",
    ],
    procedure: [
      "Place a bar magnet on the table and cover with white cardboard",
      "Sprinkle iron filings evenly over the cardboard",
      "Tap gently and observe the pattern formed",
      "Alternatively, use a plotting compass to trace field lines point by point",
      "Mark the direction of the field (N to S) with arrows",
      "Repeat for two magnets with like and unlike poles facing",
    ],
    theory: "Magnetic field lines show the direction a north pole would move. They run from north to south outside the magnet, never cross, and are closest where the field is strongest.",
    expectedResults: "Lines curve from north to south pole. Like poles repel (lines diverge), unlike poles attract (lines connect).",
    discussion: "Field patterns help visualize invisible magnetic forces. The density of lines indicates field strength. Earth's field affects the pattern.",
    conclusion: "Magnetic field lines run from north to south pole and show the direction and strength of the magnetic field",
    precautions: [
      "Keep iron filings away from other magnetic equipment",
      "Tap the cardboard gently to avoid disturbing the pattern",
      "Keep other magnets away from the experiment area",
      "Clean up iron filings carefully after the experiment",
    ],
    terms: [
      { term: "Magnetic Field", definition: "The region around a magnet where magnetic forces act" },
      { term: "Field Lines", definition: "Imaginary lines showing the direction of magnetic force" },
      { term: "Neutral Point", definition: "Where Earth's field cancels the magnet's field" },
    ],
  },
  {
    id: "electroscope-charging",
    title: "Charging an Electroscope",
    form: 2,
    topic: "Electrostatics I",
    aim: "To charge a gold leaf electroscope by induction and contact",
    apparatus: [
      "Gold leaf electroscope",
      "Polythene rod",
      "Cellulose acetate rod",
      "Fur and silk cloths",
      "Earthing wire",
    ],
    procedure: [
      "Rub polythene with fur to charge it negatively",
      "Bring the charged rod near (not touching) the electroscope cap",
      "Observe the leaf divergence",
      "While rod is near, touch the cap with finger (earthing), then remove finger",
      "Remove the rod and observe the leaf stays diverged",
      "Repeat using contact method (touch the rod to the cap)",
    ],
    theory: "Induction: charges in the electroscope separate due to the field from the charged rod. Earthing removes one type of charge, leaving the opposite charge. Contact transfers charge directly.",
    expectedResults: "By induction: electroscope gets opposite charge to the rod. By contact: electroscope gets same charge as the rod.",
    discussion: "Induction charges without contact and gives opposite charge. Contact gives same charge but depletes the charging body. The leaf diverges because like charges repel.",
    conclusion: "Objects can be charged by induction (opposite charge) or by contact (same charge), demonstrated by leaf divergence",
    precautions: [
      "Keep the electroscope dry for best results",
      "Work quickly on humid days as charge leaks",
      "Ensure proper earthing connection",
      "Do not touch the cap with the rod during induction",
    ],
    terms: [
      { term: "Induction", definition: "Charging without contact using a charged object nearby" },
      { term: "Earthing", definition: "Connecting to ground to allow charge flow to/from earth" },
      { term: "Electroscope", definition: "A device for detecting electric charge" },
    ],
  },
  {
    id: "ohms-law",
    title: "Verifying Ohm's Law",
    form: 2,
    topic: "Current Electricity I",
    aim: "To verify Ohm's law by investigating the relationship between voltage and current",
    apparatus: [
      "Resistor (known value, e.g., 10Ω)",
      "Voltmeter (0-5V)",
      "Ammeter (0-1A)",
      "Variable power supply or cells with rheostat",
      "Connecting wires",
      "Switch",
    ],
    procedure: [
      "Set up the circuit with ammeter in series and voltmeter in parallel with resistor",
      "Close the switch and adjust for minimum voltage",
      "Record the voltage (V) and current (I)",
      "Increase voltage in steps and record corresponding current values",
      "Plot a graph of V against I",
      "Calculate the gradient (= resistance)",
    ],
    theory: "Ohm's Law states that current through a conductor is proportional to voltage, provided temperature remains constant. V = IR, where R is resistance.",
    expectedResults: "A straight line through the origin. Gradient = Resistance in ohms.",
    discussion: "The linear relationship confirms Ohm's law. The component is 'ohmic' if the graph is a straight line. Non-ohmic devices (bulbs, diodes) give curved graphs.",
    conclusion: "For a metallic conductor at constant temperature, current is directly proportional to voltage, confirming Ohm's Law",
    precautions: [
      "Avoid high currents that could heat the resistor",
      "Check connections before closing the switch",
      "Take readings quickly to minimize heating effects",
      "Ensure meters are on correct range",
    ],
    terms: [
      { term: "Ohm's Law", definition: "V = IR at constant temperature" },
      { term: "Resistance", definition: "Opposition to current flow, measured in ohms (Ω)" },
      { term: "Ohmic Conductor", definition: "A conductor that obeys Ohm's law" },
    ],
  },
  {
    id: "wave-properties",
    title: "Properties of Waves in a Ripple Tank",
    form: 2,
    topic: "Waves",
    aim: "To investigate reflection, refraction, and diffraction of water waves",
    apparatus: [
      "Ripple tank with lamp",
      "Electric vibrator or hand dipper",
      "Straight and curved barriers",
      "Shallow glass plate",
      "Screen below tank",
      "Stroboscope (optional)",
    ],
    procedure: [
      "Set up the ripple tank with water about 1 cm deep",
      "Generate straight waves using the vibrator",
      "For reflection: place a straight barrier at an angle and observe reflected waves",
      "For refraction: place shallow glass plate to create a shallow region",
      "For diffraction: use barriers with a gap and observe wave spreading",
      "Sketch the wave patterns observed on the screen below",
    ],
    theory: "Waves reflect with angle of incidence equal to angle of reflection. They refract (change direction) when speed changes in different depths. They diffract (spread) through gaps.",
    expectedResults: "Reflection: equal angles. Refraction: waves bend towards normal in shallow water. Diffraction: significant spreading when gap ≈ wavelength.",
    discussion: "These properties apply to all waves including light and sound. The amount of diffraction depends on the ratio of wavelength to gap size.",
    conclusion: "Water waves demonstrate reflection, refraction, and diffraction, showing properties common to all wave types",
    precautions: [
      "Ensure water depth is uniform for consistent wave speed",
      "Adjust vibrator frequency for clear wave patterns",
      "Darken the room for better visualization on the screen",
      "Keep water clean and free from surface films",
    ],
    terms: [
      { term: "Reflection", definition: "Bouncing of waves from a barrier" },
      { term: "Refraction", definition: "Change of wave direction due to speed change" },
      { term: "Diffraction", definition: "Spreading of waves through gaps or around obstacles" },
      { term: "Wavelength", definition: "Distance between consecutive wave crests" },
    ],
  },
  // Form 3 Experiments
  {
    id: "velocity-time-graph",
    title: "Motion on an Inclined Plane",
    form: 3,
    topic: "Linear Motion",
    aim: "To investigate uniformly accelerated motion and plot velocity-time graphs",
    apparatus: [
      "Inclined runway (friction-compensated)",
      "Trolley",
      "Ticker timer and tape",
      "12V power supply",
      "Metre rule",
      "Stop watch (optional)",
    ],
    procedure: [
      "Set up the inclined runway at a small angle",
      "Attach ticker tape to the trolley",
      "Set the ticker timer running (50 Hz)",
      "Release the trolley and let it run down the plane",
      "Cut the tape into 5-dot intervals (0.1 s each)",
      "Stick strips side by side to form a velocity-time chart",
      "Plot velocity against time graph",
    ],
    theory: "For uniform acceleration, v = u + at. The velocity-time graph is a straight line with gradient = acceleration. Area under graph = displacement.",
    expectedResults: "A straight line graph with positive gradient indicating uniform acceleration. Acceleration ≈ 0.5-2 m/s² depending on angle.",
    discussion: "The spacing between dots increases uniformly showing constant acceleration. Friction affects results. The ticker timer method provides accurate timing.",
    conclusion: "A body moving down an inclined plane undergoes uniform acceleration, as shown by the linear velocity-time graph",
    precautions: [
      "Ensure the runway is straight and smooth",
      "Release the trolley without pushing",
      "Check that the ticker timer is working properly",
      "Avoid tape getting tangled during motion",
    ],
    terms: [
      { term: "Uniform Acceleration", definition: "Constant rate of change of velocity" },
      { term: "Ticker Timer", definition: "Device that makes dots at regular time intervals" },
      { term: "Velocity", definition: "Rate of change of displacement" },
    ],
  },
  {
    id: "snells-law",
    title: "Verifying Snell's Law",
    form: 3,
    topic: "Refraction of Light",
    aim: "To verify Snell's law and determine the refractive index of glass",
    apparatus: [
      "Rectangular glass block",
      "Four optical pins",
      "Plain paper",
      "Drawing board",
      "Protractor",
      "Pencil and ruler",
    ],
    procedure: [
      "Place the glass block on paper and trace its outline",
      "Draw a normal at the point where light will enter",
      "Place two pins (P₁, P₂) along the incident ray at known angle i",
      "Look through the block and align two more pins (P₃, P₄) with the images of P₁, P₂",
      "Remove the block and draw the emergent ray",
      "Measure angles of incidence (i) and refraction (r)",
      "Repeat for different angles and calculate sin i / sin r",
    ],
    theory: "Snell's law states: sin i / sin r = n (constant) = refractive index. Light bends towards the normal when entering a denser medium.",
    expectedResults: "Refractive index of glass ≈ 1.5. The ratio sin i / sin r should be constant for all angles.",
    discussion: "The refractive index depends on the type of glass. Total internal reflection occurs when angle exceeds the critical angle in denser medium.",
    conclusion: "Snell's law is verified: the ratio of sine of angle of incidence to sine of angle of refraction is constant (refractive index)",
    precautions: [
      "Use thin pins placed vertically",
      "Ensure pins are aligned by looking through the block from various heights",
      "Draw normal carefully at 90° to the surface",
      "Avoid very small or very large angles of incidence",
    ],
    terms: [
      { term: "Refractive Index", definition: "Ratio of speed of light in vacuum to speed in the medium" },
      { term: "Normal", definition: "Line perpendicular to the surface at point of incidence" },
      { term: "Critical Angle", definition: "Angle of incidence that gives refraction at 90°" },
    ],
  },
  {
    id: "lens-equation",
    title: "Verifying the Lens Equation",
    form: 3,
    topic: "Lenses",
    aim: "To verify the lens equation 1/f = 1/u + 1/v using a converging lens",
    apparatus: [
      "Converging lens (f ≈ 15 cm)",
      "Illuminated object (cross-wire or arrow)",
      "White screen",
      "Optical bench or metre rule",
      "Lens holder",
    ],
    procedure: [
      "Mount the lens and illuminated object on the optical bench",
      "Place the object at a distance u > 2f from the lens",
      "Move the screen until a sharp image is formed",
      "Record the object distance (u) and image distance (v)",
      "Repeat for different object distances",
      "For each pair, calculate 1/u + 1/v = 1/f",
    ],
    theory: "For a thin lens: 1/f = 1/u + 1/v, where f = focal length, u = object distance, v = image distance. Magnification m = v/u = image height/object height.",
    expectedResults: "Calculated focal length should be consistent (≈15 cm). When u = 2f, v = 2f and image size equals object size.",
    discussion: "The experiment works best when image is sharp and clearly focused. Aberrations affect results with thick lenses or wide apertures.",
    conclusion: "The lens equation 1/f = 1/u + 1/v is verified experimentally, with consistent focal length values",
    precautions: [
      "Use a thin lens to minimize aberrations",
      "Ensure object, lens, and screen are aligned",
      "Focus carefully for sharpest image",
      "Measure distances from the centre of the lens",
    ],
    terms: [
      { term: "Focal Length", definition: "Distance from lens to focal point where parallel rays converge" },
      { term: "Real Image", definition: "Image formed by actual rays that can be projected on a screen" },
      { term: "Magnification", definition: "Ratio of image size to object size" },
    ],
  },
  {
    id: "momentum-conservation",
    title: "Conservation of Momentum",
    form: 3,
    topic: "Newton's Laws of Motion",
    aim: "To verify the law of conservation of linear momentum in collisions",
    apparatus: [
      "Two trolleys of known mass",
      "Ticker timer and tape",
      "Spring-loaded plunger or velcro for collisions",
      "Runway",
      "Balance",
      "12V power supply",
    ],
    procedure: [
      "Measure the mass of each trolley",
      "Attach ticker tape to the first trolley",
      "Push trolley A towards stationary trolley B",
      "For inelastic collision, let them stick together using velcro",
      "Analyze the tape to find velocities before and after collision",
      "Calculate total momentum before and after collision",
    ],
    theory: "Law of Conservation of Momentum: In the absence of external forces, total momentum before collision equals total momentum after. m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂",
    expectedResults: "Total momentum before = total momentum after (within experimental error). Some kinetic energy is lost in inelastic collisions.",
    discussion: "Friction causes small momentum losses. Elastic collisions conserve kinetic energy. Inelastic collisions lose kinetic energy but conserve momentum.",
    conclusion: "The total momentum of an isolated system is conserved during collisions, verifying the law of conservation of momentum",
    precautions: [
      "Use a friction-compensated runway",
      "Ensure collisions are head-on for simple analysis",
      "Measure masses accurately",
      "Avoid external pushes after collision starts",
    ],
    terms: [
      { term: "Momentum", definition: "Product of mass and velocity (p = mv)" },
      { term: "Elastic Collision", definition: "Collision where kinetic energy is conserved" },
      { term: "Inelastic Collision", definition: "Collision where kinetic energy is not conserved" },
    ],
  },
  // Form 4 Experiments
  {
    id: "electromagnetic-induction",
    title: "Electromagnetic Induction",
    form: 4,
    topic: "Electromagnetic Induction",
    aim: "To investigate factors affecting induced EMF in a coil",
    apparatus: [
      "Bar magnet",
      "Coil of known turns (e.g., 100 turns)",
      "Sensitive galvanometer or millivoltmeter",
      "Connecting wires",
      "Iron core",
    ],
    procedure: [
      "Connect the coil to the galvanometer",
      "Move the magnet into the coil and observe the galvanometer deflection",
      "Move the magnet out and note the direction of deflection",
      "Vary the speed of movement and observe the effect",
      "Use coils with different number of turns",
      "Insert an iron core and repeat",
    ],
    theory: "Faraday's Law: Induced EMF is proportional to the rate of change of magnetic flux. Lenz's Law: The induced current opposes the change producing it. EMF = -N(dΦ/dt)",
    expectedResults: "Faster movement → larger EMF. More turns → larger EMF. Iron core → larger EMF. Direction reverses when motion reverses.",
    discussion: "This principle is used in generators and transformers. The iron core increases magnetic flux linkage. Only changing flux induces EMF.",
    conclusion: "Induced EMF depends on rate of change of flux, number of coil turns, and magnetic flux density, as predicted by Faraday's law",
    precautions: [
      "Use a sensitive galvanometer for small induced currents",
      "Move the magnet smoothly at constant speed",
      "Ensure good connections in the circuit",
      "Keep other magnets away from the experiment",
    ],
    terms: [
      { term: "Induced EMF", definition: "Voltage generated by changing magnetic flux" },
      { term: "Magnetic Flux", definition: "Product of magnetic field and area (Φ = BA)" },
      { term: "Lenz's Law", definition: "Induced current opposes the change producing it" },
    ],
  },
  {
    id: "transformer",
    title: "Transformer Experiment",
    form: 4,
    topic: "Electromagnetic Induction",
    aim: "To investigate the relationship between turns ratio and voltage ratio in a transformer",
    apparatus: [
      "Transformer kit with detachable coils",
      "AC power supply (low voltage)",
      "Two AC voltmeters",
      "Laminated iron core",
      "Connecting wires",
    ],
    procedure: [
      "Wind primary coil with known turns (e.g., 100 turns)",
      "Wind secondary coil with different turns (e.g., 50, 100, 200)",
      "Connect primary to AC supply through voltmeter",
      "Connect voltmeter to secondary coil",
      "Record primary voltage and secondary voltage",
      "Calculate and verify: Vs/Vp = Ns/Np",
    ],
    theory: "Transformer equation: Vs/Vp = Ns/Np = Ip/Is. For ideal transformers, power in = power out (VpIp = VsIs). Step-up transformers increase voltage, step-down decrease it.",
    expectedResults: "Voltage ratio equals turns ratio. Step-up: Ns > Np gives Vs > Vp. Step-down: Ns < Np gives Vs < Vp.",
    discussion: "Real transformers have losses due to: resistance of windings, eddy currents, hysteresis, and flux leakage. Laminated cores reduce eddy current losses.",
    conclusion: "The voltage ratio of a transformer equals the turns ratio, confirming the transformer equation",
    precautions: [
      "Use only AC supply - DC will not work",
      "Do not exceed rated voltage of the coils",
      "Ensure iron core has no air gaps",
      "Handle hot coils carefully after prolonged use",
    ],
    terms: [
      { term: "Primary Coil", definition: "The input coil connected to AC supply" },
      { term: "Secondary Coil", definition: "The output coil where transformed voltage appears" },
      { term: "Turns Ratio", definition: "Ratio of secondary turns to primary turns" },
    ],
  },
  {
    id: "photoelectric-effect",
    title: "Photoelectric Effect",
    form: 4,
    topic: "Photoelectric Effect",
    aim: "To demonstrate the photoelectric effect and investigate threshold frequency",
    apparatus: [
      "Photocell or zinc plate",
      "Electroscope",
      "UV lamp",
      "Glass and quartz plates",
      "Light source with color filters",
      "Sensitive ammeter (for photocell)",
    ],
    procedure: [
      "Charge a clean zinc plate negatively using friction",
      "Place it on the electroscope and note the leaf divergence",
      "Shine UV light on the zinc plate and observe the leaf",
      "Place glass between UV source and plate - observe effect",
      "Repeat with different light frequencies (colors)",
      "Note which frequencies cause electron emission",
    ],
    theory: "Photoelectric effect: Light ejects electrons from metal if frequency exceeds threshold. Energy of photon: E = hf. Einstein's equation: hf = φ + ½mv²max",
    expectedResults: "UV causes discharge of negatively charged zinc. Glass blocks UV, stopping the effect. Visible light (lower frequency) does not discharge the plate.",
    discussion: "This proves light has particle nature (photons). Intensity affects number of electrons, not their energy. Only frequency affects maximum kinetic energy.",
    conclusion: "The photoelectric effect demonstrates that light behaves as particles (photons) with energy proportional to frequency",
    precautions: [
      "Clean the zinc plate with emery paper before use",
      "Do not look directly at UV light source",
      "Ensure the plate is charged to the correct polarity",
      "Work in a darkened room for best results",
    ],
    terms: [
      { term: "Threshold Frequency", definition: "Minimum frequency needed to emit electrons" },
      { term: "Work Function", definition: "Minimum energy needed to remove an electron from the surface" },
      { term: "Photon", definition: "A quantum of light energy" },
    ],
  },
];

const PhysicsLab = () => {
  const [selectedForm, setSelectedForm] = useState<number>(1);
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [activeTab, setActiveTab] = useState<string>("aim");
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationData, setSimulationData] = useState<any>({});

  const filteredExperiments = physicsExperiments.filter(exp => exp.form === selectedForm);

  const runSimulation = (experimentId: string) => {
    setSimulationRunning(true);
    toast.success("Simulation started!");
    
    // Simulate different experiments
    setTimeout(() => {
      switch (experimentId) {
        case "vernier-caliper":
          setSimulationData({
            mainScale: 2.3,
            vernierCoincidence: 7,
            reading: 2.37,
            zeroError: 0.02,
            correctedReading: 2.35,
          });
          break;
        case "ohms-law":
          setSimulationData({
            readings: [
              { voltage: 0.5, current: 0.05 },
              { voltage: 1.0, current: 0.10 },
              { voltage: 1.5, current: 0.15 },
              { voltage: 2.0, current: 0.20 },
              { voltage: 2.5, current: 0.25 },
            ],
            resistance: 10,
          });
          break;
        case "snells-law":
          setSimulationData({
            readings: [
              { i: 20, r: 13.2, sinI: 0.342, sinR: 0.228, n: 1.50 },
              { i: 30, r: 19.5, sinI: 0.500, sinR: 0.334, n: 1.50 },
              { i: 40, r: 25.4, sinI: 0.643, sinR: 0.429, n: 1.50 },
              { i: 50, r: 30.7, sinI: 0.766, sinR: 0.511, n: 1.50 },
            ],
            refractiveIndex: 1.50,
          });
          break;
        default:
          setSimulationData({ message: "Simulation complete" });
      }
      setSimulationRunning(false);
      toast.success("Simulation complete! View results below.");
    }, 2000);
  };

  const resetSimulation = () => {
    setSimulationData({});
    setSimulationRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Form Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[1, 2, 3, 4].map((form) => (
          <Button
            key={form}
            variant={selectedForm === form ? "default" : "outline"}
            onClick={() => {
              setSelectedForm(form);
              setSelectedExperiment(null);
            }}
          >
            Form {form}
          </Button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Experiment List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Form {selectedForm} Experiments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredExperiments.map((exp) => (
                <div
                  key={exp.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedExperiment?.id === exp.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  onClick={() => {
                    setSelectedExperiment(exp);
                    resetSimulation();
                  }}
                >
                  <div className="font-medium text-sm">{exp.title}</div>
                  <div className="text-xs opacity-70">{exp.topic}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Experiment Details */}
        <div className="lg:col-span-2">
          {selectedExperiment ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="mb-2">Form {selectedExperiment.form}</Badge>
                    <CardTitle>{selectedExperiment.title}</CardTitle>
                    <p className="text-muted-foreground mt-1">{selectedExperiment.topic}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => runSimulation(selectedExperiment.id)}
                      disabled={simulationRunning}
                      className="gap-2"
                    >
                      <PlayCircle className="w-4 h-4" />
                      {simulationRunning ? "Running..." : "Run Simulation"}
                    </Button>
                    <Button variant="outline" onClick={resetSimulation} className="gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-4">
                    <TabsTrigger value="aim">
                      <Target className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="apparatus">Apparatus</TabsTrigger>
                    <TabsTrigger value="procedure">Procedure</TabsTrigger>
                    <TabsTrigger value="theory">Theory</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                    <TabsTrigger value="discussion">Discussion</TabsTrigger>
                    <TabsTrigger value="precautions">
                      <AlertTriangle className="w-4 h-4" />
                    </TabsTrigger>
                    <TabsTrigger value="terms">
                      <FileText className="w-4 h-4" />
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="aim" className="space-y-4">
                    <div className="p-4 bg-primary/10 rounded-lg">
                      <h4 className="font-semibold flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4" />
                        Aim of the Experiment
                      </h4>
                      <p>{selectedExperiment.aim}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="apparatus" className="space-y-4">
                    <h4 className="font-semibold mb-2">Required Apparatus</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedExperiment.apparatus.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-secondary rounded">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="procedure" className="space-y-4">
                    <h4 className="font-semibold mb-2">Procedure</h4>
                    <ol className="space-y-2">
                      {selectedExperiment.procedure.map((step, idx) => (
                        <li key={idx} className="flex gap-3 p-2 bg-secondary/50 rounded">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </TabsContent>

                  <TabsContent value="theory" className="space-y-4">
                    <h4 className="font-semibold mb-2">Theory</h4>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p>{selectedExperiment.theory}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="results" className="space-y-4">
                    <h4 className="font-semibold mb-2">Expected Results</h4>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p>{selectedExperiment.expectedResults}</p>
                    </div>
                    
                    {Object.keys(simulationData).length > 0 && (
                      <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg mt-4">
                        <h5 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                          Simulation Results
                        </h5>
                        <pre className="text-sm overflow-x-auto">
                          {JSON.stringify(simulationData, null, 2)}
                        </pre>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="discussion" className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Discussion</h4>
                      <div className="p-4 bg-secondary/50 rounded-lg">
                        <p>{selectedExperiment.discussion}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Conclusion</h4>
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <p className="font-medium">{selectedExperiment.conclusion}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="precautions" className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      Precautions
                    </h4>
                    <ul className="space-y-2">
                      {selectedExperiment.precautions.map((precaution, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2 bg-amber-50 dark:bg-amber-950/30 rounded">
                          <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span>{precaution}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>

                  <TabsContent value="terms" className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4" />
                      Key Terms
                    </h4>
                    <div className="space-y-2">
                      {selectedExperiment.terms.map((term, idx) => (
                        <div key={idx} className="p-3 bg-secondary rounded-lg">
                          <dt className="font-semibold text-primary">{term.term}</dt>
                          <dd className="text-sm text-muted-foreground mt-1">{term.definition}</dd>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <Ruler className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Select an experiment from the list to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhysicsLab;
