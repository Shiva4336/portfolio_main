import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const SocialLinks: React.FC = () => {
  const links = [
    {
      icon: Github,
      href: 'https://github.com/Shiva4336',
      label: 'GitHub',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/shiva-manikanta-kaligina-0652a1293/',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:kaliginashiva@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="social-icon"
        >
          <link.icon size={24} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
