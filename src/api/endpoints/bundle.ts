// src/api/endpoints/bundle.ts
import type { BundleState } from '../../types/bundle';
import { initialBundle } from '../../data/initialBundle';

export async function getBundleState(): Promise<BundleState> {
  // Check localStorage first
  const saved = localStorage.getItem('bundle_state');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // Fall through to default
    }
  }
  return initialBundle;
}

export async function saveBundleState(
  state: BundleState
): Promise<{ success: boolean; id: string }> {
  // Save to localStorage
  localStorage.setItem('bundle_state', JSON.stringify(state));
  return {
    success: true,
    id: `bundle_${Date.now()}`,
  };
}