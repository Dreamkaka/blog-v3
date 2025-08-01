<script setup lang="ts">
import { group } from 'radash'

const appConfig = useAppConfig()
useSeoMeta({
	title: '归档',
	description: `${appConfig.title}的所有文章归档。`,
})
const birthYear = appConfig.stats.birthYear

const layoutStore = useLayoutStore()
layoutStore.setAside(['blog-stats', 'blog-log'])

const { data: listRaw } = await useArticleIndex()
const { listSorted, isAscending, sortOrder } = useArticleSort(listRaw)
const { category, categories, listCategorized } = useCategory(listSorted)

const listGrouped = computed(() => {
	const groupList = Object.entries(group(
		listCategorized.value,
		article => new Date(article[sortOrder.value] || 0).getFullYear(),
	))
	return isAscending.value ? groupList : groupList.reverse()
})

// 不能使用 /api/stats，因为可能切换分组方式
const yearlyWordCount = computed(() => {
	return listGrouped.value.reduce<Record<string, string>>((acc, [year, yearGroup]) => {
		const totalWords = yearGroup?.reduce((sum, cur) => sum + cur.readingTime!.words, 0) || 0
		acc[year] = formatNumber(totalWords)
		return acc
	}, {})
})
</script>

<template>
<div class="archive">
	<ZOrderToggle
		v-model:is-ascending="isAscending"
		v-model:sort-order="sortOrder"
		v-model:category="category"
		:categories
	/>
	<div
		v-for="[year, yearGroup] in listGrouped"
		:key="year"
		class="archive-group"
	>
		<div class="archive-title text-creative">
			<h2 class="archive-year">
				{{ year }}
			</h2>
			<div class="archive-age">
				<span>{{ Number(year) - birthYear }}</span>
				<span class="age-label">岁</span>
			</div>
			<div class="archive-info">
				<span>{{ yearlyWordCount[year] }}字</span>
				<span>{{ yearGroup?.length }}篇</span>
			</div>
		</div>
		<menu class="archive-list">
			<TransitionGroup appear name="float-in">
				<ZArchive
					v-for="article, index in yearGroup"
					:key="article.path"
					v-bind="article"
					:to="article.path"
					:use-updated="sortOrder === 'updated'"
					:style="{ '--delay': `${index * 0.03}s` }"
				/>
			</TransitionGroup>
		</menu>
	</div>
</div>
</template>

<style lang="scss" scoped>
.archive {
	margin: 1rem;
	mask: linear-gradient(#FFF 50%, #FFF5);
}

.archive-group {
	margin: 1rem 0 3rem;
}

.archive-title {
	display: flex;

	// align-items: center;
	justify-content: space-between;
	gap: 1em;
	position: sticky;
	opacity: 0.5;
	top: 0;
	font-size: min(1.5em, 5vw);
	color: transparent;
	transition: color 0.2s;

	:hover > & {
		color: var(--c-text-3);

		.archive-age {
			opacity: 0;
		}
	}

	> .archive-year, .archive-age {
		margin-bottom: -0.3em;
		mask: linear-gradient(#FFF 50%, transparent);
		font-size: 3em;
		font-weight: 800;
		line-height: 1;
		z-index: -1;
		-webkit-text-stroke: 1px var(--c-text-3);
	}

	> .archive-age {
		position: absolute;
		right: 0;
		transition: opacity 0.2s;

		> .age-label {
			font-size: 0.5em;
			vertical-align: super;
		}
	}

	> .archive-info {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		column-gap: 0.5em;
	}
}
</style>
