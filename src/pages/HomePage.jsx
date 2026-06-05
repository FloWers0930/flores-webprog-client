import Button from "../Components/Button";

const features = [
  {
    tag: "Design",
    title: "Intuitive Layouts",
    description:
      "Smartly structured interfaces that drive clarity, efficiency, and engagement across every platform.",
    image:
      "https://cdn.dribbble.com/userupload/44712879/file/a9dbd808b2215a0c4e2bff39174d1dfe.png?resize=1504x1128&vertical=center",
  },
  {
    tag: "Components",
    title: "Reusable Modules",
    description:
      "Highly scalable components that maintain consistency and speed up development cycles.",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
  },
  {
    tag: "Workflow",
    title: "Rapid Prototyping",
    description:
      "Transform ideas into interactive prototypes with minimal friction and maximum impact.",
    image:
      "https://public-images.interaction-design.org/tags/td-prototyping-02.webp",
  },
];

function KpiCard({ number, label }) {
  return (
    <div className="border-[1.5px] border-[#4a5c4a] rounded-md p-5 bg-white hover:shadow-[4px_4px_0px_0px_rgba(74,92,74,1)] transition-shadow duration-200">
      <div className="font-[Syne] text-[28px] font-extrabold leading-none mb-1.5 text-[#4a5c4a]">
        {number}
      </div>
      <div className="text-[10px] font-medium tracking-[0.14em] uppercase text-[#8a9a8a]">
        {label}
      </div>
    </div>
  );
}

function FeatureCard({ tag, title, description, image }) {
  return (
    <article className="group border-[1.5px] border-[#4a5c4a] rounded-md bg-white overflow-hidden flex flex-col h-full hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(74,92,74,1)] transition-all duration-200">
      <div className="h-[180px] overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-[#4a5c4a]/0 group-hover:bg-[#4a5c4a]/5 transition-colors duration-200" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[9px] font-semibold tracking-[0.16em] uppercase text-[#8a9a8a] mb-2">
          {tag}
        </p>
        <h3 className="font-[Syne] text-[15px] font-bold mb-2 text-[#4a5c4a] group-hover:text-[#6b7b6b] transition-colors">
          {title}
        </h3>
        <p className="text-[12.5px] leading-relaxed text-[#6b7b6b] flex-1">
          {description}
        </p>
        <div className="mt-4 pt-4 border-t border-[#c5d0c5] flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] uppercase text-[#8a9a8a] group-hover:text-[#4a5c4a] transition-colors">
          Learn More{" "}
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </div>
      </div>
    </article>
  );
}

function HomePage() {
  return (
    <main className="w-full bg-[#f8f9f5]">
      {/* Hero */}
      <section className="border-b-[1.5px] border-[#4a5c4a] py-16 px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1400px] mx-auto">
          <div>
            <h1 className="font-[Syne] text-[52px] lg:text-[64px] font-extrabold leading-[1.05] tracking-tight mb-6 text-[#4a5c4a]">
              Elevate <span className="text-[#8a9a8a]">Your Interfaces</span>
            </h1>
            <p className="text-base leading-relaxed text-[#6b7b6b] max-w-[480px] mb-8">
              Professional-grade UI systems designed for startups, enterprises,
              and ambitious teams seeking clarity, speed, and scalability in
              every project.
            </p>
            <div className="flex gap-3">
              <button className="font-['DM_Sans'] text-[11px] font-semibold tracking-[0.12em] uppercase px-5 py-2.5 bg-[#4a5c4a] text-white border-[1.5px] border-[#4a5c4a] rounded-full cursor-pointer transition-all duration-200 hover:bg-[#f8f9f5] hover:text-[#4a5c4a]">
                Get Started
              </button>
              <button className="px-5 py-2.5 border-[1.5px] border-[#4a5c4a] rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase text-[#4a5c4a] hover:bg-[#4a5c4a] hover:text-white transition-colors">
                View Portfolio
              </button>
            </div>
          </div>

          <div className="relative aspect-[16/10] rounded-lg overflow-hidden border-[1.5px] border-[#4a5c4a]">
            <img
              src="https://wallpapersok.com/images/high/a-professional-business-workspace-jsfw4k7qst552ktt.webp"
              alt="Professional UI Workspace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* KPI */}
      <section className="border-b-[1.5px] border-[#4a5c4a] py-16 px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-[Syne] text-xl font-bold text-[#4a5c4a]">
                Our Impact
              </h2>
            </div>
            <span className="text-[10px] text-[#8a9a8a] tracking-[0.1em] uppercase">
              Latest Metrics
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <KpiCard number="120+" label="Projects Delivered" />
            <KpiCard number="35" label="Clients Served" />
            <KpiCard number="480" label="Screens Designed" />
            <KpiCard number="12" label="UI Systems" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-[Syne] text-xl font-bold text-[#4a5c4a]">
                Core Features
              </h2>
            </div>
            <button className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#8a9a8a] hover:text-[#4a5c4a] transition-colors flex items-center gap-1">
              Explore All <span>→</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
