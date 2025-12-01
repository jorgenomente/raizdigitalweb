import svgPaths from "./svg-2rk13gqsah";

function Container() {
  return <div className="absolute bg-white h-[56px] left-0 opacity-0 top-0 w-[228.586px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="absolute h-[24px] left-[32px] top-[16px] w-[136.586px]" data-name="Text">
      <p className="absolute font-['Space_Grotesk:Medium',sans-serif] font-medium leading-[24px] left-[68.5px] text-[#0a0e1a] text-[16px] text-center text-nowrap top-0 translate-x-[-50%] whitespace-pre">Explorar servicios</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[176.59px] size-[20px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, #0A0E1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1ae0b780} id="Vector_2" stroke="var(--stroke-0, #0A0E1A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

export default function Button() {
  return (
    <div className="overflow-clip relative rounded-[1.67772e+07px] shadow-[0px_0px_30px_0px_rgba(34,211,238,0.3),0px_0px_60px_0px_rgba(168,85,247,0.2)] size-full" data-name="Button">
      <Container />
      <Text />
      <Icon />
    </div>
  );
}