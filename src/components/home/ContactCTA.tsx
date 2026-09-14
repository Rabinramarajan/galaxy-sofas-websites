import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
import { Container } from "@/components/common/Container";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { site } from "@/constants/site";
import { getGeneralEnquiryMessage } from "@/utils/whatsapp";

export function ContactCTA() {
  return (
    <section className="section-y bg-dark text-white">
      <Container className="max-w-2xl text-center">
        <h2 className="font-serif text-[1.625rem] sm:text-[2.25rem]">Upgrade Your Living Space</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/75 sm:text-base">
          Talk to Galaxy Sofas and find the perfect sofa for your home.
        </p>
        <div className="action-stack mt-8 sm:justify-center">
          <Button href={site.phoneHref} variant="primary">
            <Icon name="phone" size={18} />
            Call Now
          </Button>
          <WhatsAppButton
            message={getGeneralEnquiryMessage()}
            variant="inverse"
          />
        </div>
      </Container>
    </section>
  );
}
