import ProjectBrowser from "@/components/project-browser";
export const metadata = { title: "Projects | Sidratul Muntaha" };
export default function ProjectsPage() { return <><div className="page-intro wrap"><p className="eyebrow">PROJECTS</p><h1>Selected work.<br /><span>Real problems.</span></h1><p className="intro">Web and mobile products across financial services, transportation, and education.</p></div><section className="project-index-page wrap" aria-label="Portfolio projects"><ProjectBrowser /></section></>; }
