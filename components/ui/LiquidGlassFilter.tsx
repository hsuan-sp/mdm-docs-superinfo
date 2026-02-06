"use client";

/**
 * LiquidGlassFilter - SVG Filter Definitions for True Liquid Glass Effect
 *
 * This component renders hidden SVG filters that create Apple's Liquid Glass effect
 * using optical refraction (feTurbulence + feDisplacementMap) and specular lighting.
 *
 * Usage: Include once in root layout, then apply via CSS `filter: url(#liquidGlass)`
 */
export function LiquidGlassFilter() {
  return (
    <svg
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Light Mode: Subtle refraction with bright specular */}
        <filter
          id="liquidGlass"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          {/* Step 1: Generate fractal noise for displacement */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="3"
            seed="5"
            result="noise"
          />

          {/* Step 2: Displace source using noise (creates refraction) */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
            result="refracted"
          />

          {/* Step 3: Create specular highlight from noise surface */}
          <feSpecularLighting
            in="noise"
            surfaceScale="2"
            specularConstant="0.6"
            specularExponent="25"
            lightingColor="#ffffff"
            result="specular"
          >
            <fePointLight x="100" y="-50" z="300" />
          </feSpecularLighting>

          {/* Step 4: Blend specular with refracted image */}
          <feComposite
            in="specular"
            in2="refracted"
            operator="atop"
            result="lit"
          />

          {/* Step 5: Final composite with screen blend for brightness */}
          <feBlend in="refracted" in2="lit" mode="screen" />
        </filter>

        {/* Dark Mode: Deeper refraction with warmer specular tint */}
        <filter
          id="liquidGlassDark"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="2"
            seed="8"
            result="noise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="refracted"
          />

          {/* Warmer, amber-tinted light for dark mode */}
          <feSpecularLighting
            in="noise"
            surfaceScale="1.5"
            specularConstant="0.4"
            specularExponent="30"
            lightingColor="#ffeedd"
            result="specular"
          >
            <fePointLight x="150" y="-80" z="250" />
          </feSpecularLighting>

          <feComposite
            in="specular"
            in2="refracted"
            operator="atop"
            result="lit"
          />

          <feBlend in="refracted" in2="lit" mode="soft-light" />
        </filter>

        {/* Hover State: Intensified effect */}
        <filter
          id="liquidGlassHover"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.018"
            numOctaves="4"
            seed="5"
            result="noise"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
            result="refracted"
          />

          <feSpecularLighting
            in="noise"
            surfaceScale="3"
            specularConstant="0.8"
            specularExponent="20"
            lightingColor="#ffffff"
            result="specular"
          >
            <fePointLight x="80" y="-30" z="350" />
          </feSpecularLighting>

          <feComposite
            in="specular"
            in2="refracted"
            operator="atop"
            result="lit"
          />

          <feBlend in="refracted" in2="lit" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}

export default LiquidGlassFilter;
