import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "AI Chef",
      description: "An AI-powered meal planning app. Analyzes grocery purchase data and expiry patterns to generate optimized  meal plans, reduce food waste, and save users time and money.",
      technologies: ["Python", "Scikit-learn", "SciPy", "NumPy/Pandas", "Matplotlib"],
      liveUrl: "#",
      githubUrl: "https://github.com/lukasboz/AI-Chef",
      featured: false
    },
    {
      title: "Math Duels",
      description: "A real-time multiplayer math game. Players compete to solve math challenges in a fast-paced environment, with real-time scoring and interactive UI. Designed to help users improve their math skills through gameplay.",
      technologies: ["React", "TypeScript", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "#",
      githubUrl: "https://github.com/lukasboz/math-duels",
      featured: true
    },
    {
      title: "Solace.AI",
      description: "An AI journal that assists you in your everyday life, with real-time conversations and memory to learn from your actions, and help you better prepare for each new day. From hopes and dreams to realized goals.",
      technologies: ["React", "Next.js", "RAG Model", "Clerk", "Python", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/lukasboz/Solace-AI",
      featured: true
    },
    {
      title: "Facial Recognition Security System",
      description: "A real-time facial recognition app built with C++, OpenCV, and Qt5. Includes face detection, profile management, and a secure admin panel for managing users and retraining the model.",
      technologies: ["OpenCV", "C++", "Qt", "MySQL"],
      liveUrl: "#",
      githubUrl: "https://github.com/lukasboz/OpenCV-Face-RCGN",
      featured: false
    },
    {
      title: "MoneyGenerator",
      description: "An all-in-one solution that leverages local LLMs, APIs, and scripts to fully automate the creation and publishing of vertical video content. Includes features for content generation, editing, and distribution across multiple platforms.",
      technologies: ["Python", "Moviepy", "GPT4Free", "YouTube API", "Twitter API", "Graph API"],
      liveUrl: "#",
      githubUrl: "https://github.com/lukasboz/MoneyGenerator",
      featured: false
    },
    {
      title: "YouTube-To-MP3 Converter",
      description: "A YouTube-To-MP3 Converter that allows you to convert any video, legally, from YouTube (or any YouTube-like platform) with no restrictions on video length or other metadata.",
      technologies: ["Python", "Pytube", "CustomTkinter", "FFmpeg"],
      liveUrl: "#",
      githubUrl: "https://github.com/lukasboz/YouTube-To-MP3",
      featured: false
    }
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 animate-fade-in">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-scale-in">
            My <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            A collection of projects that showcase my skills and passion for creating 
            innovative solutions. Each project represents a unique challenge and learning experience.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 animate-fade-in [animation-delay:400ms]">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card 
                key={index} 
                className="p-6 shadow-elegant hover:shadow-glow hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${600 + index * 200}ms` }}
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <Badge className="bg-primary/20 text-primary border-primary/30">Featured</Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs hover:scale-105 transition-transform duration-200">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {/*<Button size="sm" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                    <ExternalLink size={16} />
                    Live Demo
                  </Button>*/}
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                      <Github size={16} />
                      Code
                    </Button>
                  </a>

                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="py-12 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 animate-fade-in [animation-delay:200ms]">Other Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card 
                key={index} 
                className="p-4 shadow-elegant hover:shadow-lg hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {project.description}
                  </p>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs px-2 py-0 hover:scale-105 transition-transform duration-200">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs px-2 py-0">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {/*<Button size="sm" variant="outline" className="flex items-center gap-1 text-xs px-3 hover:scale-105 transition-transform duration-200">
                    <ExternalLink size={12} />
                    Demo
                  </Button>*/}
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                      <Github size={16} />
                      Code
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 animate-fade-in">Interested in Working Together?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            I'm always open to discussing new opportunities and interesting projects. 
            Let's connect and see how we can create something amazing together.
          </p>
          <a href="./contact" rel="noopener noreferrer">
            <Button size="lg" className="shadow-glow hover:scale-105 transition-transform duration-200 animate-fade-in [animation-delay:400ms]">
              Get In Touch
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Projects;
