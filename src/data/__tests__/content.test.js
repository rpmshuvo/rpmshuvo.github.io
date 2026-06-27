import content from '../content.js';

test('content has all required sections', () => {
  expect(content.profile.name).toBe('Mehedi Hasan Shuvo');
  expect(content.profile.email).toBe('rpm_shuvo@outlook.com');
  expect(content.social).toHaveLength(3);
  expect(content.skills.length).toBeGreaterThanOrEqual(6);
  expect(content.experience.length).toBe(4);
  expect(content.projects.length).toBe(4);
  expect(content.publication.doi).toContain('10.22452/mjs.vol41no3.5');
  expect(content.nav.map((n) => n.id)).toContain('experience');
});
