import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 animate-fade-in">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-scale-in">
            Let's <span className="bg-gradient-primary bg-clip-text text-transparent">Connect</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            Have a project in mind or just want to chat about technology? 
            I'd love to hear from you. Let's discuss how we can work together.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in [animation-delay:400ms]">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you're looking for a developer to join your team, need help with a project, 
                  or just want to connect with a fellow developer, I'm always open to new opportunities 
                  and conversations.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <Card className="p-4 shadow-elegant hover:shadow-glow hover:scale-[1.02] transition-all duration-300 animate-fade-in [animation-delay:600ms]">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Mail className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-muted-foreground">lukasbozinov@gmail.com</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 shadow-elegant hover:shadow-glow hover:scale-[1.02] transition-all duration-300 animate-fade-in [animation-delay:700ms]">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Phone className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">(Provided upon request)</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 shadow-elegant hover:shadow-glow hover:scale-[1.02] transition-all duration-300 animate-fade-in [animation-delay:800ms]">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <MapPin className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-muted-foreground">Toronto, Canada</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social Links */}
              <div className="animate-fade-in [animation-delay:900ms]">
                <h3 className="text-lg font-semibold mb-4">Connect With Me</h3>
                <div className="flex gap-4">
                  <Button asChild variant="outline" size="icon">
                    <a href="https://github.com/lukasboz" target="_blank" rel="noopener noreferrer">
                      <Github size={20} />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" className="hover:shadow-glow hover:scale-110 transition-all duration-200">
                    <a href="https://www.linkedin.com/in/lukas-bozinov-b52479244/" target="_blank" rel="noopener noreferrer">
                      <Linkedin size={20} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8 shadow-elegant animate-fade-in [animation-delay:500ms] hover:shadow-glow transition-all duration-300">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

              <form
                action="https://formspree.io/f/meozgozk" // 🔁 Replace with your actual Formspree URL
                method="POST"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      placeholder="John"
                      required
                      className="mt-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      placeholder="Doe"
                      required
                      className="mt-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="john.doe@example.com"
                    required
                    className="mt-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject"
                    placeholder="Project Discussion"
                    required
                    className="mt-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    placeholder="Tell me about your project or just say hello..."
                    required
                    className="mt-2 min-h-[120px] focus:ring-primary focus:border-primary transition-colors duration-200"
                  />
                </div>

                {/* Optional: Honeypot for spam */}
                <input type="text" name="_gotcha" style={{ display: "none" }} />

                {/* Optional: redirect URL after submission */}
                <input type="hidden" name="_redirect" value="https://yourdomain.com/thank-you" />

                <Button type="submit" size="lg" className="w-full shadow-glow hover:scale-[1.02] transition-all duration-200">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional CTA */}
      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4 animate-fade-in">Ready to Start a Project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto animate-fade-in [animation-delay:200ms]">
            I'm currently available for freelance work and open to discussing 
            full-time opportunities. Let's build something great together.
          </p>
          <div className="flex gap-4 justify-center animate-fade-in [animation-delay:400ms]">
            <Button size="lg" className="shadow-glow hover:scale-105 transition-transform duration-200">
              <a href="/projects" rel="noopener noreferrer">
                    View My Work
              </a>
            </Button>
            <Button variant="outline" size="lg" className="hover:scale-105 transition-transform duration-200">
              <a href="https://github.com/lukasboz/lukasboz/blob/main/lukas-resume.pdf" target="_blank" rel="noopener noreferrer">
                    View Resume
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
