import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import content from '../../data/content.js';
import Section from '../layout/Section.jsx';
import Button from '../ui/Button.jsx';
import SocialLinks from '../ui/SocialLinks.jsx';

// TODO(owner): replace with your real Formspree form id to enable in-page submit.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your-form-id';

export default function Contact() {
  const { profile } = content;
  const usingFormspree = !FORMSPREE_ENDPOINT.includes('your-form-id');

  function handleSubmit(e) {
    if (usingFormspree) return; // native POST to Formspree
    e.preventDefault();
    const data = new FormData(e.target);
    const subject = encodeURIComponent(`Portfolio contact from ${data.get('name')}`);
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <Section id="contact">
      <div className="mb-12">
        <h2 className="font-display text-4xl font-bold sm:text-5xl">
          Have a project? <span className="text-accent">Let's talk!</span>
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{profile.availability}</p>
      </div>
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-body hover:text-accent">
            <FiMail className="text-accent" /> {profile.email}
          </a>
          <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-body hover:text-accent">
            <FiPhone className="text-accent" /> {profile.phone}
          </a>
          <p className="flex items-center gap-3 text-muted">
            <FiMapPin className="text-accent" /> {profile.location}
          </p>
          <SocialLinks className="pt-2" />
        </div>

        <form
          onSubmit={handleSubmit}
          action={usingFormspree ? FORMSPREE_ENDPOINT : undefined}
          method={usingFormspree ? 'POST' : undefined}
          className="space-y-4"
        >
          <input
            name="name" required placeholder="Your name"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            name="email" type="email" required placeholder="Your email"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <textarea
            name="message" required rows={4} placeholder="Your message"
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <Button type="submit">Send message</Button>
        </form>
      </div>
    </Section>
  );
}
