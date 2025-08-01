import type { BundledLanguage, CodeToHastOptions, HighlighterCore } from 'shiki'
import { transformerColorizedBrackets } from '@shikijs/colorized-brackets'
import { transformerMetaHighlight, transformerMetaWordHighlight, transformerNotationDiff, transformerNotationErrorLevel, transformerNotationFocus, transformerNotationHighlight, transformerNotationWordHighlight, transformerRenderWhitespace } from '@shikijs/transformers'

let promise: Promise<HighlighterCore>
let shiki: HighlighterCore

type CustomTransformerOptions = Array<
	| 'ignoreRenderWhitespace'
	| 'ignoreColorizedBrackets'
>

export const useShikiStore = defineStore('shiki', () => {
	const getOptions = (lang: string, transformerOptions?: CustomTransformerOptions): CodeToHastOptions<BundledLanguage, string> => ({
		lang,
		themes: {
			light: 'catppuccin-latte',
			dark: 'one-dark-pro',
		},
		transformers: [
			transformerNotationDiff(),
			transformerNotationHighlight(),
			transformerNotationWordHighlight(),
			transformerNotationFocus(),
			transformerNotationErrorLevel(),
			transformerOptions?.includes('ignoreRenderWhitespace') || ['ansi', 'log', 'text'].includes(lang)
				? {}
				: transformerRenderWhitespace(),
			transformerMetaHighlight(),
			transformerMetaWordHighlight(),
			transformerOptions?.includes('ignoreColorizedBrackets')
				? {}
				: transformerColorizedBrackets(),
			{
				root: hast => ({
					type: 'root',
					children: (hast.children[0] as any).children[0].children,
				}),
				line(node, line) { node.properties['data-line'] = line },
			},
		],
	})

	async function load() {
		promise ??= loadShiki()
		shiki ??= await promise
		return shiki
	}

	async function loadShiki() {
		const { createHighlighterCore } = await import('shiki/core')
		const { createJavaScriptRegexEngine } = await import('shiki/engine-javascript.mjs')

		return createHighlighterCore({
			themes: [
				await import('shiki/themes/catppuccin-latte.mjs'),
				await import('shiki/themes/one-dark-pro.mjs'),
			],
			engine: createJavaScriptRegexEngine(),
		})
	}

	async function loadLang(...langs: string[]) {
		const { bundledLanguages } = await import('shiki/langs')
		const loadedLangs = shiki.getLoadedLanguages()

		await Promise.all(langs
			.filter(unjudged => !loadedLangs.includes(unjudged) && unjudged in bundledLanguages)
			.map(unloaded => bundledLanguages[unloaded as BundledLanguage])
			.map(dynamicLang => dynamicLang().then(grammar => shiki.loadLanguage(grammar))),
		).catch((err) => {
			console.error('load lang error', err)
		})
	}

	return {
		getOptions,
		load,
		loadLang,
	}
})
