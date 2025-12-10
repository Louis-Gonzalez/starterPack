export function loadLocalFaIcons() {
  const solid = import.meta.glob('~/assets/icons/fa/solid/*.svg', { eager: true });
  const regular = import.meta.glob('~/assets/icons/fa/regular/*.svg', { eager: true });
  const brands = import.meta.glob('~/assets/icons/fa/brands/*.svg', { eager: true });

  return {
    solid: Object.fromEntries(
      Object.entries(solid).map(([path, mod]) => [
        path.split('/').pop()!.replace('.svg', ''),
        (mod as any).default
      ])
    ),
    regular: Object.fromEntries(
      Object.entries(regular).map(([path, mod]) => [
        path.split('/').pop()!.replace('.svg', ''),
        (mod as any).default
      ])
    ),
    brands: Object.fromEntries(
      Object.entries(brands).map(([path, mod]) => [
        path.split('/').pop()!.replace('.svg', ''),
        (mod as any).default
      ])
    )
  }
}
