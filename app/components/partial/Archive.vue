<script setup lang="ts">
import type ArticleProps from '~/types/article'
import { format } from 'date-fns'

const props = defineProps<{
	to?: string
	useUpdated?: boolean
} & ArticleProps>()

const mainDate = computed(() => props.useUpdated ? props.updated : props.date)
const dateLabel = computed(() => mainDate.value
	? format(new Date(mainDate.value), 'MM-dd')
	: '')
const auxDateLabel = computed(() => props.date
	? format(new Date(props.date), isSameYear(props.updated, props.date) ? 'MM-dd' : 'yyyy-MM-dd')
	: '')
</script>

<template>
<li class="article-item">
	<time :datetime="getLocaleDatetime(mainDate)" :title="getLocaleDatetime(mainDate)">{{ dateLabel }}</time>
	<ZRawLink class="article-link gradient-card" :to :title="description">
		<span class="article-title">
			{{ title }}
		</span>
		<time v-if="useUpdated && isTimeDiffSignificant(date, updated)" class="aux-date" :datetime="getLocaleDatetime(date)" :title="getLocaleDatetime(date)">
			&nbsp;{{ auxDateLabel }}</time>
		<NuxtImg v-if="image" class="article-cover" :src="image" :alt="title" loading="lazy" />
	</ZRawLink>
</li>
</template>

<style lang="scss" scoped>
.article-item {
	display: flex;
	align-items: center;
	gap: 0.5em;
	margin: 0.2em 0;
	transition: all 0.2s;
	animation: float-in 0.2s var(--delay) backwards;

	@media (max-width: $breakpoint-mobile) {
		font-size: 0.9em;
	}

	time {
		display: inline-block;
		opacity: 0.4;
		font-family: var(--font-monospace);
		transition: opacity 0.2s;

		&.aux-date {
			font-size: 0.8em;
			vertical-align: middle;
		}
	}

	&:hover > time {
		opacity: 1;
	}
}

.article-title {
	color: var(--c-text);
}

.article-link {
	flex-grow: 1;
	overflow: hidden;
	padding: 0.3em 0.6em;
}

.article-cover {
	position: absolute;
	opacity: 0.8;
	top: 0;
	right: 0;
	width: min(50%, 180px);
	height: 100%;
	margin: 0;
	mask: linear-gradient(to right, transparent, #FFF7);
	transition: all 0.2s;
	object-fit: cover;
	z-index: -1;

	:hover > & {
		opacity: 1;
		width: 50%;
		object-position: center 43.5%;
	}
}
</style>
