<script lang="ts">
	import { i18nStore } from './Stores/I18nStore.ts';

    const rewards = [
        {
	        alt: 'Heart 01',
        	src: 'images/rewards/heart01.png'
        },
        {
	        alt: 'Heart 02',
        	src: 'images/rewards/heart02.png'
        },
        {
        	alt: 'Heart 03',
        	src: 'images/rewards/heart03.png'
        },
        {
        	alt: 'Heart 04',
        	src: 'images/rewards/heart04.png'
        },
        {
        	alt: 'Heart 05',
        	src: 'images/rewards/heart05.png'
        },
    ];

    const { alt, src } = rewards[Math.floor((Math.random() * 5))];
</script>

<div class="winScreen">
	<h1>{$i18nStore.texts.veryGood}</h1>
	<img {alt} {src} />
</div>

<style>
	.winScreen {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
    img {
        max-height: 600px;
    }
</style>
