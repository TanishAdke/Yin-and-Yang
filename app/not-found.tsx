import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white font-mono">
      <h2 className="text-red-500 font-black tracking-[0.2em] text-4xl mb-4 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
        [404_NOT_FOUND]
      </h2>
      <p className="text-zinc-500 text-sm mb-8">The requested sector does not exist in the mainframe.</p>
      
      <Link 
        href="/"
        className="px-6 py-2 border border-zinc-800 text-green-400 hover:bg-zinc-900 hover:text-white transition-colors tracking-widest uppercase text-xs"
      >
        ./return_to_base.sh
      </Link>
    </div>
  );
}