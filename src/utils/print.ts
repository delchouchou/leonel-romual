const PRINT_ROOT_ID = 'print-root'
const ISOLATE_CLASS = 'print-isolate'

/**
 * Imprime (ou enregistre en PDF) uniquement l'élément donné, sur une seule feuille,
 * et propose `fileTitle` comme nom de fichier PDF (le navigateur utilise le titre de la page).
 */
export const printElement = (element: HTMLElement | null, fileTitle: string): void => {
  if (!element || typeof window === 'undefined') return

  document.getElementById(PRINT_ROOT_ID)?.remove()
  const root = document.createElement('div')
  root.id = PRINT_ROOT_ID
  root.appendChild(element.cloneNode(true))
  document.body.appendChild(root)

  const previousTitle = document.title
  document.title = fileTitle
  document.documentElement.classList.add(ISOLATE_CLASS)

  const cleanup = (): void => {
    document.title = previousTitle
    document.documentElement.classList.remove(ISOLATE_CLASS)
    root.remove()
    window.removeEventListener('afterprint', cleanup)
  }
  window.addEventListener('afterprint', cleanup)

  window.print()
}
