export default function normalizeModifiers(modifiers) {
  return (Array.isArray(modifiers)
    ? modifiers
    : [modifiers]
  ).filter(i => typeof i === 'string' && !!i);
}
