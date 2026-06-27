import { SiPhp, SiLaravel, SiNodedotjs, SiGo, SiMysql, SiRedis, SiDocker, SiGit, SiLinux } from 'react-icons/si';
import content from '../../data/content.js';
import Container from '../layout/Container.jsx';

const ICONS = {
  php: SiPhp,
  laravel: SiLaravel,
  node: SiNodedotjs,
  go: SiGo,
  mysql: SiMysql,
  redis: SiRedis,
  docker: SiDocker,
  git: SiGit,
  linux: SiLinux,
};

export default function TechStrip() {
  return (
    <section className="border-y border-border bg-surface py-8">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {content.techStrip.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.name}
                className="flex flex-col items-center gap-1.5 text-muted transition hover:text-accent"
              >
                {Icon && <Icon size={26} />}
                <span className="font-mono text-sm">{item.name}</span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
