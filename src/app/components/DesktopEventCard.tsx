import { motion } from "framer-motion";
import { EventCardData } from "../data/events";
import svgPaths from "../../imports/Frame1/svg-45i862k53t";

interface DesktopEventCardProps extends EventCardData {
  left?: number;
  top?: number;
  delay?: number;
  isMobile?: boolean;
}

export default function DesktopEventCard({
  title, sub, desc, date, time, venue, teamSize, fee, prize, image, link, left, top, delay, isMobile
}: DesktopEventCardProps) {
  const positioning = isMobile || (left === undefined && top === undefined) ? "relative" : "absolute";
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: delay || 0 }}
      className={`${positioning} h-[273px] w-[430px] transition-all duration-500 hover:scale-[1.05] hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(0,255,255,0.4)] hover:z-50 cursor-pointer overflow-hidden group`}
      style={positioning === "absolute" ? { left, top } : {}}
    >
      <div className="absolute h-[273px] left-0 top-0 w-[430px]">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 430 273">
          <path d={svgPaths.p2045e480} fill="var(--fill-0, #090914)" fillOpacity="0.2" id="Rectangle 24" />
        </svg>
      </div>

      <div className="absolute h-[245px] left-[13px] pointer-events-none top-[14px] w-[196px] overflow-hidden">
        <img loading="lazy" decoding="async" alt={title} className="absolute inset-0 max-w-none object-cover size-full transition-transform duration-700 group-hover:scale-110" src={image} />
        <div aria-hidden className="absolute border border-black border-solid inset-0" />
      </div>

      <p className="absolute font-['Orbitron',sans-serif] h-[22px] leading-[normal] left-[225px] not-italic text-[13px] text-white top-[24px] w-[192px] truncate">{title}</p>
      <p className="absolute font-['Orbitron',sans-serif] h-[9px] leading-[normal] left-[225px] not-italic text-[7px] text-[#00FFFF] top-[46px] w-[192px] truncate">{sub}</p>
      
      <p className="absolute font-['Inter',sans-serif] text-[10px] text-gray-300 left-[225px] top-[60px] w-[192px] h-[30px] overflow-hidden leading-tight line-clamp-2">{desc}</p>
      
      <div className="absolute font-['Orbitron',sans-serif] font-normal leading-[0] left-[225px] text-[10px] text-white top-[102px] w-[192px]">
        <p className="mb-0 leading-[14px]">📅 {date}</p>
      </div>
      <div className="absolute font-['Orbitron',sans-serif] font-normal leading-[0] left-[225px] text-[10px] text-white top-[118px] w-[192px]">
        <p className="mb-0 leading-[14px]">⏰ {time}</p>
      </div>
      <div className="absolute font-['Orbitron',sans-serif] font-normal leading-[0] left-[225px] text-[10px] text-white top-[134px] w-[192px]">
        <p className="mb-0 leading-[14px]">📍 {venue}</p>
      </div>

      <div className="absolute font-['Orbitron',sans-serif] font-normal leading-[0] left-[225px] text-[10px] text-[#ef8ff6] top-[154px] w-[192px]">
        <p className="mb-0 leading-[14px]">💰 {fee}</p>
      </div>
      <div className="absolute font-['Orbitron',sans-serif] font-normal leading-[0] left-[225px] text-[10px] text-white top-[170px] w-[192px]">
        <p className="mb-0 leading-[14px]">🏆 Prize: {prize}</p>
      </div>
      {teamSize && (
        <div className="absolute font-['Orbitron',sans-serif] font-normal leading-[0] left-[225px] text-[10px] text-white top-[186px] w-[192px]">
          <p className="mb-0 leading-[14px]">👥 Team Size: {teamSize}</p>
        </div>
      )}

      <a href={link} target="_blank" rel="noopener noreferrer" className="absolute flex items-center justify-center bg-[rgba(42,35,110,0.3)] h-[34px] left-[225px] rounded-[51px] top-[215px] w-[185px] hover:bg-[rgba(239,143,246,0.3)] transition-colors border border-transparent hover:border-[rgba(239,143,246,0.5)] z-20 pointer-events-auto">
        <p className="font-['Orbitron',sans-serif] leading-[normal] m-0 not-italic text-[12px] text-center text-white pointer-events-none">REGISTER NOW</p>
      </a>
    </motion.div>
  );
}
