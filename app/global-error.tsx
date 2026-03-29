"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white font-mono">
          <h2 className="text-red-500 font-black tracking-[0.2em] text-2xl mb-4">
            [FATAL_SYSTEM_ERROR]
          </h2>
          <p className="text-zinc-500 text-xs mb-8">The connection to the mainframe was lost.</p>
          <button 
            onClick={() => reset()}
            className="px-6 py-2 border border-zinc-800 text-green-400 hover:bg-zinc-900 hover:text-white transition-colors tracking-widest uppercase text-xs"
          >
            ./reboot.sh
          </button>
        </div>
      </body>
    </html>
  );
}