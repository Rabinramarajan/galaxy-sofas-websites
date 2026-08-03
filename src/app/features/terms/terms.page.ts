import { Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { PageHero } from '../../shared/components/page-hero/page-hero';
import { breadcrumbSchema } from '../../core/seo/schema';
import { SITE } from '../../core/config/site.config';
import { AppButton } from '../../shared/components/app-button/app-button';



@Component({
  selector: 'app-terms-page',
  imports: [AppButton, PageHero],
  template: `
    <app-page-hero
      title="Terms & Conditions"
      subtitle="Last updated: January 2026"
      [showBreadcrumb]="true"
      breadcrumbLabel="Terms & Conditions"
    />

    <section class="section-shell py-16 lg:py-24">
      <div class="mx-auto max-w-3xl">
        <div class="prose dark:prose-invert max-w-none">
          <p>These Terms & Conditions ("Terms") govern your use of the Galaxy Sofas website, mobile application and services. By accessing or using our services, you agree to these Terms. Please read them carefully.</p>

          <h3>1. Definitions</h3>
          <p>"Galaxy Sofas", "we", "us" or "our" refers to Galaxy Sofas, operating under the laws of India. "Customer", "you" or "your" refers to any individual or entity accessing our services.</p>

          <h3>2. Eligibility</h3>
          <p>To use our services, you must be at least 18 years old and legally capable of entering into a binding contract. By using our services, you represent that you meet these requirements.</p>

          <h3>3. Account Registration</h3>
          <p>To place orders, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

          <h3>4. Product Information & Pricing</h3>
          <p>We strive for accuracy in product descriptions, images and pricing. However, errors may occur. We reserve the right to cancel any order with pricing errors. All prices are in Indian Rupees (₹) and include applicable taxes unless stated otherwise.</p>

          <h3>5. Order Process</h3>
          <p>All orders are subject to our acceptance. We reserve the right to refuse or cancel any order at our sole discretion. Upon placing an order, you will receive an order confirmation email.</p>

          <h3>6. Payment Terms</h3>
          <p>We accept various payment methods including credit/debit cards, UPI, net banking, wallets and cash on delivery (select locations). Payment is processed by our trusted payment partners.</p>

          <h3>7. Delivery & Shipping</h3>
          <p>We deliver nationwide. Delivery estimates are provided at checkout. Risk of loss passes to you upon delivery. Custom furniture may have extended delivery timelines.</p>

          <h3>8. Returns, Exchanges & Refunds</h3>
          <p>Stock items can be returned within 15 days of delivery in original packaging. Custom furniture cannot be returned. Refunds are processed within 7–14 business days to the original payment method. See our Returns Policy for full details.</p>

          <h3>9. Warranty</h3>
          <p>All furniture carries manufacturer warranties as specified in the product description. Warranty does not cover normal wear and tear, misuse or unauthorized modifications. See warranty documentation included with each product.</p>

          <h3>10. Intellectual Property</h3>
          <p>All content, trademarks, logos, and graphics on our website are the property of Galaxy Sofas and protected by intellectual property laws. You may not use, reproduce or distribute any content without our prior written consent.</p>

          <h3>11. User Content</h3>
          <p>You may submit reviews, photos and other content. By submitting, you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and display such content in connection with our services.</p>

          <h3>12. Limitation of Liability</h3>
          <p>To the maximum extent permitted by law, our total liability for any claim arising out of or related to these Terms or your use of our services shall not exceed the amount you paid to us for the applicable product or service.</p>

          <h3>13. Governing Law</h3>
          <p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.</p>

          <h3>14. Changes to These Terms</h3>
          <p>We may update these Terms from time to time. Changes are effective immediately upon posting. Your continued use of our services after any changes constitutes acceptance of the new Terms.</p>

          <h3>15. Contact Information</h3>
          <p>For questions about these Terms, please contact us at:</p>
          <p>
            <strong>Email:</strong> {{ SITE.email }}<br />
            <strong>Phone:</strong> {{ SITE.phone }}<br />
            <strong>Address:</strong> {{ SITE.address.full }}
          </p>
        </div>

        <div class="mt-12 flex justify-center">
          <app-button label="Back to Home" href="/" variant="gold" class="mt-6" />
        </div>
      </div>
    </section>
  `,
})
export class TermsPage implements OnInit {
  readonly #seo = inject(SeoService);
  protected readonly SITE = SITE;

  ngOnInit(): void {
    this.#seo.set({
      title: 'Terms & Conditions | Galaxy Sofas',
      description: 'Galaxy Soafas terms and conditions for website use, ordering, payment, delivery, returns and warranty.',
      canonical: '/terms',
      ogType: 'website',
      jsonLd: [
        breadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'Terms & Conditions', path: '/terms' },
        ]),
      ],
    });
  }
}



