import { computed, signal } from '@angular/core';

export const viewportWidth = signal(1280);
export const isMobileViewport = computed(() => viewportWidth() < 768);
