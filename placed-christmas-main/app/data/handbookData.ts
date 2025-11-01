export interface HandbookSection {
  sectionId: string;
  sectionTitle: string;
  content: string[];
}

export interface HandbookChapter {
  id: string;
  title: string;
  icon: string;
  sections: HandbookSection[];
}

export const handbookData: HandbookChapter[] = [
  {
    id: 'why-go-pro',
    title: 'Chapter 1: Why Go Pro? The PLACED Advantage',
    icon: '🏆',
    sections: [
      {
        sectionId: 'safety-first',
        sectionTitle: 'Safety First: It\'s More Than Just Ladders',
        content: [
          'Climbing on icy roofs with electrical wires is inherently dangerous. Beyond falls, improper wiring can lead to electrical fires, shorts, or even electrocution. Statistics show that thousands of holiday-related accidents occur each year from DIY lighting installations.',
          '<strong>Weather Hazards:</strong> December installation means dealing with ice, snow, wet conditions, and reduced daylight hours. Professional equipment and training make all the difference.',
          '<strong>Electrical Risks:</strong> Overloaded circuits, improper GFCI protection, and mixing indoor/outdoor rated equipment create serious fire hazards.',
          '<strong>🎯 The PLACED Solution:</strong> Our insured and professionally trained technicians adhere to strict safety protocols, utilizing proper equipment and electrical knowledge to ensure a safe installation every time. We handle the risks so you don\'t have to. <em>Your family\'s safety is worth more than any savings.</em>'
        ]
      },
      {
        sectionId: 'cost-illusion',
        sectionTitle: 'The True Cost: DIY vs. Professional Reality Check',
        content: [
          'DIY might seem cheaper upfront, but let\'s do the math honestly. Factor in quality lights ($200-500), clips and hardware ($50-100), extension cords and timers ($75-150), specialized tools ($100-200), and your invaluable time (20-40 hours @ $25/hour = $500-1000).',
          '<strong>Hidden Costs:</strong> Replacement bulbs each year ($50-100), storage solutions ($50-200), potential repair costs from poor installation ($200-2000), and even medical bills from accidents (thousands).',
          '<strong>Time Investment:</strong> Planning (4-8 hours), shopping (4-6 hours), installation (8-16 hours), troubleshooting (2-8 hours), removal (4-8 hours), storage (2-4 hours). That\'s 24-50 hours of your holiday season!',
          '<strong>🎯 The PLACED Solution:</strong> We provide durable, commercial-grade, custom-cut LED lights designed to last for years. Our packages are all-inclusive, covering design, installation, maintenance, removal, and storage – delivering true value for a truly stress-free holiday. <em>When you factor in your time and peace of mind, professional installation is actually the economical choice.</em>'
        ]
      },
      {
        sectionId: 'storage-hell',
        sectionTitle: 'The Storage Nightmare, Solved',
        content: [
          'Every January: tangled strands, broken bulbs stored in damp basements, and the annual hunt for storage space. Improper storage drastically shortens the lifespan of your lights and adds immense frustration each year.',
          '<strong>Common Storage Problems:</strong> Moisture damage, rodent damage, tangled wires, broken bulbs, lost clips and hardware, temperature extremes that crack plastic components.',
          '<strong>Replacement Cycle:</strong> Most homeowners replace 30-50% of their lights every 2-3 years due to storage damage. That \'one-time\' investment keeps recurring.',
          '<strong>🎯 The PLACED Solution:</strong> All our clients benefit from professional, temperature-controlled, labeled storage. We meticulously pack away your lights, test them before next season, and ensure they\'re ready to glow again. No more attic battles, no more January frustration, no more surprise replacements. <em>We handle the full lifecycle so you can focus on enjoying the holidays.</em>'
        ]
      },
    ],
  },
  {
    id: 'diy-playbook',
    title: 'Chapter 2: The DIYer\'s Playbook (If You Insist 😉)',
    icon: '🛠️',
    sections: [
      {
        sectionId: 'planning-design',
        sectionTitle: 'Planning & Design Essentials',
        content: [
          '<strong>1. Ditch the Generic Strings:</strong> For a professional look, avoid pre-packaged stringer sets. Instead, use <strong>C7 or C9 bulk light line</strong> (empty socket wire) and screw in individual LED bulbs. This allows for custom lengths and perfect spacing.',
          '<strong>2. Measure Meticulously:</strong> Use online tools (like Google Earth or a satellite view app) to accurately measure your roofline, gutters, windows, and landscape features. Overestimate by 10-15% to ensure adequate wire length.',
          '<strong>3. Consistent Spacing is Key:</strong> Professional displays use consistent bulb spacing - typically 6", 9", or 12" apart depending on the application. Rooflines: 12" spacing. Windows: 6" spacing. Trees: 9" spacing for balanced coverage.',
          '<strong>4. Color Temperature Matters:</strong> Stick to one color temperature throughout your display. Warm white (2700K-3000K) creates cozy ambiance. Cool white (5000K-6500K) appears more modern and bright. Mixing temperatures looks unprofessional.',
          '<strong>5. Create a Lighting Plan:</strong> Sketch your home and mark power outlet locations, planned light runs, and calculate total wattage. This prevents mid-installation surprises and ensures you have adequate power distribution.'
        ]
      },
      {
        sectionId: 'installation-techniques',
        sectionTitle: 'Smart Installation Techniques',
        content: [
          '<strong>Professional Clip Selection:</strong> Use the right clip for each application. All-in-one clips for shingles, gutter clips for gutters, magnetic clips for metal surfaces. Never use staples or nails through wires!',
          '<strong>The Custom Cable Advantage:</strong> Cut your light line to exact lengths needed. This eliminates excess wire loops and creates clean, professional lines. Use male/female connectors to join sections.',
          '<strong>The Pole Mounting Trick:</strong> For second-story applications, consider pole-mounted systems instead of roof mounting. Telescoping poles with light clips allow ground-based installation and adjustment.',
          '<strong>Power Distribution Strategy:</strong> Use outdoor-rated power strips with individual switches placed in weatherproof enclosures. This allows section control and easy troubleshooting.',
          '<strong>Wire Management:</strong> Secure all connections with waterproof wire nuts and electrical tape. Keep connections off the ground and away from walkways. Use cable ties to manage excess wire neatly.',
          '<strong>Testing Protocol:</strong> Test every section before final installation. Use a multimeter to check voltage at the end of long runs to ensure adequate power delivery.'
        ]
      },
      {
        sectionId: 'power-safety',
        sectionTitle: 'Power & Safety (The Serious Stuff)',
        content: [
          '<strong>Load Calculations:</strong> Standard 15-amp circuit = 1800 watts maximum. LED lights typically use 0.5-2 watts per bulb. Calculate total wattage and leave 20% safety margin. Use multiple circuits for large displays.',
          '<strong>GFCI Protection is Non-Negotiable:</strong> All outdoor lighting circuits must have GFCI protection. Test GFCI outlets monthly during the season. Replace immediately if they fail to trip.',
          '<strong>UL Certification Matters:</strong> Only use UL-listed lights, extension cords, and electrical components rated for outdoor use. "For indoor use only" equipment can cause fires outdoors.',
          '<strong>Weather Considerations:</strong> Never install during precipitation or high winds. Allow lights to dry completely before storage. Use weatherproof connections rated for your climate.',
          '<strong>Ladder Safety Protocol:</strong> Use appropriate ladder type for the job. Maintain 3-point contact. Have a spotter. Never overreach. Consider scaffolding for extensive roofline work.',
          '<strong>🚨 When to Stop and Call PLACED:</strong> If you encounter electrical panel modifications, complex routing, heights above 12 feet, or any situation that feels unsafe - that\'s when professional installation pays for itself in safety alone.'
        ]
      },
    ],
  },
  {
    id: 'post-holiday-perfection',
    title: 'Chapter 3: Post-Holiday Perfection (Or, Let Us Handle It)',
    icon: '📦',
    sections: [
      {
        sectionId: 'proper-removal',
        sectionTitle: 'Taking Down & Storing Lights the Right Way',
        content: [
          '<strong>Timing Matters:</strong> Wait for dry conditions but don\'t wait too long. Late January/early February removal avoids worst winter weather while preventing UV degradation from extended sun exposure.',
          '<strong>Systematic Removal:</strong> Work in reverse order of installation. Remove bulbs first, then wire, then clips. This prevents tangling and damage. Take photos during removal to remember successful layouts for next year.',
          '<strong>Bulb Care:</strong> Remove LED bulbs from sockets before storing wire. Store bulbs in original packaging or egg cartons to prevent breakage. Sort by color and type for easy identification next season.',
          '<strong>Wire Management:</strong> Wrap light line around large spools or cardboard forms. Avoid tight coiling which can damage internal wires. Label each section with masking tape indicating location and length.',
          '<strong>Storage Environment:</strong> Use climate-controlled space if possible. Avoid attics, garages, or basements with extreme temperature swings. Moisture is the enemy - use desiccant packets in storage containers.',
          '<strong>Pre-Storage Testing:</strong> Test all light strings before storage. Mark any damaged sections for repair or replacement. It\'s much easier to address issues in January than in December rush.'
        ]
      },
      {
        sectionId: 'storage-solutions',
        sectionTitle: 'Professional Storage Methods',
        content: [
          '<strong>Container Selection:</strong> Use rigid plastic containers with tight-fitting lids. Clear containers allow visual inventory. Size containers to match your light sections - don\'t overstuff.',
          '<strong>Inventory System:</strong> Create a simple inventory list noting container contents, lengths, colors, and condition. Take photos of stored items. Update annually as you replace components.',
          '<strong>Component Organization:</strong> Store clips, connectors, and hardware in labeled bags within containers. Include spare bulbs and fuses. A well-organized storage system saves hours next year.',
          '<strong>Climate Considerations:</strong> If using unheated storage, choose containers rated for temperature extremes. Avoid basement storage if flooding is possible. Consider rental storage unit for valuable displays.',
          '<strong>Annual Maintenance:</strong> Each year, clean connections with contact cleaner, check for corrosion, replace worn components proactively. This prevents mid-season failures.'
        ]
      },
      {
        sectionId: 'placed-advantage',
        sectionTitle: 'The PLACED Full-Service Guarantee',
        content: [
          '<strong>Professional Removal Service:</strong> We carefully remove your display using proper techniques and safety equipment. No ladders, no risk, no winter weather battles. Scheduled at your convenience in January/February.',
          '<strong>Comprehensive Testing & Maintenance:</strong> Every component is tested, cleaned, and inspected before storage. We identify and replace worn components proactively, ensuring your display is ready for next season.',
          '<strong>Climate-Controlled Storage:</strong> Your lights are stored in our temperature and humidity controlled facility. Professional labeling and inventory management means everything is cataloged and protected.',
          '<strong>Pre-Season Preparation:</strong> Before each installation, we test everything again, replace any failed components, and ensure your display will work flawlessly from day one.',
          '<strong>Warranty Protection:</strong> Our comprehensive warranty covers all components and labor. If something fails during the season, we fix or replace it at no charge.',
          '<strong>🎯 The Bottom Line:</strong> While DIY storage might seem simple, the reality is that most homeowners replace 30-50% of their lights every few years due to storage-related damage. Our professional storage and maintenance program actually saves money while eliminating all the hassle.',
          '<em>"I used to spend every January untangling and testing lights. Now I just enjoy the holidays knowing PLACED handles everything. Best decision I ever made!" - Sarah M., Rothesay</em>'
        ]
      },
    ],
  },
];

export default handbookData;