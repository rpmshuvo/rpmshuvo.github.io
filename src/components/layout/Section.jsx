import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView.js';
import Container from './Container.jsx';

export default function Section({ id, children, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} className={`py-20 sm:py-28 ${className}`}>
      <Container>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
