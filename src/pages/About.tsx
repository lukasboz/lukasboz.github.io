import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const About = () => {
  const skills = [
    "JavaScript/TypeScript", "C/C++", "React", "Node.js", "Python", 
    "Google Cloud", "Docker", "Git", "MongoDB", "Scikit-learn", "Java", "OpenCV", "Qt", "PostgreSQL", "Flask"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 animate-fade-in">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-scale-in">
              Hi, I'm{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Lukas Bozinov
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
              A passionate software developer crafting digital solutions that make a difference. 
              I specialize in full-stack development with a focus on modern technologies.
            </p>
            <div className="flex gap-4 justify-center animate-fade-in [animation-delay:400ms]">
              <Button size="lg" className="shadow-glow hover:scale-105 transition-transform duration-200">
                <Link to="/projects" rel="noopener noreferrer">
                  View My Work
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="hover:scale-105 transition-transform duration-200">
                <a href="https://github.com/lukasboz/lukasboz/blob/main/lukas-resume.pdf" target="_blank" rel="noopener noreferrer">
                      View Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in [animation-delay:200ms]">
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                As a computer science student (currently on co-op), I've had the opportunity to contribute to a range of real-world projects, 
                from computer-vision tools to AI platforms. While my academic background provides a strong foundation, the hands-on experience 
                I've gained while working on these projects has been the most valuable part of my learning journey.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I believe in writing clean, maintainable code and staying current with the latest 
                technologies. When I'm not coding, you'll find me contributing to open source 
                projects or coming up with fresh ideas on what to make next!
              </p>
            </div>
            
            <Card className="p-8 shadow-elegant animate-fade-in [animation-delay:400ms] hover:shadow-glow transition-all duration-300">
              <h3 className="text-xl font-semibold mb-6">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="px-3 py-1 hover:scale-105 transition-transform duration-200"
                    style={{ animationDelay: `${600 + index * 50}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Experience</h2>
          
          <div className="space-y-8">
            <Card className="p-6 shadow-elegant animate-fade-in [animation-delay:200ms] hover:shadow-glow hover:scale-[1.02] transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">QA Automation Engineer (Co-op)</h3>
                  <p className="text-primary">J.D. Power</p>
                </div>
                <Badge variant="outline">May 2025 - Present</Badge>
              </div>
              <p className="text-muted-foreground">
                Developed and maintained end-to-end automated test scripts for web and mobile dashboards using Playwright with TypeScript, 
                improving test reliability and scalability. Integrated test suites with GitLab CI/CD pipelines and Xray for nightly regression 
                and faster release cycles. Implemented Allure reporting and custom logging, boosting defect traceability by 30%. Collaborated 
                cross-functionally using Jira and XRAY to define test requirements, plan sprints, and ensure comprehensive workflow coverage.
              </p>
            </Card>

            <Card className="p-6 shadow-elegant animate-fade-in [animation-delay:400ms] hover:shadow-glow hover:scale-[1.02] transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Vice President - Projects</h3>
                  <p className="text-primary">Computer Science Undergraduate Society (Western Univ.)</p>
                </div>
                <Badge variant="outline">Oct. 2024 - Present</Badge>
              </div>
              <p className="text-muted-foreground">
                Led a team of developers building the backend of a university messaging system for courses and clubs. 
                Managed PostgreSQL databases for secure storage and reporting. 
                Developed lightweight Flask APIs with OAuth 2.0 integration for robust authentication and rapid deployment.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;