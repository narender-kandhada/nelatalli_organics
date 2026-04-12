import React from 'react';
import { 
  LifeBuoy, 
  MessageCircle, 
  FileText, 
  ExternalLink, 
  Search,
  ChevronRight,
  Mail,
  Phone,
  Clock
} from 'lucide-react';

export function SupportScreen() {
  const faqs = [
    { q: "How do I update inventory levels?", a: "Navigate to the Inventory module, select the product, and use the 'Edit' action to update stock quantities." },
    { q: "Can I export order reports?", a: "Yes, go to the Analytics module or Settings > Data to export your order history in JSON or CSV formats." },
    { q: "How to handle customer refunds?", a: "In the Orders module, find the specific order and update the payment status to 'Refunded'. This will trigger the internal accounting flow." },
    { q: "Is there a mobile app for admins?", a: "The Nelatalli portal is fully responsive. You can access all features by logging in through your mobile browser." },
  ];

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="bg-primary rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-serif text-3xl font-bold mb-4">How can we help you today?</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or FAQs..." 
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
            />
          </div>
        </div>
        <LifeBuoy className="absolute -right-8 -bottom-8 text-white/5 w-64 h-64 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Cards */}
        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
            <MessageCircle size={24} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-primary">Live Chat</h3>
            <p className="text-xs text-on-surface-variant font-medium">Average response time: 5 mins</p>
          </div>
          <button className="w-full bg-primary text-white py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-all">
            Start Chat
          </button>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-tertiary-container flex items-center justify-center text-white">
            <Mail size={24} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-primary">Email Support</h3>
            <p className="text-xs text-on-surface-variant font-medium">Response within 24 hours</p>
          </div>
          <button className="w-full bg-surface-container text-primary py-2.5 rounded-lg text-sm font-bold border border-outline-variant/15 hover:bg-surface-container-high transition-all">
            Send Email
          </button>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
            <Phone size={24} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-primary">Phone Support</h3>
            <p className="text-xs text-on-surface-variant font-medium">Mon-Fri, 9am - 6pm IST</p>
          </div>
          <button className="w-full bg-surface-container text-primary py-2.5 rounded-lg text-sm font-bold border border-outline-variant/15 hover:bg-surface-container-high transition-all">
            Call Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FAQs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-primary">Frequently Asked Questions</h3>
            <button className="text-secondary text-sm font-bold hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group bg-surface-container-lowest border border-outline-variant/15 rounded-xl overflow-hidden">
                <summary className="p-4 flex items-center justify-between cursor-pointer hover:bg-surface-container-low transition-colors list-none">
                  <span className="text-sm font-bold text-primary">{faq.q}</span>
                  <ChevronRight size={16} className="text-on-surface-variant group-open:rotate-90 transition-transform" />
                </summary>
                <div className="p-4 pt-0 text-xs text-on-surface-variant font-medium leading-relaxed border-t border-outline-variant/5">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-6">
          <h3 className="font-serif text-xl font-bold text-primary">Helpful Resources</h3>
          <div className="space-y-3">
            {[
              { title: 'Admin User Manual', type: 'PDF Guide', icon: FileText },
              { title: 'Inventory Best Practices', type: 'Article', icon: ExternalLink },
              { title: 'Organic Certification Guide', type: 'Document', icon: FileText },
              { title: 'Portal Video Tutorials', type: 'Video Series', icon: ExternalLink },
            ].map((resource, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant/15 rounded-xl hover:border-secondary transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
                    <resource.icon size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-primary">{resource.title}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{resource.type}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-stone-300 group-hover:text-secondary" />
              </button>
            ))}
          </div>

          <div className="p-6 bg-secondary-container/30 rounded-2xl border border-secondary/10 flex items-center gap-4">
            <Clock className="text-secondary" size={32} />
            <div>
              <p className="text-sm font-bold text-primary">System Status</p>
              <p className="text-xs text-secondary font-bold">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
