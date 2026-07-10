import { MonogramBadge } from "@/components/GatewayMark";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { useState } from "react";

const competencies = [
  "IT Professional Services",
  "Software and Application Development",
  "Technical and Network Support Services",
  "Documentation / Technical Writing",
  "Business Analysis and Process Re-engineering",
  "Business Process Consulting",
  "Systems / Data Administration",
  "Program and Project Management",
  "Help Desk and Customer Care",
  "Microsoft Stack Development",
  "Cyber Security Services",
  "Identity Access Management",
];

type Category =
  | "all"
  | "federal"
  | "state"
  | "transportation"
  | "hbe"
  | "judiciary"
  | "education";

const filterTabs: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Federal", value: "federal" },
  { label: "State & Local", value: "state" },
  { label: "Transportation", value: "transportation" },
  { label: "Health Benefit Exchange", value: "hbe" },
  { label: "Judiciary", value: "judiciary" },
  { label: "Education", value: "education" },
];

interface Contract {
  logo: string;
  name: string;
  contractType: string;
  contractNumber: string;
  category: Category;
}

const contracts: Contract[] = [
  // Federal
  {
    logo: "/assets/generated/gsa-logo-transparent.dim_200x80.png",
    name: "GSA",
    contractType: "Multiple Award Schedule",
    contractNumber: "47QTCA22D002J",
    category: "federal",
  },
  {
    logo: "/assets/generated/8a-star-ii-logo.dim_200x80.png",
    name: "8(a) STAR II",
    contractType: "Federal GWAC",
    contractNumber: "GS06F1173Z",
    category: "federal",
  },
  {
    logo: "/assets/generated/ciosp3-logo.dim_200x80.png",
    name: "CIOSP3",
    contractType: "IT Services/Solutions GWAC",
    contractNumber: "",
    category: "federal",
  },
  {
    logo: "/assets/generated/seaport-nxg-logo.dim_200x80.png",
    name: "Seaport NXG",
    contractType: "IDIQ MAS",
    contractNumber: "N0017819D8399",
    category: "federal",
  },
  // State & Local
  {
    logo: "https://sites.vgroupinc.com/files/publicsector/ny_hbits.jpg",
    name: "OGS, NY HBITS",
    contractType: "State IT Contract",
    contractNumber: "PH68633",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/PBITS_1.jpg",
    name: "OGS, NY PBITS",
    contractType: "State IT Contract",
    contractNumber: "PB129AA",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2023-10/maryland-cats.png",
    name: "Dept. of IT, MD CATS",
    contractType: "State IT Contract",
    contractNumber: "060B2490023",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2024-09/DIR%20logo_Name_Blue.png",
    name: "State of Texas DIR ITSAC",
    contractType: "State IT Contract",
    contractNumber: "DIR-CPO-5571",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2024-09/DIR%20logo_Name_Blue.png",
    name: "State of Texas DIR DBITS",
    contractType: "State IT Contract",
    contractNumber: "DIR-CPO-5944",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2024-02/dgs-california-department-of-general-services-logo-vector_0.png",
    name: "Dept. of General Services, CA",
    contractType: "State IT Contract",
    contractNumber: "3-24-01-1043",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2025-08/Calpers%20Logo%202.png",
    name: "CalPERS, CA",
    contractType: "State IT Contract",
    contractNumber: "2025-9542",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/Westdotgov.jpg",
    name: "County of Westchester, NY",
    contractType: "IT Contract",
    contractNumber: "IT-1600",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/us-mn-he_0.gif",
    name: "County of Hennepin, MN",
    contractType: "IT Contract",
    contractNumber: "PR00001640",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/styles/medium/public/sunnyvale.jpg",
    name: "City of Sunnyvale, CA",
    contractType: "IT Contract",
    contractNumber: "RFQL F21-005",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/styles/medium/public/County-of-Santa-Clara-seal-150x150.png",
    name: "County of Santa Clara, CA",
    contractType: "IT Contract",
    contractNumber: "eRFSQ-ISD-FY22-0372",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/styles/medium/public/cityofmilwaukee_0.png",
    name: "City of Milwaukee, WI",
    contractType: "IT Contract",
    contractNumber: "17704",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/styles/large/public/Screenshot%202022-01-10%20104751.png",
    name: "DMS, State of Florida",
    contractType: "State IT Contract",
    contractNumber: "80101507-23-STC-ITSA",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2024-04/WDES_0.png",
    name: "Dept. of Enterprise Services, WA",
    contractType: "State IT Contract",
    contractNumber: "14822",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/vgroupinc.com/files/styles/medium/public/Oakland-County-logo.png",
    name: "Oakland County, MI",
    contractType: "IT Contract",
    contractNumber: "004680",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/vgroupinc.com/files/styles/large/public/MWCOG%20IMAGE.png",
    name: "MWCOG, DC",
    contractType: "IT Contract",
    contractNumber: "22-051",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/styles/large/public/logo_0.png",
    name: "City of Pittsburgh, PA",
    contractType: "IT Contract",
    contractNumber: "53845, 53850, 53852",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/styles/large/public/1519856578227_1.jpg",
    name: "Dept. BGS, VT",
    contractType: "State IT Contract",
    contractNumber: "45390",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/pa.png",
    name: "Commonwealth of Pennsylvania",
    contractType: "State IT Contract",
    contractNumber: "4400014660",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/ohio.png",
    name: "State of Ohio",
    contractType: "State IT Contract",
    contractNumber: "OA1300",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/msgov.jpg",
    name: "State of Mississippi",
    contractType: "State IT Contract",
    contractNumber: "42686",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/michigan.jpg",
    name: "State of Michigan",
    contractType: "State IT Contract",
    contractNumber: "210000000322",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/georgia.jpg",
    name: "State of Georgia",
    contractType: "State IT Contract",
    contractNumber: "99999 001 SPD0000149",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/pictures/tennessee_state_logo.png",
    name: "State of Tennessee",
    contractType: "State IT Contract",
    contractNumber: "2023-2024 TN",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/colorado.jpg",
    name: "State of Colorado",
    contractType: "State IT Contract",
    contractNumber: "2023-2024 CO-NASPO",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/ct.jpg",
    name: "State of Connecticut",
    contractType: "State IT Contract",
    contractNumber: "2023-2024 CT",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/ncgov_250X75_2.png",
    name: "State of North Carolina",
    contractType: "State IT Contract",
    contractNumber: "2023-2024 NC",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2024-03/NC-DIT-Logo.png",
    name: "Dept. of IT, NC",
    contractType: "State IT Contract",
    contractNumber: "ITS-401105-007",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/Capture_1.png",
    name: "State of South Carolina",
    contractType: "State IT Contract",
    contractNumber: "4400001394",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/logo.png",
    name: "City of Atlanta, GA",
    contractType: "IT Contract",
    contractNumber: "2023-2024 CT",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/Group%203_1.png",
    name: "State of Oregon",
    contractType: "State IT Contract",
    contractNumber: "2023-2024 OR NASPO",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/Capture_2.PNG",
    name: "Commonwealth of Virginia",
    contractType: "State IT Contract",
    contractNumber: "VA-210625-CAI",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/pictures/arapahoe_county_logo.jpeg",
    name: "Arapahoe County, CO",
    contractType: "IT Contract",
    contractNumber: "23-28",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/pictures/Awarded-Vendor-Square%5B31427%5D.png",
    name: "TIPS, TX",
    contractType: "IT Contract",
    contractNumber: "230504",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2023-10/image_2023_10_31T09_27_16_015Z.png",
    name: "State of Wyoming",
    contractType: "State IT Contract",
    contractNumber: "0008-J",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/pictures/rc-general-notag-secondary-cmyk_c.png",
    name: "Ramsey County, MN",
    contractType: "IT Contract",
    contractNumber: "RC-000506",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/pictures/600px-Seal_of_Sacramento_County%2C_California.svg.png",
    name: "County of Sacramento, CA",
    contractType: "IT Contract",
    contractNumber: "WA00045028",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2024-09/NYRA%20Logo.jpg",
    name: "NY Racing Association",
    contractType: "IT Contract",
    contractNumber: "4464",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2025-02/png-clipart-university-of-arizona-arizona-wildcats-baseball-logo-organization-brock-university-logo-blue-text_0.png",
    name: "University of Arizona",
    contractType: "IT Contract",
    contractNumber: "L302403",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2025-02/Logo%20of%20UW%20Medicine.jpg",
    name: "UW Medicine, WA",
    contractType: "IT Contract",
    contractNumber: "MSA 1420-5430",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2025-03/County%20of%20Rockland_4.jpg",
    name: "County of Rockland, NY",
    contractType: "IT Contract",
    contractNumber: "RC-023-019",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/styles/medium/public/2025-12/circle-cropped-4-300x300.png",
    name: "City of Philadelphia OIT",
    contractType: "IT Contract",
    contractNumber: "2520280",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2025-07/Seal_of_West_Virginia.svg_.png",
    name: "State of West Virginia",
    contractType: "State IT Contract",
    contractNumber: "LOT2500000011",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2025-09/State%20of%20Missouri.jpg",
    name: "State of Missouri",
    contractType: "State IT Contract",
    contractNumber: "CT242213128",
    category: "state",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2025-12/OMESLogoWeb.png",
    name: "State of Oklahoma",
    contractType: "State IT Contract",
    contractNumber: "1025",
    category: "state",
  },
  // FISA
  {
    logo: "https://sites.vgroupinc.com/files/logo%20%281%29.png",
    name: "FISA OPA, NYC",
    contractType: "IT Contract",
    contractNumber: "PIN 127FY2000053",
    category: "state",
  },
  // Beaufort / Greenville
  {
    logo: "https://sites.vgroupinc.com/files/beaufort_1.png",
    name: "Beaufort County, SC",
    contractType: "IT Contract",
    contractNumber: "IFB #20-008",
    category: "state",
  },
  {
    logo: "https://sites.vgroupinc.com/files/styles/medium/public/GCSLogo20.png",
    name: "Greenville County, SC",
    contractType: "IT Contract",
    contractNumber: "520581028",
    category: "state",
  },
  // Transportation
  {
    logo: "/assets/generated/mta-logo.dim_200x80.png",
    name: "MTA, NYC IT Consulting",
    contractType: "IT Consulting",
    contractNumber: "14357-2900",
    category: "transportation",
  },
  {
    logo: "/assets/generated/mta-logo.dim_200x80.png",
    name: "MTA, NYC Cyber Security Retainer",
    contractType: "Cyber Security",
    contractNumber: "3572",
    category: "transportation",
  },
  {
    logo: "https://sites.vgroupinc.com/files/styles/medium/public/vta%2Blogo%2B-%2Bscvta%2Bpng.png",
    name: "Santa Clara VTA, CA",
    contractType: "IT Contract",
    contractNumber: "S20128",
    category: "transportation",
  },
  {
    logo: "/assets/generated/metra-logo.dim_200x80.png",
    name: "Metra, IL",
    contractType: "IT Contract",
    contractNumber: "PA0001711",
    category: "transportation",
  },
  {
    logo: "/assets/generated/port-authority-nynj-logo.dim_200x80.png",
    name: "Port Authority NY NJ",
    contractType: "IT Contract",
    contractNumber: "402-25-030",
    category: "transportation",
  },
  // Health Benefit Exchange
  {
    logo: "/assets/generated/mhbe-logo.dim_200x80.png",
    name: "MHBE, MD",
    contractType: "HBE IT Contract",
    contractNumber: "060B2490023",
    category: "hbe",
  },
  {
    logo: "https://sites.vgroupinc.com/files/washington-healthplanfinder_0.png",
    name: "WAHBE, WA",
    contractType: "HBE IT Contract",
    contractNumber: "HBE-459",
    category: "hbe",
  },
  {
    logo: "https://sites.vgroupinc.com/files/789a8f525f07504d7b9039f9d3feb4e0.jpg",
    name: "CalOptima, CA",
    contractType: "HBE IT Contract",
    contractNumber: "23-10025",
    category: "hbe",
  },
  // Judiciary
  {
    logo: "https://sites.vgroupinc.com/files/styles/medium/public/TdkHV_W5_400x400.jpg",
    name: "AOC, MD",
    contractType: "Judiciary IT Contract",
    contractNumber: "K21-0016-29",
    category: "judiciary",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2024-09/MD%20JUD%20Logo.png",
    name: "Maryland AOC",
    contractType: "Judiciary IT Contract",
    contractNumber: "K23-0094-25L",
    category: "judiciary",
  },
  // Education
  {
    logo: "/assets/generated/atlanta-public-schools-logo.dim_200x80.png",
    name: "Atlanta Public Schools, GA",
    contractType: "Education IT Contract",
    contractNumber: "OE EGB 14090313",
    category: "education",
  },
  {
    logo: "https://sites.vgroupinc.com/files/BCPS.png",
    name: "School Board of Broward County, FL",
    contractType: "Education IT Contract",
    contractNumber: "FY23-045-035",
    category: "education",
  },
  {
    logo: "/assets/generated/fulton-county-schools-logo.dim_200x80.png",
    name: "Fulton County Schools, GA",
    contractType: "Education IT Contract",
    contractNumber: "100-24",
    category: "education",
  },
  {
    logo: "/assets/generated/seattle-public-schools-logo.dim_200x80.png",
    name: "Seattle Public Schools, WA",
    contractType: "Education IT Contract",
    contractNumber: "",
    category: "education",
  },
  {
    logo: "https://www.vgroupinc.com/web/sites/default/files/2024-05/logo.png",
    name: "Douglas County School District, CO",
    contractType: "Education IT Contract",
    contractNumber: "RFP #014-24",
    category: "education",
  },
];

