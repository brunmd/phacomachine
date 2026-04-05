import { useState, useEffect, useRef } from "react";

const DEVICE_IMG = "/images/black1.png";


/* ── Theme ── */
const themes = {
  light: { bg:"#FFF",bgA:"#EFF3F8",bgC:"rgba(255,255,255,0.82)",tx:"#091525",txS:"#18263E",txM:"#38506E",ac:"#1565A8",acD:"#0D4A7A",acS:"rgba(21,101,168,0.08)",bd:"#C8D5E2",bdL:"#DEE6EE",ro:"#B87A90",hero:"linear-gradient(170deg,#F4F7FB 0%,#FFF 45%,#EEF3F9 100%)",sh:"0 2px 8px rgba(0,0,0,0.04),0 16px 48px rgba(0,0,0,0.06)",nav:"rgba(255,255,255,0.88)",glow:"rgba(21,101,168,0.06)" },
  dark: { bg:"#0A1120",bgA:"#0E1830",bgC:"rgba(16,28,48,0.75)",tx:"#E4ECF4",txS:"#B8CAD8",txM:"#6E88A4",ac:"#5CAEF0",acD:"#8ECAF9",acS:"rgba(92,174,240,0.1)",bd:"#1C3050",bdL:"#152440",ro:"#D4A0B0",hero:"linear-gradient(170deg,#060C18 0%,#0A1120 45%,#0E1830 100%)",sh:"0 2px 8px rgba(0,0,0,0.25),0 16px 48px rgba(0,0,0,0.35)",nav:"rgba(10,17,32,0.9)",glow:"rgba(92,174,240,0.05)" },
};

const SF = "'Source Serif 4',Georgia,serif";
const UF = "'DM Sans',system-ui,sans-serif";

