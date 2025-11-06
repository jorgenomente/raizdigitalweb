import { useState } from 'react';
import { 
  Zap, 
  Code, 
  Layers, 
  Box, 
  Circle,
  Square,
  Triangle,
  Home,
  User,
  Settings,
  Search,
  Bell,
  Mail,
  Heart,
  Star,
  Download,
  Upload,
  Filter,
  Menu
} from 'lucide-react';
import { RaizButton } from './components/RaizButton';
import { RaizInput } from './components/RaizInput';
import { RaizTextarea } from './components/RaizTextarea';
import { RaizCard } from './components/RaizCard';
import { RaizChip } from './components/RaizChip';
import { RaizAlert } from './components/RaizAlert';
import { RaizSwitch } from './components/RaizSwitch';
import { RaizCheckbox } from './components/RaizCheckbox';
import { RaizLoader } from './components/RaizLoader';
import { RaizModal } from './components/RaizModal';
import { RaizNavbar } from './components/RaizNavbar';
import { ColorToken } from './components/ColorToken';
import { IconExample } from './components/IconExample';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--matte-carbon)]">
      {/* Hero Section */}
      <div className="bg-gradient-primary relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-[var(--neural-cyan)] rounded-full animate-pulse-glow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-[var(--soft-magenta)] rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-accent rounded-2xl animate-pulse-glow"></div>
              <h1 className="text-gradient">Raíz Digital</h1>
            </div>
            <h2 className="text-white/90 mb-6">Design System + UI Kit</h2>
            <p className="max-w-2xl mx-auto text-[var(--silver-gray)] mb-8">
              A living digital network that expands, connects, and evolves.
              Futuristic, clean, and alive — the fusion between technology and humanity.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <RaizButton size="lg">Explore Components</RaizButton>
              <RaizButton variant="secondary" size="lg">View on GitHub</RaizButton>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* FOUNDATIONS */}
        <section id="foundations">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="text-[var(--neural-cyan)]" size={32} />
              <h2 className="text-[var(--neural-cyan)]">Foundations</h2>
            </div>
            <p className="text-[var(--silver-gray)]">
              Core design tokens that define the visual language of Raíz Digital
            </p>
          </div>

          {/* Color Palette */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Color Palette</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ColorToken 
                name="Neural Cyan" 
                value="#4FD4E4" 
                description="Primary color for buttons, active states, and accents"
              />
              <ColorToken 
                name="Deep Blue" 
                value="#0E1C26" 
                description="Background and base surfaces"
              />
              <ColorToken 
                name="Soft Magenta" 
                value="#D55FA3" 
                description="Highlights, interactions, and hover effects"
              />
              <ColorToken 
                name="Silver Gray" 
                value="#AAB7C4" 
                description="Borders, typography, and dividers"
              />
              <ColorToken 
                name="Matte Carbon" 
                value="#111418" 
                description="Main dark background"
              />
              <ColorToken 
                name="Green Cyan" 
                value="#4BE6B1" 
                description="Success states and positive feedback"
              />
              <ColorToken 
                name="Coral Tech" 
                value="#FF5C73" 
                description="Error states and alerts"
              />
            </div>
          </div>

          {/* Gradients */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Gradients</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-32 rounded-xl bg-gradient-primary mb-3 border border-[var(--neural-cyan)]/30"></div>
                <code className="text-[var(--neural-cyan)]">
                  linear-gradient(135deg, #0E1C26, #1A3342, #4FD4E4)
                </code>
              </div>
              <div>
                <div className="h-32 rounded-xl bg-gradient-accent mb-3 border border-[var(--neural-cyan)]/30"></div>
                <code className="text-[var(--neural-cyan)]">
                  linear-gradient(160deg, #D55FA3, #4FD4E4)
                </code>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Typography</h3>
            <RaizCard hoverable={false}>
              <div className="space-y-6">
                <div>
                  <h1 className="text-white mb-2">Heading 1 - Space Grotesk Bold</h1>
                  <code className="text-[var(--silver-gray)]">64px / 700 / -0.02em</code>
                </div>
                <div>
                  <h2 className="text-white mb-2">Heading 2 - Space Grotesk SemiBold</h2>
                  <code className="text-[var(--silver-gray)]">40px / 600 / -0.01em</code>
                </div>
                <div>
                  <h3 className="text-white mb-2">Heading 3 - Space Grotesk SemiBold</h3>
                  <code className="text-[var(--silver-gray)]">24px / 600</code>
                </div>
                <div>
                  <h4 className="text-white mb-2">Heading 4 - Space Grotesk SemiBold</h4>
                  <code className="text-[var(--silver-gray)]">20px / 600</code>
                </div>
                <div>
                  <p className="text-white mb-2">Body - Inter Regular</p>
                  <code className="text-[var(--silver-gray)]">18px / 400 / 1.6</code>
                </div>
                <div>
                  <p className="text-[var(--silver-gray)]">Caption text example</p>
                  <code className="text-[var(--silver-gray)]">14px / 400</code>
                </div>
                <div>
                  <code className="text-[var(--neural-cyan)]">Monospace - Geist Mono</code>
                  <p className="text-[var(--silver-gray)] mt-2">14px / 400</p>
                </div>
              </div>
            </RaizCard>
          </div>

          {/* Spacing & Grid */}
          <div>
            <h3 className="text-white mb-6">Spacing & Layout</h3>
            <RaizCard hoverable={false}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="text-[var(--silver-gray)] w-32">Base Unit:</div>
                  <code className="text-[var(--neural-cyan)]">8px</code>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[var(--silver-gray)] w-32">Grid:</div>
                  <code className="text-[var(--neural-cyan)]">12 columns</code>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[var(--silver-gray)] w-32">Border Radius:</div>
                  <code className="text-[var(--neural-cyan)]">12px</code>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-[var(--silver-gray)] w-32">Transitions:</div>
                  <code className="text-[var(--neural-cyan)]">200-400ms ease-in-out</code>
                </div>
              </div>
            </RaizCard>
          </div>
        </section>

        {/* COMPONENTS */}
        <section id="components">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Box className="text-[var(--neural-cyan)]" size={32} />
              <h2 className="text-[var(--neural-cyan)]">Components</h2>
            </div>
            <p className="text-[var(--silver-gray)]">
              Reusable UI components built with the Raíz Digital design language
            </p>
          </div>

          {/* Buttons */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Buttons</h3>
            <RaizCard hoverable={false}>
              <div className="space-y-6">
                <div>
                  <p className="text-[var(--silver-gray)] mb-3">Primary Button</p>
                  <div className="flex flex-wrap gap-3">
                    <RaizButton size="sm">Small</RaizButton>
                    <RaizButton size="md">Medium</RaizButton>
                    <RaizButton size="lg">Large</RaizButton>
                    <RaizButton disabled>Disabled</RaizButton>
                  </div>
                </div>
                <div>
                  <p className="text-[var(--silver-gray)] mb-3">Secondary Button</p>
                  <div className="flex flex-wrap gap-3">
                    <RaizButton variant="secondary" size="sm">Small</RaizButton>
                    <RaizButton variant="secondary" size="md">Medium</RaizButton>
                    <RaizButton variant="secondary" size="lg">Large</RaizButton>
                    <RaizButton variant="secondary" disabled>Disabled</RaizButton>
                  </div>
                </div>
                <div>
                  <p className="text-[var(--silver-gray)] mb-3">Ghost Button</p>
                  <div className="flex flex-wrap gap-3">
                    <RaizButton variant="ghost" size="sm">Small</RaizButton>
                    <RaizButton variant="ghost" size="md">Medium</RaizButton>
                    <RaizButton variant="ghost" size="lg">Large</RaizButton>
                    <RaizButton variant="ghost" disabled>Disabled</RaizButton>
                  </div>
                </div>
              </div>
            </RaizCard>
          </div>

          {/* Inputs */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Input Fields</h3>
            <RaizCard hoverable={false}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RaizInput 
                  label="Email Address" 
                  placeholder="you@example.com"
                  type="email"
                />
                <RaizInput 
                  label="Password" 
                  placeholder="Enter password"
                  type="password"
                />
                <RaizInput 
                  label="With Error" 
                  placeholder="Invalid input"
                  error="This field is required"
                />
                <RaizInput 
                  label="Disabled" 
                  placeholder="Disabled input"
                  disabled
                />
              </div>
              <div className="mt-6">
                <RaizTextarea 
                  label="Message" 
                  placeholder="Type your message here..."
                />
              </div>
            </RaizCard>
          </div>

          {/* Cards */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RaizCard>
                <Zap className="text-[var(--neural-cyan)] mb-3" size={32} />
                <h4 className="text-white mb-2">Lightning Fast</h4>
                <p className="text-[var(--silver-gray)]">
                  Optimized for performance and speed
                </p>
              </RaizCard>
              <RaizCard>
                <Code className="text-[var(--soft-magenta)] mb-3" size={32} />
                <h4 className="text-white mb-2">Developer First</h4>
                <p className="text-[var(--silver-gray)]">
                  Built with modern tech stack
                </p>
              </RaizCard>
              <RaizCard>
                <Layers className="text-[var(--green-cyan)] mb-3" size={32} />
                <h4 className="text-white mb-2">Modular System</h4>
                <p className="text-[var(--silver-gray)]">
                  Flexible and scalable architecture
                </p>
              </RaizCard>
            </div>
          </div>

          {/* Chips/Tags */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Chips & Tags</h3>
            <RaizCard hoverable={false}>
              <div className="flex flex-wrap gap-3">
                <RaizChip variant="default">Default</RaizChip>
                <RaizChip variant="accent">Accent</RaizChip>
                <RaizChip variant="success">Success</RaizChip>
                <RaizChip variant="error">Error</RaizChip>
                <RaizChip variant="default" onRemove={() => {}}>Removable</RaizChip>
                <RaizChip variant="accent" onRemove={() => {}}>React</RaizChip>
                <RaizChip variant="success" onRemove={() => {}}>TypeScript</RaizChip>
              </div>
            </RaizCard>
          </div>

          {/* Alerts */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Alerts</h3>
            <div className="space-y-4">
              <RaizAlert variant="info" title="Information">
                This is an informational message to keep you updated.
              </RaizAlert>
              <RaizAlert variant="success" title="Success">
                Your changes have been saved successfully!
              </RaizAlert>
              <RaizAlert variant="warning" title="Warning">
                Please review your settings before continuing.
              </RaizAlert>
              <RaizAlert variant="error" title="Error">
                Something went wrong. Please try again.
              </RaizAlert>
            </div>
          </div>

          {/* Toggles & Checkboxes */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Switches & Checkboxes</h3>
            <RaizCard hoverable={false}>
              <div className="space-y-6">
                <div>
                  <p className="text-[var(--silver-gray)] mb-3">Switches</p>
                  <div className="space-y-3">
                    <RaizSwitch 
                      label="Enable notifications" 
                      checked={switchChecked}
                      onChange={(e) => setSwitchChecked(e.target.checked)}
                    />
                    <RaizSwitch label="Dark mode" defaultChecked />
                    <RaizSwitch label="Auto-save" />
                  </div>
                </div>
                <div>
                  <p className="text-[var(--silver-gray)] mb-3">Checkboxes</p>
                  <div className="space-y-3">
                    <RaizCheckbox 
                      label="I agree to terms and conditions"
                      checked={checkboxChecked}
                      onChange={(e) => setCheckboxChecked(e.target.checked)}
                    />
                    <RaizCheckbox label="Subscribe to newsletter" />
                    <RaizCheckbox label="Remember me" defaultChecked />
                  </div>
                </div>
              </div>
            </RaizCard>
          </div>

          {/* Loader */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Loader</h3>
            <RaizCard hoverable={false}>
              <div className="flex items-center justify-center py-8">
                <RaizLoader />
              </div>
              <p className="text-center text-[var(--silver-gray)] mt-4">
                Network pulse animation
              </p>
            </RaizCard>
          </div>

          {/* Modal */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Modal</h3>
            <RaizCard hoverable={false}>
              <RaizButton onClick={() => setModalOpen(true)}>
                Open Modal
              </RaizButton>
              <RaizModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)}
                title="Example Modal"
              >
                <div className="space-y-4">
                  <p className="text-white">
                    This is a modal dialog with a cyan glow effect and backdrop blur.
                  </p>
                  <RaizInput placeholder="Enter something..." />
                  <div className="flex gap-3 justify-end">
                    <RaizButton variant="secondary" onClick={() => setModalOpen(false)}>
                      Cancel
                    </RaizButton>
                    <RaizButton onClick={() => setModalOpen(false)}>
                      Confirm
                    </RaizButton>
                  </div>
                </div>
              </RaizModal>
            </RaizCard>
          </div>
        </section>

        {/* ICONOGRAPHY */}
        <section id="iconography">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Circle className="text-[var(--neural-cyan)]" size={32} />
              <h2 className="text-[var(--neural-cyan)]">Iconography</h2>
            </div>
            <p className="text-[var(--silver-gray)]">
              Line-based icons with 2px stroke and rounded corners
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            <IconExample icon={Home} label="Home" />
            <IconExample icon={User} label="User" />
            <IconExample icon={Settings} label="Settings" />
            <IconExample icon={Search} label="Search" />
            <IconExample icon={Bell} label="Bell" />
            <IconExample icon={Mail} label="Mail" />
            <IconExample icon={Heart} label="Heart" />
            <IconExample icon={Star} label="Star" />
            <IconExample icon={Download} label="Download" />
            <IconExample icon={Upload} label="Upload" />
            <IconExample icon={Filter} label="Filter" />
            <IconExample icon={Menu} label="Menu" />
            <IconExample icon={Zap} label="Zap" />
            <IconExample icon={Code} label="Code" />
            <IconExample icon={Layers} label="Layers" />
            <IconExample icon={Box} label="Box" />
          </div>
        </section>

        {/* UI EXAMPLES */}
        <section id="examples">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Square className="text-[var(--neural-cyan)]" size={32} />
              <h2 className="text-[var(--neural-cyan)]">UI Examples</h2>
            </div>
            <p className="text-[var(--silver-gray)]">
              Real-world applications of the design system
            </p>
          </div>

          {/* Navigation Example */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Navigation</h3>
            <div className="border border-[var(--neural-cyan)]/30 rounded-xl overflow-hidden">
              <RaizNavbar />
            </div>
          </div>

          {/* Form Example */}
          <div className="mb-16">
            <h3 className="text-white mb-6">Contact Form</h3>
            <RaizCard>
              <h4 className="text-white mb-6">Get in Touch</h4>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RaizInput label="First Name" placeholder="John" />
                  <RaizInput label="Last Name" placeholder="Doe" />
                </div>
                <RaizInput label="Email" placeholder="john@example.com" type="email" />
                <RaizTextarea label="Message" placeholder="Tell us about your project..." />
                <div className="space-y-3">
                  <RaizCheckbox label="I agree to the privacy policy" />
                  <RaizCheckbox label="Send me updates about new features" />
                </div>
                <RaizButton>Send Message</RaizButton>
              </div>
            </RaizCard>
          </div>

          {/* Dashboard Cards Example */}
          <div>
            <h3 className="text-white mb-6">Dashboard Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <RaizCard>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[var(--silver-gray)]">Total Users</span>
                  <User className="text-[var(--neural-cyan)]" size={20} />
                </div>
                <div className="text-white mb-2">12,458</div>
                <div className="flex items-center gap-2">
                  <RaizChip variant="success">↑ 12.5%</RaizChip>
                </div>
              </RaizCard>
              
              <RaizCard>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[var(--silver-gray)]">Active Projects</span>
                  <Layers className="text-[var(--soft-magenta)]" size={20} />
                </div>
                <div className="text-white mb-2">847</div>
                <div className="flex items-center gap-2">
                  <RaizChip variant="success">↑ 8.2%</RaizChip>
                </div>
              </RaizCard>
              
              <RaizCard>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[var(--silver-gray)]">Revenue</span>
                  <Zap className="text-[var(--green-cyan)]" size={20} />
                </div>
                <div className="text-white mb-2">$94,230</div>
                <div className="flex items-center gap-2">
                  <RaizChip variant="success">↑ 24.1%</RaizChip>
                </div>
              </RaizCard>
              
              <RaizCard>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[var(--silver-gray)]">Conversion</span>
                  <Settings className="text-[var(--neural-cyan)]" size={20} />
                </div>
                <div className="text-white mb-2">3.24%</div>
                <div className="flex items-center gap-2">
                  <RaizChip variant="error">↓ 1.8%</RaizChip>
                </div>
              </RaizCard>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-[var(--deep-blue)] border-t border-[var(--neural-cyan)]/30 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-accent rounded-xl"></div>
              <span className="text-gradient">Raíz Digital</span>
            </div>
            <p className="text-[var(--silver-gray)]">
              A living system that breathes, connects, and evolves.
            </p>
            <div className="flex items-center gap-4">
              <RaizButton variant="ghost" size="sm">Documentation</RaizButton>
              <RaizButton variant="ghost" size="sm">GitHub</RaizButton>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
