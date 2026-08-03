import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { SITE } from '../../core/config/site.config';
import { AppButton } from '../../shared/components/app-button/app-button';
import { formatDate } from '../../core/utils/utils';



@Component({
  selector: 'app-privacy-page',
  imports: [AppButton, PageHero],
  template: `
    <app-page-hero
      title="Privacy Policy"
      subtitle="Last updated: {{ lastUpdated }}"
      [showBreadcrumb]="true"
      breadcrumbLabel="Privacy Policy"
    />

    <section class="section-shell py-16 lg:py-24">
      <div class="mx-auto max-w-3xl">
        <div class="prose dark:prose-invert max-w-none">
          <p>At Galaxy Sofas, we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or interact with our services.</p>

          <h3>1. Information We Collect</h3>
          <p>We collect information you provide directly to us, including:</p>
          <ul>
            <li><strong>Personal Identification:</strong> Name, email address, phone number, and physical address.</li>
            <li><strong>Payment Information:</strong> Processed securely through our payment partners — we never store complete card numbers.</li>
            <li><strong>Communication Data:</strong> Messages, feedback, and any content you submit to us.</li>
          </ul>

          <h3>2. How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your order, products, or services</li>
            <li>Send you marketing communications (you may opt out at any time)</li>
            <li>Improve our website, products, and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h3>3. Cookies & Tracking</h3>
          <p>We use cookies and similar tracking technologies to enhance your experience. This includes:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> For site functionality and security.</li>
            <li><strong>Performance Cookies:</strong> To understand how visitors interact with our site.</li>
            <li><strong>Marketing Cookies:</strong> To deliver relevant ads and measure campaign effectiveness.</li>
          </ul>

          <h3>4. Third-Party Services</h3>
          <p>We work with trusted third parties including payment processors, shipping carriers, analytics providers and marketing platforms. These parties are contractually bound to protect your data.</p>

          <h3>5. Data Retention</h3>
          <p>We retain your personal information for as long as necessary to provide our services and fulfill the purposes described in this policy, unless a longer retention period is required by law.</p>

          <h3>6. Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access and obtain a copy of your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing</li>
            <li>Data portability</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>

          <h3>7. Data Security</h3>
          <p>We implement industry-standard security measures including encryption, secure servers and regular security audits to protect your personal information.</p>

          <h3>8. Children's Privacy</h3>
          <p>Our services are not directed to individuals under 18. We do not knowingly collect personal information from children.</p>

          <h3>9. Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date.</p>

          <h3>10. Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p>
            <strong>Email:</strong> {{ SITE.email }}<br />
            <strong>Phone:</strong> {{ SITE.phone }}<br />
            <strong>Address:</strong> {{ SITE.address.full }}
          </p>
        </div>

        <div class="mt-12 flex justify-center">
          <app-button label="Contact Us" variant="gold" icon="mail" />
        </div>
      </div>
    </section>
  `,
})
export class PrivacyPage implements OnInit {
  readonly #seo = inject(SeoService);
  protected readonly SITE = SITE;
  protected readonly lastUpdated = formatDate('2026-01-01');

  ngOnInit(): void {
    this.#seo.set({
      title: 'Privacy Policy | Galaxy Sofas',
      description: 'Galaxy Sofas privacy policy. How we collect, use and protect your personal data. Updated January 2026.',
      canonical: '/privacy-policy',
      ogType: 'website',
      jsonLd: [
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Privacy Policy', path: '/privacy-policy' },
        ]),
      ],
    });
  }
}