/* ── i18n ── */
const i18n = {
  pt: {
    badge:"Primeiro Phaco Wireless do Mundo",
    h1a:"N\u00e3o \u00e9 uma evolu\u00e7\u00e3o.",h1b:"\u00c9 uma revolu\u00e7\u00e3o.",
    heroP:"O Sophi redefiniu o que um sistema de facoemulsifica\u00e7\u00e3o pode ser. Sem cabos. Sem tubos. Tr\u00eas bombas independentes. Controle sinusoidal. Engenharia su\u00ed\u00e7a a servi\u00e7o da cirurgia de catarata.",
    btn1:"Explorar Modelos",btn2:"Dados T\u00e9cnicos",
    nav:["Modelos","Tecnologia","Especifica\u00e7\u00f5es"],
    stats:[["70 kg","Peso (sem bateria)"],["20+","Cirurgias por carga"],["38\u201341 kHz","Frequ\u00eancia"],["650 mmHg","V\u00e1cuo m\u00e1ximo"]],
    intT:"Tela de 19 polegadas com toque intuitivo",
    intP:"Display IPS rotat\u00f3rio de 180\u00b0 com informa\u00e7\u00f5es claras. At\u00e9 50 perfis de cirurgi\u00f5es e 150 configura\u00e7\u00f5es. Assist\u00eancia sensorial por voz (Text2Speech) e proje\u00e7\u00e3o LED.",
    intTabs:[["PHACO 1/2/3","Presets de faco"],["I/A","Irriga\u00e7\u00e3o e aspira\u00e7\u00e3o"],["VIT","Vitrectomia anterior"],["DIA","Diatermia bipolar"]],
    pilT:"Tr\u00eas pilares. Uma vis\u00e3o.",
    pils:[
      {t:"Mobilidade",d:"Primeiro wireless do mundo. Sem cabo de energia, sem tubos pneum\u00e1ticos. Pedal Bluetooth com carregamento indutivo. Bateria para at\u00e9 20 cirurgias. Compressor integrado."},
      {t:"Simplicidade",d:"Display rotat\u00f3rio de 180\u00b0, bandeja posicion\u00e1vel. Cassete Slot-In autom\u00e1tico com Express-Priming. At\u00e9 50 cirurgi\u00f5es e 150 configura\u00e7\u00f5es. Assist\u00eancia sensorial."},
      {t:"Seguran\u00e7a",d:"Clean Venturi com membrana selante patenteada. IOP Control Pump dedicada \u00e0 infus\u00e3o. Freio mono-brake. Multi Sensor System no cassete."}
    ],
    modT:"Escolha a configura\u00e7\u00e3o ideal",
    prods:[
      {nm:"Sophi Premium",tag:"COMPLETO",desc:"Modelo topo de linha com Triple Pump. Tr\u00eas bombas independentes: IOP Control Pump para infus\u00e3o ativa, perist\u00e1ltica para aspira\u00e7\u00e3o por fluxo e Clean Venturi com membrana selante patenteada.",pumps:["IOP Control Pump","Perist\u00e1ltica","Clean Venturi"],feats:["Triple Pump Fluidics","Efficient Sinus Phaco","Vitrectomia Pneum\u00e1tica","Diatermia Bipolar","Wireless Completo","Sensory Assistance"],top:true},
      {nm:"Sophi Eco",tag:"OTIMIZADO",desc:"Vers\u00e3o sem Clean Venturi. Mant\u00e9m IOP Control Pump para infus\u00e3o ativa e perist\u00e1ltica. Ideal para investimento otimizado.",pumps:["IOP Control Pump","Perist\u00e1ltica"],feats:["Dual Pump Fluidics","Efficient Sinus Phaco","Vitrectomia Pneum\u00e1tica","Diatermia Bipolar","Wireless Completo","Sensory Assistance"],top:false},
      {nm:"Sophi A",tag:"COMPACTO",desc:"Modelo A (Anterior) compacto. IOP Control Pump e perist\u00e1ltica. Controle sinusoidal e qualidade su\u00ed\u00e7a com footprint reduzido.",pumps:["IOP Control Pump","Perist\u00e1ltica"],feats:["Active IOP Control","Efficient Sinus Phaco","Vitrectomia Pneum\u00e1tica","Diatermia Bipolar","Compressor Integrado","Design Compacto"],top:false}
    ],
    cmpH:"Recurso",cmpL:"Comparativo",pmpL:"Bombas",
    cmpR:[["IOP Control Pump",1,1,1],["Bomba Perist\u00e1ltica",1,1,1],["Clean Venturi",1,0,0],["Sinus Phaco",1,1,1],["Vitrectomia Anterior",1,1,1],["Diatermia Bipolar",1,1,1],["Wireless Completo",1,1,1],["Triple Pump",1,0,0]],
    techT:"Tecnologia por dentro",
    tc:[
      {t:"Triple Pump Fluidics",p:"Tr\u00eas bombas independentes. IOP Control Pump mant\u00e9m press\u00e3o de infus\u00e3o est\u00e1vel. Perist\u00e1ltica controla fluxo e v\u00e1cuo. Clean Venturi com membrana selante patenteada.",rows:[["IOP Control Pump","Infus\u00e3o ativa","Perist\u00e1ltica dedicada"],["Perist\u00e1ltica","Aspira\u00e7\u00e3o por fluxo","0\u201360 ml/min | 0\u2013650 mmHg"],["Clean Venturi","Aspira\u00e7\u00e3o por v\u00e1cuo","Membrana selante | Rise 0\u201310s"]]},
      {t:"Efficient Sinus Phaco",p:"Cristais piezoel\u00e9tricos controlados por sinal sinusoidal. Menos calor, prote\u00e7\u00e3o ao endot\u00e9lio e incis\u00e3o.",sp:[["Frequ\u00eancia","38\u201341 kHz"],["Pot\u00eancia","25W (\u00b15W)"],["Stroke","0\u201390 \u00b5m"],["Modos","Cont\u00ednuo, Pulse, Burst"]]},
      {t:"Wireless e Conectividade",p:"\u00danico sistema totalmente sem fio. Pedal Bluetooth LE. Microsc\u00f3pio via Wi-Fi.",cn:[["Bluetooth LE","Pedal wireless"],["Wi-Fi","V\u00eddeo-Inlay"],["NFC","Configura\u00e7\u00e3o r\u00e1pida"],["CAN-Bus","Backup cabeado"]]},
      {t:"Autonomia e Energia",p:"Duas baterias (4,5 kg). At\u00e9 20 cirurgias/carga. Opera\u00e7\u00e3o cont\u00ednua com cabo. Pedal: at\u00e9 50 cirurgias.",vl:[["Dispositivo","At\u00e9 20 cirurgias/carga"],["Pedal","At\u00e9 50 cirurgias/carga"],["Tens\u00e3o","100\u2013240 VAC"],["Consumo","250/500 VA"]]}
    ],
    specT:"Especifica\u00e7\u00f5es Completas",
    secs:[
      {t:"Facoemulsifica\u00e7\u00e3o",r:[["Handpiece","Piezoel\u00e9trico"],["Frequ\u00eancia","38 a 41 kHz"],["Onda","Sinusoidal"],["Pot\u00eancia","25W (\u00b15W) a 1100 \u03a9"],["Stroke","0 a 90 \u00b5m (\u00b120%)"],["Modula\u00e7\u00e3o","Cont\u00ednuo, Pulse, Burst"]]},
      {t:"Irriga\u00e7\u00e3o",r:[["Gravidade","Poste autom\u00e1tico"],["Ativa","IOP Control Pump"]]},
      {t:"Aspira\u00e7\u00e3o",r:[["Perist\u00e1ltica","0\u201360 ml/min, 0\u2013650 mmHg"],["Clean Venturi","0\u2013650 mmHg, rise 0\u201310s"],["Refluxo","15 ml/min"],["Seguran\u00e7a","Membrana selante"]]},
      {t:"Diatermia",r:[["Tipo","Coagula\u00e7\u00e3o bipolar"],["Frequ\u00eancia","500 kHz"],["Pot\u00eancia","0\u201310W a 50 \u03a9"]]},
      {t:"Vitrectomia",r:[["Cutter","Guilhotina 23G"],["Corte","30\u20132.000 cpm"],["Compressor","Integrado"],["Press\u00e3o","25 PSI"]]},
      {t:"Pedal",r:[["Tipo","Wireless dual linear"],["Bateria","At\u00e9 50 cirurgias"],["Peso","5,0 kg"]]},
      {t:"Dimens\u00f5es",r:[["Aparelho","59\u00d749\u00d7164 cm"],["Peso","70 kg (sem bateria)"],["Baterias","2\u00d7 4,5 kg"],["Total","~79 kg"]]},
      {t:"Interface",r:[["Tela","19\u2033 TFT IPS LED"],["Rota\u00e7\u00e3o","180\u00b0"],["Perfis","At\u00e9 50"],["Presets","At\u00e9 150"]]},
      {t:"El\u00e9trica",r:[["Tens\u00e3o","100\u2013240 VAC"],["Consumo","250/500 VA"],["Fus\u00edveis","2\u00d7 8A, 250V"]]}
    ],
    footL:["Fabricante","Distribui\u00e7\u00e3o","Registro"],footC:"Heerbrugg, Su\u00ed\u00e7a",footN:"Sophi e Rayner s\u00e3o marcas registradas do Rayner Group."
  },
  en: {
    badge:"World\u2019s First Wireless Phaco System",
    h1a:"Not an evolution.",h1b:"A revolution.",
    heroP:"Sophi has redefined what a phacoemulsification system can be. No cables. No tubes. Three independent pumps. Sinusoidal control. Swiss engineering for cataract surgery.",
    btn1:"Explore Models",btn2:"Technical Data",
    nav:["Models","Technology","Specifications"],
    stats:[["70 kg","Weight (no battery)"],["20+","Surgeries per charge"],["38\u201341 kHz","Frequency"],["650 mmHg","Max vacuum"]],
    intT:"19-inch intuitive touchscreen",
    intP:"180\u00b0 rotatable IPS display. Up to 50 surgeon profiles and 150 settings. Voice (Text2Speech) and LED sensory assistance.",
    intTabs:[["PHACO 1/2/3","Phaco presets"],["I/A","Irrigation & aspiration"],["VIT","Anterior vitrectomy"],["DIA","Bipolar diathermy"]],
    pilT:"Three pillars. One vision.",
    pils:[
      {t:"Mobility",d:"World\u2019s first wireless system. No power cable, no pneumatic tubes. Bluetooth pedal with inductive charging. Battery for up to 20 surgeries. Integrated compressor."},
      {t:"Simplicity",d:"180\u00b0 rotatable display, tray on both sides. Automatic Slot-In cassette. Up to 50 surgeons and 150 settings. Voice and LED sensory assistance."},
      {t:"Safety",d:"Clean Venturi with patented sealing membrane. Dedicated IOP Control Pump for infusion. Centralized mono-brake. Multi Sensor System in cassette."}
    ],
    modT:"Choose the ideal configuration",
    prods:[
      {nm:"Sophi Premium",tag:"FULL",desc:"Top-of-the-line with complete Triple Pump. Three independent pumps: IOP Control Pump for active infusion, peristaltic for flow aspiration, Clean Venturi with patented sealing membrane.",pumps:["IOP Control Pump","Peristaltic","Clean Venturi"],feats:["Triple Pump Fluidics","Efficient Sinus Phaco","Pneumatic Vitrectomy","Bipolar Diathermy","Full Wireless","Sensory Assistance"],top:true},
      {nm:"Sophi Eco",tag:"OPTIMIZED",desc:"Version without Clean Venturi. Retains IOP Control Pump and peristaltic for aspiration. Ideal for optimized investment.",pumps:["IOP Control Pump","Peristaltic"],feats:["Dual Pump Fluidics","Efficient Sinus Phaco","Pneumatic Vitrectomy","Bipolar Diathermy","Full Wireless","Sensory Assistance"],top:false},
      {nm:"Sophi A",tag:"COMPACT",desc:"A (Anterior) model in compact format. IOP Control Pump and peristaltic. Same sinusoidal control, Swiss quality, reduced footprint.",pumps:["IOP Control Pump","Peristaltic"],feats:["Active IOP Control","Efficient Sinus Phaco","Pneumatic Vitrectomy","Bipolar Diathermy","Integrated Compressor","Compact Design"],top:false}
    ],
    cmpH:"Feature",cmpL:"Comparison",pmpL:"Pumps",
    cmpR:[["IOP Control Pump",1,1,1],["Peristaltic Pump",1,1,1],["Clean Venturi",1,0,0],["Sinus Phaco",1,1,1],["Anterior Vitrectomy",1,1,1],["Bipolar Diathermy",1,1,1],["Full Wireless",1,1,1],["Triple Pump",1,0,0]],
    techT:"Technology inside",
    tc:[
      {t:"Triple Pump Fluidics",p:"Three independent pumps. IOP Control Pump maintains stable infusion. Peristaltic controls flow and vacuum. Clean Venturi with patented sealing membrane.",rows:[["IOP Control Pump","Active infusion","Dedicated peristaltic"],["Peristaltic","Flow aspiration","0\u201360 ml/min | 0\u2013650 mmHg"],["Clean Venturi","Vacuum aspiration","Sealing membrane | Rise 0\u201310s"]]},
      {t:"Efficient Sinus Phaco",p:"Piezoelectric crystals controlled by sinusoidal signal. Less heat, endothelium and incision protection.",sp:[["Frequency","38\u201341 kHz"],["Power","25W (\u00b15W)"],["Stroke","0\u201390 \u00b5m"],["Modes","Continuous, Pulse, Burst"]]},
      {t:"Wireless & Connectivity",p:"Only fully wireless phaco system. Bluetooth LE pedal. Microscope via Wi-Fi.",cn:[["Bluetooth LE","Wireless pedal"],["Wi-Fi","Video-Inlay"],["NFC","Quick setup"],["CAN-Bus","Wired backup"]]},
      {t:"Battery & Power",p:"Two batteries (4.5 kg each). Up to 20 surgeries/charge. Continuous with cable. Pedal: up to 50 surgeries.",vl:[["Device","Up to 20 surgeries/charge"],["Pedal","Up to 50 surgeries/charge"],["Voltage","100\u2013240 VAC"],["Consumption","250/500 VA"]]}
    ],
    specT:"Full Specifications",
    secs:[
      {t:"Phacoemulsification",r:[["Handpiece","Piezoelectric"],["Frequency","38 to 41 kHz"],["Waveform","Sinusoidal"],["Power","25W (\u00b15W) at 1100 \u03a9"],["Stroke","0 to 90 \u00b5m (\u00b120%)"],["Modulation","Continuous, Pulse, Burst"]]},
      {t:"Irrigation",r:[["Gravity","Automatic pole"],["Active","IOP Control Pump"]]},
      {t:"Aspiration",r:[["Peristaltic","0\u201360 ml/min, 0\u2013650 mmHg"],["Clean Venturi","0\u2013650 mmHg, rise 0\u201310s"],["Reflux","15 ml/min"],["Safety","Sealing membrane"]]},
      {t:"Diathermy",r:[["Type","Bipolar coagulation"],["Frequency","500 kHz"],["Power","0\u201310W at 50 \u03a9"]]},
      {t:"Vitrectomy",r:[["Cutter","Guillotine 23G"],["Rate","30\u20132,000 cpm"],["Compressor","Integrated"],["Pressure","25 PSI"]]},
      {t:"Foot Pedal",r:[["Type","Wireless dual linear"],["Battery","Up to 50 surgeries"],["Weight","5.0 kg"]]},
      {t:"Dimensions",r:[["Device","59\u00d749\u00d7164 cm"],["Weight","70 kg (no battery)"],["Batteries","2\u00d7 4.5 kg"],["Total","~79 kg"]]},
      {t:"Interface",r:[["Screen","19\u2033 TFT IPS LED"],["Rotation","180\u00b0"],["Profiles","Up to 50"],["Presets","Up to 150"]]},
      {t:"Electrical",r:[["Voltage","100\u2013240 VAC"],["Power","250/500 VA"],["Fuses","2\u00d7 8A, 250V"]]}
    ],
    footL:["Manufacturer","Distribution","Registration"],footC:"Heerbrugg, Switzerland",footN:"Sophi and Rayner are registered trademarks of the Rayner Group."
  }
};

