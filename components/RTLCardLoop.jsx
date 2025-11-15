import React from "react";

// Right-to-Left infinite loop carousel (React component)
// - Vanilla React; no external deps
// - Works by duplicating the card list and animating the track leftwards
// - Props: cards (array of React nodes or data), speed (seconds for one full loop),
//   cardGap (px), cardPadding (px)
// Usage:
// <RTLCardLoop cards={[<Card/>, <Card/> ...]} speed={18} cardGap={16} />

export default function RTLCardLoop({
  cards = [],
  speed = 18, // seconds for the whole duplicated track to move - adjust to change speed
  cardGap = 16,
  cardPadding = 8,
  ariaLabel = "Right-to-left looping cards",
}) {
  // We render the cards twice so the animation appears seamless.
  // Note: This CSS approach assumes the cards are laid out inline and the combined width
  // of the whole duplicated track is at least twice the visible area. If cards are
  // very few or each card is very narrow, the animation may show a gap — in that case
  // use the JS-driven fallback below.

  // Inline styles used so this component drops into any project without extra files.
  const trackStyle = {
    display: "flex",
    gap: `${cardGap}px`,
    alignItems: "center",
    // ensure no shrinking so layout stays stable
    whiteSpace: "nowrap",
  };

  const wrapperStyle = {
    overflow: "hidden",
    width: "100%",
  };

  const scrollerStyle = {
    display: "flex",
    // Keyframe animation added via style tag below (dynamic duration)
    alignItems: "center",
  };

  const cardContainerStyle = {
    display: "inline-flex",
    alignItems: "stretch",
    padding: `${cardPadding}px 0`,
  };

  // Build duplicated content
  const duplicated = [...cards, ...cards];

  // Unique id so multiple carousels on page don't clash
  const uid = React.useMemo(() => Math.random().toString(36).slice(2, 9), []);
  const animationName = `rtl-scroll-${uid}`;

  return (
    <div style={wrapperStyle} aria-label={ariaLabel}>
      {/* dynamic <style> to add keyframes with the chosen duration */}
      <style>{`
        /* container holding the moving track */
        .rtl-outer-${uid} { width: 100%; overflow: hidden; }
        .rtl-track-${uid} { display: flex; gap: ${cardGap}px; align-items: center; }

        /* the animation moves the track from 0 -> -50% (because content is duplicated)
           using translate3d for smoother rendering */
        @keyframes ${animationName} {
          0% { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }

        .rtl-anim-${uid} {
          display: flex;
          gap: ${cardGap}px;
          animation: ${animationName} ${speed}s linear infinite;
          will-change: transform;
          align-items: center;
        }

        /* Make sure each child doesn't shrink so spacing stays stable */
        .rtl-anim-${uid} > * { flex-shrink: 0; }

        /* Small accessibility-friendly pause on hover/focus */
        .rtl-anim-${uid}:hover,
        .rtl-anim-${uid}:focus-within {
          animation-play-state: paused;
        }
      `}</style>

      <div className={`rtl-outer-${uid}`}>
        {/* moving track */}
        <div className={`rtl-anim-${uid}`} style={scrollerStyle}>
          {duplicated.map((c, i) => (
            <div key={i} style={cardContainerStyle}>
              {/* If user passed data nodes, render directly. If plain data, wrap. */}
              {React.isValidElement(c) ? c : <div>{String(c)}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/*
Notes & Integration guide

1) Where to put it in your repo
   - Add this file as `components/RTLCardLoop.jsx`.
   - Import and use it in any page: `import RTLCardLoop from "../components/RTLCardLoop"`

2) How to provide cards
   - Each card can be a React component. Example usage:

      const cards = [
        <div className="card">Card 1</div>,
        <div className="card">Card 2</div>,
        <div className="card">Card 3</div>,
      ];

      <RTLCardLoop cards={cards} speed={20} cardGap={12} />

   - You can also map data to cards inline:

      <RTLCardLoop
        cards={items.map(item => (
          <article style={{padding:12, borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            <img src={item.img} alt={item.title} style={{width:120, height:80, objectFit:'cover'}} />
            <div>{item.title}</div>
          </article>
        ))}
        speed={30}
      />

3) Important details / caveats
   - The CSS duplication trick assumes the combined width of the duplicated items is greater
     than the visible area so the animation looks continuous. If you have too few cards or
     a very wide viewport relative to cards, you may see a gap. Solutions:
     a) Add more cards or increase card width.
     b) Use the JS-driven fallback (below) which measures and clones until wide enough.

4) Accessibility
   - The animation pauses on hover and focus-within so keyboard users can interact with cards.
   - Provide meaningful alt text for images and ARIA labels if required.

5) Fallback JS-driven approach (short description)
   - If you need a robust solution that works even with few cards, implement a small
     effect that measures the track width and programmatically clones the card nodes until
     the track is at least 2x the viewport width. Then animate the same way. I can paste
     that version too if you'd like it inserted directly into the repo.
*/
