import { NeonSign } from "@/components/neon-sign";
import { allPhotos } from "@/data/menu";
import { STORE } from "@/lib/config";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="checker h-6" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <NeonSign size="sm" />
          <p className="mt-4">{STORE.address}</p>
          <p className="mt-1 text-cream/80">{STORE.hours}</p>
          <p className="mt-6 text-sm text-cream/70">
            A Chapa 50 é uma hamburgueria fictícia, criada como projeto de portfólio. Endereço e WhatsApp não
            são reais.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg text-mustard">Créditos das fotos</h2>
          <p className="mt-2 text-sm text-cream/80">Fotos reais do Unsplash, usadas sob a licença Unsplash.</p>
          <ul className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
            {allPhotos().map((photo) => (
              <li key={photo.src}>
                <a href={photo.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-pool underline-offset-4 hover:text-pool">
                  {photo.author}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
