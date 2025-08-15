"use client"

export function JobDetailsSkeleton() {
  return (
    <div className="container mx-auto flex gap-16 relative min-h-[calc(100vh-6rem)]">
      {/* Primeira parte - Informações principais (Fixa) */}
      <div className="w-[400px] flex-shrink-0">
        <div className="fixed w-[400px]">
          {/* Botão Voltar */}
          <div className="h-10 w-10 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />

          <div className="mt-24">
            {/* Ações no topo */}
            <div className="absolute top-16 right-0 flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              <div className="h-11 w-11 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            </div>

            {/* Logo da empresa */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="w-full h-full rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            </div>

            {/* Nome da empresa */}
            <div className="text-center mt-4">
              <div className="h-8 w-48 mx-auto bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
            </div>

            {/* Título da vaga */}
            <div className="mt-8">
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
            </div>

            {/* Informações adicionais */}
            <div className="space-y-2 mt-6">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
                <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
              </div>
            </div>

            {/* Botão de ação */}
            <div className="flex items-center pt-6">
              <div className="h-11 w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Segunda parte - Descrição (Scrollável) */}
      <div className="flex-1 py-8">
        <div className="max-w-3xl space-y-4">
          {/* Parágrafos da descrição */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
              <div className="h-4 w-[95%] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
              <div className="h-4 w-[90%] bg-zinc-200 dark:bg-zinc-800 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