/* ── Scroll reveal ── */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0) scale(1)" : "translateY(48px) scale(0.98)",
      transition: "opacity 0.7s cubic-bezier(.16,1,.3,1) " + delay + "s, transform 0.9s cubic-bezier(.34,1.56,.64,1) " + delay + "s",
      willChange: "opacity, transform",
      ...style
    }}>
      {children}
    </div>
  );
}

/* ── Accordion ── */
function Accordion({ title, children, t, open: defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid " + t.bdL, overflow: "hidden" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between",
          alignItems: "center", padding: "20px 0", background: "none",
          border: "none", cursor: "pointer", fontFamily: SF,
          fontSize: 16, fontWeight: 700, color: t.tx,
          transition: "color 0.25s ease"
        }}
        onMouseEnter={e => e.currentTarget.style.color = t.ac}
        onMouseLeave={e => e.currentTarget.style.color = t.tx}
      >
        {title}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.5s cubic-bezier(.34,1.56,.64,1)",
            transformOrigin: "center center",
            willChange: "transform"
          }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div style={{
        maxHeight: isOpen ? 2000 : 0,
        opacity: isOpen ? 1 : 0,
        overflow: "hidden",
        transformOrigin: "top",
        transition: "max-height 0.5s cubic-bezier(.16,1,.3,1), opacity 0.4s cubic-bezier(.16,1,.3,1)"
      }}>
        <div style={{
          paddingBottom: 20,
          transform: isOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "transform 0.5s cubic-bezier(.34,1.56,.64,1)"
        }}>{children}</div>
      </div>
    </div>
  );
}

