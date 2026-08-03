import { Component, signal, computed, afterNextRender } from '@angular/core';
import { SITE } from '../../core/config/site.config';
import { AppIcon } from '../../shared/components/app-icon/app-icon';

@Component({
  selector: 'app-floating-cta',
  imports: [AppIcon],
  template: `
    <div class="fixed bottom-6 right-6 z-[60]" [class]="containerClass()">
      <!-- Chat Preview Panel -->
      @if (showPreview()) {
        <div
          #previewPanel
          class="absolute bottom-20 right-0 w-80 md:w-96 transform transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          [class.opacity-100]="previewOpen()"
          [class.opacity-0]="!previewOpen()"
          [class.translate-y-2]="!previewOpen()"
          [class.pointer-events-none]="!previewOpen()"
          [class.pointer-events-auto]="previewOpen()"
          role="dialog"
          aria-label="Chat preview"
        >
          <div class="bg-white dark:bg-dark-card rounded-2xl shadow-lift border border-primary/10 dark:border-white/10 overflow-hidden">
            <!-- Header -->
            <div class="flex items-center justify-between p-4 border-b border-primary/10 dark:border-white/10 bg-gradient-to-r from-secondary/5 to-transparent">
              <div class="flex items-center gap-3">
                <div class="relative flex h-10 w-10 items-center justify-center rounded-full bg-gold-gradient">
                  <app-icon name="message-square" class="h-5 w-5 text-white" />
                  <span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] font-bold" aria-label="1 unread message">1</span>
                </div>
                <div>
                  <p class="font-semibold text-primary dark:text-white">Galaxy Sofas</p>
                  <p class="text-xs text-muted">Typically replies within minutes</p>
                </div>
              </div>
              <button
                type="button"
                (click)="closePreview()"
                class="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-primary/5 hover:text-primary dark:hover:bg-white/10 transition-colors"
                aria-label="Close chat preview"
              >
                <app-icon name="x" class="h-4 w-4" />
              </button>
            </div>

            <!-- Messages -->
            <div class="p-4 space-y-4 max-h-[300px] overflow-y-auto">
              @for (msg of previewMessages(); track msg.id) {
                <div class="flex gap-3" [class.flex-row-reverse]="msg.fromUser">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    @if (msg.fromUser) {
                      <app-icon name="user" class="h-4 w-4 text-secondary" />
                    } @else {
                      <app-icon name="bot" class="h-4 w-4 text-secondary" />
                    }
                  </div>
                  <div class="flex flex-col gap-1 max-w-[70%]">
                    <div
                      class="rounded-2xl px-4 py-2 text-sm"
                      [class]="msg.fromUser ? 'bg-gold-gradient text-white rounded-br-md' : 'bg-surface dark:bg-dark text-primary dark:text-white rounded-bl-md'"
                    >
                      {{ msg.text }}
                    </div>
                    <span class="text-[10px] text-muted px-1">{{ msg.time }}</span>
                  </div>
                </div>
              }

              <!-- Typing indicator -->
              @if (showTyping()) {
                <div class="flex gap-3">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <app-icon name="bot" class="h-4 w-4 text-secondary" />
                  </div>
                  <div class="bg-surface dark:bg-dark rounded-2xl px-4 py-2 rounded-bl-md">
                    <div class="flex gap-1">
                      @for (_ of [1,2,3]; track $index) {
                        <span class="h-2 w-2 rounded-full bg-secondary animate-bounce" [style.animation-delay]="$index * 0.15 + 's'"></span>
                      }
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Quick Replies -->
            <div class="border-t border-primary/10 dark:border-white/10 p-4 space-y-2">
              @for (reply of quickReplies(); track reply) {
                <button
                  type="button"
                  (click)="sendQuickReply(reply)"
                  class="w-full text-left rounded-xl bg-primary/5 px-4 py-2.5 text-sm text-primary hover:bg-primary/10 transition-colors"
                >
                  {{ reply }}
                </button>
              }
            </div>

            <!-- Input -->
            <div class="border-t border-primary/10 dark:border-white/10 p-4">
              <div class="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  class="flex-1 rounded-xl border border-primary/20 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-dark-card dark:border-white/10 dark:text-white"
                  (keydown.enter)="sendMessage($event)"
                />
                <button
                  type="button"
                  (click)="sendMessageFromInput()"
                  class="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-gradient text-white transition-all hover:scale-105"
                  aria-label="Send message"
                >
                  <app-icon name="send" class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Arrow -->
          <div class="absolute bottom-2 right-4 w-3 h-3 bg-white dark:bg-dark-card border-b border-r border-primary/10 dark:border-white/10 rotate-45"></div>
        </div>
      }

      <!-- Floating Action Buttons -->
      <div class="flex flex-col items-end gap-3">
        @if (expanded()) {
          <div class="flex flex-col items-end gap-3" role="group" aria-label="Quick contact options">
            <a
              href="mailto:{{ SITE.email }}"
              class="group flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-primary shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-dark-card dark:text-white"
              aria-label="Send us an email"
            >
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                <app-icon name="mail" class="h-4 w-4" />
              </span>
              <span class="hidden sm:block">Email us</span>
            </a>
            <a
              href="tel:{{ SITE.phoneRaw }}"
              class="group flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-primary"
              aria-label="Call Galaxy Sofas"
            >
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white group-hover:bg-white/30 transition-colors">
                <app-icon name="phone" class="h-4 w-4" />
              </span>
              <span class="hidden sm:block">{{ SITE.phone }}</span>
            </a>
            <a
              href="https://wa.me/{{ SITE.whatsapp }}?text={{ whatsappText() }}"
              target="_blank"
              rel="noopener"
              class="group flex items-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              aria-label="Chat on WhatsApp"
            >
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white group-hover:bg-white/30 transition-colors">
                <app-icon name="whatsapp" class="h-4 w-4" />
              </span>
              <span class="hidden sm:block">WhatsApp</span>
            </a>
          </div>
        }

        <!-- Main WhatsApp Button -->
        <button
          type="button"
          (click)="toggle()"
          class="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lift transition-all duration-300 hover:scale-105 hover:shadow-xl animate-pulse-gold"
          [attr.aria-label]="expanded() ? 'Close quick contact' : 'Open quick contact'"
          [attr.aria-expanded]="expanded()"
        >
          @if (expanded()) {
            <app-icon name="close" class="h-6 w-6" />
          } @else {
            <app-icon name="whatsapp" class="h-7 w-7" />
          }
          @if (unreadCount() > 0 && !expanded()) {
            <span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold animate-bounce">{{ unreadCount() }}</span>
          }
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class FloatingCta {
  readonly SITE = SITE;
  readonly expanded = signal(false);
  readonly previewOpen = signal(false);
  readonly showPreview = signal(false);
  readonly unreadCount = signal(1);
  readonly showTyping = signal(false);

  readonly previewMessages = signal<Array<{ id: string; text: string; time: string; fromUser: boolean }>>([
    { id: '1', text: '👋 Hello! Welcome to Galaxy Sofas. How can I help you today?', time: '10:30 AM', fromUser: false },
    { id: '2', text: 'Hi! I\'m looking for a 3-seater sofa for my living room.', time: '10:31 AM', fromUser: true },
    { id: '3', text: 'Perfect! We have several stunning 3-seaters. What style are you drawn to — modern, classic, or something modular?', time: '10:31 AM', fromUser: false },
  ]);

  readonly quickReplies = signal([
    'Show me bestsellers',
    'Book a showroom visit',
    'Custom furniture inquiry',
    'Delivery & warranty info',
  ]);

  readonly containerClass = computed(() => '');

  constructor() {
    afterNextRender(() => {
      this.startPreviewCycle();
    });
  }

  private startPreviewCycle(): void {
    this.showPreview.set(true);
    setTimeout(() => {
      this.previewOpen.set(true);
      setTimeout(() => {
        this.showTyping.set(true);
        setTimeout(() => {
          this.showTyping.set(false);
          this.addBotMessage('Would you like to see our bestselling Aurora sofa? It\'s 28% off right now! 😊');
        }, 2000);
      }, 1000);
    }, 5000);
  }

  private addBotMessage(text: string): void {
    this.previewMessages.update(msgs => [...msgs, {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fromUser: false,
    }]);
  }

  toggle(): void {
    this.expanded.update(v => !v);
    if (!this.expanded()) {
      this.previewOpen.set(false);
    }
  }

  closePreview(): void {
    this.previewOpen.set(false);
    this.expanded.set(false);
  }

  sendQuickReply(text: string): void {
    this.addUserMessage(text);
    setTimeout(() => {
      this.showTyping.set(true);
      setTimeout(() => {
        this.showTyping.set(false);
        this.addBotMessage(this.getBotResponse(text));
      }, 1500);
    }, 500);
  }

  private addUserMessage(text: string): void {
    this.previewMessages.update(msgs => [...msgs, {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fromUser: true,
    }]);
  }

  private getBotResponse(trigger: string): string {
    const responses: Record<string, string> = {
      'Show me bestsellers': 'Our top picks are the Aurora 3-Seater (28% off), Nebula Recliner, and Celestial L-Shape. Want me to send you links? 🔗',
      'Book a showroom visit': 'I\'d love to help! Which city are you in? I\'ll find the nearest showroom and book a slot for you. 📍',
      'Custom furniture inquiry': 'Our Atelier team creates magic! Share your room dimensions and style preferences, and our designer will reach out within 2 hours. ✨',
      'Delivery & warranty info': 'Free delivery on orders above ₹25K, white-glove assembly included. 7-year frame warranty, 15-day returns. Want the full details? 📦',
    };
    return responses[trigger] || 'Thanks for your interest! Our team will get back to you shortly. 😊';
  }

  sendMessage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value.trim()) {
      this.sendUserMessage(input.value.trim());
      input.value = '';
    }
  }

  sendMessageFromInput(): void {
    const input = document.querySelector('input[placeholder="Type a message..."]') as HTMLInputElement;
    if (input?.value.trim()) {
      this.sendUserMessage(input.value.trim());
      input.value = '';
    }
  }

  private sendUserMessage(text: string): void {
    this.addUserMessage(text);
    setTimeout(() => {
      this.showTyping.set(true);
      setTimeout(() => {
        this.showTyping.set(false);
        this.addBotMessage(this.getBotResponse(text) || 'Thank you! Our design consultant will contact you soon. 😊');
      }, 1500);
    }, 500);
  }

  whatsappText(): string {
    return encodeURIComponent('Hi Galaxy Sofas! I\u2019d love to know more about your furniture.');
  }
}