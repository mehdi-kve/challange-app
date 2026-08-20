const BLOB_POSITIONS = [
  { top: "-12%", right: "-12%", size: 460 },
  { bottom: "-18%", left: "-10%", size: 420 },
  { top: "26%", left: "22%", size: 320 },
];

export function Background({ theme }) {
  const opacity = theme.blobOpacity ?? 0.45;
  const topGlow = theme.topGlow ?? "rgba(255,255,255,0.09)";
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-1000 ease-out"
        style={{ backgroundColor: theme.base ?? "#0f172a" }}
      />
      {theme.blobs.map((color, index) => {
        const pos = BLOB_POSITIONS[index] ?? BLOB_POSITIONS[0];
        return (
          <div
            key={index}
            className="blob"
            style={{
              width: pos.size,
              height: pos.size,
              top: pos.top,
              right: pos.right,
              bottom: pos.bottom,
              left: pos.left,
              opacity,
              background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 68%)`,
            }}
          />
        );
      })}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(120% 80% at 50% -10%, ${topGlow}, transparent 55%)` }}
      />
      <div
        className="absolute inset-0 transition-[background] duration-1000 ease-out"
        style={{ background: "radial-gradient(90% 55% at 50% 112%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 62%)" }}
      />
    </div>
  );
}