/* ── Spec Table ── */
function SpecTable({ rows, t }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, fontFamily: SF }}>
      <tbody>
        {rows.map(([label, value], i) => (
          <tr key={i} style={{ borderBottom: "1px solid " + t.bdL }}>
            <td style={{ padding: "11px 14px 11px 0", color: t.txM, fontWeight: 600, width: "42%" }}>{label}</td>
            <td style={{ padding: "11px 0", color: t.tx, fontWeight: 500 }}>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ── Main ── */
export default function App() {
  const [mode, setMode] = useState("light");
  const [activeModel, setActiveModel] = useState(0);
  const [lang, setLang] = useState("pt");

  const t = themes[mode];
  const l = i18n[lang];
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const shadow3d = mode === "light"
    ? "2px 2px 0 " + t.bd + ", 4px 4px 0 " + t.bdL
    : "2px 2px 0 " + t.bd + "44, 4px 4px 0 " + t.bdL + "22";

  return (
    <div style={{ background: t.bg, color: t.tx, fontFamily: SF, transition: "background 0.6s, color 0.5s", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500;8..60,600;8..60,700;8..60,800;8..60,900&display=swap" rel="stylesheet" />

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999, background: t.nav, backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid " + t.bd + "22", transition: "all 0.5s" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <span style={{ fontFamily: UF, fontSize: 34, fontWeight: 800, color: t.ac, letterSpacing: "-0.04em" }}>sophi</span>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {[["modelos", l.nav[0]], ["tecnologia", l.nav[1]], ["specs", l.nav[2]]].map(([id, lb]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ background: "none", border: "none", color: t.txM, fontSize: 13, cursor: "pointer", fontFamily: UF, fontWeight: 700, transition: "color 0.2s ease, transform 0.2s ease", position: "relative" }}
                onMouseEnter={e => { e.target.style.color = t.ac; e.target.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.target.style.color = t.txM; e.target.style.transform = ""; }}>{lb}</button>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 8, borderLeft: "1px solid " + t.bd, paddingLeft: 20 }}>
              <span style={{ fontSize: 11, color: t.txM, fontWeight: 700, fontFamily: UF, letterSpacing: "0.06em" }}>Lang</span>
              <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", border: "1px solid " + t.bd }}>
                <button onClick={() => setLang("pt")} style={{ padding: "5px 12px", border: "none", background: lang === "pt" ? t.ac : "transparent", color: lang === "pt" ? "#FFF" : t.txM, fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: UF, transition: "all 0.3s" }}>PT</button>
                <button onClick={() => setLang("en")} style={{ padding: "5px 12px", border: "none", background: lang === "en" ? t.ac : "transparent", color: lang === "en" ? "#FFF" : t.txM, fontSize: 12, fontWeight: 800, cursor: "pointer", fontFamily: UF, transition: "all 0.3s" }}>EN</button>
              </div>
            </div>
            <button onClick={() => setMode(mode === "light" ? "dark" : "light")} style={{ width: 50, height: 28, borderRadius: 14, border: "2px solid " + t.bd, background: mode === "dark" ? t.ac : t.bgA, cursor: "pointer", position: "relative", transition: "all 0.35s", padding: 0 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: mode === "dark" ? "#FFF" : t.ac, position: "absolute", top: 2, left: mode === "dark" ? 24 : 2, transition: "all 0.4s cubic-bezier(.34,1.56,.64,1)", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "80px 32px 40px", background: t.hero, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "15%", right: "-5%", width: 700, height: 700, borderRadius: "50%", background: t.glow, filter: "blur(120px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
          <Reveal delay={0.05}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <span style={{ display: "inline-block", padding: "10px 28px", borderRadius: 28, background: t.acS, color: t.ac, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: UF, border: "1px solid " + t.ac + "22", boxShadow: "0 4px 20px " + t.ac + "18, 0 8px 32px rgba(0,0,0,0.04)" }}>{l.badge}</span>
            </div>
            <h1 style={{ fontFamily: SF, fontSize: "clamp(42px,5.5vw,72px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.03em", color: t.tx, margin: "0 0 28px" }}>
              {l.h1a} <span style={{ color: t.ac, display: "block", marginTop: 4 }}>{l.h1b}</span>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.8, color: t.txS, maxWidth: 520, margin: "0 0 44px" }}>{l.heroP}</p>
            <div style={{ display: "flex", gap: 14 }}>
              <button onClick={() => scrollTo("modelos")} style={{ padding: "16px 38px", borderRadius: 10, background: "linear-gradient(135deg," + t.ac + "," + t.acD + ")", color: "#FFF", border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: UF, boxShadow: "0 6px 20px " + t.ac + "44", transition: "transform 0.25s cubic-bezier(.16,1,.3,1), box-shadow 0.25s ease", willChange: "transform" }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-3px) scale(1.02)"; e.target.style.boxShadow = "0 10px 28px " + t.ac + "55"; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 6px 20px " + t.ac + "44"; }}
                onMouseDown={e => e.target.style.transform = "translateY(0) scale(0.97)"}
                onMouseUp={e => e.target.style.transform = "translateY(-3px) scale(1.02)"}>{l.btn1}</button>
              <button onClick={() => scrollTo("specs")} style={{ padding: "16px 38px", borderRadius: 10, background: "transparent", color: t.tx, border: "2px solid " + t.bd, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: UF, transition: "all 0.25s cubic-bezier(.16,1,.3,1)", willChange: "transform" }}
                onMouseEnter={e => { e.target.style.borderColor = t.ac; e.target.style.color = t.ac; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.borderColor = t.bd; e.target.style.color = t.tx; e.target.style.transform = ""; }}
                onMouseDown={e => e.target.style.transform = "scale(0.97)"}
                onMouseUp={e => e.target.style.transform = "translateY(-2px)"}>{l.btn2}</button>
            </div>
          </Reveal>
          <Reveal delay={0.15} style={{ display: "flex", justifyContent: "center" }}>
            <img src={DEVICE_IMG} alt="Sophi" style={{ maxHeight: "85vh", width: "auto", maxWidth: "100%", mixBlendMode: mode === "light" ? "multiply" : "normal", filter: mode === "dark" ? "brightness(1.05)" : "drop-shadow(0 24px 64px rgba(0,0,0,0.1))", animation: "heroFloat 7s ease-in-out infinite" }} />
          </Reveal>
        </div>
        <style>{"@keyframes heroFloat{0%,100%{transform:translateY(0) rotate(0deg)}25%{transform:translateY(-10px) rotate(0.3deg)}50%{transform:translateY(-18px) rotate(0deg)}75%{transform:translateY(-8px) rotate(-0.3deg)}}"}</style>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: t.bgA, borderTop: "1px solid " + t.bd, borderBottom: "1px solid " + t.bd }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {l.stats.map(([val, label], i) => (
            <Reveal key={i + lang} delay={i * 0.1} style={{ padding: "36px 20px", textAlign: "center", borderRight: i < 3 ? "1px solid " + t.bdL : "none" }}>
              <div style={{ fontFamily: SF, fontSize: 34, fontWeight: 800, color: t.ac }}>{val}</div>
              <div style={{ fontSize: 12, color: t.txM, marginTop: 8, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700, fontFamily: UF }}>{label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── DISPLAY ── */}
      <section style={{ padding: "100px 32px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <Reveal delay={0.1}>
            <h2 style={{ fontFamily: SF, fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, margin: "0 0 20px", color: t.tx }}>{l.intT}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: t.txM, margin: "0 0 28px" }}>{l.intP}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {l.intTabs.map(([k, v], i) => (
                <div key={i} style={{ background: t.acS, borderRadius: 10, padding: "14px 16px", border: "1px solid " + t.ac + "15", cursor: "default", transition: "all 0.35s cubic-bezier(.34,1.56,.64,1)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 24px " + t.ac + "12"; e.currentTarget.style.borderColor = t.ac + "33"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = t.ac + "15"; }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: t.ac, fontFamily: UF }}>{k}</div>
                  <div style={{ fontSize: 13, color: t.txM, marginTop: 4 }}>{v}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25} style={{ borderRadius: 16, overflow: "hidden" }}>
          </Reveal>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section style={{ padding: "100px 32px", background: t.bgA }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily: SF, fontSize: "clamp(32px,4.5vw,54px)", fontWeight: 900, margin: "0 0 48px", color: t.tx, textAlign: "center", textShadow: shadow3d }}>{l.pilT}</h2>
          </Reveal>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            {l.pils.map((p, i) => (
              <Reveal key={i + lang} delay={i * 0.1}>
                <Accordion title={p.t} t={t} open={i === 0}>
                  <p style={{ fontSize: 15, lineHeight: 1.85, color: t.txM, margin: 0, paddingLeft: 4 }}>{p.d}</p>
                </Accordion>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODELS ── */}
      <section id="modelos" style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <h2 style={{ fontFamily: SF, fontSize: "clamp(32px,4.5vw,54px)", fontWeight: 900, margin: "0 0 48px", color: t.tx, textAlign: "center", textShadow: shadow3d }}>{l.modT}</h2>
          </Reveal>
          <div style={{ display: "flex", gap: 6, marginBottom: 36, background: t.bgC, backdropFilter: "blur(20px)", borderRadius: 14, padding: 6, border: "1px solid " + t.bd, width: "fit-content", margin: "0 auto 36px" }}>
            {l.prods.map((p, i) => (
              <button key={i} onClick={() => setActiveModel(i)} style={{ padding: "14px 30px", borderRadius: 10, border: "none", background: activeModel === i ? "linear-gradient(135deg," + t.ac + "," + t.acD + ")" : "transparent", color: activeModel === i ? "#FFF" : t.txM, fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: UF, transition: "all 0.35s cubic-bezier(.34,1.56,.64,1)", position: "relative", transform: activeModel === i ? "scale(1)" : "scale(1)" }}
                onMouseDown={e => e.target.style.transform = "scale(0.95)"}
                onMouseUp={e => e.target.style.transform = "scale(1)"}>
                {p.nm}
                {p.top && <span style={{ position: "absolute", top: -10, right: -6, fontSize: 9, background: t.ro, color: "#FFF", padding: "3px 10px", borderRadius: 10, fontWeight: 800, fontFamily: UF }}>Top</span>}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <div style={{ background: t.bgC, backdropFilter: "blur(20px)", border: "1px solid " + t.bd, borderRadius: 16, boxShadow: t.sh, padding: 40 }}>
              <div key={activeModel + lang} style={{ animation: "fadeSlide 0.4s ease" }}>
                <span style={{ fontSize: 11, color: t.ac, letterSpacing: "0.1em", fontWeight: 800, padding: "6px 16px", background: t.acS, borderRadius: 8, fontFamily: UF }}>{l.prods[activeModel].tag}</span>
                <h3 style={{ fontFamily: SF, fontSize: 36, fontWeight: 800, margin: "24px 0 20px", color: t.tx }}>{l.prods[activeModel].nm}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: t.txM, margin: "0 0 28px" }}>{l.prods[activeModel].desc}</p>
                <p style={{ fontSize: 11, color: t.txM, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 800, marginBottom: 12, fontFamily: UF }}>{l.pmpL}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                  {l.prods[activeModel].pumps.map((pump, i) => (
                    <span key={i} style={{ padding: "9px 18px", borderRadius: 8, background: t.acS, color: t.ac, fontSize: 13, fontWeight: 700, fontFamily: UF }}>{pump}</span>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {l.prods[activeModel].feats.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: t.tx, fontWeight: 600 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: t.ac, flexShrink: 0 }} />{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ background: t.bgC, backdropFilter: "blur(20px)", border: "1px solid " + t.bd, borderRadius: 16, boxShadow: t.sh, padding: 36 }}>
              <p style={{ fontSize: 11, color: t.txM, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 800, marginBottom: 24, fontFamily: UF }}>{l.cmpL}</p>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, fontFamily: SF }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid " + t.bd }}>
                    <th style={{ textAlign: "left", padding: "14px 8px", color: t.txM, fontWeight: 700 }}>{l.cmpH}</th>
                    {l.prods.map((p, j) => (
                      <th key={j} style={{ textAlign: "center", padding: "14px 8px", color: j === activeModel ? t.ac : t.txM, fontWeight: 800, transition: "color 0.3s" }}>{p.nm.replace("Sophi ", "")}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {l.cmpR.map(([feat, a, b, c], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid " + t.bdL, transition: "background 0.2s ease" }}
                      onMouseEnter={e => e.currentTarget.style.background = t.acS}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <td style={{ padding: "12px 8px", fontWeight: 600 }}>{feat}</td>
                      {[a, b, c].map((v, j) => (
                        <td key={j} style={{ textAlign: "center", padding: "12px 8px" }}>
                          {v ? <span style={{ color: "#22C55E", fontWeight: 900 }}>{String.fromCharCode(10003)}</span> : <span style={{ color: t.txM + "55" }}>{String.fromCharCode(8212)}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <style>{"@keyframes fadeSlide{0%{opacity:0;transform:translateX(-16px) scale(0.98)}100%{opacity:1;transform:none}}"}</style>
      </section>

      {/* ── TECH ── */}
      <section id="tecnologia" style={{ padding: "100px 32px", background: t.bgA }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontFamily: SF, fontSize: "clamp(30px,4vw,48px)", fontWeight: 800, margin: "0 0 56px", color: t.tx, textAlign: "center" }}>{l.techT}</h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Triple Pump */}
            <Reveal delay={0.1}>
              <div style={{ background: t.bgC, backdropFilter: "blur(20px)", border: "1px solid " + t.bd, borderRadius: 16, boxShadow: t.sh, padding: 36 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 16px" }}>{l.tc[0].t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: t.txM, margin: "0 0 20px" }}>{l.tc[0].p}</p>
                <div style={{ background: t.bgA, borderRadius: 12, padding: 20, border: "1px solid " + t.bdL }}>
                  {l.tc[0].rows.map(([n, r, d], i) => (
                    <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: i < 2 ? "1px solid " + t.bdL : "none" }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.ac, marginTop: 6, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>{n} <span style={{ fontWeight: 500, color: t.txM }}>{r}</span></div>
                        <div style={{ fontSize: 13, color: t.txM, marginTop: 3 }}>{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            {/* Sinus */}
            <Reveal delay={0.2}>
              <div style={{ background: t.bgC, backdropFilter: "blur(20px)", border: "1px solid " + t.bd, borderRadius: 16, boxShadow: t.sh, padding: 36 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 16px" }}>{l.tc[1].t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: t.txM, margin: "0 0 20px" }}>{l.tc[1].p}</p>
                <div style={{ background: t.bgA, borderRadius: 12, padding: 20, border: "1px solid " + t.bdL }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 16 }}>
                    <div>
                      <p style={{ fontSize: 11, color: t.ac, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 800, marginBottom: 10, fontFamily: UF }}>Sinusoidal (Sophi)</p>
                      <svg viewBox="0 0 200 50" style={{ width: "100%", height: 50 }}>
                        <path d="M0,25 Q25,0 50,25 Q75,50 100,25 Q125,0 150,25 Q175,50 200,25" fill="none" stroke={t.ac} strokeWidth="3" strokeLinecap="round">
                          <animate attributeName="stroke-dasharray" from="0 400" to="400 0" dur="2s" fill="freeze" />
                        </path>
                      </svg>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: t.ro, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 800, marginBottom: 10, fontFamily: UF }}>{lang === "pt" ? "Quadrada" : "Square"}</p>
                      <svg viewBox="0 0 200 50" style={{ width: "100%", height: 50 }}>
                        <path d="M0,40 L0,10 L40,10 L40,40 L80,40 L80,10 L120,10 L120,40 L160,40 L160,10 L200,10" fill="none" stroke={t.ro} strokeWidth="3">
                          <animate attributeName="stroke-dasharray" from="0 600" to="600 0" dur="2s" fill="freeze" />
                        </path>
                      </svg>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 13 }}>
                    {l.tc[1].sp.map(([lb, vl], i) => (
                      <div key={i} style={{ color: t.txM, fontWeight: 600 }}>{lb}: <span style={{ color: t.tx, fontWeight: 700 }}>{vl}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            {/* Wireless */}
            <Reveal delay={0.1}>
              <div style={{ background: t.bgC, backdropFilter: "blur(20px)", border: "1px solid " + t.bd, borderRadius: 16, boxShadow: t.sh, padding: 36 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 16px" }}>{l.tc[2].t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: t.txM, margin: "0 0 20px" }}>{l.tc[2].p}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {l.tc[2].cn.map(([k, v], i) => (
                    <div key={i} style={{ background: t.bgA, borderRadius: 10, padding: "14px 16px", border: "1px solid " + t.bdL }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: t.ac, fontFamily: UF }}>{k}</div>
                      <div style={{ fontSize: 13, color: t.txM, marginTop: 4 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            {/* Battery */}
            <Reveal delay={0.2}>
              <div style={{ background: t.bgC, backdropFilter: "blur(20px)", border: "1px solid " + t.bd, borderRadius: 16, boxShadow: t.sh, padding: 36 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 16px" }}>{l.tc[3].t}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.9, color: t.txM, margin: "0 0 20px" }}>{l.tc[3].p}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {l.tc[3].vl.map(([lb, vl], i) => (
                    <div key={i} style={{ background: t.bgA, borderRadius: 10, padding: "14px 16px", border: "1px solid " + t.bdL }}>
                      <div style={{ fontSize: 11, color: t.txM, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 800, fontFamily: UF }}>{lb}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: t.tx, marginTop: 4 }}>{vl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section id="specs" style={{ padding: "100px 32px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal><h2 style={{ fontFamily: SF, fontSize: "clamp(30px,4vw,48px)", fontWeight: 800, margin: "0 0 44px", color: t.tx, textAlign: "center" }}>{l.specT}</h2></Reveal>
          <div style={{ background: t.bgC, backdropFilter: "blur(20px)", border: "1px solid " + t.bd, borderRadius: 16, boxShadow: t.sh, padding: "8px 36px" }}>
            {l.secs.map((sec, i) => (
              <Accordion key={i + lang} title={sec.t} t={t}>
                <SpecTable t={t} rows={sec.r} />
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <section style={{ padding: "60px 32px", borderTop: "1px solid " + t.bd, background: t.bgA }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 48, marginBottom: 28, flexWrap: "wrap" }}>
            {[[l.footL[0], "This AG", l.footC], [l.footL[1], "Rayner", "Worthing, UK"], [l.footL[2], "1401-8300-006-07", "EC 2024-184"]].map(([lb, n, s], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 48 }}>
                {i > 0 && <div style={{ width: 1, height: 48, background: t.bd }} />}
                <div>
                  <p style={{ fontSize: 11, color: t.txM, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 800, marginBottom: 6, fontFamily: UF }}>{lb}</p>
                  <p style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{n}</p>
                  <p style={{ fontSize: 14, color: t.txM, margin: "4px 0 0" }}>{s}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: t.txM }}>{"sophi.info | rayner.com/sophi | " + l.footN}</p>
        </div>
      </section>

      <style>{`@media(max-width:960px){section>div>div[style*="1fr 1fr"],section>div[style*="1fr 1fr"]{grid-template-columns:1fr!important}}@media(max-width:700px){section>div>div[style*="repeat(3"],section>div[style*="repeat(3"],section>div[style*="repeat(4"]{grid-template-columns:1fr!important}}*{box-sizing:border-box}body{margin:0;padding:0}@media(prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;transition-duration:0.01ms!important}}button{-webkit-tap-highlight-color:transparent}`}</style>
    </div>
  );
}
