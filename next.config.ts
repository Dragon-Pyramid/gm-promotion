import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
        search: ""
      },
      {
        pathname: "/images/gm_logo_blanco.png",
        search: "?context=scene02"
      }
    ]
  }
};

export default withNextIntl(nextConfig);