function getInitials(name: string): string {
  return name
    .split(/[,\s]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const categoryColors: Record<Category, string> = {
  all: "",
  federal: "bg-blue-50 text-blue-700 border-blue-200",
  state: "bg-emerald-50 text-emerald-700 border-emerald-200",
  transportation: "bg-orange-50 text-orange-700 border-orange-200",
  hbe: "bg-purple-50 text-purple-700 border-purple-200",
  judiciary: "bg-red-50 text-red-700 border-red-200",
  education: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

const categoryLabels: Record<Category, string> = {
  all: "All",
  federal: "Federal",
  state: "State & Local",
  transportation: "Transportation",
  hbe: "Health Benefit Exchange",
  judiciary: "Judiciary",
  education: "Education",
};

export default function Clients() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const filtered =
    activeFilter === "all"
      ? contracts
      : contracts.filter((c) => c.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#87CEEB]">
      {/* Hero */}
      <section
        className="relative pt-28 pb-20 px-4 text-center overflow-hidden border-b border-gray-100"
        style={{ backgroundColor: "#87CEEB" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(10,80,200,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(10,80,200,0.03) 0%, transparent 40%)",
          }}
        />
        <div
          className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <MonogramBadge size={56} variant="dark" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <Badge
            className="mb-4 text-xs font-semibold tracking-widest uppercase border px-3 py-1"
            style={{
              backgroundColor: "rgba(10,60,110,0.06)",
              borderColor: "rgba(10,60,110,0.2)",
              color: "rgb(10,60,110)",
            }}
          >
            Public Sector Excellence
          </Badge>
          <h1
            className="text-5xl md:text-6xl font-bold mb-5 leading-tight"
            style={{
              color: "rgb(10,60,110)",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Our Clients
          </h1>
          <p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "rgb(60,90,130)" }}
          >
            Gateway Solutions, Inc. proudly serves federal agencies, state &
            local governments, transportation authorities, health exchanges,
            judiciary systems, and educational institutions across the nation —
            delivering mission-critical IT solutions with proven expertise.
          </p>
        </motion.div>
      </section>

      {/* Core Competencies */}
      <section
        className="py-16 px-4 gsi-watermark"
        style={{ backgroundColor: "#87CEEB" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{
                color: "rgb(10,60,110)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Core Competencies
            </h2>
            <p className="text-base text-muted-foreground">
              Specialized capabilities delivered across all public sector
              engagements
            </p>
          </motion.div>
          <div className="flex flex-wrap gap-3 justify-center">
            {competencies.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
                  style={{
                    backgroundColor: "white",
                    borderColor: "rgba(10,60,110,0.15)",
                    color: "rgb(10,60,110)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: "oklch(0.72 0.18 65)" }}
                  />
                  {c}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contracts */}
      <section
        className="py-16 px-4 gsi-watermark"
        style={{ backgroundColor: "#87CEEB" }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{
                color: "rgb(10,60,110)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Active Contracts &amp; Vehicles
            </h2>
            <p className="text-base text-muted-foreground">
              Awarded contracts across federal, state, and local government
              programs
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                data-ocid="clients.filter.tab"
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  activeFilter === tab.value
                    ? "text-white border-transparent"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                style={
                  activeFilter === tab.value
                    ? {
                        backgroundColor: "oklch(0.45 0.18 255)",
                        color: "white",
                      }
                    : {
                        backgroundColor: "white",
                        color: "rgb(60,90,130)",
                      }
                }
              >
                {tab.label}
                {tab.value !== "all" && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({contracts.filter((c) => c.category === tab.value).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((contract, idx) => (
              <motion.div
                key={`${contract.name}-${idx}`}
                data-ocid={`clients.item.${idx + 1}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(idx * 0.03, 0.3),
                }}
                className="group rounded-xl border p-4 flex flex-col gap-3 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
                style={{
                  backgroundColor: "white",
                  borderColor: "rgba(0,0,0,0.08)",
                }}
              >
                {/* Logo area */}
                <div
                  className="h-16 rounded-lg flex items-center justify-center p-2 flex-shrink-0"
                  style={{ backgroundColor: "oklch(0.96 0.005 250)" }}
                >
                  {imgErrors.has(idx) ? (
                    <span
                      className="text-lg font-bold"
                      style={{ color: "oklch(0.25 0.08 255)" }}
                    >
                      {getInitials(contract.name)}
                    </span>
                  ) : (
                    <img
                      src={contract.logo}
                      alt={contract.name}
                      className="max-h-12 max-w-full object-contain"
                      onError={() =>
                        setImgErrors((prev) => new Set(prev).add(idx))
                      }
                    />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col gap-1.5">
                  <p
                    className="text-sm font-semibold leading-snug"
                    style={{ color: "rgb(10,60,110)" }}
                  >
                    {contract.name}
                  </p>
                  <p
                    className="text-xs leading-snug"
                    style={{ color: "rgb(90,110,140)" }}
                  >
                    {contract.contractType}
                  </p>
                  {contract.contractNumber && (
                    <p
                      className="text-xs font-mono mt-auto pt-1"
                      style={{ color: "rgb(130,150,170)" }}
                    >
                      #{contract.contractNumber}
                    </p>
                  )}
                </div>

                {/* Category badge */}
                <div>
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded-full border font-medium ${
                      categoryColors[contract.category]
                    }`}
                  >
                    {categoryLabels[contract.category]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              data-ocid="clients.empty_state"
              className="text-center py-16"
              style={{ color: "rgb(130,150,170)" }}
            >
              No contracts found for this category.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
