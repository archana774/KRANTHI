import imgJurassicSparks from "../../assets/events/jurassic-sparks.jpg";
import imgBreakingCode from "../../assets/breaking_code.jpg";
import imgBidToBuild from "../../assets/events/civil.jpeg";
import imgChem from "../../assets/events/chem.jpeg";
import imgCircuitSprint from "../../assets/events/circuit-sprint.jpg";
import imgCircuitSafari from "../../assets/events/circuit-safari.jpg";
import imgAlumni from "../../assets/events/alumni.jpg";
import imgCodeRelay from "../../assets/events/code-relay.png";
import imgVertexa from "../../assets/events/vertexa.jpg";

export interface EventCardData {
  title: string;
  sub: string;
  desc: string;
  date: string;
  time: string;
  venue: string;
  teamSize?: string;
  fee: string;
  prize: string;
  image: string;
  link: string;
}

export const eventCards: EventCardData[] = [
  {
    title: "JURASSIC SPARKS",
    sub: "-BY ECE FORUM",
    desc: "Think fast. Build smart. Jurassic Sparks is an exciting circuit challenge to showcase your technical skills!",
    date: "July 20, 2026",
    time: "TBA",
    venue: "ECE Department",
    teamSize: undefined,
    fee: "Free Registration",
    prize: "₹1,500",
    image: imgJurassicSparks,
    link: "https://forms.gle/mhEFdYK5fUqobBSz8",
  },
  {
    title: "BREAKING CODE",
    sub: "-BY CSE X CHE FORUM",
    desc: "Crack the logic and solve complex puzzles. A coding competition designed to test your algorithmic problem-solving.",
    date: "July 21, 2026",
    time: "4:30 PM",
    venue: "Annexe 102A",
    fee: "Free (GECTians) | ₹30 (Others)",
    prize: "₹1,500",
    image: imgBreakingCode,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSerRUkpzcMHdH9Unh4FEF2nzXdRjzPhYlauxXOnFW0YGRXS5g/viewform",
  },
  {
    title: "BID TO BUILD",
    sub: "-BY CIVIL FORUM",
    desc: "Put your estimation skills to the test. Compete to build the most efficient structure with limited resources.",
    date: "July 21, 2026",
    time: "4:30 PM",
    venue: "Classroom C6",
    fee: "Free (GECTians) | ₹30 (Others)",
    prize: "TBA",
    image: imgBidToBuild,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSdxI-0bHepIEL_oORglxVc8ol6qX-Reko6_oz6A--CJavNbzw/viewform?usp=header",
  },
  {
    title: "DISTILL & CONQUER",
    sub: "-BY CHEMICAL FORUM",
    desc: "Dive into chemical mysteries. A thrilling competition challenging your knowledge in chemical processes and logic.",
    date: "July 22, 2026",
    time: "4:30 PM",
    venue: "Venue TBA",
    fee: "Free (GECTians) | ₹30 (Others)",
    prize: "₹1,500",
    image: imgChem,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfE7bvQHeY2I8KCIcm796uGVA5Ln8nn-hmd11M0uHquls2v8A/viewform?usp=dialog",
  },
  {
    title: "CIRCUIT SPRINT",
    sub: "-BY CPS FORUM",
    desc: "NOW STREAMING: LIVE CODE",
    date: "July 23, 2026",
    time: "4:30 PM",
    venue: "SDPK Hall, EC Dept",
    fee: "Free (GECTians) | ₹30 (Others)",
    prize: "₹1,500",
    image: imgCircuitSprint,
    link: "https://forms.gle/Tq6XswHkdtk8TeRT6",
  },
  {
    title: "CIRCUIT SAFARI",
    sub: "-BY EEE FORUM",
    desc: "Navigate through exciting circuit challenges and electrifying puzzles.",
    date: "23rd & 24th July, 2026",
    time: "4:30 PM",
    venue: "EEE Dept",
    fee: "Free (GECTians) | ₹30 (Others)",
    prize: "₹1,500",
    image: imgCircuitSafari,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSd1mkcrq9abeMLmSzn3GtuVqgSVE1IbdulA6V5lDiXrrZStLA/viewform?usp=dialog",
  },
  {
    title: "MEET YOUR ALUMNI",
    sub: "-BY ISTE GECT INTERNSHIP CELL",
    desc: "Interactive session with Shiva Duth M G (Former Engineer at MRF and HPCL).",
    date: "July 25, 2026",
    time: "7:00 PM",
    venue: "Online mode",
    fee: "Free (GECTians) | ₹30 (Others)",
    prize: "N/A",
    image: imgAlumni,
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfK5uKcXJqiCx_jbYLN3BDh2k_1E_Hmn6EBztyKHrsw35Pmsg/viewform?usp=publish-editor",
  },
  {
    title: "CODE RELAY",
    sub: "-BY CSE FORUM",
    desc: "A relay-style programming challenge testing your logic and speed.",
    date: "27th July 2026",
    time: "4:30 pm",
    venue: "Annexe 102A",
    fee: "Free (GECTians) | ₹30 (Others)",
    prize: "₹1,500",
    image: imgCodeRelay,
    link: "https://forms.gle/zAbjMftysbkSmHtRA",
  },
  {
    title: "VERTEXA",
    sub: "-BY MECH FORUM",
    desc: "THINK. ARGUE. DESIGN. BUILD. Debate & Design Dilemma.",
    date: "27th & 28th July",
    time: "4:30 pm",
    venue: "105, ME Dept / 109, Main",
    fee: "Free (GECTians) | ₹30 (Others)",
    prize: "₹1,500",
    image: imgVertexa,
    link: "https://forms.gle/hsAiwaDmk4vUYUa28",
  }
];
