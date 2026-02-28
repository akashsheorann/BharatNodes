import { Pricing2 } from "./ui/pricing2"

const demoData = {
  heading: "VPS Hosting Plans",
  description: "High-performance infrastructure designed to scale with your ambition.",
  plans: [
    {
      id: "plus",
      name: "Starter",
      description: "Launch your vision with lightning-fast NVMe storage and dedicated compute power.",
      monthlyPrice: "$9",
      yearlyPrice: "$7",
      features: [
        { text: "Blazing Fast 2 vCPU Cores" },
        { text: "High-Speed 4GB RAM" },
        { text: "Ultra-Responsive 80GB NVMe" },
        { text: "Generous 2TB Bandwidth" },
      ],
      button: {
        text: "Get Started",
        url: "#",
      },
    },
    {
      id: "pro",
      name: "Enterprise",
      description: "Scale without limits. Mission-critical reliability for high-traffic global applications.",
      monthlyPrice: "$29",
      yearlyPrice: "$24",
      features: [
        { text: "Massive 8 vCPU Compute" },
        { text: "Vast 16GB Performance RAM" },
        { text: "Expansive 320GB Enterprise NVMe" },
        { text: "Unrestricted 10TB Transfer" },
      ],
      button: {
        text: "Deploy Now",
        url: "#",
      },
    },
  ],
};

function Pricing2Demo() {
  return <Pricing2 {...demoData} />;
}

export { Pricing2Demo };
