import { icons, type IconName } from "@/constants/icons";

type IconProps = {
  name: IconName;
  /** Rendered box in pixels. Ionicons scale with font-size, so this sets both. */
  size?: number;
  className?: string;
  /**
   * Accessible name. Omit for decorative icons — the default — which are
   * hidden from assistive technology so they are not announced twice next to
   * a visible label.
   */
  label?: string;
};

/**
 * Ionicons wrapper.
 *
 * The icon itself is a web component that upgrades after hydration, so the box
 * is sized up front (width/height/font-size) to hold its space and keep CLS at
 * zero while the runtime loads.
 */
export function Icon({ name, size = 20, className = "", label }: IconProps) {
  return (
    <ion-icon
      name={icons[name]}
      className={`ion-icon-box ${className}`}
      style={{ width: size, height: size, fontSize: size }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
